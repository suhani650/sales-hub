const partners = [
  {
    name: "Delhivery",
    shipments: 1240,
    success: "98.8%",
  },
  {
    name: "Blue Dart",
    shipments: 842,
    success: "99.1%",
  },
  {
    name: "XpressBees",
    shipments: 404,
    success: "97.5%",
  },
];

export default function CourierPartners() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h2 className="text-xl font-bold mb-6">Courier Partners</h2>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Courier</th>

            <th>Total Shipments</th>

            <th>Success Rate</th>
          </tr>
        </thead>

        <tbody>
          {partners.map((partner) => (
            <tr key={partner.name} className="border-t">
              <td className="p-4 font-semibold">{partner.name}</td>

              <td className="text-center">{partner.shipments}</td>

              <td className="text-center text-green-600 font-semibold">
                {partner.success}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
