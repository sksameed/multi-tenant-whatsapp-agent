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
        // ------------------------------------
// Default Tenant (Sandbox Demo)
// ------------------------------------
//------------------------------------
// Default Tenant
//------------------------------------
const defaultTenant = await Tenant.findOne({
  name: "Luxury Furniture",
});

if (!defaultTenant) {
  console.log("❌ Default Tenant Not Found");
  return;
}

//------------------------------------
// Find/Create Session
//------------------------------------
const session = await findOrCreateSession(
  phone,
  defaultTenant._id
);

//------------------------------------
// Current Active Tenant
//------------------------------------
let tenant = await Tenant.findById(
  session.tenantId
);

console.log("🏢 Active Tenant:", tenant.name);
        // ------------------------------------
// Tenant Switch Commands
// ------------------------------------
const lower = text.toLowerCase();

if (
  lower.includes("switch to automotive") ||
  lower.includes("act like automotive") ||
  lower.includes("use automotive")
) {

  const automotive = await Tenant.findOne({
    name: /Automotive/i,
  });

  if (automotive) {

    session.tenantId = automotive._id;
    session.status = "WAITING_FOR_BOT";

    await session.save();

    await sendTextMessage(
      phone,
      "✅ Switched to Automotive Care. How can I help you with your vehicle today?"
    );

    console.log("🚗 Switched to Automotive");

    return;
  }
}

if (
  lower.includes("switch to furniture") ||
  lower.includes("switch to luxury furniture") ||
  lower.includes("act like luxury furniture") ||
  lower.includes("use furniture")
) {

  const furniture = await Tenant.findOne({
    name: /Luxury Furniture/i,
  });

  if (furniture) {

    session.tenantId = furniture._id;
    session.status = "WAITING_FOR_BOT";

    await session.save();

    await sendTextMessage(
      phone,
      "✅ Switched to Luxury Furniture. How can I help you today?"
    );

    console.log("🪑 Switched to Furniture");

    return;
  }
}

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