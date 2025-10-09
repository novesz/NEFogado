import { useEffect, useState } from "react";
import "../styles/kihasznaltsag.css";

export default function Kihasznaltsag() {
  const [sorok, setSorok] = useState([]);
  const [hiba, setHiba] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/rooms/utilization"); // vagy /api/rooms/utilization ha úgy hagytad
        if (!r.ok) throw new Error("Nem sikerült betölteni a kihasználtságot.");
        const data = await r.json();
        setSorok(data);
      } catch (e) {
        setHiba(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="panel">
      <h3>A Szobák kihasználtsága:</h3>

      {hiba && <p className="hiba">{hiba}</p>}
      {loading && <p>Betöltés…</p>}

      {!loading && !hiba && (
        <table className="tablazat">
          <thead>
            <tr>
              <th>Szoba neve</th>
              <th>Vendégek száma</th>
              <th>Vendégéjszakák száma</th>
            </tr>
          </thead>
          <tbody>
            {sorok.map((x) => (
              <tr key={x.szazon ?? x.sznev}>
                <td>{x.sznev}</td>
                <td>{x.vendegek ?? x.osszesFo} fő</td>
                <td>{x.vendegejszakak ?? x.osszesEjszaka} éjszaka</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
