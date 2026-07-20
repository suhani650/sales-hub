import { HiOutlineTruck, HiOutlineCreditCard } from "react-icons/hi2";
import GlassCard from "../../../components/GlassCard.jsx";

export default function CheckoutOptions({
  deliveryMethod,
  setDeliveryMethod,
  paymentMethod,
  setPaymentMethod,
  subtotal,
}) {
  return (
    <>
      {/* Delivery Method */}
      <GlassCard tilt={false} className="p-5 sm:p-6 space-y-4">
        <h2 className="font-display font-semibold text-sm text-white flex items-center gap-2">
          <HiOutlineTruck size={18} className="text-indigo-soft" />
          Delivery Method
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Standard Shipping */}
          <label className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
            deliveryMethod === "STANDARD" 
              ? "bg-indigo/10 border-indigo text-white" 
              : "bg-panel2/50 border-white/10 hover:border-white/20 text-muted"
          }`}>
            <input
              type="radio"
              name="deliveryMethod"
              value="STANDARD"
              checked={deliveryMethod === "STANDARD"}
              onChange={() => setDeliveryMethod("STANDARD")}
              className="mt-1 accent-indigo cursor-pointer"
            />
            <div>
              <p className="text-sm font-semibold text-white">Standard Delivery</p>
              <p className="text-xs text-muted mt-0.5">Takes 3-5 business days.</p>
              <p className="text-xs font-semibold text-indigo-soft mt-1">
                {subtotal >= 5000 ? "FREE" : "₹150"}
              </p>
            </div>
          </label>

          {/* Express Shipping */}
          <label className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
            deliveryMethod === "EXPRESS" 
              ? "bg-indigo/10 border-indigo text-white" 
              : "bg-panel2/50 border-white/10 hover:border-white/20 text-muted"
          }`}>
            <input
              type="radio"
              name="deliveryMethod"
              value="EXPRESS"
              checked={deliveryMethod === "EXPRESS"}
              onChange={() => setDeliveryMethod("EXPRESS")}
              className="mt-1 accent-indigo cursor-pointer"
            />
            <div>
              <p className="text-sm font-semibold text-white">Express Delivery</p>
              <p className="text-xs text-muted mt-0.5">Takes 1-2 business days.</p>
              <p className="text-xs font-semibold text-indigo-soft mt-1">₹250</p>
            </div>
          </label>
        </div>
      </GlassCard>

      {/* Payment Integration */}
      <GlassCard tilt={false} className="p-5 sm:p-6 space-y-4">
        <h2 className="font-display font-semibold text-sm text-white flex items-center gap-2">
          <HiOutlineCreditCard size={18} className="text-indigo-soft" />
          Payment Option (Mock Checkout)
        </h2>

        <div className="space-y-3">
          <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
            paymentMethod === "CARD" ? "bg-panel2 border-indigo text-white" : "bg-panel2/40 border-white/10 text-muted"
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={() => setPaymentMethod("CARD")}
              className="accent-indigo cursor-pointer"
            />
            <span className="text-xs font-medium text-white">Credit / Debit Cards</span>
          </label>

          <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
            paymentMethod === "UPI" ? "bg-panel2 border-indigo text-white" : "bg-panel2/40 border-white/10 text-muted"
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
              className="accent-indigo cursor-pointer"
            />
            <span className="text-xs font-medium text-white">Unified Payments Interface (UPI / QR)</span>
          </label>

          <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
            paymentMethod === "WALLET" ? "bg-panel2 border-indigo text-white" : "bg-panel2/40 border-white/10 text-muted"
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="WALLET"
              checked={paymentMethod === "WALLET"}
              onChange={() => setPaymentMethod("WALLET")}
              className="accent-indigo cursor-pointer"
            />
            <span className="text-xs font-medium text-white">SalesHub Wallet (Mock balance)</span>
          </label>
        </div>
      </GlassCard>
    </>
  );
}
