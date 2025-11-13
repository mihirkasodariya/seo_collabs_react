import { useEffect, useState, useRef } from "react";
import {
  Search,
  UserPlus,
  MessageCircle,
  Paperclip,
  Send,
  Check,
} from "lucide-react";
import { getMessages, getChatUsers } from "../../api/chat/chat";
import { connectSocket, disconnectSocket, getSocket } from "../../api/socket";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  setPageTitle: (title: string) => void;
}
export function Chat() {
  const { setPageTitle } = useOutletContext<LayoutContext>();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const userId = localStorage.getItem("userId") || "";
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load chat users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getChatUsers(userId);
        setChats(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching chat users:", err);
      }
    };
    if (userId) fetchUsers();
  }, [userId]);

  // Load messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;
      try {
        setLoading(true);
        const res = await getMessages(userId, selectedChat);
        setMessages(res.data || []);
        setUnreadCounts((prev) => ({ ...prev, [selectedChat]: 0 }));
        const socket = getSocket();
        if (socket) socket.emit("markSeen", { userId, partnerId: selectedChat });
      } catch (err) {
        console.error("❌ Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [selectedChat, userId]);

  // Socket setup
  useEffect(() => {
    if (!userId) return;
    const socket = connectSocket(userId);

    socket.on("receiveMessage", (msg) => {
      if (msg.senderId === selectedChat) {
        setMessages((prev) => [...prev, msg]);
        socket.emit("markSeen", { userId, partnerId: msg.senderId });
      } else {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.senderId]: (prev[msg.senderId] || 0) + 1,
        }));
      }
    });

    socket.on("messageSent", (msg) => {
      if (msg.receiverId === selectedChat || msg.senderId === selectedChat) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("messageSeen", ({ userId: seenBy, partnerId }) => {
      if (partnerId === userId && selectedChat === seenBy) {
        setMessages((prev) =>
          prev.map((m) => (m.senderId === userId ? { ...m, seen: true } : m))
        );
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageSent");
      socket.off("messageSeen");
      disconnectSocket();
    };
  }, [userId, selectedChat]);

  // Send message
  const handleSend = () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedChat) return;
    const socket = getSocket();
    if (!socket) return;

    const msgObj: any = {
      senderId: userId,
      receiverId: selectedChat,
      message: newMessage.trim(),
    };

    if (selectedFile) {
      msgObj.fileName = selectedFile.name;
      msgObj.fileType = selectedFile.type;
      msgObj.fileUrl = URL.createObjectURL(selectedFile);
    }

    socket.emit("sendMessage", msgObj);
    setNewMessage("");
    setSelectedFile(null);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectedUser = chats.find((c) => c._id === selectedChat);

  const handleOpenChat = (chatId: string) => {
    setSelectedChat(chatId);
    const socket = getSocket();
    if (socket) socket.emit("markSeen", { userId, partnerId: chatId });
  };

  useEffect(() => {
    setPageTitle("Message");
  }, []);
  return (
    <div className="flex flex-col md:flex-row h-[88vh] rounded-xl overflow-hidden bg-white border border-teal-700 shadow-lg">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-teal-600 bg-linear-to-b from-[#f9f9f9] to-[#eef9f9] flex flex-col h-full">
        <div className="p-3 border-b border-teal-600 flex items-center justify-between bg-white shadow-sm shrink-0">
          <h2 className="text-lg md:text-base lg:text-lg font-semibold text-gray-700">
            Chats
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <UserPlus size={18} className="text-teal-800" />
          </button>
        </div>

        <div className="relative p-3 shrink-0  border-b border-teal-600">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-teal-600 rounded-md pl-9 pr-3 py-2 text-sm md:text-xs lg:text-sm focus:ring-2 focus:ring-teal-600 outline-none"
          />
          <Search
            size={16}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-800"
          />
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full  text-gray-400 text-sm">
              <MessageCircle className="mb-2" size={30} />
              <p>No chats yet</p>
            </div>
          ) : (
            chats.map((chat) => {
              const unread = unreadCounts[chat._id] || 0;
              return (
                <div
                  key={chat._id}
                  onClick={() => handleOpenChat(chat._id)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-teal-600 hover:bg-teal-50 transition ${selectedChat === chat._id ? "bg-teal-100" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={chat.img || "./defaultUser.png"}
                      alt={chat.name}
                      className="w-11 h-11 rounded-full object-cover border border-teal-600"
                    />
                    <div className="min-w-0">
                      <p
                        className={`truncate ${unread > 0
                          ? "font-bold text-teal-800"
                          : "text-gray-800 font-medium"
                          }`}
                      >
                        {chat.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {chat.email}
                      </p>
                    </div>
                  </div>
                  {unread > 0 && (
                    <div className="bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {unread}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="flex-1 flex flex-col bg-linear-to-b from-[#fefefe] to-[#f1f9f8] h-full">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="sticky top-0 z-10 p-3 border-b border-teal-600 bg-white flex items-center gap-3 shadow-sm shrink-0">
              <img
                src={selectedUser?.img || "./defaultUser.png"}
                alt={selectedUser?.name}
                className="w-10 h-10 md:w-8 md:h-8 rounded-full object-cover border border-teal-600"
              />
              <h2 className="font-semibold text-gray-800 text-sm md:text-xs lg:text-sm">
                {selectedUser?.name}
              </h2>
            </div>

            {/* Messages */}
            {/* <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300"> */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">

              {loading ? (
                <p className="text-center text-gray-400 text-sm">
                  Loading messages...
                </p>
              ) : messages.length > 0 ? (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.senderId === userId
                      ? "justify-end"
                      : "justify-start pr-2"
                      }`}
                  >
                    <div
                      className={`relative px-7 py-2 max-w-[75%] wrap-break-word rounded-2xl shadow-md ${msg.senderId === userId
                        ? "bg-teal-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                    >
                      {msg.fileUrl ? (
                        msg.fileType?.startsWith("image/") ? (
                          <img
                            src={msg.fileUrl}
                            alt="sent"
                            className="w-40 h-40 md:w-32 md:h-32 object-cover rounded-lg"
                          />
                        ) : (
                          <a
                            href={msg.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline text-sm ${msg.senderId === userId ? "text-blue-200" : "text-blue-600"} wrap-break-word`}
                          >
                            {msg.fileName}
                          </a>
                        )
                      ) : (
                        <p className="text-sm leading-relaxed wrap-break-word">{msg.message}</p>
                      )}

                      {msg.senderId === userId && (
                        <span className="absolute bottom-1 right-1">
                          <Check
                            size={16}
                            className={`${msg.seen ? "text-blue-300" : "text-[#2e3233]"}`}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 text-sm">
                  No messages yet.
                </p>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Input */}
            <div className="sticky bottom-0 bg-white border-t border-teal-600 p-3 flex items-center gap-3 shadow-sm shrink-0">
              <label className="cursor-pointer">
                <Paperclip
                  size={20}
                  className="text-teal-800 hover:text-teal-700 transition"
                />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setSelectedFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-teal-600 rounded-full px-4 py-2 text-sm md:text-xs lg:text-sm focus:ring-1 focus:ring-teal-600 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 flex items-center gap-1 transition"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-5 text-center">
            <MessageCircle size={50} className="mb-3 text-teal-700" />
            <p className="font-medium text-lg md:text-base lg:text-lg">
              Select a chat to start messaging
            </p>
            <p className="text-sm mt-1 md:text-xs lg:text-sm">
              Or, start a new conversation from the sidebar.
            </p>
          </div>
        )}
      </div>
    </div>

  );
}
