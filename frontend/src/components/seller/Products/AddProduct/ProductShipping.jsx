import {
  FaTruck,
  FaWeightHanging,
  FaRulerCombined,
  FaGlobeAsia,
  FaShippingFast,
  FaBoxOpen,
} from "react-icons/fa";

export default function ProductShipping({ product, setProduct }) {
  const shipping = product.shipping || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">Shipping Details</h2>

        <p className="text-gray-500 mt-2">
          Configure package dimensions, shipping cost and delivery options.
        </p>
      </div>

      {/* Dimensions */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
      >
        <h3 className="text-lg font-semibold mb-5">Package Dimensions</h3>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Weight (kg)</label>

            <div className="relative mt-2">
              <FaWeightHanging className="absolute left-4 top-4 text-white-400" />

              <input
                type="number"
                step="0.01"
                name="weight"
                value={shipping.weight || ""}
                onChange={handleChange}
                className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
                placeholder="0.50"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Length (cm)</label>

            <div className="relative mt-2">
              <FaRulerCombined className="absolute left-4 top-4 text-gray-400" />

              <input
                type="number"
                name="length"
                value={shipping.length || ""}
                onChange={handleChange}
                className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Width (cm)</label>

            <div className="relative mt-2">
              <FaRulerCombined className="absolute left-4 top-4 text-gray-400" />

              <input
                type="number"
                name="width"
                value={shipping.width || ""}
                onChange={handleChange}
                className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Height (cm)</label>

            <div className="relative mt-2">
              <FaRulerCombined className="absolute left-4 top-4 text-gray-400" />

              <input
                type="number"
                name="height"
                value={shipping.height || ""}
                onChange={handleChange}
                className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Options */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6">
          <label className="font-medium">Shipping Class</label>

          <div className="relative mt-2">
            <FaTruck className="absolute left-4 top-4 text-gray-400" />

            <select
              name="shippingClass"
              value={shipping.shippingClass || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            >
              <option value="">Select Class</option>

              <option value="STANDARD">Standard</option>

              <option value="EXPRESS">Express</option>

              <option value="SAME_DAY">Same Day</option>

              <option value="OVERNIGHT">Overnight</option>
            </select>
          </div>
        </div>

        <div className="border rounded-xl p-6">
          <label className="font-medium">Shipping Zone</label>

          <div className="relative mt-2">
            <FaGlobeAsia className="absolute left-4 top-4 text-gray-400" />

            <select
              name="shippingZone"
              value={shipping.shippingZone || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
            >
              <option value="">Select Zone</option>

              <option>Local</option>
              <option>State</option>
              <option>National</option>
              <option>International</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cost */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Shipping Cost (₹)</label>

          <input
            type="number"
            name="shippingCost"
            value={shipping.shippingCost || ""}
            onChange={handleChange}
            className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400 "
            placeholder="100"
          />
        </div>

        <div>
          <label className="font-medium">Estimated Delivery</label>

          <input
            type="text"
            name="deliveryTime"
            value={shipping.deliveryTime || ""}
            onChange={handleChange}
            className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            placeholder="3 - 5 Business Days"
          />
        </div>
      </div>

      {/* Switches */}

      <div className="grid md:grid-cols-3 gap-6">
        <label className="border rounded-xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-semibold">Free Shipping</h4>

            <p className="text-sm text-gray-500">Offer free delivery</p>
          </div>

          <input
            type="checkbox"
            name="freeShipping"
            checked={shipping.freeShipping || false}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </label>

        <label className="border rounded-xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-semibold">Express Delivery</h4>

            <p className="text-sm text-gray-500">Priority shipping</p>
          </div>

          <input
            type="checkbox"
            name="express"
            checked={shipping.express || false}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </label>

        <label className="border rounded-xl p-5 flex justify-between items-center">
          <div>
            <h4 className="font-semibold">Fragile Product</h4>

            <p className="text-sm text-gray-500">Handle carefully</p>
          </div>

          <input
            type="checkbox"
            name="fragile"
            checked={shipping.fragile || false}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </label>
      </div>

      {/* Summary */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <FaBoxOpen className="text-blue-600 text-3xl" />
          <p className="mt-4 text-white-500">Weight</p>
          <h3 className="text-2xl font-bold">{shipping.weight || 0} kg</h3>
        </div>

        <div
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <FaShippingFast className="text-green-600 text-3xl" />
          <p className="mt-4 text-white-500">Delivery</p>
          <h3 className="text-xl font-bold">{shipping.deliveryTime || "-"}</h3>
        </div>

        <div
          className="bg-yellow-50
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <FaTruck className="text-yellow-600 text-3xl" />
          <p className="mt-4 text-whitw -500">Shipping Cost</p>
          <h3 className="text-2xl font-bold">₹ {shipping.shippingCost || 0}</h3>
        </div>

        <div
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <FaGlobeAsia className="text-purple-600 text-3xl" />
          <p className="mt-4 text-gray-500">Zone</p>
          <h3 className="text-xl font-bold">{shipping.shippingZone || "-"}</h3>
        </div>
      </div>
    </div>
  );
}
