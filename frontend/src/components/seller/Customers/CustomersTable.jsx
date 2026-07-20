import { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaEnvelope,
  FaCrown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function CustomersTable({
  customers = [],
  onView,
  onEdit,
  onCampaign,
}) {
  const [selected, setSelected] = useState([]);

  const data =
    customers.length > 0
      ? customers
      : [
          {
            id: "CUS-1001",
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            phone: "+91 9876543210",
            vip: true,
            lifetimeValue: 125000,
            orders: 18,
            wishlist: 12,
            loyalty: "GOLD",
            joined: "12 Jan 2025",
          },

          {
            id: "CUS-1002",
            name: "Priya Singh",
            email: "priya@gmail.com",
            phone: "+91 9876500000",
            vip: false,
            lifetimeValue: 28500,
            orders: 6,
            wishlist: 4,
            loyalty: "SILVER",
            joined: "08 Mar 2025",
          },
        ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((customer) => customer.id));
    }
  };

  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      {/* Header */}

      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Customers</h2>

        <span className="text-sm text-gray-500">
          {selected.length} Selected
        </span>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selected.length === data.length}
                  onChange={selectAll}
                />
              </th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Contact</th>

              <th className="p-4 text-left">Lifetime Value</th>

              <th className="p-4 text-left">Orders</th>

              <th className="p-4 text-left">Wishlist</th>

              <th className="p-4 text-left">Loyalty</th>

              <th className="p-4 text-left">Joined</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((customer) => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(customer.id)}
                    onChange={() => toggleSelect(customer.id)}
                  />
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {customer.vip && <FaCrown className="text-yellow-500" />}

                    <div>
                      <p className="font-semibold">{customer.name}</p>

                      <p className="text-xs text-gray-500">{customer.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div>
                    <p>{customer.email}</p>

                    <p className="text-xs text-gray-500">{customer.phone}</p>
                  </div>
                </td>

                <td className="p-4 font-bold">
                  ₹{customer.lifetimeValue.toLocaleString()}
                </td>

                <td className="p-4">{customer.orders}</td>

                <td className="p-4">{customer.wishlist}</td>

                <td className="p-4">
                  <LoyaltyBadge level={customer.loyalty} />
                </td>

                <td className="p-4">{customer.joined}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView?.(customer)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(customer)}
                      className="p-2 rounded-lg bg-green-100 text-green-600"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onCampaign?.(customer)}
                      className="p-2 rounded-lg bg-purple-100 text-purple-600"
                    >
                      <FaEnvelope />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="border-t p-5 flex justify-between items-center">
        <p className="text-sm text-gray-500">Showing 1-10 of 1,248</p>

        <div className="flex gap-2">
          <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
            <FaChevronLeft />
          </button>

          <button className="w-10 h-10 bg-blue-600 text-white rounded-lg">
            1
          </button>

          <button className="w-10 h-10 border rounded-lg">2</button>

          <button className="w-10 h-10 border rounded-lg">3</button>

          <button className="w-10 h-10 border rounded-lg flex items-center justify-center">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function LoyaltyBadge({ level }) {
  const colors = {
    BRONZE: "bg-orange-100 text-orange-600",

    SILVER: "bg-gray-100 text-gray-700",

    GOLD: "bg-yellow-100 text-yellow-700",

    PLATINUM: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      ${colors[level]}
      `}
    >
      {level}
    </span>
  );
}
