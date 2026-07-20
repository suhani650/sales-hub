import { useState } from "react";

export default function PushNotifications() {
  const [push, setPush] = useState({
    orders: true,
    shipping: true,
    reviews: true,
    promotions: false,
    wallet: true,
  });

  const handleToggle = (key) => {
    setPush({
      ...push,
      [key]: !push[key],
    });
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Push Notifications</h2>

      <div className="space-y-5">
        {Object.entries(push).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b pb-4"
          >
            <span className="capitalize font-medium">{key}</span>

            <input
              type="checkbox"
              checked={value}
              onChange={() => handleToggle(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
