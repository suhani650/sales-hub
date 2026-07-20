import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiOutlineMapPin,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import { useToast } from "../../context/ToastContext.jsx";

// Import modular subcomponents
import CheckoutSummary from "./components/CheckoutSummary.jsx";
import CheckoutOptions from "./components/CheckoutOptions.jsx";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

export default function Checkout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Delhi",
    pinCode: "",
  });

  const [selectedAddrId, setSelectedAddrId] = useState("");
  const [isAddrDropdownOpen, setIsAddrDropdownOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("STANDARD"); // STANDARD | EXPRESS
  const [paymentMethod, setPaymentMethod] = useState("CARD"); // CARD | UPI | WALLET
  const [validationError, setValidationError] = useState("");

  // Fetch Saved Addresses
  const { data: savedAddresses = [] } = useQuery({
    queryKey: ["customer-addresses"],
    queryFn: () => api.get("/customer/addresses").then((r) => r.data),
  });

  // Prepopulate default address when list loads
  useEffect(() => {
    if (savedAddresses.length > 0) {
      const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
      if (defaultAddr) {
        setAddress({
          fullName: defaultAddr.recipientName,
          phone: defaultAddr.phone,
          addressLine1: defaultAddr.street,
          addressLine2: "",
          city: defaultAddr.city,
          state: defaultAddr.state,
          pinCode: defaultAddr.pincode,
        });
        setSelectedAddrId(defaultAddr.id.toString());
      }
    }
  }, [savedAddresses]);

  // 1. Fetch Cart Query
  const { data: cart, isLoading } = useQuery({
    queryKey: ["customer-cart"],
    queryFn: () => api.get("/customer/cart").then((r) => r.data),
  });

  const items = cart?.items || [];

  // Calculate costs based on cart items list
  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.product.price) * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST

  const shipping = deliveryMethod === "EXPRESS" 
    ? 250 
    : (subtotal >= 5000 || subtotal === 0 ? 0 : 150);

  const grandTotal = subtotal + tax + shipping;

  // 2. Place Order Mutation
  const placeOrderMutation = useMutation({
    mutationFn: (body) => api.post("/customer/orders", body).then((r) => r.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["customer-cart"]);
      showToast("Order placed successfully!", "success");
      navigate("/dashboard/checkout/success", {
        state: { orderNumber: data.order.orderNumber, grandTotal: data.order.grandTotal },
        replace: true
      });
    },
    onError: (err) => {
      showToast(err.response?.data?.error || "Failed to place order. Please try again.", "error");
    }
  });

  const handleInputChange = (e) => {
    setValidationError("");
    const { name, value } = e.target;
    
    let sanitizedValue = value;
    if (name === "phone" || name === "pinCode") {
      sanitizedValue = value.replace(/\D/g, ""); // Allow only digits
    } else if (name === "fullName" || name === "city") {
      sanitizedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
    }
    
    setAddress((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Strict Validation
    const nameTrimmed = address.fullName.trim();
    if (!nameTrimmed) return setValidationError("Full Name is required.");
    if (nameTrimmed.length < 3) return setValidationError("Full Name must be at least 3 characters.");
    if (!/^[a-zA-Z\s]+$/.test(nameTrimmed)) return setValidationError("Full Name must contain only letters and spaces.");

    const phoneTrimmed = address.phone.trim();
    if (!phoneTrimmed) return setValidationError("Phone number is required.");
    if (!/^[6-9]\d{9}$/.test(phoneTrimmed)) return setValidationError("Phone number must be a valid 10-digit Indian number starting with 6-9.");

    const addr1Trimmed = address.addressLine1.trim();
    if (!addr1Trimmed) return setValidationError("Address Line 1 is required.");
    if (addr1Trimmed.length < 5) return setValidationError("Address Line 1 must be at least 5 characters long.");
    if (/<script/i.test(addr1Trimmed)) return setValidationError("Invalid characters detected in Address.");

    const addr2Trimmed = address.addressLine2.trim();
    if (addr2Trimmed && /<script/i.test(addr2Trimmed)) {
      return setValidationError("Invalid characters detected in Address Line 2.");
    }

    const cityTrimmed = address.city.trim();
    if (!cityTrimmed) return setValidationError("City is required.");
    if (cityTrimmed.length < 2) return setValidationError("City name must be at least 2 characters.");

    const pinTrimmed = address.pinCode.trim();
    if (!pinTrimmed) return setValidationError("Pin Code is required.");
    if (!/^[1-9]\d{5}$/.test(pinTrimmed)) return setValidationError("Pin Code must be a valid 6-digit Indian PIN code.");

    placeOrderMutation.mutate({
      shippingAddress: {
        fullName: nameTrimmed,
        phone: phoneTrimmed,
        addressLine1: addr1Trimmed,
        addressLine2: addr2Trimmed || "",
        city: cityTrimmed,
        state: address.state,
        pinCode: pinTrimmed,
      },
      deliveryMethod,
      paymentMethod,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-10 h-10 border-4 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-32 space-y-4">
        <h2 className="font-display font-semibold text-lg text-white">No active items to checkout</h2>
        <Link to="/dashboard/shop" className="btn-primary px-6 py-2.5 text-xs font-semibold">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header and back */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">Checkout</h1>
          <p className="text-xs text-muted mt-1">Complete your shipping address and payment details</p>
        </div>
        <Link
          to="/dashboard/cart"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
        >
          <HiOutlineChevronLeft size={14} /> Back to Cart
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Checkout Forms (Col span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Shipping Address */}
            <GlassCard tilt={false} className="p-5 sm:p-6 space-y-4">
              <h2 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <HiOutlineMapPin size={18} className="text-indigo-soft" />
                Shipping Address
              </h2>

              {savedAddresses.length > 0 && (
                <div className="relative space-y-1.5 pb-2">
                  <label className="text-[10px] font-bold text-indigo-soft uppercase tracking-wider">Select Saved Address</label>
                  
                  {/* Select Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsAddrDropdownOpen(!isAddrDropdownOpen)}
                    className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo/50 text-left flex items-center justify-between transition-colors cursor-pointer h-[38px]"
                  >
                    <span className="truncate pr-4">
                      {selectedAddrId === "new" || !selectedAddrId
                        ? "-- Enter New Address --"
                        : (() => {
                            const addr = savedAddresses.find((a) => a.id.toString() === selectedAddrId);
                            return addr 
                              ? `${addr.title} (${addr.recipientName} - ${addr.street}, ${addr.city})`
                              : "-- Select Saved Address --";
                          })()}
                    </span>
                    <HiOutlineChevronDown 
                      className={`text-muted shrink-0 transition-transform duration-200 ${isAddrDropdownOpen ? "rotate-180" : ""}`} 
                      size={16} 
                    />
                  </button>

                  {/* Popover overlay dropdown */}
                  {isAddrDropdownOpen && (
                    <>
                      {/* Click outside backdrop close trigger */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsAddrDropdownOpen(false)} 
                      />
                      
                      {/* Addresses list wrapper */}
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-[#0f111a] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-white/[0.04] scrollbar-thin">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAddrId("new");
                            setAddress({
                              fullName: "",
                              phone: "",
                              addressLine1: "",
                              addressLine2: "",
                              city: "",
                              state: "Delhi",
                              pinCode: "",
                            });
                            setIsAddrDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-xs text-indigo-soft hover:bg-white/[0.04] transition-colors font-semibold"
                        >
                          -- Enter New Address --
                        </button>
                        
                        {savedAddresses.map((addr) => {
                          const isSelected = selectedAddrId === addr.id.toString();
                          return (
                            <button
                              key={addr.id}
                              type="button"
                              onClick={() => {
                                setSelectedAddrId(addr.id.toString());
                                setAddress({
                                  fullName: addr.recipientName,
                                  phone: addr.phone,
                                  addressLine1: addr.street,
                                  addressLine2: "",
                                  city: addr.city,
                                  state: addr.state,
                                  pinCode: addr.pincode,
                                });
                                setIsAddrDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left text-xs transition-colors flex items-center justify-between ${
                                isSelected ? "bg-indigo/15 text-white font-semibold" : "text-muted hover:text-white hover:bg-white/[0.02]"
                              }`}
                            >
                              <div className="truncate pr-4 font-normal text-left">
                                <span className="font-semibold text-white mr-1.5">{addr.title}:</span>
                                {addr.recipientName} - {addr.street}, {addr.city} ({addr.pincode})
                              </div>
                              {addr.isDefault && (
                                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase shrink-0">
                                  Default
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Recipient's name"
                    value={address.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="10-digit phone number"
                    value={address.phone}
                    onChange={handleInputChange}
                    className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Address Line 1</label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="Flat, House no., Building, Company, Apartment"
                  value={address.addressLine1}
                  onChange={handleInputChange}
                  className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Area, Street, Sector, Village"
                  value={address.addressLine2}
                  onChange={handleInputChange}
                  className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Town / City"
                    value={address.city}
                    onChange={handleInputChange}
                    className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">State</label>
                  <select
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 cursor-pointer h-[38px] transition-colors"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st} className="bg-[#0f111a] text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Pin Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    maxLength={6}
                    placeholder="6-digit PIN"
                    value={address.pinCode}
                    onChange={handleInputChange}
                    className="w-full bg-panel2 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo/50 transition-colors"
                  />
                </div>
              </div>
            </GlassCard>

            <CheckoutOptions
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              subtotal={subtotal}
            />

            {validationError && (
              <p className="text-xs text-amber font-medium bg-amber/5 px-4 py-2.5 rounded-xl border border-amber/10">
                {validationError}
              </p>
            )}
          </form>
        </div>

        {/* Order Summary (Col span 1) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-6">
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            grandTotal={grandTotal}
            isLoading={placeOrderMutation.isLoading}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
}
