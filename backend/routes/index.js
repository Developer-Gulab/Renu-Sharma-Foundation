import express from "express";
import userRouter from "./user.routes.js";
import departmentRouter from "./department.routes.js";
import submissionRouter from "./submission.routes.js";
import TaskRouter from "./task.routes.js";
import ProjectRouter from "./project.routes.js";
import certificateRouter from "./certificate.routes.js";
import paymentRouter from "./payment.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/department", departmentRouter);
router.use("/submission", submissionRouter);
router.use("/task", TaskRouter);
router.use("/project", ProjectRouter);
router.use("/certificate", certificateRouter);
router.use("/payment", paymentRouter);

export default router;
