import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TenantSwitcher from "../components/TenantSwitcher";
import SessionList from "../components/SessionList";
import ChatWindow from "../components/ChatWindow";
import StatsCards from "../components/StatsCards";
import BroadcastDrawer from "../components/BroadcastDrawer";

import { getTenants } from "../services/tenantApi";
import { getSessions } from "../services/sessionApi";
import { getMessages } from "../services/messageApi";

const Dashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Load tenants once
  // -----------------------------
  useEffect(() => {
    loadTenants();
  }, []);

  // -----------------------------
  // Load sessions when tenant changes
  // -----------------------------
  useEffect(() => {
    if (selectedTenant) {
      setSelectedSession(null);
      loadSessions(selectedTenant);
    } else {
      setSessions([]);
      setSelectedSession(null);
    }
  }, [selectedTenant]);

  // -----------------------------
  // Load messages when session changes
  // -----------------------------
  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession._id);
    } else {
      setMessages([]);
    }
  }, [selectedSession]);
// -----------------------------
// Auto Refresh
// -----------------------------
useEffect(() => {
  if (!selectedTenant) return;

  const interval = setInterval(() => {
    loadSessions(selectedTenant);

    if (selectedSession) {
      loadMessages(selectedSession._id);
    }
  }, 3000);

  return () => clearInterval(interval);
}, [selectedTenant, selectedSession]);
  // -----------------------------
  // Load Tenants
  // -----------------------------
  const loadTenants = async () => {
    try {
      const response = await getTenants();

      console.log("Tenants:", response.data.data);

      setTenants(response.data.data);
    } catch (error) {
      console.error("Error loading tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Load Sessions
  // -----------------------------
  const loadSessions = async (tenantId) => {
    try {
      const response = await getSessions();

      const tenantSessions = response.data.data.filter(
        (session) => session.tenantId._id === tenantId
      );

      setSessions(tenantSessions);
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  // -----------------------------
  // Load Messages
  // -----------------------------
  const loadMessages = async (sessionId) => {
    try {
      const response = await getMessages();

      const sessionMessages = response.data.data.filter(
        (message) => message.sessionId._id === sessionId
      );

      setMessages(sessionMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-4 space-y-6">

        {loading ? (
          <p className="text-gray-600">Loading tenants...</p>
        ) : (
          <>
            <TenantSwitcher
              tenants={tenants}
              selectedTenant={selectedTenant}
              onTenantChange={setSelectedTenant}
            />

            {selectedTenant && (
              <StatsCards sessions={sessions} />
            )}
          </>
        )}

        {selectedTenant && (
  <>
    {/* Broadcast */}
    <BroadcastDrawer tenantId={selectedTenant} />

    <div className="grid grid-cols-12 gap-6">

      {/* Session List */}
      <div className="col-span-4">
        <SessionList
          sessions={sessions}
          selectedSession={selectedSession}
          onSessionSelect={setSelectedSession}
        />
      </div>

      {/* Chat Window */}
      <div className="col-span-8">
        <ChatWindow
          selectedSession={selectedSession}
          messages={messages}
          catalogUrl={
            tenants.find((t) => t._id === selectedTenant)?.mediaLibrary?.catalog
          }
        />
      </div>

    </div>
  </>
)}

      </div>
    </div>
  );
};

export default Dashboard;