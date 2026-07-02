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
      .populate("tenantId");

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
export const findOrCreateSession = async (
  phoneNumber,
  tenantId
) => {
  let session = await Session.findOne({
    phoneNumber,
    tenantId,
  });

  if (!session) {
    session = await Session.create({
      phoneNumber,
      tenantId,
      status: "WAITING_FOR_BOT",
    });

    console.log("✅ New session created");
  }

  return session;
};