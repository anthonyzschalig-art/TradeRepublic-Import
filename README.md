# Trade Republic Yahoo Worker Test

## GitHub Pages
Ersetze in deinem bestehenden GitHub-Pages-Repository:
- index.html
- manifest.json
- service-worker.js

## Cloudflare Worker
Lege einen neuen Cloudflare Worker an und ersetze dessen Code komplett durch:
- cloudflare-worker.js

Deploye den Worker. Du erhältst danach eine URL wie:
https://tr-yahoo-proxy.DEINNAME.workers.dev

Diese URL trägst du in der App unter "Cloudflare Worker URL" ein.

## Datenschutz
Die Trade-Republic-CSV bleibt vollständig im Browser.
An den Worker werden nur Ticker und Datum geschickt, z. B.:
- NOW
- SPY
- 2026-01-15

Keine Stückzahlen, Beträge oder Portfolioinformationen werden übertragen.
