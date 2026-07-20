import {
  FaStar,
  FaRegStar,
  FaCommentDots,
  FaCheckCircle,
  FaFlag,
  FaReply,
  FaChartLine,
} from "react-icons/fa";

export default function ReviewsDashboard() {
  const stats = [
    {
      title: "Total Reviews",
      value: "18,426",
      icon: <FaCommentDots />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Average Rating",
      value: "4.8 ★",
      icon: <FaStar />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Published",
      value: "17,982",
      icon: <FaCheckCircle />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Reported",
      value: "92",
      icon: <FaFlag />,
      color: "from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8">
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              Seller Review Center
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              Reviews Dashboard
            </h1>

            <p className="text-slate-300 mt-5 max-w-3xl leading-8">
              Monitor customer ratings, reply to reviews, manage reported
              feedback and improve seller reputation.
            </p>
          </div>

          <button className="h-fit px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 duration-300 text-white font-semibold flex items-center gap-3">
            <FaReply />
            Reply Center
          </button>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 hover:shadow-[0_0_25px_rgba(34,211,238,.18)] transition"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl text-white`}
            >
              {item.icon}
            </div>

            <p className="text-slate-400 mt-5">{item.title}</p>

            <h2 className="text-3xl font-bold text-white mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Section */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent Reviews */}

        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Reviews</h2>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-white/10 rounded-2xl p-5 mb-5 hover:border-cyan-500 transition"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-white">Rahul Sharma</h3>

                  <p className="text-slate-400 text-sm">
                    Apple Watch Series 10
                  </p>
                </div>

                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4].map((i) => (
                    <FaStar key={i} />
                  ))}

                  <FaRegStar />
                </div>
              </div>

              <p className="text-slate-300 mt-4 leading-7">
                Amazing quality product. Fast delivery and excellent packaging.
                Highly recommended seller.
              </p>

              <div className="mt-5 flex gap-3">
                <button className="px-5 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600">
                  Reply
                </button>

                <button className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white">
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Summary */}

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <h2 className="text-xl font-bold text-white">Rating Overview</h2>

            <div className="mt-6 flex justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-white">4.8</h2>

                <p className="text-white">Overall Rating</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex items-center gap-3">
              <FaChartLine className="text-cyan-400 text-2xl" />

              <h2 className="text-xl font-bold text-white">
                Review Performance
              </h2>
            </div>

            <div className="space-y-5 mt-6">
              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span>Positive Reviews</span>
                  <span>94%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[94%] bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span>Negative Reviews</span>
                  <span>6%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[6%] bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
