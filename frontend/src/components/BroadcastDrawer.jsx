import { useState } from "react";
import axios from "axios";

export default function BroadcastDrawer({ tenantId }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendBroadcast = async () => {
    if (!name || !message) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "/campaigns",
        {
          tenantId,
          name,
          messageTemplate: message,
        }
      );

      alert(
        `Broadcast sent to ${res.data.recipients} customers`
      );

      setName("");
      setMessage("");

    } catch (err) {

      alert(
        err.response?.data?.message || err.message
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
        className="w-full border rounded p-2 mb-3"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <textarea
        rows={5}
        className="w-full border rounded p-2 mb-3"
        placeholder="Broadcast Message"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={sendBroadcast}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        {loading
          ? "Sending..."
          : "Send Broadcast"}
      </button>

    </div>
  );
}