import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineMapPin, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi2";
import { api } from "../../../lib/api.js";
import { useToast } from "../../../context/ToastContext.jsx";
import AddressForm from "./AddressForm.jsx";

export default function AddressBook({ onBack }) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Fetch Saved Addresses
  const { data: savedAddresses = [], isLoading } = useQuery({
    queryKey: ["customer-addresses"],
    queryFn: () => api.get("/customer/addresses").then((r) => r.data),
  });

  // Delete Address Mutation
  const deleteAddressMutation = useMutation({
    mutationFn: (id) => api.delete(`/customer/addresses/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-addresses"]);
      showToast("Address deleted successfully!", "success");
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to delete address.", "error");
    },
  });

  // Toggle Default Address Mutation
  const toggleDefaultMutation = useMutation({
    mutationFn: (body) => api.put(`/customer/addresses/${body.id}`, body).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-addresses"]);
      showToast("Default address updated successfully!", "success");
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to update default address.", "error");
    },
  });

  const handleSetDefault = (addr) => {
    if (addr.isDefault) return;
    toggleDefaultMutation.mutate({
      ...addr,
      recipientName: addr.recipientName,
      street: addr.street,
      pincode: addr.pincode,
      isDefault: true,
    });
  };

  if (isAdding || editingAddress) {
    return (
      <AddressForm
        editingAddress={editingAddress}
        onCancel={() => {
          setIsAdding(false);
          setEditingAddress(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header and Add trigger */}
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
        <h3 className="font-display font-semibold text-sm text-white">Manage Addresses</h3>
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="text-xs text-indigo-soft hover:text-indigo font-bold transition-colors uppercase tracking-wider"
          >
            + Add New
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-muted hover:text-white font-medium"
          >
            Back
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-6 text-xs text-muted">Loading addresses...</div>
      ) : savedAddresses.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-white/5 rounded-2xl bg-panel2/10">
          <HiOutlineMapPin className="mx-auto text-muted mb-2" size={24} />
          <p className="text-xs text-muted">No addresses saved yet.</p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="text-xs text-indigo-soft hover:underline font-medium mt-2"
          >
            Add your first shipping address
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                addr.isDefault
                  ? "bg-indigo/5 border-indigo/20 shadow-sm"
                  : "bg-void/40 border-white/5 hover:border-white/10"
              }`}
            >
              <div className="space-y-1">
                {/* Title line */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white tracking-wide">{addr.title}</span>
                  {addr.isDefault ? (
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-wider">
                      Default
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr)}
                      className="text-[8px] text-muted hover:text-white uppercase font-bold tracking-wider hover:underline"
                    >
                      Set Default
                    </button>
                  )}
                </div>

                {/* Details list */}
                <div className="text-[10px] text-muted space-y-0.5 pt-1">
                  <p className="text-white font-medium">{addr.recipientName}</p>
                  <p className="font-mono text-[9px]">+91 {addr.phone}</p>
                  <p className="truncate">{addr.street}</p>
                  <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-white/[0.04] pt-2.5 mt-3">
                <button
                  type="button"
                  onClick={() => setEditingAddress(addr)}
                  className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-muted hover:text-white transition-colors"
                  title="Edit address"
                >
                  <HiOutlinePencil size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteAddressMutation.mutate(addr.id)}
                  disabled={deleteAddressMutation.isLoading}
                  className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-muted hover:text-red transition-colors"
                  title="Delete address"
                >
                  <HiOutlineTrash size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
