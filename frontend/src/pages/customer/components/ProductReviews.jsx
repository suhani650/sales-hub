import { HiStar, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import GlassCard from "../../../components/GlassCard.jsx";

export default function ProductReviews({ reviews, totalReviews }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
        <HiOutlineChatBubbleLeftEllipsis className="text-indigo-soft" size={20} />
        Customer Reviews ({totalReviews})
      </h2>

      {totalReviews === 0 ? (
        <div className="text-center py-10 bg-white/[0.01] rounded-xl border border-white/[0.04]">
          <p className="text-sm text-muted">
            No reviews yet for this product. Be the first to leave one!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <GlassCard key={rev.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">
                    {rev.customer?.user?.name || "Verified Buyer"}
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HiStar
                      key={i}
                      size={12}
                      className={i < rev.rating ? "text-amber" : "text-white/10"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed">{rev.comment}</p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
