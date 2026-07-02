import axios from "axios";

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;

const API_URL = `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

// =========================================
// Generic WhatsApp Sender
// =========================================
async function sendRequest(payload, successMessage) {
  try {
    console.log("\n==============================");
    console.log(successMessage);
    console.log("==============================");
    console.log(payload);

    const response = await axios.post(
      API_URL,
      payload,
      { headers }
    );

    console.log("✅ Success");

    return response.data;

  } catch (error) {

    console.error("❌ WhatsApp API Error");

    console.error(
      error.response?.data || error.message
    );

    throw error;
  }
}

// =========================================
// Send Text
// =========================================
export async function sendTextMessage(
  to,
  text
) {

  return sendRequest(
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: {
        body: text,
      },
    },
    "SEND TEXT"
  );

}

// =========================================
// Send Image
// =========================================
export async function sendImageMessage(
  to,
  imageUrl,
  caption = ""
) {

  return sendRequest(
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "image",
      image: {
        link: imageUrl,
        caption,
      },
    },
    "SEND IMAGE"
  );

}

// =========================================
// Send Document
// =========================================
export async function sendDocumentMessage(
  to,
  documentUrl,
  filename = "Catalog.pdf"
) {

  return sendRequest(
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "document",
      document: {
        link: documentUrl,
        filename,
      },
    },
    "SEND DOCUMENT"
  );

}

// =========================================
// Mark Message Read
// =========================================
export async function markAsRead(
  messageId
) {

  try {

    await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      },
      {
        headers,
      }
    );

    console.log("✅ Message Marked Read");

  } catch (error) {

    console.error("❌ Read Receipt Error");

    console.error(
      error.response?.data || error.message
    );

  }

}