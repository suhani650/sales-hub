import { HiOutlineEye, HiOutlineTruck, HiOutlineMapPin } from "react-icons/hi2";

const shipments = [
  {
    id: "#SHIP1001",
    order: "#ORD10245",
    customer: "Rahul Sharma",
    courier: "Delhivery",
    tracking: "DL123456789",
    status: "In Transit",
  },
  {
    id: "#SHIP1002",
    order: "#ORD10246",
    customer: "Priya Verma",
    courier: "Blue Dart",
    tracking: "BD987654321",
    status: "Delivered",
  },
  {
    id: "#SHIP1003",
    order: "#ORD10247",
    customer: "Amit Kumar",
    courier: "XpressBees",
    tracking: "XB112233445",
    status: "Pending",
  },
];

export default function ShipmentList() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Shipments</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Shipment</th>
              <th>Order</th>
              <th>Customer</th>
              <th>Courier</th>
              <th>Tracking</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="border-t">
                <td className="p-4 font-semibold">{shipment.id}</td>

                <td>{shipment.order}</td>

                <td>{shipment.customer}</td>

                <td>{shipment.courier}</td>

                <td className="font-medium text-indigo-600">
                  {shipment.tracking}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      shipment.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : shipment.status === "In Transit"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {shipment.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                    <button className="text-indigo-600">
                      <HiOutlineEye size={20} />
                    </button>

                    <button className="text-green-600">
                      <HiOutlineTruck size={20} />
                    </button>

                    <button className="text-orange-600">
                      <HiOutlineMapPin size={20} />
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
