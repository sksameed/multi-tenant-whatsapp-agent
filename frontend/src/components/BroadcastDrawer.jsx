import { useState } from "react";
import api from "../services/api";

export default function BroadcastDrawer({ tenantId }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendBroadcast = async () => {
    if (!tenantId) {
      alert("Please select a tenant.");
      return;
    }

    if (!name.trim() || !message.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/campaigns", {
        tenantId,
        name,
        messageTemplate: message,
      });

      alert(
        `Broadcast sent successfully to ${
          res.data.recipients || 0
        } customers`
      );

      setName("");
      setMessage("");
    } catch (err) {
      console.error("Broadcast Error:", err);

      alert(
        err.response?.data?.message ||
          "Failed to send broadcast."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border mt-5">
      <h2 className="text-xl font-bold mb-4">
        Broadcast Campaign
      </h2>

      <input
        type="text"
        className="w-full border rounded p-2 mb-3"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        rows={5}
        className="w-full border rounded p-2 mb-3"
        placeholder="Broadcast Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendBroadcast}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Broadcast"}
      </button>
    </div>
  );
}