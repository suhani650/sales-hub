import { HiOutlineChatBubbleLeftRight, HiOutlineEye } from "react-icons/hi2";

const reviews = [
  {
    id: 1,
    product: "Wireless Headphones",
    customer: "Rahul Sharma",
    rating: 5,
    review: "Excellent quality and fast delivery.",
    date: "18 Jul 2026",
  },
  {
    id: 2,
    product: "Bluetooth Speaker",
    customer: "Priya Verma",
    rating: 4,
    review: "Sound quality is good.",
    date: "17 Jul 2026",
  },
];

export default function ProductReviews() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Product Reviews</h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th>Customer</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 font-semibold">{item.product}</td>

              <td>{item.customer}</td>

              <td>{"⭐".repeat(item.rating)}</td>

              <td>{item.review}</td>

              <td>{item.date}</td>

              <td>
                <div className="flex justify-center gap-3">
                  <button className="text-indigo-600">
                    <HiOutlineEye size={20} />
                  </button>

                  <button className="text-green-600">
                    <HiOutlineChatBubbleLeftRight size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
