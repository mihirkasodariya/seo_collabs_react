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
import toast from "react-hot-toast";
import { ShieldCheck, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import { forgetPassword } from "../../api/auth/forgetPassword";

export function ForgetPassword() {
//   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    // try {
    //   const res = await forgetPassword({ email });

    //   if (res.success) {
    //     toast.success(res.message || "Reset link sent to your email");
    //     navigate("/reset-password"); // optional
    //   } else {
    //     toast.error(res.message || "Something went wrong");
    //   }
    // } catch (error) {
    //   toast.error(error?.message || "Request failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b px-4 sm:px-6 lg:px-8 py-10">
      <Card className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl border-[#077A7D] shadow-glow pt-10 pb-6">

        {/* Close Button */}
        <Button
          variant="destructive"
          size="icon"
          className="bg-[#077A7D]! absolute right-3 top-3 z-10 h-8 w-8 flex items-center justify-center rounded-full"
          onClick={() => window.history.back()}
        >
          <X className="h-4 w-4 text-white" />
        </Button>

        {/* Header */}
        <CardHeader className="text-center mt-4 pb-4 px-4">
          <div className="flex justify-center pb-3">
            <img src="/logo.png" alt="SEO COLLABS LOGO" className="h-10 w-auto" />
          </div>

          <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
            Forgot Password <ShieldCheck className="w-5 h-5 text-[#007c7d]" />
          </CardTitle>

          <CardDescription className="text-gray-500 text-sm sm:text-base">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 border text-sm sm:text-base focus-visible:ring-[#007c7d]"
                required
              />
            </div>

            <Button
              type="submit"
              variant="brand"
              disabled={loading}
              className="w-full font-semibold py-4 sm:py-5 rounded-md transition-all text-sm sm:text-base"
            >
              {loading ? "Sending..." : "Send Reset Link →"}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col gap-3 justify-center items-center text-sm text-gray-600 mt-2 mb-4 px-4">
          <a href="/login" className="text-[#007c7d] font-semibold hover:underline text-xs sm:text-sm">
            Back to Login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
