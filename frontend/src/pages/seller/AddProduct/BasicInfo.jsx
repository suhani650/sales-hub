import { useState } from "react";
import {
  FaBoxOpen,
  FaBarcode,
  FaGlobe,
  FaTag,
  FaShieldAlt,
} from "react-icons/fa";

export default function BasicInfo({ formData, updateData }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    updateData({
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const productTypes = ["Physical Product", "Digital Product", "Service"];

  const conditions = ["New", "Used", "Refurbished"];

  const warranties = [
    "No Warranty",
    "6 Months",
    "1 Year",
    "2 Years",
    "3 Years",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Basic Product Information</h2>

        <p className="text-gray-500 mt-2">
          Enter the basic details of your product.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Name */}

        <div className="lg:col-span-2">
          <label className="font-semibold">Product Name *</label>

          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter Product Name"
            className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-right text-sm text-gray-400 mt-1">
            {formData.productName.length}/150
          </div>
        </div>

        {/* Short Description */}

        <div className="lg:col-span-2">
          <label className="font-semibold">Short Description</label>

          <textarea
            rows={3}
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Long Description */}

        <div className="lg:col-span-2">
          <label className="font-semibold">Detailed Description</label>

          <textarea
            rows={8}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product..."
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Product Type */}

        <div>
          <label className="font-semibold">Product Type</label>

          <select
            name="productType"
            value={formData.productType || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option>Select Product Type</option>

            {productTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Condition */}

        <div>
          <label className="font-semibold">Product Condition</label>

          <select
            name="condition"
            value={formData.condition || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option>Select Condition</option>

            {conditions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Manufacturer */}

        <div>
          <label className="font-semibold">Manufacturer</label>

          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer || ""}
            onChange={handleChange}
            placeholder="Manufacturer"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Brand */}

        <div>
          <label className="font-semibold">Brand</label>

          <input
            type="text"
            name="brand"
            value={formData.brand || ""}
            onChange={handleChange}
            placeholder="Brand Name"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Barcode */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaBarcode />
            Barcode / UPC
          </label>

          <input
            type="text"
            name="barcode"
            value={formData.barcode || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* HSN */}

        <div>
          <label className="font-semibold">HSN Code</label>

          <input
            type="text"
            name="hsn"
            value={formData.hsn || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Country */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaGlobe />
            Country of Origin
          </label>

          <input
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            placeholder="India"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Warranty */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaShieldAlt />
            Warranty
          </label>

          <select
            name="warranty"
            value={formData.warranty || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option>Select Warranty</option>

            {warranties.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Tags */}

        <div className="lg:col-span-2">
          <label className="font-semibold flex items-center gap-2">
            <FaTag />
            Product Tags
          </label>

          <input
            type="text"
            name="tags"
            value={formData.tags || ""}
            onChange={handleChange}
            placeholder="electronics, smartwatch, wearable"
            className="w-full mt-2 border rounded-lg p-3"
          />

          <p className="text-gray-400 text-sm mt-2">
            Separate tags using commas.
          </p>
        </div>
      </div>

      {/* Options */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.featured || false}
            onChange={(e) =>
              updateData({
                featured: e.target.checked,
              })
            }
          />
          Featured Product
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.returnable || false}
            onChange={(e) =>
              updateData({
                returnable: e.target.checked,
              })
            }
          />
          Returnable Product
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.active || false}
            onChange={(e) =>
              updateData({
                active: e.target.checked,
              })
            }
          />
          Publish Immediately
        </label>
      </div>

      {/* Live Preview */}

      <div className="mt-10 border rounded-xl p-6 bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Live Preview</h3>

        <div className="flex items-center gap-5">
          <div className="w-24 h-24 bg-white rounded-lg border flex items-center justify-center">
            <FaBoxOpen className="text-gray-400" size={35} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {formData.productName || "Product Name"}
            </h2>

            <p className="text-gray-500 mt-2">
              {formData.shortDescription ||
                "Short description will appear here"}
            </p>

            <div className="mt-3 flex gap-3 flex-wrap">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                {formData.brand || "Brand"}
              </span>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                {formData.condition || "Condition"}
              </span>

              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                {formData.warranty || "Warranty"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
