import {
  FaRobot,
  FaEnvelope,
  FaSms,
  FaBell,
  FaUsers,
  FaPlay,
  FaClock,
  FaChartLine,
  FaBolt,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";

const automationStats = [
  {
    title: "Active Workflows",
    value: "48",
    icon: <FaRobot />,
    color: "bg-indigo-500",
  },
  {
    title: "Automated Emails",
    value: "1.2M",
    icon: <FaEnvelope />,
    color: "bg-blue-500",
  },
  {
    title: "SMS Automations",
    value: "480K",
    icon: <FaSms />,
    color: "bg-green-500",
  },
  {
    title: "Push Automations",
    value: "2.4M",
    icon: <FaBell />,
    color: "bg-purple-500",
  },
];

const workflows = [
  {
    name: "Welcome Series",
    trigger: "New Registration",
    channel: "Email",
    status: "Running",
    completed: "98%",
  },
  {
    name: "Abandoned Cart",
    trigger: "Cart Inactive 2 Hours",
    channel: "Email + SMS",
    status: "Running",
    completed: "91%",
  },
  {
    name: "Birthday Campaign",
    trigger: "Birthday Date",
    channel: "Email + Push",
    status: "Scheduled",
    completed: "84%",
  },
  {
    name: "Re-Engagement",
    trigger: "Inactive 30 Days",
    channel: "Push",
    status: "Active",
    completed: "89%",
  },
];

const journeys = [
  "Customer Onboarding",
  "Cart Recovery",
  "VIP Loyalty",
  "Product Recommendation",
  "Repeat Purchase",
];

export default function MarketingAutomation() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-3xl border p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <FaRobot className="text-indigo-600 text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Marketing Automation</h2>

              <p className="text-gray-500">
                AI Powered Customer Journey Automation
              </p>
            </div>
          </div>

          <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            Create Workflow
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        {automationStats.map((item) => (
          <div key={item.title} className="bg-white rounded-2xl border p-5">
            <div
              className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl`}
            >
              {item.icon}
            </div>

            <p className="text-gray-500 mt-4">{item.title}</p>

            <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Workflow List */}

        <div className="xl:col-span-2 bg-white rounded-3xl border">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Automation Workflows</h3>
          </div>

          <div className="divide-y">
            {workflows.map((workflow) => (
              <div key={workflow.name} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{workflow.name}</h4>

                    <p className="text-gray-500 mt-1">
                      Trigger : {workflow.trigger}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    {workflow.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-5">
                  <Metric label="Channel" value={workflow.channel} />

                  <Metric label="Completion" value={workflow.completed} />

                  <Metric label="AI Score" value="96%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}

        <div className="space-y-6">
          {/* AI */}

          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl text-white p-6">
            <div className="flex items-center gap-3">
              <FaBolt className="text-2xl" />

              <h3 className="text-xl font-bold">AI Optimization</h3>
            </div>

            <div className="space-y-4 mt-6">
              <AIItem label="Workflow Efficiency" value="97%" />

              <AIItem label="Automation Savings" value="420 Hours" />

              <AIItem label="Revenue Generated" value="₹8.6 Cr" />

              <AIItem label="Best Journey" value="Cart Recovery" />
            </div>
          </div>

          {/* Journey Templates */}

          <div className="bg-white rounded-3xl border p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaUsers className="text-indigo-600" />

              <h3 className="font-bold">Journey Templates</h3>
            </div>

            <div className="space-y-3">
              {journeys.map((journey) => (
                <div
                  key={journey}
                  className="flex justify-between items-center border rounded-xl p-3"
                >
                  <span>{journey}</span>

                  <button className="text-indigo-600">
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl border p-6">
            <h3 className="font-bold mb-4">Quick Actions</h3>

            <div className="space-y-3">
              <Action icon={<FaEnvelope />} text="Email Workflow" />

              <Action icon={<FaSms />} text="SMS Workflow" />

              <Action icon={<FaBell />} text="Push Workflow" />

              <Action icon={<FaClock />} text="Schedule Automation" />

              <Action icon={<FaCheckCircle />} text="Automation Reports" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <h4 className="text-xl font-bold mt-2">{value}</h4>
    </div>
  );
}

function AIItem({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Action({ icon, text }) {
  return (
    <button className="w-full flex items-center gap-3 border rounded-xl p-3 hover:bg-indigo-50 transition">
      <span className="text-indigo-600">{icon}</span>
      {text}
    </button>
  );
}
