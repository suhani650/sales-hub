import { useState } from "react";
import {
  FaPercentage,
  FaBolt,
  FaCalendarAlt,
  FaGift,
  FaChartLine,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function DiscountEngine() {
  const [rule, setRule] = useState({
    name: "",
    type: "PERCENTAGE",
    value: "",
    target: "ALL_PRODUCTS",
    startDate: "",
    endDate: "",
  });

  const [discounts] = useState([
    {
      id: 1,
      name: "Mega Sale 20%",
      type: "Percentage",
      value: "20%",
      target: "All Products",
      revenueImpact: "₹4.2L",
      status: "Active",
    },
    {
      id: 2,
      name: "Flash Sale ₹500",
      type: "Fixed",
      value: "₹500",
      target: "Cart",
      revenueImpact: "₹2.1L",
      status: "Scheduled",
    },
  ]);

  const handleChange = (e) => {
    setRule({
      ...rule,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Discount Engine</h2>

        <p className="text-gray-500 mt-2">
          Create advanced discount rules and promotions
        </p>
      </div>

      {/* Create Rule */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-5">Create Promotion Rule</h3>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={rule.name}
            onChange={handleChange}
            placeholder="Promotion Name"
            className="border rounded-xl p-3"
          />

          <select
            name="type"
            value={rule.type}
            onChange={handleChange}
            className="border rounded-xl p-3"
          >
            <option value="PERCENTAGE">Percentage Discount</option>

            <option value="FIXED">Fixed Discount</option>

            <option value="BXGY">Buy X Get Y</option>
          </select>

          <input
            name="value"
            value={rule.value}
            onChange={handleChange}
            placeholder="Discount Value"
            className="border rounded-xl p-3"
          />

          <select
            name="target"
            value={rule.target}
            onChange={handleChange}
            className="border rounded-xl p-3"
          >
            <option value="ALL_PRODUCTS">All Products</option>

            <option value="PRODUCT">Product Level</option>

            <option value="CATEGORY">Category Level</option>

            <option value="CART">Cart Level</option>
          </select>

          <input
            type="date"
            name="startDate"
            value={rule.startDate}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="date"
            name="endDate"
            value={rule.endDate}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />
        </div>

        <button className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <FaPlus />
          Create Rule
        </button>
      </div>

      {/* Analytics */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard
          title="Active Promotions"
          value="18"
          icon={<FaPercentage />}
        />

        <StatCard title="Flash Sales" value="5" icon={<FaBolt />} />

        <StatCard
          title="Revenue Impact"
          value="₹18.6L"
          icon={<FaChartLine />}
        />

        <StatCard
          title="Scheduled Offers"
          value="12"
          icon={<FaCalendarAlt />}
        />
      </div>

      {/* Promotion Types */}

      <div className="grid lg:grid-cols-3 gap-5">
        <FeatureCard icon={<FaPercentage />} title="Percentage Discount" />

        <FeatureCard icon={<FaGift />} title="Buy X Get Y" />

        <FeatureCard icon={<FaBolt />} title="Flash Sales" />
      </div>

      {/* Discounts Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-xl">Promotion Rules</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Type</th>

              <th className="p-4 text-left">Value</th>

              <th className="p-4 text-left">Target</th>

              <th className="p-4 text-left">Revenue Impact</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {discounts.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-semibold">{item.name}</td>

                <td className="p-4">{item.type}</td>

                <td className="p-4">{item.value}</td>

                <td className="p-4">{item.target}</td>

                <td className="p-4 text-green-600 font-semibold">
                  {item.revenueImpact}
                </td>

                <td className="p-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <button className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-blue-600 text-3xl">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function FeatureCard({ icon, title }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="text-4xl text-blue-600 flex justify-center">{icon}</div>

      <h3 className="font-bold text-lg mt-4">{title}</h3>
    </div>
  );
}
