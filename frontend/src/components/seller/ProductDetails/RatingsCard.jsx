import { useMemo, useState } from "react";
import {
  FaStar,
  FaSearch,
  FaThumbsUp,
  FaCheckCircle,
  FaFilter,
  FaCamera,
  FaSmile,
} from "react-icons/fa";

export default function RatingsCard({ product }) {
  const {
    averageRating = 4.6,
    totalReviews = 428,
    ratingDistribution = {
      5: 280,
      4: 92,
      3: 36,
      2: 12,
      1: 8,
    },
    reviews = [],
  } = product;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const reviewList =
    reviews.length > 0
      ? reviews
      : [
          {
            id: 1,
            name: "Rahul Sharma",
            rating: 5,
            verified: true,
            helpful: 18,
            images: 2,
            comment:
              "Excellent product quality. Packaging was premium and delivery was very fast.",
            date: "10 Jul 2026",
          },
          {
            id: 2,
            name: "Priya Singh",
            rating: 4,
            verified: true,
            helpful: 9,
            images: 1,
            comment: "Very good product. Worth buying.",
            date: "08 Jul 2026",
          },
          {
            id: 3,
            name: "Amit Patel",
            rating: 3,
            verified: false,
            helpful: 2,
            images: 0,
            comment: "Average quality but acceptable for the price.",
            date: "03 Jul 2026",
          },
        ];

  const filteredReviews = useMemo(() => {
    return reviewList.filter((review) => {
      const matchesSearch =
        review.comment.toLowerCase().includes(search.toLowerCase()) ||
        review.name.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "ALL" ? true : review.rating === Number(filter);

      return matchesSearch && matchesFilter;
    });
  }, [reviewList, search, filter]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ratings & Reviews</h2>

          <p className="text-gray-500 mt-1">Customer feedback analytics</p>
        </div>

        <div className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-semibold flex items-center gap-2">
          <FaStar />
          {averageRating} / 5
        </div>
      </div>

      {/* Summary */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rating Overview */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="text-center">
            <h1 className="text-6xl font-bold">{averageRating}</h1>

            <div className="flex justify-center gap-1 text-yellow-400 text-xl mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} />
              ))}
            </div>

            <p className="text-gray-500 mt-4">{totalReviews} Reviews</p>
          </div>
        </div>

        {/* Distribution */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold mb-6">Rating Distribution</h3>

          {[5, 4, 3, 2, 1].map((star) => {
            const value = ratingDistribution[star] || 0;

            const percent = (value / totalReviews) * 100;

            return (
              <div key={star} className="flex items-center gap-4 mb-4">
                <span className="w-6">{star}★</span>

                <div className="flex-1 h-3 bg-gray-200 rounded-full">
                  <div
                    className="bg-yellow-400 h-3 rounded-full"
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>

                <span className="w-12 text-right font-semibold">{value}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reviews..."
              className="w-full border rounded-xl py-3 pl-11 pr-4"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="ALL">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <button className="bg-blue-600 text-white rounded-xl px-6">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Reviews */}

      <div className="space-y-5">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-bold">{review.name}</h4>

                  {review.verified && (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <FaCheckCircle />
                      Verified Purchase
                    </span>
                  )}
                </div>

                <div className="flex gap-1 text-yellow-400 mt-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="mt-4 text-gray-600 leading-7">{review.comment}</p>
              </div>

              <div className="text-right text-sm text-gray-500">
                {review.date}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-6 text-sm">
              <span className="flex items-center gap-2">
                <FaThumbsUp className="text-blue-600" />
                {review.helpful} Helpful
              </span>

              <span className="flex items-center gap-2">
                <FaCamera className="text-purple-600" />
                {review.images} Images
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sentiment */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaSmile className="text-green-600 text-2xl" />

          <h3 className="font-bold text-lg">Customer Sentiment</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Sentiment title="Positive" value="82%" color="green" />

          <Sentiment title="Neutral" value="13%" color="yellow" />

          <Sentiment title="Negative" value="5%" color="red" />
        </div>
      </div>

      {/* Chart */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h3 className="font-bold mb-5">Rating Trend</h3>

        <div className="h-72 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">
          ⭐ Rating Trend Chart
          <br />
          (Chart.js / Recharts Ready)
        </div>
      </div>
    </div>
  );
}

function Sentiment({ title, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="border rounded-xl p-6 text-center">
      <div
        className={`inline-flex px-4 py-2 rounded-full font-semibold ${colors[color]}`}
      >
        {title}
      </div>

      <h2 className="text-4xl font-bold mt-5">{value}</h2>
    </div>
  );
}
