export default function BusinessInformation() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Business Information</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Business Name" value="Tech Store Pvt Ltd" />

        <Field label="GST Number" value="07ABCDE1234A1Z2" />

        <Field label="PAN Number" value="ABCDE1234F" />

        <Field label="Business Type" value="Private Limited" />

        <Field label="Registration No." value="U12345DL2022PTC" />

        <Field label="Established" value="2022" />
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
