import {
  buildPrompt,
  generateResponse,
  parseResponse,
} from "../../services/llmService.js";

export async function reasoningNode(state) {

  console.log("\n=========================");
  console.log("REASONING NODE");
  console.log("=========================");

  try {

    console.log("Building Prompt...");

    const prompt = buildPrompt(state);

    console.log("Calling Gemini...");

    const raw = await generateResponse(prompt);

    console.log("\nGemini Raw:");
    console.log(raw);

    const parsed = parseResponse(raw);

    console.log("\nParsed Response:");
    console.log(parsed);

    return {

      ...state,

      aiResponse: parsed.message,

      responseType: parsed.responseType,

      // NEW
      media: parsed.media || null,

    };

  } catch (err) {

    console.error(err);

    throw err;

  }

}