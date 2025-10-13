import { useEffect, useState } from "react";
import "../styles/foglaltsag.css";

export default function Foglaltsag({ onSelectRoom }) {
  const [szobak, setSzobak] = useState([]);
  const [kivalasztott, setKivalasztott] = useState("");
  const [hiba, setHiba] = useState("");
  const [toltes, setToltes] = useState(false);

  const [foglalasok, setFoglalasok] = useState([]);
  const [foglalasToltes, setFoglalasToltes] = useState(false);

  // szobák betöltése lenyílóhoz
  useEffect(() => {
    (async () => {
      try {
        setToltes(true);
        setHiba("");
        const r = await fetch("http://localhost:3001/api/szobak");
        if (!r.ok) throw new Error("Nem sikerült betölteni a szobákat.");
        const data = await r.json(); // elvárt oszlopok: szazon, sznev
        setSzobak(data);
        if (data?.length) setKivalasztott(String(data[0].szazon));
      } catch (e) {
        setHiba(e.message || "Ismeretlen hiba.");
      } finally {
        setToltes(false);
      }
    })();
  }, []);

  const betoltFoglalasok = async () => {
    if (!kivalasztott) {
      setHiba("Válassz ki egy szobát!");
      return;
    }
    try {
      setHiba("");
      setFoglalasToltes(true);
      setFoglalasok([]);

      const r = await fetch(`http://localhost:3001/api/rooms/${kivalasztott}/bookings`);
      if (!r.ok) throw new Error("Nem sikerült betölteni a foglalásokat.");
      const data = await r.json(); // fsorsz, vnev, erk, tav, fo
      setFoglalasok(data);

      // jelzünk a szülőnek, hogy melyik szoba lett kiválasztva (névvel)
      const szoba = szobak.find(s => String(s.szazon) === String(kivalasztott));
      if (onSelectRoom && szoba) onSelectRoom(szoba.sznev);

    } catch (e) {
      setHiba(e.message || "Ismeretlen hiba.");
    } finally {
      setFoglalasToltes(false);
    }
  };

  return (
    <section className="foglaltsag-card">
      <h2>A vendégszobák foglaltsága</h2>

      <label className="foglaltsag-label" htmlFor="szobaSelect">
        Válassza ki, melyik szoba adatait szeretné látni:
      </label>

      <div className="foglaltsag-row">
        <select
          id="szobaSelect"
          className="foglaltsag-select"
          value={kivalasztott}
          onChange={(e) => setKivalasztott(e.target.value)}
          disabled={toltes}
        >
          {szobak.map((s) => (
            <option key={s.szazon} value={s.szazon}>
              {s.sznev}
            </option>
          ))}
        </select>

        <button className="foglaltsag-btn" onClick={betoltFoglalasok} disabled={toltes || foglalasToltes}>
          Adatok
        </button>
      </div>

      {hiba && <p className="foglaltsag-error">{hiba}</p>}

      {/* foglalások táblázata */}
      <div style={{ marginTop: 14 }}>
        {foglalasToltes && <p>Betöltés…</p>}
        {!foglalasToltes && foglalasok.length > 0 && (
          <table className="kih-table">{/* újrahasznosított stílus */}
            <thead>
              <tr>
                <th>Vendég neve</th>
                <th>Érkezés</th>
                <th>Távozás</th>
                <th>Fő</th>
              </tr>
            </thead>
            <tbody>
              {foglalasok.map((f) => (
                <tr key={f.fsorsz}>
                  <td>{f.vnev}</td>
                  <td>{f.erk}</td>
                  <td>{f.tav}</td>
                  <td>{f.fo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!foglalasToltes && foglalasok.length === 0 && !hiba && (
          <p>Nincs megjeleníthető foglalás.</p>
        )}
      </div>
    </section>
  );
}
