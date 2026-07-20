import {
  FaTags,
  FaPercentage,
  FaGift,
  FaBullhorn,
  FaTicketAlt,
  FaPlus,
  FaChartLine,
  FaFire,
} from "react-icons/fa";

export default function OffersDashboard() {
  const stats = [
    {
      title: "Active Offers",
      value: "28",
      icon: <FaTags />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Coupons",
      value: "152",
      icon: <FaTicketAlt />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Campaigns",
      value: "14",
      icon: <FaBullhorn />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Sales Boost",
      value: "+34%",
      icon: <FaChartLine />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const offers = [
    {
      title: "Mega Sale 2026",
      discount: "50% OFF",
      status: "Running",
      expiry: "30 Jul 2026",
    },
    {
      title: "Independence Sale",
      discount: "40% OFF",
      status: "Scheduled",
      expiry: "15 Aug 2026",
    },
    {
      title: "New User Coupon",
      discount: "₹500 OFF",
      status: "Active",
      expiry: "No Expiry",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-[#071028] via-[#111936] to-[#1E1B4B] p-8 overflow-hidden">
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div>
            <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              Seller Promotion Center
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              Offers Dashboard
            </h1>

            <p className="text-slate-300 mt-5 leading-8 max-w-3xl">
              Create discount coupons, promotional campaigns, flash sales and
              increase conversions with enterprise marketing tools.
            </p>
          </div>

          <button className="h-fit px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 duration-300 flex items-center gap-3">
            <FaPlus />
            Create Offer
          </button>
        </div>
      </div>

      {/* Stats */}

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

      {/* Main */}

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Active Offers */}

        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Active Campaigns</h2>

            <FaFire className="text-orange-400 text-xl" />
          </div>

          <div className="space-y-5">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-2xl p-5 hover:border-cyan-500 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {offer.title}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      Expires : {offer.expiry}
                    </p>
                  </div>

                  <span className="px-5 py-2 rounded-full bg-green-500/20 text-green-400 font-semibold">
                    {offer.status}
                  </span>
                </div>

                <div className="mt-5 flex justify-between items-center">
                  <span className="text-4xl font-bold text-cyan-400">
                    {offer.discount}
                  </span>

                  <button className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <div className="flex items-center gap-3">
              <FaGift className="text-pink-400 text-2xl" />

              <h2 className="text-xl font-bold text-white">
                Promotion Performance
              </h2>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-white">82%</h2>

                <p className="text-white">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <FaPercentage className="text-green-400" />
              Discount Usage
            </h2>

            <div className="space-y-5 mt-6">
              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span>Coupons Used</span>

                  <span>74%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[74%] rounded-full bg-green-500"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span>Flash Sales</span>

                  <span>58%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[58%] rounded-full bg-cyan-500"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-2">
                  <span>Campaign Reach</span>

                  <span>91%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[91%] rounded-full bg-purple-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
