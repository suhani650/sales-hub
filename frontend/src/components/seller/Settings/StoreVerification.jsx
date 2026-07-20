export default function StoreVerification() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Store Verification</h2>

      <div className="space-y-4">
        <Status title="Business Verification" status="Verified" />

        <Status title="GST Verification" status="Verified" />

        <Status title="Bank Verification" status="Pending" />

        <Status title="Address Verification" status="Verified" />
      </div>
    </div>
  );
}

function Status({ title, status }) {
  return (
    <div className="flex justify-between border-b pb-4">
      <span>{title}</span>

      <span
        className={`font-semibold ${
          status === "Verified" ? "text-green-600" : "text-yellow-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
