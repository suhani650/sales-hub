import { useMemo, useState } from "react";
import {
  HiOutlineEye,
  HiOutlineMagnifyingGlass,
  HiOutlineUserCircle,
  HiOutlineInbox,
} from "react-icons/hi2";

import { useGetCustomersQuery } from "../../../services/vendorApi";
import CustomerProfileDrawer from "./CustomerProfileDrawer";

const PAGE_SIZE = 10;

export default function CustomerList() {
  const {
    data: customers = [],
    isLoading,
    isError,
    refetch,
  } = useGetCustomersQuery();

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleViewCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
    setDrawerOpen(true);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return customers;

    const term = search.trim().toLowerCase();

    return customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term),
    );
  }, [customers, search]);

  const visible = filtered.slice(0, visibleCount);

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const statusStyles = {
    Active: "bg-emerald-500/20 text-emerald-400",
    VIP: "bg-purple-500/20 text-purple-400",
    Inactive: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,.35)]">
      {/* Header */}

      <div className="p-6 border-b border-white/10 flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h2 className="text-2xl font-bold text-white">Customer Directory</h2>

          <p className="text-slate-400 mt-2">
            View and manage all marketplace customers.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-4 text-slate-500 text-lg" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search customer..."
            className="
            w-full
            bg-[#111827]
            border
            border-slate-700
            rounded-xl
            pl-11
            pr-4
            py-3
            text-white
            placeholder:text-slate-500
            focus:outline-none
            focus:border-cyan-500
            transition
            "
          />
        </div>
      </div>

      {/* Table */}

      {isLoading ? (
        <div className="p-16 text-center text-slate-400">
          Loading customers…
        </div>
      ) : isError ? (
        <div className="p-16 flex flex-col items-center gap-4 text-center">
          <p className="text-red-400">Couldn't load customers.</p>
          <button
            onClick={refetch}
            className="px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            Retry
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 flex flex-col items-center gap-4 text-center">
          <HiOutlineInbox className="text-4xl text-slate-600" />
          <p className="text-slate-400">No customers found.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#111827]">
                <tr className="text-slate-400 text-sm">
                  <th className="text-left px-6 py-4">Customer</th>

                  <th className="text-left px-6 py-4">Orders</th>

                  <th className="text-left px-6 py-4">Spent</th>

                  <th className="text-left px-6 py-4">Status</th>

                  <th className="text-center px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visible.map((customer) => (
                  <tr
                    key={customer.id}
                    className="
                    border-t
                    border-white/10
                    hover:bg-white/5
                    transition
                    "
                  >
                    {/* Customer */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                          <HiOutlineUserCircle className="text-white text-3xl" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">
                            {customer.name}
                          </h3>

                          <p className="text-slate-400 text-sm">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Orders */}

                    <td className="px-6 py-5">
                      <span className="text-white font-semibold">
                        {customer.orders}
                      </span>
                    </td>

                    {/* Spent */}

                    <td className="px-6 py-5">
                      <span className="font-bold text-emerald-400">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-semibold ${
                          statusStyles[customer.status] ||
                          "bg-slate-500/20 text-slate-300"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          title="View customer"
                          onClick={() => handleViewCustomer(customer.id)}
                          className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
                        >
                          <HiOutlineEye className="mx-auto text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}

          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 p-6 border-t border-white/10">
            <p className="text-slate-400">
              Showing 1 - {visible.length} of {filtered.length} customers
            </p>

            {visibleCount < filtered.length && (
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition"
              >
                Load More
              </button>
            )}
          </div>
        </>
      )}

      <CustomerProfileDrawer
        open={drawerOpen}
        customerId={selectedCustomerId}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
