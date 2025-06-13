import { useState } from "react";

export default function Home() {
  const [diff, setDiff] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCompare = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const text = await file.text();
    const oldData = JSON.parse(text);

    const response = await fetch("/api/fetchPlayers");
    const newData = await response.json();

    const oldSet = new Set(oldData.map(p => p.username));
    const difference = newData.filter(p => !oldSet.has(p.username));
    setDiff(difference);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>♟️ Titled Chess Player Comparison</h1>
      <p>Select your old titled_players.json file:</p>
      <input type="file" accept=".json" onChange={handleCompare} />
      {loading && <p>Loading...</p>}
      {diff.length > 0 && (
        <>
          <h3>🧮 New Players Found: {diff.length}</h3>
          <ul>
            {diff.map((player, index) => (
              <li key={index}>{player.username} ({player.title})</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
