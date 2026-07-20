import { useState } from "react";
import {
  FaWarehouse,
  FaBoxes,
  FaMapMarkedAlt,
  FaTruck,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaEdit,
  FaPlus,
  FaTimes,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";

import {
  useGetWarehousesQuery,
  useGetWarehouseAnalyticsQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} from "../../../services/vendorApi";

const STATUS_STYLE = {
  ACTIVE: "bg-green-500/10 text-green-400 border border-green-500/20",
  LOW_STOCK: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  INACTIVE: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
};

const EMPTY_FORM = {
  name: "",
  location: "",
  stockUnits: 0,
  pendingDispatch: 0,
  completedOrders: 0,
  status: "ACTIVE",
};

export default function WarehouseManagement() {
  const {
    data: warehouses = [],
    isLoading,
    isError,
    refetch,
  } = useGetWarehousesQuery();
  const { data: analytics } = useGetWarehouseAnalyticsQuery();

  const [createWarehouse, { isLoading: creating }] =
    useCreateWarehouseMutation();
  const [updateWarehouse, { isLoading: updating }] =
    useUpdateWarehouseMutation();
  const [deleteWarehouse, { isLoading: deleting }] =
    useDeleteWarehouseMutation();

  const [modalMode, setModalMode] = useState(null); // "add" | "edit" | "view" | null
  const [activeWarehouse, setActiveWarehouse] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError("");
    setModalMode("add");
  }

  function openEdit(warehouse) {
    setActiveWarehouse(warehouse);
    setForm({
      name: warehouse.name,
      location: warehouse.location,
      stockUnits: warehouse.stockUnits,
      pendingDispatch: warehouse.pendingDispatch,
      completedOrders: warehouse.completedOrders,
      status: warehouse.status,
    });
    setFormError("");
    setModalMode("edit");
  }

  function openView(warehouse) {
    setActiveWarehouse(warehouse);
    setModalMode("view");
  }

  function closeModal() {
    setModalMode(null);
    setActiveWarehouse(null);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.location.trim()) {
      setFormError("Name and location are required.");
      return;
    }

    try {
      if (modalMode === "edit" && activeWarehouse) {
        await updateWarehouse({ id: activeWarehouse.id, ...form }).unwrap();
      } else {
        await createWarehouse(form).unwrap();
      }
      closeModal();
    } catch {
      setFormError("Couldn't save warehouse. Please try again.");
    }
  }

  async function handleDelete(warehouse) {
    if (!window.confirm(`Delete ${warehouse.name}? This can't be undone.`))
      return;
    try {
      await deleteWarehouse(warehouse.id).unwrap();
    } catch {
      alert("Couldn't delete warehouse.");
    }
  }

  return (
    <div className="space-y-8 text-white">
      {/* HERO SECTION */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-[#0B1023] via-[#111936] to-[#1A1F4B] p-8 lg:p-10 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d440,transparent_40%)]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold border border-cyan-500/20">
              Inventory & Logistics
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-5">
              Warehouse Management
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl">
              Manage warehouses, stock locations, inventory movement, dispatch
              centers and logistics operations.
            </p>
          </div>

          <div className="bg-[#0B1023] border border-cyan-500/20 rounded-3xl p-6 min-w-[280px]">
            <h3 className="text-slate-400 mb-3">Total Warehouses</h3>
            <div className="text-4xl font-bold text-cyan-400">
              {analytics
                ? String(analytics.totalWarehouses).padStart(2, "0")
                : "…"}
            </div>
            <p className="text-slate-400 mt-2">Active Distribution Centers</p>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<FaWarehouse className="text-cyan-400 text-3xl mb-4" />}
          label="Warehouses"
          value={analytics ? analytics.totalWarehouses : "…"}
          hoverBorder="hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
        />
        <StatCard
          icon={<FaBoxes className="text-green-400 text-3xl mb-4" />}
          label="Total Stock"
          value={analytics ? analytics.stockUnits.toLocaleString("en-IN") : "…"}
          hoverBorder="hover:border-green-500/40 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]"
        />
        <StatCard
          icon={<FaTruck className="text-orange-400 text-3xl mb-4" />}
          label="Pending Dispatch"
          value={
            analytics ? analytics.pendingDispatch.toLocaleString("en-IN") : "…"
          }
          hoverBorder="hover:border-orange-500/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]"
        />
        <StatCard
          icon={<FaCheckCircle className="text-purple-400 text-3xl mb-4" />}
          label="Completed Orders"
          value={
            analytics ? analytics.completedOrders.toLocaleString("en-IN") : "…"
          }
          hoverBorder="hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]"
        />
      </div>

      {/* WAREHOUSE LIST */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Warehouse Locations</h2>

          <button
            onClick={openAdd}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus />
            Add Warehouse
          </button>
        </div>

        {isLoading && (
          <div className="p-10 text-center text-slate-400">
            Loading warehouses…
          </div>
        )}

        {!isLoading && isError && (
          <div className="p-10 text-center space-y-3">
            <p className="text-red-400">Couldn't load warehouses.</p>
            <button
              onClick={refetch}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && warehouses.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            No warehouses yet. Add your first distribution center.
          </div>
        )}

        <div className="divide-y divide-white/10">
          {!isLoading &&
            !isError &&
            warehouses.map((warehouse) => (
              <div
                key={warehouse.id}
                className="group p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-all duration-500 hover:bg-cyan-500/5 hover:pl-8"
              >
                <div>
                  <h3 className="text-xl font-semibold transition-all duration-300 group-hover:text-cyan-400">
                    {warehouse.name}
                  </h3>

                  <p className="text-slate-400 flex items-center gap-2 mt-2">
                    <FaMapMarkedAlt />
                    {warehouse.location}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <div>
                    <p className="text-slate-400 text-sm">Stock Units</p>
                    <h4 className="font-bold text-lg">
                      {warehouse.stockUnits.toLocaleString("en-IN")}
                    </h4>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">Orders</p>
                    <h4 className="font-bold text-lg">
                      {warehouse.completedOrders.toLocaleString("en-IN")}
                    </h4>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      STATUS_STYLE[warehouse.status] || STATUS_STYLE.INACTIVE
                    }`}
                  >
                    {warehouse.status === "ACTIVE" ? (
                      <FaCheckCircle className="inline mr-2" />
                    ) : (
                      <FaExclamationTriangle className="inline mr-2" />
                    )}
                    {warehouse.status.replace("_", " ")}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openView(warehouse)}
                      className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <FaEye />
                      View
                    </button>

                    <button
                      onClick={() => openEdit(warehouse)}
                      className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(warehouse)}
                      disabled={deleting}
                      className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}

      {(modalMode === "add" || modalMode === "edit") && (
        <Modal
          onClose={closeModal}
          title={modalMode === "edit" ? "Edit Warehouse" : "Add Warehouse"}
        >
          <div className="space-y-4">
            <Field label="Warehouse Name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Delhi Warehouse"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </Field>

            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. New Delhi"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Stock Units">
                <input
                  type="number"
                  min="0"
                  value={form.stockUnits}
                  onChange={(e) =>
                    setForm({ ...form, stockUnits: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />
              </Field>

              <Field label="Pending Dispatch">
                <input
                  type="number"
                  min="0"
                  value={form.pendingDispatch}
                  onChange={(e) =>
                    setForm({ ...form, pendingDispatch: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Completed Orders">
                <input
                  type="number"
                  min="0"
                  value={form.completedOrders}
                  onChange={(e) =>
                    setForm({ ...form, completedOrders: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="LOW_STOCK">Low Stock</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </Field>
            </div>

            {formError && <p className="text-red-400 text-sm">{formError}</p>}

            <button
              onClick={handleSave}
              disabled={creating || updating}
              className="w-full mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {(creating || updating) && <FaSpinner className="animate-spin" />}
              {modalMode === "edit" ? "Save Changes" : "Create Warehouse"}
            </button>
          </div>
        </Modal>
      )}

      {/* VIEW MODAL */}

      {modalMode === "view" && activeWarehouse && (
        <Modal onClose={closeModal} title={activeWarehouse.name}>
          <div className="space-y-4 text-slate-300">
            <p className="flex items-center gap-2">
              <FaMapMarkedAlt className="text-cyan-400" />{" "}
              {activeWarehouse.location}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ViewStat
                label="Stock Units"
                value={activeWarehouse.stockUnits}
              />
              <ViewStat
                label="Pending Dispatch"
                value={activeWarehouse.pendingDispatch}
              />
              <ViewStat
                label="Completed Orders"
                value={activeWarehouse.completedOrders}
              />
              <ViewStat
                label="Status"
                value={activeWarehouse.status.replace("_", " ")}
              />
            </div>
            <p className="text-xs text-slate-500 pt-2">
              Added{" "}
              {new Date(activeWarehouse.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, hoverBorder }) {
  return (
    <div
      className={`group rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 transition-all duration-500 hover:-translate-y-2 ${hoverBorder}`}
    >
      {icon}
      <h4 className="text-slate-400">{label}</h4>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
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
