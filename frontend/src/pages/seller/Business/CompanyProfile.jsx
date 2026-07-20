import {
  FaBuilding,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CompanyProfile() {
  const company = {
    name: "ABC Electronics Pvt Ltd",
    owner: "Rahul Sharma",
    email: "support@abcelectronics.com",
    phone: "+91 9876543210",
    website: "www.abcelectronics.com",
    address: "New Delhi, India",
    gst: "07ABCDE1234F1Z5",
    status: "Verified",
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0B1026] to-[#131B3A] p-6">
      {/* Header */}
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        overflow-hidden
        shadow-[0_0_40px_rgba(139,92,246,0.15)]
      "
      >
        {/* Cover */}
        <div className="h-52 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Profile Section */}
        <div className="relative px-8 pb-8">
          <div
            className="
            -mt-16
            w-24 h-24
md:w-32 md:h-32
            rounded-3xl
            bg-gradient-to-br
            from-cyan-400
            via-purple-500
            to-pink-500
            flex items-center justify-center
            text-white text-5xl
            shadow-[0_0_35px_rgba(168,85,247,0.5)]
          "
          >
            <FaBuilding />
          </div>

          <div
            className="
flex
flex-col
gap-5
lg:flex-row
lg:items-center
lg:justify-between
mt-6
"
          >
            <div>
              <h1 className="text-4xl font-bold text-white">{company.name}</h1>

              <div className="flex items-center gap-2 mt-3">
                <FaCheckCircle className="text-green-400" />

                <span className="text-green-400 font-medium">
                  {company.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/seller/company/edit")}
              className="
              mt-5 lg:mt-0
              px-6 py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              text-white
              font-semibold
              hover:scale-105
              transition-all
              shadow-[0_0_25px_rgba(236,72,153,0.4)]
            "
            >
              <FaEdit className="inline mr-2" />
              Edit Company
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <Card title="Total Orders" value="18,462" />
        <Card title="Products" value="2,186" />
        <Card title="Revenue" value="₹8.42 Cr" />
        <Card title="Rating" value="4.8 ★" />
      </div>

      {/* Details */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Company Info */}
        <div
          className="
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
        "
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Company Information
          </h2>

          <InfoRow icon={<FaUserTie />} label="Owner" value={company.owner} />

          <InfoRow icon={<FaEnvelope />} label="Email" value={company.email} />

          <InfoRow icon={<FaPhoneAlt />} label="Phone" value={company.phone} />

          <InfoRow icon={<FaGlobe />} label="Website" value={company.website} />

          <InfoRow
            icon={<FaMapMarkerAlt />}
            label="Address"
            value={company.address}
          />
        </div>

        {/* GST */}
        <div
          className="
          rounded-3xl
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
        "
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Tax & Compliance
          </h2>

          <InfoRow
            icon={<FaFileInvoice />}
            label="GST Number"
            value={company.gst}
          />

          <InfoRow
            icon={<FaCheckCircle />}
            label="Verification"
            value="Approved"
          />

          <InfoRow
            icon={<FaCheckCircle />}
            label="Business Status"
            value="Active"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      className="
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      hover:scale-105
      transition-all
      shadow-[0_0_25px_rgba(139,92,246,0.15)]
    "
    >
      <p className="text-slate-400">{title}</p>

      <h3 className="text-3xl font-bold text-white mt-3">{value}</h3>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/10">
      <div className="flex items-center gap-3 text-slate-300">
        {icon}
        <span>{label}</span>
      </div>

      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
