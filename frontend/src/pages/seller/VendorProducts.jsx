import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaBoxOpen,
  FaStar,
  FaArrowDown,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../services/vendorApi";

export default function VendorProducts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const { data: responseData, isLoading, isError, refetch } = useGetProductsQuery({ limit: 100 });
  const [deleteProduct] = useDeleteProductMutation();

  const products = useMemo(() => responseData?.data || [], [responseData]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.sku && item.sku.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        category === "All" || 
        (item.category?.name && item.category.name.toLowerCase() === category.toLowerCase());

      const matchStatus =
        status === "All" ||
        (status === "Active" && item.status === "ACTIVE") ||
        (status === "Low Stock" && item.inventory?.quantity > 0 && item.inventory?.quantity <= 10) ||
        (status === "Out of Stock" && (!item.inventory?.quantity || item.inventory?.quantity === 0));

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, search, category, status]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (err) {
        alert(err.data?.message || "Failed to delete product.");
      }
    }
  };

  const categoriesList = useMemo(() => {
    const list = new Set();
    products.forEach((p) => {
      if (p.category?.name) list.add(p.category.name);
    });
    return Array.from(list);
  }, [products]);

  // KPI Calculations
  const stats = useMemo(() => {
    const totalCount = products.length;
    const activeCount = products.filter((p) => p.status === "ACTIVE").length;
    const lowStockCount = products.filter(
      (p) => p.inventory?.quantity > 0 && p.inventory?.quantity <= 10
    ).length;
    const outOfStockCount = products.filter(
      (p) => !p.inventory?.quantity || p.inventory?.quantity === 0
    ).length;

    return {
      total: totalCount,
      active: activeCount,
      lowStock: lowStockCount,
      outOfStock: outOfStockCount,
    };
  }, [products]);

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[180px]" />
        <div className="absolute top-20 right-0 w-[450px] h-[450px] rounded-full bg-pink-600/20 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-cyan-500/20 blur-[180px]" />
      </div>

      <div className="relative z-10 p-8 space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <div>
              <span className="inline-flex items-center gap-3 rounded-full bg-indigo-500/20 px-5 py-2 text-indigo-300">
                <FaBoxOpen />
                Products Management
              </span>
              <h1 className="mt-6 text-5xl font-black">Manage Products</h1>
              <p className="mt-5 max-w-2xl text-white/70">
                Create, edit, delete and monitor every product from one enterprise dashboard.
              </p>
            </div>
            <button
              onClick={() => navigate("/seller/products/add")}
              className="h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 font-bold flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <FaPlus />
              Add Product
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">
          {[
            {
              title: "Total Products",
              value: stats.total,
              icon: <FaBoxOpen />,
              color: "from-indigo-500 to-purple-600",
            },
            {
              title: "Active Products",
              value: stats.active,
              icon: <FaCheckCircle />,
              color: "from-pink-500 to-red-500",
            },
            {
              title: "Low Stock Items",
              value: stats.lowStock,
              icon: <FaExclamationTriangle />,
              color: "from-cyan-500 to-blue-500",
            },
            {
              title: "Out Of Stock",
              value: stats.outOfStock,
              icon: <FaArrowDown />,
              color: "from-yellow-500 to-orange-500",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl`}>
                {card.icon}
              </div>
              <h3 className="mt-7 text-white/60">{card.title}</h3>
              <h2 className="mt-2 text-4xl font-black">{card.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
        >
          <div className="flex flex-col xl:flex-row gap-5">
            <div className="relative flex-1">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name or SKU..."
                className="w-full rounded-2xl border border-white/10 bg-[#0B1225] py-4 pl-14 pr-5 outline-none focus:border-indigo-500 text-white"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#0B1225] px-5 py-4 outline-none text-white cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-white/10 bg-[#0B1225] px-5 py-4 outline-none text-white cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </motion.div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-white/60">Loading products...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 border border-red-500/20 rounded-3xl bg-red-500/5">
            <p className="text-red-400 font-bold text-lg">Failed to load products from server.</p>
            <button onClick={refetch} className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:scale-105 transition-all cursor-pointer">
              Retry
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="text-center py-20 border border-white/10 rounded-3xl bg-white/5">
            <p className="text-white/60 text-lg">No products found matching filters.</p>
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length > 0 && (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-7">
            {filteredProducts.map((item) => {
              const stockQty = item.inventory?.quantity || 0;
              const productStatus = stockQty === 0 ? "Out of Stock" : stockQty <= 10 ? "Low Stock" : "Active";
              const primaryImage = item.images?.[0]?.url 
                ? (item.images[0].url.startsWith("http") ? item.images[0].url : `http://localhost:5000${item.images[0].url}`)
                : "https://via.placeholder.com/300?text=No+Image";

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="relative">
                      <img
                        src={primaryImage}
                        alt={item.name}
                        className="h-64 w-full object-cover"
                      />
                      <span
                        className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold ${
                          productStatus === "Active"
                            ? "bg-emerald-500 text-white"
                            : productStatus === "Low Stock"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {productStatus}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-xl font-bold line-clamp-1">{item.name}</h2>
                        <span className="text-xs text-white/50 shrink-0">{item.sku}</span>
                      </div>
                      <p className="mt-2 text-white/60 text-sm">{item.category?.name || "Uncategorized"}</p>
                      
                      <div className="mt-5 flex items-center gap-2 text-yellow-400">
                        <FaStar />
                        <span className="text-white text-sm">{item.ratingAvg || "—"}</span>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs text-white/50">Price</p>
                          <h3 className="mt-2 text-lg font-bold">₹{parseFloat(item.price).toLocaleString("en-IN")}</h3>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs text-white/50">Stock</p>
                          <h3 className="mt-2 text-lg font-bold">{stockQty}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/seller/products/${item.id}`)}
                        className="flex-1 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 py-3 hover:bg-indigo-600/40 flex items-center justify-center gap-2 text-sm font-semibold transition cursor-pointer"
                      >
                        <FaEye />
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/seller/products/edit/${item.id}`)}
                        className="flex-1 rounded-2xl bg-amber-500/20 border border-amber-500/30 py-3 hover:bg-amber-500/40 flex items-center justify-center gap-2 text-sm font-semibold transition cursor-pointer"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 rounded-2xl bg-red-600/20 border border-red-500/30 py-3 hover:bg-red-600/40 flex items-center justify-center gap-2 text-sm font-semibold transition cursor-pointer"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Inventory Summary info boxes */}
        <div className="grid xl:grid-cols-3 gap-6 mt-12">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8">
            <FaCheckCircle className="text-4xl" />
            <h2 className="mt-6 text-3xl font-black">Healthy Stock</h2>
            <p className="mt-4 text-white/80">
              {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}%` : "0%"} of products are sufficiently stocked.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-600 p-8">
            <FaExclamationTriangle className="text-4xl" />
            <h2 className="mt-6 text-3xl font-black">Low Stock Alert</h2>
            <p className="mt-4 text-white/80">
              {stats.lowStock} products require restocking attention.
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-pink-600 to-red-700 p-8">
            <FaArrowDown className="text-4xl" />
            <h2 className="mt-6 text-3xl font-black">Out of Stock</h2>
            <p className="mt-4 text-white/80">
              {stats.outOfStock} items are currently unavailable for checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}