export function executeHuman(state) {
  return {
    type: "SEND_HUMAN",
    message: state.aiResponse,
  };
}