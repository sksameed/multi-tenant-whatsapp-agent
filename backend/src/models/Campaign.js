import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    messageTemplate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", CampaignSchema);