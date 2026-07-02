import express from "express";
import { testAgent } from "../controllers/agentController.js";

const router = express.Router();

router.post("/test", testAgent);

export default router;