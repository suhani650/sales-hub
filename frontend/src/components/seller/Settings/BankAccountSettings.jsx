import {
  FaUniversity,
  FaCreditCard,
  FaMoneyBillWave,
  FaChartLine,
  FaSyncAlt,
  FaGlobe,
  FaCheckCircle,
  FaShieldAlt,
  FaPlus,
  FaSave,
} from "react-icons/fa";

export default function BankAccountSettings() {
  const bankAccounts = [
    {
      bank: "HDFC Bank",
      account: "XXXXXX4589",
      type: "Current Account",
      status: "Verified",
      primary: true,
    },
    {
      bank: "ICICI Bank",
      account: "XXXXXX8874",
      type: "Savings Account",
      status: "Verified",
      primary: false,
    },
  ];

  const settlements = [
    {
      id: "#SET10245",
      amount: "₹1,24,500",
      date: "15 Jul 2026",
      status: "Completed",
    },
    {
      id: "#SET10246",
      amount: "₹84,200",
      date: "12 Jul 2026",
      status: "Completed",
    },
    {
      id: "#SET10247",
      amount: "₹42,700",
      date: "10 Jul 2026",
      status: "Processing",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Banking & Payout Settings</h2>

        <p className="text-gray-500 mt-2">
          Manage settlements, payout accounts and banking preferences
        </p>
      </div>

      {/* KPI */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        <StatCard icon={<FaUniversity />} title="Bank Accounts" value="2" />

        <StatCard
          icon={<FaMoneyBillWave />}
          title="Monthly Payouts"
          value="₹12.4L"
        />

        <StatCard icon={<FaChartLine />} title="Success Rate" value="99.8%" />

        <StatCard icon={<FaShieldAlt />} title="Verified" value="100%" />
      </div>

      {/* Add Account */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaPlus className="text-blue-600" />

          <h3 className="text-xl font-bold">Add Bank Account</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input placeholder="Bank Name" className="border rounded-xl p-3" />

          <input
            placeholder="Account Number"
            className="border rounded-xl p-3"
          />

          <input placeholder="IFSC Code" className="border rounded-xl p-3" />

          <input
            placeholder="Account Holder Name"
            className="border rounded-xl p-3"
          />
        </div>

        <button className="mt-5 bg-blue-600 text-white px-5 py-3 rounded-xl">
          Add Account
        </button>
      </div>

      {/* Accounts */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Linked Bank Accounts</h3>

        <div className="space-y-4">
          {bankAccounts.map((account) => (
            <div
              key={account.account}
              className="border rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold">{account.bank}</h4>

                <p className="text-gray-500">{account.account}</p>

                <p className="text-sm text-gray-400">{account.type}</p>
              </div>

              <div className="flex gap-3">
                {account.primary && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    Primary
                  </span>
                )}

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {account.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Schedule */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Payout Schedule</h3>

        <div className="grid md:grid-cols-3 gap-5">
          <select className="border rounded-xl p-3">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>Auto Withdrawal</option>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>

          <select className="border rounded-xl p-3">
            <option>Primary Account</option>
          </select>
        </div>
      </div>

      {/* Settlement History */}

      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-bold text-xl">Settlement History</h3>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Settlement ID</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {settlements.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.id}</td>

                <td className="p-4 font-semibold text-green-600">
                  {item.amount}
                </td>

                <td className="p-4">{item.date}</td>

                <td className="p-4">
                  <StatusBadge value={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Settings */}

      <div className="grid md:grid-cols-3 gap-5">
        <SettingCard icon={<FaGlobe />} title="International Banking" />

        <SettingCard icon={<FaCheckCircle />} title="Account Verification" />

        <SettingCard icon={<FaSyncAlt />} title="Auto Withdrawals" />
      </div>

      {/* Save */}

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
          <FaSave />
          Save Banking Settings
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <div className="text-3xl text-blue-600">{icon}</div>

      <p className="text-gray-500 mt-3">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function SettingCard({ icon, title }) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center">
      <div className="flex justify-center text-3xl text-purple-600">{icon}</div>

      <h4 className="font-bold mt-3">{title}</h4>
    </div>
  );
}

function StatusBadge({ value }) {
  const colors = {
    Completed: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[value]}`}>
      {value}
    </span>
  );
}
