import ReplyReview from "../../../components/seller/Reviews/ReplyReview";
import RatingAnalytics from "../../../components/seller/Reviews/RatingAnalytics";

export default function ReviewDetails() {
  const review = {
    id: "#REV1024",
    product: "Wireless Headphones",
    customer: "Rahul Sharma",
    rating: 5,
    date: "18 Jul 2026",
    title: "Excellent Product",
    review:
      "Very good sound quality. Fast delivery and premium packaging. Highly recommended.",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h1 className="text-3xl font-bold">Review Details</h1>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <Info title="Review ID" value={review.id} />
          <Info title="Customer" value={review.customer} />
          <Info title="Product" value={review.product} />
          <Info title="Date" value={review.date} />
          <Info title="Rating" value={"⭐".repeat(review.rating)} />
        </div>

        <div className="mt-8">
          <h3 className="font-semibold">Review</h3>

          <p className="mt-3 text-gray-600">{review.review}</p>
        </div>
      </div>

      <ReplyReview />

      <RatingAnalytics />
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div>
      <p className="text-gray-500">{title}</p>

      <h3 className="font-semibold mt-1">{value}</h3>
    </div>
  );
}
