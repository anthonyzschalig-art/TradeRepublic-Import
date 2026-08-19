export default {
  async fetch(request) {
    const url = new URL(request.url);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      if (url.pathname === "/quote") {
        const ticker = cleanTicker(url.searchParams.get("ticker"));
        if (!ticker) return json({ error: "Ticker fehlt." }, 400, headers);

        const yahoo = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=5d`;
        const data = await yahooFetch(yahoo);

        const result = data?.chart?.result?.[0];
        if (!result) return json({ error: `Keine Yahoo-Daten für ${ticker}.` }, 404, headers);

        const meta = result.meta || {};
        const price =
          Number(meta.regularMarketPrice) ||
          lastNumber(result.indicators?.quote?.[0]?.close);

        if (!price) return json({ error: `Kein aktueller Kurs für ${ticker}.` }, 404, headers);

        return json({
          ticker,
          price,
          currency: meta.currency || "",
          exchange: meta.exchangeName || "",
          marketState: meta.marketState || ""
        }, 200, headers);
      }

      if (url.pathname === "/history") {
        const ticker = cleanTicker(url.searchParams.get("ticker"));
        const date = url.searchParams.get("date");

        if (!ticker) return json({ error: "Ticker fehlt." }, 400, headers);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
          return json({ error: "Datum muss YYYY-MM-DD sein." }, 400, headers);
        }

        const target = new Date(date + "T00:00:00Z");
        const start = new Date(target);
        start.setUTCDate(start.getUTCDate() - 10);
        const end = new Date(target);
        end.setUTCDate(end.getUTCDate() + 3);

        const period1 = Math.floor(start.getTime() / 1000);
        const period2 = Math.floor(end.getTime() / 1000);

        const yahoo = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?period1=${period1}&period2=${period2}&interval=1d&events=history`;
        const data = await yahooFetch(yahoo);

        const result = data?.chart?.result?.[0];
        if (!result) return json({ error: `Keine historischen Yahoo-Daten für ${ticker}.` }, 404, headers);

        const timestamps = result.timestamp || [];
        const closes = result.indicators?.quote?.[0]?.close || [];

        let best = null;
        for (let i = 0; i < timestamps.length; i++) {
          const close = Number(closes[i]);
          if (!close) continue;

          const d = new Date(timestamps[i] * 1000);
          const day = d.toISOString().slice(0, 10);

          if (day <= date) {
            if (!best || day > best.date) {
              best = { date: day, price: close };
            }
          }
        }

        if (!best) {
          for (let i = 0; i < timestamps.length; i++) {
            const close = Number(closes[i]);
            if (!close) continue;
            const day = new Date(timestamps[i] * 1000).toISOString().slice(0, 10);
            best = { date: day, price: close };
            break;
          }
        }

        if (!best) return json({ error: `Kein historischer Kurs für ${ticker}.` }, 404, headers);

        return json({
          ticker,
          ...best,
          currency: result.meta?.currency || ""
        }, 200, headers);
      }

      return json({
        ok: true,
        message: "Yahoo Finance Worker läuft.",
        endpoints: ["/quote?ticker=NOW", "/history?ticker=NOW&date=2026-01-15"]
      }, 200, headers);

    } catch (err) {
      return json({ error: String(err?.message || err) }, 500, headers);
    }
  }
};

function cleanTicker(value) {
  const v = String(value || "").trim().toUpperCase();
  if (!/^[A-Z0-9.^=\-]{1,20}$/.test(v)) return null;
  return v;
}

function lastNumber(values) {
  if (!Array.isArray(values)) return null;
  for (let i = values.length - 1; i >= 0; i--) {
    const n = Number(values[i]);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

async function yahooFetch(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "application/json,text/plain,*/*"
    }
  });

  if (!res.ok) {
    throw new Error(`Yahoo Finance HTTP ${res.status}`);
  }

  return await res.json();
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), { status, headers });
}
