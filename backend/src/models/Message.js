import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    sender: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    messageType: {
      type: String,
      enum: [
        "text",
        "image",
        "catalog",
        "document",
        "human",
      ],
      default: "text",
    },

    // URL of image/document (optional)
    mediaUrl: {
      type: String,
      default: "",
    },

    // Optional filename (for PDFs, catalogs, etc.)
    fileName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);