import { useEffect, useState } from "react";
import "../styles/foglaltsag.css";


export default function Foglaltsag() {
  const [szobak, setSzobak] = useState([]);
  const [kivalasztott, setKivalasztott] = useState("");
  const [foglalasok, setFoglalasok] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hiba, setHiba] = useState("");

  // szobák a lenyílóhoz
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("localhost:3001/api/szobak");
        if (!r.ok) throw new Error("Nem sikerült betölteni a szobákat.");
        const data = await r.json();
        setSzobak(data);
      } catch (e) {
        setHiba(e.message);
      }
    })();
  }, []);

  // foglalások lekérése gombra
  async function lekerFoglalasok() {
    if (!kivalasztott) return;
    setLoading(true);
    setHiba("");
    try {
      const r = await fetch(`localhost:3001/api/rooms/${kivalasztott}/bookings`);
      if (!r.ok) throw new Error("Nem sikerült betölteni a foglalásokat.");
      const data = await r.json();
      setFoglalasok(data);
    } catch (e) {
      setHiba(e.message);
    } finally {
      setLoading(false);
    }
  }

  const fmt = (d) => new Date(d).toLocaleDateString("hu-HU");

  return (
    <section className="panel">
      <h3>A vendégszobák foglaltsága</h3>

      <label className="label">Válassza ki, melyik szoba adatait szeretné látni:</label>
      <div className="row-inline">
        <select
          value={kivalasztott}
          onChange={(e) => setKivalasztott(e.target.value)}
        >
          <option value="">-- válasszon szobát --</option>
          {szobak.map((s) => (
            <option key={s.szazon} value={s.szazon}>
              {s.sznev}
            </option>
          ))}
        </select>
        <button onClick={lekerFoglalasok}>Adatok</button>
      </div>

      {hiba && <p className="hiba">{hiba}</p>}
      {loading && <p>Betöltés…</p>}

      {!loading && foglalasok.length > 0 && (
        <table className="tablazat">
          <thead>
            <tr>
              <th>Név</th>
              <th>Érkezés</th>
              <th>Távozás</th>
              <th>Fő</th>
            </tr>
          </thead>
          <tbody>
            {foglalasok.map((f) => (
              <tr key={f.fsorsz}>
                <td>{f.nev || f.vnev}</td>
                <td>{fmt(f.erk)}</td>
                <td>{fmt(f.tav)}</td>
                <td>{f.fo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !hiba && kivalasztott && foglalasok.length === 0 && (
        <p>Nincs foglalás ehhez a szobához.</p>
      )}
    </section>
  );
}
