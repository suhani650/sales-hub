const exchanges = [
  {
    id: "#EX1001",
    customer: "Amit Kumar",
    oldProduct: "Wireless Mouse",
    newProduct: "Gaming Mouse",
    status: "Processing",
  },
  {
    id: "#EX1002",
    customer: "Neha Singh",
    oldProduct: "Keyboard",
    newProduct: "Mechanical Keyboard",
    status: "Approved",
  },
];

export default function ExchangeOrders() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Exchange Orders</h2>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Exchange ID</th>
            <th>Customer</th>
            <th>Old Product</th>
            <th>New Product</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {exchanges.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4 font-semibold">{item.id}</td>

              <td>{item.customer}</td>

              <td>{item.oldProduct}</td>

              <td>{item.newProduct}</td>

              <td>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
