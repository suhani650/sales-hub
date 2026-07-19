import { HiStar, HiOutlineStar } from "react-icons/hi2";
import GlassCard from "../../../components/GlassCard.jsx";

export default function ReviewForm({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  comment,
  setComment,
  onSubmit,
  isSubmitting,
}) {
  return (
    <GlassCard tilt={false} className="p-6 space-y-4 border-indigo/10">
      <h3 className="font-display font-semibold text-sm text-white">
        Write a Customer Review
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Stars selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
            Rating Count
          </label>
          <div className="flex gap-1 items-center">
            {[1, 2, 3, 4, 5].map((starVal) => {
              const isActive =
                hoverRating !== null ? starVal <= hoverRating : starVal <= rating;
              return (
                <button
                  key={starVal}
                  type="button"
                  onMouseEnter={() => setHoverRating(starVal)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(starVal)}
                  className="text-amber transition-transform hover:scale-110"
                >
                  {isActive ? (
                    <HiStar size={24} />
                  ) : (
                    <HiOutlineStar size={24} className="text-white/10" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment box */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
            Your Review
          </label>
          <textarea
            rows={4}
            placeholder="Share your thoughts about this product's quality, pricing, and packaging..."
            className="w-full bg-panel2 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none text-white focus:border-indigo/50 transition-colors"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-6 py-2.5 text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-75"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </GlassCard>
  );
}
