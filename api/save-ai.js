import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, description, prompt, model, temp } = req.body;

  if (!name || !prompt) {
    return res.status(400).json({ error: "Missing name or prompt" });
  }

  const slug = name.toLowerCase().replaceAll(" ", "-");
  const filePath = path.join(process.cwd(), "data", "ais.json");

  const rawData = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf-8")
    : "{}";

  const aiDB = JSON.parse(rawData);

  aiDB[slug] = { name, description, prompt, model, temp, slug };

  fs.writeFileSync(filePath, JSON.stringify(aiDB, null, 2));

  res.status(200).json({ message: "AI saved", slug });
                      }
