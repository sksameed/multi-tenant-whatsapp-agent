export function executeCatalog(state) {

  // Media key selected by Gemini
  const file = state.mediaLibrary[state.media];

  if (!file) {
    throw new Error(
      `Document '${state.media}' not found in media library.`
    );
  }

  return {
    type: "SEND_CATALOG",
    message: state.aiResponse,
    url: `${process.env.BASE_URL}${file}`,
  };

}