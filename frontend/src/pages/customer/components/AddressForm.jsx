import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api.js";
import { useToast } from "../../../context/ToastContext.jsx";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

export default function AddressForm({ editingAddress, onCancel }) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [addrTitle, setAddrTitle] = useState("");
  const [addrRecipient, setAddrRecipient] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrStreet, setAddrStreet] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("Delhi");
  const [addrPincode, setAddrPincode] = useState("");
  const [addrIsDefault, setAddrIsDefault] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingAddress) {
      setAddrTitle(editingAddress.title || "");
      setAddrRecipient(editingAddress.recipientName || "");
      setAddrPhone(editingAddress.phone || "");
      setAddrStreet(editingAddress.street || "");
      setAddrCity(editingAddress.city || "");
      setAddrState(editingAddress.state || "Delhi");
      setAddrPincode(editingAddress.pincode || "");
      setAddrIsDefault(editingAddress.isDefault || false);
    } else {
      setAddrTitle("");
      setAddrRecipient("");
      setAddrPhone("");
      setAddrStreet("");
      setAddrCity("Delhi");
      setAddrState("Delhi");
      setAddrPincode("");
      setAddrIsDefault(false);
    }
  }, [editingAddress]);

  const addAddressMutation = useMutation({
    mutationFn: (body) => api.post("/customer/addresses", body).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-addresses"]);
      showToast("Address added successfully!", "success");
      onCancel();
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to add address.", "error");
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: (body) => api.put(`/customer/addresses/${editingAddress.id}`, body).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-addresses"]);
      showToast("Address updated successfully!", "success");
      onCancel();
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to update address.", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    const titleTrimmed = addrTitle.trim();
    if (!titleTrimmed) return setFormError("Address Label (Title) is required.");
    if (titleTrimmed.length < 2) return setFormError("Address Label must be at least 2 characters.");

    const recipientTrimmed = addrRecipient.trim();
    if (!recipientTrimmed) return setFormError("Recipient Name is required.");
    if (recipientTrimmed.length < 3) return setFormError("Recipient Name must be at least 3 characters.");
    if (!/^[a-zA-Z\s]+$/.test(recipientTrimmed)) return setFormError("Recipient Name must contain only letters and spaces.");

    const phoneTrimmed = addrPhone.trim();
    if (!phoneTrimmed) return setFormError("Mobile Number is required.");
    if (!/^[6-9]\d{9}$/.test(phoneTrimmed)) {
      return setFormError("Mobile Number must be a valid 10-digit Indian number starting with 6-9.");
    }

    const streetTrimmed = addrStreet.trim();
    if (!streetTrimmed) return setFormError("Street Address is required.");
    if (streetTrimmed.length < 5) return setFormError("Street Address must be at least 5 characters long.");
    if (/<script/i.test(streetTrimmed)) return setFormError("Invalid characters detected in Address.");

    const cityTrimmed = addrCity.trim();
    if (!cityTrimmed) return setFormError("City/District is required.");
    if (cityTrimmed.length < 2) return setFormError("City must be at least 2 characters.");
    if (!/^[a-zA-Z\s]+$/.test(cityTrimmed)) return setFormError("City must contain only letters and spaces.");

    const pincodeTrimmed = addrPincode.trim();
    if (!pincodeTrimmed) return setFormError("Pincode is required.");
    if (!/^\d{6}$/.test(pincodeTrimmed)) return setFormError("Pincode must be exactly 6 digits.");

    const payload = {
      title: titleTrimmed,
      recipientName: recipientTrimmed,
      phone: phoneTrimmed,
      street: streetTrimmed,
      city: cityTrimmed,
      state: addrState,
      pincode: pincodeTrimmed,
      isDefault: addrIsDefault,
    };

    if (editingAddress) {
      updateAddressMutation.mutate(payload);
    } else {
      addAddressMutation.mutate(payload);
    }
  };

  const isLoading = addAddressMutation.isLoading || updateAddressMutation.isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-2.5">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
          {editingAddress ? "Edit Saved Address" : "Add New Address"}
        </h4>
        <button
          type="button"
          onClick={onCancel}
          className="text-[10px] text-muted hover:text-white uppercase font-bold tracking-wider"
        >
          Back
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Address Title */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Address Label</label>
          <input
            type="text"
            value={addrTitle}
            onChange={(e) => setAddrTitle(e.target.value)}
            placeholder="e.g. Home, Office, Work"
            className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50"
          />
        </div>

        {/* Recipient Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Recipient Name</label>
          <input
            type="text"
            value={addrRecipient}
            onChange={(e) => setAddrRecipient(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
            placeholder="Recipient's Name"
            className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Mobile Number</label>
          <input
            type="text"
            value={addrPhone}
            onChange={(e) => setAddrPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            placeholder="10-digit Mobile Number"
            className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50 font-mono"
          />
        </div>

        {/* Pincode */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Pincode</label>
          <input
            type="text"
            value={addrPincode}
            onChange={(e) => setAddrPincode(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            placeholder="6-digit Pincode"
            className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50 font-mono"
          />
        </div>
      </div>

      {/* Street Address */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Street Address / House No.</label>
        <input
          type="text"
          value={addrStreet}
          onChange={(e) => setAddrStreet(e.target.value)}
          placeholder="Flat, House no., Building, Company, Apartment, Sector, Area"
          className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* City */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">City / District</label>
          <input
            type="text"
            value={addrCity}
            onChange={(e) => setAddrCity(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
            placeholder="New Delhi"
            className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50"
          />
        </div>

        {/* State */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">State</label>
          <select
            value={addrState}
            onChange={(e) => setAddrState(e.target.value)}
            className="w-full bg-void/50 border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo/50 cursor-pointer h-[32px] transition-colors"
          >
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s} className="bg-[#0f111a] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Default address setting checkbox */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="address_default_chk"
          checked={addrIsDefault}
          disabled={editingAddress?.isDefault} // Cannot unset default unless another address is set as default
          onChange={(e) => setAddrIsDefault(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-white/10 bg-void text-indigo focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
        <label htmlFor="address_default_chk" className="text-[10px] font-bold text-muted uppercase tracking-wider cursor-pointer">
          Set as Default Shipping Address
        </label>
      </div>

      {formError && (
        <p className="text-[10px] text-amber bg-amber/5 px-3 py-1.5 rounded-xl border border-amber/10 font-semibold">
          {formError}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary px-5 py-2 text-xs font-semibold"
        >
          {isLoading ? "Saving Address..." : editingAddress ? "Update Address" : "Add Address"}
        </button>
      </div>
    </form>
  );
}
