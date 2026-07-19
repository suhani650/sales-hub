import { useState } from "react";
import { HiOutlineCreditCard } from "react-icons/hi2";
import GlassCard from "../../../components/GlassCard.jsx";

export default function CartSummary({ subtotal, onCheckout }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Estimates
  const tax = subtotal * 0.18; // 18% GST estimate
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + tax + shipping;

  const handleCheckoutClick = () => {
    setIsCheckingOut(true);
    // Mimic API delay before launching modal success toast
    setTimeout(() => {
      onCheckout();
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <GlassCard tilt={false} className="p-6 space-y-6">
      <h3 className="font-display font-semibold text-base text-white">Order Summary</h3>

      <div className="space-y-3 border-b border-white/[0.06] pb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-mono text-white font-medium">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Est. Tax (18% GST)</span>
          <span className="font-mono text-white font-medium">
            ₹{tax.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Delivery Charges</span>
          <span className="font-mono text-white font-medium">
            {shipping === 0 ? (
              <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded text-xs border border-emerald-500/20">
                FREE
              </span>
            ) : (
              `₹${shipping.toLocaleString("en-IN")}`
            )}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-[10px] text-muted italic">
            Add ₹{(5000 - subtotal).toLocaleString("en-IN")} more to get FREE shipping.
          </p>
        )}
      </div>

      <div className="flex justify-between items-baseline pt-2">
        <span className="font-semibold text-white">Order Total</span>
        <span className="text-2xl font-mono font-bold text-white">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        disabled={subtotal === 0 || isCheckingOut}
        onClick={handleCheckoutClick}
        className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide disabled:opacity-50"
      >
        {isCheckingOut ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <HiOutlineCreditCard size={18} />
            Proceed to Checkout
          </>
        )}
      </button>
    </GlassCard>
  );
}
