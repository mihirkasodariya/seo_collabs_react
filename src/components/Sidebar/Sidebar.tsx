import { GlobeLock, Home, Link as LinkIcon, Contact, MailPlus, Gift, Wallet, BadgeQuestionMark } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Websites", url: "/websites", icon: GlobeLock },
    { title: "Link Exchange", url: "/link-exchange", icon: LinkIcon },
    { title: "Network", url: "/network", icon: Contact },
    { title: "Messages", url: "/chat", icon: MailPlus },
    { title: "Referrals", url: "/referrals", icon: Gift },
    { title: "Premium", url: "/pricing", icon: Wallet },
    { title: "Support", url: "/support", icon: BadgeQuestionMark },
];

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar>
            <SidebarContent>
                {/* Logo */}
                <div className="p-4 border-b border-[#077A7D]">
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto cursor-pointer" />
                    </Link>
                </div>

                {/* Main Menu */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = location.pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a
                                                href={item.url}
                                                className={`w-10 h-10 font-medium flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200
                                                        ${isActive
                                                        ? "bg-[#5cbfec] text-black border-l-4 border-[#077a7d] hover:bg-[#4ab0d6]"
                                                        : "text-black hover:bg-[#20bbd6]"
                                                    }                        `}
                                            >
                                                <item.icon className={isActive ? "text-black" : "text-black"} />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}

                            {/* Logout Example */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
