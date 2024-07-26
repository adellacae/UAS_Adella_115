import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authenticateJWT, authorizeRole(["manager"]), getUsers);
router.get("/:id", authenticateJWT, authorizeRole(["manager"]), getUserById);
router.post("/add", createUser); // No authentication needed for registration
router.patch("/:id", authenticateJWT, authorizeRole(["manager"]), updateUser);
router.delete("/:id", authenticateJWT, authorizeRole(["manager"]), deleteUser);

export default router;
