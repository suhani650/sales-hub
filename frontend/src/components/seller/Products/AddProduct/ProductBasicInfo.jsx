import { FaInfoCircle } from "react-icons/fa";
import { useGetCatalogMetaQuery } from "../../../../services/vendorApi";

const conditions = ["New", "Refurbished", "Used"];

export default function ProductBasicInfo({ product, setProduct }) {
  const { data: catalog, isLoading: catalogLoading } = useGetCatalogMetaQuery();
  const categories = catalog?.categories || [];
  const brands = catalog?.brands || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    const match = categories.find((c) => String(c.id) === id);

    setProduct((prev) => ({
      ...prev,
      categoryId: id,
      category: match?.name || "",
    }));
  };

  const handleBrandChange = (e) => {
    const id = e.target.value;
    const match = brands.find((b) => String(b.id) === id);

    setProduct((prev) => ({
      ...prev,
      brandId: id,
      brand: match?.name || "",
    }));
  };

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div className="border-b pb-5">
        <h2 className="text-2xl font-bold">Product Basic Information</h2>

        <p className="text-gray-500 mt-2">
          Enter the primary information about your product.
        </p>
      </div>

      {/* Product Name */}

      <div>
        <label className="font-semibold">Product Name *</label>

        <input
          type="text"
          placeholder="Enter product name"
          value={product.name}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
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

        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Clear and descriptive names perform better.</span>

          <span>{product.name.length}/150</span>
        </div>
      </div>

      {/* Category */}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Category *</label>

          <select
            name="categoryId"
            value={product.categoryId || ""}
            onChange={handleCategoryChange}
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
  hover:border-cyan-400
"
          >
            <option value="">
              {catalogLoading ? "Loading categories..." : "Select Category"}
            </option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Sub Category</label>

          <input
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            placeholder="e.g. Smartphones"
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
      </div>

      {/* Brand */}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Brand</label>

          <select
            name="brandId"
            value={product.brandId || ""}
            onChange={handleBrandChange}
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
  hover:border-cyan-400
"
          >
            <option value="">
              {catalogLoading ? "Loading brands..." : "Select Brand"}
            </option>

            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Product Condition</label>

          <select
            name="condition"
            value={product.condition || ""}
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
  hover:border-cyan-400
"
          >
            <option value="">Select Condition</option>

            {conditions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Type */}

      <div>
        <label className="font-semibold">Product Type</label>

        <div className="grid md:grid-cols-3 gap-4 mt-3">
          {["Physical", "Digital", "Service"].map((type) => (
            <label
              key={type}
              className={`border rounded-xl p-4 cursor-pointer transition ${
                product.productType === type ? "border-gray-600 bg-cyan" : ""
              }`}
            >
              <input
                type="radio"
                className="mr-2"
                name="productType"
                value={type}
                checked={product.productType === type}
                onChange={handleChange}
              />

              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Short Description */}

      <div>
        <label className="font-semibold">Short Description</label>

        <textarea
          rows={3}
          name="shortDescription"
          value={product.shortDescription || ""}
          onChange={handleChange}
          maxLength={250}
          placeholder="A brief description..."
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
  hover:border-cyan-400
"
        />

        <div className="text-right text-sm text-gray-500 mt-2">
          {(product.shortDescription || "").length}/250
        </div>
      </div>

      {/* Long Description */}

      <div>
        <label className="font-semibold">Product Description</label>

        <textarea
          rows={8}
          name="description"
          value={product.description}
          onChange={handleChange}
          maxLength={3000}
          placeholder="Detailed product description..."
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
  hover:border-cyan-400
"
        />

        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <FaInfoCircle />
            Rich Text Editor can be integrated later.
          </span>

          <span>{product.description.length}/3000</span>
        </div>
      </div>

      {/* Product Details */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="font-semibold">HSN Code</label>

          <input
            name="hsnCode"
            value={product.hsnCode || ""}
            onChange={handleChange}
            placeholder="HSN Code"
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

        <div>
          <label className="font-semibold">GST %</label>

          <input
            type="number"
            name="gst"
            value={product.gst || ""}
            onChange={handleChange}
            placeholder="18"
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

        <div>
          <label className="font-semibold">Barcode</label>

          <input
            name="barcode"
            value={product.barcode || ""}
            onChange={handleChange}
            placeholder="Barcode"
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
      </div>

      {/* Manufacturer */}

      <div>
        <label className="font-semibold">Manufacturer Details</label>

        <textarea
          rows={4}
          name="manufacturer"
          value={product.manufacturer || ""}
          onChange={handleChange}
          placeholder="Manufacturer name, address, support details..."
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
  hover:border-cyan-400
"
        />
      </div>
    </div>
  );
}
