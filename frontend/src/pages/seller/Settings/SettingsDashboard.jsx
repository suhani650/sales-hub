import {
  FaUser,
  FaBuilding,
  FaUniversity,
  FaLock,
  FaShieldAlt,
  FaBell,
  FaGlobe,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaPalette,
  FaKey,
  FaUsers,
  FaHistory,
  FaCog,
  FaArrowRight,
} from "react-icons/fa";

import BankAccountSettings from "../../../components/seller/Settings/BankAccountSettings";
import ProfileSettings from "../../../components/seller/Settings/ProfileSettings";
import BusinessInformation from "../../../components/seller/Settings/BusinessInformation";
import SecuritySettings from "../../../components/seller/Settings/SecuritySettings";
import NotificationPreferences from "../../../components/seller/Settings/NotificationPreferences";
import TeamPermissions from "../../../components/seller/Settings/TeamPermissions";
import AuditLogs from "../../../components/seller/Settings/AuditLogs";

export default function SettingsDashboard() {
  const stats = [
    {
      title: "Profile Completion",
      value: "92%",
      icon: <FaUser />,
      color: "from-blue-500 to-cyan-500 shadow-[0_0_25px_rgba(59,130,246,.35)]",
    },
    {
      title: "Security Score",
      value: "98%",
      icon: <FaShieldAlt />,
      color:
        "from-green-500 to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,.35)]",
    },
    {
      title: "Team Members",
      value: "28",
      icon: <FaUsers />,
      color:
        "from-purple-500 to-pink-500 shadow-[0_0_25px_rgba(168,85,247,.35)]",
    },
    {
      title: "API Integrations",
      value: "14",
      icon: <FaKey />,
      color:
        "from-orange-500 to-red-500 shadow-[0_0_25px_rgba(249,115,22,.35)]",
    },
  ];

  const modules = [
    {
      title: "Profile Settings",
      icon: <FaUser />,
      desc: "Personal profile information",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Business Information",
      icon: <FaBuilding />,
      desc: "Business & GST Details",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Bank Accounts",
      icon: <FaUniversity />,
      desc: "Settlement Accounts",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Security Center",
      icon: <FaLock />,
      desc: "Password & 2FA",
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Notifications",
      icon: <FaBell />,
      desc: "Email & Push Alerts",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Language & Region",
      icon: <FaGlobe />,
      desc: "Timezone & Currency",
      color: "from-sky-500 to-cyan-600",
    },
    {
      title: "Billing Settings",
      icon: <FaCreditCard />,
      desc: "Invoices & Payments",
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Tax Settings",
      icon: <FaFileInvoiceDollar />,
      desc: "GST Configuration",
      color: "from-green-500 to-lime-500",
    },
    {
      title: "Theme Settings",
      icon: <FaPalette />,
      desc: "Customize Dashboard",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "API Keys",
      icon: <FaKey />,
      desc: "Developer Access",
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Team Permissions",
      icon: <FaUsers />,
      desc: "Manage Staff Access",
      color: "from-indigo-500 to-violet-600",
    },
    {
      title: "Audit Logs",
      icon: <FaHistory />,
      desc: "Activity Monitoring",
      color: "from-slate-500 to-slate-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HERO */}

      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] border border-white/10 p-10">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[140px]" />

        <div className="relative flex flex-col xl:flex-row justify-between gap-10">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
              <FaCog />
              Seller Settings Center
            </span>

            <h1 className="text-5xl font-black text-white mt-6">
              Platform Settings
            </h1>

            <p className="text-slate-300 mt-5 max-w-3xl leading-8">
              Manage business information, security, banking, billing,
              notifications, integrations and advanced seller preferences from
              one enterprise dashboard.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0B1023]/90 border border-cyan-500/20 p-8 w-[330px]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-3xl text-white">
                <FaShieldAlt />
              </div>

              <div>
                <p className="text-slate-400">Security Status</p>

                <h2 className="text-4xl font-black text-green-400">Secure</h2>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Profile Completion</span>

                <span>92%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:-translate-y-2 duration-300"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-3xl`}
            >
              {item.icon}
            </div>

            <p className="text-slate-400 mt-6">{item.title}</p>

            <h2 className="text-4xl font-black text-white mt-2">
              {item.value}
            </h2>
          </div>
        ))}
      </div>
      {/* ==========================
            SETTINGS MODULES
      =========================== */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Settings Modules</h2>

            <p className="text-slate-400 mt-2">
              Configure every aspect of your seller account.
            </p>
          </div>

          <button className="px-5 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-white transition">
            Manage All
          </button>
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.title}
              className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#111827]
              hover:border-cyan-500/50
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_20px_45px_rgba(34,211,238,.18)]
              "
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${module.color}`}
              />

              <div className="p-6">
                <div
                  className={`
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${module.color}
                  flex
                  items-center
                  justify-center
                  text-white
                  text-2xl
                  shadow-xl
                  `}
                >
                  {module.icon}
                </div>

                <h3 className="text-xl font-bold text-white mt-6">
                  {module.title}
                </h3>

                <p className="text-slate-400 mt-3 leading-7">{module.desc}</p>

                <button
                  className="
                  mt-8
                  flex
                  items-center
                  gap-3
                  text-cyan-400
                  group-hover:text-white
                  duration-300
                  font-semibold
                  "
                >
                  Open Module
                  <FaArrowRight className="group-hover:translate-x-2 duration-300" />
                </button>
              </div>

              <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
      {/* ===============================
            SETTINGS COMPONENTS
      =============================== */}

      <div className="grid xl:grid-cols-2 gap-8">
        {/* Team Permissions */}

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Team Permissions
              </h2>

              <p className="text-slate-400 mt-1">
                Manage staff roles & permissions
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl">
              <FaUsers />
            </div>
          </div>

          <div className="p-8">
            <TeamPermissions />
          </div>
        </div>

        {/* Audit Logs */}

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">Audit Logs</h2>

              <p className="text-slate-400 mt-1">
                Security & Activity Monitoring
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl">
              <FaHistory />
            </div>
          </div>

          <div className="p-8">
            <AuditLogs />
          </div>
        </div>
      </div>

      {/* ====================================
              PROFILE & BUSINESS
      ==================================== */}

      <div className="grid xl:grid-cols-2 gap-8">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Seller Profile</h2>

              <p className="text-slate-400 mt-1">
                Personal account information
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
              <FaUser />
            </div>
          </div>

          <div className="p-8">
            <ProfileSettings />
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Business Information
              </h2>

              <p className="text-slate-400 mt-1">
                GST • PAN • Address • Documents
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white">
              <FaBuilding />
            </div>
          </div>

          <div className="p-8">
            <BusinessInformation />
          </div>
        </div>
      </div>
      {/* ==================================
              BANK & SECURITY
      ================================== */}

      <div className="grid xl:grid-cols-2 gap-8">
        {/* Bank */}

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Bank Accounts</h2>

              <p className="text-slate-400 mt-1">
                Settlement & Withdrawal Accounts
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl">
              <FaUniversity />
            </div>
          </div>

          <div className="p-8">
            <BankAccountSettings />
          </div>
        </div>

        {/* Security */}

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Security Center</h2>

              <p className="text-slate-400 mt-1">
                Password • OTP • Login Security
              </p>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white text-2xl">
              <FaShieldAlt />
            </div>
          </div>

          <div className="p-8">
            <SecuritySettings />
          </div>
        </div>
      </div>

      {/* ==================================
            NOTIFICATIONS
      ================================== */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] overflow-hidden">
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Notification Preferences
            </h2>

            <p className="text-slate-400 mt-1">
              Email • SMS • Push Notifications
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white text-2xl">
            <FaBell />
          </div>
        </div>

        <div className="p-8">
          <NotificationPreferences />
        </div>
      </div>

      {/* ==================================
              FOOTER
      ================================== */}

      <div className="rounded-[32px] bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-8">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Seller Settings Center
            </h2>

            <p className="text-cyan-100 mt-3 max-w-2xl leading-7">
              Your account configuration is automatically protected using
              enterprise-grade security and encrypted cloud storage.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className="
              px-7
              py-3
              rounded-xl
              border
              border-white/20
              bg-white/10
              hover:bg-white/20
              text-white
              transition
              "
            >
              Reset Settings
            </button>

            <button
              className="
              px-8
              py-3
              rounded-xl
              bg-white
              text-blue-700
              font-bold
              hover:scale-105
              transition
              shadow-xl
              "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
