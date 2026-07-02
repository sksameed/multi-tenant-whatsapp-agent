import Message from "../../models/Message.js";

import { executeText } from "../../services/actions/textAction.js";
import { executeCatalog } from "../../services/actions/catalogAction.js";
import { executeImage } from "../../services/actions/imageAction.js";
import { executeHuman } from "../../services/actions/humanAction.js";

export async function dispatcherNode(state) {

  console.log("\n=========================");
  console.log("DISPATCHER NODE");
  console.log("=========================");

  let action;

  switch (state.responseType) {

    case "catalog":
      action = executeCatalog(state);
      break;

    case "image":
      action = executeImage(state);
      break;

    case "human":
      action = executeHuman(state);
      break;

    default:
      action = executeText(state);

  }

  console.log("\nAction Created:");
  console.log(action);

  await Message.create({
  tenantId: state.tenantId,
  sessionId: state.sessionId,
  sender: "bot",
  content: action.message,
  messageType: state.responseType || "text",
});

  console.log("✅ Bot response saved.");

  return {
    ...state,
    action,
  };
}