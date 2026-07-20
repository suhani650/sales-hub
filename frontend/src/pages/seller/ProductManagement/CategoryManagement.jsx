import { useState } from "react";
import {
  FaLayerGroup,
  FaPlusCircle,
  FaTags,
  FaChartBar,
  FaEdit,
  FaTrash,
  FaEye,
  FaTimes,
  FaSpinner,
  FaSearch,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";

import {
  useGetCategoriesQuery,
  useGetCategoryStatsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../services/vendorApi";

import ConfirmDialog from "../../../components/seller/Common/ConfirmDialog";
import Toast from "../../../components/seller/Common/Toast";

const EMPTY_FORM = { name: "", parentId: "", isActive: true };

export default function CategoryManagement() {
  const [search, setSearch] = useState("");

  const {
    data: categoriesResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetCategoriesQuery({ search: search || undefined });

  const { data: stats } = useGetCategoryStatsQuery();

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const categories = categoriesResponse?.data ?? [];

  const [modalMode, setModalMode] = useState(null); // "add" | "edit" | "view" | null
  const [activeCategory, setActiveCategory] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  // Delete flow: a category with products/subcategories is *blocked* from
  // deletion (data integrity) — that's shown as an informational dialog,
  // separate from the destructive "are you sure?" confirm for a category
  // that's actually deletable. Kept distinct from product-delete, which
  // lives on the Product Dashboard page with its own dialog + toast.
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError("");
    setModalMode("add");
  }

  function openEdit(category) {
    setActiveCategory(category);
    setForm({
      name: category.name,
      parentId: category.parentId ?? "",
      isActive: category.isActive,
    });
    setFormError("");
    setModalMode("edit");
  }

  function openView(category) {
    setActiveCategory(category);
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setActiveCategory(null);
    setFormError("");
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      parentId: form.parentId ? Number(form.parentId) : null,
      isActive: form.isActive,
    };

    try {
      if (modalMode === "edit" && activeCategory) {
        await updateCategory({ id: activeCategory.id, ...payload }).unwrap();
      } else {
        await createCategory(payload).unwrap();
      }
      closeModal();
    } catch (err) {
      setFormError(
        err?.data?.message || "Couldn't save category. Please try again.",
      );
    }
  }

  function handleDeleteClick(category) {
    // Category already tells us its product/subcategory counts — check
    // client-side first so a blocked category shows a clear "why" dialog
    // instead of firing the request and surfacing a raw 409.
    const reasons = [];
    if (category.products > 0) {
      reasons.push(
        `${category.products} product${category.products === 1 ? "" : "s"} still linked to this category.`,
      );
    }
    if (category.subcategories > 0) {
      reasons.push(
        `${category.subcategories} subcategor${category.subcategories === 1 ? "y" : "ies"} nested under it.`,
      );
    }

    setDeleteTarget({ category, blocked: reasons.length > 0, reasons });
  }

  function closeDeleteDialog() {
    setDeleteTarget(null);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget.category.id).unwrap();
      setDeleteTarget(null);
      setToast({
        type: "success",
        message: `"${deleteTarget.category.name}" was deleted successfully.`,
      });
    } catch (err) {
      setDeleteTarget(null);
      setToast({
        type: "error",
        message: err?.data?.message || "Couldn't delete category.",
      });
    }
  }

  // A category can't be its own parent — filter it out of the dropdown when editing.
  const parentOptions = categories.filter(
    (c) =>
      !(modalMode === "edit" && activeCategory && c.id === activeCategory.id),
  );

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#1E293B] p-8 shadow-[0_20px_50px_rgba(0,0,0,.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.12),transparent_45%)]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-cyan-400">
              <FaLayerGroup />
              Category Management
            </div>

            <h1 className="mt-5 text-4xl font-bold text-white">
              Product Categories
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400 leading-7">
              Create, organize and manage all marketplace product categories
              with enterprise level controls.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-white hover:scale-105 duration-300"
          >
            <FaPlusCircle />
            Add Category
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          icon={<FaLayerGroup />}
          iconBg="bg-cyan-500/20"
          iconColor="text-cyan-400"
          label="Total Categories"
          value={stats ? stats.total : "…"}
        />

        <StatCard
          icon={<FaTags />}
          iconBg="bg-green-500/20"
          iconColor="text-green-400"
          label="Active"
          value={stats ? stats.active : "…"}
        />

        <StatCard
          icon={<FaChartBar />}
          iconBg="bg-purple-500/20"
          iconColor="text-purple-400"
          label="Products"
          value={stats ? stats.products : "…"}
        />
      </div>

      {/* Content */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#1E293B] to-[#0F172A] p-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">Categories</h2>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/60 border border-white/10 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={openAdd}
              className="shrink-0 rounded-xl bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-500"
            >
              + New Category
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="mt-10 text-center text-slate-400 py-16">
            Loading categories…
          </div>
        )}

        {!isLoading && isError && (
          <div className="mt-10 text-center py-16 space-y-3">
            <p className="text-red-400">Couldn't load categories.</p>
            <button
              onClick={refetch}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-cyan-500/30 bg-[#0F172A] py-24 text-center">
            <FaLayerGroup className="mx-auto text-6xl text-cyan-400" />

            <h3 className="mt-6 text-2xl font-bold text-white">
              No Categories Found
            </h3>

            <p className="mt-3 text-slate-400">
              Start by creating your first product category.
            </p>
          </div>
        )}

        {!isLoading && !isError && categories.length > 0 && (
          <div className="mt-8 space-y-3">
            {isFetching && (
              <div className="flex justify-end">
                <FaSpinner className="animate-spin text-cyan-400" />
              </div>
            )}

            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                    <FaLayerGroup />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{category.name}</p>
                    <p className="text-sm text-slate-400">
                      {category.parentName
                        ? `Under ${category.parentName}`
                        : "Top-level category"}{" "}
                      • {category.products} products • {category.subcategories}{" "}
                      subcategories
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      category.isActive
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                    }`}
                  >
                    {category.isActive ? <FaCheckCircle /> : <FaBan />}
                    {category.isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => openView(category)}
                    className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center hover:scale-110 transition-all"
                  >
                    <FaEye className="text-cyan-400" />
                  </button>

                  <button
                    onClick={() => openEdit(category)}
                    className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center hover:scale-110 transition-all"
                  >
                    <FaEdit className="text-yellow-400" />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(category)}
                    disabled={deleting}
                    className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:scale-110 transition-all disabled:opacity-50"
                  >
                    <FaTrash className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}

      {(modalMode === "add" || modalMode === "edit") && (
        <Modal
          onClose={closeModal}
          title={modalMode === "edit" ? "Edit Category" : "Add Category"}
        >
          <div className="space-y-4">
            <Field label="Category Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Electronics"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </Field>

            <Field label="Parent Category (optional)">
              <select
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Top-level category</option>
                {parentOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <label className="flex items-center gap-3 text-slate-300">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="w-4 h-4 accent-cyan-500"
              />
              Active (visible in the marketplace)
            </label>

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <button
              onClick={handleSave}
              disabled={creating || updating}
              className="w-full mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {(creating || updating) && <FaSpinner className="animate-spin" />}
              {modalMode === "edit" ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </Modal>
      )}

      {/* VIEW MODAL */}

      {modalMode === "view" && activeCategory && (
        <Modal onClose={closeModal} title={activeCategory.name}>
          <div className="space-y-4 text-slate-300">
            <p className="text-sm text-slate-400">/{activeCategory.slug}</p>

            <div className="grid grid-cols-2 gap-4">
              <ViewStat
                label="Parent"
                value={activeCategory.parentName || "Top-level"}
              />
              <ViewStat
                label="Status"
                value={activeCategory.isActive ? "Active" : "Inactive"}
              />
              <ViewStat label="Products" value={activeCategory.products} />
              <ViewStat
                label="Subcategories"
                value={activeCategory.subcategories}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* DELETE CONFIRM / BLOCKED DIALOG */}

      <ConfirmDialog
        open={!!deleteTarget}
        tone={deleteTarget?.blocked ? "blocked" : "danger"}
        title={
          deleteTarget?.blocked
            ? `Can't delete "${deleteTarget?.category?.name}"`
            : `Delete "${deleteTarget?.category?.name}"?`
        }
        message={
          deleteTarget?.blocked
            ? "This category is still in use, so it can't be removed yet."
            : "This will permanently delete this category. This action can't be undone."
        }
        reasons={deleteTarget?.reasons || []}
        confirmLabel="Delete Category"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />

      {/* TOAST */}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

function StatCard({ icon, iconBg, iconColor, label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#1E293B] p-6">
      <div className="flex items-center gap-4">
        <div className={`rounded-2xl ${iconBg} p-4 text-2xl ${iconColor}`}>
          {icon}
        </div>

        <div>
          <p className="text-slate-400">{label}</p>
          <h2 className="text-3xl font-bold text-white">{value}</h2>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm text-slate-400 mb-2">{label}</label>
      {children}
    </div>
  );
}

function ViewStat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-900/60 border border-white/10 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-white mt-1">{value}</p>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-[28px] border border-cyan-500/20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xl"
            >
              <FaTimes />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
