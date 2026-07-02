import { graph } from "../graph/graph.js";
import {
  sendTextMessage,
  sendImageMessage,
  sendDocumentMessage,
  markAsRead,
} from "../services/whatsappService.js";

import { findOrCreateSession } from "./sessionController.js";

import Tenant from "../models/Tenant.js";
import Message from "../models/Message.js";

// =====================================
// Webhook Verification
// =====================================
export async function verifyWebhook(req, res) {

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    console.log("✅ Webhook Verified");
    return res.status(200).send(challenge);
  }

  console.log("❌ Webhook Verification Failed");

  return res.sendStatus(403);
}

// =====================================
// Incoming WhatsApp Webhook
// =====================================
export async function receiveWebhook(req, res) {

  try {

    const body = req.body;

    if (body.object !== "whatsapp_business_account") {
      return res.sendStatus(404);
    }

    const change = body.entry?.[0]?.changes?.[0]?.value;

    // Ignore delivery/read status callbacks
    if (change?.statuses) {
      return res.sendStatus(200);
    }

    const incoming = change?.messages?.[0];

    if (!incoming) {
      return res.sendStatus(200);
    }

    // Respond immediately to Meta
    res.sendStatus(200);

    (async () => {

      try {

        const phone = incoming.from;
        const text = incoming.text?.body || "";
        const messageId = incoming.id;

        console.log("\n=================================");
        console.log("📨 Incoming WhatsApp Message");
        console.log("Phone :", phone);
        console.log("Text  :", text);
        console.log("=================================\n");

        //------------------------------------
        // Mark Read
        //------------------------------------
        await markAsRead(messageId);

        //------------------------------------
        // Resolve Tenant
        //------------------------------------
        const phoneNumberId =
          change.metadata?.phone_number_id;

        const tenant = await Tenant.findOne({
          phoneNumberId,
        });

        if (!tenant) {
          console.log("❌ Tenant Not Found");
          return;
        }

        console.log("🏢 Tenant:", tenant.name);

        //------------------------------------
        // Session
        //------------------------------------
        const session =
          await findOrCreateSession(
            phone,
            tenant._id
          );

        //------------------------------------
        // Save User Message
        //------------------------------------
        await Message.create({
          tenantId: tenant._id,
          sessionId: session._id,
          sender: "user",
          content: text,
          messageType: "text",
          mediaUrl: "",
        });

        console.log("✅ User Message Saved");

        //------------------------------------
        // LangGraph
        //------------------------------------
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

        console.log("\n🤖 Graph Action");
        console.log(result.action);

        //------------------------------------
        // Execute Action
        //------------------------------------

        switch (result.action.type) {

          case "SEND_TEXT":

            await sendTextMessage(
              phone,
              result.action.message
            );

            break;

          case "SEND_IMAGE":

            await sendImageMessage(
              phone,
              result.action.url,
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

        console.log("✅ Response Sent");

      } catch (err) {

        console.error("\n❌ WEBHOOK PROCESSING ERROR");

        console.error(
          err.response?.data ||
          err.message ||
          err
        );

      }

    })();

  } catch (err) {

    console.error(err);

    return res.sendStatus(500);

  }

}