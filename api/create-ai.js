import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, prompt, model, temp, slug } = req.body;

    if (!name || !prompt) {
      return res.status(400).json({ error: "Missing name or prompt" });
    }

    // caminho do “DB” (arquivo JSON)
    const dbPath = path.join(process.cwd(), "api", "ai-db.json");

    let db = {};
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath));
    }

    db[slug] = { name, description, prompt, model, temp, slug };

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(200).json({ message: "AI created", slug });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
        }
