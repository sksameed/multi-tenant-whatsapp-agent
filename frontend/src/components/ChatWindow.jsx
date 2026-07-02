import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({
  selectedSession,
  messages,
  catalogUrl,
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 h-[600px] flex flex-col">

      {/* Header */}
      <div className="border-b p-5 bg-white rounded-t-xl">

        <h2 className="text-2xl font-bold">
          Conversation
        </h2>

        {selectedSession && (
          <p className="text-sm text-gray-500 mt-1">
            {selectedSession.phoneNumber}
          </p>
        )}

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-5">

        {!selectedSession ? (

          <div className="h-full flex items-center justify-center text-gray-500">
            Select a session
          </div>

        ) : messages.length === 0 ? (

          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet
          </div>

        ) : (

          <>
            {messages.map((message) => (
              <MessageBubble
              key={message._id}
              message={message}
              catalogUrl={catalogUrl}
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