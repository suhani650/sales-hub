import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaClipboardList,
  FaSearch,
  FaFileImport,
} from "react-icons/fa";

export default function ProductSpecifications({ product, setProduct }) {
  const [search, setSearch] = useState("");

  const specifications = product.specifications || [];

  const updateSpecifications = (list) => {
    setProduct((prev) => ({
      ...prev,
      specifications: list,
    }));
  };

  const addSpecification = () => {
    updateSpecifications([
      ...specifications,
      {
        id: Date.now(),
        key: "",
        value: "",
      },
    ]);
  };

  const removeSpecification = (id) => {
    updateSpecifications(specifications.filter((item) => item.id !== id));
  };

  const handleChange = (id, field, value) => {
    updateSpecifications(
      specifications.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const importTemplate = () => {
    const template = [
      {
        id: Date.now() + 1,
        key: "Brand",
        value: "",
      },
      {
        id: Date.now() + 2,
        key: "Model",
        value: "",
      },
      {
        id: Date.now() + 3,
        key: "Material",
        value: "",
      },
      {
        id: Date.now() + 4,
        key: "Weight",
        value: "",
      },
      {
        id: Date.now() + 5,
        key: "Warranty",
        value: "",
      },
    ];

    updateSpecifications(template);
  };

  const filtered = specifications.filter(
    (item) =>
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      item.value.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Product Specifications
          </h2>

          <p className="text-slate-400 mt-2">
            Add technical details and product attributes.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={importTemplate}
            className="border border-white/10 text-white rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
          >
            <FaFileImport />
            Import Template
          </button>

          <button
            onClick={addSpecification}
            className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:scale-105 text-white rounded-xl px-5 py-3 flex items-center gap-2 transition-all duration-300 font-semibold"
          >
            <FaPlus />
            Add Specification
          </button>
        </div>
      </div>

      {/* Search */}

      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-white" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search specification..."
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
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
        />
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
          <p className="text-slate-400">Total Specifications</p>

          <h2 className="text-4xl font-bold text-indigo-400 mt-2">
            {specifications.length}
          </h2>
        </div>

        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
          <p className="text-slate-400">Completed</p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {specifications.filter((item) => item.key && item.value).length}
          </h2>
        </div>

        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
          <p className="text-slate-400">Remaining</p>

          <h2 className="text-4xl font-bold text-orange-400 mt-2">
            {specifications.filter((item) => !item.value).length}
          </h2>
        </div>
      </div>

      {/* Specification List */}

      {filtered.length === 0 ? (
        <div className="border-2 border-dashed border-white/10 rounded-xl p-16 text-center">
          <FaClipboardList size={60} className="mx-auto text-slate-600" />

          <h3 className="text-xl font-semibold mt-5 text-white">
            No Specifications
          </h3>

          <p className="text-slate-400 mt-2">
            Click "Add Specification" to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border border-white/10 rounded-xl p-5 bg-[#0F172A] shadow-sm"
            >
              <div className="grid lg:grid-cols-2 gap-5">
                <div>
                  <label className="font-medium text-slate-300">
                    Attribute
                  </label>

                  <input
                    value={item.key}
                    maxLength={50}
                    onChange={(e) =>
                      handleChange(item.id, "key", e.target.value)
                    }
                    placeholder="Example: Screen Size"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 px-4 py-3 mt-2 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                  />

                  <p className="text-xs text-slate-500 mt-1">
                    {item.key.length}/50
                  </p>
                </div>

                <div>
                  <label className="font-medium text-slate-300">Value</label>

                  <textarea
                    rows={3}
                    maxLength={200}
                    value={item.value}
                    onChange={(e) =>
                      handleChange(item.id, "value", e.target.value)
                    }
                    placeholder="Example: 6.7 inch AMOLED Display"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 px-4 py-3 mt-2 resize-none outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                  />

                  <p className="text-xs text-slate-500 mt-1">
                    {item.value.length}/200
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => removeSpecification(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}

      <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
        <h3 className="font-semibold text-indigo-400">💡 Tips</h3>

        <ul className="list-disc ml-6 mt-3 text-slate-300 space-y-2">
          <li>Add complete technical specifications.</li>
          <li>Include dimensions, weight and material.</li>
          <li>Specifications improve SEO and product filtering.</li>
          <li>Customers compare products using these attributes.</li>
        </ul>
      </div>
    </div>
  );
}
