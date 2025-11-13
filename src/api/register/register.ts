import api from "../api"

interface RegisterPayload {
  name: string
  email: string
  password: string
}

export const register = async (data: RegisterPayload) => {
  try {
    const response = await api.post("/auth/register", data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed")
  }
}
