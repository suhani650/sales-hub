import { HiOutlineEye, HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";

const requests = [
  {
    id: "#RET1001",
    customer: "Rahul Sharma",
    product: "Wireless Headphones",
    reason: "Damaged Product",
    amount: "₹3,500",
    status: "Pending",
  },
  {
    id: "#RET1002",
    customer: "Priya Verma",
    product: "Bluetooth Speaker",
    reason: "Wrong Item",
    amount: "₹1,240",
    status: "Approved",
  },
];

export default function ReturnRequests() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Return Requests</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Reason</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-semibold">{item.id}</td>

                <td>{item.customer}</td>

                <td>{item.product}</td>

                <td>{item.reason}</td>

                <td className="text-green-600 font-semibold">{item.amount}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button className="text-indigo-600">
                      <HiOutlineEye size={20} />
                    </button>

                    <button className="text-green-600">
                      <HiOutlineCheck size={20} />
                    </button>

                    <button className="text-red-600">
                      <HiOutlineXMark size={20} />
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
