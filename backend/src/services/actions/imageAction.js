export function executeImage(state) {
  return {
    type: "SEND_IMAGE",
    message: state.aiResponse,
    url:
      state.mediaLibrary.sofa ||
      state.mediaLibrary.table ||
      state.mediaLibrary.repairImage,
  };
}