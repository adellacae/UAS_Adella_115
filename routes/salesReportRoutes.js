import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getSalesReports,
  getSalesReportById,
  createSalesReport,
  updateSalesReport,
  deleteSalesReport,
} from "../controllers/salesReportController.js";

const router = express.Router();

router.get(
  "/",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getSalesReports
);
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getSalesReportById
);
router.post(
  "/add",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  createSalesReport
);
router.patch(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager"]),
  updateSalesReport
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager"]),
  deleteSalesReport
);

export default router;
