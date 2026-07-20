import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaStar,
  FaChartLine,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import {
  useGetProductsQuery,
  useGetVendorDashboardQuery,
  useGetActivitiesQuery,
  useDeleteProductMutation,
} from "../../../services/vendorApi";

import ConfirmDialog from "../../../components/seller/Common/ConfirmDialog";
import Toast from "../../../components/seller/Common/Toast";

const ProductDashboard = () => {
  const {
    data: productsResponse,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data: dashboard } = useGetVendorDashboardQuery();
  const { data: activityResponse } = useGetActivitiesQuery();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  // Product delete has its own themed confirm + toast, kept separate from
  // the category delete flow (Category Management page) since the two
  // entities have different delete rules and messaging.
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const products = productsResponse?.data || [];
  const activities = activityResponse?.data || [];

  const currencyFmt = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const stats = [
    {
      title: "Total Products",
      value: (productsResponse?.total ?? products.length).toLocaleString(),
      icon: <FaBoxOpen />,
      color: "from-cyan-500 to-blue-500",
    },

    {
      title: "Total Orders",
      value: (dashboard?.totalOrders ?? 0).toLocaleString(),
      icon: <FaShoppingCart />,
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "Customer Rating",
      value: dashboard?.avgRating
        ? Number(dashboard.avgRating).toFixed(1)
        : "—",
      icon: <FaStar />,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Revenue",
      value: dashboard?.totalRevenue
        ? currencyFmt.format(dashboard.totalRevenue)
        : "—",
      icon: <FaChartLine />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  function statusLabel(status) {
    if (status === "OUT_OF_STOCK") return "Low Stock";
    if (status === "ACTIVE") return "Active";
    return status ? status.charAt(0) + status.slice(1).toLowerCase() : "Draft";
  }

  function handleDeleteClick(product) {
    setDeleteTarget(product);
  }

  function closeDeleteDialog() {
    setDeleteTarget(null);
  }

  async function confirmDeleteProduct() {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      setToast({
        type: "success",
        message: `"${deleteTarget.name}" was deleted successfully.`,
      });
    } catch (err) {
      console.error("Failed to delete product:", err);
      setDeleteTarget(null);
      setToast({
        type: "error",
        message: err?.data?.message || "Couldn't delete product.",
      });
    }
  }

  return (
    <div className="space-y-8 text-white">
      {/* HERO SECTION */}

      <div
        className="
relative
overflow-hidden
rounded-[32px]
border
border-white/10
bg-gradient-to-r
from-[#0B1023]
via-[#111936]
to-[#1A1F4B]
p-8
"
      >
        <div
          className="
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,#06b6d440,transparent_40%)]
"
        ></div>

        <div
          className="
relative
z-10
flex
justify-between
items-center
flex-wrap
gap-6
"
        >
          <div>
            <span
              className="
px-4
py-2
rounded-full
bg-cyan-500/20
text-cyan-300
border
border-cyan-500/20
text-sm
font-semibold
"
            >
              Product Management
            </span>

            <h1
              className="
text-5xl
font-bold
mt-5
"
            >
              Product Dashboard
            </h1>

            <p
              className="
text-slate-400
mt-4
max-w-2xl
"
            >
              Manage products, images, inventory, pricing and sales performance.
            </p>
          </div>

          <Link
            to="/seller/products/add"
            className="
px-7
py-3
rounded-2xl
bg-gradient-to-r
from-cyan-500
to-blue-600
hover:scale-105
duration-300
flex
items-center
gap-3
shadow-[0_0_30px_rgba(34,211,238,0.4)]
"
          >
            <FaPlus />
            Add Product
          </Link>
        </div>
      </div>
      {/* STATS SECTION */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-lg`}
            >
              {item.icon}
            </div>

            <p className="text-slate-400 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* PRODUCT CARDS */}

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Latest Products</h2>

          <Link
            to="/seller/products/add"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 duration-300 flex items-center gap-3"
          >
            <FaPlus />
            New Product
          </Link>
        </div>

        {productsLoading && (
          <div className="text-slate-400 py-10 text-center">
            Loading products...
          </div>
        )}

        {productsError && !productsLoading && (
          <div className="text-red-400 py-10 text-center">
            Couldn't load products. Please try again.
          </div>
        )}

        {!productsLoading && !productsError && products.length === 0 && (
          <div className="text-slate-400 py-10 text-center">
            No products yet — add your first product to get started.
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const primaryImage =
              product.images?.find((img) => img.isPrimary)?.url ||
              product.images?.[0]?.url ||
              "https://placehold.co/400x400?text=No+Image";

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] hover:border-cyan-500/40 hover:-translate-y-2 duration-500 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]"
              >
                {/* PRODUCT IMAGE */}

                <div className="relative overflow-hidden h-60">
                  <img
                    src={primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 duration-500"
                  />

                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === "ACTIVE"
                        ? "bg-green-500/80 text-white"
                        : "bg-orange-500/80 text-white"
                    }`}
                  >
                    {statusLabel(product.status)}
                  </span>
                </div>

                {/* PRODUCT DETAILS */}

                <div className="p-5">
                  <h3 className="text-xl font-bold">{product.name}</h3>

                  <p className="text-slate-400 mt-1">
                    {product.category?.name}
                  </p>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <p className="text-slate-400 text-sm">Price</p>

                      <h4 className="text-2xl font-bold text-cyan-400">
                        {currencyFmt.format(product.price)}
                      </h4>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm">Stock</p>

                      <h4 className="font-bold">
                        {product.inventory?.quantity ?? 0}
                      </h4>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="flex justify-between mt-6">
                    <Link
                      to={`/seller/products/${product.id}`}
                      className="flex-1 mr-2 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEye />
                      View
                    </Link>

                    <Link
                      to={`/seller/products/${product.id}/edit`}
                      className="flex-1 ml-2 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500 hover:text-white duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEdit />
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* INVENTORY TABLE */}

      <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Product Inventory</h2>

          <a
            href="http://localhost:5000/api/seller/exports/products"
            className="px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 hover:text-white duration-300"
          >
            Export
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-4 px-6">Image</th>

                <th className="text-left py-4 px-6">Product</th>

                <th className="text-left py-4 px-6">Category</th>

                <th className="text-left py-4 px-6">Price</th>

                <th className="text-left py-4 px-6">Stock</th>

                <th className="text-left py-4 px-6">Status</th>

                <th className="text-center py-4 px-6">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => {
                const primaryImage =
                  item.images?.find((img) => img.isPrimary)?.url ||
                  item.images?.[0]?.url ||
                  "https://placehold.co/100x100?text=No+Image";

                return (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/5 duration-300"
                  >
                    <td className="px-6 py-5">
                      <img
                        src={primaryImage}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    </td>

                    <td className="px-6 font-semibold">{item.name}</td>

                    <td className="px-6 text-slate-400">
                      {item.category?.name}
                    </td>

                    <td className="px-6 text-cyan-400 font-bold">
                      {currencyFmt.format(item.price)}
                    </td>

                    <td className="px-6">{item.inventory?.quantity ?? 0}</td>

                    <td className="px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          item.status === "ACTIVE"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {statusLabel(item.status)}
                      </span>
                    </td>

                    <td className="px-6">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/seller/products/${item.id}`}
                          className="w-10 h-10 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 hover:text-white duration-300 flex items-center justify-center"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/seller/products/${item.id}/edit`}
                          className="w-10 h-10 rounded-xl bg-purple-500/10 hover:bg-purple-500 hover:text-white duration-300 flex items-center justify-center"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ANALYTICS */}

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl font-bold mb-5">Top Selling Products</h2>

          <div className="space-y-5">
            {[...products]
              .sort((a, b) => (b.ratingCount ?? 0) - (a.ratingCount ?? 0))
              .slice(0, 5)
              .map((item) => {
                const primaryImage =
                  item.images?.find((img) => img.isPrimary)?.url ||
                  item.images?.[0]?.url ||
                  "https://placehold.co/100x100?text=No+Image";

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={primaryImage}
                        className="w-16 h-16 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">{item.name}</h4>

                        <p className="text-slate-400 text-sm">
                          {item.category?.name}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-cyan-400 font-bold">
                      {currencyFmt.format(item.price)}
                    </h3>
                  </div>
                );
              })}

            {products.length === 0 && (
              <p className="text-slate-400 text-sm">No product activity yet.</p>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY */}

        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl font-bold mb-5">Recent Activities</h2>

          <div className="space-y-5">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <FaBoxOpen className="text-cyan-400" />
                </div>

                <div>
                  <h4 className="font-semibold">
                    {activity.description || activity.action}
                  </h4>

                  <p className="text-slate-400 text-sm">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <p className="text-slate-400 text-sm">No recent activity yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRM DIALOG */}

      <ConfirmDialog
        open={!!deleteTarget}
        tone="danger"
        title={`Delete "${deleteTarget?.name}"?`}
        message="This will permanently remove this product from your catalog and the marketplace. This action can't be undone."
        confirmLabel="Delete Product"
        loading={deleting}
        onConfirm={confirmDeleteProduct}
        onCancel={closeDeleteDialog}
      />

      {/* TOAST */}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default ProductDashboard;
