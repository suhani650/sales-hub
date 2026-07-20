import { FaDownload, FaSearch, FaRobot } from "react-icons/fa";

import CustomerProfiles from "../../../components/seller/Customers/CustomerProfiles";
import PurchaseHistory from "../../../components/seller/Customers/PurchaseHistory";
import CustomerSegmants from "../../../components/seller/Customers/CustomerSegments";
import WishlistAnalytics from "../../../components/seller/Customers/WishlistAnalytics";
import LoyaltyRewards from "../../../components/seller/Customers/LoyaltyRewards";
import CustomerAnalytics from "../../../components/seller/Customers/CustomerAnalytics";
import CustomerSupportHistory from "../../../components/seller/Customers/CustomerSupportHistory";
import MarketingEngagement from "../../../components/seller/Customers/MarketingEngagement";
import NotificationHistory from "../../../components/seller/Customers/NotificationHistory";

export default function CustomerCRM() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Customer CRM Center</h1>

            <p className="text-gray-500 mt-2">
              Customer Intelligence, Engagement & Relationship Management
            </p>
          </div>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl">
            <FaDownload />
            Export CRM Report
          </button>
        </div>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-2xl p-5">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search customers..."
              className="w-full border rounded-xl pl-10 pr-4 py-3"
            />
          </div>

          <select className="border rounded-xl p-3">
            <option>All Segments</option>
            <option>VIP</option>
            <option>Gold</option>
            <option>Silver</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>All Channels</option>
            <option>Email</option>
            <option>SMS</option>
            <option>Push</option>
          </select>
        </div>
      </div>

      {/* CRM KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <KpiCard title="Total Customers" value="18,420" />

        <KpiCard title="VIP Customers" value="920" />

        <KpiCard title="Retention Rate" value="84%" />

        <KpiCard title="Customer Revenue" value="₹8.4Cr" />
      </div>

      {/* AI Insights */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h2 className="font-bold text-2xl">AI Customer Insights</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <InsightCard title="High Value Customers" value="1,240" />

          <InsightCard title="Potential Churn" value="420" />

          <InsightCard title="Upsell Opportunity" value="₹24.8L" />
        </div>
      </div>

      {/* CRM Modules */}

      <CustomerProfiles />

      <PurchaseHistory />

      <CustomerSegmentation />

      <WishlistAnalytics />

      <LoyaltyRewards />

      <CustomerAnalytics />

      <CustomerSupportHistory />

      <MarketingEngagement />

      <NotificationHistory />
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <p className="text-gray-500">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function InsightCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5">
      <h4 className="font-semibold">{title}</h4>

      <p className="text-3xl font-bold text-blue-600 mt-3">{value}</p>
    </div>
  );
}
