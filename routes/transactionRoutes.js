import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get(
  "/",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getTransactions
);
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getTransactionById
);
router.post(
  "/add",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  createTransaction
);
router.patch(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  updateTransaction
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  deleteTransaction
);

export default router;
