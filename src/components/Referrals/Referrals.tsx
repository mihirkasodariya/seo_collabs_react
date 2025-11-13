import { useEffect, useState } from "react";
import { Copy, Facebook, Twitter, Linkedin, Mail, User, Share2, CheckCircle, Crown, Trophy, Gift } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface Milestone {
    label: string;
    reward: string;
    progress: number;
    total: number;
}

interface LayoutContext {
    setPageTitle: (title: string) => void;
}

export function Referrals() {
    const { setPageTitle } = useOutletContext<LayoutContext>();


    const [copied, setCopied] = useState(false);

    const referralLink = "https://seocollabs.com/signup?ref=123";

    const milestones: Milestone[] = [
        { label: "Refer 5 Users", reward: "1 month Premium", progress: 0, total: 5 },
        { label: "Refer 10 Users", reward: "3 months Premium", progress: 0, total: 10 },
    ];

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        setPageTitle("Referrals");
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-1 space-y-6 max-w-8xl mx-auto">

            {/* Header */}
            <div className="text-center space-y-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="rounded-full p-2 text-xl">
                        <Gift className="text-[#077a7d]" size={35} />
                    </span>
                </div>
                <h1 className="text-2xl sm:text-2xl md:text-3xl font-semibold">Invite Friends & Earn Rewards</h1>
                <p className="text-gray-500 text-sm sm:text-sm md:text-base">
                    Share SEO Collabs with your network and unlock exclusive premium features
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="opacity: 1; transform: none;">
                    <div className="rounded-lg border border-[#077a7d] bg-card text-card-foreground shadow-sm">
                        <div className="p-6">

                            <div className="flex items-center justify-between">
                                <User className="text-blue-500" size={35} />
                                <span className="text-2xl font-bold"> 0</span>
                            </div>
                            <h3 className="mt-2 font-medium">Total Referrals</h3>
                        </div>
                    </div>
                </div>
                <div className="opacity: 1; transform: none;">
                    <div className="rounded-lg border border-[#077a7d] bg-card text-card-foreground shadow-sm">
                        <div className="p-6">

                            <div className="flex items-center justify-between">
                                <Share2 className="text-yellow-500" size={35} />
                                <span className="text-2xl font-bold"> 0</span>
                            </div>
                            <h3 className="mt-2 font-medium">Pending Invites</h3>
                        </div>
                    </div>
                </div>
                <div className="opacity: 1; transform: none;">
                    <div className="rounded-lg border border-[#077a7d] bg-card text-card-foreground shadow-sm">
                        <div className="p-6">

                            <div className="flex items-center justify-between">
                                <CheckCircle className="text-green-500" size={35} />
                                <span className="text-2xl font-bold"> 0</span>
                            </div>
                            <h3 className="mt-2 font-medium">Successful Referrals</h3>
                        </div>
                    </div>
                </div>
                <div className="opacity: 1; transform: none;">
                    <div className="rounded-lg border border-[#077a7d] bg-card text-card-foreground shadow-sm">
                        <div className="p-6">

                            <div className="flex items-center justify-between">
                                <Crown className="text-purple-500" size={35} />
                                <span className="text-2xl font-bold"> 0</span>
                            </div>
                            <h3 className="mt-2 font-medium">Days Earned</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral Link */}
            <div className="border border-[#077a7d] p-4 sm:p-6 rounded-lg space-y-2">
                <label className="text-lg font-medium">Your Referral Link</label>
                <div className="flex flex-row gap-2 relative pt-4 pb-4">
                    <input
                        className="flex-1 min-w-0 border border-[#077a7d] rounded-lg p-2 text-sm sm:text-base"
                        type="text"
                        value={referralLink}
                        readOnly
                    />
                    <button
                        className="bg-teal-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-teal-700 transition"
                        onClick={copyReferralLink}
                    >
                        <Copy size={16} /> Copy
                    </button>
                    {copied && (
                        <span className="absolute right-0 top-full mt-1 text-xs text-green-600 font-medium">
                            Copied!
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <button className="p-2 border border-[#077a7d] hover:text-teal-800 hover:bg-blue-100 rounded"><Facebook size={20} /></button>
                    <button className="p-2 border border-[#077a7d] hover:text-teal-800 hover:bg-blue-100 rounded"><Twitter size={20} /></button>
                    <button className="p-2 border border-[#077a7d] hover:text-teal-800 hover:bg-blue-100 rounded"><Linkedin size={20} /></button>
                    <button className="p-2 border border-[#077a7d] hover:text-teal-800 hover:bg-blue-100 rounded"><Mail size={20} /></button>
                </div>
            </div>


            {/* Reward Milestones */}
            <div className="border border-[#077a7d] p-4 sm:p-6 rounded-lg space-y-4">
                <h2 className="font-semibold text-lg sm:text-lg md:text-lg text-black">Reward Milestones</h2>
                {milestones.map((m, i) => (
                    <div key={i} className="space-y-1 border border-blue-300 p-4 rounded-xl bg-blue-50 flex flex-col">
                        <div className="flex justify-between items-center text-sm sm:text-sm md:text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Trophy className="text-blue-500" size={20} />
                                <span>{m.label}</span>
                            </div>
                            <span>{`${m.progress}/${m.total}`}</span>
                        </div>
                        <div className="text-xs text-gray-500">{`Reward: ${m.reward}`}</div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-teal-600 rounded-full"
                                style={{ width: `${(m.progress / m.total) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Referrers */}
            <div className="border p-4 sm:p-6 rounded-lg border-[#077a7d]">
                <h2 className="font-semibold text-lg sm:text-lg md:text-lg text-black">Top Referrers</h2>
                <p className="text-gray-400 text-sm mt-2">No data available yet.</p>
            </div>
        </div>
    );
}
