export function executeCatalog(state) {
  const file =
    state.mediaLibrary.catalog ||
    state.mediaLibrary.serviceList ||
    state.mediaLibrary.invoice;

  return {
    type: "SEND_CATALOG",
    message: state.aiResponse,
    url: `${process.env.BASE_URL}${file}`,
  };
}