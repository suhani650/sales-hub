import { useState } from "react";

export default function StorePolicies() {
  const [policy, setPolicy] = useState({
    returnPolicy: "7 Days Return",
    shippingPolicy: "Free Shipping Above ₹999",
    cancellation: "Within 24 Hours",
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Store Policies</h2>

      <div className="space-y-5">
        <textarea
          rows={3}
          value={policy.returnPolicy}
          onChange={(e) =>
            setPolicy({ ...policy, returnPolicy: e.target.value })
          }
          className="w-full border rounded-xl p-4"
        />

        <textarea
          rows={3}
          value={policy.shippingPolicy}
          onChange={(e) =>
            setPolicy({ ...policy, shippingPolicy: e.target.value })
          }
          className="w-full border rounded-xl p-4"
        />

        <textarea
          rows={3}
          value={policy.cancellation}
          onChange={(e) =>
            setPolicy({ ...policy, cancellation: e.target.value })
          }
          className="w-full border rounded-xl p-4"
        />
      </div>
    </div>
  );
}
