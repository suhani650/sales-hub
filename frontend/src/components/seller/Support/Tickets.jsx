import { HiOutlineEye, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const tickets = [
  {
    id: "#TK1001",
    subject: "Payment not received",
    priority: "High",
    status: "Open",
    created: "18 Jul 2026",
  },
  {
    id: "#TK1002",
    subject: "Return request issue",
    priority: "Medium",
    status: "Resolved",
    created: "17 Jul 2026",
  },
  {
    id: "#TK1003",
    subject: "Shipping delay",
    priority: "Low",
    status: "Pending",
    created: "16 Jul 2026",
  },
];

export default function Tickets() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Support Tickets</h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Ticket</th>

            <th>Subject</th>

            <th>Priority</th>

            <th>Status</th>

            <th>Date</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-t">
              <td className="p-4 font-semibold">{ticket.id}</td>

              <td>{ticket.subject}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    ticket.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : ticket.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {ticket.priority}
                </span>
              </td>

              <td>{ticket.status}</td>

              <td>{ticket.created}</td>

              <td>
                <div className="flex justify-center gap-3">
                  <button className="text-indigo-600">
                    <HiOutlineEye size={20} />
                  </button>

                  <button className="text-green-600">
                    <HiOutlineChatBubbleLeftRight size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
