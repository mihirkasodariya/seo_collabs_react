import { ExternalLink, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getLinkExchangeList, type WebsiteData } from "../../api/linkExchange/linkExchange";
import { connectSocket } from "../../api/socket";
import toast from "react-hot-toast";

interface LayoutContext {
    setPageTitle: (title: string) => void;
}

interface Message {
    senderId: string;
    receiverId?: string;
    message: string;
    createdAt: string;
    websiteId?: string;
}

let socketInstance: any = null;

export function LinkExchange() {
    const { setPageTitle } = useOutletContext<LayoutContext>();

    // States
    const [websites, setWebsites] = useState<WebsiteData[]>([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [typesList, setTypesList] = useState<string[]>([]);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});

    const limit = 4;
    const userId = localStorage.getItem("userId") ?? "guest";
    const currentUserId: string = userId;

    // ---------------- FETCH WEBSITES ----------------
    const loadWebsites = async () => {
        try {
            const response = await getLinkExchangeList({ search, type, category, page, limit });
            if (response.success) {
                const records: WebsiteData[] = response.data.records;
                setWebsites(records);
                setTotalPages(response.data.totalPages);

                const types = Array.from(new Set(records.map((item) => item.type))).sort();
                setTypesList(types);

                const categories = Array.from(new Set(records.flatMap((item) => item.Categories))).sort();
                setCategoriesList(categories);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setPage(1);
    }, [search, type, category]);

    useEffect(() => {
        setPageTitle("Link Exchange");
        loadWebsites();
    }, []);

    useEffect(() => {
        loadWebsites();
    }, [search, type, category, page]);

    // ---------------- SEND MESSAGE VIA SOCKET ----------------
    const handleRequestExchange = (websiteId: string, ownerId: string, websiteUrl: string) => {

        if (ownerId === currentUserId) {
            toast.error("You can’t exchange links with your own website because you are its owner.");
            return;
        }
        if (!socketInstance) {
            socketInstance = connectSocket(currentUserId);

            socketInstance.on("connect", () => {
                console.log("🔌 Socket connected for message send");
            });

            socketInstance.on("receiveMessage", (data: any) => {
                const { websiteId, message, senderId, createdAt } = data;
                setMessages((prev) => ({
                    ...prev,
                    [websiteId]: [...(prev[websiteId] || []), { senderId, message, createdAt }],
                }));
            });
        }

        if (!ownerId || !currentUserId) {
            console.warn("Missing senderId or receiverId");
            return;
        }

        const msgText = `Hi! I'd like to exchange links with you. Website: ${websiteUrl}`;
        const msg: Message = {
            websiteId,
            senderId: currentUserId,
            receiverId: ownerId,
            message: msgText,
            createdAt: new Date().toISOString(),
        };

        socketInstance.emit("sendMessage", msg);

        setMessages((prev) => ({
            ...prev,
            [websiteId]: [...(prev[websiteId] || []), msg],
        }));

        console.log(`📨 Message sent to ${ownerId} for website ${websiteUrl}`);
    };

    // ---------------- UI ----------------
    return (
        <div className="mx-auto flex flex-col px-4 md:px-0 max-w-8xl">
            {/* Header */}
            {/* Header */}
            <div className="flex flex-row flex-wrap items-center justify-between gap-2 mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex-1 min-w-[120px]">
                    Link Exchange
                </h1>
                <button className="bg-teal-700 text-white text-sm md:text-base cursor-pointer px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-teal-800 whitespace-nowrap">
                    My Exchanges
                </button>
            </div>


            {/* Filters */}
            <div className="p-3 md:p-7 border border-[#077a7d] mb-6 rounded-xl">
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4">
                    {/* Search */}
                    <div className="relative flex-1 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search websites or categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-[#077a7d] rounded px-4 py-2 pl-10 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-teal-700"
                        />
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>

                    {/* Type */}
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full sm:w-auto border border-[#077a7d] rounded-lg px-4 py-2 text-sm md:text-base cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-700"
                    >
                        <option value="">All Types</option>
                        {typesList.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full sm:w-auto border border-[#077a7d] rounded-lg px-4 py-2 text-sm md:text-base cursor-pointer focus:outline-none focus:ring-1 focus:ring-teal-700"
                    >
                        <option value="">All Categories</option>
                        {categoriesList.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    {/* Clear Filters */}
                    <button
                        onClick={() => {
                            setSearch("");
                            setType("");
                            setCategory("");
                        }}
                        className="w-full sm:w-auto border border-[#077a7d] px-4 py-2 text-sm md:text-base cursor-pointer rounded-lg hover:bg-[#63d9db] transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Website List */}
            <div className="pb-8 space-y-4">
                {websites.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    websites.map((item) => {
                        const websiteId = item._id ?? "";
                        const ownerId = item?.userId ?? "owner";
                        const ownerName = item?.userName ?? "N/A";
                        const websiteUrl = item.url;

                        return (
                            <div
                                key={websiteId}
                                className="border border-[#077a7d] rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg hover:shadow-teal-100 transition"
                            >
                                <div className="flex-1 w-full md:w-auto">
                                    <a
                                        href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`}
                                        target="_blank"
                                        className="text-teal-700 font-semibold flex items-center gap-1 hover:underline wrap-break-word"
                                    >
                                        <ExternalLink size={16} />
                                        {websiteUrl}
                                    </a>
                                    <p className="text-black mt-1">
                                        <span className="font-semibold">Type:</span> {item.type}
                                    </p>
                                    <p className="text-black mt-1">
                                        <span className="font-semibold">Categories:</span> {item.Categories.join(", ")}
                                    </p>
                                    <p className="text-black mt-1">
                                        <span className="font-semibold">Owner:</span> {ownerName}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                                    <button
                                        onClick={() => handleRequestExchange(websiteId, ownerId, websiteUrl)}
                                        className="bg-teal-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-teal-800 whitespace-nowrap text-sm md:text-base"
                                    >
                                        Request Exchange
                                    </button>

                                    {/* Message display */}
                                    {messages[websiteId] && (
                                        <div className="max-h-40 overflow-y-auto mt-2 space-y-1">
                                            {messages[websiteId].map((m, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`px-2 py-1 rounded wrap-break-word ${m.senderId === currentUserId
                                                        ? "bg-teal-200 text-right"
                                                        : "bg-gray-200 text-left"
                                                        }`}
                                                >
                                                    {m.message}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {websites.length > 0 && totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2">
                    <button
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        className="px-3 py-1 border border-[#077a7d] rounded bg-white text-black hover:bg-teal-100"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2 mx-2 flex-wrap justify-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 border border-[#077a7d] rounded ${page === i + 1
                                    ? "bg-teal-700 text-white"
                                    : "bg-white text-black hover:bg-teal-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                        className="px-3 py-1 border border-[#077a7d] rounded bg-white text-black hover:bg-teal-100"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
