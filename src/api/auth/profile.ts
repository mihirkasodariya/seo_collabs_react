import api from "../api";

export type ProfileData = {
    name: string;
    email: string;
    bio: string;
    img: string; // must be string
};


interface UpdatePayload {
    name: string;
    bio?: string;
    img?: File | string;
}

export const getProfile = async (): Promise<{ success: boolean; data: ProfileData; message?: string }> => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/auth/getProfile`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
};

export const updateProfile = async (
    data: UpdatePayload
): Promise<{ success: boolean; data?: ProfileData; message?: string }> => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.bio) formData.append("bio", data.bio);
        if (data.img) formData.append("img", data.img);

        const response = await api.put(`/auth/updateProfile`, formData, {
            headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update profile");
    }
};
