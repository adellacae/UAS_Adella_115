import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getIncomeReports,
  getIncomeReportById,
  createIncomeReport,
  updateIncomeReport,
  deleteIncomeReport,
} from "../controllers/incomeReportController.js";

const router = express.Router();

router.get(
  "/",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getIncomeReports
);
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getIncomeReportById
);
router.post(
  "/",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  createIncomeReport
);
router.patch(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  updateIncomeReport
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  deleteIncomeReport
);

export default router;
