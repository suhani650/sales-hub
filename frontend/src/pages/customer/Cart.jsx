import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineShoppingBag,
  HiOutlineChevronLeft,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import { useToast } from "../../context/ToastContext.jsx";

// Import Modular Components
import CartItemRow from "./components/CartItemRow.jsx";
import CartSummary from "./components/CartSummary.jsx";

export default function Cart() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Fetch cart query
  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ["customer-cart"],
    queryFn: () => api.get("/customer/cart").then((r) => r.data),
  });

  // Update Cart Item Quantity Mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }) =>
      api.put(`/customer/cart/${itemId}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-cart"]);
    },
    onError: (err) => {
      console.error("Cart quantity update error:", err);
      showToast(err.response?.data?.error || "Failed to update quantity.", "error");
    },
  });

  // Remove Cart Item Mutation
  const removeItemMutation = useMutation({
    mutationFn: (itemId) => api.delete(`/customer/cart/${itemId}`),
    onSuccess: () => {
      showToast("Item removed from your cart.", "info");
      queryClient.invalidateQueries(["customer-cart"]);
    },
    onError: (err) => {
      console.error("Cart item delete error:", err);
      showToast(err.response?.data?.error || "Failed to remove item.", "error");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-24 w-full bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-white/5 animate-pulse rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-rose-400 font-semibold text-lg">Failed to load cart items.</p>
        <button
          onClick={() => queryClient.invalidateQueries(["customer-cart"])}
          className="btn-primary mt-4 inline-flex items-center gap-2"
        >
          Retry Load
        </button>
      </div>
    );
  }

  const items = cart?.items || [];
  const itemsCount = items.reduce((count, item) => count + item.quantity, 0);

  // Subtotal Calculation
  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantityMutation.mutate({ itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId) => {
    removeItemMutation.mutate(itemId);
  };

  const handleCheckoutRedirect = () => {
    navigate("/dashboard/checkout");
  };

  return (
    <div className="space-y-8">
      {/* Header and back */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-muted mt-1">
            Review and adjust items before placing your order.
          </p>
        </div>
        <Link
          to="/dashboard/shop"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
        >
          <HiOutlineChevronLeft size={14} /> Continue Shopping
        </Link>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
          <div className="w-20 h-20 rounded-full bg-white/[0.01] border border-white/[0.04] flex items-center justify-center text-muted">
            <HiOutlineShoppingBag size={36} />
          </div>
          <div className="space-y-1">
            <h2 className="font-display font-semibold text-lg text-white">Your Cart is Empty</h2>
            <p className="text-xs text-muted max-w-xs">
              Explore our products and add them to your cart to see them here.
            </p>
          </div>
          <Link to="/dashboard/shop" className="btn-primary px-6 py-2.5 text-xs font-semibold">
            Explore Shop Catalog
          </Link>
        </div>
      ) : (
        /* Cart Contents */
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                isUpdating={
                  updateQuantityMutation.isLoading &&
                  updateQuantityMutation.variables?.itemId === item.id
                }
                isRemoving={
                  removeItemMutation.isLoading &&
                  removeItemMutation.variables === item.id
                }
              />
            ))}
          </div>

          {/* Pricing Summary Side Panel */}
          <div className="lg:col-span-1">
            <CartSummary subtotal={subtotal} onCheckout={handleCheckoutRedirect} />
          </div>
        </div>
      )}
    </div>
  );
}
