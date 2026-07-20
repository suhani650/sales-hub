import { useEffect } from "react";
import { FaBarcode, FaWarehouse, FaBoxes, FaCube } from "react-icons/fa";

export default function InventoryInfo({ formData, updateData }) {
  // Auto SKU Generator
  useEffect(() => {
    if (!formData.sku) {
      const sku =
        "SKU-" + Math.random().toString(36).substring(2, 8).toUpperCase();

      updateData({
        sku,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateData({
      [name]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8">
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold">Inventory Management</h2>

        <p className="text-gray-500 mt-2">
          Manage stock, warehouse and inventory settings.
        </p>
      </div>

      {/* Form */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SKU */}

        <div>
          <label className="font-semibold">Product SKU</label>

          <input
            type="text"
            name="sku"
            value={formData.sku || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Barcode */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaBarcode />
            Barcode
          </label>

          <input
            type="text"
            name="barcode"
            value={formData.barcode || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Stock */}

        <div>
          <label className="font-semibold">Current Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Minimum Stock */}

        <div>
          <label className="font-semibold">Low Stock Alert</label>

          <input
            type="number"
            name="minimumStock"
            value={formData.minimumStock || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Warehouse */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaWarehouse />
            Warehouse
          </label>

          <select
            name="warehouse"
            value={formData.warehouse || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select Warehouse</option>

            <option>Delhi Warehouse</option>

            <option>Mumbai Warehouse</option>

            <option>Bangalore Warehouse</option>

            <option>Hyderabad Warehouse</option>
          </select>
        </div>

        {/* Stock Status */}

        <div>
          <label className="font-semibold">Stock Status</label>

          <select
            name="stockStatus"
            value={formData.stockStatus || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select Status</option>

            <option>In Stock</option>

            <option>Out of Stock</option>

            <option>Pre Order</option>
          </select>
        </div>
      </div>

      {/* Inventory Settings */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.trackInventory || false}
            onChange={(e) =>
              updateData({
                trackInventory: e.target.checked,
              })
            }
          />
          Track Inventory
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.allowBackOrder || false}
            onChange={(e) =>
              updateData({
                allowBackOrder: e.target.checked,
              })
            }
          />
          Allow Backorders
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.manageStock || false}
            onChange={(e) =>
              updateData({
                manageStock: e.target.checked,
              })
            }
          />
          Manage Stock Automatically
        </label>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-blue-50 rounded-xl p-5">
          <FaCube className="text-4xl text-blue-600 mb-4" />

          <p className="text-gray-500">Current Stock</p>

          <h2 className="text-3xl font-bold mt-2">{formData.stock || 0}</h2>
        </div>

        <div className="bg-green-50 rounded-xl p-5">
          <FaBoxes className="text-4xl text-green-600 mb-4" />

          <p className="text-gray-500">Warehouse</p>

          <h2 className="text-xl font-bold mt-2">
            {formData.warehouse || "--"}
          </h2>
        </div>

        <div className="bg-yellow-50 rounded-xl p-5">
          <FaBarcode className="text-4xl text-yellow-600 mb-4" />

          <p className="text-gray-500">SKU</p>

          <h2 className="text-xl font-bold mt-2">{formData.sku}</h2>
        </div>
      </div>

      {/* Live Preview */}

      <div className="mt-10 bg-gray-50 rounded-xl border p-6">
        <h3 className="text-xl font-bold mb-5">Inventory Preview</h3>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>SKU</span>

            <strong>{formData.sku}</strong>
          </div>

          <div className="flex justify-between">
            <span>Barcode</span>

            <strong>{formData.barcode || "--"}</strong>
          </div>

          <div className="flex justify-between">
            <span>Warehouse</span>

            <strong>{formData.warehouse || "--"}</strong>
          </div>

          <div className="flex justify-between">
            <span>Available Stock</span>

            <strong>{formData.stock || 0}</strong>
          </div>

          <div className="flex justify-between">
            <span>Status</span>

            <strong>{formData.stockStatus || "--"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
