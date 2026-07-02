import { graph } from "../graph/graph.js";
import Message from "../models/Message.js";

export const testAgent = async (req, res) => {
  try {
    const { tenantId, sessionId, phoneNumber, message } = req.body;

    // Save incoming user message
    await Message.create({
      tenantId,
      sessionId,
      sender: "user",
      content: message,
      messageType: "text",
    });

    // Run LangGraph
    const result = await graph.invoke({
      tenantId,
      sessionId,
      phoneNumber,
      incomingMessage: message,

      tenant: null,
      chatHistory: [],

      aiResponse: null,
      responseType: "text",
      mediaToSend: null,
    });

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};