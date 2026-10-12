import { useState } from "react";
import { useLib } from "../context/Library";
import Form from "../components/Form";

const FIELDS = [
  { name: "title", label: "Title" },
  { name: "author", label: "Author" },
  { name: "genre", label: "Genre" },
  { name: "isbn", label: "ISBN" },
  { name: "quantity", label: "Quantity", type: "number", default: "1" },
];

export default function Books() {
  const { books, addBook, updBook, delBook } = useLib();
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  const save = (data) => {
    if (editing) { updBook(editing.id, data); setEditing(null); }
    else addBook(data);
  };

  const list = books.filter(
    (b) =>
      b.title.toLowerCase().includes(q.toLowerCase()) ||
      b.author.toLowerCase().includes(q.toLowerCase()) ||
      b.isbn.includes(q)
  );

  return (
    <section>
      <h2>Books</h2>
      <Form title="Book" fields={FIELDS} editing={editing} initial={editing}
        onSubmit={save} onCancel={() => setEditing(null)} />

      <input className="search" placeholder="Search..." value={q}
        onChange={(e) => setQ(e.target.value)} />

      <div className="grid">
        {list.map((b) => (
          <article key={b.id} className={`card tile ${b.quantity < 2 ? "warn" : ""}`}>
            <h4>{b.title}</h4>
            <p className="muted">by {b.author}</p>
            <p>Genre: {b.genre}</p>
            <p>ISBN: {b.isbn}</p>
            <p>Stock: {b.quantity} {b.quantity < 2 && <span className="pill warn">Low</span>}</p>
            <div className="btns">
              <button className="btn sm" onClick={() => setEditing(b)}>Update</button>
              <button className="btn sm red"
                onClick={() => window.confirm("Delete?") && delBook(b.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}