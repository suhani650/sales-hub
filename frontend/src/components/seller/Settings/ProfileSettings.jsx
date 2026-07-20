import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaGlobe,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaCheckCircle,
  FaCamera,
  FaIdCard,
  FaSave,
} from "react-icons/fa";

export default function ProfileSettings() {
  const verification = [
    {
      title: "Email Verified",
      status: "Verified",
      icon: <FaEnvelope />,
    },
    {
      title: "Phone Verified",
      status: "Verified",
      icon: <FaPhone />,
    },
    {
      title: "KYC Status",
      status: "Approved",
      icon: <FaIdCard />,
    },
    {
      title: "Seller Account",
      status: "Active",
      icon: <FaCheckCircle />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Profile Settings</h2>

        <p className="text-gray-500 mt-2">
          Manage personal information, seller profile and verification details
        </p>
      </div>

      {/* Profile Card */}

      <div className="bg-white border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative">
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              className="w-36 h-36 rounded-full object-cover"
            />

            <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full">
              <FaCamera />
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Seller Account</h3>

            <p className="text-gray-500">Premium Marketplace Seller</p>

            <div className="flex gap-3 mt-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Verified
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                KYC Approved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Personal Information</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <InputField
            icon={<FaUser />}
            placeholder="Full Name"
            value="John Seller"
          />

          <InputField
            icon={<FaEnvelope />}
            placeholder="Email"
            value="seller@nexora.com"
          />

          <InputField
            icon={<FaPhone />}
            placeholder="Phone Number"
            value="+91 9876543210"
          />

          <InputField
            icon={<FaMapMarkerAlt />}
            placeholder="Address"
            value="Mumbai, India"
          />
        </div>
      </div>

      {/* Business Information */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Seller Business Details</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <InputField
            icon={<FaBuilding />}
            placeholder="Business Name"
            value="Nexora Store"
          />

          <InputField
            icon={<FaGlobe />}
            placeholder="Website"
            value="www.nexora.com"
          />

          <InputField
            icon={<FaIdCard />}
            placeholder="GST Number"
            value="22AAAAA0000A1Z5"
          />

          <InputField
            icon={<FaCheckCircle />}
            placeholder="Business Type"
            value="Private Limited"
          />
        </div>
      </div>

      {/* Social Links */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Social Profiles</h3>

        <div className="grid md:grid-cols-3 gap-5">
          <InputField icon={<FaLinkedin />} placeholder="LinkedIn" />

          <InputField icon={<FaFacebook />} placeholder="Facebook" />

          <InputField icon={<FaInstagram />} placeholder="Instagram" />
        </div>
      </div>

      {/* Verification */}

      <div className="bg-white border rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-5">Verification Status</h3>

        <div className="grid md:grid-cols-4 gap-5">
          {verification.map((item) => (
            <div key={item.title} className="border rounded-xl p-5 text-center">
              <div className="flex justify-center text-3xl text-green-600">
                {item.icon}
              </div>

              <h4 className="font-semibold mt-3">{item.title}</h4>

              <p className="text-green-600 font-bold mt-2">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}

      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
          <FaSave />
          Save Changes
        </button>
      </div>
    </div>
  );
}

function InputField({ icon, placeholder, value }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-4 text-gray-400">{icon}</div>

      <input
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border rounded-xl pl-10 p-3"
      />
    </div>
  );
}
