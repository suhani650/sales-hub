import { useMemo } from "react";
import {
  FaRupeeSign,
  FaPercentage,
  FaMoneyBillWave,
  FaCalculator,
} from "react-icons/fa";

export default function PricingInfo({ formData, updateData }) {
  const handleChange = (e) => {
    updateData({
      [e.target.name]: e.target.value,
    });
  };

  const costPrice = Number(formData.costPrice || 0);
  const mrp = Number(formData.mrp || 0);
  const sellingPrice = Number(formData.sellingPrice || 0);
  const gst = Number(formData.gst || 0);

  const commissionRate = Number(formData.commission || 10);

  const calculations = useMemo(() => {
    const discount =
      mrp > 0 ? (((mrp - sellingPrice) / mrp) * 100).toFixed(2) : 0;

    const commission = (sellingPrice * commissionRate) / 100;

    const gstAmount = (sellingPrice * gst) / 100;

    const profit = sellingPrice - commission - gstAmount - costPrice;

    return {
      discount,
      commission,
      gstAmount,
      profit,
    };
  }, [costPrice, mrp, sellingPrice, gst, commissionRate]);

  return (
    <div className="bg-white rounded-xl shadow-lg border p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Product Pricing</h2>

        <p className="text-gray-500 mt-2">
          Configure product pricing, taxes and earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Price */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaMoneyBillWave />
            Cost Price
          </label>

          <input
            type="number"
            name="costPrice"
            value={formData.costPrice || ""}
            onChange={handleChange}
            placeholder="500"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* MRP */}

        <div>
          <label className="font-semibold flex items-center gap-2">
            <FaRupeeSign />
            MRP
          </label>

          <input
            type="number"
            name="mrp"
            value={formData.mrp || ""}
            onChange={handleChange}
            placeholder="999"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Selling Price */}

        <div>
          <label className="font-semibold">Selling Price</label>

          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice || ""}
            onChange={handleChange}
            placeholder="799"
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>

        {/* Discount */}

        <div>
          <label className="font-semibold">Discount %</label>

          <input
            type="text"
            value={`${calculations.discount}%`}
            readOnly
            className="w-full mt-2 border rounded-lg p-3 bg-gray-100"
          />
        </div>

        {/* GST */}

        <div>
          <label className="font-semibold">GST %</label>

          <select
            name="gst"
            value={formData.gst || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          >
            <option value="">Select GST</option>

            <option value={0}>0%</option>

            <option value={5}>5%</option>

            <option value={12}>12%</option>

            <option value={18}>18%</option>

            <option value={28}>28%</option>
          </select>
        </div>

        {/* Commission */}

        <div>
          <label className="font-semibold">Platform Commission %</label>

          <input
            type="number"
            name="commission"
            value={formData.commission || 10}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </div>
      </div>

      {/* Summary */}

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <FaCalculator />
          Earnings Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-xl p-5">
            <p className="text-gray-500">Selling Price</p>

            <h2 className="text-2xl font-bold mt-2">
              ₹{sellingPrice.toLocaleString()}
            </h2>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <p className="text-gray-500">Commission</p>

            <h2 className="text-2xl font-bold mt-2 text-red-600">
              ₹{calculations.commission.toFixed(2)}
            </h2>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <p className="text-gray-500">GST</p>

            <h2 className="text-2xl font-bold mt-2 text-yellow-600">
              ₹{calculations.gstAmount.toFixed(2)}
            </h2>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-gray-500">Estimated Profit</p>

            <h2 className="text-2xl font-bold mt-2 text-green-600">
              ₹{calculations.profit.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}

      <div className="mt-10 bg-gray-50 rounded-xl p-6 border">
        <h3 className="font-bold text-lg mb-4">Pricing Preview</h3>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>MRP</span>

            <span>₹{mrp.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Selling Price</span>

            <span>₹{sellingPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>

            <span className="text-green-600">{calculations.discount}%</span>
          </div>

          <div className="flex justify-between">
            <span>Platform Fee</span>

            <span>₹{calculations.commission.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>

            <span>₹{calculations.gstAmount.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>You Receive</span>

            <span className="text-green-600">
              ₹{calculations.profit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
