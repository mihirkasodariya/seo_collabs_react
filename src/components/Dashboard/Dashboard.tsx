import { Users, Link, Server, MessageSquare, type LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

interface LayoutContext {
    setPageTitle: (title: string) => void;
}

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    value: string | number;
}

function StatCard({ icon: Icon, title, subtitle, value }: StatCardProps) {
    return (
        <Card className="p-4 w-full border border-[#077a7d] rounded-xl bg-card flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#077a7d]" />
                </div>
                <div className="text-2xl md:text-3xl font-semibold">{value}</div>
            </div>

            <div className="flex flex-col">
                <span className="text-lg md:text-xl font-medium text-gray-900">{title}</span>
                <span className="text-sm text-muted-foreground">{subtitle}</span>
            </div>
        </Card>
    );
}

export function Dashboard() {
    const { setPageTitle } = useOutletContext<LayoutContext>();

    useEffect(() => {
        setPageTitle("Dashboard");
    }, [setPageTitle]);

    return (
        <div className="px-4 w-full space-y-6 mt-4">

            {/* Responsive Grid */}
            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-6
            ">
                <StatCard icon={Server} title="Total Websites" subtitle="0 total" value={0} />
                <StatCard icon={Link} title="Active Exchanges" subtitle="0 active" value={0} />
                <StatCard icon={Users} title="Network Size" subtitle="0 connections" value={0} />
                <StatCard icon={MessageSquare} title="Messages" subtitle="0 total" value={0} />
            </div>

        </div>
    );
}
