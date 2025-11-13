import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toast from "react-hot-toast";
import { Upload, ArrowLeft } from "lucide-react";
import { getProfile, updateProfile, type ProfileData } from "../../api/auth/profile";

export function Profile() {
    const [profile, setProfile] = useState<ProfileData>({
        name: "",
        email: "",
        bio: "",
        img: "",
    });

    const [newImage, setNewImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                if (res.success) setProfile(res.data);
                else toast.error(res.message || "Failed to load profile");
            } catch {
                toast.error("Failed to load profile");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage(file);
            setProfile({ ...profile, img: URL.createObjectURL(file) });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await updateProfile({
                name: profile.name,
                bio: profile.bio || "",
                img: newImage || undefined,
            });

            if (res.success) toast.success("Profile updated successfully!");
            else toast.error(res.message || "Failed to update profile");
        } catch (err: any) {
            toast.error(err.message || "Profile update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start py-16 bg-gray-50 min-h-screen">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6  border border-[#077a7d]">

                {/* Back Button */}
                <div className="mb-4">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </div>

                {/* Profile Image */}
                <div className="relative w-28 h-28 mx-auto">
                    <img
                        src={profile.img || "/default-avatar.png"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border border-[#077a7d] object-cover"
                    />

                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <label className="cursor-pointer">
                            <Upload className="w-5 h-5 text-gray-600" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* Name */}
                <div className="mt-6">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="mt-1 border-[#077a7d]"
                    />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={profile.email}
                        disabled
                        className="mt-1 bg-gray-100 cursor-not-allowed border-[#077a7d]"
                    />
                    {/* <p className="text-xs text-gray-400 mt-1">
                        Changing your email will require confirmation via both old and new email addresses.
                    </p> */}
                </div>

                {/* Bio */}
                <div className="mt-4">
                    <Label htmlFor="bio" className="text-gray-700 font-medium">
                        Bio (Optional)
                    </Label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        placeholder="Tell us a little about yourself..."
                        className="mt-1 w-full border border-[#077a7d] rounded-md p-2 resize-none focus:ring-[#007c7d] focus:border-[#007c7d]"
                        rows={4}
                    />
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => window.history.back()} className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading} className="cursor-pointer text-white">
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
