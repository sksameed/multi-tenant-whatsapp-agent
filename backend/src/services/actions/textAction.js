export function executeText(state) {
  return {
    type: "SEND_TEXT",
    message: state.aiResponse,
  };
}