import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineEye,
} from "react-icons/hi2";

const refunds = [
  {
    id: "#RF1001",
    customer: "Rahul Sharma",
    amount: "₹3,500",
    method: "UPI",
    reason: "Damaged Product",
    status: "Pending",
  },
  {
    id: "#RF1002",
    customer: "Priya Verma",
    amount: "₹1,240",
    method: "Credit Card",
    reason: "Wrong Item",
    status: "Approved",
  },
];

export default function RefundRequests() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Refund Requests</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Refund ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {refunds.map((refund) => (
              <tr key={refund.id} className="border-t">
                <td className="p-4 font-semibold">{refund.id}</td>

                <td>{refund.customer}</td>

                <td className="font-semibold text-green-600">
                  {refund.amount}
                </td>

                <td>{refund.method}</td>

                <td>{refund.reason}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      refund.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {refund.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button className="text-indigo-600">
                      <HiOutlineEye />
                    </button>

                    <button className="text-green-600">
                      <HiOutlineCheckCircle />
                    </button>

                    <button className="text-red-600">
                      <HiOutlineXCircle />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
