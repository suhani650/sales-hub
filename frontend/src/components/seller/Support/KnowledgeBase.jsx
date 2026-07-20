import { useState } from "react";
import {
  FaBook,
  FaSearch,
  FaRobot,
  FaThumbsUp,
  FaThumbsDown,
  FaChartLine,
  FaPlus,
  FaQuestionCircle,
} from "react-icons/fa";

export default function KnowledgeBase() {
  const [search, setSearch] = useState("");

  const articles = [
    {
      id: 1,
      title: "How to Process Refunds",
      category: "Payments",
      views: 4520,
      helpful: 94,
    },
    {
      id: 2,
      title: "Order Cancellation Guide",
      category: "Orders",
      views: 3820,
      helpful: 91,
    },
    {
      id: 3,
      title: "Shipping Delay Resolution",
      category: "Shipping",
      views: 2910,
      helpful: 89,
    },
  ];

  const categories = [
    "Orders",
    "Payments",
    "Shipping",
    "Returns",
    "Accounts",
    "Products",
  ];

  const aiSuggestions = [
    {
      title: "Most Requested Article",
      value: "Refund Process",
    },
    {
      title: "Suggested FAQ",
      value: "Track Shipment",
    },
    {
      title: "Knowledge Coverage",
      value: "92%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Knowledge Base Center</h2>

            <p className="text-gray-500 mt-2">
              Articles, FAQs & Self-Service Support
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <FaPlus />
            New Article
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <KpiCard title="Articles" value="248" icon={<FaBook />} />

        <KpiCard title="FAQs" value="126" icon={<FaQuestionCircle />} />

        <KpiCard title="Monthly Views" value="84K" icon={<FaChartLine />} />

        <KpiCard title="Helpful Rate" value="92%" icon={<FaThumbsUp />} />
      </div>

      {/* Search */}

      <div className="bg-white border rounded-2xl p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 py-3"
          />
        </div>
      </div>

      {/* Categories */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-bold text-xl mb-4">Categories</h3>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-blue-100"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-bold text-xl">Knowledge Articles</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Article</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Views</th>
              <th className="p-4 text-left">Helpful</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t">
                <td className="p-4">{article.title}</td>

                <td className="p-4">{article.category}</td>

                <td className="p-4">{article.views}</td>

                <td className="p-4 text-green-600">{article.helpful}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Analytics */}

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-4">Helpful Feedback</h3>

          <div className="flex items-center gap-3">
            <FaThumbsUp className="text-green-600 text-2xl" />

            <span className="text-3xl font-bold">92%</span>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-4">Negative Feedback</h3>

          <div className="flex items-center gap-3">
            <FaThumbsDown className="text-red-600 text-2xl" />

            <span className="text-3xl font-bold">8%</span>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaRobot className="text-blue-600 text-2xl" />

          <h3 className="font-bold text-xl">AI Suggested Answers</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {aiSuggestions.map((item) => (
            <div key={item.title} className="border rounded-xl p-5">
              <h4 className="font-semibold">{item.title}</h4>

              <p className="text-xl font-bold text-blue-600 mt-3">
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

      <p className="text-gray-500 mt-3">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
