import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", authenticateJWT, authorizeRole(["manager", "staff"]), getItems);
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  getItemById
);
router.post(
  "/add",
  authenticateJWT,
  authorizeRole(["manager", "staff"]),
  createItem
);
router.patch("/:id", authenticateJWT, authorizeRole(["manager"]), updateItem);
router.delete("/:id", authenticateJWT, authorizeRole(["manager"]), deleteItem);

export default router;
