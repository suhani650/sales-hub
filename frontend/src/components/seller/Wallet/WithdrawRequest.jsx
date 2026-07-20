import { useState } from "react";
import { HiOutlineBanknotes, HiOutlineBuildingLibrary } from "react-icons/hi2";

export default function WithdrawRequest() {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("HDFC Bank");

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <HiOutlineBanknotes className="text-green-600" size={30} />

        <h2 className="text-2xl font-bold">Withdraw Request</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter withdrawal amount"
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Bank Account</label>

          <div className="relative">
            <HiOutlineBuildingLibrary className="absolute left-3 top-4 text-gray-400" />

            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full border rounded-xl p-3 pl-10"
            >
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>SBI</option>
              <option>Axis Bank</option>
            </select>
          </div>
        </div>

        <button className="bg-indigo-600 text-white rounded-xl px-6 py-3">
          Submit Withdrawal
        </button>
      </div>
    </div>
  );
}
