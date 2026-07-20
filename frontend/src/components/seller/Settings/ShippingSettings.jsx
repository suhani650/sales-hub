import { useState } from "react";

export default function ShippingSettings() {
  const [settings, setSettings] = useState({
    freeShipping: true,
    cod: true,
    international: false,
    express: true,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Shipping Settings</h2>

      <div className="space-y-5">
        {Object.entries(settings).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b pb-4"
          >
            <span className="capitalize font-medium">
              {key.replace(/([A-Z])/g, " $1")}
            </span>

            <input
              type="checkbox"
              checked={value}
              onChange={() => toggle(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
