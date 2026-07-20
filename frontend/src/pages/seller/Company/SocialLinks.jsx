import { useState } from "react";
import {
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaMapMarkerAlt,
  FaSave,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function SocialLinks() {
  const [social, setSocial] = useState({
    website: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    twitter: "",
    whatsapp: "",
    telegram: "",
    googleBusiness: "",
  });

  const handleChange = (e) => {
    setSocial({
      ...social,
      [e.target.name]: e.target.value,
    });
  };

  const links = [
    {
      label: "Website",
      name: "website",
      icon: <FaGlobe className="text-blue-600" />,
      placeholder: "https://company.com",
    },
    {
      label: "Facebook",
      name: "facebook",
      icon: <FaFacebook className="text-blue-700" />,
      placeholder: "https://facebook.com/company",
    },
    {
      label: "Instagram",
      name: "instagram",
      icon: <FaInstagram className="text-pink-600" />,
      placeholder: "https://instagram.com/company",
    },
    {
      label: "LinkedIn",
      name: "linkedin",
      icon: <FaLinkedin className="text-blue-800" />,
      placeholder: "https://linkedin.com/company/...",
    },
    {
      label: "YouTube",
      name: "youtube",
      icon: <FaYoutube className="text-red-600" />,
      placeholder: "https://youtube.com/@company",
    },
    {
      label: "Twitter / X",
      name: "twitter",
      icon: <FaTwitter className="text-sky-500" />,
      placeholder: "https://x.com/company",
    },
    {
      label: "WhatsApp Business",
      name: "whatsapp",
      icon: <FaWhatsapp className="text-green-600" />,
      placeholder: "https://wa.me/919876543210",
    },
    {
      label: "Telegram",
      name: "telegram",
      icon: <FaTelegram className="text-blue-500" />,
      placeholder: "https://t.me/company",
    },
    {
      label: "Google Business",
      name: "googleBusiness",
      icon: <FaMapMarkerAlt className="text-red-500" />,
      placeholder: "Google Business Profile URL",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(social);

    // TODO API
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="border-b p-6">
        <h2 className="text-2xl font-semibold">
          Social Media & Business Links
        </h2>

        <p className="text-gray-500 mt-2">Add your public business profiles.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {links.map((item) => (
          <div key={item.name} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3 flex items-center gap-3 font-medium">
              {item.icon}

              {item.label}
            </div>

            <div className="col-span-8">
              <input
                type="url"
                name={item.name}
                value={social[item.name]}
                onChange={handleChange}
                placeholder={item.placeholder}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="col-span-1 flex justify-center">
              {social[item.name] && (
                <a
                  href={social[item.name]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        ))}

        <div className="border-t pt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            <FaSave />
            Save Social Links
          </button>
        </div>
      </form>
    </div>
  );
}
