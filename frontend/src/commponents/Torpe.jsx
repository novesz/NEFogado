
import { useEffect, useState } from "react";

function Torpe() {
  const [szobak, setSzobak] = useState([]);
  const [hiba, setHiba] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/szobak")
      .then(res => {
        if (!res.ok) throw new Error("Nem sikerült az adatokat betölteni.");
        return res.json();
      })
      .then(data => setSzobak(data))
      .catch(err => setHiba(err.message));
  }, []);

  return (
    <div className="torpe">
      <h3 id="cim">A hét törpe fogadó</h3>

      {hiba ? (
        <p style={{ color: "red" }}>{hiba}</p>
      ) : (
        
        <table  className="table table-striped">
          <thead>
            <tr>
              <th>Szoba neve</th>
              <th>Ágyak száma</th>
            </tr>
          </thead>
          <tbody>
            {szobak.map((szoba) => (
              <tr key={szoba.szazon}>
                <td>{szoba.sznev}</td>
                <td>{szoba.agy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <h6 className="fo">A házban összesen 21 fő fér el </h6>

      <div className="torpe-yapp">
        <h6 className="t-fel-szov">Felszereltségük:</h6>
        <ol className="szamlists">
            <li>Ruhásszekrény</li>
            <li>Saját fürdőszoba zuhanytálca</li>
            <li>WC (fürdőszobával egyben)</li>
        </ol>
      </div>
    </div>
  );
}

export default Torpe;
