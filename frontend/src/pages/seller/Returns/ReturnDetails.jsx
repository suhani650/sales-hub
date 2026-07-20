import ReturnAnalytics from "../../../components/seller/Returns/ReturnAnalytics";

export default function ReturnDetails() {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-2xl border p-6">
        <h1 className="text-3xl font-bold">Return Details</h1>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div>
            <p className="text-gray-500">Return ID</p>
            <h3 className="font-semibold">#RET1001</h3>
          </div>

          <div>
            <p className="text-gray-500">Customer</p>
            <h3 className="font-semibold">Rahul Sharma</h3>
          </div>

          <div>
            <p className="text-gray-500">Reason</p>
            <h3 className="font-semibold">Damaged Product</h3>
          </div>

          <div>
            <p className="text-gray-500">Refund</p>
            <h3 className="font-semibold text-green-600">₹3500</h3>
          </div>
        </div>
      </div>

      <ReturnAnalytics />
    </div>
  );
}
