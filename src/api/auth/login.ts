import api from "../api";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (data: LoginPayload) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
