const sales = [
  {
    month: "January",
    orders: 1240,
    revenue: "₹4.2L",
  },
  {
    month: "February",
    orders: 1385,
    revenue: "₹4.8L",
  },
  {
    month: "March",
    orders: 1520,
    revenue: "₹5.4L",
  },
  {
    month: "April",
    orders: 1648,
    revenue: "₹6.2L",
  },
];

export default function SalesReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Monthly Sales Report</h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Month</th>

            <th>Orders</th>

            <th>Revenue</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((item) => (
            <tr key={item.month} className="border-t">
              <td className="p-4 font-semibold">{item.month}</td>

              <td>{item.orders}</td>

              <td className="text-green-600 font-semibold">{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
