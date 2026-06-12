let logs = [];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const { url, referrer, device, userAgent, time } = req.body;

  logs.push({
    ip,
    time: time || new Date().toISOString(),
    url,
    referrer,
    device,
    userAgent
  });

  if (logs.length > 500) logs.shift();

  return res.status(200).json({ ok: true });
}

