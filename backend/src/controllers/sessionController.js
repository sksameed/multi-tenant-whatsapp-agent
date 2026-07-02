import Session from "../models/Session.js";

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

// ======================================================
// Find Existing Session or Create New One
// ======================================================
export const findOrCreateSession = async (
  phoneNumber,
  tenantId
) => {

  let session = await Session.findOne({
    phoneNumber,
    tenantId,
  });

  // -----------------------------
  // Create New Session
  // -----------------------------
  if (!session) {

    session = await Session.create({
      phoneNumber,
      tenantId,
      status: "WAITING_FOR_BOT",
    });

    console.log("✅ New Session Created");

  } else {

    // -----------------------------
    // Existing User Sent New Message
    // Reset status
    // -----------------------------
    session.status = "WAITING_FOR_BOT";

    session.updatedAt = new Date();

    await session.save();

    console.log("🔄 Existing Session Updated");

  }

  return session;
};