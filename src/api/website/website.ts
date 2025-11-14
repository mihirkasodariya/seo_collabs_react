import api from "../api";

export type WebsiteData = {
    _id?: string;
    url: string;
    type: string;
    Categories: string[];
    linkReqs: string;
    isLinkExchange: boolean;   // toggle
    isActive?: boolean;        // delete
};

// ADD
export const addWebsite = async (data: WebsiteData) => {
    const token = localStorage.getItem("token");
    const response = await api.post(`/website/addWebsite`, data, {
        headers: { Authorization: token },
    });
    return response.data;
};

// LIST (WITH PAGINATION)
export const getWebsiteList = async ({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/website/getWebsiteList`, {
        headers: { Authorization: token },
        params: { page, limit }, // 👍 send pagination params
    });
    return response.data;
};

// GET SINGLE
export const getWebsite = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/website/getWebsite/${id}`, {
        headers: { Authorization: token },
    });
    return response.data;
};

// UPDATE
export const updateWebsite = async (id: string, data: WebsiteData) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/website/updateWebsite/${id}`, data, {
        headers: { Authorization: token },
    });
    return response.data;
};

// DELETE (soft delete)
export const deleteWebsite = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/website/deleteWebsite/${id}`, {
        headers: { Authorization: token },
    });
    return response.data;
};
