# Trade Republic Portfolio Benchmark

Eine kleine Open-Source-Web-App zur Auswertung von Einzelaktien aus einem Trade-Republic-Transaktionsexport.

Die App liest einen Trade-Republic-CSV-Export ein, filtert die enthaltenen **Einzelaktien** heraus und stellt deren gemeinsame Performance einer passiven MSCI-World-Benchmark gegenüber. ETFs bzw. Fonds aus dem Export werden nicht als Teil des Einzelaktien-Portfolios ausgewertet.

## Was macht die App?

Die App beantwortet im Kern zwei Fragen:

1. **Wie hat sich mein Einzelaktien-Portfolio entwickelt?**
2. **Wie hat sich der MSCI World im selben Zeitraum entwickelt?**

Dafür werden zwei unterschiedliche Berechnungslogiken verwendet.

### Einzelaktien-Portfolio

Für das Einzelaktien-Portfolio werden die tatsächlichen Transaktionen aus dem Trade-Republic-CSV verwendet.

Berücksichtigt werden unter anderem:

- Kaufzeitpunkte
- Kaufbeträge
- Stückzahlen
- Gebühren
- Verkäufe
- Verkaufserlöse
- Dividenden, soweit sie im CSV enthalten sind
- aktuelle bzw. historische Aktienkurse
- Währungsumrechnung von USD in EUR

Die Portfolio-Performance wird **cashflow-bereinigt** dargestellt. Neue Käufe sollen also nicht wie ein Kursgewinn aussehen und Verkäufe sollen die Performance nicht künstlich verzerren.

Die blaue Linie im Diagramm zeigt diesen Performanceverlauf des Einzelaktien-Portfolios.

### MSCI-World-Benchmark

Als Benchmark wird aktuell der **iShares MSCI World ETF (`URTH`)** verwendet.

`URTH` wird in USD gehandelt. Für den Vergleich wird deshalb für jeden Börsentag zusätzlich der historische **USD/EUR-Wechselkurs** verwendet.

Die Benchmark wird **nicht** anhand der Kaufzeitpunkte deiner Einzelaktien aufgebaut.

Stattdessen zeigt sie die reine Entwicklung des MSCI World ab dem gewählten Startdatum:

`URTH-Kurs in EUR am jeweiligen Tag / URTH-Kurs in EUR am Startdatum - 1`

Die graue Linie zeigt damit:

> Wie stark hätte sich ein MSCI-World-Investment seit dem gewählten Startdatum entwickelt?

Spätere Käufe oder Verkäufe in deinem Einzelaktien-Portfolio haben **keinen Einfluss** auf diese Benchmark-Linie.

## Was wird miteinander verglichen?

Im Diagramm werden bewusst zwei unterschiedliche Perspektiven gegenübergestellt:

- **Blau:** tatsächliche, cashflow-bereinigte Performance deines Einzelaktien-Portfolios
- **Grau:** reine MSCI-World-Kursperformance seit dem Startdatum in EUR

Die angezeigte Out-/Underperformance entspricht der Differenz zwischen dem aktuellen Endwert dieser beiden Performancewerte.

## Zeitraum

Nach dem Import des CSV wird automatisch das früheste Datum aus dem Export als Startdatum vorgeschlagen.

Dieses Datum kann vor der Berechnung geändert werden.

Die MSCI-World-Benchmark startet immer an diesem gewählten Datum.

Für die Einzelaktien-Auswertung können nur Transaktionen berücksichtigt werden, die im vorhandenen CSV enthalten sind. Wenn eine Position bereits vor dem gewählten Startdatum bestand und die ursprünglichen Käufe im Export fehlen, kann keine vollständige und zuverlässige Performance für diese Position rekonstruiert werden.

Solche Positionen können deshalb von der Auswertung ausgeschlossen werden.

## Welche Daten werden ausgewertet?

Berücksichtigt werden ausschließlich Transaktionen mit der Asset-Klasse:

`STOCK`

Transaktionen mit:

`FUND`

werden aus der Einzelaktien-Auswertung ausgeschlossen.

Damit können ETFs weiterhin im Trade-Republic-Export enthalten sein, ohne die berechnete Einzelaktien-Performance zu beeinflussen.

## Kursdaten

Historische und aktuelle Kursdaten werden über **Twelve Data** geladen.

Für bekannte US-Aktien werden nach Möglichkeit die US-Originalticker verwendet.

Beispiele:

