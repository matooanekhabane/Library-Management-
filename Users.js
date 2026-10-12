import { useState } from "react";
import { useLib } from "../context/Library";
import Form from "../components/Form";

const FIELDS = [
  { name: "name", label: "Name" },
  { name: "membershipId", label: "Membership ID" },
  { name: "role", label: "Role", options: ["member", "admin"], default: "member" },
  { name: "password", label: "Password", type: "password" },
];

export default function Users() {
  const { users, addUser, updUser, delUser } = useLib();
  const [editing, setEditing] = useState(null);

  const save = (data) => {
    if (editing) { updUser(editing.id, data); setEditing(null); }
    else addUser(data);
  };

  return (
    <section>
      <h2>Users</h2>
      <Form title="User" fields={FIELDS} editing={editing} initial={editing}
        onSubmit={save} onCancel={() => setEditing(null)} />

      <div className="scroll">
        <table>
          <thead>
            <tr><th>Name</th><th>Membership</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td><td>{u.membershipId}</td>
                <td><span className="pill">{u.role}</span></td>
                <td>
                  <button className="btn sm" onClick={() => setEditing(u)}>Update</button>
                  <button className="btn sm red"
                    onClick={() => window.confirm("Delete?") && delUser(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}