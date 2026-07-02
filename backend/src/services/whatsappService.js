import axios from "axios";

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;

const API_URL = `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

// -----------------------------
// Send Text
// -----------------------------
export async function sendTextMessage(to, text) {
  try {
    console.log("========== SEND TEXT ==========");
    console.log("To:", to);
    console.log("Phone Number ID:", PHONE_NUMBER_ID);
    console.log("Message:", text);

    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: {
          body: text,
        },
      },
      { headers }
    );

    console.log("✅ Text Sent");
    return response.data;

  } catch (error) {

    console.error("❌ SEND TEXT ERROR");
    console.error(error.response?.data || error.message);

    throw error;
  }
}

// -----------------------------
// Send Image
// -----------------------------
export async function sendImageMessage(
  to,
  imageUrl,
  caption = ""
) {
  try {

    console.log("========== SEND IMAGE ==========");

    const response = await axios.post(
      API_URL,
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
      { headers }
    );

    console.log("✅ Image Sent");

    return response.data;

  } catch (error) {

    console.error("❌ IMAGE ERROR");
    console.error(error.response?.data || error.message);

    throw error;

  }
}

// -----------------------------
// Send Document
// -----------------------------
export async function sendDocumentMessage(
  to,
  documentUrl,
  filename = "Catalog.pdf"
) {
  try {

    console.log("========== SEND DOCUMENT ==========");

    const response = await axios.post(
      API_URL,
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
      { headers }
    );

    console.log("✅ Document Sent");

    return response.data;

  } catch (error) {

    console.error("❌ DOCUMENT ERROR");
    console.error(error.response?.data || error.message);

    throw error;

  }
}

// -----------------------------
// Mark Message Read
// -----------------------------
export async function markAsRead(messageId) {
  try {

    await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      },
      { headers }
    );

    console.log("✅ Message marked as read");

  } catch (error) {

    console.error("❌ READ ERROR");
    console.error(error.response?.data || error.message);

  }
}