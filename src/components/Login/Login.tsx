import { useState } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { login } from "../../api/auth/login";
import toast from "react-hot-toast";
import { ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        setLoading(true);
        try {
            const res = await login({ email, password });
            if (res.success === true) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data._id);
                navigate("/dashboard");
            }
            toast.success(res.message);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-b px-4 sm:px-6 lg:px-8 py-10">
            <Card className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl border-[#077A7D] shadow-glow pt-10 pb-6">
                {/* Close Button */}
                <Button
                    variant="destructive"
                    size="icon"
                    className="bg-[#077A7D]! absolute right-3 top-3 z-10 h-8 w-8 flex items-center justify-center rounded-full"
                    onClick={() => navigate("/")}
                >
                    <X className="h-4 w-4 text-white" />
                </Button>

                {/* Header */}
                <CardHeader className="text-center mt-4 pb-4 px-4">
                    <div className="flex justify-center pb-3">
                        <img src="/logo.png" alt="SEO COLLABS LOGO" className="h-10 w-auto" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
                        Welcome Back <ShieldCheck className="w-5 h-5 text-[#007c7d]" />
                    </CardTitle>
                    <CardDescription className="text-gray-500 text-sm sm:text-base">
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>

                {/* Form */}
                <CardContent className="px-4 sm:px-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-4 border focus-visible:ring-[#007c7d] text-sm sm:text-base"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-4 border focus-visible:ring-[#007c7d] text-sm sm:text-base"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="brand"
                            disabled={loading}
                            className="w-full font-semibold py-4 sm:py-5 rounded-md transition-all text-sm sm:text-base"
                        >
                            {loading ? "Signing In..." : "Sign In →"}
                        </Button>
                    </form>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex flex-col gap-3 justify-center items-center text-sm text-gray-600 mt-2 mb-4 px-4">
                    <p className="text-center text-xs sm:text-sm">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-[#007c7d] font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>
                    <a href="/forget-password" className="text-[#007c7d] font-semibold hover:underline text-xs sm:text-sm">
                        Forgot your password?
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
