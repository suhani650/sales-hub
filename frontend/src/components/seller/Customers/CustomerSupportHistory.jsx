import {
  FaTicketAlt,
  FaComments,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaSmile,
  FaStar,
  FaExclamationTriangle,
  FaRobot,
  FaUserTie,
} from "react-icons/fa";

export default function CustomerSupportHistory() {
  const tickets = [
    {
      id: "TKT-1001",
      customer: "Rahul Sharma",
      channel: "Live Chat",
      issue: "Order Delay",
      status: "Resolved",
      rating: 5,
    },
    {
      id: "TKT-1002",
      customer: "Priya Verma",
      channel: "Email",
      issue: "Refund Request",
      status: "Pending",
      rating: 4,
    },
    {
      id: "TKT-1003",
      customer: "Amit Patel",
      channel: "Call",
      issue: "Payment Failed",
      status: "Escalated",
      rating: 3,
    },
  ];

  const agents = [
    {
      name: "Neha Singh",
      tickets: 420,
      csat: "96%",
    },
    {
      name: "Rohit Kumar",
      tickets: 380,
      csat: "94%",
    },
    {
      name: "Anjali Gupta",
      tickets: 350,
      csat: "92%",
    },
  ];

  const aiInsights = [
    {
      title: "Positive Sentiment",
      value: "82%",
    },
    {
      title: "Negative Sentiment",
      value: "8%",
    },
    {
      title: "Neutral Sentiment",
      value: "10%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Customer Support Intelligence</h2>

        <p className="text-gray-500 mt-2">
          Support History, CSAT & Customer Service Analytics
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <KpiCard title="Total Tickets" value="12,480" icon={<FaTicketAlt />} />

        <KpiCard title="Avg Response Time" value="18 Min" icon={<FaClock />} />

        <KpiCard title="CSAT Score" value="94%" icon={<FaSmile />} />

        <KpiCard
          title="Escalations"
          value="124"
          icon={<FaExclamationTriangle />}
        />
      </div>

      {/* Channel Analytics */}

      <div className="grid lg:grid-cols-4 gap-5">
        <ChannelCard title="Live Chats" value="4,820" icon={<FaComments />} />

        <ChannelCard title="Calls" value="2,940" icon={<FaPhone />} />

        <ChannelCard title="Emails" value="3,680" icon={<FaEnvelope />} />

        <ChannelCard title="Ratings" value="4.8/5" icon={<FaStar />} />
      </div>

      {/* Ticket History */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Support Ticket History</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Ticket</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Channel</th>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="p-4">{ticket.id}</td>
                <td className="p-4">{ticket.customer}</td>
                <td className="p-4">{ticket.channel}</td>
                <td className="p-4">{ticket.issue}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      ticket.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : ticket.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agent Performance */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaUserTie className="text-2xl text-blue-600" />
          <h3 className="font-bold text-xl">Agent Performance</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {agents.map((agent) => (
            <div key={agent.name} className="border rounded-xl p-5">
              <h4 className="font-bold">{agent.name}</h4>

              <p className="mt-2 text-gray-500">Tickets: {agent.tickets}</p>

              <p className="mt-2 text-green-600 font-semibold">
                CSAT: {agent.csat}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Sentiment */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Sentiment Analysis</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {aiInsights.map((item) => (
            <div key={item.title} className="border rounded-xl p-5 text-center">
              <h4 className="font-bold">{item.title}</h4>

              <p className="text-3xl font-bold text-blue-600 mt-3">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-blue-600">{icon}</div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function ChannelCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-600">{icon}</div>

      <h4 className="font-bold mt-4">{title}</h4>

      <p className="text-gray-500 mt-2">{value}</p>
    </div>
  );
}
