"use client";

import { useState, useEffect } from "react";
import {
  FaWarehouse,
  FaBoxes,
  FaExclamationTriangle,
  FaChartLine,
  FaSyncAlt,
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

export default function InventoryManagement() {
  // State Management
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    minStock: "",
    maxStock: "",
    warehouse: "",
    category: "",
    price: "",
  });

  // Fetch inventory data from API
  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:5000/api/seller/inventory",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inventory data from backend");
      }

      const data = await response.json();
      setInventoryData(data.data);
    } catch (err) {
      setError(
        err.message || "Error fetching from backend. Make sure API is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Calculate statistics
  const stats = inventoryData
    ? {
        totalProducts:
          inventoryData.totalProducts || inventoryData.products?.length || 0,
        inStock:
          inventoryData.inStock ||
          inventoryData.products?.filter((p) => p.quantity > 0).length ||
          0,
        lowStock:
          inventoryData.lowStock ||
          inventoryData.products?.filter(
            (p) => p.quantity > 0 && p.quantity <= p.minStock,
          ).length ||
          0,
        outOfStock:
          inventoryData.outOfStock ||
          inventoryData.products?.filter((p) => p.quantity === 0).length ||
          0,
      }
    : { totalProducts: 0, inStock: 0, lowStock: 0, outOfStock: 0 };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open add modal
  const handleAddClick = () => {
    setModalType("add");
    setEditingId(null);
    setFormData({
      name: "",
      sku: "",
      quantity: "",
      minStock: "",
      maxStock: "",
      warehouse: "",
      category: "",
      price: "",
    });
    setShowModal(true);
  };

  // Open edit modal
  const handleEditClick = (product) => {
    setModalType("edit");
    setEditingId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      minStock: product.minStock,
      maxStock: product.maxStock,
      warehouse: product.warehouse,
      category: product.category,
      price: product.price,
    });
    setShowModal(true);
  };

  // Submit form
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const API = "http://localhost:5000/api/seller/inventory";

      const url = modalType === "add" ? API : `${API}/${editingId}`;
      const method = modalType === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,

          // Add authentication token if needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save inventory item");
      }

      // Refresh data after successful save
      await fetchInventoryData();
      setShowModal(false);
      alert(
        `Product ${modalType === "add" ? "added" : "updated"} successfully!`,
      );
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Delete product
  const handleDeleteClick = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/seller/inventory/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Refresh data after successful delete
      await fetchInventoryData();
      alert("Product deleted successfully!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Filter products
  const filteredProducts =
    inventoryData?.products?.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterStatus === "all") return matchesSearch;
      return matchesSearch && product.status === filterStatus;
    }) || [];

  // Export to CSV
  const handleExportCSV = () => {
    if (!filteredProducts.length) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Name",
      "SKU",
      "Quantity",
      "Min Stock",
      "Max Stock",
      "Warehouse",
      "Category",
      "Price",
      "Status",
    ];
    const rows = filteredProducts.map((p) => [
      p.name,
      p.sku,
      p.quantity,
      p.minStock,
      p.maxStock,
      p.warehouse,
      p.category,
      p.price,
      p.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaSyncAlt className="text-4xl text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Loading inventory data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[30px] border border-cyan-500/20 bg-gradient-to-r from-[#071028] via-[#0F172A] to-[#1E1B4B] p-8 shadow-[0_15px_50px_rgba(0,0,0,.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d440,transparent_45%)]"></div>

        <div className="relative flex items-center justify-between">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              Inventory Control
            </span>

            <h1 className="mt-5 text-5xl font-bold text-white">
              Inventory Management
            </h1>

            <p className="mt-4 max-w-3xl text-slate-300 leading-8">
              Track stock, monitor warehouses, receive low stock alerts and
              manage inventory across all products with real-time data.
            </p>
          </div>

          <div className="hidden xl:flex h-28 w-28 rounded-3xl bg-cyan-500/20 border border-cyan-500/30 items-center justify-center">
            <FaWarehouse className="text-5xl text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          <p>⚠️ {error}</p>
          <p className="text-sm mt-2">
            Please ensure your backend API is running on http://localhost:5000
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-6 lg:grid-cols-4">
        <StatCard
          icon={<FaBoxes className="text-4xl text-cyan-400" />}
          title="Total Products"
          value={stats.totalProducts}
          bgClass="from-[#111827] to-[#1E293B]"
          borderClass="border-cyan-500/20"
        />
        <StatCard
          icon={<FaChartLine className="text-4xl text-green-400" />}
          title="In Stock"
          value={stats.inStock}
          bgClass="from-[#111827] to-[#1E293B]"
          borderClass="border-green-500/20"
        />
        <StatCard
          icon={<FaExclamationTriangle className="text-4xl text-yellow-400" />}
          title="Low Stock"
          value={stats.lowStock}
          bgClass="from-[#111827] to-[#1E293B]"
          borderClass="border-yellow-500/20"
        />
        <StatCard
          icon={<FaSyncAlt className="text-4xl text-red-400" />}
          title="Out of Stock"
          value={stats.outOfStock}
          bgClass="from-[#111827] to-[#1E293B]"
          borderClass="border-red-500/20"
        />
      </div>

      {/* Main Panel */}
      <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Inventory Dashboard
            </h2>
            <p className="mt-2 text-slate-400">
              Manage warehouses, stock levels and inventory alerts.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white hover:scale-105 duration-300"
              title="Export current data to CSV"
            >
              <FaDownload />
              Export
            </button>
            <button
              onClick={handleAddClick}
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white hover:scale-105 duration-300"
              title="Add new inventory item"
            >
              <FaPlus />
              Add Inventory
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B1220] border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0B1220] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Product
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  SKU
                </th>
                <th className="px-4 py-3 text-center font-semibold text-slate-300">
                  Quantity
                </th>
                <th className="px-4 py-3 text-center font-semibold text-slate-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-300">
                  Warehouse
                </th>
                <th className="px-4 py-3 text-right font-semibold text-slate-300">
                  Price
                </th>
                <th className="px-4 py-3 text-center font-semibold text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-slate-700 hover:bg-slate-800/50 transition"
                  >
                    <td className="px-4 py-4 text-white font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-4 text-slate-400">{product.sku}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-white font-semibold">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-4 text-slate-400">
                      {product.warehouse}
                    </td>
                    <td className="px-4 py-4 text-right text-white font-semibold">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition"
                          title="Edit product"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition"
                          title="Delete product"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="mt-6 text-sm text-slate-400 text-center">
          Showing {filteredProducts.length} of{" "}
          {inventoryData?.products?.length || 0} products
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl border border-cyan-500/20 max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                {modalType === "add" ? "Add New Product" : "Edit Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <FormInput
                label="Product Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="SKU"
                name="sku"
                type="text"
                value={formData.sku}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="Min Stock"
                name="minStock"
                type="number"
                value={formData.minStock}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="Max Stock"
                name="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="Warehouse"
                name="warehouse"
                type="text"
                value={formData.warehouse}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="Category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleInputChange}
                required
              />

              <FormInput
                label="Price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />

              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg border border-slate-600 px-4 py-3 font-semibold text-white hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold text-white hover:scale-105 transition"
                >
                  {modalType === "add" ? "Add Product" : "Update Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, bgClass, borderClass }) {
  return (
    <div
      className={`rounded-3xl border ${borderClass} bg-gradient-to-br ${bgClass} p-6`}
    >
      {icon}
      <h3 className="mt-5 text-3xl font-bold text-white">{value}</h3>
      <p className="mt-2 text-slate-400">{title}</p>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const statusConfig = {
    in_stock: {
      bg: "bg-green-500/20",
      text: "text-green-300",
      label: "In Stock",
    },
    low_stock: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-300",
      label: "Low Stock",
    },
    out_of_stock: {
      bg: "bg-red-500/20",
      text: "text-red-300",
      label: "Out of Stock",
    },
  };

  const config = statusConfig[status] || statusConfig.in_stock;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}

// Form Input Component
function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  ...props
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-[#0B1220] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
        {...props}
      />
    </div>
  );
}
