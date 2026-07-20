import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaImage,
  FaPalette,
  FaRulerCombined,
  FaBarcode,
  FaBoxes,
  FaRupeeSign,
} from "react-icons/fa";

const colors = [
  "Black",
  "White",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Gray",
  "Pink",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function ProductVariants({ product, setProduct }) {
  const [preview, setPreview] = useState(null);

  const variants = product.variants || [];

  const updateVariants = (list) => {
    setProduct((prev) => ({
      ...prev,
      variants: list,
    }));
  };

  const addVariant = () => {
    updateVariants([
      ...variants,
      {
        id: Date.now(),
        color: "",
        size: "",
        sku: "",
        barcode: "",
        price: "",
        stock: "",
        weight: "",
        image: null,
      },
    ]);
  };

  const removeVariant = (id) => {
    updateVariants(variants.filter((v) => v.id !== id));
  };

  const handleChange = (id, field, value) => {
    updateVariants(
      variants.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const handleImage = (e, variantId) => {
    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    updateVariants(
      variants.map((item) =>
        item.id === variantId
          ? {
              ...item,
              image: url,
            }
          : item,
      ),
    );
  };

  const totalStock = variants.reduce(
    (sum, item) => sum + Number(item.stock || 0),
    0,
  );

  const totalVariants = variants.length;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Variants</h2>

          <p className="text-slate-400 mt-2">
            Create unlimited product variants.
          </p>
        </div>

        <button
          onClick={addVariant}
          className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:scale-105 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 font-semibold"
        >
          <FaPlus />
          Add Variant
        </button>
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
          <p className="text-slate-400">Total Variants</p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-2">
            {totalVariants}
          </h2>
        </div>

        <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
          <p className="text-slate-400">Total Stock</p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {totalStock}
          </h2>
        </div>
      </div>

      {/* Variant Cards */}

      {variants.map((variant, index) => (
        <div
          key={variant.id}
          className="bg-[#0F172A] border border-white/10 rounded-2xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              Variant #{index + 1}
            </h3>

            <button
              onClick={() => removeVariant(variant.id)}
              className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition"
            >
              <FaTrash size={18} />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Color */}

            <div>
              <label className="font-medium text-slate-300">Color</label>

              <div className="relative mt-2">
                <FaPalette className="absolute left-4 top-4 text-slate-500" />

                <select
                  value={variant.color}
                  onChange={(e) =>
                    handleChange(variant.id, "color", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white pl-10 pr-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                >
                  <option value="">Select Color</option>

                  {colors.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Size */}

            <div>
              <label className="font-medium text-slate-300">Size</label>

              <div className="relative mt-2">
                <FaRulerCombined className="absolute left-4 top-4 text-slate-500" />

                <select
                  value={variant.size}
                  onChange={(e) =>
                    handleChange(variant.id, "size", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white pl-10 pr-4 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                >
                  <option value="">Select Size</option>

                  {sizes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SKU */}

            <div>
              <label className="font-medium text-slate-300">SKU</label>

              <div className="relative mt-2">
                <FaBarcode className="absolute left-4 top-4 text-slate-500" />

                <input
                  value={variant.sku}
                  onChange={(e) =>
                    handleChange(variant.id, "sku", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 pl-10 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Variant SKU"
                />
              </div>
            </div>

            {/* Barcode */}

            <div>
              <label className="font-medium text-slate-300">Barcode</label>

              <div className="relative mt-2">
                <FaBarcode className="absolute left-4 top-4 text-slate-500" />

                <input
                  value={variant.barcode}
                  onChange={(e) =>
                    handleChange(variant.id, "barcode", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 pl-10 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Barcode"
                />
              </div>
            </div>

            {/* Price */}

            <div>
              <label className="font-medium text-slate-300">Price</label>

              <div className="relative mt-2">
                <FaRupeeSign className="absolute left-4 top-4 text-slate-500" />

                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    handleChange(variant.id, "price", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 pl-10 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Price"
                />
              </div>
            </div>

            {/* Stock */}

            <div>
              <label className="font-medium text-slate-300">Stock</label>

              <div className="relative mt-2">
                <FaBoxes className="absolute left-4 top-4 text-slate-500" />

                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleChange(variant.id, "stock", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 pl-10 py-3 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Stock"
                />
              </div>
            </div>

            {/* Weight */}

            <div>
              <label className="font-medium text-slate-300">Weight (kg)</label>

              <input
                type="number"
                value={variant.weight}
                onChange={(e) =>
                  handleChange(variant.id, "weight", e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900/70 text-white px-4 py-3 mt-2 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300"
              />
            </div>

            {/* Image */}

            <div>
              <label className="font-medium text-slate-300">
                Variant Image
              </label>

              <label className="border-2 border-dashed border-white/10 rounded-xl p-6 mt-2 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-all duration-300">
                <FaImage size={35} className="text-slate-500" />

                <span className="mt-2 text-sm text-slate-400">
                  Upload Image
                </span>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, variant.id)}
                />
              </label>
            </div>
          </div>

          {variant.image && (
            <div className="mt-6">
              <img
                src={variant.image}
                alt=""
                onClick={() => setPreview(variant.image)}
                className="w-36 h-36 rounded-xl border border-white/10 object-cover cursor-pointer hover:scale-105 transition"
              />
            </div>
          )}
        </div>
      ))}

      {variants.length === 0 && (
        <div className="border-2 border-dashed border-white/10 rounded-xl p-16 text-center">
          <FaBoxes size={60} className="mx-auto text-slate-600" />

          <h3 className="mt-5 text-xl font-semibold text-white">
            No Variants Added
          </h3>

          <p className="text-slate-400 mt-2">
            Click "Add Variant" to create product variants.
          </p>
        </div>
      )}

      {/* Preview Modal */}

      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={preview}
            alt=""
            className="max-w-3xl max-h-[90vh] rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
