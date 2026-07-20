const shipping = [
  {
    courier: "Delhivery",
    delivered: 5248,
    rate: "98.6%",
  },
  {
    courier: "Blue Dart",
    delivered: 2810,
    rate: "99.2%",
  },
  {
    courier: "XpressBees",
    delivered: 1948,
    rate: "97.4%",
  },
];

export default function ShippingReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Shipping Performance</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-3">Courier</th>

            <th>Delivered</th>

            <th>Success Rate</th>
          </tr>
        </thead>

        <tbody>
          {shipping.map((item) => (
            <tr key={item.courier} className="border-t">
              <td className="p-3 font-semibold">{item.courier}</td>

              <td>{item.delivered}</td>

              <td className="text-green-600 font-semibold">{item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
