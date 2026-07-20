import { useState } from "react";

export default function SecuritySettings() {
  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlert: true,
    emailVerification: true,
    sessionTimeout: false,
  });

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

      <div className="space-y-5">
        {Object.entries(security).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b pb-4"
          >
            <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>

            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                setSecurity({
                  ...security,
                  [key]: !value,
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
