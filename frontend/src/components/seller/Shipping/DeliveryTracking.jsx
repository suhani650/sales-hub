const tracking = [
  "Order Packed",
  "Shipment Created",
  "Picked Up",
  "Reached Hub",
  "In Transit",
  "Out For Delivery",
];

export default function DeliveryTracking() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-xl font-bold mb-6">Delivery Timeline</h2>

      <div className="space-y-5">
        {tracking.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-4 h-4 rounded-full bg-indigo-600 mt-2"></div>

            <div>
              <h4 className="font-semibold">{step}</h4>

              <p className="text-gray-500 text-sm">18 Jul 2026 • 11:20 AM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
