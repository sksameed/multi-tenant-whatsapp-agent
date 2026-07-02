import { GoogleGenAI } from "@google/genai";

let ai = null;

export function getAI() {
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return ai;
}

// =====================================
// Prompt Builder
// =====================================
export function buildPrompt(state) {

  const history = state.chatHistory
    .map((msg) => `${msg.sender}: ${msg.content}`)
    .join("\n");

  return `
You are an intelligent AI customer support assistant.

======================================================
SYSTEM PROMPT
======================================================

${state.systemPrompt}

======================================================
MEDIA AVAILABLE
======================================================

${JSON.stringify(state.mediaLibrary, null, 2)}

======================================================
CONVERSATION HISTORY
======================================================

${history || "No previous conversation."}

======================================================
LATEST CUSTOMER MESSAGE
======================================================

${state.incomingMessage}

======================================================
YOUR TASK
======================================================

Respond ONLY with valid JSON.

Never explain.

Never use markdown.

Never wrap JSON inside code blocks.

Never generate URLs.

Never generate filenames.

The backend already knows which file/image to send.

======================================================
AVAILABLE MEDIA KEYS
======================================================

The media library above contains keys like:

Furniture:
- catalog
- sofa
- diningTable

Automotive:
- invoice
- repairImage
- serviceList

Always choose the MOST APPROPRIATE media key from the media library.

======================================================
RESPONSE TYPES
======================================================

1. Customer asks for a PDF, brochure, catalog, invoice, service list, or price list.

Return:

{
  "responseType": "catalog",
  "media": "<media_key>",
  "message": "Certainly! Here is the requested document."
}

Examples:

Show catalog
→

{
  "responseType":"catalog",
  "media":"catalog",
  "message":"Certainly! Here is our latest catalog."
}

Show invoice
→

{
  "responseType":"catalog",
  "media":"invoice",
  "message":"Here is your invoice."
}

Show service list
→

{
  "responseType":"catalog",
  "media":"serviceList",
  "message":"Here is our service list."
}

------------------------------------------------------

2. Customer asks for product images.

Return:

{
  "responseType":"image",
  "media":"<media_key>",
  "message":"Here is the requested image."
}

Examples:

Show sofa

{
  "responseType":"image",
  "media":"sofa",
  "message":"Here is our premium sofa."
}

Show dining table

{
  "responseType":"image",
  "media":"diningTable",
  "message":"Here is our dining table."
}

Show repair image

{
  "responseType":"image",
  "media":"repairImage",
  "message":"Here is a repair example."
}

------------------------------------------------------

3. Customer wants a human.

Return:

{
  "responseType":"human",
  "message":"I'll connect you with a human representative."
}

------------------------------------------------------

4. Otherwise

Return

{
  "responseType":"text",
  "message":"Helpful response."
}

======================================================
IMPORTANT
======================================================

If responseType is image or catalog you MUST include a valid "media" field.

Never invent a media key.

Always choose one from the media library shown above.

Return ONLY JSON.

No markdown.

No explanation.

No extra text.
`;
}

// =====================================
// Gemini
// =====================================
export async function generateResponse(prompt) {

  const ai = getAI();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text.trim();
}

// =====================================
// Parse Gemini Response
// =====================================
export function parseResponse(raw) {

  try {

    let cleaned = raw.trim();

    if (cleaned.startsWith("```")) {
      cleaned = cleaned
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();
    }

    const parsed = JSON.parse(cleaned);

    if (!parsed.responseType) {
      parsed.responseType = "text";
    }
    if (!parsed.media) {
  parsed.media = null;
}
    if (!parsed.message) {
      parsed.message = "I'm sorry, I couldn't process that request.";
    }

    return parsed;

  } catch (err) {

    console.log("⚠ Gemini returned invalid JSON.");
    console.log(raw);

    return {
      responseType: "text",
      message:
        "I'm sorry, I couldn't understand that. Could you please rephrase?",
    };

  }

}