import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "WAITING_FOR_BOT",
        "AGENT_RESPONDING",
        "RESOLVED",
        "NEEDS_HUMAN",
      ],
      default: "WAITING_FOR_BOT",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Session", SessionSchema);