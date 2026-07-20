import {
  FaBoxOpen,
  FaImage,
  FaRupeeSign,
  FaWarehouse,
  FaTruck,
  FaTags,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";

export default function ProductPreview({ product }) {
  const images = product.images || [];
  const specifications = product.specifications || [];
  const variants = product.variants || [];
  const shipping = product.shipping || {};
  const seo = product.seo || {};

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-3xl font-bold">Product Preview</h2>

        <p className="text-white-500 mt-2">
          Review your product before publishing.
        </p>
      </div>

      {/* Product Card */}

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
        <div className="grid lg:grid-cols-2">
          {/* Images */}

          <div className="p-6">
            {images.length > 0 ? (
              <>
                <img
                  src={images[0].preview}
                  alt=""
                  className="w-full h-96 object-cover rounded-xl"
                />

                <div className="grid grid-cols-4 gap-3 mt-4">
                  {images.map((img) => (
                    <img
                      key={img.id}
                      src={img.preview}
                      alt=""
                      className="h-24 w-full object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="h-96 flex flex-col justify-center items-center border rounded-xl">
                <FaImage size={60} className="text-gray-300" />

                <p className="mt-4 text-white-400">No Images Uploaded</p>
              </div>
            )}
          </div>

          {/* Product Info */}

          <div className="p-8">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
              {product.category || "Category"}
            </span>

            <h1 className="text-4xl font-bold mt-5">
              {product.name || "Product Name"}
            </h1>

            <p className="text-white-500 mt-4 leading-7">
              {product.description || "Product description will appear here."}
            </p>

            <div className="flex items-center gap-3 mt-8">
              <FaRupeeSign className="text-green-600 text-3xl" />

              <span className="text-4xl font-bold text-green-600">
                {product.salePrice || product.price || 0}
              </span>

              {product.salePrice && (
                <span className="text-white-400 line-through text-xl">
                  ₹{product.price}
                </span>
              )}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="border rounded-xl p-4">
                <p className="text-white-500">SKU</p>

                <h4 className="font-bold">{product.sku || "-"}</h4>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-white-500">Stock</p>

                <h4 className="font-bold">{product.stock || 0}</h4>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-white-500">Brand</p>

                <h4 className="font-bold">{product.brand || "-"}</h4>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-white-500">Rating</p>

                <h4 className="font-bold">★★★★★</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Summary */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
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
          <FaBoxOpen className="text-3xl text-blue-600" />

          <p className="mt-4 text-white-500">Variants</p>

          <h2 className="text-3xl font-bold">{variants.length}</h2>
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
          <FaWarehouse className="text-3xl text-green-600" />

          <p className="mt-4 text-white-500">Stock</p>

          <h2 className="text-3xl font-bold">{product.stock || 0}</h2>
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
          <FaTruck className="text-3xl text-yellow-600" />

          <p className="mt-4 text-white-500">Shipping</p>

          <h2 className="text-lg font-bold">{shipping.shippingClass || "-"}</h2>
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
          <FaSearch className="text-3xl text-purple-600" />

          <p className="mt-4 text-white-500">SEO Score</p>

          <h2 className="text-2xl font-bold">
            {seo.title ? "Good" : "Pending"}
          </h2>
        </div>
      </div>

      {/* Specifications */}

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
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FaTags />
          Specifications
        </h3>

        {specifications.length ? (
          <table className="w-full">
            <tbody>
              {specifications.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 font-semibold w-1/3">{item.key}</td>

                  <td className="py-3">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-white-500">No specifications added.</p>
        )}
      </div>

      {/* Shipping */}

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
        <h3 className="text-xl font-bold mb-6">Shipping Information</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-white-500">Weight</p>

            <h4 className="font-bold">{shipping.weight || 0} kg</h4>
          </div>

          <div>
            <p className="text-white-500">Shipping Cost</p>

            <h4 className="font-bold">₹{shipping.shippingCost || 0}</h4>
          </div>

          <div>
            <p className="text-white-500">Delivery</p>

            <h4 className="font-bold">{shipping.deliveryTime || "-"}</h4>
          </div>

          <div>
            <p className="text-white-500">Zone</p>

            <h4 className="font-bold">{shipping.shippingZone || "-"}</h4>
          </div>
        </div>
      </div>

      {/* SEO */}

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
        <h3 className="text-xl font-bold mb-6">SEO Summary</h3>

        <div className="space-y-4">
          <div>
            <strong>Title:</strong> {seo.title || "-"}
          </div>

          <div>
            <strong>Slug:</strong> {seo.slug || "-"}
          </div>

          <div>
            <strong>Description:</strong>

            <p className="mt-2 text-gray-600">{seo.description || "-"}</p>
          </div>

          <div>
            <strong>Keywords:</strong> {seo.keywords || "-"}
          </div>
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
        <h3 className="font-bold text-green-700 mb-5">Publishing Checklist</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Product Name
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Images Uploaded
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Pricing Added
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Inventory Configured
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            Shipping Configured
          </div>

          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />
            SEO Optimized
          </div>
        </div>
      </div>
    </div>
  );
}
