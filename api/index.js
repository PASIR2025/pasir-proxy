export default async function handler(req, res) {
  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxDqkSFvg7n7dxRkSk3w0x842bSW3aoODvTVlLoCyM4AJYFOhCmiOpG6ILv6uBlL-kgHg/exec";
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).send(data);

  } catch (error) {
    res.status(500).json({ ok: false, error: "Proxy error", details: String(error) });
  }
}