import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaUsers,
  FaUserPlus,
  FaShieldAlt,
  FaKey,
  FaBuilding,
  FaChartBar,
  FaHistory,
  FaLock,
  FaEnvelope,
  FaSave,
  FaSearch,
  FaFilter,
  FaUserShield,
  FaUserCog,
  FaUserCheck,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export default function TeamPermissions() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const members = [
    {
      id: 1,
      avatar: "RS",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "Admin",
      department: "Operations",
      status: "Active",
      lastLogin: "2 mins ago",
    },
    {
      id: 2,
      avatar: "PS",
      name: "Priya Singh",
      email: "priya@gmail.com",
      role: "Finance Manager",
      department: "Finance",
      status: "Active",
      lastLogin: "10 mins ago",
    },
    {
      id: 3,
      avatar: "AV",
      name: "Amit Verma",
      email: "amit@gmail.com",
      role: "Inventory Manager",
      department: "Warehouse",
      status: "Pending",
      lastLogin: "Yesterday",
    },
    {
      id: 4,
      avatar: "SK",
      name: "Sneha Kapoor",
      email: "sneha@gmail.com",
      role: "Marketing Manager",
      department: "Marketing",
      status: "Active",
      lastLogin: "5 mins ago",
    },
  ];

  const stats = [
    {
      title: "Team Members",
      value: "28",
      growth: "+6%",
      color: "from-blue-500 to-cyan-500",
      icon: <FaUsers />,
    },
    {
      title: "Departments",
      value: "6",
      growth: "+2",
      color: "from-purple-500 to-pink-500",
      icon: <FaBuilding />,
    },
    {
      title: "Roles",
      value: "8",
      growth: "+1",
      color: "from-emerald-500 to-green-500",
      icon: <FaShieldAlt />,
    },
    {
      title: "Permission Sets",
      value: "16",
      growth: "+4",
      color: "from-orange-500 to-red-500",
      icon: <FaKey />,
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white p-10">
        <div className="absolute -top-16 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-20 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-wrap justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl font-bold">Team & Permission Center</h1>

            <p className="text-blue-100 mt-4 max-w-3xl leading-7">
              Manage employees, organization roles, departments, permission
              sets, secure access and operational controls from one unified
              dashboard.
            </p>
          </div>

          <button
            className="
            px-7
            py-4
            rounded-2xl
            bg-white
            text-indigo-700
            font-semibold
            shadow-xl
            hover:scale-105
            transition
            "
          >
            <FaUserPlus className="inline mr-2" />
            Invite Member
          </button>
        </div>
      </div>

      {/* ================= KPI ================= */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item) => (
          <motion.div
            whileHover={{ y: -6 }}
            key={item.title}
            className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            shadow-sm
            p-6
            "
          >
            <div
              className={`
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-r
              ${item.color}
              flex
              items-center
              justify-center
              text-white
              text-2xl
              `}
            >
              {item.icon}
            </div>

            <p className="text-slate-500 mt-5">{item.title}</p>

            <div className="flex justify-between items-end mt-3">
              <h2 className="text-4xl font-bold text-slate-800">
                {item.value}
              </h2>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                {item.growth}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* ================= Invite Member ================= */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <FaUserPlus className="text-blue-600 text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Invite Team Member
            </h2>

            <p className="text-slate-500 mt-1">
              Send secure invitation to new employees.
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
          />

          <input
            type="email"
            placeholder="Email Address"
            className="
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
          />

          <select
            className="
            rounded-2xl
            border
            border-slate-300
            px-5
            py-4
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
          >
            <option>Choose Role</option>
            <option>Admin</option>
            <option>Finance Manager</option>
            <option>Inventory Manager</option>
            <option>Marketing Manager</option>
          </select>

          <button
            className="
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-blue-600
            text-white
            font-semibold
            hover:shadow-xl
            transition
            "
          >
            <FaEnvelope className="inline mr-2" />
            Send Invitation
          </button>
        </div>
      </div>

      {/* ================= Search & Filter ================= */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <div className="relative w-full lg:w-[420px]">
            <FaSearch className="absolute left-5 top-5 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team member..."
              className="
              w-full
              rounded-2xl
              border
              border-slate-300
              pl-14
              pr-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              "
            />
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <FaFilter className="absolute left-4 top-4 text-slate-400" />

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="
                rounded-2xl
                border
                border-slate-300
                pl-11
                pr-6
                py-3
                outline-none
                "
              >
                <option>All</option>
                <option>Admin</option>
                <option>Finance Manager</option>
                <option>Inventory Manager</option>
                <option>Marketing Manager</option>
              </select>
            </div>

            <button
              className="
              px-5
              py-3
              rounded-2xl
              border
              hover:bg-slate-100
              transition
              "
            >
              Export
            </button>

            <button
              className="
              px-5
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-indigo-600
              to-blue-600
              text-white
              hover:shadow-lg
              transition
              "
            >
              Add Member
            </button>
          </div>
        </div>
      </div>

      {/* ================= Members Table ================= */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
      >
        <div className="flex justify-between items-center border-b p-6">
          <div>
            <h2 className="text-2xl font-bold text-white-800">Team Members</h2>

            <p className="text-white-500 mt-1">
              Manage organization users and permissions.
            </p>
          </div>

          <span className="px-5 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
            {members.length} Members
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-white-100">
              <tr>
                <th className="p-5 text-left">Employee</th>

                <th className="p-5 text-left">Role</th>

                <th className="p-5 text-left">Department</th>

                <th className="p-5 text-left">Last Login</th>

                <th className="p-5 text-left">Status</th>

                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {members
                .filter((member) => {
                  const searchMatch = member.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

                  const roleMatch =
                    roleFilter === "All" ? true : member.role === roleFilter;

                  return searchMatch && roleMatch;
                })
                .map((member) => (
                  <motion.tr
                    key={member.id}
                    whileHover={{
                      backgroundColor: "#F8FAFC",
                    }}
                    className="border-t"
                  >
                    {/* Employee */}

                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="
                          w-14
                          h-14
                          rounded-full
                          bg-gradient-to-r
                          from-indigo-500
                          to-cyan-500
                          text-white
                          flex
                          items-center
                          justify-center
                          font-bold
                          text-lg
                          "
                        >
                          {member.avatar}
                        </div>

                        <div>
                          <h3 className="font-bold text-white-800">
                            {member.name}
                          </h3>

                          <p className="text-white-500 text-sm">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}

                    <td className="p-5">
                      <div className="flex items-center gap-2 font-medium">
                        <FaUserShield className="text-indigo-600" />

                        {member.role}
                      </div>
                    </td>

                    {/* Department */}

                    <td className="p-5">{member.department}</td>

                    {/* Login */}

                    <td className="p-5 text-slate-500">{member.lastLogin}</td>

                    {/* Status */}

                    <td className="p-5">
                      <StatusBadge value={member.status} />
                    </td>

                    {/* Actions */}

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          className="
                          w-11
                          h-11
                          rounded-xl
                          bg-blue-100
                          text-blue-600
                          hover:bg-blue-600
                          hover:text-white
                          transition
                          "
                        >
                          <FaEye />
                        </button>

                        <button
                          className="
                          w-11
                          h-11
                          rounded-xl
                          bg-yellow-100
                          text-yellow-600
                          hover:bg-yellow-500
                          hover:text-white
                          transition
                          "
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="
                          w-11
                          h-11
                          rounded-xl
                          bg-green-100
                          text-green-600
                          hover:bg-green-600
                          hover:text-white
                          transition
                          "
                        >
                          <FaUserCog />
                        </button>

                        <button
                          className="
                          w-11
                          h-11
                          rounded-xl
                          bg-red-100
                          text-red-600
                          hover:bg-red-600
                          hover:text-white
                          transition
                          "
                        >
                          <FaTrash />
                        </button>

                        <button
                          className="
                          w-11
                          h-11
                          rounded-xl
                          bg-slate-100
                          hover:bg-slate-800
                          hover:text-white
                          transition
                          "
                        >
                          <FaEllipsisV />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="border-t p-6 flex flex-wrap justify-between items-center gap-4">
          <p className="text-white-500">
            Showing
            <span className="font-semibold text-white-800 mx-2">1 - 4</span>
            of
            <span className="font-semibold text-white-800 mx-2">28</span>
            Members
          </p>

          <div className="flex gap-2">
            <button className="w-11 h-11 rounded-xl border hover:bg-slate-100">
              1
            </button>

            <button className="w-11 h-11 rounded-xl border hover:bg-slate-100">
              2
            </button>

            <button className="w-11 h-11 rounded-xl border hover:bg-slate-100">
              3
            </button>

            <button className="w-11 h-11 rounded-xl bg-indigo-600 text-white">
              4
            </button>
          </div>
        </div>
      </div>

      {/* ================= Permission Matrix ================= */}
      {/* ================= Access Activity ================= */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
      >
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-white-800">
              Recent Access Activity
            </h2>

            <p className="text-white-500 mt-1">
              Monitor every permission update and login event.
            </p>
          </div>

          <button className="px-5 py-3 rounded-2xl bg-slate-900 text-white">
            View All Logs
          </button>
        </div>

        <div className="divide-y">
          {[
            {
              user: "Rahul Sharma",
              action: "Updated Finance Permissions",
              time: "5 mins ago",
              color: "bg-green-500",
            },
            {
              user: "Priya Singh",
              action: "Invited New Member",
              time: "18 mins ago",
              color: "bg-blue-500",
            },
            {
              user: "Sneha Kapoor",
              action: "Changed Marketing Access",
              time: "1 hour ago",
              color: "bg-orange-500",
            },
            {
              user: "Admin",
              action: "Created New Role",
              time: "Yesterday",
              color: "bg-purple-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center p-6"
            >
              <div className="flex items-center gap-5">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />

                <div>
                  <h4 className="font-semibold text-white-800">{item.user}</h4>

                  <p className="text-slate-500">{item.action}</p>
                </div>
              </div>

              <span className="text-slate-400 text-sm">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= Security Summary ================= */}

      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white p-7"
        >
          <FaShieldAlt className="text-4xl mb-5" />

          <p>Security Health</p>

          <h2 className="text-3xl font-bold mt-4">98%</h2>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl text-white p-7"
        >
          <FaUsers className="text-4xl mb-5" />

          <p>Active Users</p>

          <h2 className="text-3xl font-bold mt-4">24</h2>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white p-7"
        >
          <FaKey className="text-4xl mb-5" />

          <p>API Keys</p>

          <h2 className="text-3xl font-bold mt-4">14</h2>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl text-white p-7"
        >
          <FaHistory className="text-4xl mb-5" />

          <p>Audit Logs</p>

          <h2 className="text-3xl font-bold mt-4">12.4K</h2>
        </motion.div>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex justify-end pt-2">
        <button
          className="
          px-8
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-blue-600
          text-white
          font-semibold
          shadow-lg
          hover:shadow-2xl
          hover:scale-105
          transition
          "
        >
          <FaSave className="inline mr-3" />
          Save Permission Settings
        </button>
      </div>
    </motion.div>
  );
}
function StatusBadge({ value }) {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Disabled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        styles[value] || "bg-slate-100 text-slate-700"
      }`}
    >
      {value}
    </span>
  );
}

function StatCard({
  icon,
  title,
  value,
  growth,
  color = "from-indigo-500 to-blue-600",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      shadow-sm
      p-6
      "
    >
      <div
        className={`
        w-16
        h-16
        rounded-2xl
        bg-gradient-to-r
        ${color}
        flex
        items-center
        justify-center
        text-white
        text-2xl
        `}
      >
        {icon}
      </div>

      <p className="mt-5 text-slate-500">{title}</p>

      <div className="flex justify-between items-end mt-3">
        <h2 className="text-4xl font-bold text-slate-800">{value}</h2>

        {growth && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            {growth}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ActivityItem({ color, user, action, time }) {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "#F8FAFC",
      }}
      className="flex justify-between items-center p-5 border-b"
    >
      <div className="flex items-center gap-4">
        <div className={`w-4 h-4 rounded-full ${color}`} />

        <div>
          <h4 className="font-semibold text-slate-800">{user}</h4>

          <p className="text-slate-500">{action}</p>
        </div>
      </div>

      <span className="text-slate-400 text-sm">{time}</span>
    </motion.div>
  );
}

function DepartmentCard({ name, manager, members, color }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="
      border
      rounded-3xl
      p-6
      hover:shadow-xl
      transition
      "
    >
      <div
        className={`
        w-16
        h-16
        rounded-2xl
        bg-gradient-to-r
        ${color}
        flex
        items-center
        justify-center
        text-white
        text-2xl
        `}
      >
        <FaBuilding />
      </div>

      <h3 className="text-xl font-bold mt-5">{name}</h3>

      <div className="mt-5 space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-500">Manager</span>

          <span className="font-semibold">{manager}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Members</span>

          <span className="font-bold text-indigo-600">{members}</span>
        </div>
      </div>

      <button
        className="
        mt-6
        w-full
        rounded-xl
        bg-slate-100
        py-3
        hover:bg-indigo-600
        hover:text-white
        transition
        "
      >
        View Department
      </button>
    </motion.div>
  );
}
