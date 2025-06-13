// api/fetchPlayers.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const TITLES = ["GM", "WGM", "IM", "WIM", "FM", "WFM", "NM", "WNM", "CM", "WCM"];
  const API_BASE = "https://api.chess.com/pub/titled";
  const allPlayers = [];

  for (const title of TITLES) {
    try {
      const response = await fetch(`${API_BASE}/${title}`);
      const data = await response.json();
      data.players.forEach(username => allPlayers.push({ username, title }));
    } catch (err) {
      console.error(`Error fetching ${title}:`, err.message);
    }
  }

  res.status(200).json(allPlayers);
}
