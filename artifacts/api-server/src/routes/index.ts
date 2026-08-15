import { Router, type IRouter } from "express";
import healthRouter from "./health";
import courseRouter from "./course";
import assignmentsRouter from "./assignments";
import practiceRouter from "./practice";
import tutorRouter from "./tutor";
import detectionRouter from "./detection";
import analyticsRouter from "./analytics";
import diagnosticsRouter from "./diagnostics";
import practiceAssignmentsRouter from "./practiceAssignments";
import profileRouter from "./profile";
import { requireAuth } from "../middlewares/requireAuth";
import { identify } from "../middlewares/identify";
import { guestAiGate } from "../middlewares/guestAiGate";

const router: IRouter = Router();

// Health is public so deploy health checks work without a session.
router.use(healthRouter);

// No login wall: every visitor is identified either by their Clerk session or
// by a long-lived guest cookie. Guests can browse the whole course.
router.use(identify);

// Read-mostly routers: open to guests and signed-in users alike.
router.use(courseRouter);
router.use(analyticsRouter);
router.use(profileRouter);

// AI-powered routers: guests may sample until they hit the free-output limit,
// then get 401 LOGIN_REQUIRED and must sign in with Google.
router.use(guestAiGate);
router.use(assignmentsRouter);
router.use(practiceRouter);
router.use(tutorRouter);
router.use(detectionRouter);
router.use(practiceAssignmentsRouter);

// Operator console stays behind a real session.
router.use(requireAuth);
router.use(diagnosticsRouter);

export default router;
