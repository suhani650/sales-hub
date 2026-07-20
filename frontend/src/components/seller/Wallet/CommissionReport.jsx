const report = [
  {
    month: "April",
    sales: "₹8.5 L",
    commission: "₹42,500",
  },
  {
    month: "May",
    sales: "₹9.8 L",
    commission: "₹49,000",
  },
  {
    month: "June",
    sales: "₹10.6 L",
    commission: "₹53,000",
  },
];

export default function CommissionReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Commission Report</h2>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Month</th>

            <th>Sales</th>

            <th>Commission</th>
          </tr>
        </thead>

        <tbody>
          {report.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{item.month}</td>

              <td className="font-semibold">{item.sales}</td>

              <td className="text-red-600 font-semibold">{item.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
