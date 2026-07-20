const templates = [
  {
    id: 1,
    title: "New Order",
    type: "Email",
    status: "Active",
  },
  {
    id: 2,
    title: "Order Shipped",
    type: "Push",
    status: "Active",
  },
  {
    id: 3,
    title: "Return Approved",
    type: "Email",
    status: "Draft",
  },
  {
    id: 4,
    title: "Payment Received",
    type: "Push",
    status: "Active",
  },
];

export default function NotificationTemplates() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Notification Templates</h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Template</th>

            <th>Type</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {templates.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 font-semibold">{item.title}</td>

              <td>{item.type}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "Active"
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
