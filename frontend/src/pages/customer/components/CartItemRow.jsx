import {
  HiOutlineTrash,
  HiOutlineTag,
} from "react-icons/hi2";

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  isUpdating,
  isRemoving,
}) {
  const { product } = item;
  const subtotal = parseFloat(product.price) * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative overflow-hidden">
      {/* Product main details */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-muted shrink-0">
          <HiOutlineTag size={24} />
        </div>
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo/10 text-indigo-soft px-2 py-0.5 rounded">
            {product.category?.name || "Catalog"}
          </span>
          <h3 className="font-display font-semibold text-sm text-white mt-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[10px] text-muted mt-0.5 font-mono">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Adjust quantity and Price details */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        {/* Quantity selectors */}
        <div className="flex items-center bg-panel2 border border-white/10 rounded-xl px-1.5 py-1">
          <button
            disabled={item.quantity <= 1 || isUpdating}
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 text-white disabled:opacity-30 transition-colors text-base font-semibold"
          >
            -
          </button>
          <span className="text-xs font-semibold font-mono text-white w-7 text-center">
            {isUpdating ? (
              <div className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              item.quantity
            )}
          </span>
          <button
            disabled={isUpdating}
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 text-white disabled:opacity-30 transition-colors text-base font-semibold"
          >
            +
          </button>
        </div>

        {/* Pricing details */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-mono font-bold text-white">
              ₹{subtotal.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-muted font-mono mt-0.5">
              ₹{parseFloat(product.price).toLocaleString("en-IN")} each
            </p>
          </div>

          {/* Remove Trash trigger */}
          <button
            disabled={isRemoving}
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-xl text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
            title="Remove item"
          >
            {isRemoving ? (
              <div className="w-4 h-4 border border-rose-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiOutlineTrash size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
