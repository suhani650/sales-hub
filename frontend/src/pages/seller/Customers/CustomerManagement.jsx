import { useState } from "react";

import CustomerFilters from "../../../components/seller/Customers/CustomerFilters";
import CustomersTable from "../../../components/seller/Customers/CustomersTable";
import CustomerProfileDrawer from "../../../components/seller/Customers/CustomerProfileDrawer";
import CustomerAnalytics from "../../../components/seller/Customers/CustomerAnalytics";

import {
  FaUsers,
  FaCrown,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";

export default function CustomerManagement() {
  const [activeTab, setActiveTab] = useState("customers");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    email: "",
    mobile: "",
    segment: "",
    ltv: "",
    orders: "",
    loyalty: "",
    date: "",
  });

  // RTK Query Replace Later
  const customers = [
    {
      id: "CUS-1001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      vip: true,
      lifetimeValue: 125000,
      orders: 18,
      wishlist: 12,
      loyalty: "GOLD",
      joined: "12 Jan 2025",
    },

    {
      id: "CUS-1002",
      name: "Priya Singh",
      email: "priya@gmail.com",
      phone: "+91 9876500000",
      vip: false,
      lifetimeValue: 28500,
      orders: 6,
      wishlist: 4,
      loyalty: "SILVER",
      joined: "08 Mar 2025",
    },
  ];

  const stats = [
    {
      title: "Customers",
      value: "12,845",
      icon: <FaUsers />,
      color: "bg-blue-500",
    },

    {
      title: "VIP Customers",
      value: "1,245",
      icon: <FaCrown />,
      color: "bg-yellow-500",
    },

    {
      title: "Lifetime Revenue",
      value: "₹4.8 Cr",
      icon: <FaMoneyBillWave />,
      color: "bg-green-500",
    },

    {
      title: "Orders",
      value: "28,541",
      icon: <FaShoppingCart />,
      color: "bg-purple-500",
    },
  ];

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const handleEditCustomer = (customer) => {
    console.log("Edit Customer", customer);
  };

  const handleCampaign = (customer) => {
    console.log("Send Campaign", customer);
  };

  const handleExport = () => {
    console.log("Export Customers");
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      email: "",
      mobile: "",
      segment: "",
      ltv: "",
      orders: "",
      loyalty: "",
      date: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Customer CRM</h1>

        <p className="text-gray-500 mt-2">
          Customer Management, Loyalty & Analytics Platform
        </p>
      </div>

      {/* Tabs */}

      <div className="bg-white border rounded-2xl p-2 flex gap-2">
        <button
          onClick={() => setActiveTab("customers")}
          className={`px-5 py-3 rounded-xl ${
            activeTab === "customers" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Customers
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-5 py-3 rounded-xl ${
            activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Customers */}

      {activeTab === "customers" && (
        <>
          {/* KPI Cards */}

          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
            {stats.map((item) => (
              <div key={item.title} className="bg-white border rounded-2xl p-6">
                <div
                  className={`
                    w-14 h-14
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-white
                    text-xl
                    ${item.color}
                  `}
                >
                  {item.icon}
                </div>

                <p className="text-gray-500 mt-4">{item.title}</p>

                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>
            ))}
          </div>

          {/* Filters */}

          <CustomerFilters
            filters={filters}
            setFilters={setFilters}
            onExport={handleExport}
            onReset={resetFilters}
          />

          {/* Table */}

          <CustomersTable
            customers={customers}
            onView={handleViewCustomer}
            onEdit={handleEditCustomer}
            onCampaign={handleCampaign}
          />
        </>
      )}

      {/* Analytics */}

      {activeTab === "analytics" && <CustomerAnalytics />}

      {/* Drawer */}

      <CustomerProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
}
