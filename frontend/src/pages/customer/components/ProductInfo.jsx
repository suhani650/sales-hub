import {
  HiOutlineShoppingCart,
  HiStar,
  HiOutlineStar,
} from "react-icons/hi2";

export default function ProductInfo({
  product,
  quantity,
  setQuantity,
  onAddToCart,
  isAddingToCart,
  hasDiscount,
  discountPercent,
}) {
  const totalReviews = product.reviews?.length || 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo/10 text-indigo-soft px-2.5 py-1 rounded-md border border-indigo/20">
            {product.category.name}
          </span>
          {product.brand && (
            <span className="text-xs font-medium text-muted">
              by <span className="text-white">{product.brand.name}</span>
            </span>
          )}
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
          {product.name}
        </h1>
        <p className="text-xs font-mono text-muted">SKU: {product.sku}</p>
      </div>

      {/* Rating Summary Header */}
      <div className="flex items-center gap-2 pb-2">
        <div className="flex text-amber">
          {Array.from({ length: 5 }).map((_, i) => {
            const filled = i < Math.round(parseFloat(product.ratingAvg));
            return filled ? (
              <HiStar key={i} size={18} />
            ) : (
              <HiOutlineStar key={i} size={18} className="text-white/10" />
            );
          })}
        </div>
        <span className="text-sm text-white font-semibold">
          {parseFloat(product.ratingAvg).toFixed(1)}
        </span>
        <span className="text-xs text-muted">({totalReviews} verified reviews)</span>
      </div>

      {/* Pricing Box */}
      <div className="py-4 border-y border-white/[0.06] flex items-baseline gap-3">
        <span className="text-3xl font-mono font-bold text-white">
          ₹{parseFloat(product.price).toLocaleString("en-IN")}
        </span>
        {hasDiscount && (
          <>
            <span className="text-sm font-mono text-muted line-through">
              ₹{parseFloat(product.mrp).toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
              Save{" "}
              {Math.round(
                parseFloat(product.mrp) - parseFloat(product.price)
              ).toLocaleString("en-IN")}
            </span>
          </>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm text-muted leading-relaxed">
        {product.description ||
          "This high-grade standard catalog item is manufactured and sourced under strict vendor quality check guidelines."}
      </p>

      {/* Actions panel */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        {/* Quantity Selector */}
        <div className="flex items-center bg-panel2 border border-white/10 rounded-xl px-2 py-1.5 w-full sm:w-auto justify-between gap-4">
          <button
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-white disabled:opacity-30 transition-colors text-lg"
          >
            -
          </button>
          <span className="text-sm font-semibold font-mono text-white w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-white transition-colors text-lg"
          >
            +
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          className="btn-primary w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide disabled:opacity-70"
        >
          {isAddingToCart ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <HiOutlineShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
