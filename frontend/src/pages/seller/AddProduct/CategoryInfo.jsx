import { useMemo } from "react";
import { FaTags, FaLayerGroup, FaBuilding, FaStar } from "react-icons/fa";

export default function CategoryInfo({ formData, updateData }) {
  const categories = useMemo(
    () => [
      {
        id: 1,
        name: "Electronics",
        subCategories: [
          "Mobiles",
          "Laptops",
          "Smart Watches",
          "Headphones",
          "Accessories",
        ],
      },
      {
        id: 2,
        name: "Fashion",
        subCategories: ["Men", "Women", "Kids", "Footwear", "Bags"],
      },
      {
        id: 3,
        name: "Home & Kitchen",
        subCategories: ["Furniture", "Kitchen", "Decor", "Lighting"],
      },
      {
        id: 4,
        name: "Sports",
        subCategories: ["Fitness", "Gym", "Outdoor"],
      },
    ],
    [],
  );

  const brands = [
    "Apple",
    "Samsung",
    "Nike",
    "Puma",
    "Sony",
    "Boat",
    "Dell",
    "HP",
    "Lenovo",
    "Custom Brand",
  ];

  const collections = [
    "New Arrival",
    "Trending",
    "Featured",
    "Best Seller",
    "Festival Sale",
  ];

  const selectedCategory = categories.find((c) => c.name === formData.category);

  const subCategories = selectedCategory?.subCategories || [];

  const handleChange = (e) => {
    updateData({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Category & Brand</h2>

        <p className="text-gray-500 mt-2">Select product category and brand.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaTags />
            Main Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Category */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaLayerGroup />
            Sub Category
          </label>

          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select Sub Category</option>

            {subCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaBuilding />
            Brand
          </label>

          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select Brand</option>

            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Collection */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaStar />
            Collection
          </label>

          <select
            name="collection"
            value={formData.collection || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select Collection</option>

            {collections.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Vendor Category */}

        <div>
          <label className="font-semibold">Internal Category Code</label>

          <input
            type="text"
            name="internalCategory"
            value={formData.internalCategory || ""}
            onChange={handleChange}
            placeholder="EX : EL-001"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Tags */}

        <div>
          <label className="font-semibold">Search Keywords</label>

          <input
            type="text"
            name="keywords"
            value={formData.keywords || ""}
            onChange={handleChange}
            placeholder="smartwatch, wearable..."
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>
      </div>

      {/* Product Attributes */}

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-5">Product Attributes</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label>Color</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Black"
            />
          </div>

          <div>
            <label>Size</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="XL"
            />
          </div>

          <div>
            <label>Material</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Leather"
            />
          </div>

          <div>
            <label>Model</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              placeholder="Series 10"
            />
          </div>
        </div>
      </div>

      {/* Category Preview */}

      <div className="mt-10 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Category Preview</h3>

        <div className="flex flex-wrap gap-3">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
            {formData.category || "Category"}
          </span>

          <span className="bg-green-600 text-white px-4 py-2 rounded-full">
            {formData.subCategory || "Sub Category"}
          </span>

          <span className="bg-purple-600 text-white px-4 py-2 rounded-full">
            {formData.brand || "Brand"}
          </span>

          <span className="bg-orange-600 text-white px-4 py-2 rounded-full">
            {formData.collection || "Collection"}
          </span>
        </div>
      </div>
    </div>
  );
}
