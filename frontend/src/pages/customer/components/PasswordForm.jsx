import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { api } from "../../../lib/api.js";
import { useToast } from "../../../context/ToastContext.jsx";

export default function PasswordForm({ user, onCancel }) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: (body) => api.put("/customer/profile", body).then((r) => r.data),
    onSuccess: () => {
      showToast("Password updated successfully!", "success");
      onCancel();
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to change password.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!oldPassword) return setValidationError("Current Password is required.");
    if (!newPassword) return setValidationError("New Password is required.");
    if (newPassword.length < 8) return setValidationError("New Password must be at least 8 characters long.");
    if (newPassword !== confirmPassword) {
      return setValidationError("New passwords do not match.");
    }

    updateProfileMutation.mutate({
      name: user.name,
      phone: user.phone,
      oldPassword,
      newPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
        <h3 className="font-display font-semibold text-sm text-white">Change Password</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-muted hover:text-white font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Current Password</label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type={showOldPass ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-10 text-xs text-white focus:outline-none focus:border-indigo/50 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowOldPass(!showOldPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
            >
              {showOldPass ? <HiOutlineEyeSlash size={16} /> : <HiOutlineEye size={16} />}
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">New Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type={showNewPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-10 text-xs text-white focus:outline-none focus:border-indigo/50 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
              >
                {showNewPass ? <HiOutlineEyeSlash size={16} /> : <HiOutlineEye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-10 text-xs text-white focus:outline-none focus:border-indigo/50 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
              >
                {showConfirmPass ? <HiOutlineEyeSlash size={16} /> : <HiOutlineEye size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {validationError && (
        <p className="text-[11px] text-amber bg-amber/5 px-4 py-2 rounded-xl border border-amber/10 font-medium">
          {validationError}
        </p>
      )}

      <div className="pt-2 flex justify-end gap-3">
        <button
          type="submit"
          disabled={updateProfileMutation.isLoading}
          className="btn-primary px-5 py-2 text-xs font-semibold"
        >
          {updateProfileMutation.isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}
