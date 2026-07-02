import { Clock, Phone, MessageCircle } from "lucide-react";

const statusStyles = {
  WAITING_FOR_BOT: {
    label: "Waiting",
    color: "bg-yellow-100 text-yellow-700",
  },
  NEEDS_HUMAN: {
    label: "Human Needed",
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

const SessionList = ({
  sessions,
  selectedSession,
  onSessionSelect,
}) => {
  return (
    <div className="bg-white rounded-xl shadow border h-full">

      <div className="p-5 border-b">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="text-green-600" size={28} />
          Active Sessions
        </h2>
      </div>

      <div className="p-4 space-y-4">

        {sessions.length === 0 && (
          <p className="text-gray-500 text-center">
            No active sessions
          </p>
        )}

        {sessions.map((session) => {
          const status =
            statusStyles[session.status] ||
            statusStyles.WAITING_FOR_BOT;

          const selected =
            selectedSession?._id === session._id;

          return (
            <div
              key={session._id}
              onClick={() => onSessionSelect(session)}
              className={`
                cursor-pointer
                rounded-xl
                border
                p-4
                transition-all
                duration-200

                ${
                  selected
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "hover:shadow hover:border-gray-300"
                }
              `}
            >
              <div className="flex justify-between items-start">

                <div>

                  <div className="flex items-center gap-2">

                    <Phone
                      size={18}
                      className="text-gray-500"
                    />

                    <h3 className="font-bold text-lg">
                      {session.phoneNumber}
                    </h3>

                  </div>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                  >
                    {status.label}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

                <Clock size={14} />

                {new Date(session.updatedAt).toLocaleString()}

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionList;