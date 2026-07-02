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

// ------------------------
// Prompt Builder
// ------------------------
// ------------------------
// Prompt Builder
// ------------------------
export function buildPrompt(state) {
  const history = state.chatHistory
    .map((msg) => `${msg.sender}: ${msg.content}`)
    .join("\n");

  return `
You are an AI assistant.

System Prompt:
${state.systemPrompt}

Media Library:
${JSON.stringify(state.mediaLibrary)}

Conversation History:
${history}

Latest User Message:
${state.incomingMessage}

You must return ONLY valid JSON.

Rules:

1. If the customer asks for a catalog, brochure, price list, or PDF:

Return

{
  "responseType": "catalog",
  "message": "Certainly! Here is our latest furniture catalog."
}

IMPORTANT:
- DO NOT include URLs.
- DO NOT include filenames.
- DO NOT invent links.
- The application will attach the correct catalog automatically.

--------------------------------------------------

2. If the customer asks for product images, showroom photos, sofa pictures, etc.

Return

{
  "responseType": "image",
  "message": "Certainly! Here are some product images."
}

IMPORTANT:
- DO NOT include image URLs.
- The application already knows which image to send.

--------------------------------------------------

3. If the customer wants a human representative

Return

{
  "responseType": "human",
  "message": "I'll connect you with a human representative."
}

--------------------------------------------------

4. Otherwise

Return

{
  "responseType": "text",
  "message": "..."
}

--------------------------------------------------

IMPORTANT

Return ONLY raw JSON.

Do NOT use markdown.

Do NOT wrap JSON inside \`\`\`json.

Your response must begin with {

and end with }.
`;
}
// ------------------------
// Gemini Call
// ------------------------
export async function generateResponse(prompt) {

  const ai = getAI();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text.trim();
}

// ------------------------
// Parse Gemini JSON
// ------------------------
export function parseResponse(raw) {

  try {

    // Remove Markdown code fences if Gemini adds them
    let cleaned = raw.trim();

    if (cleaned.startsWith("```")) {
      cleaned = cleaned
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/, "")
        .trim();
    }

    return JSON.parse(cleaned);

  } catch (err) {

    console.log("Could not parse JSON. Falling back to text.");

    return {
      responseType: "text",
      message: raw,
    };

  }

}