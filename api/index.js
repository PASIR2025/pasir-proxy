export default async function handler(req, res) {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxDqkSFvg7n7dxRkSk3w0x842bSW3aoODvTVlLoCyM4AJYFOhCmiOpG6ILv6uBlL-kgHg/exec";

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let url = APPS_SCRIPT_URL;

    // Reenviar query params en GET (?action=me&token=...)
    if (req.method === "GET") {
      const qs = new URLSearchParams(req.query || {}).toString();
      if (qs) url += (url.includes("?") ? "&" : "?") + qs;

      const r = await fetch(url, { method: "GET" });
      const text = await r.text();
      return res.status(200).send(text);
    }

    // POST: reenviar body JSON
    if (req.method === "POST") {
      const r = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body ?? {}),
      });

      const text = await r.text();
      return res.status(200).send(text);
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
