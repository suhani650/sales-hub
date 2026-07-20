const report = [
  {
    title: "Revenue",
    value: "₹58.4L",
  },
  {
    title: "Expenses",
    value: "₹18.7L",
  },
  {
    title: "Net Profit",
    value: "₹39.7L",
  },
];

export default function ProfitLossReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Profit & Loss</h2>

      {report.map((item) => (
        <div key={item.title} className="flex justify-between border-b py-4">
          <span>{item.title}</span>

          <span className="font-bold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
