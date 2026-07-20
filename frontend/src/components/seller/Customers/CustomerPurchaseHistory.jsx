export default function CustomerPurchaseHistory() {
  const orders = [
    {
      id: "#ORD1021",
      date: "18 Jul 2026",
      amount: "₹8,250",
      status: "Delivered",
    },
    {
      id: "#ORD1045",
      date: "09 Jul 2026",
      amount: "₹4,420",
      status: "Delivered",
    },
    {
      id: "#ORD1098",
      date: "30 Jun 2026",
      amount: "₹11,980",
      status: "Returned",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <h2 className="text-xl font-bold mb-5">Purchase History</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-3 text-left">Order</th>
            <th className="text-left">Date</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4">{item.id}</td>

              <td>{item.date}</td>

              <td className="font-semibold text-green-600">{item.amount}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
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
