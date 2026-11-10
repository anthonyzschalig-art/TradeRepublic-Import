# TradeRepublic-Import v2 – Einzelaktien vs. MSCI World

Mobile, statische Web-App (GitHub Pages). **Nur Einzelaktien** (`asset_class=STOCK`). Bitcoin/Krypto, ETFs/Fonds und Derivate sind ausgeschlossen. Die CSV bleibt lokal im Browser; der Twelve-Data-Key wird nicht in Dateien gespeichert.

## Veröffentlichung auf GitHub (auch vom iPhone)

1. ZIP entpacken (iOS-App **Dateien**: ZIP antippen).
2. Repository `TradeRepublic-Import` öffnen und die Dateien `index.html`, `app.js`, `engine.js`, `manifest.json`, `service-worker.js` und `README.md` in den **Root von `main`** hochladen/ersetzen. Den Ordner `tests` musst du nicht hochladen.
3. GitHub → Settings → Pages → Deploy from branch → `main` / `(root)`.
4. https://anthonyzschalig-art.github.io/TradeRepublic-Import/ öffnen; bei alter Version Safari-Website-Daten löschen oder neu laden.
5. CSV wählen, Twelve-Data-Key eingeben, Ticker/Börse/Währung aller ausgewählten Aktien prüfen und berechnen.

## Rechenmethode

- Positionen werden chronologisch aus Kauf, Verkauf, Dividende, wertloser Ausbuchung, Gegenbuchung und Gratiszuteilung rekonstruiert.
- Aktienkäufe = externe Einzahlungen in den virtuellen **Aktien-Sleeve**, Aktienverkäufe = externe Auszahlungen. Dividenden verbleiben als EUR-Cash im Sleeve. Damit ist dies **nicht** die Rendite des gesamten Trade-Republic-Kontos.
- Tägliche Zeitgewichtung: `r_t = (NAV_t - CF_t) / NAV_(t-1) - 1`, verkettet über Handelstage. Ein-/Auszahlungen werden zum **Tagesschluss** angenommen. Gebühren und Steuern sind in den Zahlungsbeträgen enthalten.
- Benchmark URTH (US-ETF auf MSCI World), in EUR umgerechnet, erhält **dieselben externen Cashflows**. Er ist nicht identisch mit einem europäischen MSCI-World-ETF; ETF-Kosten, Dividendenbehandlung und Tracking-Differenz können abweichen.
- Historische Kurse: Twelve Data. Ticker-/Börsen-/Währungszuordnung muss geprüft werden. Fehlende Kurse (über sieben Kalendertage) stoppen die Rechnung statt den Depotwert künstlich auf null zu setzen. Aktien mit problematischen Kapitalmaßnahmen müssen geklärt oder bewusst abgewählt werden. Kurshistorien müssen zur Splitbehandlung passen.
- An Wochenenden/Feiertagen gebuchte Transaktionen werden auf den nächsten verfügbaren Benchmark-Handelstag gelegt. Das ist eine Näherung.

## Wichtige Einschränkungen

**Die App ist ein überprüfbarer Neuentwurf, keine geprüfte Depotabrechnung.** Die Live-Abfragen bei Twelve Data konnten in der Erstellungsumgebung nicht ausgeführt werden. Der komplette historische Verlauf ist erst nach Abruf und Prüfung der Kursdaten verifizierbar. Historische Splits, Delistings, unterschiedliche Börsenwährungen und Kapitalmaßnahmen erfordern gegebenenfalls manuelle Kontrolle. Der vollständige Export enthält beispielsweise Synbiotic-Umtausch-/Bezugsrechtsbuchungen, die ohne Klärung bewusst zu einem Stopp führen. Auch die vollständige Liquidation des Aktien-Sleeves führt derzeit zum Stopp der TWR-Verkettung statt zu einer möglicherweise irreführenden Kurve. Bei nicht mehr handelbaren Aktien können Kurse fehlen.

**Datenschutz:** Keine CSV, kein Key und keine privaten Kontoinformationen in das öffentliche Repository hochladen. CSV-Dateien und Testdaten sind absichtlich nicht Teil des ZIP-Archivs.

## Lokale Tests

`node tests/test-engine.js` (Node.js 18+). Testet CSV, Anlageklassenfilter, Cashflows, Ausbuchung und die Struktur des bereitgestellten Exports. Die CSV ist nicht im Projekt enthalten; der letzte Test benötigt die lokale Datei unter `/mnt/data/Transaktionsexport_Nov.csv` und ist optional bzw. muss für andere Systeme angepasst werden.
