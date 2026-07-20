import { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    orders: true,
    shipping: true,
    reviews: true,
    promotions: false,
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Notification Settings</h2>

      {Object.keys(settings).map((key) => (
        <div
          key={key}
          className="flex justify-between items-center py-4 border-b"
        >
          <span className="capitalize">{key}</span>

          <input
            type="checkbox"
            checked={settings[key]}
            onChange={() =>
              setSettings({
                ...settings,
                [key]: !settings[key],
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
