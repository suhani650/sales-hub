import { useState } from "react";

export default function StorePreferences() {
  const [preferences, setPreferences] = useState({
    currency: "INR",
    timezone: "Asia/Kolkata",
    language: "English",
    theme: "Light",
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Store Preferences</h2>

      <div className="grid md:grid-cols-2 gap-5">
        {Object.keys(preferences).map((item) => (
          <div key={item}>
            <label className="block mb-2 font-medium capitalize">{item}</label>

            <input
              value={preferences[item]}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  [item]: e.target.value,
                })
              }
              className="w-full border rounded-xl p-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
