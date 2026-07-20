import {
  FaBox,
  FaShippingFast,
  FaGlobe,
  FaUndo,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

export default function ShippingInfo({ formData, updateData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    updateData({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="space-y-8">
      {/* SHIPPING */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-2xl font-bold mb-2">Shipping Information</h2>

        <p className="text-gray-500">
          Configure shipping and delivery settings.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          <div>
            <label className="font-semibold flex items-center gap-2">
              <FaBox />
              Weight (KG)
            </label>

            <input
              type="number"
              step="0.01"
              name="weight"
              value={formData.weight || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="0.50"
            />
          </div>

          <div>
            <label className="font-semibold">Length (CM)</label>

            <input
              type="number"
              name="length"
              value={formData.length || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Width (CM)</label>

            <input
              type="number"
              name="width"
              value={formData.width || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Height (CM)</label>

            <input
              type="number"
              name="height"
              value={formData.height || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="font-semibold flex items-center gap-2">
              <FaShippingFast />
              Shipping Class
            </label>

            <select
              name="shippingClass"
              value={formData.shippingClass || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select</option>
              <option>Standard</option>
              <option>Express</option>
              <option>Same Day</option>
              <option>Heavy Item</option>
            </select>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2">
              <FaGlobe />
              Shipping Zone
            </label>

            <select
              name="shippingZone"
              value={formData.shippingZone || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select</option>
              <option>All India</option>
              <option>North India</option>
              <option>South India</option>
              <option>International</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="font-semibold">Shipping Charge (₹)</label>

            <input
              type="number"
              name="shippingCharge"
              value={formData.shippingCharge || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2">
              <FaMapMarkerAlt />
              Pickup Warehouse
            </label>

            <select
              name="pickupWarehouse"
              value={formData.pickupWarehouse || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">Select</option>
              <option>Delhi Warehouse</option>
              <option>Mumbai Warehouse</option>
              <option>Bangalore Warehouse</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="codAvailable"
              checked={formData.codAvailable || false}
              onChange={handleChange}
            />
            Cash On Delivery
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="freeShipping"
              checked={formData.freeShipping || false}
              onChange={handleChange}
            />
            Free Shipping
          </label>
        </div>
      </div>

      {/* RETURN POLICY */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaUndo />
          Return Policy
        </h2>

        <textarea
          rows={5}
          name="returnPolicy"
          value={formData.returnPolicy || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-5"
          placeholder="Enter return & replacement policy..."
        />
      </div>

      {/* SEO */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaSearch />
          SEO Settings
        </h2>

        <div className="space-y-6 mt-6">
          <div>
            <label className="font-semibold">Meta Title</label>

            <input
              name="metaTitle"
              value={formData.metaTitle || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">URL Slug</label>

            <input
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Meta Keywords</label>

            <input
              name="keywords"
              value={formData.keywords || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="watch, smartwatch, wearable"
            />
          </div>

          <div>
            <label className="font-semibold">Meta Description</label>

            <textarea
              rows={5}
              name="metaDescription"
              value={formData.metaDescription || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="bg-blue-50 rounded-xl border p-6">
        <h2 className="text-xl font-bold mb-5">Shipping Summary</h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white rounded-lg p-5">
            <p className="text-gray-500">Weight</p>
            <h2 className="text-2xl font-bold">{formData.weight || 0} KG</h2>
          </div>

          <div className="bg-white rounded-lg p-5">
            <p className="text-gray-500">Shipping</p>
            <h2 className="text-xl font-bold">
              {formData.shippingClass || "--"}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-5">
            <p className="text-gray-500">Zone</p>
            <h2 className="text-xl font-bold">
              {formData.shippingZone || "--"}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-5">
            <p className="text-gray-500">COD</p>
            <h2 className="text-xl font-bold">
              {formData.codAvailable ? "Available" : "No"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
