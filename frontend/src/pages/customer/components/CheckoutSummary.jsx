import GlassCard from "../../../components/GlassCard.jsx";

export default function CheckoutSummary({
  items,
  subtotal,
  tax,
  shipping,
  grandTotal,
  isLoading,
  onPlaceOrder,
}) {
  return (
    <GlassCard tilt={false} className="p-6 space-y-6">
      <h3 className="font-display font-semibold text-sm text-white">Order Summary</h3>

      {/* List of items */}
      <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-3 text-xs">
            <div className="min-w-0">
              <p className="font-medium text-white truncate">{item.product.name}</p>
              <p className="text-muted mt-0.5">Qty: {item.quantity}</p>
            </div>
            <span className="font-mono text-white shrink-0">
              ₹{(parseFloat(item.product.price) * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {/* Price Calculations */}
      <div className="space-y-3 pt-6 border-t border-white/[0.06] text-xs">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>GST (18%)</span>
          <span className="font-mono">₹{tax.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Shipping Charges</span>
          <span className="font-mono text-indigo-soft">
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-base font-semibold text-white pt-3 border-t border-white/[0.06]">
          <span>Total Amount</span>
          <span className="font-mono text-indigo-soft">
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Place Order CTA */}
      <button
        onClick={onPlaceOrder}
        disabled={isLoading}
        className="btn-primary w-full justify-center flex items-center gap-2 mt-4 cursor-pointer"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Placing Order…
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </GlassCard>
  );
}
