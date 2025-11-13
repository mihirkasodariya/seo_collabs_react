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
    const [form, setForm] = useState<WebsiteData>({
        url: "",
        type: "",
        Categories: [],
        linkReqs: "",
        isLinkExchange: true,
        isActive: true,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setPageTitle("Websites");
        loadWebsites();
    }, []);

    const loadWebsites = async () => {
        try {
            const res = await getWebsiteList();
            setWebsites(res.data || []);
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
            toast.error(err.response.data.message);
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
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong while toggling Link Exchange!");
            }
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
                <h1 className="text-2xl md:text-2xl font-bold text-gray-900">
                    My Websites
                </h1>
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
                    className="bg-teal-700 text-white cursor-pointer px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 hover:bg-teal-800 whitespace-nowrap text-sm md:text-base"
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
                            <div
                                key={item._id ?? index}
                                className="border border-teal-700 rounded-xl p-3 md:p-5 shadow-sm bg-white flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-2 md:mb-3 gap-1 md:gap-2">
                                    <div className="flex-1 min-w-0">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="text-teal-700 font-semibold flex items-center gap-1 md:gap-2 hover:underline truncate text-sm md:text-base"
                                            title={item.url}
                                        >
                                            <ExternalLink size={16} /> {shortUrl}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-1 rounded hover:bg-[#077A7D] hover:text-white group"
                                        >
                                            <Pencil size={17} className="text-gray-900 group-hover:text-white cursor-pointer" />
                                        </button>

                                        <button onClick={() => handleDelete(item)} className="p-1 rounded hover:bg-[#077A7D] hover:text-white group">
                                            <Trash2 size={17} className="text-red-600  group-hover:text-white cursor-pointer" />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs md:text-sm text-gray-600 pb-0.5">
                                    <span className="font-semibold">Type:</span> {item.type || "-"}
                                </p>
                                <p className="text-xs md:text-sm text-gray-600 pb-0.5">
                                    <span className="font-semibold">Categories:</span> {Array.isArray(item.Categories) ? item.Categories.join(", ").slice(0, 100) : ""}{Array.isArray(item.Categories) && item.Categories.join(", ").length > 100 ? "..." : ""}
                                </p>
                                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                                    <span className="font-semibold">Requirements:</span> {item.linkReqs || "-"}
                                </p>

                                <div className="flex items-center gap-2 md:gap-3 mt-auto">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={!!item.isLinkExchange} onChange={() => handleToggle(item)} />
                                        <div className="w-10 h-5 md:w-11 md:h-6 bg-gray-300 rounded-full peer-checked:bg-teal-700"></div>
                                        <div className="absolute left-1 top-1 bg-white w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all peer-checked:translate-x-4 md:peer-checked:translate-x-5"></div>
                                    </label>
                                    <span className="text-xs md:text-sm font-medium text-gray-700">Link Exchange Enabled</span>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-3">
                    <div className="bg-white w-full max-w-md sm:max-w-lg p-4 md:max-w-2xl sm:p-6 border border-teal-700 rounded-xl shadow-lg relative">
                        <button onClick={() => setIsOpen(false)} className="absolute right-3 top-3 text-gray-500 hover:text-black">
                            <X size={20} />
                        </button>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">{isEditing ? "Edit Website" : "Add New Website"}</h2>

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="text-xs sm:text-sm font-medium mb-1 block">Website URL</label>
                                    <input type="text" required value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://example.com" className="w-full border border-teal-700 mt-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg focus:outline-none text-xs sm:text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs sm:text-sm font-medium mb-1 block">Website Type</label>
                                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full border border-teal-700 mt-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm">
                                        <option value="">Select Type</option>
                                        {WEBSITE_TYPES.map((type, i) => <option key={i} value={type}>{type}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs sm:text-sm font-medium mb-1 block">Categories</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 max-h-60 sm:max-h-80 md:max-h-full overflow-y-auto md:overflow-visible pr-1">
                                    {categoriesList.map((c, i) => (
                                        <label key={i} className="flex items-center gap-1 sm:gap-2 cursor-pointer text-xs sm:text-sm">
                                            <input type="checkbox" checked={form.Categories.includes(c)} onChange={() => handleCategorySelect(c)} className="w-3.5 h-3.5 sm:w-4 sm:h-4 appearance-none border border-teal-700 bg-white rounded-sm checked:bg-teal-700 relative checked:before:content-['✓'] before:absolute before:-top-0.5 before:left-0.5 sm:before:left-[3px] before:text-white before:text-[10px] sm:before:text-sm" />
                                            <span className="truncate">{c}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs sm:text-sm font-medium mb-1 block">Link Exchange Requirements</label>
                                <input type="text" value={form.linkReqs} onChange={(e) => setForm({ ...form, linkReqs: e.target.value })} placeholder="e.g., DA 30+, Tech blogs only" className="w-full border border-teal-700 mt-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm" />
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={!!form.isLinkExchange} onChange={() => setForm({ ...form, isLinkExchange: !form.isLinkExchange })} />
                                    <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 rounded-full peer-checked:bg-teal-700"></div>
                                    <div className="absolute left-1 top-1 bg-white w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all peer-checked:translate-x-4 sm:peer-checked:translate-x-5"></div>
                                </label>
                                <span className="text-xs sm:text-sm font-medium">Enable Link Exchange</span>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
                                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-1.5 sm:px-5 sm:py-2 border border-teal-700 rounded-lg text-xs sm:text-sm">Cancel</button>
                                <button className="px-4 py-1.5 sm:px-5 sm:py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 text-xs sm:text-sm">{isEditing ? "Update Website" : "Add Website"}</button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
