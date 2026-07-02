import axios from "axios";

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const TOKEN = process.env.WHATSAPP_TOKEN;

const API_URL = `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

// -----------------------------
// Send Text
// -----------------------------
export async function sendTextMessage(to, text) {
  try {
    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
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

    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
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
  filename = "Document"
) {
  try {

    const response = await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
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
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

// -----------------------------
// Typing Indicator
// -----------------------------
export async function sendTypingIndicator(to) {

  try {

    await axios.post(
      API_URL,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "typing_indicator",
        typing_indicator: {
          type: "text",
        },
      },
      { headers }
    );

    console.log("⌨️ Typing Indicator Sent");

  } catch (error) {

    console.error(error.response?.data || error.message);

  }
}