import Tenant from "../../models/Tenant.js";
import Message from "../../models/Message.js";

export async function contextRetrieverNode(state) {

  console.log("\n=========================");
  console.log("CONTEXT RETRIEVER");
  console.log("=========================");

  // -----------------------------
  // Load Tenant
  // -----------------------------
  const tenant = await Tenant.findById(state.tenantId);

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  // -----------------------------
  // Load Conversation History
  // -----------------------------
  const messages = await Message.find({
    sessionId: state.sessionId,
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  console.log("🏢 Tenant:", tenant.name);
  console.log("💬 Messages Loaded:", messages.length);

  return {
    ...state,

    tenant,

    systemPrompt: tenant.systemPrompt,

    mediaLibrary: tenant.mediaLibrary,

    chatHistory: messages.reverse(),
  };
}