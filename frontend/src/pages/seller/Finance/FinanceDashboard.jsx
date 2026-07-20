import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaWallet,
  FaCreditCard,
  FaUniversity,
  FaUndo,
  FaChartLine,
  FaFileInvoiceDollar,
  FaDownload,
  FaReceipt,
  FaSyncAlt,
} from "react-icons/fa";

import {
  useGetFinanceAnalyticsQuery,
  useGetTransactionsQuery,
  useGetPayoutsQuery,
  useGetSellerProfileQuery,
} from "../../../services/vendorApi";

import PayoutManagement from "../../../components/seller/Finance/PayoutManagement";
import BankAccounts from "../../../components/seller/Finance/BankAccounts";
import RefundManagement from "../../../components/seller/Finance/RefundManagement";
import TaxReports from "../../../components/seller/Finance/TaxReports";
import ProfitAnalytics from "../../../components/seller/Finance/ProfitAnalytics";
import TransactionsTable from "../../../components/seller/Finance/TransactionsTable";
import RevenueAnalytics from "../../../components/seller/Finance/RevenueAnalytics";
import {
  SummaryRow,
  downloadCsv,
  formatCurrency,
} from "../../../components/seller/Finance/financeUi";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "analytics", label: "Analytics" },
  { id: "payouts", label: "Payouts" },
  { id: "refunds", label: "Refunds" },
];

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isFetching: analyticsFetching,
    refetch: refetchAnalytics,
  } = useGetFinanceAnalyticsQuery();

  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
  } = useGetTransactionsQuery();

  const {
    data: payouts = [],
    isLoading: payoutsLoading,
    refetch: refetchPayouts,
  } = useGetPayoutsQuery();

  const { data: profile } = useGetSellerProfileQuery();

  const a = analytics || {};
  const isLoading = analyticsLoading || transactionsLoading || payoutsLoading;

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(a.revenue),
      icon: FaMoneyBillWave,
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Net Profit",
      value: formatCurrency(a.netProfit),
      icon: FaChartLine,
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Pending Payouts",
      value: formatCurrency(a.pendingPayout),
      icon: FaWallet,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Refund Amount",
      value: formatCurrency(a.refunds),
      icon: FaUndo,
      color: "from-red-500 to-rose-600",
    },
    {
      title: "GST Liability",
      value: formatCurrency(a.gstLiability),
      icon: FaFileInvoiceDollar,
      color: "from-purple-500 to-fuchsia-600",
    },
    {
      title: "Transactions",
      value: (a.transactionCount ?? transactions.length ?? 0).toLocaleString(),
      icon: FaCreditCard,
      color: "from-cyan-500 to-sky-500",
    },
    {
      title: "Bank Account",
      value: a.bankVerified
        ? "Verified"
        : profile?.bankName
          ? "Pending"
          : "Not Set",
      icon: FaUniversity,
      color: "from-teal-500 to-emerald-600",
    },
    {
      title: "GST Number",
      value: a.gstNumber || profile?.gstNumber || "Not Filed",
      icon: FaFileInvoiceDollar,
      color: "from-pink-500 to-purple-600",
    },
  ];

  const handleRefresh = () => {
    refetchAnalytics();
    refetchTransactions();
    refetchPayouts();
  };

  const handleExportAll = () => {
    downloadCsv(`finance-summary-${Date.now()}.csv`, [
      { Metric: "Gross Revenue", Value: a.revenue || 0 },
      { Metric: "Platform Fees", Value: a.platformFees || 0 },
      { Metric: "Refunds", Value: a.refunds || 0 },
      { Metric: "Net Profit", Value: a.netProfit || 0 },
      { Metric: "Payouts Completed", Value: a.payouts || 0 },
      { Metric: "Pending Payout", Value: a.pendingPayout || 0 },
      { Metric: "GST Liability", Value: a.gstLiability || 0 },
      {
        Metric: "Total Transactions",
        Value: a.transactionCount || transactions.length || 0,
      },
    ]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-pink-600/30 blur-[180px]" />
        <div className="absolute right-0 top-20 h-[480px] w-[480px] rounded-full bg-indigo-600/30 blur-[180px]" />
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-cyan-600/20 blur-[180px]" />
      </div>

      <div className="relative z-10 space-y-6 p-4 lg:p-6">
        {/* ================= Header ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-pink-500/20 px-5 py-2 text-sm text-pink-300">
              <FaReceipt />
              {profile?.storeName || "Financial Overview"}
            </div>

            <h1 className="mt-5 text-3xl font-black md:text-4xl">
              Finance Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-white/60">
              {analyticsFetching
                ? "Syncing latest numbers from your store..."
                : "Live revenue, payouts, taxes & financial analytics."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 self-start lg:self-auto">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white/80 transition hover:bg-white/10"
            >
              <FaSyncAlt className={analyticsFetching ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={handleExportAll}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 font-bold shadow-lg shadow-pink-500/20 transition hover:brightness-110"
            >
              <FaDownload />
              Export Reports
            </button>
          </div>
        </motion.div>

        {/* ================= Tabs ================= */}
        <div className="flex flex-wrap gap-3 rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= Overview Tab ================= */}
        {activeTab === "overview" && (
          <>
            <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
                      >
                        <Icon size={22} />
                      </div>
                    </div>

                    <p className="mt-6 text-white/60">{item.title}</p>
                    <h2 className="mt-1 text-2xl font-black">
                      {isLoading ? "…" : item.value}
                    </h2>
                  </motion.div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <h3 className="text-xl font-bold">Revenue Summary</h3>
                <div className="mt-5 space-y-4">
                  <SummaryRow
                    label="Gross Revenue"
                    value={formatCurrency(a.revenue)}
                  />
                  <SummaryRow
                    label="Platform Fees"
                    value={formatCurrency(a.platformFees)}
                  />
                  <SummaryRow
                    label="Refunds"
                    value={formatCurrency(a.refunds)}
                  />
                  <SummaryRow
                    label="Net Profit"
                    value={formatCurrency(a.netProfit)}
                    highlight
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <h3 className="text-xl font-bold">Payout Overview</h3>
                <div className="mt-5 space-y-4">
                  <SummaryRow
                    label="Completed Payouts"
                    value={formatCurrency(a.payouts)}
                  />
                  <SummaryRow
                    label="Pending Settlement"
                    value={formatCurrency(a.pendingPayout)}
                  />
                  <SummaryRow
                    label="Settlement Bank"
                    value={profile?.bankName || "Not Set"}
                  />
                  <SummaryRow
                    label="Bank Status"
                    value={a.bankVerified ? "Verified" : "Pending"}
                    highlight={a.bankVerified}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <FinanceModule
                title="Transactions"
                description="View all seller transactions, payments and settlements."
                color="from-indigo-500 to-blue-600"
                onOpen={() => setActiveTab("transactions")}
              />
              <FinanceModule
                title="Payout Management"
                description="Track payout schedules and settlement history."
                color="from-emerald-500 to-teal-600"
                onOpen={() => setActiveTab("payouts")}
              />
              <FinanceModule
                title="Tax & GST Reports"
                description="Download GST reports and tax summaries."
                color="from-purple-500 to-fuchsia-600"
                onOpen={() => setActiveTab("payouts")}
              />
            </div>
          </>
        )}

        {/* ================= Transactions Tab ================= */}
        {activeTab === "transactions" && (
          <TransactionsTable
            transactions={transactions}
            isLoading={transactionsLoading}
            accent="indigo"
            onView={(transaction) =>
              console.log("View Transaction", transaction)
            }
          />
        )}

        {/* ================= Analytics Tab ================= */}
        {activeTab === "analytics" && (
          <RevenueAnalytics
            revenue={a.revenue}
            netProfit={a.netProfit}
            transactionCount={a.transactionCount ?? transactions.length}
            topProduct={transactions[0]?.orderId ? "Top Seller" : "—"}
          />
        )}

        {/* ================= Payouts Tab ================= */}
        {activeTab === "payouts" && (
          <div className="space-y-6">
            <ProfitAnalytics
              revenue={a.revenue}
              netProfit={a.netProfit}
              platformFees={a.platformFees}
            />
            <TaxReports
              gstNumber={a.gstNumber || profile?.gstNumber}
              gstLiability={a.gstLiability}
              commissionPct={a.commissionPct ?? profile?.commissionPct}
            />
            <BankAccounts
              bankName={profile?.bankName}
              accountHolder={profile?.accountHolder}
              accountNumber={profile?.accountNumber}
              ifscCode={profile?.ifscCode}
              kycStatus={profile?.kycStatus}
            />
            <PayoutManagement
              payouts={payouts}
              isLoading={payoutsLoading}
              bankName={profile?.bankName}
            />
          </div>
        )}

        {/* ================= Refunds Tab ================= */}
        {activeTab === "refunds" && (
          <RefundManagement
            onView={(refund) => console.log("View", refund)}
            onApprove={(refund) => console.log("Approve", refund)}
            onReject={(refund) => console.log("Reject", refund)}
          />
        )}
      </div>
    </div>
  );
}

function FinanceModule({ title, description, color, onOpen }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${color} text-lg font-bold`}
      >
        {title.charAt(0)}
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-white/60">{description}</p>
      <button
        onClick={onOpen}
        className={`mt-6 rounded-xl bg-gradient-to-r ${color} px-5 py-2.5 font-semibold transition hover:brightness-110`}
      >
        Open Module
      </button>
    </motion.div>
  );
}
