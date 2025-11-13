import { Mail, Search, MessageCircle, Phone, FileText, HelpCircle, Clock, Globe, Book } from "lucide-react";

export const Support = () => {
    const phoneNumber = "+911234567890"; // Replace with your support number

    const handleClick = () => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
            // Opens dialer on mobile
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // Opens WhatsApp Web on desktop
            const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}`;
            window.open(whatsappUrl, "_blank");
        }
    };

    return (
        <div className="max-w-8xl mx-auto p-6 space-y-6">
            {/* Search Section */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl pb-2 font-semibold">How can we help you?</h2>

                <div className="relative w-full max-w-md mx-auto">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                    <input
                        type="text"
                        placeholder="Search for help..."
                        className="border border-[#077a7d] rounded-md px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

            </div>


            {/* Popular Articles */}
            <div className="border border-[#077a7d] rounded-md p-4 space-y-3">
                <h3 className="text-lg pb-3 font-semibold leading-none tracking-tight">Popular Articles</h3>
                <ul className="space-y-2">
                    <li className="flex justify-between items-center border border-[#077a7d] p-2 hover:bg-gray-200 rounded">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-blue-500" />
                            <div>
                                <p className="font-medium text-[16px]">Quick Start Guide</p>
                                <p className="text-[14px] text-gray-500">Getting Started</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-sm">1.2k views</span>
                    </li>
                    <li className="flex justify-between items-center border border-[#077a7d] p-2 hover:bg-gray-200 rounded">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-blue-500" />
                            <div>
                                <p className="font-medium text-[16px]">Best Practices for Link Exchange</p>
                                <p className="text-[14px] text-gray-500">Features</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-sm">956 views</span>
                    </li>
                    <li className="flex justify-between items-center border border-[#077a7d] p-2 hover:bg-gray-200 rounded">
                        <div className="flex items-center gap-2">
                            <FileText size={18} className="text-blue-500" />
                            <div>
                                <p className="font-medium text-[16px]">Account Security Tips</p>
                                <p className="text-[14px] text-gray-500">Security</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-sm">843 views</span>
                    </li>
                </ul>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-[#077a7d] rounded-md p-4 space-y-2">
                    <h4 className="font-semibold flex pb-2 text-lg items-center gap-2">
                        <Book size={25} className="text-blue-500" /> Getting Started
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> How to add your first website
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Understanding link exchange
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Setting up your profile
                        </li>
                    </ul>
                </div>


                <div className="border border-[#077a7d] rounded-md p-4 space-y-2">
                    <h4 className="font-semibold flex pb-2 text-lg items-center gap-2">
                        <HelpCircle size={25} className="text-blue-500" /> Features & Tools
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Using the Website Manager
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Network Building Guide
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Analytics & Reporting
                        </li>
                    </ul>
                </div>

                <div className="border border-[#077a7d] rounded-md p-4 space-y-2">
                    <h4 className="font-semibold flex pb-2 text-lg items-center gap-2">
                        <HelpCircle size={25} className="text-blue-500" /> Features & Tools
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Common Issues
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Account Access
                        </li>
                        <li className="flex items-center cursor-pointer hover:text-blue-500 gap-2">
                            <FileText size={18} className="hover:text-blue-500" /> Error Messages
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contact Support */}
            <div className="border border-[#077a7d] rounded-md p-4 text-center space-y-4">
                <div className="pb-2">
                    <h4 className="text-lg font-semibold">Still need help?</h4>
                    <p className="text-gray-500 text-sm">Our support team is here to assist you</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="flex-1 border border-[#077a7d] rounded-md cursor-pointer px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-100 transition"
                    >
                        <Mail size={16} className="text-[#077a7d]" /> Email Support
                    </button>
                    <button className="flex-1 border border-[#077a7d] rounded-md cursor-pointer px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-100 transition"
                    >
                        <MessageCircle size={16} className="text-[#077a7d]" /> Live Chat
                    </button>
                    <button
                        onClick={handleClick}
                        className="flex-1 border border-[#077a7d] rounded-md cursor-pointer px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-100 transition"
                    >
                        <Phone size={18} className="text-[#077a7d]" /> Phone Support
                    </button>
                </div>
            </div>

            {/* System Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-[#077a7d] rounded-md p-4 flex items-center gap-2">
                    <div className="text-green-500"><FileText size={18} /></div>
                    <div>
                        <p className="font-semibold">System Status</p>
                        <p className="text-sm text-gray-500">All systems operational</p>
                    </div>
                </div>
                <div className="border border-[#077a7d] rounded-md p-4 flex items-center gap-2">
                    <div className="text-blue-500"><Clock size={18} /></div>
                    <div>
                        <p className="font-semibold">Response Time</p>
                        <p className="text-sm text-gray-500">Average 30 minutes</p>
                    </div>
                </div>
                <div className="border border-[#077a7d] rounded-md p-4 flex items-center gap-2">
                    <div className="text-purple-500"><Globe size={18} /></div>
                    <div>
                        <p className="font-semibold">24/7 Support</p>
                        <p className="text-sm text-gray-500">Always here to help</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

