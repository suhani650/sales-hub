import { useState } from "react";

export default function StoreProfile() {
  const [form, setForm] = useState({
    storeName: "Tech Store",

    owner: "Rahul Sharma",

    email: "seller@gmail.com",

    phone: "+91 9876543210",

    website: "https://techstore.com",
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Store Profile</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <Input label="Store Name" value={form.storeName} />

        <Input label="Owner Name" value={form.owner} />

        <Input label="Email" value={form.email} />

        <Input label="Phone" value={form.phone} />

        <Input label="Website" value={form.website} />
      </div>
    </div>
  );
}

function Input({ label, value }) {
  return (
    <div>
      <label className="block mb-2 font-medium">{label}</label>

      <input defaultValue={value} className="w-full border rounded-xl p-3" />
    </div>
  );
}
