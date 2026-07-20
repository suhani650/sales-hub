import { useMemo, useState } from "react";
import {
  FaUniversity,
  FaMoneyBillWave,
  FaDownload,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import {
  GlassCard,
  PrimaryButton,
  SearchInput,
  StatCard,
  StatusBadge,
  SummaryRow,
  downloadCsv,
  formatCurrency,
  formatDate,
} from "./financeUi";

const ACCENT = "emerald";

export default function PayoutManagement({
  payouts = [],
  isLoading,
  bankName,
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return payouts;
    return payouts.filter((p) =>
      [p.id, p.bank, p.status]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q)),
    );
  }, [payouts, search]);

  const completed = payouts.filter((p) => p.status === "COMPLETED");
  const upcoming = payouts.filter((p) => p.status === "UPCOMING");
  const failed = payouts.filter((p) => p.status === "FAILED");

  const completedTotal = completed.reduce((sum, p) => sum + p.amount, 0);
  const upcomingTotal = upcoming.reduce((sum, p) => sum + p.amount, 0);

  const handleExport = () => {
    downloadCsv(
      `payouts-${Date.now()}.csv`,
      filtered.map((p) => ({
        PayoutID: p.id,
        Amount: p.amount,
        Bank: p.bank,
        Date: formatDate(p.date),
        Status: p.status,
      })),
    );
  };

  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payout Management</h2>
          <p className="mt-2 text-white/60">
            Settlements, bank transfers & payout analytics
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
          title="Upcoming Payouts"
          value={formatCurrency(upcomingTotal)}
          icon={<FaMoneyBillWave />}
        />
        <StatCard
          accent={ACCENT}
          title="Completed"
          value={formatCurrency(completedTotal)}
          icon={<FaCheckCircle />}
        />
        <StatCard
          accent={ACCENT}
          title="Failed"
          value={failed.length}
          icon={<FaTimesCircle />}
        />
        <StatCard
          accent={ACCENT}
          title="Settlement Bank"
          value={bankName || "Not Set"}
          icon={<FaUniversity />}
        />
      </div>

      <GlassCard className="p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <SearchInput
            accent={ACCENT}
            type="text"
            placeholder="Search payout ID, bank, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 text-left text-sm text-white/60">
            <tr>
              <th className="p-4">Payout ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Bank</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/50">
                  Loading payouts...
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/50">
                  No payouts yet.
                </td>
              </tr>
            )}
            {!isLoading &&
              filtered.map((payout) => (
                <tr key={payout.id} className="transition hover:bg-white/5">
                  <td className="p-4 font-semibold">{payout.id}</td>
                  <td className="p-4 font-bold">
                    {formatCurrency(payout.amount)}
                  </td>
                  <td className="p-4 text-white/70">{payout.bank}</td>
                  <td className="p-4 text-white/70">
                    {formatDate(payout.date)}
                  </td>
                  <td className="p-4">
                    <StatusBadge
                      status={payout.status}
                      icon={
                        payout.status === "COMPLETED" ? (
                          <FaCheckCircle />
                        ) : payout.status === "FAILED" ? (
                          <FaTimesCircle />
                        ) : (
                          <FaClock />
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-4 text-xl font-bold">Settlement Schedule</h3>
        <div className="space-y-4">
          <SummaryRow
            label="Next Settlement"
            value={formatDate(upcoming[0]?.date) || "-"}
          />
          <SummaryRow label="Settlement Cycle" value="Every 7 Days" />
          <SummaryRow
            label="Bank Verification"
            value={bankName ? "Verified" : "Pending"}
            highlight={Boolean(bankName)}
          />
          <SummaryRow label="Transfer Method" value="NEFT / IMPS" />
        </div>
      </GlassCard>
    </div>
  );
}
