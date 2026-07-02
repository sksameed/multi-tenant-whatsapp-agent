import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
console.log("BASE_URL:", process.env.BASE_URL);
console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173","https://multi-tenant-whatsapp-agent-seven.vercel.app"],
  credentials: true,
}));

app.use(express.json());

// Connect Database
connectDB();
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
// Routes
app.use("/api/tenants", tenantRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/agent", agentRoutes);
app.use("/webhook", webhookRoutes);
app.use("/api/campaigns", campaignRoutes);
// Test Route
app.get("/", (req, res) => {
  res.json({
    status: "running",
    project: "Multi-Tenant WhatsApp Agent",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});