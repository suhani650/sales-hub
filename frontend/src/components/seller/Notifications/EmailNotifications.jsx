export default function EmailNotifications() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Email Notifications</h2>

      <div className="space-y-4">
        <label className="flex justify-between">
          <span>New Orders</span>

          <input type="checkbox" defaultChecked />
        </label>

        <label className="flex justify-between">
          <span>Refund Updates</span>

          <input type="checkbox" defaultChecked />
        </label>

        <label className="flex justify-between">
          <span>Marketing Reports</span>

          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
}
