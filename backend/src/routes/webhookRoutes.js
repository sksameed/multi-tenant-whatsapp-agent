import express from "express";

import {
  verifyWebhook,
  receiveWebhook,
} from "../controllers/webhookController.js";

const router = express.Router();

// Meta Verification
router.get("/", verifyWebhook);

// Incoming Messages
router.post("/", receiveWebhook);

export default router;