import { useEffect, useState } from "react";
import "../styles/kihasznaltsag.css";

export default function Kihasznaltsag() {
  const [sorok, setSorok] = useState([]);
  const [hiba, setHiba] = useState("");
  const [toltes, setToltes] = useState(false);

  
  useEffect(() => {
  (async () => {
    try {
      setToltes(true);
      setHiba("");
      const url = "http://localhost:3001/api/rooms/utilization";
      const r = await fetch(url);
      if (!r.ok) {
        const text = await r.text();
        console.error("UTIL HTTP:", r.status, text);
        throw new Error("Nem sikerült betölteni a kihasználtsági adatokat.");
      }
      const data = await r.json();
      console.log("UTIL DATA:", data);
      setSorok(data);
    } catch (e) {
      setHiba(e.message || "Ismeretlen hiba.");
    } finally {
      setToltes(false);
    }
  })();
}, []);


  return (
    <section className="kih-card">
      <h2>A Szobák kihasználtsága:</h2>

      {hiba && <p className="kih-error">{hiba}</p>}

      <div className="kih-table-wrap">
        <table className="kih-table">
          <thead>
            <tr>
              <th>Szoba neve</th>
              <th>Vendégek száma</th>
              <th>Vendégéjszakák száma</th>
            </tr>
          </thead>
          <tbody>
            {toltes && (
              <tr>
                <td colSpan="3" className="kih-loading">Betöltés…</td>
              </tr>
            )}

            {!toltes && sorok.length === 0 && !hiba && (
              <tr>
                <td colSpan="3" className="kih-empty">Nincs megjeleníthető adat.</td>
              </tr>
            )}

            {!toltes && sorok.map((row, i) => (
              <tr key={row.szazon} className={i % 2 === 1 ? "kih-striped" : ""}>
                <td>{row.sznev}</td>
                <td>{row.osszesFo} fő</td>
                <td>{row.osszesEjszaka} éjszaka</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  
}
