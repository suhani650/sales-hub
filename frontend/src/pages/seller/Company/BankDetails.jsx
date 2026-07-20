import { useState } from "react";
import {
  FaUniversity,
  FaCheckCircle,
  FaUpload,
  FaEye,
  FaDownload,
} from "react-icons/fa";

export default function BankDetails() {
  const [bank, setBank] = useState({
    accountHolder: "Rahul Sharma",
    bankName: "State Bank of India",
    accountNumber: "123456789012",
    confirmAccountNumber: "123456789012",
    ifsc: "SBIN0001234",
    branch: "Mumbai Main Branch",
    accountType: "Current",
    upiId: "vendor@sbi",
    primary: true,
    verified: false,
    cancelledCheque: null,
    passbook: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBank({
      ...bank,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setBank({
        ...bank,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bank.accountNumber !== bank.confirmAccountNumber) {
      alert("Account numbers do not match.");
      return;
    }

    console.log(bank);

    // TODO: Backend API Integration
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Bank Details</h2>

          <p className="text-gray-500 mt-2">
            Manage your payout account information
          </p>
        </div>

        {bank.verified ? (
          <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <FaCheckCircle />
            Verified
          </span>
        ) : (
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            Verification Pending
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Account Holder Name
            </label>

            <input
              type="text"
              name="accountHolder"
              value={bank.accountHolder}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Bank Name</label>

            <input
              type="text"
              name="bankName"
              value={bank.bankName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Account Number</label>

            <input
              type="password"
              name="accountNumber"
              value={bank.accountNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Account Number
            </label>

            <input
              type="password"
              name="confirmAccountNumber"
              value={bank.confirmAccountNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">IFSC Code</label>

            <input
              type="text"
              name="ifsc"
              value={bank.ifsc}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 uppercase"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Branch Name</label>

            <input
              type="text"
              name="branch"
              value={bank.branch}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Account Type</label>

            <select
              name="accountType"
              value={bank.accountType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Savings</option>
              <option>Current</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">UPI ID</label>

            <input
              type="text"
              name="upiId"
              value={bank.upiId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-3 font-medium">Cancelled Cheque</label>

            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:bg-gray-50">
              <FaUpload className="text-3xl text-blue-600 mb-3" />

              <span>Upload Cancelled Cheque</span>

              <input
                hidden
                type="file"
                name="cancelledCheque"
                onChange={handleFileUpload}
              />
            </label>

            {bank.cancelledCheque && (
              <p className="mt-2 text-green-600 text-sm">
                {bank.cancelledCheque.name}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-3 font-medium">Bank Passbook</label>

            <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:bg-gray-50">
              <FaUpload className="text-3xl text-blue-600 mb-3" />

              <span>Upload Passbook</span>

              <input
                hidden
                type="file"
                name="passbook"
                onChange={handleFileUpload}
              />
            </label>

            {bank.passbook && (
              <p className="mt-2 text-green-600 text-sm">
                {bank.passbook.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="primary"
            checked={bank.primary}
            onChange={handleChange}
          />

          <label>Set as Primary Payout Account</label>
        </div>

        <div className="flex justify-between items-center border-t pt-6">
          <div className="flex gap-3">
            <button
              type="button"
              className="border px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100"
            >
              <FaEye />
              View Documents
            </button>

            <button
              type="button"
              className="border px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100"
            >
              <FaDownload />
              Download
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Save Bank Details
          </button>
        </div>
      </form>
    </div>
  );
}
