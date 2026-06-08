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

const router: IRouter = Router();

// Health is public so deploy health checks work without a session.
router.use(healthRouter);

// Everything else requires an authenticated Clerk session. The browser sends
// the session cookie automatically, so anonymous callers get 401.
router.use(requireAuth);
router.use(courseRouter);
router.use(assignmentsRouter);
router.use(practiceRouter);
router.use(tutorRouter);
router.use(detectionRouter);
router.use(analyticsRouter);
router.use(practiceAssignmentsRouter);
router.use(profileRouter);
router.use(diagnosticsRouter);

export default router;
