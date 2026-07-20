export default function TaxSettings() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Tax Settings</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="GST Rate" value="18%" />

        <Field label="Tax Category" value="Electronics" />

        <Field label="HSN Code" value="8518" />

        <Field label="TDS Applicable" value="Yes" />
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
