export async function acknowledgeNode(state) {

  console.log("\n=========================");
  console.log("ACKNOWLEDGE NODE");
  console.log("=========================");

  console.log("Incoming Message:");
  console.log(state.incomingMessage);

  return state;
}