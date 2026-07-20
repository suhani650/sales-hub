import { useMemo, useState } from "react";
import {
  FaSearch,
  FaFileExport,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";

export default function VariantsTable({ product }) {
  const variants =
    product.variants?.length > 0
      ? product.variants
      : [
          {
            id: 1,
            image: "https://via.placeholder.com/70x70?text=Black",
            color: "Black",
            size: "128 GB",
            sku: "IP16P-BLK-128",
            price: 129999,
            stock: 48,
            default: true,
          },
          {
            id: 2,
            image: "https://via.placeholder.com/70x70?text=Silver",
            color: "Silver",
            size: "256 GB",
            sku: "IP16P-SLV-256",
            price: 139999,
            stock: 15,
            default: false,
          },
          {
            id: 3,
            image: "https://via.placeholder.com/70x70?text=Gold",
            color: "Gold",
            size: "512 GB",
            sku: "IP16P-GLD-512",
            price: 159999,
            stock: 4,
            default: false,
          },
          {
            id: 4,
            image: "https://via.placeholder.com/70x70?text=Blue",
            color: "Blue",
            size: "1 TB",
            sku: "IP16P-BLU-1TB",
            price: 179999,
            stock: 0,
            default: false,
          },
        ];

  const [search, setSearch] = useState("");

  const filteredVariants = useMemo(() => {
    return variants.filter((variant) =>
      Object.values(variant)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [variants, search]);

  const getStatus = (stock) => {
    if (stock <= 0)
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-600",
        icon: <FaTimesCircle />,
      };

    if (stock <= 10)
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-700",
        icon: <FaExclamationTriangle />,
      };

    return {
      label: "In Stock",
      color: "bg-green-100 text-green-600",
      icon: <FaCheckCircle />,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Product Variants</h2>

          <p className="text-gray-500 mt-1">Manage color, size & stock</p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-gray-100">
            <FaFileExport />
            Export
          </button>

          <div className="bg-blue-100 text-blue-700 rounded-xl px-5 py-3 font-semibold">
            {filteredVariants.length} Variants
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl border shadow-sm p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search variants..."
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Variant</th>

              <th className="px-6 py-4 text-left">Color</th>

              <th className="px-6 py-4 text-left">Size</th>

              <th className="px-6 py-4 text-left">SKU</th>

              <th className="px-6 py-4 text-right">Price</th>

              <th className="px-6 py-4 text-center">Stock</th>

              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredVariants.map((variant) => {
              const status = getStatus(variant.stock);

              return (
                <tr key={variant.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={variant.image}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover border"
                      />

                      {variant.default && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold">
                          <FaStar />
                          Default
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-5 font-medium">{variant.color}</td>

                  <td className="px-6 py-5">{variant.size}</td>

                  <td className="px-6 py-5 text-gray-600">{variant.sku}</td>

                  <td className="px-6 py-5 text-right font-bold">
                    ₹{variant.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 text-center font-semibold">
                    {variant.stock}
                  </td>

                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${status.color}`}
                    >
                      {status.icon}
                      {status.label}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <SummaryCard
          title="Total Variants"
          value={variants.length}
          color="blue"
        />

        <SummaryCard
          title="Available Stock"
          value={variants.reduce((a, b) => a + b.stock, 0)}
          color="green"
        />

        <SummaryCard
          title="Low Stock"
          value={variants.filter((v) => v.stock > 0 && v.stock <= 10).length}
          color="yellow"
        />

        <SummaryCard
          title="Out of Stock"
          value={variants.filter((v) => v.stock === 0).length}
          color="red"
        />
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
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
