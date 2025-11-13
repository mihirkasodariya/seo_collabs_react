// src/api/chatApi.ts
import api from "../api";

// 📨 Get all messages between two users
export const getMessages = async (userId: string, receiverId: string) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/chat/${userId}/${receiverId}`, {
    headers: { Authorization: token },
  });
  return res.data;
};

// 💬 Send new message
export const sendMessage = async (data: {
  senderId: string;
  receiverId: string;
  message: string;
}) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/chat/sendMessage`, data, {
    headers: { Authorization: token },
  });
  return res.data;
};

// 👥 Get chat users
export const getChatUsers = async (userId: string) => {
  const token = localStorage.getItem("token");
  console.log('userId', userId)
  const res = await api.get(`/chat/users`, {
    headers: { Authorization: token },
  });
  return res.data;
};
