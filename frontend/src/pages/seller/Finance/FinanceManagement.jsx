import { useState } from "react";

import FinanceDashboard from "./FinanceDashboard";
import RevenueAnalytics from "../../../components/seller/Finance/RevenueAnalytics";
import TransactionsTable from "../../../components/seller/Finance/TransactionsTable";
import PayoutManagement from "../../../components/seller/Finance/PayoutManagement";
import BankAccounts from "../../../components/seller/Finance/BankAccounts";
import RefundManagement from "../../../components/seller/Finance/RefundManagement";
import TaxReports from "../../../components/seller/Finance/TaxReports";
import ProfitAnalytics from "../../../components/seller/Finance/ProfitAnalytics";

import {
  FaMoneyBillWave,
  FaChartLine,
  FaCreditCard,
  FaWallet,
  FaUniversity,
  FaUndo,
  FaFileInvoiceDollar,
  FaPercentage,
} from "react-icons/fa";

export default function FinanceManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FaMoneyBillWave />,
    },

    {
      id: "revenue",
      label: "Revenue",
      icon: <FaChartLine />,
    },

    {
      id: "transactions",
      label: "Transactions",
      icon: <FaCreditCard />,
    },

    {
      id: "payouts",
      label: "Payouts",
      icon: <FaWallet />,
    },

    {
      id: "banks",
      label: "Banking",
      icon: <FaUniversity />,
    },

    {
      id: "refunds",
      label: "Refunds",
      icon: <FaUndo />,
    },

    {
      id: "tax",
      label: "Tax & GST",
      icon: <FaFileInvoiceDollar />,
    },

    {
      id: "profit",
      label: "Profit",
      icon: <FaPercentage />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Finance & Accounting</h1>

        <p className="text-gray-500 mt-2">
          Revenue, Settlements, Banking, Taxes & Profit Intelligence
        </p>
      </div>

      {/* Tabs */}

      <div className="bg-white border rounded-2xl p-3">
        <div className="flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
              flex items-center gap-2
              px-5 py-3 rounded-xl
              whitespace-nowrap
              transition-all

              ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}

      {activeTab === "overview" && <FinanceDashboard />}

      {activeTab === "revenue" && <RevenueAnalytics />}

      {activeTab === "transactions" && (
        <TransactionsTable onView={(transaction) => console.log(transaction)} />
      )}

      {activeTab === "payouts" && <PayoutManagement />}

      {activeTab === "banks" && <BankAccounts />}

      {activeTab === "refunds" && (
        <RefundManagement
          onView={(refund) => console.log("View", refund)}
          onApprove={(refund) => console.log("Approve", refund)}
          onReject={(refund) => console.log("Reject", refund)}
        />
      )}

      {activeTab === "tax" && <TaxReports />}

      {activeTab === "profit" && <ProfitAnalytics />}
    </div>
  );
}
