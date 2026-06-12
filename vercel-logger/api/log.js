export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
        req.socket?.remoteAddress ||
        "unknown";

    const { url, referrer, device, userAgent, time } = req.body;

    const record = {
        ip,
        time: time || new Date().toISOString(),
        url,
        referrer,
        device,
        userAgent
    };

    let logs = JSON.parse(process.env.LOG_DATA || "[]");

    logs.push(record);

    if (logs.length > 500) logs.shift();

    process.env.LOG_DATA = JSON.stringify(logs);

    return res.status(200).json({ ok: true });
}
