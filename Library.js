import { createContext, useContext, useEffect } from "react";
import useLS from "../hooks/useLS";

const Ctx = createContext();
const uid = () => Math.random().toString(36).slice(2, 10);

export function LibraryProvider({ children }) {
  const [books, setBooks] = useLS("books", []);
  const [users, setUsers] = useLS("users", []);
  const [txns, setTxns] = useLS("txns", []);
  const [user, setUser] = useLS("user", null);

  // Seed once on first load
  useEffect(() => {
    if (!books.length)
      setBooks([
        { id: uid(), title: "Things Fall Apart", author: "Chinua Achebe",
          genre: "Fiction", isbn: "978-0385474542", quantity: 5 },
        { id: uid(), title: "Clean Code", author: "Robert C. Martin",
          genre: "Technology", isbn: "978-0132350884", quantity: 1 },
      ]);
    if (!users.length)
      setUsers([
        { id: uid(), name: "Admin", membershipId: "ADMIN001",
          role: "admin", password: "admin123" },
        { id: uid(), name: "Member", membershipId: "MEM001",
          role: "member", password: "member123" },
      ]);
  }, []); // eslint-disable-line

  // ---- Books ----
  const addBook = (b) =>
    setBooks((p) => [...p, { ...b, id: uid(), quantity: +b.quantity }]);
  const updBook = (id, b) =>
    setBooks((p) => p.map((x) => (x.id === id ? { ...x, ...b, quantity: +b.quantity } : x)));
  const delBook = (id) => setBooks((p) => p.filter((x) => x.id !== id));

  // ---- Transactions ----
  const transact = (bookId, type, qty, by) => {
    const bk = books.find((b) => b.id === bookId);
    if (!bk || qty <= 0) return { ok: false, msg: "Invalid input." };
    if (type === "borrow" && qty > bk.quantity)
      return { ok: false, msg: `Only ${bk.quantity} left.` };

    updBook(bookId, {
      quantity: type === "add" ? bk.quantity + +qty : bk.quantity - +qty,
    });
    setTxns((p) => [
      { id: uid(), bookTitle: bk.title, type, qty: +qty,
        date: new Date().toISOString(), by: by || "Guest" },
      ...p,
    ]);
    return { ok: true, msg: "Saved." };
  };

  // ---- Users ----
  const addUser = (u) => setUsers((p) => [...p, { ...u, id: uid() }]);
  const updUser = (id, u) =>
    setUsers((p) => p.map((x) => (x.id === id ? { ...x, ...u } : x)));
  const delUser = (id) => setUsers((p) => p.filter((x) => x.id !== id));

  // ---- Auth ----
  const login = (mid, pw) => {
    const found = users.find(
      (u) => u.membershipId.toLowerCase() === mid.toLowerCase().trim() && u.password === pw
    );
    if (found) { setUser(found); return true; }
    return false;
  };
  const logout = () => setUser(null);

  return (
    <Ctx.Provider
      value={{ books, users, txns, user,
        addBook, updBook, delBook, transact,
        addUser, updUser, delUser, login, logout }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useLib = () => useContext(Ctx);