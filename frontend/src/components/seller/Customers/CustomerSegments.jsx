const segments = [
  {
    name: "VIP Customers",
    customers: 248,
    revenue: "₹1.84 Cr",
  },
  {
    name: "Frequent Buyers",
    customers: 942,
    revenue: "₹4.52 Cr",
  },
  {
    name: "Inactive",
    customers: 314,
    revenue: "₹42 L",
  },
  {
    name: "New Customers",
    customers: 1245,
    revenue: "₹1.24 Cr",
  },
];

export default function CustomerSegments() {
  return (
    <div className="bg-white rounded-2xl border shadow p-6">
      <h2 className="text-xl font-bold mb-5">Customer Segments</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {segments.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border p-5 hover:border-indigo-500 transition"
          >
            <h3 className="font-semibold">{item.name}</h3>

            <p className="mt-3 text-3xl font-bold">{item.customers}</p>

            <p className="text-green-600 mt-2">{item.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
