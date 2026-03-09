import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const slug = req.query.slug;
  const dbPath = path.join(process.cwd(), "api", "ai-db.json");

  if (!fs.existsSync(dbPath)) {
    return res.status(404).json({ error: "No AIs found" });
  }

  const db = JSON.parse(fs.readFileSync(dbPath));

  if (!db[slug]) {
    return res.status(404).json({ error: "AI not found" });
  }

  res.status(200).json(db[slug]);
}
