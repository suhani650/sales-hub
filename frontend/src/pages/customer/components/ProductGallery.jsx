import {
  HiOutlineTag,
  HiOutlineShoppingCart,
  HiOutlineChatBubbleLeftEllipsis,
} from "react-icons/hi2";
import GlassCard from "../../../components/GlassCard.jsx";

export default function ProductGallery({
  product,
  selectedImageIdx,
  setSelectedImageIdx,
  hasDiscount,
  discountPercent,
}) {
  const images = product.images || [];

  return (
    <div className="space-y-4">
      <GlassCard
        tilt={false}
        className="p-6 flex items-center justify-center min-h-[350px] relative overflow-hidden bg-white/[0.01]"
      >
        {images.length > 0 ? (
          <img
            src={images[selectedImageIdx]?.url.startsWith("http") ? images[selectedImageIdx].url : `http://localhost:5000${images[selectedImageIdx].url}`}
            alt={product.name}
            className="w-full h-[300px] object-contain rounded-xl"
          />
        ) : (
          <>
            {selectedImageIdx === 0 && (
              <HiOutlineTag size={96} className="text-white/5 animate-pulse" />
            )}
            {selectedImageIdx === 1 && (
              <HiOutlineShoppingCart size={96} className="text-white/5 animate-pulse" />
            )}
            {selectedImageIdx === 2 && (
              <HiOutlineChatBubbleLeftEllipsis size={96} className="text-white/5 animate-pulse" />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-indigo-soft">
                {product.category.name}
              </span>
              <h2 className="text-lg font-semibold text-white/70">
                {selectedImageIdx === 0 && "Primary Angle View"}
                {selectedImageIdx === 1 && "Material Focus Details"}
                {selectedImageIdx === 2 && "Package & Box Dimensions"}
              </h2>
            </div>
          </>
        )}

        {hasDiscount && (
          <span className="absolute top-4 right-4 text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-md">
            -{discountPercent}% OFF
          </span>
        )}
      </GlassCard>

      {/* Dynamic thumbnails list */}
      <div className="flex gap-3 justify-center">
        {images.length > 0 ? (
          images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedImageIdx(idx)}
              className={`w-16 h-16 rounded-xl border overflow-hidden flex items-center justify-center transition-all bg-white/[0.02] ${
                selectedImageIdx === idx
                  ? "border-indigo/60 bg-indigo/5"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <img
                src={img.url.startsWith("http") ? img.url : `http://localhost:5000${img.url}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))
        ) : (
          [
            { icon: HiOutlineTag, label: "Main" },
            { icon: HiOutlineShoppingCart, label: "Details" },
            { icon: HiOutlineChatBubbleLeftEllipsis, label: "Packaging" },
          ].map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all bg-white/[0.02] ${
                selectedImageIdx === idx
                  ? "border-indigo/60 bg-indigo/5"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <thumb.icon size={16} className="text-muted" />
              <span className="text-[8px] text-muted font-medium">{thumb.label}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
