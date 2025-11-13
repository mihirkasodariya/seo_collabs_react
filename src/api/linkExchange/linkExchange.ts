import api from "../api";

export type WebsiteData = {
    userId: any;
    _id?: string;
    url: string;
    userName: string;
    email: string;
    type: string;
    Categories: string[];
    linkReqs: string;
    isLinkExchange: boolean;
    isActive?: boolean;
};

export const getLinkExchangeList = async ({ search = "", type = "", category = "", page = 1, limit = 10 } = {}) => {
    const token = localStorage.getItem("token");

    const params = {
        search: search || undefined,
        type: type || undefined,
        category: category || undefined,
        page,
        limit,
    };

    const response = await api.get(`/exchange/getLinkExchangeList`, {
        headers: { Authorization: token },
        params,
    });
    return response.data;
};
