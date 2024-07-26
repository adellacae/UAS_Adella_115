import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/authUser.js";
import {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/", authenticateJWT, authorizeRole(["manager"]), getVendors);
router.get("/:id", authenticateJWT, authorizeRole(["manager"]), getVendorById);
router.post("/add", authenticateJWT, authorizeRole(["manager"]), createVendor);
router.patch("/:id", authenticateJWT, authorizeRole(["manager"]), updateVendor);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["manager"]),
  deleteVendor
);

export default router;
