import { useMemo, useState } from "react";
import {
  Clock,
  Phone,
  MessageCircle,
  Search,
} from "lucide-react";

const statusStyles = {
  WAITING_FOR_BOT: {
    label: "Waiting",
    color: "bg-yellow-100 text-yellow-700",
  },
  NEEDS_HUMAN: {
    label: "Needs Human",
    color: "bg-red-100 text-red-700",
  },
  RESOLVED: {
    label: "Resolved",
    color: "bg-green-100 text-green-700",
  },
  AGENT_RESPONDING: {
    label: "AI Responding",
    color: "bg-blue-100 text-blue-700",
  },
};

function getRelativeTime(date) {

  const diff = Math.floor(
    (Date.now() - new Date(date)) / 1000
  );

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  return `${Math.floor(diff / 86400)} day ago`;
}

const SessionList = ({
  sessions = [],
  selectedSession,
  onSessionSelect,
}) => {

  const [search, setSearch] = useState("");

  const filteredSessions = useMemo(() => {

    return sessions.filter((session) =>
      session.phoneNumber
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [sessions, search]);

  return (
    <div className="bg-white rounded-2xl shadow border h-full flex flex-col">

      {/* Header */}

      <div className="p-5 border-b">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold flex items-center gap-2">

              <MessageCircle
                className="text-green-600"
                size={28}
              />

              Sessions

            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {filteredSessions.length} Active Conversation(s)
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="relative mt-4">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </div>

      {/* Sessions */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {filteredSessions.length === 0 && (

          <div className="text-center py-10 text-gray-500">

            <MessageCircle
              size={42}
              className="mx-auto mb-3 text-gray-300"
            />

            <p>No active sessions found.</p>

          </div>

        )}

        {filteredSessions.map((session) => {

          const status =
            statusStyles[session.status] ||
            statusStyles.WAITING_FOR_BOT;

          const selected =
            selectedSession?._id === session._id;

          return (

            <div
              key={session._id}
              onClick={() =>
                onSessionSelect(session)
              }
              className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300

              ${
                selected
                  ? "border-green-500 bg-green-50 shadow-lg scale-[1.02]"
                  : "hover:border-green-300 hover:shadow-md"
              }
              `}
            >

              <div className="flex justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <Phone
                      size={17}
                      className="text-gray-500"
                    />

                    <span className="font-semibold">

                      {session.phoneNumber}

                    </span>

                    <span className="h-2 w-2 rounded-full bg-green-500"></span>

                  </div>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                  >
                    {status.label}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">

                <Clock size={14} />

                {getRelativeTime(session.updatedAt)}

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );

};

export default SessionList;