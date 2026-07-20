import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  HiOutlineCamera,
  HiOutlinePencilSquare,
  HiOutlineKey,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import { setUser } from "../../store/authSlice.js";
import GlassCard from "../../components/GlassCard.jsx";
import { useToast } from "../../context/ToastContext.jsx";

// Import extracted subcomponents
import PersonalInfoForm from "./components/PersonalInfoForm.jsx";
import PasswordForm from "./components/PasswordForm.jsx";
import AddressBook from "./components/AddressBook.jsx";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  // View states
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isManagingAddresses, setIsManagingAddresses] = useState(false);

  // Avatar Upload Mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: (formData) =>
      api.post("/customer/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((r) => r.data),
    onSuccess: (data) => {
      dispatch(setUser({ ...user, ...data.user }));
      showToast("Profile picture updated!", "success");
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to upload image.", "error");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return showToast("Image file size cannot exceed 2MB.", "error");
    }

    const formData = new FormData();
    formData.append("avatar", file);
    uploadAvatarMutation.mutate(formData);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const avatarPath = user?.avatarUrl
    ? `http://localhost:5000${user.avatarUrl}`
    : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-4">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">Profile Settings</h1>
        <p className="text-xs text-muted mt-1">Manage avatar images, update personal contact details, and saved addresses</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* Left Card: Profile Image */}
        <div className="md:col-span-1">
          <GlassCard tilt={false} className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="relative group cursor-pointer w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 hover:border-indigo/50 transition-all">
              <img
                src={avatarPath}
                alt={user?.name || "Customer Profile"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                onClick={triggerFileSelect}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-200"
              >
                <HiOutlineCamera size={20} className="mb-0.5 text-indigo-soft animate-bounce" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Change Photo</span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="space-y-0.5">
              <h3 className="font-display font-semibold text-white text-sm truncate max-w-[180px]">{user?.name}</h3>
              <p className="text-[10px] text-muted font-mono truncate max-w-[180px]">{user?.email}</p>
            </div>

            {uploadAvatarMutation.isLoading && (
              <span className="text-[10px] text-indigo-soft animate-pulse">Uploading photo...</span>
            )}
          </GlassCard>
        </div>

        {/* Right Card: details displays/forms/addresses */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard tilt={false} className="p-6 sm:p-8 space-y-6">
            
            {/* View Personal Info Details Mode */}
            {!isEditingDetails && !isChangingPassword && !isManagingAddresses && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
                  <h3 className="font-display font-semibold text-sm text-white">Account Details</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsEditingDetails(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-soft hover:text-white bg-indigo/10 hover:bg-indigo/20 px-3 py-1.5 rounded-lg border border-indigo/20 transition-all cursor-pointer"
                    >
                      <HiOutlinePencilSquare size={13} />
                      Edit Info
                    </button>
                    <button
                      onClick={() => setIsManagingAddresses(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/25 transition-all cursor-pointer"
                    >
                      <HiOutlineMapPin size={13} />
                      Addresses
                    </button>
                    <button
                      onClick={() => setIsChangingPassword(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-muted hover:text-white bg-white/[0.03] hover:bg-white/[0.08] px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer"
                    >
                      <HiOutlineKey size={13} />
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Full Name</span>
                    <p className="text-white font-medium pl-1">{user?.name || "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Phone Number</span>
                    <p className="text-white font-mono font-medium pl-1">{user?.phone ? `+91 ${user.phone}` : "—"}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Email Address</span>
                    <p className="text-muted font-mono pl-1">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Personal Details Mode */}
            {isEditingDetails && (
              <PersonalInfoForm 
                user={user} 
                onCancel={() => setIsEditingDetails(false)} 
              />
            )}

            {/* Edit Change Password Mode */}
            {isChangingPassword && (
              <PasswordForm 
                user={user} 
                onCancel={() => setIsChangingPassword(false)} 
              />
            )}

            {/* Manage Addresses Mode */}
            {isManagingAddresses && (
              <AddressBook 
                onBack={() => setIsManagingAddresses(false)} 
              />
            )}

          </GlassCard>
        </div>

      </div>
    </div>
  );
}
