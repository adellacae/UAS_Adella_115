import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
} from "../controllers/managerController.js";

const router = express.Router();

router.get("/", authenticateJWT, authorizeRole(["manager"]), getManagers);
router.get("/:id", authenticateJWT, authorizeRole(["manager"]), getManagerById);
router.post("/add", authenticateJWT, authorizeRole(["manager"]), createManager);
router.patch(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager"]),
  updateManager
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager"]),
  deleteManager
);

export default router;
