import {
  FaUserTie,
  FaTicketAlt,
  FaClock,
  FaSmile,
  FaPhone,
  FaComments,
  FaEnvelope,
  FaTrophy,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

export default function AgentPerformance() {
  const agents = [
    {
      id: 1,
      name: "Neha Singh",
      tickets: 420,
      resolutionTime: "2.1 hrs",
      csat: "96%",
      calls: 820,
      chats: 1280,
      emails: 460,
      productivity: "98%",
    },
    {
      id: 2,
      name: "Rohit Kumar",
      tickets: 385,
      resolutionTime: "2.4 hrs",
      csat: "94%",
      calls: 760,
      chats: 1150,
      emails: 410,
      productivity: "95%",
    },
    {
      id: 3,
      name: "Anjali Gupta",
      tickets: 352,
      resolutionTime: "2.8 hrs",
      csat: "92%",
      calls: 690,
      chats: 980,
      emails: 390,
      productivity: "91%",
    },
  ];

  const aiInsights = [
    {
      title: "Top Performer",
      value: "Neha Singh",
    },
    {
      title: "Coaching Needed",
      value: "3 Agents",
    },
    {
      title: "Efficiency Gain",
      value: "+18%",
    },
    {
      title: "Burnout Risk",
      value: "2 Agents",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Agent Performance Center</h2>

        <p className="text-gray-500 mt-2">
          Workforce Productivity & Service Quality Analytics
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Active Agents" value="48" icon={<FaUserTie />} />

        <StatCard
          title="Tickets Closed"
          value="12,480"
          icon={<FaTicketAlt />}
        />

        <StatCard title="Avg Resolution" value="2.4 hrs" icon={<FaClock />} />

        <StatCard title="CSAT" value="94%" icon={<FaSmile />} />
      </div>

      {/* Performance Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-bold text-xl">Agent Leaderboard</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Agent</th>
              <th className="p-4 text-left">Tickets</th>
              <th className="p-4 text-left">Resolution</th>
              <th className="p-4 text-left">CSAT</th>
              <th className="p-4 text-left">Calls</th>
              <th className="p-4 text-left">Chats</th>
              <th className="p-4 text-left">Emails</th>
              <th className="p-4 text-left">Productivity</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-t">
                <td className="p-4 font-semibold">{agent.name}</td>

                <td className="p-4">{agent.tickets}</td>

                <td className="p-4">{agent.resolutionTime}</td>

                <td className="p-4 text-green-600 font-semibold">
                  {agent.csat}
                </td>

                <td className="p-4">{agent.calls}</td>

                <td className="p-4">{agent.chats}</td>

                <td className="p-4">{agent.emails}</td>

                <td className="p-4 text-blue-600 font-semibold">
                  {agent.productivity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Channel Metrics */}

      <div className="grid md:grid-cols-4 gap-5">
        <MetricCard title="Call Performance" value="93%" icon={<FaPhone />} />

        <MetricCard
          title="Chat Performance"
          value="96%"
          icon={<FaComments />}
        />

        <MetricCard
          title="Email Performance"
          value="91%"
          icon={<FaEnvelope />}
        />

        <MetricCard title="Leaderboard" value="#1" icon={<FaTrophy />} />
      </div>

      {/* Productivity */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaChartLine className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">Productivity Analytics</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          <AnalyticsCard title="Utilization" value="88%" />

          <AnalyticsCard title="First Response" value="92%" />

          <AnalyticsCard title="Resolution Rate" value="95%" />

          <AnalyticsCard title="Quality Score" value="97%" />
        </div>
      </div>

      {/* AI Insights */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Performance Insights</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          {aiInsights.map((item) => (
            <div key={item.title} className="border rounded-xl p-5">
              <h4 className="font-semibold">{item.title}</h4>

              <p className="text-2xl font-bold text-blue-600 mt-3">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-blue-600">{icon}</div>

      <p className="text-gray-500 mt-3">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-600">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

function AnalyticsCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <h4 className="font-semibold">{title}</h4>

      <p className="text-3xl font-bold mt-3">{value}</p>
    </div>
  );
}
