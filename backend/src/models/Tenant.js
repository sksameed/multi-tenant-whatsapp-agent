import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    systemPrompt: {
      type: String,
      default: "",
    },

    mediaLibrary: {
      type: Object,
      default: {},
    },

    // WhatsApp Business Phone Number ID
    phoneNumberId: {
      type: String,
      required: true,
      unique: true,
    },

    // Display phone shown in Meta
    displayPhoneNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tenant", TenantSchema);