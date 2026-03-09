import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { slug } = req.query;
  const filePath = path.join(process.cwd(), "data", "ais.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const aiDB = JSON.parse(rawData);

  if (!slug || !aiDB[slug]) {
    return res.status(404).json({ error: "AI not found" });
  }

  res.status(200).json(aiDB[slug]);
}
