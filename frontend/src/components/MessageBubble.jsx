import {
  FileText,
  Bot,
  User,
  Download,
  Image,
  UserRound,
} from "lucide-react";

const MessageBubble = ({
  message,
  catalogUrl,
}) => {
  const isUser = message.sender === "user";

  const isCatalog = message.messageType === "catalog";
  const isImage = message.messageType === "image";
  const isHuman = message.messageType === "human";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-md rounded-2xl p-4 shadow border ${
          isUser
            ? "bg-green-500 text-white"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} className="text-green-600" />
          )}

          <span className="font-semibold">
            {isUser ? "Customer" : "AI Assistant"}
          </span>
        </div>

        {/* ================= Catalog ================= */}
        {!isUser && isCatalog ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={22} className="text-blue-600" />

              <h3 className="font-bold text-lg">
                Furniture Catalog
              </h3>
            </div>

            <p className="text-gray-700">
              {message.content}
            </p>

            <button
            onClick={() => window.open(catalogUrl, "_blank")}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
            <Download size={18} />
            Download Catalog
            </button>
          </>
        ) : !isUser && isImage ? (
          /* ================= Image ================= */
          <>
            <div className="flex items-center gap-2 mb-3">
              <Image size={22} className="text-purple-600" />

              <h3 className="font-bold text-lg">
                Product Images
              </h3>
            </div>

            <p className="text-gray-700">
              {message.content}
            </p>

            <div className="mt-4 rounded-lg border border-dashed p-4 text-center text-gray-500">
              Images will appear here.
            </div>
          </>
        ) : !isUser && isHuman ? (
          /* ================= Human ================= */
          <>
            <div className="flex items-center gap-2 mb-3">
              <UserRound size={22} className="text-red-600" />

              <h3 className="font-bold text-lg">
                Human Support
              </h3>
            </div>

            <p className="text-gray-700">
              {message.content}
            </p>
          </>
        ) : (
          /* ================= Text ================= */
          <p>{message.content}</p>
        )}

        {/* Timestamp */}
        <div className="text-xs text-right mt-4 opacity-70">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;