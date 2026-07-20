import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaPalette,
  FaRulerCombined,
  FaBoxOpen,
} from "react-icons/fa";

export default function VariantsInfo({ formData, updateData }) {
  const [variant, setVariant] = useState({
    color: "",
    size: "",
    sku: "",
    price: "",
    stock: "",
    active: true,
  });

  const variants = formData.variants || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVariant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateSKU = () => {
    return "VAR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const addVariant = () => {
    if (!variant.color || !variant.size || !variant.price) return;

    updateData({
      variants: [
        ...variants,
        {
          id: Date.now(),
          ...variant,
          sku: variant.sku || generateSKU(),
        },
      ],
    });

    setVariant({
      color: "",
      size: "",
      sku: "",
      price: "",
      stock: "",
      active: true,
    });
  };

  const deleteVariant = (id) => {
    updateData({
      variants: variants.filter((item) => item.id !== id),
    });
  };

  const toggleStatus = (id) => {
    updateData({
      variants: variants.map((item) =>
        item.id === id
          ? {
              ...item,
              active: !item.active,
            }
          : item,
      ),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h2 className="text-2xl font-bold">Product Variants</h2>

        <p className="text-gray-500 mt-2">
          Create multiple product variants like Amazon Seller Central.
        </p>
      </div>

      {/* Add Variant */}

      <div className="bg-white rounded-xl shadow border p-8">
        <h3 className="text-xl font-bold mb-6">Add Variant</h3>

        <div className="grid lg:grid-cols-5 gap-5">
          <div>
            <label className="font-semibold flex items-center gap-2">
              <FaPalette />
              Color
            </label>

            <input
              name="color"
              value={variant.color}
              onChange={handleChange}
              placeholder="Black"
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2">
              <FaRulerCombined />
              Size
            </label>

            <input
              name="size"
              value={variant.size}
              onChange={handleChange}
              placeholder="XL"
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold">Price</label>

            <input
              type="number"
              name="price"
              value={variant.price}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold">Stock</label>

            <input
              type="number"
              name="stock"
              value={variant.stock}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold">Variant SKU</label>

            <input
              name="sku"
              value={variant.sku}
              onChange={handleChange}
              placeholder="Auto Generated"
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>
        </div>

        <button
          onClick={addVariant}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Variant
        </button>
      </div>

      {/* Variant Table */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h3 className="text-xl font-bold">Variant List</h3>

          <span>{variants.length} Variants</span>
        </div>

        {variants.length === 0 ? (
          <div className="py-20 flex flex-col items-center">
            <FaBoxOpen size={60} className="text-gray-300" />

            <h3 className="mt-4 text-xl font-semibold">No Variants Added</h3>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Color</th>

                <th className="p-4 text-left">Size</th>

                <th className="p-4 text-left">SKU</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Stock</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {variants.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">{item.color}</td>

                  <td className="p-4">{item.size}</td>

                  <td className="p-4">{item.sku}</td>

                  <td className="p-4">₹{item.price}</td>

                  <td className="p-4">{item.stock}</td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1 rounded-full text-white ${
                        item.active ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {item.active ? "Active" : "Disabled"}
                    </button>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteVariant(item.id)}
                      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}

      <div className="bg-blue-50 rounded-xl border p-6">
        <h3 className="text-xl font-bold mb-4">Variant Summary</h3>

        <div className="grid md:grid-cols-4 gap-5">
          <div className="bg-white rounded-lg p-5">
            <p>Total Variants</p>

            <h2 className="text-3xl font-bold mt-2">{variants.length}</h2>
          </div>

          <div className="bg-white rounded-lg p-5">
            <p>Active</p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {variants.filter((v) => v.active).length}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-5">
            <p>Total Stock</p>

            <h2 className="text-3xl font-bold mt-2">
              {variants.reduce((sum, item) => sum + Number(item.stock || 0), 0)}
            </h2>
          </div>

          <div className="bg-white rounded-lg p-5">
            <p>Average Price</p>

            <h2 className="text-3xl font-bold mt-2">
              ₹
              {variants.length
                ? (
                    variants.reduce(
                      (sum, item) => sum + Number(item.price || 0),
                      0,
                    ) / variants.length
                  ).toFixed(0)
                : 0}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
