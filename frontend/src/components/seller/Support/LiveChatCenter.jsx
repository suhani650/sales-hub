import { useState } from "react";
import {
  FaComments,
  FaUserFriends,
  FaRobot,
  FaPaperclip,
  FaClock,
  FaSmile,
  FaExchangeAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function LiveChatCenter() {
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: "CHAT-1001",
      customer: "Rahul Sharma",
      status: "Online",
      sentiment: "Positive",
      lastMessage: "Thanks for helping!",
    },
    {
      id: "CHAT-1002",
      customer: "Priya Verma",
      status: "Waiting",
      sentiment: "Neutral",
      lastMessage: "Need refund update",
    },
    {
      id: "CHAT-1003",
      customer: "Amit Patel",
      status: "Escalated",
      sentiment: "Negative",
      lastMessage: "Order still not delivered",
    },
  ];

  const messages = [
    {
      sender: "Customer",
      text: "My order is delayed.",
      time: "10:15 AM",
    },
    {
      sender: "Agent",
      text: "Let me check that for you.",
      time: "10:16 AM",
    },
    {
      sender: "Customer",
      text: "Thank you.",
      time: "10:17 AM",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-3xl font-bold">Live Chat Command Center</h2>

        <p className="text-gray-500 mt-2">
          Real-Time Customer Communication & Chat Intelligence
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard title="Active Chats" value="128" icon={<FaComments />} />

        <StatCard
          title="Online Customers"
          value="342"
          icon={<FaUserFriends />}
        />

        <StatCard title="Avg Response" value="24 Sec" icon={<FaClock />} />

        <StatCard title="Satisfaction" value="96%" icon={<FaSmile />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversation List */}

        <div className="bg-white border rounded-2xl">
          <div className="p-5 border-b">
            <h3 className="font-bold text-xl">Active Conversations</h3>
          </div>

          <div className="divide-y">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between">
                  <h4 className="font-semibold">{chat.customer}</h4>

                  <span
                    className={`text-xs px-2 py-1 rounded-full
                    ${
                      chat.status === "Online"
                        ? "bg-green-100 text-green-700"
                        : chat.status === "Waiting"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {chat.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">{chat.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}

        <div className="lg:col-span-2 bg-white border rounded-2xl">
          <div className="p-5 border-b flex justify-between">
            <h3 className="font-bold text-xl">Chat Session</h3>

            <button className="flex items-center gap-2 text-blue-600">
              <FaExchangeAlt />
              Transfer Agent
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-md p-3 rounded-xl
                ${
                  msg.sender === "Agent" ? "bg-blue-100 ml-auto" : "bg-gray-100"
                }`}
              >
                <p>{msg.text}</p>

                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
            ))}
          </div>

          <div className="border-t p-4 flex gap-3">
            <button className="border px-4 rounded-xl">
              <FaPaperclip />
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 border rounded-xl px-4"
            />

            <button className="bg-blue-600 text-white px-5 rounded-xl">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat Insights */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Chat Intelligence</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          <InsightCard title="Positive Chats" value="82%" />

          <InsightCard title="Neutral Chats" value="12%" />

          <InsightCard title="Negative Chats" value="6%" />

          <InsightCard title="Auto Resolve" value="64%" />
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

function InsightCard({ title, value }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <h4 className="font-semibold">{title}</h4>

      <p className="text-3xl font-bold text-blue-600 mt-3">{value}</p>
    </div>
  );
}
