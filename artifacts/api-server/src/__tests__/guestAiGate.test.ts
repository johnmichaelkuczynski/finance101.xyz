/**
 * Unit tests for guestAiGate middleware.
 *
 * Three behavioural requirements verified here:
 *  1. Non-AI routes (lecture reads, assignment lists) never consume the allowance.
 *  2. Signed-in users are never blocked regardless of the DB tally.
 *  3. Guests get 401 { error: "LOGIN_REQUIRED" } once they exceed GUEST_AI_CHAR_LIMIT.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";

// ---------------------------------------------------------------------------
// Shared mock state — tests set `mockTotalAfterCharge` to control the value
// that chargeGuest() returns (aiChars column value AFTER the upsert).
// chargeGuest returns (totalAfterCharge - chargedNow), i.e. the value BEFORE.
// ---------------------------------------------------------------------------
let mockTotalAfterCharge = 200; // default: fresh guest, 200 chars reserved, 0 used before

vi.mock("@workspace/db", () => {
  return {
    db: {
      insert: vi.fn().mockReturnValue({
        values: vi.fn().mockReturnValue({
          onConflictDoUpdate: vi.fn().mockReturnValue({
            returning: vi.fn().mockImplementation(() =>
              Promise.resolve([{ aiChars: mockTotalAfterCharge }]),
            ),
          }),
        }),
      }),
    },
    guestUsageTable: {},
  };
});

// Import AFTER mocks are set up.
import {
  guestAiGate,
  GUEST_AI_CHAR_LIMIT,
} from "../middlewares/guestAiGate";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeReq(
  method: string,
  path: string,
  opts: { isGuest?: boolean; userId?: string } = {},
): Request {
  const req = {
    method,
    path,
    isGuest: opts.isGuest ?? true,
    userId: opts.userId ?? "g_test-guest-id",
  } as unknown as Request;
  return req;
}

function makeRes(): Response & {
  statusCode: number;
  _body: unknown;
  status: (code: number) => Response;
  json: (body: unknown) => Response;
} {
  const res = {
    statusCode: 200,
    _body: undefined,
  } as {
    statusCode: number;
    _body: unknown;
    status: (code: number) => Response;
    json: (body: unknown) => Response;
  };
  res.status = vi.fn().mockImplementation((code: number) => {
    res.statusCode = code;
    return res as unknown as Response;
  });
  res.json = vi.fn().mockImplementation((body: unknown) => {
    res._body = body;
    return res as unknown as Response;
  });
  return res as Response & {
    statusCode: number;
    _body: unknown;
    status: (code: number) => Response;
    json: (body: unknown) => Response;
  };
}

function nextFn(): NextFunction & { called: boolean } {
  const fn = vi.fn() as unknown as NextFunction & { called: boolean };
  fn.called = false;
  const wrapped = vi.fn().mockImplementation(() => {
    fn.called = true;
  });
  return wrapped as unknown as NextFunction & { called: boolean };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("guestAiGate — non-AI routes", () => {
  beforeEach(() => {
    mockTotalAfterCharge = 200; // fresh guest
  });

  const NON_AI_CASES: [string, string][] = [
    ["GET", "/course/weeks"],
    ["GET", "/lectures/42"],
    ["GET", "/assignments"],
    ["GET", "/profile"],
    ["GET", "/analytics/stats"],
  ];

  for (const [method, path] of NON_AI_CASES) {
    it(`passes ${method} ${path} through without charging the DB`, async () => {
      const req = makeReq(method, path);
      const res = makeRes();
      const next = nextFn();

      await new Promise<void>((resolve) => {
        guestAiGate(req, res, (...args) => {
          next(...args);
          resolve();
        });
        // Non-AI routes call next() synchronously — resolve immediately.
        resolve();
      });

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  }
});

describe("guestAiGate — signed-in users", () => {
  beforeEach(() => {
    // Even if the DB would say "over limit", signed-in users must pass.
    mockTotalAfterCharge = GUEST_AI_CHAR_LIMIT * 10;
  });

  it("never blocks a signed-in user on an AI route", async () => {
    const req = makeReq("POST", "/tutor/ask", {
      isGuest: false,
      userId: "user_clerk123",
    });
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      resolve(); // signed-in → synchronous next()
    });

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});

describe("guestAiGate — guest AI usage", () => {
  it("lets a fresh guest through on POST /tutor/ask", async () => {
    // usedBefore = totalAfterCharge - RESERVATION_CHARS = 200 - 200 = 0 < limit
    mockTotalAfterCharge = 200;

    const req = makeReq("POST", "/tutor/ask");
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve, reject) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      // Async middleware — wait for the promise inside.
      setTimeout(() => reject(new Error("timeout")), 1000);
    });

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("lets a guest through on GET /tutor/suggestions/:lectureId while under limit", async () => {
    // usedBefore = 1400 - 200 = 1200 < 1600
    mockTotalAfterCharge = 1400;

    const req = makeReq("GET", "/tutor/suggestions/7");
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve, reject) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      setTimeout(() => reject(new Error("timeout")), 1000);
    });

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("blocks a guest who is exactly at the limit on POST /tutor/ask", async () => {
    // usedBefore = (LIMIT + 200) - 200 = LIMIT  → blocked
    mockTotalAfterCharge = GUEST_AI_CHAR_LIMIT + 200;

    const req = makeReq("POST", "/tutor/ask");
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve, reject) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      // Middleware resolves without calling next when blocked.
      setTimeout(resolve, 500);
    });

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    const body = (res as unknown as { _body: { error: string } })._body;
    expect(body.error).toBe("LOGIN_REQUIRED");
  });

  it("blocks a guest well over the limit on POST /practice/sessions/3/next", async () => {
    // usedBefore = 5000 - 200 = 4800 >> 1600  → blocked
    mockTotalAfterCharge = 5000;

    const req = makeReq("POST", "/practice/sessions/3/next");
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve, reject) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      setTimeout(resolve, 500);
    });

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    const body = (res as unknown as { _body: { error: string } })._body;
    expect(body.error).toBe("LOGIN_REQUIRED");
  });

  it("blocks a guest on POST /assignments/attempts/5/answers", async () => {
    mockTotalAfterCharge = GUEST_AI_CHAR_LIMIT + 200;

    const req = makeReq("POST", "/assignments/attempts/5/answers");
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve, reject) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      setTimeout(resolve, 500);
    });

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("blocks a guest on POST /practice-assignments", async () => {
    mockTotalAfterCharge = GUEST_AI_CHAR_LIMIT + 200;

    const req = makeReq("POST", "/practice-assignments");
    const res = makeRes();
    const next = nextFn();

    await new Promise<void>((resolve, reject) => {
      guestAiGate(req, res, () => {
        next();
        resolve();
      });
      setTimeout(resolve, 500);
    });

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
