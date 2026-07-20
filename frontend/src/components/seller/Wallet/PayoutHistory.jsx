const payouts = [
  {
    id: "#PAY1001",
    amount: "₹50,000",
    bank: "HDFC",
    date: "18 Jul 2026",
    status: "Completed",
  },
  {
    id: "#PAY1002",
    amount: "₹25,000",
    bank: "ICICI",
    date: "15 Jul 2026",
    status: "Processing",
  },
];

export default function PayoutHistory() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Payout History</h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Payout</th>

            <th>Amount</th>

            <th>Bank</th>

            <th>Date</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payouts.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 font-semibold">{item.id}</td>

              <td className="font-semibold text-green-600">{item.amount}</td>

              <td>{item.bank}</td>

              <td>{item.date}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
