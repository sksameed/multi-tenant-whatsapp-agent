import {
  Bot,
  User,
  FileText,
  Image as ImageIcon,
  Download,
  UserRound,
} from "lucide-react";

const MessageBubble = ({ message }) => {

  const isUser = message.sender === "user";

  const isCatalog =
    message.messageType === "catalog";

  const isImage =
    message.messageType === "image";

  const isHuman =
    message.messageType === "human";

  const bubbleStyle = isUser
    ? "bg-green-600 text-white rounded-br-md"
    : "bg-white border border-gray-200 rounded-bl-md";

  return (

    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-5`}
    >

      <div
        className={`max-w-lg shadow-md rounded-2xl px-5 py-4 ${bubbleStyle}`}
      >

        {/* Header */}

        <div className="flex items-center gap-2 mb-3">

          {isUser ? (
            <User size={18} />
          ) : (
            <Bot
              size={18}
              className="text-green-600"
            />
          )}

          <span className="font-semibold">

            {isUser
              ? "Customer"
              : "AI Assistant"}

          </span>

        </div>

        {/* ========================= */}
        {/* Catalog */}
        {/* ========================= */}

        {!isUser && isCatalog && (

          <>

            <div className="flex items-center gap-2 mb-3">

              <FileText
                size={22}
                className="text-blue-600"
              />

              <span className="font-bold">

                Furniture Catalog

              </span>

            </div>

            <p className="text-gray-700">

              {message.content}

            </p>

            {message.mediaUrl && (

              <button
                onClick={() =>
                  window.open(
                    message.mediaUrl,
                    "_blank"
                  )
                }
                className="mt-4 w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
              >

                <Download size={18} />

                Download Catalog

              </button>

            )}

          </>

        )}

        {/* ========================= */}
        {/* Image */}
        {/* ========================= */}

        {!isUser &&
          isImage && (

            <>

              <div className="flex items-center gap-2 mb-3">

                <ImageIcon
                  size={22}
                  className="text-purple-600"
                />

                <span className="font-bold">

                  Product Image

                </span>

              </div>

              <p className="text-gray-700">

                {message.content}

              </p>

              {message.mediaUrl && (

                <img
                  src={message.mediaUrl}
                  alt="Product"
                  className="mt-4 rounded-xl border w-full object-cover shadow"
                />

              )}

            </>

          )}

        {/* ========================= */}
        {/* Human */}
        {/* ========================= */}

        {!isUser &&
          isHuman && (

            <>

              <div className="flex items-center gap-2 mb-3">

                <UserRound
                  size={22}
                  className="text-red-600"
                />

                <span className="font-bold">

                  Human Support

                </span>

              </div>

              <p className="text-gray-700">

                {message.content}

              </p>

            </>

          )}

        {/* ========================= */}
        {/* Normal Text */}
        {/* ========================= */}

        {(!isCatalog &&
          !isImage &&
          !isHuman) && (

          <p>{message.content}</p>

        )}

        {/* Timestamp */}

        <div
          className={`text-xs mt-4 ${
            isUser
              ? "text-green-100"
              : "text-gray-400"
          } text-right`}
        >

          {new Date(
            message.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}

        </div>

      </div>

    </div>

  );

};

export default MessageBubble;