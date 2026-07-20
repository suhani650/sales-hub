import { useMemo, useState } from "react";
import {
  FaSearch,
  FaDownload,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  GlassCard,
  PrimaryButton,
  SearchInput,
  StatusBadge,
  downloadCsv,
  formatCurrency,
  formatDate,
} from "./financeUi";

const PAGE_SIZE = 8;

export default function TransactionsTable({
  transactions = [],
  onView,
  isLoading,
  accent = "indigo",
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) =>
      [t.id, t.orderId, t.customer, t.method]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q)),
    );
  }, [transactions, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === pageData.length) {
      setSelected([]);
    } else {
      setSelected(pageData.map((item) => item.id));
    }
  };

  const handleExport = () => {
    const rows = (
      selected.length
        ? filtered.filter((t) => selected.includes(t.id))
        : filtered
    ).map((t) => ({
      TransactionID: t.id,
      Type: t.type,
      Order: t.orderId,
      Customer: t.customer,
      Amount: t.amount,
      Method: t.method,
      Status: t.status,
      Date: formatDate(t.date),
    }));
    downloadCsv(`transactions-${Date.now()}.csv`, rows);
  };

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Transactions Ledger</h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <SearchInput
              accent={accent}
              type="text"
              placeholder="Search ID, order, customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <PrimaryButton accent={accent} onClick={handleExport}>
            <FaDownload />
            Export {selected.length ? `(${selected.length})` : ""}
          </PrimaryButton>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-white/5 text-left text-sm text-white/60">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={
                    pageData.length > 0 && selected.length === pageData.length
                  }
                  onChange={toggleAll}
                  className="accent-indigo-500"
                />
              </th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {isLoading && (
              <tr>
                <td colSpan={10} className="p-8 text-center text-white/50">
                  Loading transactions...
                </td>
              </tr>
            )}

            {!isLoading && pageData.length === 0 && (
              <tr>
                <td colSpan={10} className="p-8 text-center text-white/50">
                  No transactions found.
                </td>
              </tr>
            )}

            {!isLoading &&
              pageData.map((txn) => (
                <tr key={txn.id} className="transition hover:bg-white/5">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(txn.id)}
                      onChange={() => toggleSelect(txn.id)}
                      className="accent-indigo-500"
                    />
                  </td>
                  <td className="p-4 font-semibold">{txn.id}</td>
                  <td className="p-4">
                    <StatusBadge status={txn.type} />
                  </td>
                  <td className="p-4 text-white/70">{txn.orderId}</td>
                  <td className="p-4 text-white/70">{txn.customer}</td>
                  <td className="p-4 font-bold">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="p-4 text-white/70">{txn.method}</td>
                  <td className="p-4">
                    <StatusBadge status={txn.status} />
                  </td>
                  <td className="p-4 text-white/70">{formatDate(txn.date)}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onView?.(txn)}
                      className="rounded-lg bg-indigo-500/15 p-2 text-indigo-300 transition hover:bg-indigo-500/25"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/50">
          Showing {pageData.length ? (page - 1) * PAGE_SIZE + 1 : 0}-
          {(page - 1) * PAGE_SIZE + pageData.length} of {filtered.length}{" "}
          transactions
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:bg-white/10 disabled:opacity-30"
          >
            <FaChevronLeft />
          </button>

          <span className="px-2 text-sm text-white/70">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:bg-white/10 disabled:opacity-30"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
