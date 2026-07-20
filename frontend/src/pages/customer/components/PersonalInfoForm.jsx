import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineUser, HiOutlinePhone } from "react-icons/hi2";
import { api } from "../../../lib/api.js";
import { setUser } from "../../../store/authSlice.js";
import { useToast } from "../../../context/ToastContext.jsx";

export default function PersonalInfoForm({ user, onCancel }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleNameChange = (e) => {
    setValidationError("");
    const val = e.target.value;
    const sanitized = val.replace(/[^a-zA-Z\s]/g, "");
    if (sanitized.length <= 100) {
      setName(sanitized);
    }
  };

  const handlePhoneChange = (e) => {
    setValidationError("");
    const val = e.target.value;
    const sanitized = val.replace(/\D/g, "");
    if (sanitized.length <= 10) {
      setPhone(sanitized);
    }
  };

  const updateProfileMutation = useMutation({
    mutationFn: (body) => api.put("/customer/profile", body).then((r) => r.data),
    onSuccess: (data) => {
      dispatch(setUser({ ...user, ...data.user }));
      queryClient.invalidateQueries(["customer-profile"]);
      showToast("Profile details updated successfully!", "success");
      onCancel();
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to update profile details.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    const nameTrimmed = name.trim();
    if (!nameTrimmed) return setValidationError("Full Name is required.");
    if (nameTrimmed.length < 3) return setValidationError("Full Name must be at least 3 characters.");

    const phoneTrimmed = phone.trim();
    if (!phoneTrimmed) return setValidationError("Phone number is required.");
    if (!/^[6-9]\d{9}$/.test(phoneTrimmed)) {
      return setValidationError("Phone number must be a valid 10-digit number starting with 6-9.");
    }

    updateProfileMutation.mutate({
      name: nameTrimmed,
      phone: phoneTrimmed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
        <h3 className="font-display font-semibold text-sm text-white">Edit Personal Info</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-muted hover:text-white font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Full Name</label>
          <div className="relative">
            <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="John Doe"
              className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-10 text-xs text-white focus:outline-none focus:border-indigo/50"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Phone Number</label>
          <div className="relative">
            <HiOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              placeholder="9876543210"
              className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-10 text-xs text-white focus:outline-none focus:border-indigo/50 font-mono"
            />
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
          {updateProfileMutation.isLoading ? "Saving..." : "Save Details"}
        </button>
      </div>
    </form>
  );
}
