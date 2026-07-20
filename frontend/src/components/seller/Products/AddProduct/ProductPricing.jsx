import { useEffect } from "react";
import { FaRupeeSign, FaPercentage, FaCalculator } from "react-icons/fa";

export default function ProductPricing({ product, setProduct }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const regularPrice = Number(product.price || 0);
  const salePrice = Number(product.salePrice || 0);
  const costPrice = Number(product.costPrice || 0);
  const gst = Number(product.gst || 0);

  const discount =
    regularPrice > 0
      ? (((regularPrice - salePrice) / regularPrice) * 100).toFixed(2)
      : 0;

  const profit = salePrice - costPrice;

  const profitMargin =
    salePrice > 0 ? ((profit / salePrice) * 100).toFixed(2) : 0;

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      discount,
      profit,
      profitMargin,
    }));
  }, [discount, profit, profitMargin, setProduct]);

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold">Pricing</h2>

        <p className="text-white mt-2">
          Configure product pricing and profit calculations.
        </p>
      </div>

      {/* Pricing Form */}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Regular Price</label>

          <div className="relative mt-2">
            <FaRupeeSign className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              placeholder="0.00"
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

        <div>
          <label className="font-semibold">Sale Price</label>

          <div className="relative mt-2">
            <FaRupeeSign className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              name="salePrice"
              value={product.salePrice || ""}
              onChange={handleChange}
              placeholder="0.00"
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

        <div>
          <label className="font-semibold">Cost Price</label>

          <div className="relative mt-2">
            <FaRupeeSign className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              name="costPrice"
              value={product.costPrice || ""}
              onChange={handleChange}
              placeholder="0.00"
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

        <div>
          <label className="font-semibold">GST (%)</label>

          <div className="relative mt-2">
            <FaPercentage className="absolute left-4 top-4 text-gray-400" />

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
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6">
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
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
        >
          <div className="flex items-center gap-3">
            <FaCalculator className="text-blue-600 text-2xl" />

            <h3 className="font-bold">Discount</h3>
          </div>

          <p className="text-3xl font-bold mt-5 text-blue-700">{discount}%</p>
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
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
        >
          <div className="flex items-center gap-3">
            <FaRupeeSign className="text-green-600 text-2xl" />

            <h3 className="font-bold">Profit</h3>
          </div>

          <p className="text-3xl font-bold mt-5 text-green-700">
            ₹ {profit.toFixed(2)}
          </p>
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
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
        >
          <div className="flex items-center gap-3">
            <FaPercentage className="text-purple-600 text-2xl" />

            <h3 className="font-bold">Profit Margin</h3>
          </div>

          <p className="text-3xl font-bold mt-5 text-purple-700">
            {profitMargin}%
          </p>
        </div>
      </div>

      {/* Price Breakdown */}

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
  outline-none
  transition-all
  duration-300
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-500/20
  hover:border-cyan-400
  hover:bg-slate-900
"
      >
        <h3 className="text-xl font-semibold mb-5">Price Summary</h3>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span>Regular Price</span>
            <span>₹ {regularPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Sale Price</span>
            <span>₹ {salePrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>GST</span>
            <span>{gst}%</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Discount</span>
            <span>{discount}%</span>
          </div>

          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Estimated Profit</span>
            <span className="text-green-600">₹ {profit.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
