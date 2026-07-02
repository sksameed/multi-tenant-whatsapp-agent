import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    // Original tenant (kept for compatibility)
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    // Current assistant being used in this conversation
    activeTenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      default: null,
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