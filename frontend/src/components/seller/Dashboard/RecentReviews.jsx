import { FaStar, FaRegStar, FaReply } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    customer: "Rahul Sharma",
    product: "Smart Watch",
    rating: 5,
    review: "Excellent quality and fast delivery.",
    date: "Today",
  },
  {
    id: 2,
    customer: "Priya Verma",
    product: "Wireless Earbuds",
    rating: 4,
    review: "Good sound quality.",
    date: "Yesterday",
  },
  {
    id: 3,
    customer: "Amit Kumar",
    product: "Laptop Bag",
    rating: 3,
    review: "Average product.",
    date: "2 Days Ago",
  },
  {
    id: 4,
    customer: "Sneha Gupta",
    product: "Gaming Mouse",
    rating: 5,
    review: "Amazing experience.",
    date: "3 Days Ago",
  },
];

export default function RecentReviews() {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Reviews</h2>

            <p className="text-sm text-gray-500">Latest customer feedback</p>
          </div>

          <button className="text-blue-600 hover:underline">View All</button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{review.customer}</h3>

                <p className="text-sm text-gray-500">{review.product}</p>
              </div>

              <span className="text-xs text-gray-400">{review.date}</span>
            </div>

            <div className="flex mt-3">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= review.rating ? (
                  <FaStar key={star} className="text-yellow-500" />
                ) : (
                  <FaRegStar key={star} className="text-gray-300" />
                ),
              )}
            </div>

            <p className="text-gray-600 mt-3">{review.review}</p>

            <button className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <FaReply />
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
