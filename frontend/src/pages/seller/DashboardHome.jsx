import StatCard from "../../components/seller/Common/StatCard";
import ApprovalStatus from "../../components/seller/Dashboard/ApprovalStatus";
import SalesChart from "../../components/seller/Charts/SalesChart";
import RevenueChart from "../../components/seller/Charts/RevenueChart";
import InventorySummary from "../../components/seller/Dashboard/InventorySummary";
import QuickActions from "../../components/seller/Dashboard/QuickActions";
import RecentOrders from "../../components/seller/Dashboard/RecentOrders";
import TopProducts from "../../components/seller/Dashboard/TopProducts";
import RecentReviews from "../../components/seller/Dashboard/RecentReviews";
import NotificationsWidget from "../../components/seller/Dashboard/NotificationsWidget";
import ActivityTimeline from "../../components/seller/Dashboard/ActivityTimeline";
import SalesTarget from "../../components/seller/Dashboard/SalesTarget";
import PerformanceCard from "../../components/seller/Dashboard/PerformanceCard";
export default function DashboardHome() {
  const stats = [
    {
      title: "Total Products",
      value: "250",
      color: "bg-blue-500",
    },
    {
      title: "Active Products",
      value: "220",
      color: "bg-green-500",
    },
    {
      title: "Pending Orders",
      value: "45",
      color: "bg-yellow-500",
    },
    {
      title: "Revenue",
      value: "₹8,50,000",
      color: "bg-purple-500",
    },
    {
      title: "Customers",
      value: "1540",
      color: "bg-pink-500",
    },
    {
      title: "Commission",
      value: "₹85,000",
      color: "bg-red-500",
    },
    {
      title: "Wallet",
      value: "₹7,65,000",
      color: "bg-indigo-500",
    },
    {
      title: "Reviews",
      value: "485",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}

      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

          <p className="text-gray-500 mt-2">ABC Electronics Pvt Ltd</p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
          + Add Product
        </button>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            color={item.color}
          />
        ))}
      </div>

      {/* Quick Actions */}

      <QuickActions />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SalesChart />

        <RevenueChart />
      </div>

      {/* Products & Orders */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RecentOrders />
          <ActivityTimeline />
        </div>

        <div className="space-y-6">
          <TopProducts />

          <InventorySummary />
          <ApprovalStatus />
          <RecentReviews />
          <NotificationsWidget />
          <SalesTarget />
          <PerformanceCard />
        </div>
      </div>
    </div>
  );
}
