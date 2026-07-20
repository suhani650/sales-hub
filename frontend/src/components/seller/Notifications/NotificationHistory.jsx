const history = [
  {
    id: "#NT1001",
    title: "Order Received",
    channel: "Email",
    sent: "18 Jul 2026",
    status: "Delivered",
  },
  {
    id: "#NT1002",
    title: "Shipment Delivered",
    channel: "Push",
    sent: "18 Jul 2026",
    status: "Read",
  },
  {
    id: "#NT1003",
    title: "Refund Completed",
    channel: "Email",
    sent: "17 Jul 2026",
    status: "Delivered",
  },
];

export default function NotificationHistory() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Notification History</h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">ID</th>

            <th>Title</th>

            <th>Channel</th>

            <th>Date</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 font-semibold">{item.id}</td>

              <td>{item.title}</td>

              <td>{item.channel}</td>

              <td>{item.sent}</td>

              <td>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
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
