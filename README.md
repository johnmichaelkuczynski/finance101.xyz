# 💼 Teach Yourself Finance

**A Four-Week Course on the Ideas Behind the Money — From the Time Value of a Dollar to the WACC of a Whole Company**

---

## 🧩 Overview

Teach Yourself Finance is a self-paced, single-user web course that asks the question finance classes usually skip: *why are these formulas the formulas?* What is an interest rate, really? Why must a balance sheet balance? Where does the risk premium come from? Why is the value of any asset always the present value of its future cash flows?

It is a content reskin of the **QuantReason** Quantitative Reasoning app. The full QuantReason runtime — lectures with Short / Medium / Long depth, section-scoped AI tutor, adaptive practice, AI-graded homework / tests / midterm / final, two-layer AI-authorship detection, and one-click diagnostics — is preserved unchanged. The **purpose** of this build is to teach the conceptual backbone of modern finance — the same backbone every MBA, CFA candidate, and corporate-finance analyst eventually meets, presented in one connected arc.

---

## 🧠 What It Does

- **Four-Week Curriculum of 29 Micro-Lectures** — Organized by theme:
  - **Week 1 — Foundations and the time value of money.** What finance is and why it exists; the financial system and markets; money, interest, and the time value of money; present value and future value; discounting cash flows; annuities and perpetuities; nominal vs. real rates and inflation.
  - **Week 2 — Financial statements and analysis.** The three statements and how they connect; the balance sheet and the accounting identity; the income statement; the statement of cash flows; financial ratio analysis and the DuPont decomposition; working capital and liquidity; reading and interpreting annual reports.
  - **Week 3 — Risk, return, and markets.** Risk and return fundamentals; measuring return (expected value, geometric vs. arithmetic); measuring risk and volatility ($\sigma^2$, $\sigma$); diversification and portfolio basics; the risk–return tradeoff and the Sharpe ratio; the Capital Asset Pricing Model; market efficiency.
  - **Week 4 — Valuation and corporate finance.** Bond valuation; stock valuation (Gordon growth); capital budgeting and NPV; cost of capital and WACC; capital structure, leverage, and Modigliani–Miller; corporate financing and dividend policy; financial intermediaries and institutions; capstone synthesis — value as the PV of expected future cash flows.
- **One Real Example per Lecture** — Every micro-lecture grounds its concept in a worked example from business, history, or markets — \$1{,}000 compounding at $8\%$ for thirty years, British consols as a literal perpetuity, U.S. savers in the inflationary 1970s, Amazon's profitless years vs. its operating cash flow, Enron's footnote-buried leverage, the 2008 spike in the VIX, Markowitz's umbrella-and-sunscreen portfolio, CAPM hurdle rates, the dot-com bubble vs. the EMH, bond prices falling when yields rise, Modigliani–Miller and Lehman's maturity-transformation collapse.
- **One Symbolic Question per Lecture** — Every homework / test / midterm / final problem requires the student to *write the key finance formula in symbols* ($PV = FV/(1+r)^n$, $NPV = \sum CF_t/(1+r)^t - CF_0$, $E(R_i) = R_f + \beta_i(E(R_m) - R_f)$, $WACC = (E/V)r_e + (D/V)r_d(1-T)$, $\sigma_p^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2 w_1 w_2 \rho_{12} \sigma_1 \sigma_2$), not just describe it in English. The on-screen math keyboard — with its dedicated **Finance** tab — is the only practical way to compose these answers.
- **Three-Depth Lectures, Section-Scoped Tutor, Adaptive Practice, AI Grading, Two-Layer Detection, Operator Diagnostics** — All inherited unchanged from the QuantReason runtime.
- **12 Graded Assignments** — Two homeworks per week plus a graded weekly checkpoint: Week 1 test, end-of-Week-2 midterm, Week 3 test, end-of-Week-4 cumulative final.
- **Built-In Product Demo Video** — The companion `qr-course-demo` artifact ships as a short screencast of the live UI.

---

## ⚙️ Technical Features

- **Symbolic Answer Harness** — Every problem prompt is structured so the canonical answer is a piece of finance notation. Both prompt rendering (KaTeX) and answer entry/grading (LaTeX-aware AI grader with numeric short-circuit) handle summations, discount factors, expectations, $\beta$, $\sigma$, $\rho$, the $\sum_{t=1}^{n} CF_t/(1+r)^t$ pattern, the CAPM line, WACC, and the rest cleanly.
- **Static AI Detection (GPTZero):** Every submitted answer is sent to GPTZero's `predict/text` endpoint; the per-document AI probability is blended `0.85 × GPTZero + 0.15 × structural-heuristic` for the final score. If GPTZero is unavailable, the system silently falls back to an LLM scorer plus heuristic — submissions never block.
- **Diachronic Keystroke Detection:** The student textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration. A scorer penalises paste-then-reword behaviour, low keystroke-to-output ratios, and impossibly sustained typing speeds.
- **System Diagnostic (`/diagnostics/system`):** Environment, database round-trip, course-seed integrity (full finance curriculum present), OpenAI chat completion, OpenAI JSON mode, detection pipeline, AI-positive control sample, and GPTZero connectivity. Each step returns pass/fail, timing, and a raw error string.
- **Synthetic-Student Diagnostic (`/diagnostics/synthetic-run`):** End-to-end stack proof — a fake student takes a practice session, takes a full assignment attempt, submits, and verifies grading + detection + analytics all reflect the run.
- **Auto-Reseed on Curriculum Change** — `seedIfEmpty` compares the set of topic slugs in the database to the expected curriculum *and* checks a sentinel phrase in a designated lecture. If either differs, it wipes and re-seeds in dependency order. A single content swap propagates cleanly on the next server start.
- **Contract-First API** — Single OpenAPI document; React Query hooks for the UI and Zod validators for the server are generated from it.
- **Streaming AI Tutor** — Token-by-token Server-Sent-Event streaming with a section-scoped system prompt grounded in the active lecture.
- **Adaptive Practice Engine** — Per-session difficulty (1–4) adjusts after each attempt; problems are generated on demand.

---

## 🔐 Required Secrets

- `DATABASE_URL` — Postgres connection string for the external database.
- `OPENAI_API_KEY` — required at boot. Powers the tutor, practice generator, AI graders, and lecture-expansion job.
- `GPTZERO_API_KEY` — required for the GPTZero leg of the static-AI-detection layer. Without it, the system falls back to the LLM scorer + heuristic but loses the primary detection signal.
- `SESSION_SECRET` — signed-session cookie secret.

---

## 🎓 Designed For

- **Anyone Who Looked at a DCF Model and Wondered "But Where Does This *Come From*?":** A short, focused course on the conceptual scaffolding behind the formulas — interest, present value, statements, risk, return, cost of capital, valuation.
- **The Maintainer of QuantReason and Its Clones:** A pure stress test of the math-notation stack — keyboard, LaTeX rendering, grading, and AI detection — under a curriculum whose answers lean on summations, discount factors, expectations, and Greek-letter risk parameters.

---

## 💡 Core Idea

Most finance courses teach the *recipes* — how to build a DCF, how to compute WACC, how to price a bond. Far fewer teach the *objects* — what an interest rate is, what the balance-sheet identity means, what the risk premium is paying for, why one equation ($V = \sum E(CF_t)/(1+r)^t$) sits underneath all of it. This course is built around the second list.

Read the idea, see it grounded in a real example, then write the defining formula in symbols of your own.

**Teach Yourself Finance — read the idea, ground the idea, write the idea.**
