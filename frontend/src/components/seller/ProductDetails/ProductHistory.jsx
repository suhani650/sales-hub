import { useMemo, useState } from "react";
import {
  FaHistory,
  FaPlusCircle,
  FaEdit,
  FaMoneyBillWave,
  FaBoxes,
  FaImage,
  FaUserShield,
  FaSearch,
  FaDownload,
  FaFilter,
} from "react-icons/fa";

export default function ProductHistory({ product = {} }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");

  const history = product.history || [
    {
      id: 1,
      type: "CREATED",
      icon: <FaPlusCircle />,
      user: "Admin",
      date: "15 Jul 2026 09:15 AM",
      description: "Product created.",
    },
    {
      id: 2,
      type: "PRICE",
      icon: <FaMoneyBillWave />,
      user: "Seller",
      date: "16 Jul 2026 10:30 AM",
      description: "Price changed from ₹54,999 to ₹52,999.",
    },
    {
      id: 3,
      type: "STOCK",
      icon: <FaBoxes />,
      user: "Warehouse",
      date: "16 Jul 2026 01:45 PM",
      description: "Stock updated from 120 → 96.",
    },
    {
      id: 4,
      type: "IMAGE",
      icon: <FaImage />,
      user: "Seller",
      date: "17 Jul 2026 11:20 AM",
      description: "Primary product image updated.",
    },
    {
      id: 5,
      type: "UPDATED",
      icon: <FaEdit />,
      user: "Seller",
      date: "17 Jul 2026 04:00 PM",
      description: "Specifications edited.",
    },
    {
      id: 6,
      type: "APPROVED",
      icon: <FaUserShield />,
      user: "Admin",
      date: "18 Jul 2026 09:30 AM",
      description: "Product approved for publishing.",
    },
  ];

  const filtered = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.user.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "ALL" ? true : item.type === type;

      return matchesSearch && matchesType;
    });
  }, [history, search, type]);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-wrap justify-between gap-4 items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FaHistory />
            Product Activity
          </h2>

          <p className="text-gray-500 mt-2">
            Complete audit history of this product.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-blue-600 text-white flex items-center gap-2">
          <FaDownload />
          Export Log
        </button>
      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activity..."
              className="w-full border rounded-xl pl-11 py-3"
            />
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-xl px-4"
          >
            <option value="ALL">All Activities</option>
            <option value="CREATED">Created</option>
            <option value="UPDATED">Updated</option>
            <option value="PRICE">Price</option>
            <option value="STOCK">Stock</option>
            <option value="IMAGE">Images</option>
            <option value="APPROVED">Approval</option>
          </select>

          <button className="border rounded-xl flex items-center justify-center gap-2">
            <FaFilter />
            Date Filter
          </button>
        </div>
      </div>

      {/* Timeline */}

      <div className="bg-white rounded-2xl border shadow-sm p-8">
        <div className="relative border-l-2 border-blue-200 ml-5">
          {filtered.map((item) => (
            <div key={item.id} className="relative pl-10 pb-10">
              <div className="absolute -left-5 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {item.icon}
              </div>

              <div className="border rounded-xl p-5 bg-gray-50">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-lg">{item.type}</h4>

                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    <div>{item.date}</div>
                    <div className="mt-2">
                      By <strong>{item.user}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="ml-10 py-12 text-center text-gray-500">
              No activity found.
            </div>
          )}
        </div>
      </div>

      {/* Summary */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Summary title="Total Activities" value={history.length} color="blue" />

        <Summary
          title="Price Changes"
          value={history.filter((h) => h.type === "PRICE").length}
          color="green"
        />

        <Summary
          title="Stock Updates"
          value={history.filter((h) => h.type === "STOCK").length}
          color="yellow"
        />

        <Summary
          title="Image Updates"
          value={history.filter((h) => h.type === "IMAGE").length}
          color="purple"
        />
      </div>
    </div>
  );
}

function Summary({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div
        className={`inline-flex px-4 py-2 rounded-full font-semibold ${colors[color]}`}
      >
        {title}
      </div>

      <h2 className="text-4xl font-bold mt-6">{value}</h2>
    </div>
  );
}
