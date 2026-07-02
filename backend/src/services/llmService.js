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
RESPONSE TYPES
======================================================

1. Customer asks for:

- catalog
- brochure
- PDF
- invoice
- price list

Return

{
  "responseType":"catalog",
  "message":"Certainly! Here is our latest catalog."
}

------------------------------------------------------

2. Customer asks for

- image
- picture
- photo
- sofa image
- repair image
- showroom

Return

{
  "responseType":"image",
  "message":"Certainly! Here are the requested images."
}

------------------------------------------------------

3. Customer asks for

- human
- manager
- representative
- support agent

Return

{
  "responseType":"human",
  "message":"I'll connect you with a human representative."
}

------------------------------------------------------

4. Everything else

Return

{
  "responseType":"text",
  "message":"Helpful reply here."
}

======================================================
EXAMPLES
======================================================

Customer:
Hi

{
 "responseType":"text",
 "message":"Hello! Welcome. How may I assist you today?"
}

----------------

Customer:
Show catalog

{
 "responseType":"catalog",
 "message":"Certainly! Here is our latest catalog."
}

----------------

Customer:
Show sofa images

{
 "responseType":"image",
 "message":"Certainly! Here are the sofa images."
}

----------------

Customer:
I want to speak with a manager

{
 "responseType":"human",
 "message":"I'll connect you with a human representative."
}

======================================================
FINAL RULES
======================================================

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