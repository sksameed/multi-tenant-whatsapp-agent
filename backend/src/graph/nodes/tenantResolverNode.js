import Tenant from "../../models/Tenant.js";
import Session from "../../models/Session.js";

export async function tenantResolverNode(state) {

  console.log("\n=========================");
  console.log("TENANT RESOLVER");
  console.log("=========================");

  const message = state.incomingMessage.toLowerCase();

  // Load current session
  const session = await Session.findById(state.sessionId);

  if (!session) {
    throw new Error("Session not found.");
  }

  // Load all tenants
  const tenants = await Tenant.find();

  const furniture = tenants.find((t) =>
    t.name.toLowerCase().includes("furniture")
  );

  const automotive = tenants.find((t) =>
    t.name.toLowerCase().includes("automotive")
  );

  // -----------------------------
  // Explicit Tenant Switching
  // -----------------------------
  if (
    message.includes("switch to furniture") ||
    message.includes("luxury furniture") ||
    message.includes("act like furniture") ||
    message.includes("use furniture")
  ) {

    session.tenantId = furniture._id;
    await session.save();

    console.log("🪑 Switched to Luxury Furniture");

    return {
      ...state,
      tenantId: furniture._id,
    };
  }

  if (
    message.includes("switch to automotive") ||
    message.includes("automotive") ||
    message.includes("act like automotive") ||
    message.includes("use automotive")
  ) {

    session.tenantId = automotive._id;
    await session.save();

    console.log("🚗 Switched to Automotive");

    return {
      ...state,
      tenantId: automotive._id,
    };
  }

  // -----------------------------
  // First Message Auto Detection
  // -----------------------------
  if (
    message.includes("invoice") ||
    message.includes("repair") ||
    message.includes("service") ||
    message.includes("car") ||
    message.includes("vehicle")
  ) {

    session.tenantId = automotive._id;
    await session.save();

    console.log("🚗 Automotive Auto Selected");

    return {
      ...state,
      tenantId: automotive._id,
    };
  }

  if (
    message.includes("sofa") ||
    message.includes("chair") ||
    message.includes("table") ||
    message.includes("catalog") ||
    message.includes("furniture")
  ) {

    session.tenantId = furniture._id;
    await session.save();

    console.log("🪑 Furniture Auto Selected");

    return {
      ...state,
      tenantId: furniture._id,
    };
  }

  // -----------------------------
  // Continue using current tenant
  // -----------------------------
  console.log("Current Tenant:", session.tenantId);

  return {
    ...state,
    tenantId: session.tenantId,
  };
}