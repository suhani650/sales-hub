import { useState } from "react";
import {
  FaFileExport,
  FaCalendarAlt,
  FaDownload,
  FaSearch,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import {
  GlassCard,
  PrimaryButton,
  GhostButton,
  SearchInput,
  StatCard,
  StatusBadge,
  SummaryRow,
  downloadCsv,
  formatCurrency,
  formatDate,
} from "./financeUi";

const ACCENT = "purple";

export default function TaxReports({
  gstNumber,
  gstLiability,
  commissionPct,
  reports = [],
  isLoading,
}) {
  const [period, setPeriod] = useState("MONTHLY");
  const [search, setSearch] = useState("");

  const filtered = reports.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.period.toLowerCase().includes(search.toLowerCase()),
  );

  const totalGst = reports.reduce((sum, r) => sum + r.gstCollected, 0);
  const totalTds = reports.reduce((sum, r) => sum + r.tdsDeducted, 0);
  const totalLiability = reports.reduce((sum, r) => sum + r.liability, 0);
  const filedCount = reports.filter((r) => r.status === "FILED").length;

  const handleExport = () => {
    downloadCsv(
      `gst-reports-${Date.now()}.csv`,
      filtered.map((r) => ({
        ReportID: r.id,
        Period: r.period,
        GSTCollected: r.gstCollected,
        TDSDeducted: r.tdsDeducted,
        Liability: r.liability,
        Status: r.status,
        FilingDate: formatDate(r.filingDate),
      })),
    );
  };

  return (
    <div className="space-y-6">
      <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tax & GST Reports</h2>
          <p className="mt-2 text-white/60">
            GST, TDS, tax liability & filing analytics
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <GhostButton onClick={handleExport}>
            <FaFileExport />
            Excel
          </GhostButton>
          <PrimaryButton accent={ACCENT} onClick={handleExport}>
            <FaDownload />
            Export Report
          </PrimaryButton>
        </div>
      </GlassCard>

      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
        <StatCard
          accent={ACCENT}
          title="GST Collected"
          value={formatCurrency(totalGst)}
          icon="₹"
        />
        <StatCard
          accent={ACCENT}
          title="TDS Deducted"
          value={formatCurrency(totalTds)}
          icon="₹"
        />
        <StatCard
          accent={ACCENT}
          title="Tax Liability"
          value={formatCurrency(totalLiability)}
          icon="₹"
        />
        <StatCard
          accent={ACCENT}
          title="Filed Reports"
          value={filedCount}
          icon="✓"
        />
      </div>

      <GlassCard className="p-5">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <SearchInput
              accent={ACCENT}
              type="text"
              placeholder="Search report or period..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 [&>option]:bg-[#0B1225]"
          >
            <option value="MONTHLY">Monthly</option>
            <option value="QUARTERLY">Quarterly</option>
            <option value="YEARLY">Yearly</option>
          </select>

          <GhostButton
            className="justify-center"
            onClick={() => alert(`Filtering by: ${period}`)}
          >
            <FaCalendarAlt />
            Date Range
          </GhostButton>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5 text-left text-sm text-white/60">
            <tr>
              <th className="p-4">Report ID</th>
              <th className="p-4">Period</th>
              <th className="p-4">GST</th>
              <th className="p-4">TDS</th>
              <th className="p-4">Liability</th>
              <th className="p-4">Status</th>
              <th className="p-4">Filing Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-white/50">
                  Loading tax reports…
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-white/50">
                  No tax reports found.
                </td>
              </tr>
            )}
            {!isLoading &&
              filtered.map((report) => (
                <tr key={report.id} className="transition hover:bg-white/5">
                  <td className="p-4 font-semibold">{report.id}</td>
                  <td className="p-4 text-white/70">{report.period}</td>
                  <td className="p-4 text-white/70">
                    {formatCurrency(report.gstCollected)}
                  </td>
                  <td className="p-4 text-white/70">
                    {formatCurrency(report.tdsDeducted)}
                  </td>
                  <td className="p-4 font-semibold">
                    {formatCurrency(report.liability)}
                  </td>
                  <td className="p-4">
                    <StatusBadge
                      status={report.status}
                      icon={
                        report.status === "FILED" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaClock />
                        )
                      }
                    />
                  </td>
                  <td className="p-4 text-white/70">
                    {formatDate(report.filingDate)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="mb-5 text-xl font-bold">GST Filing Summary</h3>
        <div className="space-y-4">
          <SummaryRow label="GSTIN" value={gstNumber || "Not Configured"} />
          <SummaryRow
            label="Commission Rate"
            value={`${commissionPct ?? 0}%`}
          />
          <SummaryRow label="Filing Frequency" value="Monthly" />
          <SummaryRow
            label="Last Filing"
            value={formatDate(
              reports.find((r) => r.status === "FILED")?.filingDate,
            )}
          />
          <SummaryRow
            label="Compliance Status"
            value={gstNumber ? "Compliant" : "Action Required"}
            highlight={Boolean(gstNumber)}
          />
        </div>
      </GlassCard>
    </div>
  );
}
