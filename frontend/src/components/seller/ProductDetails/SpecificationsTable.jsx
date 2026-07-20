import { useMemo, useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaFileExport,
  FaClipboardList,
  FaTag,
} from "react-icons/fa";

export default function SpecificationsTable({ product }) {
  const defaultSpecs = {
    General: [
      { label: "Brand", value: "Apple" },
      { label: "Model", value: "iPhone 16 Pro" },
      { label: "SKU", value: "APL-IP16P-001" },
    ],
    Display: [
      { label: "Screen Size", value: "6.3 inch" },
      { label: "Resolution", value: "2622 × 1206" },
      { label: "Refresh Rate", value: "120Hz" },
    ],
    Performance: [
      { label: "Processor", value: "A18 Pro" },
      { label: "RAM", value: "8 GB" },
      { label: "Storage", value: "256 GB" },
    ],
    Battery: [
      { label: "Capacity", value: "4200 mAh" },
      { label: "Charging", value: "USB-C Fast Charging" },
    ],
    Dimensions: [
      { label: "Height", value: "149.6 mm" },
      { label: "Width", value: "71.5 mm" },
      { label: "Weight", value: "199 g" },
    ],
  };

  const specs = product.specifications || defaultSpecs;

  const [search, setSearch] = useState("");

  const [expanded, setExpanded] = useState(
    Object.keys(specs).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {},
    ),
  );

  const filteredSpecs = useMemo(() => {
    const result = {};

    Object.entries(specs).forEach(([group, items]) => {
      const filtered = items.filter(
        (item) =>
          item.label.toLowerCase().includes(search.toLowerCase()) ||
          item.value.toLowerCase().includes(search.toLowerCase()),
      );

      if (filtered.length) result[group] = filtered;
    });

    return result;
  }, [search, specs]);

  const totalSpecifications = Object.values(filteredSpecs).reduce(
    (acc, curr) => acc + curr.length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl shadow-sm p-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Specifications</h2>

          <p className="text-gray-500 mt-1">Technical product details</p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-gray-100">
            <FaFileExport />
            Export
          </button>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-semibold">
            {totalSpecifications} Specs
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="relative">
          <FaSearch className="absolute top-4 left-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search specifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />
        </div>
      </div>

      {/* Groups */}

      <div className="space-y-5">
        {Object.entries(filteredSpecs).map(([group, items]) => (
          <div
            key={group}
            className="bg-white border rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Group Header */}

            <button
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [group]: !prev[group],
                }))
              }
              className="w-full flex justify-between items-center px-6 py-5 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <FaClipboardList className="text-blue-600" />

                <h3 className="font-bold text-lg">{group}</h3>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {items.length}
                </span>
              </div>

              {expanded[group] ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Table */}

            {expanded[group] && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left px-6 py-4">Specification</th>

                      <th className="text-left px-6 py-4">Value</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                          <FaTag className="text-blue-500" />

                          {item.label}
                        </td>

                        <td className="px-6 py-4 text-gray-700">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty */}

      {Object.keys(filteredSpecs).length === 0 && (
        <div className="bg-white border rounded-2xl shadow-sm p-16 text-center">
          <h3 className="text-xl font-semibold">No Specifications Found</h3>

          <p className="text-gray-500 mt-2">Try changing your search.</p>
        </div>
      )}
    </div>
  );
}
