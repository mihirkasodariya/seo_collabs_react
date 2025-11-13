"use client";

import { AppSidebar } from "../Sidebar/Sidebar";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { Settings, UserCog, Home, LogOut } from "lucide-react";
import { useState } from "react";

// ShadCN Dropdown
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

export default function AppLayout() {
    const [pageTitle, setPageTitle] = useState<string>("");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1">

                {/* HEADER */}
                <header className="flex items-center justify-between px-6 py-3 border-b border-[#077a7d] bg-white shadow-sm">
                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
                            {pageTitle}
                        </h1>
                    </div>

                    {/* Right - Settings Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#077a7d] hover:bg-[#e4f0ee] transition cursor-pointer">
                                <span className="text-sm font-medium text-gray-700">Settings</span>
                                <Settings className="w-5 h-5 text-[#077a7d]" />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-20">

                            {/* Edit Profile */}
                            <div className="border-b border-[#077a7d]">
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/profile"
                                        className="w-full flex items-center gap-2 cursor-pointer"
                                    >
                                        <UserCog className="w-4 h-4 text-[#077a7d]" />
                                        Edit Profile
                                    </Link>
                                </DropdownMenuItem>
                            </div>

                            {/* Home */}
                            <div className="border-b border-[#077a7d]">
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/"
                                        className="w-full flex items-center gap-2 cursor-pointer"
                                    >
                                        <Home className="w-4 h-4 text-[#077a7d]" />
                                        Home
                                    </Link>
                                </DropdownMenuItem>
                            </div>

                            {/* Logout */}
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="flex items-center gap-2 cursor-pointer text-red-500 font-medium"
                            >
                                <LogOut className="w-4 h-4 text-red-500" />
                                Logout
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {/* CONTENT */}
                <main className="p-6 flex-1 overflow-auto">
                    <Outlet context={{ setPageTitle }} />
                </main>
            </div>
        </div>
    );
}
