const revenue = [
  { source: "Products", amount: "₹48.2L" },
  { source: "Shipping", amount: "₹4.8L" },
  { source: "Services", amount: "₹3.2L" },
  { source: "Others", amount: "₹2.2L" },
];

export default function RevenueReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Revenue Breakdown</h2>

      {revenue.map((item) => (
        <div key={item.source} className="flex justify-between py-3 border-b">
          <span>{item.source}</span>
          <span className="font-semibold text-green-600">{item.amount}</span>
        </div>
      ))}
    </div>
  );
}
