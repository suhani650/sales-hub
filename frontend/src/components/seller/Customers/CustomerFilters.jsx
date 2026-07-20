import { FaSearch, FaDownload, FaUndo, FaCalendarAlt } from "react-icons/fa";

export default function CustomerFilters({
  filters,
  setFilters,
  onExport,
  onReset,
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4">
        {/* Search */}

        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Customer Name"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full border rounded-xl pl-11 py-3"
          />
        </div>

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          value={filters.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        {/* Mobile */}

        <input
          type="text"
          placeholder="Mobile"
          value={filters.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          className="border rounded-xl px-4 py-3"
        />

        {/* Segment */}

        <select
          value={filters.segment}
          onChange={(e) => handleChange("segment", e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">All Segments</option>

          <option value="VIP">VIP</option>

          <option value="LOYAL">Loyal</option>

          <option value="NEW">New</option>

          <option value="AT_RISK">At Risk</option>
        </select>

        {/* Lifetime Value */}

        <select
          value={filters.ltv}
          onChange={(e) => handleChange("ltv", e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">Lifetime Value</option>

          <option value="1000">₹1,000+</option>

          <option value="10000">₹10,000+</option>

          <option value="50000">₹50,000+</option>

          <option value="100000">₹1 Lakh+</option>
        </select>

        {/* Orders */}

        <select
          value={filters.orders}
          onChange={(e) => handleChange("orders", e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">Total Orders</option>

          <option value="1">1+</option>

          <option value="5">5+</option>

          <option value="10">10+</option>

          <option value="50">50+</option>
        </select>

        {/* Loyalty */}

        <select
          value={filters.loyalty}
          onChange={(e) => handleChange("loyalty", e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">Loyalty Level</option>

          <option value="BRONZE">Bronze</option>

          <option value="SILVER">Silver</option>

          <option value="GOLD">Gold</option>

          <option value="PLATINUM">Platinum</option>
        </select>

        {/* Date */}

        <div className="relative">
          <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />

          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full border rounded-xl pl-11 py-3"
          />
        </div>
      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={onReset}
          className="
          border
          rounded-xl
          px-5
          py-3
          flex
          items-center
          gap-2
          hover:bg-gray-50
          "
        >
          <FaUndo />
          Reset
        </button>

        <button
          onClick={onExport}
          className="
          bg-blue-600
          text-white
          rounded-xl
          px-5
          py-3
          flex
          items-center
          gap-2
          "
        >
          <FaDownload />
          Export Customers
        </button>
      </div>
    </div>
  );
}
