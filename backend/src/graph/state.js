import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({

  tenantId: Annotation(),

  sessionId: Annotation(),

  phoneNumber: Annotation(),

  incomingMessage: Annotation(),

  tenant: Annotation(),

  systemPrompt: Annotation(),

  mediaLibrary: Annotation(),

  chatHistory: Annotation(),

  aiResponse: Annotation(),

  responseType: Annotation(),

  mediaToSend: Annotation(),

  action: Annotation(),

});