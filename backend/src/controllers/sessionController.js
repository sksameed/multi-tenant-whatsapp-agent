export const findOrCreateSession = async (
  phoneNumber,
  defaultTenantId
) => {

  // Search ONLY by phone number
  let session = await Session.findOne({
    phoneNumber,
  });

  // -----------------------------
  // First Conversation
  // -----------------------------
  if (!session) {

    session = await Session.create({
      phoneNumber,
      tenantId: defaultTenantId,
      status: "WAITING_FOR_BOT",
    });

    console.log("✅ New Session Created");

  } else {

    session.status = "WAITING_FOR_BOT";

    session.updatedAt = new Date();

    await session.save();

    console.log("🔄 Existing Session Updated");
    console.log("Current Tenant:", session.tenantId);

  }

  return session;
};