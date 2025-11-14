import { ExternalLink, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

import {
    addWebsite,
    getWebsiteList,
    updateWebsite,
    deleteWebsite,
    type WebsiteData
} from "../../api/website/website";

interface LayoutContext {
    setPageTitle: (title: string) => void;
}

export function Websites() {
    const { setPageTitle } = useOutletContext<LayoutContext>();

    const [isOpen, setIsOpen] = useState(false);
    const [websites, setWebsites] = useState<WebsiteData[]>([]);
    const [isEditing, setIsEditing] = useState(false);

    // 🔹 Pagination states
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [totalPages, setTotalPages] = useState(1);

    const [form, setForm] = useState<WebsiteData>({
        url: "",
        type: "",
        Categories: [],
        linkReqs: "",
        isLinkExchange: true,
        isActive: true,
    });

    useEffect(() => {
        setPageTitle("Websites");
        loadWebsites();
    }, []);

    // 🔹 Reload when page changes
    useEffect(() => {
        loadWebsites();
    }, [page]);

    const loadWebsites = async () => {
        try {
            const res = await getWebsiteList({ page, limit });

            setWebsites(res?.data?.data || []);
            setTotalPages(res?.data?.pagination?.totalPages || 1);

        } catch (err) {
            console.error(err);
        }
    };

    const categoriesList = [
        "Lifestyle", "Technology", "Health & Wellness", "Food & Recipes",
        "Travel", "Finance & Business", "Fashion & Beauty", "Parenting & Family",
        "DIY & Crafts", "Personal Development", "Education", "Sports & Fitness",
        "Entertainment & Pop Culture", "Photography", "Relationships & Dating",
        "Books & Literature", "Career & Work", "Home & Garden", "Pets & Animals",
        "Art & Design", "Gaming", "Environmental"
    ];

    const WEBSITE_TYPES = ["Blog", "Business", "E-commerce", "Non-Profit", "Social Media", "SaaS"];

    // ---------------- Add / Update Submit ----------------
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            let response;

            if (isEditing && form._id) {
                response = await updateWebsite(form._id, form);
            } else {
                response = await addWebsite(form);
            }

            if (response?.status === 200) {
                toast.success(response.message || "Operation successful!");
                setIsOpen(false);
                setForm({
                    url: "",
                    type: "",
                    Categories: [],
                    linkReqs: "",
                    isLinkExchange: true,
                    isActive: true,
                });
                setIsEditing(false);
                loadWebsites();
            } else {
                toast.error(response?.message || "Something went wrong!");
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error occurred!");
        }
    };

    const handleEdit = (item: WebsiteData) => {
        setForm(item);
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = async (item: WebsiteData) => {
        try {
            await deleteWebsite(item._id!);
            toast.success("Website deleted successfully!");
            loadWebsites();
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Error deleting website!");
        }
    };

    const handleToggle = async (item: WebsiteData) => {
        try {
            await updateWebsite(item._id!, {
                ...item,
                isLinkExchange: !item.isLinkExchange,
            });

            loadWebsites();
            const statusText = !item.isLinkExchange ? "enabled" : "disabled";
            toast.success(`Link Exchange ${statusText} for ${item.url}`);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Toggle error!");
            console.error(err);
        }
    };

    const handleCategorySelect = (c: string) => {
        const selected = form.Categories.includes(c)
            ? form.Categories.filter((x: string) => x !== c)
            : [...form.Categories, c];
        setForm({ ...form, Categories: selected });
    };

    return (
        <div className="w-full">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 md:mb-6">
                <h1 className="text-2xl md:text-2xl font-bold text-gray-900">My Websites</h1>

                <button
                    onClick={() => {
                        setIsEditing(false);
                        setForm({
                            url: "",
                            type: "",
                            Categories: [],
                            linkReqs: "",
                            isLinkExchange: true,
                            isActive: true,
                        });
                        setIsOpen(true);
                    }}
                    className="bg-teal-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-teal-800 text-sm md:text-base"
                >
                    + Add Website
                </button>
            </div>

            {/* Website Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {websites
                    .filter(w => w.isActive !== false)
                    .map((item, index) => {
                        const shortUrl =
                            item.url && item.url.length > 36 ? item.url.substring(0, 36) + "..." : item.url;

                        return (
                            <div key={item._id ?? index} className="border border-teal-700 rounded-xl p-3 md:p-5 bg-white shadow-sm flex flex-col hover:shadow-lg hover:shadow-teal-100">

                                <div className="flex items-start justify-between mb-2 md:mb-3">
                                    <a 
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="text-teal-700 font-semibold flex items-center gap-2 hover:underline truncate text-sm md:text-base"
                                        title={item.url}
                                    >
                                        <ExternalLink size={16} /> {shortUrl}
                                    </a>

                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-1 hover:bg-teal-700 hover:text-white rounded">
                                            <Pencil size={17} />
                                        </button>

                                        <button onClick={() => handleDelete(item)} className="p-1 hover:bg-teal-700 hover:text-white rounded">
                                            <Trash2 size={17} className="text-red-600" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs md:text-sm text-gray-600">
                                    <span className="font-semibold">Type:</span> {item.type || "-"}
                                </p>

                                <p className="text-xs md:text-sm text-gray-600">
                                    <span className="font-semibold">Categories:</span> {item.Categories?.join(", ") || "-"}
                                </p>

                                <p className="text-xs md:text-sm text-gray-600 mb-3">
                                    <span className="font-semibold">Requirements:</span> {item.linkReqs || "-"}
                                </p>

                                <label className="flex items-center gap-3 mt-auto cursor-pointer select-none">

                                    <input
                                        type="checkbox"
                                        checked={!!item.isLinkExchange}
                                        onChange={() => handleToggle(item)}
                                        className="sr-only"
                                    />

                                    {/* Toggle Track */}
                                    <div
                                        className={`
      w-12 h-6 rounded-full relative transition-colors duration-300
      ${item.isLinkExchange ? "bg-teal-700" : "bg-gray-300"}
    `}
                                    >
                                        {/* Sliding Circle */}
                                        <div
                                            className={`
        absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm 
        transition-all duration-300
        ${item.isLinkExchange ? "left-0.5" : "left-[29px]"}
      `}
                                        ></div>
                                    </div>

                                    <span className="text-xs md:text-sm font-medium">Link Exchange Enabled</span>
                                </label>

                            </div>
                        );
                    })}
            </div>

            {/* 🔹 Pagination */}
            {websites.length > 0 && totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        className="px-3 py-1 border border-[#077a7d] rounded bg-white hover:bg-teal-100"
                    >
                        Previous
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 border border-[#077a7d] rounded ${page === i + 1
                                    ? "bg-teal-700 text-white"
                                    : "bg-white hover:bg-teal-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                        className="px-3 py-1 border border-[#077a7d] rounded bg-white hover:bg-teal-100"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-3">
                    <div className="bg-white w-full max-w-md sm:max-w-lg p-4 md:max-w-2xl sm:p-6 border border-teal-700 rounded-xl shadow-lg relative">
                        <button onClick={() => setIsOpen(false)} className="absolute right-3 top-3 text-gray-500 hover:text-black">
                            <X size={20} />
                        </button>

                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">
                            {isEditing ? "Edit Website" : "Add New Website"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium">Website URL</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.url}
                                        onChange={(e) => setForm({ ...form, url: e.target.value })}
                                        className="w-full border border-teal-700 px-3 py-2 mt-1 rounded"
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Website Type</label>
                                    <select
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        className="w-full border border-teal-700 px-3 py-2 mt-1 rounded"
                                    >
                                        <option value="">Select Type</option>
                                        {WEBSITE_TYPES.map((type, i) => (
                                            <option key={i} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Categories</label>

                                <div
                                    className="
            grid grid-cols-2 sm:grid-cols-3 gap-2 
            max-h-40 overflow-y-auto          /* mobile scroll */
            md:max-h-none md:overflow-visible /* laptop no-scroll */
            border p-2 rounded
        "
                                >
                                    {categoriesList.map((c, i) => (
                                        <label key={i} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={form.Categories.includes(c)}
                                                onChange={() => handleCategorySelect(c)}
                                                className="w-4 h-4"
                                            />
                                            {c}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Link Exchange Requirements</label>
                                <input
                                    type="text"
                                    value={form.linkReqs}
                                    onChange={(e) => setForm({ ...form, linkReqs: e.target.value })}
                                    className="w-full border border-teal-700 px-3 py-2 mt-1 rounded"
                                    placeholder="e.g., DA 30+, Tech blogs only"
                                />
                            </div>

                            <div className="flex gap-3 items-center">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!!form.isLinkExchange}
                                        onChange={() => setForm({ ...form, isLinkExchange: !form.isLinkExchange })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-teal-700 relative">
                                        <div className="absolute left-1 top-1 bg-white w-3.5 h-3.5 rounded-full transition-all peer-checked:translate-x-4"></div>
                                    </div>
                                    <span className="text-sm font-medium">Enable Link Exchange</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 border border-teal-700 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-800"
                                >
                                    {isEditing ? "Update Website" : "Add Website"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
