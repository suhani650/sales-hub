export default function BankDetails() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Account Holder" value="Rahul Sharma" />

        <Field label="Bank Name" value="HDFC Bank" />

        <Field label="Account Number" value="XXXXXX4589" />

        <Field label="IFSC Code" value="HDFC0001234" />

        <Field label="UPI ID" value="seller@upi" />

        <Field label="Branch" value="Noida" />
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input defaultValue={value} className="w-full border rounded-xl p-3" />
    </div>
  );
}
