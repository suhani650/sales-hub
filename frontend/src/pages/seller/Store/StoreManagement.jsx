import { useState } from "react";

import {
  FaStore,
  FaPalette,
  FaSearch,
  FaFileContract,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";

import StoreDashboard from "./StoreDashboard";
import StoreBranding from "../../../components/seller/Store/StoreBranding";
import StoreSEO from "../../../components/seller/Store/StoreSEO";
import StorePolicies from "../../../components/seller/Store/StorePolicies";
import StoreContactInfo from "../../../components/seller/Store/StoreContactInfo";
import StorePerformance from "../../../components/seller/Store/StorePerformance";

export default function StoreManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <FaStore />,
    },

    {
      id: "branding",
      label: "Branding",
      icon: <FaPalette />,
    },

    {
      id: "seo",
      label: "SEO",
      icon: <FaSearch />,
    },

    {
      id: "policies",
      label: "Policies",
      icon: <FaFileContract />,
    },

    {
      id: "business",
      label: "Business Info",
      icon: <FaBuilding />,
    },

    {
      id: "performance",
      label: "Performance",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white">
          Store Management Center
        </h1>

        <p className="mt-2 text-white/60">
          Branding, SEO, Policies, Business Settings & Analytics
        </p>
      </div>

      {/* Navigation */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
        <div className="flex gap-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2
                px-5 py-3
                rounded-xl
                whitespace-nowrap
                transition-all

                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
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

      {activeTab === "overview" && <StoreDashboard />}

      {activeTab === "branding" && <StoreBranding />}

      {activeTab === "seo" && <StoreSEO />}

      {activeTab === "policies" && <StorePolicies />}

      {activeTab === "business" && <StoreContactInfo />}

      {activeTab === "performance" && <StorePerformance />}
    </div>
  );
}
