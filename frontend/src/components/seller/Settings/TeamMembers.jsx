const members = [
  {
    name: "Rahul Sharma",
    role: "Owner",
    email: "owner@store.com",
  },
  {
    name: "Amit Singh",
    role: "Manager",
    email: "manager@store.com",
  },
];

export default function TeamMembers() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Team Members</h2>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">Name</th>

            <th>Role</th>

            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.email} className="border-t">
              <td className="p-4 font-semibold">{member.name}</td>

              <td>{member.role}</td>

              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
