import { useEffect } from "react";
import {
  FaWarehouse,
  FaBarcode,
  FaBoxes,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function ProductInventory({ product, setProduct }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Auto Generate SKU

  useEffect(() => {
    if (!product.sku && product.name) {
      const random = Math.floor(Math.random() * 100000);

      const sku =
        product.name.replace(/\s+/g, "").substring(0, 5).toUpperCase() + random;

      setProduct((prev) => ({
        ...prev,
        sku,
      }));
    }
  }, [product.name]);

  const stock = Number(product.stock || 0);
  const minStock = Number(product.minimumStock || 0);

  const status =
    stock === 0 ? "Out Of Stock" : stock <= minStock ? "Low Stock" : "In Stock";

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">Inventory Management</h2>

        <p className="text-gray-500 mt-2">
          Manage stock, SKU and warehouse information.
        </p>
      </div>

      {/* Inventory Form */}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">SKU</label>

          <div className="relative mt-2">
            <FaBarcode className="absolute left-4 top-4 text-gray-400" />

            <input
              name="sku"
              value={product.sku || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
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
          <label className="font-semibold">Barcode</label>

          <div className="relative mt-2">
            <FaBarcode className="absolute left-4 top-4 text-gray-400" />

            <input
              name="barcode"
              value={product.barcode || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
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
          <label className="font-semibold">Stock Quantity</label>

          <div className="relative mt-2">
            <FaBoxes className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              name="stock"
              value={product.stock || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
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
          <label className="font-semibold">Minimum Stock Alert</label>

          <div className="relative mt-2">
            <FaExclamationTriangle className="absolute left-4 top-4 text-yellow-500" />

            <input
              type="number"
              name="minimumStock"
              value={product.minimumStock || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
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
          <label className="font-semibold">Warehouse</label>

          <div className="relative mt-2">
            <FaWarehouse className="absolute left-4 top-4 text-gray-400" />

            <input
              name="warehouse"
              value={product.warehouse || ""}
              onChange={handleChange}
              placeholder="Main Warehouse"
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
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
          <label className="font-semibold">Stock Status</label>

          <select
            name="stockStatus"
            value={product.stockStatus || ""}
            onChange={handleChange}
            className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
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
            <option value="">Select Status</option>

            <option value="IN_STOCK">In Stock</option>

            <option value="OUT_OF_STOCK">Out Of Stock</option>

            <option value="PREORDER">Pre Order</option>
          </select>
        </div>
      </div>

      {/* Inventory Toggle */}

      <div className="flex items-center justify-between border rounded-xl p-5">
        <div>
          <h3 className="font-semibold">Track Inventory</h3>

          <p className="text-gray-500 text-sm">
            Automatically deduct stock after orders.
          </p>
        </div>

        <input
          type="checkbox"
          name="trackInventory"
          checked={product.trackInventory || false}
          onChange={handleChange}
          className="w-6 h-6"
        />
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6">
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
          <p className="text-white">Current Stock</p>

          <h2 className="text-4xl font-bold mt-2 text-blue-700">{stock}</h2>
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
  placeholder:text-white
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
          <p className="text-white">Minimum Stock</p>

          <h2 className="text-4xl font-bold mt-2 text-yellow-700">
            {minStock}
          </h2>
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
  placeholder:text-white
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
          <p className="text-white">Inventory Status</p>

          <h2 className="text-3xl font-bold mt-2">{status}</h2>
        </div>
      </div>
    </div>
  );
}
