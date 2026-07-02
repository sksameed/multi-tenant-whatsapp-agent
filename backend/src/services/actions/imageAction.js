export function executeImage(state) {

  // Media key selected by Gemini
  const file = state.mediaLibrary[state.media];

  if (!file) {
    throw new Error(
      `Image '${state.media}' not found in media library.`
    );
  }

  return {
    type: "SEND_IMAGE",
    message: state.aiResponse,
    url: `${process.env.BASE_URL}${file}`,
  };

}