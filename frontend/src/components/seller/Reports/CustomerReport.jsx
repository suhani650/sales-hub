const customers = [
  {
    name: "Rahul Sharma",
    orders: 28,
    spent: "₹82,450",
  },
  {
    name: "Priya Verma",
    orders: 18,
    spent: "₹45,120",
  },
  {
    name: "Amit Singh",
    orders: 12,
    spent: "₹28,400",
  },
];

export default function CustomerReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Top Customers</h2>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">Customer</th>

            <th>Total Orders</th>

            <th>Total Spend</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.name} className="border-t">
              <td className="p-4 font-semibold">{customer.name}</td>

              <td>{customer.orders}</td>

              <td className="text-green-600 font-semibold">{customer.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
