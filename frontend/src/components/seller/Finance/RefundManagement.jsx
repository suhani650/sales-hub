import { useMemo, useState } from "react";
import {
  FaSearch,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";
import {
  DetailModal,
  GlassCard,
  PrimaryButton,
  SearchInput,
  StatCard,
  StatusBadge,
  downloadCsv,
  formatCurrency,
  formatDate,
} from "./financeUi";
import {
  useGetRefundsQuery,
  useUpdateRefundStatusMutation,
} from "../../../services/vendorApi";

const ACCENT = "orange";

export default function RefundManagement() {
  const { data: refunds = [], isLoading } = useGetRefundsQuery();
  const [updateRefundStatus, { isLoading: isUpdating }] =
    useUpdateRefundStatusMutation();

  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState(null);
  const [actingId, setActingId] = useState(null);

  const data = refunds;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (item) =>
        item.id.toLowerCase().includes(q) ||
        item.orderId.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q),
    );
  }, [data, search]);

  const pending = data.filter((r) => r.status === "PENDING").length;
  const approved = data.filter((r) => r.status === "APPROVED").length;
  const refundRate = data.length
    ? ((approved / data.length) * 100).toFixed(1)
    : "0.0";

  const updateStatus = async (refund, status) => {
    setActingId(refund.id);
    try {
      await updateRefundStatus({ id: refund.id, status }).unwrap();
    } catch (err) {
      console.error("Refund status update failed:", err);
    } finally {
      setActingId(null);
    }
  };

  const handleApprove = (refund) => updateStatus(refund, "APPROVED");
  const handleReject = (refund) => updateStatus(refund, "REJECTED");

  const handleExport = () => {
    downloadCsv(
      `refunds-${Date.now()}.csv`,
      filtered.map((r) => ({
        RefundID: r.id,
        Order: r.orderId,
        Customer: r.customer,
        Amount: r.amount,
        Reason: r.reason,
        Status: r.status,
        Date: formatDate(r.date),
      })),
    );
  };

  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Refund Management</h2>
          <p className="mt-2 text-white/60">
            Refund requests & processing center
          </p>
        </div>
        <PrimaryButton accent={ACCENT} onClick={handleExport}>
          <FaDownload />
          Export
        </PrimaryButton>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
        <StatCard
          accent={ACCENT}
          title="Total Refunds"
          value={data.length}
          icon={<FaClock />}
        />
        <StatCard
          accent={ACCENT}
          title="Pending"
          value={pending}
          icon={<FaClock />}
        />
        <StatCard
          accent={ACCENT}
          title="Approved"
          value={approved}
          icon={<FaCheckCircle />}
        />
        <StatCard
          accent={ACCENT}
          title="Refund Rate"
          value={`${refundRate}%`}
          icon={<FaTimesCircle />}
        />
      </div>

      <GlassCard className="p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <SearchInput
            accent={ACCENT}
            type="text"
            placeholder="Search refund or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 text-left text-sm text-white/60">
            <tr>
              <th className="p-4">Refund ID</th>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-white/50">
                  Loading refunds…
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-white/50">
                  No refunds found.
                </td>
              </tr>
            )}
            {!isLoading &&
              filtered.map((refund) => (
                <tr key={refund.id} className="transition hover:bg-white/5">
                  <td className="p-4 font-semibold">{refund.id}</td>
                  <td className="p-4 text-white/70">{refund.orderId}</td>
                  <td className="p-4 text-white/70">{refund.customer}</td>
                  <td className="p-4 font-bold">
                    {formatCurrency(refund.amount)}
                  </td>
                  <td className="p-4 text-white/70">{refund.reason}</td>
                  <td className="p-4">
                    <StatusBadge status={refund.status} />
                  </td>
                  <td className="p-4 text-white/70">
                    {formatDate(refund.date)}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setViewing(refund)}
                        className="rounded-lg bg-blue-500/15 p-2 text-blue-300 transition hover:bg-blue-500/25"
                        title="View"
                      >
                        <FaEye />
                      </button>

                      {refund.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleApprove(refund)}
                            disabled={isUpdating && actingId === refund.id}
                            className="rounded-lg bg-emerald-500/15 p-2 text-emerald-300 transition hover:bg-emerald-500/25 disabled:opacity-40"
                            title="Approve"
                          >
                            <FaCheckCircle />
                          </button>
                          <button
                            onClick={() => handleReject(refund)}
                            disabled={isUpdating && actingId === refund.id}
                            className="rounded-lg bg-red-500/15 p-2 text-red-300 transition hover:bg-red-500/25 disabled:opacity-40"
                            title="Reject"
                          >
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </GlassCard>

      <DetailModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title={viewing?.id}
        accent={ACCENT}
        rows={
          viewing
            ? [
                { label: "Order", value: viewing.orderId },
                { label: "Customer", value: viewing.customer },
                { label: "Amount", value: formatCurrency(viewing.amount) },
                { label: "Reason", value: viewing.reason },
                { label: "Status", value: viewing.status },
                { label: "Date", value: formatDate(viewing.date) },
              ]
            : []
        }
      />
    </div>
  );
}
