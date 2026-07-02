import Session from "../models/Session.js";

// =====================================
// Create Session
// =====================================
export const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);

    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Sessions
// =====================================
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("tenantId")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Find Existing Session or Create New One
// =====================================
export const findOrCreateSession = async (
  phoneNumber,
  defaultTenantId
) => {

  let session = await Session.findOne({
    phoneNumber,
  });

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