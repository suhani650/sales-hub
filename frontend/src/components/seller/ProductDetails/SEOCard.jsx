import {
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLink,
  FaTag,
  FaGlobe,
  FaChartLine,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export default function SEOCard({ product = {} }) {
  const {
    seo = {
      score: 86,
      metaTitle: "Apple iPhone 16 Pro | Buy Online at Best Price",
      metaDescription:
        "Buy Apple iPhone 16 Pro with official warranty, fast delivery and secure payments.",
      slug: "apple-iphone-16-pro",
      keywords: [
        "iphone 16 pro",
        "apple mobile",
        "best smartphone",
        "iphone price",
      ],
    },
  } = product;

  const getStatus = (score) => {
    if (score >= 80)
      return {
        label: "Excellent",
        color: "text-green-600 bg-green-100",
      };

    if (score >= 60)
      return {
        label: "Good",
        color: "text-yellow-700 bg-yellow-100",
      };

    return {
      label: "Poor",
      color: "text-red-600 bg-red-100",
    };
  };

  const status = getStatus(seo.score);

  const tips = [
    "Add more product keywords in description.",
    "Include product specifications in content.",
    "Optimize image ALT tags.",
    "Add FAQ schema markup.",
    "Keep meta title below 60 characters.",
    "Keep meta description between 140–160 characters.",
  ];

  const warnings = [
    "Open Graph image missing.",
    "Twitter Card not configured.",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Optimization</h2>

          <p className="text-gray-500 mt-1">
            Search engine optimization dashboard
          </p>
        </div>

        <div className={`px-4 py-2 rounded-full font-semibold ${status.color}`}>
          SEO Score {seo.score}/100
        </div>
      </div>

      {/* KPI */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card
          title="SEO Score"
          value={`${seo.score}%`}
          icon={<FaChartLine />}
          color="blue"
        />

        <Card
          title="Health"
          value={status.label}
          icon={<FaCheckCircle />}
          color="green"
        />

        <Card
          title="Keywords"
          value={seo.keywords.length}
          icon={<FaTag />}
          color="purple"
        />

        <Card title="Slug" value="Ready" icon={<FaLink />} color="orange" />
      </div>

      {/* Meta */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold mb-5">Meta Information</h3>

          <Field label="Meta Title" value={seo.metaTitle} />

          <Field label="Meta Description" value={seo.metaDescription} />

          <Field label="URL Slug" value={`/${seo.slug}`} />
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold mb-5">Focus Keywords</h3>

          <div className="flex flex-wrap gap-3">
            {seo.keywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Google Preview */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <FaSearch className="text-blue-600" />
          <h3 className="font-bold">Google Search Preview</h3>
        </div>

        <div className="border rounded-xl p-5">
          <p className="text-green-700 text-sm">
            https://yourstore.com/{seo.slug}
          </p>

          <h3 className="text-blue-700 text-xl mt-2 font-medium">
            {seo.metaTitle}
          </h3>

          <p className="text-gray-600 mt-2">{seo.metaDescription}</p>
        </div>
      </div>

      {/* Social Preview */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            Product Image
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <FaFacebook className="text-blue-600" />
              <h4 className="font-semibold">Facebook Preview</h4>
            </div>

            <p className="font-semibold">{seo.metaTitle}</p>

            <p className="text-gray-500 text-sm mt-2">{seo.metaDescription}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            Product Image
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <FaTwitter className="text-sky-500" />
              <h4 className="font-semibold">Twitter Preview</h4>
            </div>

            <p className="font-semibold">{seo.metaTitle}</p>

            <p className="text-gray-500 text-sm mt-2">{seo.metaDescription}</p>
          </div>
        </div>
      </div>

      {/* Tips */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold mb-5 text-green-700">Optimization Tips</h3>

          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip} className="flex gap-3">
                <FaCheckCircle className="text-green-600 mt-1" />

                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h3 className="font-bold mb-5 text-red-600">SEO Warnings</h3>

          <div className="space-y-4">
            {warnings.map((warning) => (
              <div key={warning} className="flex gap-3">
                <FaExclamationTriangle className="text-red-600 mt-1" />

                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-gray-500 mt-5">{title}</p>

      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="mb-5">
      <label className="block text-gray-500 mb-2">{label}</label>

      <div className="border rounded-xl p-3 bg-gray-50">{value}</div>
    </div>
  );
}
