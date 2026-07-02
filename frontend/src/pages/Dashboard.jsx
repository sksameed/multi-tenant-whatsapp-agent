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

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadTenants();
  }, []);

  // =====================================
  // Tenant Changed
  // =====================================

  useEffect(() => {

    if (!selectedTenant) {

      setSessions([]);
      setSelectedSession(null);

      return;
    }

    setSelectedSession(null);

    loadSessions(selectedTenant);

  }, [selectedTenant]);

  // =====================================
  // Session Changed
  // =====================================

  useEffect(() => {

    if (!selectedSession) {

      setMessages([]);

      return;
    }

    loadMessages(selectedSession._id);

  }, [selectedSession]);

  // =====================================
  // Auto Refresh
  // =====================================

  useEffect(() => {

    if (!selectedTenant) return;

    const interval = setInterval(async () => {

      await loadSessions(selectedTenant);

      if (selectedSession) {
        await loadMessages(selectedSession._id);
      }

    }, 3000);

    return () => clearInterval(interval);

  }, [selectedTenant, selectedSession]);

  // =====================================
  // Load Tenants
  // =====================================

  async function loadTenants() {

    try {

      const response = await getTenants();

      setTenants(response.data.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  // =====================================
  // Load Sessions
  // =====================================

  async function loadSessions(tenantId) {

    try {

      const response = await getSessions();

      const filtered = response.data.data.filter(
        (session) =>
          session.tenantId._id === tenantId
      );

      setSessions(filtered);

    } catch (err) {

      console.error(err);

    }

  }

  // =====================================
  // Load Messages
  // =====================================

  async function loadMessages(sessionId) {

    try {

      const response = await getMessages();

      const filtered = response.data.data.filter(
        (message) =>
          message.sessionId._id === sessionId
      );

      setMessages(filtered);

    } catch (err) {

      console.error(err);

    }

  }

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-6">

        {loading ? (

          <div className="flex justify-center py-24">

            <div className="text-lg font-medium text-gray-500">

              Loading Dashboard...

            </div>

          </div>

        ) : (

          <>

            {/* Tenant */}

            <TenantSwitcher
              tenants={tenants}
              selectedTenant={selectedTenant}
              onTenantChange={setSelectedTenant}
            />

            {selectedTenant && (

              <>

                <div className="mt-6">

                  <StatsCards
                    sessions={sessions}
                  />

                </div>

                <div className="mt-6">

                  <BroadcastDrawer
                    tenantId={selectedTenant}
                  />

                </div>

                <div className="grid grid-cols-12 gap-6 mt-6">

                  {/* Session List */}

                  <div className="col-span-12 lg:col-span-4">

                    <SessionList
                      sessions={sessions}
                      selectedSession={selectedSession}
                      onSessionSelect={
                        setSelectedSession
                      }
                    />

                  </div>

                  {/* Chat */}

                  <div className="col-span-12 lg:col-span-8">

                    <ChatWindow
                      selectedSession={
                        selectedSession
                      }
                      messages={messages}
                    />

                  </div>

                </div>

              </>

            )}

            {!selectedTenant && (

              <div className="bg-white rounded-2xl shadow border mt-8 p-16 text-center">

                <h2 className="text-3xl font-bold text-gray-700">

                  Welcome 👋

                </h2>

                <p className="text-gray-500 mt-4">

                  Select a tenant to start managing
                  WhatsApp conversations.

                </p>

              </div>

            )}

          </>

        )}

      </div>

    </div>

  );

};

export default Dashboard;