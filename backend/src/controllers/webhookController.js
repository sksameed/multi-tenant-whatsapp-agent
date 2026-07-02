import { graph } from "../graph/graph.js";
import {
  sendTextMessage,
  sendImageMessage,
  sendDocumentMessage,
  markAsRead,
} from "../services/whatsappService.js";

import { findOrCreateSession } from "./sessionController.js";
import Tenant from "../models/Tenant.js";

// =====================================
// Webhook Verification
// =====================================
export async function verifyWebhook(req, res) {
  console.log("========== WEBHOOK VERIFY ==========");
  console.log("Mode:", req.query["hub.mode"]);
  console.log("Token Received:", req.query["hub.verify_token"]);
  console.log("Token In ENV:", process.env.VERIFY_TOKEN);
  console.log("Challenge:", req.query["hub.challenge"]);

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    console.log("✅ VERIFIED");
    return res.status(200).send(challenge);
  }

  console.log("❌ VERIFICATION FAILED");
  return res.sendStatus(403);
}

// =====================================
// Incoming WhatsApp Webhook
// =====================================
export async function receiveWebhook(req, res) {
  try {
    const body = req.body;

    console.log("========== WEBHOOK RECEIVED ==========");
    console.log(JSON.stringify(body, null, 2));

    if (body.object !== "whatsapp_business_account") {
      return res.sendStatus(404);
    }

    const change = body.entry?.[0]?.changes?.[0]?.value;
    const message = change?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    // Respond to Meta immediately
    res.sendStatus(200);

    // Process in background
    (async () => {
      try {
        const phone = message.from;
        const text = message.text?.body || "";
        const messageId = message.id;

        console.log("Incoming Message:", text);

        // -------------------------
        // Mark Message as Read
        // -------------------------
        await markAsRead(messageId);

        // -------------------------
        // Tenant Resolution
        // -------------------------
        const phoneNumberId = change?.metadata?.phone_number_id;

        console.log("Phone Number ID:", phoneNumberId);

        const tenant = await Tenant.findOne({
          phoneNumberId,
        });

        if (!tenant) {
          console.log("❌ Tenant not found");
          return;
        }

        console.log("✅ Tenant Found:", tenant.name);

        // -------------------------
        // Find/Create Session
        // -------------------------
        const session = await findOrCreateSession(
          phone,
          tenant._id
        );

        // -------------------------
        // Invoke LangGraph
        // -------------------------
        const result = await graph.invoke({
          tenantId: tenant._id,
          sessionId: session._id,
          phoneNumber: phone,
          incomingMessage: text,

          tenant: null,
          chatHistory: [],

          aiResponse: null,
          responseType: "text",
          mediaToSend: null,
        });

        console.log("Graph Action:", result.action);

        // -------------------------
        // Execute Action
        // -------------------------
        switch (result.action.type) {
          case "SEND_TEXT":
            await sendTextMessage(
              phone,
              result.action.message
            );
            break;

          case "SEND_CATALOG":
            await sendDocumentMessage(
              phone,
              result.action.url,
              "Catalog.pdf"
            );
            break;

          case "SEND_IMAGE":
            await sendImageMessage(
              phone,
              result.action.url,
              result.action.message
            );
            break;

          case "SEND_HUMAN":
            await sendTextMessage(
              phone,
              result.action.message
            );
            break;

          default:
            await sendTextMessage(
              phone,
              result.action.message
            );
        }

        console.log("✅ Response Sent Successfully");

      } catch (err) {
        console.error("❌ Webhook Processing Error");
        console.error(err.response?.data || err.message || err);
      }
    })();

  } catch (err) {
    console.error("❌ Webhook Error:", err);
    return res.sendStatus(500);
  }
}