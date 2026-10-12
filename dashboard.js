import { useLib } from "../context/Library";

export default function Dashboard() {
  const { books, txns } = useLib();
  const total = books.reduce((s, b) => s + b.quantity, 0);
  const low = books.filter((b) => b.quantity < 2);

  return (
    <section>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="card"><h3>{books.length}</h3><p>Titles</p></div>
        <div className="card"><h3>{total}</h3><p>Copies</p></div>
        <div className="card warn"><h3>{low.length}</h3><p>Low Stock</p></div>
        <div className="card"><h3>{txns.length}</h3><p>Transactions</p></div>
      </div>

      <h3>Availability</h3>
      <div className="scroll">
        <table>
          <thead>
            <tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Stock</th><th>Status</th></tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} className={b.quantity < 2 ? "warn-row" : ""}>
                <td>{b.title}</td><td>{b.author}</td>
                <td>{b.genre}</td><td>{b.isbn}</td><td>{b.quantity}</td>
                <td>
                  {b.quantity < 2
                    ? <span className="pill warn">Low</span>
                    : <span className="pill ok">OK</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}