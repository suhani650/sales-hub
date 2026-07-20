const timeline = [
  "Order Placed",
  "Payment Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Out For Delivery",
];

export default function OrderTimeline() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="font-bold text-xl mb-6">Order Timeline</h2>

      <div className="space-y-5">
        {timeline.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-4 h-4 rounded-full bg-indigo-600 mt-1"></div>

            <div>
              <h4 className="font-semibold">{step}</h4>

              <p className="text-gray-500 text-sm">18 Jul 2026 • 10:30 AM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
