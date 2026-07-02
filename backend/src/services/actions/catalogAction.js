export function executeCatalog(state) {
  return {
    type: "SEND_CATALOG",
    message: state.aiResponse,
    url:
      state.mediaLibrary.catalog ||
      state.mediaLibrary.serviceList ||
      state.mediaLibrary.invoice,
  };
}