- ServiceNow → `NOW`
- Meta Platforms → `META`
- Microsoft → `MSFT`

Für weitere Aktien versucht die App, eine passende Kursnotierung zu finden.

Wenn für eine Aktie keine nutzbaren Kursdaten verfügbar sind, wird sie von der Berechnung ausgeschlossen, ohne dass die gesamte Auswertung abgebrochen werden muss.

## API-Limits

Der kostenlose Twelve-Data-Zugang erlaubt nur eine begrenzte Anzahl von API-Abfragen innerhalb eines bestimmten Zeitfensters.

Die App arbeitet deshalb automatisch in Blöcken.

Wenn das Limit erreicht wird:

- wartet die App selbstständig,
- zeigt einen Countdown an,
- und setzt die Berechnung anschließend automatisch fort.

Es ist nicht notwendig, mehrfach auf „Berechnen“ zu drücken.

## Daten und API-Key

Die Anwendung läuft als clientseitige Web-App im Browser.

Der ausgewählte Trade-Republic-CSV-Export wird vom JavaScript der Anwendung verarbeitet.

Für Kursabfragen werden Anfragen an **Twelve Data** gesendet.

Der Nutzer ist selbst dafür verantwortlich zu prüfen, welche Daten durch die verwendete Anwendung, den Browser, den Hosting-Anbieter oder externe Dienste verarbeitet oder übertragen werden.

Es sollten keine Dateien, Zugangsdaten oder sonstigen Informationen verwendet oder veröffentlicht werden, deren Weitergabe nicht beabsichtigt ist.

## Open Source, KI-Hinweis und Haftungsausschluss

Dieses Projekt wurde mit Unterstützung generativer KI erstellt.

Der Quellcode wurde nicht als professionell auditierte Finanz-, Sicherheits- oder Datenschutzsoftware entwickelt.

**Vor der Nutzung, Veränderung oder Veröffentlichung sollte der Quellcode eigenständig geprüft und nachvollzogen werden.**

Die Software wird ohne Gewährleistung bereitgestellt.

Es wird keine Garantie für:

- Richtigkeit
- Vollständigkeit
- Verfügbarkeit
- Sicherheit
- Fehlerfreiheit
- korrekte Instrumentenzuordnung
- korrekte Kursdaten
- korrekte Performanceberechnung

übernommen.

Die dargestellten Ergebnisse dienen ausschließlich der persönlichen Auswertung und stellen **keine Anlageberatung, Finanzberatung oder Empfehlung zum Kauf oder Verkauf von Wertpapieren** dar.

Die Nutzung erfolgt auf eigene Verantwortung.

Insbesondere ist jeder Nutzer selbst dafür verantwortlich:

- welche CSV-Dateien er in die Anwendung lädt,
- welche API-Keys oder Zugangsdaten er verwendet,
- welche Daten er veröffentlicht oder mit Dritten teilt,
- den Code vor eigener Nutzung oder Veröffentlichung zu prüfen,
- Ergebnisse und Berechnungen zu kontrollieren,
- und die Bedingungen der verwendeten APIs, Datenanbieter und Hosting-Dienste einzuhalten.

Der Autor bzw. die Mitwirkenden übernehmen, soweit rechtlich zulässig, keine Haftung für Schäden, Verluste, Fehlentscheidungen, Datenverluste oder sonstige Folgen, die aus der Nutzung des Codes oder der dargestellten Ergebnisse entstehen.

## Hinweis zur Performanceberechnung

Die Ergebnisse können von den Performanceangaben eines Brokers oder anderer Portfolio-Tools abweichen.

Mögliche Ursachen sind unter anderem:

- Gebühren
- Steuern
- Dividenden
- Teilverkäufe
- Währungsumrechnung
- unterschiedliche Kursquellen
- Handelszeiten
- fehlende oder unvollständige Transaktionen
- Rundungen
- unterschiedliche Methoden zur Performanceberechnung

Die Ergebnisse sollten deshalb vor einer weiteren Verwendung immer plausibilisiert werden.

## Projektstatus

Das Projekt ist experimentell und dient vor allem als persönliches Analysewerkzeug.

Fehler, Sonderfälle, unvollständige Instrumentenzuordnungen und Abweichungen bei Kursdaten oder Performanceberechnungen sind möglich.

Beiträge, Änderungen und Weiterentwicklungen des Codes sind ausdrücklich möglich, sollten aber eigenständig geprüft werden.
