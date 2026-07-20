import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaImage,
  FaRupeeSign,
  FaWarehouse,
  FaLayerGroup,
  FaListAlt,
  FaTruck,
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaRocket,
  FaFire,
  FaChartLine,
  FaSave,
} from "react-icons/fa";

import {
  useCreateProductMutation,
  useUploadFileMutation,
} from "../../../services/vendorApi";

import ProductBasicInfo from "../../../components/seller/Products/AddProduct/ProductBasicInfo";
import ProductImages from "../../../components/seller/Products/AddProduct/ProductImages";
import ProductPricing from "../../../components/seller/Products/AddProduct/ProductPricing";
import ProductInventory from "../../../components/seller/Products/AddProduct/ProductInventory";
import ProductVariants from "../../../components/seller/Products/AddProduct/ProductVariants";
import ProductSpecifications from "../../../components/seller/Products/AddProduct/ProductSpecifications";
import ProductShipping from "../../../components/seller/Products/AddProduct/ProductShipping";
import ProductSEO from "../../../components/seller/Products/AddProduct/ProductSEO";
import ProductPreview from "../../../components/seller/Products/AddProduct/ProductPreview";
import ProductPublish from "../../../components/seller/Products/AddProduct/ProductPublish";

export default function AddProduct() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState("");

  const [createProduct] = useCreateProductMutation();
  const [uploadFile] = useUploadFileMutation();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    categoryId: "",
    subCategory: "",
    brand: "",
    brandId: "",
    description: "",
    images: [],
    price: "",
    salePrice: "",
    discountPrice: "",
    stock: "",
    sku: "",
    variants: [],
    specifications: [],
    shipping: {},
    seo: {},
  });

  const steps = [
    {
      id: 1,
      title: "Basic Info",
      icon: <FaBoxOpen />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      title: "Images",
      icon: <FaImage />,
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 3,
      title: "Pricing",
      icon: <FaRupeeSign />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      title: "Inventory",
      icon: <FaWarehouse />,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Variants",
      icon: <FaLayerGroup />,
      color: "from-purple-500 to-fuchsia-600",
    },
    {
      id: 6,
      title: "Specifications",
      icon: <FaListAlt />,
      color: "from-indigo-500 to-violet-600",
    },
    {
      id: 7,
      title: "Shipping",
      icon: <FaTruck />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 8,
      title: "SEO",
      icon: <FaSearch />,
      color: "from-sky-500 to-cyan-600",
    },
    {
      id: 9,
      title: "Preview",
      icon: <FaEye />,
      color: "from-teal-500 to-cyan-600",
    },
    {
      id: 10,
      title: "Publish",
      icon: <FaCheckCircle />,
      color: "from-green-500 to-emerald-700",
    },
  ];

  const next = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const previous = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / steps.length) * 100;

  // Uploads any locally-picked image files to Cloudinary via the real
  // upload endpoint, returning plain URL strings ready for the product
  // payload. Images that are already URLs (e.g. re-edited drafts) pass
  // through untouched.
  const resolveImageUrls = async () => {
    const urls = [];

    for (const img of product.images || []) {
      if (typeof img === "string") {
        urls.push(img);
        continue;
      }

      if (img.url) {
        urls.push(img.url);
        continue;
      }

      if (img.file) {
        const formData = new FormData();
        formData.append("image", img.file);
        const res = await uploadFile(formData).unwrap();
        urls.push(res.url);
      }
    }

    return urls;
  };

  const submitProduct = async (status) => {
    setSubmitError("");

    const images = await resolveImageUrls();

    const payload = {
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      brandId: product.brandId || undefined,
      sku: product.sku,
      price: Number(product.salePrice || product.price || 0),
      mrp: Number(product.price || 0),
      stock: Number(product.stock || 0),
      images,
      status,
    };

    const created = await createProduct(payload).unwrap();
    return created;
  };

  const handleSaveDraft = async () => {
    try {
      await submitProduct("DRAFT");
      navigate("/seller/products");
    } catch (err) {
      setSubmitError(
        err?.data?.message ||
          "Could not save draft. Please check required fields.",
      );
    }
  };

  const handlePublish = async () => {
    try {
      await submitProduct("ACTIVE");
      navigate("/seller/products");
    } catch (err) {
      setSubmitError(
        err?.data?.message ||
          "Could not publish product. Please check required fields.",
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-pink-600/30 blur-[180px]" />

        <div className="absolute right-0 top-20 h-[480px] w-[480px] rounded-full bg-indigo-600/30 blur-[180px]" />

        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-cyan-600/20 blur-[180px]" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* HERO */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
        >
          <div className="flex flex-col xl:flex-row justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-pink-500/20 px-5 py-2 text-pink-300">
                <FaFire />
                Enterprise Product Wizard
              </div>

              <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black">
                Add New Product
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-white/70">
                Create professional products with images, pricing, inventory,
                shipping, SEO and publish directly to your marketplace.
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-[1px]"
            >
              <div className="w-full lg:w-[360px] rounded-3xl bg-[#0B1225] p-8">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Product Progress</span>

                  <FaChartLine size={28} className="text-pink-400" />
                </div>

                <h2 className="mt-6 text-3xl lg:text-4xl font-black">
                  {Math.round(progress)}%
                </h2>

                <div className="mt-5 w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 duration-500"
                  />
                </div>

                <p className="mt-4 text-white/60">
                  Step {step} of {steps.length}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* =========================
          PREMIUM STEPPER
      ========================= */}

        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 overflow-x-auto">
          {/* Progress Line */}

          <div className="relative mb-12">
            <div className="absolute top-7 left-0 right-0 h-1 bg-slate-700 rounded-full"></div>

            <div
              style={{
                width: `${((step - 1) / (steps.length - 1)) * 100}%`,
              }}
              className="absolute top-7 left-0 h-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 duration-500"
            ></div>

            <div className="relative flex justify-between min-w-[1100px]">
              {steps.map((item) => (
                <div key={item.id} className="flex flex-col items-center group">
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-500 border-2

                  ${
                    step === item.id
                      ? `bg-gradient-to-r ${item.color} border-transparent scale-110 shadow-[0_0_30px_rgba(34,211,238,.45)]`
                      : step > item.id
                        ? "bg-green-500 border-green-400"
                        : "bg-[#162033] border-slate-600 group-hover:border-cyan-500"
                  }
                  `}
                  >
                    {step > item.id ? <FaCheckCircle /> : item.icon}

                    {step === item.id && (
                      <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30"></span>
                    )}
                  </div>

                  <h4
                    className={`mt-4 font-semibold

                  ${
                    step === item.id
                      ? "text-cyan-400"
                      : step > item.id
                        ? "text-green-400"
                        : "text-slate-400"
                  }
                  `}
                  >
                    {item.title}
                  </h4>

                  <span className="text-xs text-slate-500">Step {item.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================
            DASHBOARD CARDS
      ========================= */}

        <div className="grid xl:grid-cols-3 gap-6">
          {/* Current */}

          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl text-white">
                {steps[step - 1].icon}
              </div>

              <div>
                <p className="text-white/60">Current Step</p>

                <h2 className="text-2xl font-black">{steps[step - 1].title}</h2>
              </div>
            </div>
          </motion.div>

          {/* Completed */}

          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl">
                <FaCheckCircle />
              </div>

              <div>
                <p className="text-white/60">Completed</p>

                <h2 className="text-2xl font-black">
                  {step - 1} / {steps.length}
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Auto Save */}

          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl">
                <FaSave />
              </div>

              <div>
                <p className="text-white/60">Auto Save</p>

                <h2 className="text-2xl font-black text-green-400">Enabled</h2>
              </div>
            </div>
          </motion.div>
        </div>
        {/* ===========================
          FORM CONTAINER
      =========================== */}

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
          {/* STEP COMPONENT */}

          {step === 1 && (
            <ProductBasicInfo product={product} setProduct={setProduct} />
          )}

          {step === 2 && (
            <ProductImages product={product} setProduct={setProduct} />
          )}

          {step === 3 && (
            <ProductPricing product={product} setProduct={setProduct} />
          )}

          {step === 4 && (
            <ProductInventory product={product} setProduct={setProduct} />
          )}

          {step === 5 && (
            <ProductVariants product={product} setProduct={setProduct} />
          )}

          {step === 6 && (
            <ProductSpecifications product={product} setProduct={setProduct} />
          )}

          {step === 7 && (
            <ProductShipping product={product} setProduct={setProduct} />
          )}

          {step === 8 && (
            <ProductSEO product={product} setProduct={setProduct} />
          )}

          {step === 9 && <ProductPreview product={product} />}

          {step === 10 && (
            <ProductPublish
              product={product}
              setProduct={setProduct}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
            />
          )}

          {submitError && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {submitError}
            </div>
          )}
        </div>

        {/* ===========================
          LIVE PRODUCT SUMMARY
      =========================== */}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-[30px] bg-gradient-to-br from-[#111827] via-[#182235] to-[#1F2937] border border-cyan-500/20 p-7 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Live Product Summary
                </h2>
                <p className="text-slate-400 mt-1">
                  Product information updates instantly.
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-2xl text-white">
                <FaBoxOpen />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-cyan-500 transition">
                <p className="text-slate-400 text-sm">Product</p>

                <h3 className="text-white font-semibold text-lg mt-2">
                  {product.name || "Not Added"}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-purple-500 transition">
                <p className="text-slate-400 text-sm">Category</p>

                <h3 className="text-white font-semibold text-lg mt-2">
                  {product.category || "Not Selected"}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-green-500 transition">
                <p className="text-slate-400 text-sm">Brand</p>

                <h3 className="text-white font-semibold text-lg mt-2">
                  {product.brand || "-"}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-pink-500 transition">
                <p className="text-slate-400 text-sm">Price</p>

                <h3 className="text-2xl font-bold text-green-400 mt-2">
                  ₹ {product.price || 0}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-orange-500 transition">
                <p className="text-slate-400 text-sm">Stock</p>

                <h3 className="text-white font-semibold text-lg mt-2">
                  {product.stock || 0}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-cyan-500 transition">
                <p className="text-slate-400 text-sm">Images</p>

                <h3 className="text-white font-semibold text-lg mt-2">
                  {product.images?.length || 0}
                </h3>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0F172A] p-5 hover:border-cyan-500 transition">
              <p className="text-slate-400 text-sm">Description</p>

              <p className="text-slate-200 mt-3 leading-7">
                {product.description || "No description added yet."}
              </p>
            </div>
          </div>

          {/* SELLER TIPS */}

          <div className="rounded-[30px] bg-gradient-to-br from-[#111827] via-[#182235] to-[#1F2937] border border-cyan-500/20 p-7 shadow-xl">
            <h2 className="text-3xl font-bold mb-8">Seller Tips</h2>

            <div className="space-y-5">
              {[
                "📸 Upload 5-8 HD product images.",
                "💰 Keep competitive pricing.",
                "🚚 Add accurate shipping details.",
                "⭐ Fill SEO title & description.",
                "📦 Update inventory regularly.",
              ].map((tip, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 hover:bg-white/20 transition-all duration-300"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ===========================
            FOOTER
      =========================== */}

        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0F172A] to-[#1E293B] p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Previous */}

            <button
              onClick={previous}
              disabled={step === 1}
              className="flex items-center gap-3 px-7 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all duration-300 hover:scale-105"
            >
              <FaArrowLeft />
              Previous
            </button>

            {/* Center */}

            <div className="text-center">
              <h3 className="text-white text-xl font-bold">
                Step {step} of {steps.length}
              </h3>

              <p className="text-slate-400 mt-2">{steps[step - 1].title}</p>

              <div className="mt-4 w-72 h-3 rounded-full bg-slate-700 overflow-hidden">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 duration-500"
                />
              </div>
            </div>

            {/* Right */}

            {step !== steps.length ? (
              <button
                onClick={next}
                className="flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 hover:shadow-xl transition-all duration-300 text-white font-semibold"
              >
                Next Step
                <FaArrowRight />
              </button>
            ) : (
              <button className="flex items-center gap-3 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 hover:shadow-xl transition-all duration-300 text-white font-semibold">
                <FaRocket />
                Publish Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
