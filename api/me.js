export default function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/focoprime_session=([^;]+)/);

  if (!match) {
    return res.status(401).json({ logged: false });
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(match[1], "base64").toString()
    );

    return res.status(200).json({
      logged: true,
      name: decoded.name
    });
  } catch {
    return res.status(401).json({ logged: false });
  }
}
