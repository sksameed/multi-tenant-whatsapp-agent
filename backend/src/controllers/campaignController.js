import Campaign from "../models/Campaign.js";
import Session from "../models/Session.js";
import { sendTextMessage } from "../services/whatsappService.js";

export const createCampaign = async (req, res) => {
  try {
    const { tenantId, name, messageTemplate } = req.body;

    // Save campaign
    const campaign = await Campaign.create({
      tenantId,
      name,
      messageTemplate,
    });

    // Get all sessions for this tenant
    const sessions = await Session.find({ tenantId });

    // Send broadcast
    for (const session of sessions) {
      await sendTextMessage(
        session.phoneNumber,
        messageTemplate
      );
    }

    res.json({
      success: true,
      campaign,
      recipients: sessions.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};