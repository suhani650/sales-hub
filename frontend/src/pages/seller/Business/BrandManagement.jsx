import { useState } from "react";
import {
  FaTrademark,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaGlobe,
  FaTimes,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  useGetBrandsQuery,
  useGetBrandStatsQuery,
  useGetCatalogMetaQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from "../../../services/vendorApi";

const STATUS_STYLE = {
  APPROVED: "bg-green-500/10 text-green-400 border border-green-500/20",
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  REVIEW: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const EMPTY_FORM = { name: "", categoryId: "", website: "" };

export default function BrandManagement() {
  const [search, setSearch] = useState("");

  const {
    data: brandsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetBrandsQuery({ search: search || undefined, limit: 50 });

  const { data: stats } = useGetBrandStatsQuery();
  const { data: catalogMeta } = useGetCatalogMetaQuery();

  const [createBrand, { isLoading: creating }] = useCreateBrandMutation();
  const [updateBrand, { isLoading: updating }] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: deleting }] = useDeleteBrandMutation();

  const brands = brandsResponse?.data ?? [];
  const categories = catalogMeta?.categories ?? [];

  const [modalMode, setModalMode] = useState(null); // "add" | "edit" | "view" | null
  const [activeBrand, setActiveBrand] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError("");
    setModalMode("add");
  }

  function openEdit(brand) {
    setActiveBrand(brand);
    setForm({
      name: brand.name,
      categoryId: brand.categoryId ?? "",
      website: brand.website ?? "",
    });
    setFormError("");
    setModalMode("edit");
  }

  function openView(brand) {
    setActiveBrand(brand);
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setActiveBrand(null);
    setFormError("");
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setFormError("Brand name is required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      website: form.website.trim() || undefined,
    };

    try {
      if (modalMode === "edit" && activeBrand) {
        await updateBrand({ id: activeBrand.id, ...payload }).unwrap();
      } else {
        await createBrand(payload).unwrap();
      }
      closeModal();
    } catch (err) {
      setFormError(
        err?.data?.message || "Couldn't save brand. Please try again.",
      );
    }
  }

  async function handleDelete(brand) {
    if (!window.confirm(`Delete ${brand.name}? This can't be undone.`)) return;
    try {
      await deleteBrand(brand.id).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Couldn't delete brand.");
    }
  }

  return (
    <div className="space-y-8 text-white">
      {/* HERO SECTION */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#0B1023] via-[#111936] to-[#1A1F4B] p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7c3aed40,transparent_40%)]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold border border-cyan-500/20">
              Brand Management Center
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-5">
              Manage Your Brands
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl">
              Register, monitor and manage all your brand portfolios, product
              categories and brand approvals from one place.
            </p>
          </div>

          <div className="bg-[#0B1023] border border-cyan-500/20 rounded-3xl p-6 min-w-[280px]">
            <div className="flex items-center gap-3 mb-3">
              <FaTrademark className="text-cyan-400" />
              <h3 className="font-semibold">Brand Overview</h3>
            </div>

            <div className="text-4xl font-bold text-cyan-400">
              {stats ? stats.total : "…"}
            </div>

            <p className="text-slate-400 mt-2">Total Registered Brands</p>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<FaTrademark className="text-cyan-400 text-xl" />}
          iconBg="bg-cyan-500/20"
          hoverBorder="hover:border-cyan-500/40"
          label="Total Brands"
          value={stats ? stats.total : "…"}
        />

        <StatCard
          icon={<FaCheckCircle className="text-green-400 text-xl" />}
          iconBg="bg-green-500/20"
          hoverBorder="hover:border-green-500/40"
          label="Approved"
          value={stats ? stats.approved : "…"}
        />

        <StatCard
          icon={<FaClock className="text-yellow-400 text-xl" />}
          iconBg="bg-yellow-500/20"
          hoverBorder="hover:border-yellow-500/40"
          label="Pending"
          value={stats ? stats.pending : "…"}
        />

        <StatCard
          icon={<FaChartLine className="text-purple-400 text-xl" />}
          iconBg="bg-purple-500/20"
          hoverBorder="hover:border-purple-500/40"
          label="In Review"
          value={stats ? stats.review : "…"}
        />
      </div>

      {/* ACTION BAR */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative w-full lg:w-[400px]">
            <FaSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Brands..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/50 border border-white/10 outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={openAdd}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          >
            <FaPlus />
            Add New Brand
          </button>
        </div>
      </div>

      {/* BRANDS TABLE */}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Registered Brands</h2>
          {isFetching && !isLoading && (
            <FaSpinner className="animate-spin text-cyan-400" />
          )}
        </div>

        {isLoading && (
          <div className="p-10 text-center text-slate-400">Loading brands…</div>
        )}

        {!isLoading && isError && (
          <div className="p-10 text-center space-y-3">
            <p className="text-red-400">Couldn't load brands.</p>
            <button
              onClick={refetch}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && brands.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No brands found. Click "Add New Brand" to register one.
          </div>
        )}

        {!isLoading && !isError && brands.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="text-left p-5">Brand</th>
                  <th className="text-left p-5">Category</th>
                  <th className="text-left p-5">Products</th>
                  <th className="text-left p-5">Website</th>
                  <th className="text-left p-5">Status</th>
                  <th className="text-center p-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-300"
                  >
                    <td className="p-5 font-semibold">{brand.name}</td>

                    <td className="p-5 text-slate-300">{brand.category}</td>

                    <td className="p-5 text-slate-300">{brand.products}</td>

                    <td className="p-5">
                      {brand.website ? (
                        <a
                          href={
                            brand.website.startsWith("http")
                              ? brand.website
                              : `https://${brand.website}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                        >
                          <FaGlobe />
                          {brand.website}
                        </a>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>

                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[brand.status] || STATUS_STYLE.PENDING}`}
                      >
                        {brand.status}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openView(brand)}
                          className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center hover:scale-110 transition-all"
                        >
                          <FaEye className="text-cyan-400" />
                        </button>

                        <button
                          onClick={() => openEdit(brand)}
                          className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center hover:scale-110 transition-all"
                        >
                          <FaEdit className="text-yellow-400" />
                        </button>

                        <button
                          onClick={() => handleDelete(brand)}
                          disabled={deleting}
                          className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:scale-110 transition-all disabled:opacity-50"
                        >
                          <FaTrash className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}

      {(modalMode === "add" || modalMode === "edit") && (
        <Modal
          onClose={closeModal}
          title={modalMode === "edit" ? "Edit Brand" : "Add New Brand"}
        >
          <div className="space-y-4">
            <Field label="Brand Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Nexora"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </Field>

            <Field label="Category">
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Website">
              <input
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://www.example.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </Field>

            {modalMode === "add" && (
              <p className="text-xs text-slate-500 flex items-start gap-2">
                <FaExclamationTriangle className="mt-0.5 shrink-0 text-yellow-500" />
                New brands start as "Pending" until approved by the marketplace
                admin.
              </p>
            )}

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <button
              onClick={handleSave}
              disabled={creating || updating}
              className="w-full mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {(creating || updating) && <FaSpinner className="animate-spin" />}
              {modalMode === "edit" ? "Save Changes" : "Create Brand"}
            </button>
          </div>
        </Modal>
      )}

      {/* VIEW MODAL */}

      {modalMode === "view" && activeBrand && (
        <Modal onClose={closeModal} title={activeBrand.name}>
          <div className="space-y-4 text-slate-300">
            {activeBrand.website && (
              <p className="flex items-center gap-2">
                <FaGlobe className="text-cyan-400" /> {activeBrand.website}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <ViewStat label="Category" value={activeBrand.category} />
              <ViewStat label="Products" value={activeBrand.products} />
              <ViewStat label="Status" value={activeBrand.status} />
              {activeBrand.createdAt && (
                <ViewStat
                  label="Registered"
                  value={new Date(activeBrand.createdAt).toLocaleDateString(
                    "en-IN",
                  )}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, iconBg, hoverBorder, label, value }) {
  return (
    <div
      className={`group rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:-translate-y-1 transition-all duration-500 ${hoverBorder}`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400">{label}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}
        >
          {icon}
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
