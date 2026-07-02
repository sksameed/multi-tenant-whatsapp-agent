export function executeImage(state) {
  const file =
    state.mediaLibrary.sofa ||
    state.mediaLibrary.table ||
    state.mediaLibrary.repairImage;

  return {
    type: "SEND_IMAGE",
    message: state.aiResponse,
    url: `${process.env.BASE_URL}${file}`,
  };
}