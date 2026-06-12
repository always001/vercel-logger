export default async function handler(req, res) {
    const logs = JSON.parse(process.env.LOG_DATA || "[]");
    return res.status(200).json(logs);
}
