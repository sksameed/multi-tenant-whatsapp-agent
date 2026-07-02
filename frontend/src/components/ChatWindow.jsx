import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({
  selectedSession,
  messages = [],
}) => {

  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 h-[650px] flex flex-col">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="border-b px-6 py-5 bg-white rounded-t-2xl">

        <div className="flex items-center gap-3">

          <MessageCircle
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="text-2xl font-bold">

              Conversation

            </h2>

            {selectedSession ? (

              <p className="text-gray-500 text-sm mt-1">

                Customer: {selectedSession.phoneNumber}

              </p>

            ) : (

              <p className="text-gray-400 text-sm">

                Select a session to begin

              </p>

            )}

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Messages */}
      {/* ========================= */}

      <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-5">

        {!selectedSession ? (

          <div className="h-full flex flex-col items-center justify-center text-gray-400">

            <MessageCircle
              size={60}
              className="mb-4"
            />

            <h3 className="text-lg font-semibold">

              No Conversation Selected

            </h3>

            <p className="mt-2">

              Choose a customer from the left panel.

            </p>

          </div>

        ) : messages.length === 0 ? (

          <div className="h-full flex flex-col items-center justify-center text-gray-400">

            <MessageCircle
              size={60}
              className="mb-4"
            />

            <h3 className="text-lg font-semibold">

              No Messages Yet

            </h3>

            <p className="mt-2">

              Waiting for customer messages...

            </p>

          </div>

        ) : (

          <>
            {messages.map((message) => (

              <MessageBubble
                key={message._id}
                message={message}
              />

            ))}

            <div ref={messagesEndRef} />

          </>

        )}

      </div>

    </div>
  );

};

export default ChatWindow;