import { useState, useEffect } from "react";

// fields = [{ name, label, type?, options? }]
export default function Form({ title, fields, initial, onSubmit, editing, onCancel }) {
  const empty = Object.fromEntries(fields.map((f) => [f.name, f.default ?? ""]));
  const [vals, setVals] = useState(empty);
  const [errs, setErrs] = useState({});

  useEffect(() => {
    setVals(editing ? { ...initial } : empty);
    setErrs({});
    // eslint-disable-next-line
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();
    const bad = {};
    fields.forEach((f) => {
      if (!f.optional && !String(vals[f.name] ?? "").trim())
        bad[f.name] = `${f.label} is required.`;
    });
    setErrs(bad);
    if (Object.keys(bad).length) return;
    onSubmit(vals);
    if (!editing) setVals(empty);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>{editing ? `Edit ${title}` : `Add ${title}`}</h3>
      <div className="row">
        {fields.map((f) => (
          <label key={f.name}>
            {f.label}
            {f.options ? (
              <select
                value={vals[f.name] || ""}
                onChange={(e) => setVals({ ...vals, [f.name]: e.target.value })}
              >
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={f.type || "text"}
                value={vals[f.name] || ""}
                onChange={(e) => setVals({ ...vals, [f.name]: e.target.value })}
              />
            )}
            {errs[f.name] && <small className="err">{errs[f.name]}</small>}
          </label>
        ))}
      </div>
      <div className="btns">
        <button className="btn blue" type="submit">
          {editing ? "Save" : "Add"}
        </button>
        {editing && (
          <button className="btn" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}