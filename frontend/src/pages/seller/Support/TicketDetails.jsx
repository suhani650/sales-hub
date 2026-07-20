import TicketReply from "../../../components/seller/Support/TicketReply";
import SupportAnalytics from "../../../components/seller/Support/SupportAnalytics";

export default function TicketDetails() {
  const ticket = {
    id: "#TK1001",
    subject: "Payment not received",
    customer: "Rahul Sharma",
    priority: "High",
    status: "Open",
    created: "18 Jul 2026",
    description:
      "Payment was deducted from customer account but not reflected in seller wallet.",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h1 className="text-3xl font-bold">Ticket Details</h1>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <Info label="Ticket ID" value={ticket.id} />
          <Info label="Customer" value={ticket.customer} />
          <Info label="Subject" value={ticket.subject} />
          <Info label="Priority" value={ticket.priority} />
          <Info label="Status" value={ticket.status} />
          <Info label="Created" value={ticket.created} />
        </div>

        <div className="mt-8">
          <h3 className="font-semibold">Description</h3>

          <p className="text-gray-600 mt-3">{ticket.description}</p>
        </div>
      </div>

      <TicketReply />

      <SupportAnalytics />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <h4 className="font-semibold mt-1">{value}</h4>
    </div>
  );
}
