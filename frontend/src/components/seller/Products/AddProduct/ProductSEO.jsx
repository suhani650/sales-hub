import { useEffect, useMemo } from "react";
import {
  FaSearch,
  FaLink,
  FaGlobe,
  FaRobot,
  FaTags,
  FaChartLine,
} from "react-icons/fa";

export default function ProductSEO({ product, setProduct }) {
  const seo = product.seo || {};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    if (!seo.slug && product.name) {
      const slug = product.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      setProduct((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          slug,
        },
      }));
    }
  }, [product.name]);

  const seoScore = useMemo(() => {
    let score = 0;

    if ((seo.title || "").length >= 30) score += 20;
    if ((seo.title || "").length <= 60) score += 10;

    if (
      (seo.description || "").length >= 120 &&
      (seo.description || "").length <= 160
    )
      score += 30;

    if ((seo.keywords || "").length > 5) score += 20;

    if (seo.slug) score += 10;

    if (seo.ogTitle) score += 10;

    return score;
  }, [seo]);

  const scoreColor =
    seoScore >= 80
      ? "bg-green-500"
      : seoScore >= 50
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">SEO Optimization</h2>

        <p className="text-white-500 mt-2">
          Optimize your product for Google, Bing and social media.
        </p>
      </div>

      {/* SEO Score */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <FaChartLine className="text-blue-600 text-xl" />

            <h3 className="font-semibold">SEO Score</h3>
          </div>

          <span className="font-bold text-xl">{seoScore}/100</span>
        </div>

        <div
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <div
            className={`${scoreColor} h-4 rounded-full transition-all`}
            style={{
              width: `${seoScore}%`,
            }}
          />
        </div>
      </div>

      {/* Main Form */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* SEO Title */}

        <div>
          <label className="font-semibold">SEO Title</label>

          <div className="relative mt-2">
            <FaSearch className="absolute left-4 top-4 mt-2 text-white-400" />

            <input
              type="text"
              name="title"
              value={seo.title || ""}
              onChange={handleChange}
              maxLength={60}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            />
          </div>

          <p className="text-xs text-white-400 mt-1">
            {(seo.title || "").length}/60
          </p>
        </div>

        {/* URL Slug */}

        <div>
          <label className="font-semibold">URL Slug</label>

          <div className="relative mt-2">
            <FaLink className="absolute left-4 top-4 mt-2 text-white-400" />

            <input
              type="text"
              name="slug"
              value={seo.slug || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            />
          </div>
        </div>

        {/* Meta Description */}

        <div className="lg:col-span-2">
          <label className="font-semibold">Meta Description</label>

          <textarea
            rows={4}
            maxLength={160}
            name="description"
            value={seo.description || ""}
            onChange={handleChange}
            className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
          />

          <p className="text-xs text-gray-400 mt-1">
            {(seo.description || "").length}/160
          </p>
        </div>

        {/* Keywords */}

        <div>
          <label className="font-semibold">Keywords</label>

          <div className="relative mt-2">
            <FaTags className="absolute left-4 top-4 mt-2 text-white-400" />

            <input
              name="keywords"
              value={seo.keywords || ""}
              onChange={handleChange}
              placeholder="mobile, samsung, android"
              className="
  w-full
  mt-5
  pt-6
  mb-4
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Separate keywords with commas.
          </p>
        </div>

        {/* Robots */}

        <div>
          <label className="font-semibold">Robots</label>

          <div className="relative mt-2">
            <FaRobot className="absolute left-4 mt-2 top-4 text-white-400" />

            <select
              name="robots"
              value={seo.robots || "index"}
              onChange={handleChange}
              className="
  w-full
  mt-5
  pt-6
  mb-4
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            >
              <option value="index">Index</option>

              <option value="noindex">No Index</option>

              <option value="nofollow">No Follow</option>

              <option value="none">None</option>
            </select>
          </div>
        </div>

        {/* Open Graph */}

        <div>
          <label className="font-semibold">Open Graph Title</label>

          <div className="relative mt-2">
            <FaGlobe className="absolute left-4 top-4 text-gray-400" />

            <input
              name="ogTitle"
              value={seo.ogTitle || ""}
              onChange={handleChange}
              className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
            />
          </div>
        </div>

        {/* OG Image */}

        <div>
          <label className="font-semibold">Social Share Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              const preview = URL.createObjectURL(file);

              setProduct((prev) => ({
                ...prev,
                seo: {
                  ...prev.seo,
                  ogImage: preview,
                },
              }));
            }}
            className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
          />
        </div>
      </div>

      {/* Preview */}

      {seo.ogImage && (
        <div className="bg-[#0F172A] border border-white/10 rounded-xl p-6">
          <h3 className="font-semibold mb-4 text-white">Social Preview</h3>

          <img
            src={seo.ogImage}
            alt="Preview"
            className="w-64 rounded-xl border border-white/10"
          />
        </div>
      )}

      {/* SEO Checklist */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  px-5
  py-4
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
      >
        <h3 className="font-semibold text-blue-700 mb-4">SEO Checklist</h3>

        <div className="space-y-2 text-white-700">
          <p>
            {seo.title?.length >= 30 ? "✅" : "❌"} SEO title between 30–60
            characters
          </p>

          <p>
            {seo.description?.length >= 120 ? "✅" : "❌"} Meta description
            between 120–160 characters
          </p>

          <p>{seo.slug ? "✅" : "❌"} SEO friendly URL slug</p>

          <p>{seo.keywords ? "✅" : "❌"} Keywords added</p>

          <p>{seo.ogTitle ? "✅" : "❌"} Open Graph title configured</p>

          <p>{seo.ogImage ? "✅" : "❌"} Social image uploaded</p>
        </div>
      </div>
    </div>
  );
}
