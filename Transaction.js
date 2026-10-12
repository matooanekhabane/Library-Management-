import { useState } from "react";
import { useLib } from "../context/Library";

export default function Transactions() {
  const { books, txns, transact, user } = useLib();
  const [bookId, setBookId] = useState("");
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState(null);

  const go = (type) => {
    const r = transact(bookId, type, qty, user?.name);
    setMsg(r);
    if (r.ok) { setBookId(""); setQty(1); }
  };

  return (
    <section>
      <h2>Transactions</h2>
      <div className="card">
        <div className="row">
          <label>Book
            <select value={bookId} onChange={(e) => setBookId(e.target.value)}>
              <option value="">-- select --</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>{b.title} ({b.quantity})</option>
              ))}
            </select>
          </label>
          <label>Qty
            <input type="number" min="1" value={qty}
              onChange={(e) => setQty(e.target.value)} />
          </label>
        </div>
        <div className="btns">
          <button className="btn blue" disabled={!bookId} onClick={() => go("add")}>
            + Add Stock
          </button>
          <button className="btn red" disabled={!bookId} onClick={() => go("borrow")}>
            − Borrow
          </button>
        </div>
        {msg && <p className={msg.ok ? "ok" : "err"}>{msg.msg}</p>}
      </div>

      <h3>History</h3>
      <div className="scroll">
        <table>
          <thead>
            <tr><th>Date</th><th>Book</th><th>Type</th><th>Qty</th><th>By</th></tr>
          </thead>
          <tbody>
            {txns.map((t) => (
              <tr key={t.id}>
                <td>{new Date(t.date).toLocaleString()}</td>
                <td>{t.bookTitle}</td>
                <td><span className={`pill ${t.type === "add" ? "ok" : "warn"}`}>
                  {t.type === "add" ? "In" : "Borrowed"}</span></td>
                <td>{t.qty}</td><td>{t.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}