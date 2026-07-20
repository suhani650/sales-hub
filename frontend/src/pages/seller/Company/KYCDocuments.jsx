import { useState } from "react";
import {
  FaUpload,
  FaFilePdf,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaEye,
  FaTrash,
} from "react-icons/fa";

export default function KYCDocuments() {
  const [documents, setDocuments] = useState({
    aadhaar: null,
    pan: null,
    gst: null,
    msme: null,
    fssai: null,
    shopLicense: null,
    cin: null,
    cancelledCheque: null,
  });

  const uploadDocument = (e) => {
    const { name, files } = e.target;

    if (!files.length) return;

    setDocuments((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const documentList = [
    {
      key: "aadhaar",
      title: "Aadhaar Card",
      required: true,
      status: "Verified",
    },
    {
      key: "pan",
      title: "PAN Card",
      required: true,
      status: "Verified",
    },
    {
      key: "gst",
      title: "GST Certificate",
      required: true,
      status: "Pending",
    },
    {
      key: "msme",
      title: "MSME Certificate",
      required: false,
      status: "Not Uploaded",
    },
    {
      key: "fssai",
      title: "FSSAI License",
      required: false,
      status: "Not Uploaded",
    },
    {
      key: "shopLicense",
      title: "Shop License",
      required: false,
      status: "Not Uploaded",
    },
    {
      key: "cin",
      title: "CIN Certificate",
      required: false,
      status: "Not Uploaded",
    },
    {
      key: "cancelledCheque",
      title: "Cancelled Cheque",
      required: true,
      status: "Verified",
    },
  ];

  const badge = (status) => {
    switch (status) {
      case "Verified":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <FaCheckCircle />
            Verified
          </span>
        );

      case "Pending":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <FaClock />
            Pending
          </span>
        );

      default:
        return (
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            Not Uploaded
          </span>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(documents);

    // TODO:
    // Upload Documents API
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">KYC Documents</h2>

        <p className="text-gray-500 mt-2">
          Upload business verification documents
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {documentList.map((doc) => (
          <div key={doc.key} className="border rounded-xl p-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{doc.title}</h3>

                <p className="text-sm text-gray-500">
                  {doc.required ? "Required Document" : "Optional Document"}
                </p>
              </div>

              {badge(doc.status)}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer flex items-center gap-2">
                <FaUpload />
                Upload
                <input
                  hidden
                  type="file"
                  name={doc.key}
                  onChange={uploadDocument}
                />
              </label>

              <button
                type="button"
                className="border px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100"
              >
                <FaEye />
                Preview
              </button>

              <button
                type="button"
                className="border px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100"
              >
                <FaDownload />
                Download
              </button>

              <button
                type="button"
                className="border border-red-300 text-red-600 px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-red-50"
              >
                <FaTrash />
                Remove
              </button>
            </div>

            {documents[doc.key] && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                <FaFilePdf className="text-red-600 text-2xl" />

                <div>
                  <p className="font-medium">{documents[doc.key].name}</p>

                  <p className="text-sm text-gray-500">
                    {(documents[doc.key].size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="border-t pt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Save KYC Documents
          </button>
        </div>
      </form>
    </div>
  );
}
