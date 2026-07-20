const taxes = [
  {
    type: "GST Collected",
    amount: "₹8.45L",
  },
  {
    type: "TDS Deducted",
    amount: "₹1.22L",
  },
  {
    type: "Tax Payable",
    amount: "₹2.84L",
  },
];

export default function TaxReport() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Tax Summary</h2>

      {taxes.map((tax) => (
        <div key={tax.type} className="flex justify-between py-3 border-b">
          <span>{tax.type}</span>

          <span className="font-semibold text-red-600">{tax.amount}</span>
        </div>
      ))}
    </div>
  );
}
