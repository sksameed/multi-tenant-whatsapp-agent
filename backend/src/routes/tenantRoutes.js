import express from "express";
import {
  createTenant,
  getTenants,
  updateTenant,
} from "../controllers/tenantController.js";

const router = express.Router();

router.post("/", createTenant);
router.get("/", getTenants);
router.put("/:id", updateTenant);
export default router;