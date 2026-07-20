import { useState } from "react";
import {
  FaFileInvoice,
  FaCheckCircle,
  FaUpload,
  FaDownload,
  FaEye,
} from "react-icons/fa";

export default function GSTDetails() {
  const [gst, setGst] = useState({
    gstNumber: "27ABCDE1234F1Z5",
    businessType: "Private Limited",
    state: "Maharashtra",
    registrationDate: "2024-01-10",
    verified: true,
    certificate: null,
  });

  const handleChange = (e) => {
    setGst({
      ...gst,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setGst({
        ...gst,
        certificate: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(gst);

    // TODO API Integration
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">GST Details</h2>

          <p className="text-gray-500 mt-2">
            Manage GST registration information
          </p>
        </div>

        {gst.verified ? (
          <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <FaCheckCircle />
            Verified
          </span>
        ) : (
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            Pending Verification
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">GST Number</label>

            <input
              type="text"
              name="gstNumber"
              value={gst.gstNumber}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Business Type</label>

            <select
              name="businessType"
              value={gst.businessType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Private Limited</option>

              <option>Partnership</option>

              <option>LLP</option>

              <option>Sole Proprietorship</option>

              <option>Public Limited</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">GST State</label>

            <input
              type="text"
              name="state"
              value={gst.state}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Registration Date</label>

            <input
              type="date"
              name="registrationDate"
              value={gst.registrationDate}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div>
          <label className="block mb-3 font-medium">GST Certificate</label>

          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <FaFileInvoice size={45} className="mx-auto text-gray-400" />

            <p className="mt-4 text-gray-600">
              Upload GST Certificate (PDF / JPG / PNG)
            </p>

            <label className="inline-flex items-center gap-2 mt-5 px-5 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              <FaUpload />
              Upload Certificate
              <input type="file" hidden onChange={handleUpload} />
            </label>

            {gst.certificate && (
              <p className="mt-4 text-green-600">{gst.certificate.name}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-3">
            <button
              type="button"
              className="flex items-center gap-2 border px-5 py-3 rounded-lg hover:bg-gray-100"
            >
              <FaEye />
              View
            </button>

            <button
              type="button"
              className="flex items-center gap-2 border px-5 py-3 rounded-lg hover:bg-gray-100"
            >
              <FaDownload />
              Download
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Save GST Details
          </button>
        </div>
      </form>
    </div>
  );
}
