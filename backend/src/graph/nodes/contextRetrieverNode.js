import Tenant from "../../models/Tenant.js";
import Message from "../../models/Message.js";

export async function contextRetrieverNode(state) {

  console.log("\n=========================");
  console.log("CONTEXT RETRIEVER");
  console.log("=========================");

  // Load Tenant
  const tenant = await Tenant.findById(state.tenantId);

  // Load last 5 messages
  const messages = await Message.find({
    sessionId: state.sessionId,
  })
    .sort({ createdAt: -1 })
    .limit(5);

  console.log("Tenant Loaded:", tenant.name);

  console.log("History Loaded:", messages.length);

  return {

    ...state,

    tenant,

    systemPrompt: tenant.systemPrompt,

    mediaLibrary: tenant.mediaLibrary,

    chatHistory: messages.reverse(),

  };

}