import { useMemo, useState } from "react";
import {
  FaSave,
  FaPaperPlane,
  FaCalendarAlt,
  FaEye,
  FaGlobe,
  FaLock,
  FaEyeSlash,
  FaBell,
  FaClipboardCheck,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function ProductPublish({
  product,
  setProduct,
  onSaveDraft,
  onPublish,
}) {
  const [loading, setLoading] = useState(false);

  const publish = product.publish || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      publish: {
        ...prev.publish,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const checklist = useMemo(() => {
    return [
      {
        label: "Product Name",
        completed: !!product.name,
      },
      {
        label: "Images",
        completed: (product.images || []).length > 0,
      },
      {
        label: "Pricing (Price must be > 0)",
        completed: Number(product.price || 0) > 0,
      },
    ];
  }, [product]);

  const completed = checklist.filter((item) => item.completed).length;

  const progress = Math.round((completed / checklist.length) * 100);

  const submit = async (status) => {
    setLoading(true);

    const payload = {
      ...product,
      publish: {
        ...publish,
        status,
      },
    };

    try {
      if (status === "DRAFT" && onSaveDraft) {
        await onSaveDraft(payload);
      }

      if (status === "PUBLISHED" && onPublish) {
        await onPublish(payload);
      }

      console.log(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold">Publish Product</h2>

        <p className="text-gray-500 mt-2">
          Final review before making your product available.
        </p>
      </div>

      {/* Completion */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
      >
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <FaClipboardCheck />
            Product Completion
          </h3>

          <span className="font-bold">{progress}%</span>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              progress >= 80
                ? "bg-green-500"
                : progress >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Checklist */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
      >
        <h3 className="font-semibold mb-5">Validation Checklist</h3>

        <div className="space-y-3">
          {checklist.map((item) => (
            <div key={item.label} className="flex justify-between items-center">
              <span>{item.label}</span>

              {item.completed ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaExclamationTriangle className="text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Publish Settings */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <h3 className="font-semibold mb-5">Visibility</h3>

          <select
            name="visibility"
            value={publish.visibility || "PUBLIC"}
            onChange={handleChange}
            className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
          >
            <option value="PUBLIC">🌍 Public</option>

            <option value="PRIVATE">🔒 Private</option>

            <option value="HIDDEN">🙈 Hidden</option>
          </select>

          <div className="mt-6 space-y-4">
            <label className="flex items-center justify-between border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FaBell />
                Notify Followers
              </div>

              <input
                type="checkbox"
                name="notifyFollowers"
                checked={publish.notifyFollowers || false}
                onChange={handleChange}
              />
            </label>

            <label className="flex items-center justify-between border rounded-xl p-4">
              <div className="flex items-center gap-3">
                <FaEye />
                Featured Product
              </div>

              <input
                type="checkbox"
                name="featured"
                checked={publish.featured || false}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Schedule */}

        <div
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        >
          <h3 className="font-semibold mb-5">Schedule Publishing</h3>

          <div className="space-y-5">
            <div>
              <label>Publish Date</label>

              <input
                type="date"
                name="publishDate"
                value={publish.publishDate || ""}
                onChange={handleChange}
                className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
              />
            </div>

            <div>
              <label>Publish Time</label>

              <input
                type="time"
                name="publishTime"
                value={publish.publishTime || ""}
                onChange={handleChange}
                className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
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
        </div>
      </div>

      {/* Internal Notes */}

      <div
        className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-slate-500
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
      >
        <h3 className="font-semibold mb-4">Internal Notes</h3>

        <textarea
          rows={5}
          name="notes"
          value={publish.notes || ""}
          onChange={handleChange}
          placeholder="Visible only to administrators..."
          className="
  w-full
  mt-3
  rounded-2xl
  border
  border-slate-700
  bg-slate-900/70
  text-white
  placeholder:text-white
  px-5
  py-4
  resize-none
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400"
        />
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-5">
        <div className="border rounded-xl p-5 text-center">
          <FaGlobe className="mx-auto text-3xl text-blue-600" />

          <h4 className="mt-3 font-semibold">Visibility</h4>

          <p className="text-white-500 mt-1">
            {publish.visibility || "PUBLIC"}
          </p>
        </div>

        <div className="border rounded-xl p-5 text-center">
          <FaCalendarAlt className="mx-auto text-3xl text-green-600" />

          <h4 className="mt-3 font-semibold">Schedule</h4>

          <p className="text-gray-500 mt-1">
            {publish.publishDate || "Immediate"}
          </p>
        </div>

        <div className="border rounded-xl p-5 text-center">
          <FaBell className="mx-auto text-3xl text-orange-600" />

          <h4 className="mt-3 font-semibold">Notify</h4>

          <p className="text-gray-500 mt-1">
            {publish.notifyFollowers ? "Enabled" : "Disabled"}
          </p>
        </div>

        <div className="border rounded-xl p-5 text-center">
          {publish.visibility === "PRIVATE" ? (
            <FaLock className="mx-auto text-3xl text-red-500" />
          ) : publish.visibility === "HIDDEN" ? (
            <FaEyeSlash className="mx-auto text-3xl text-gray-500" />
          ) : (
            <FaEye className="mx-auto text-3xl text-green-500" />
          )}

          <h4 className="mt-3 font-semibold">Status</h4>

          <p className="text-gray-500 mt-1">Ready</p>
        </div>
      </div>

      {/* Footer Buttons */}

      <div className="flex flex-wrap justify-end gap-4">
        <button
          disabled={loading}
          onClick={() => submit("DRAFT")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border"
        >
          <FaSave />
          Save Draft
        </button>

        <button
          disabled={loading || progress < 80}
          onClick={() => submit("PUBLISHED")}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600  text-white"
        >
          <FaPaperPlane />
          {loading ? "Publishing..." : "Publish Product"}
        </button>
      </div>
    </div>
  );
}
