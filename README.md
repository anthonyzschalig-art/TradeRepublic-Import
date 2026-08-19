# Trade Republic Portfolio Benchmark

Eine kleine Open-Source-Web-App zur Auswertung von Einzelaktien aus
einem Trade-Republic-Transaktionsexport.

Die App liest einen Trade-Republic-CSV-Export ein, filtert die
enthaltenen **Einzelaktien** heraus und stellt deren gemeinsame
Performance einer passiven Benchmark gegenüber. ETFs bzw. Fonds aus dem
Export werden nicht als Teil des Einzelaktien-Portfolios ausgewertet.

## Was macht die App?

Die Idee ist einfach:

> Wie hätte sich das Geld entwickelt, wenn ich meine Einzelaktien nicht
> gekauft und stattdessen zum jeweiligen Zeitpunkt in einen
> MSCI-World-ETF investiert hätte?

Dazu:

-   wird der Trade-Republic-CSV-Export direkt in der Web-App eingelesen,
-   werden Transaktionen mit der Asset-Klasse `STOCK` erkannt,
-   werden ETFs/Fonds (`FUND`) aus der Einzelaktien-Auswertung
    ausgeschlossen,
-   werden historische und aktuelle Kursdaten über Twelve Data geladen,
-   werden US-Aktien für die Auswertung in EUR umgerechnet,
-   wird die Gesamtperformance der Einzelaktien berechnet,
-   wird für die tatsächlichen Kaufzeitpunkte und eingesetzten Beträge
    eine virtuelle Benchmark aufgebaut,
-   und der Performanceverlauf von Einzelaktien-Portfolio und Benchmark
    grafisch gegenübergestellt.

Als Benchmark wird aktuell der **iShares Core MSCI World UCITS ETF
(Acc)** verwendet (`URTH`, Twelve-Data-Notierung `NYSE`).

Damit wird nicht einfach die Entwicklung des MSCI World seit einem
beliebigen Startdatum angezeigt. Die Benchmark berücksichtigt die
tatsächlichen Investitionszeitpunkte und Beträge der erkannten
Aktienkäufe.

## Verwendung

1.  Repository bzw. GitHub-Pages-Web-App öffnen.
2.  Eigenen Twelve-Data-API-Key eintragen.
3.  Trade-Republic-Transaktionsexport als CSV auswählen.
4.  Startdatum kontrollieren.
5.  **„Alle Aktien berechnen"** auswählen.
6.  Einzelaktien-Performance und MSCI-World-Benchmark vergleichen.

Aufgrund von API-Limits können zwischen einzelnen Kursabfragen
Wartezeiten entstehen. Die App wartet in diesem Fall automatisch und
setzt die Berechnung anschließend fort.

Aktien, für die keine geeigneten Kursdaten gefunden werden können,
können von der Berechnung ausgeschlossen werden. Wenn der vorhandene
Transaktionsexport für eine Position keine vollständige Historie
enthält, kann ebenfalls keine zuverlässige Performance berechnet werden.

## Daten und API-Key

Die Anwendung läuft als clientseitige Web-App im Browser. Der
ausgewählte CSV-Export wird vom JavaScript der Anwendung verarbeitet.

Für Kursabfragen werden Anfragen an **Twelve Data** gesendet. Der Nutzer
ist selbst dafür verantwortlich, zu prüfen, welche Daten durch die
verwendete Anwendung, den Browser, den Hosting-Anbieter und externe
Dienste verarbeitet oder übertragen werden.

Es sollten grundsätzlich keine Dateien, Zugangsdaten oder sonstigen
Informationen verwendet oder veröffentlicht werden, deren Weitergabe
nicht beabsichtigt ist.

## Open Source, KI-Hinweis und Haftungsausschluss

Dieses Projekt wurde mit Unterstützung generativer KI erstellt. Der
Quellcode wurde nicht als professionell auditierte Finanz-, Sicherheits-
oder Datenschutzsoftware entwickelt.

**Vor der Nutzung, Veränderung oder Veröffentlichung sollte der
Quellcode eigenständig geprüft und nachvollzogen werden.**

Die Software wird ohne Gewährleistung bereitgestellt. Es wird keine
Garantie für Richtigkeit, Vollständigkeit, Verfügbarkeit, Sicherheit
oder Fehlerfreiheit der Berechnungen und Kursdaten übernommen.

Die dargestellten Ergebnisse dienen ausschließlich der persönlichen
Auswertung und stellen **keine Anlageberatung, Finanzberatung oder
Empfehlung zum Kauf oder Verkauf von Wertpapieren** dar.

Die Nutzung erfolgt auf eigene Verantwortung. Insbesondere ist jeder
Nutzer selbst dafür verantwortlich,

-   welche CSV-Dateien und sonstigen Daten er in die Anwendung lädt,
-   welche API-Keys oder Zugangsdaten er verwendet,
-   welche Daten er veröffentlicht oder mit Dritten teilt,
-   die Ergebnisse und Berechnungen vor einer weiteren Verwendung zu
    überprüfen,
-   und die Bedingungen der verwendeten APIs, Datenanbieter und
    Hosting-Dienste einzuhalten.

Der Autor bzw. die Mitwirkenden übernehmen, soweit rechtlich zulässig,
keine Haftung für Schäden, Verluste, Fehlentscheidungen, Datenverluste
oder sonstige Folgen, die aus der Nutzung des Codes oder der
dargestellten Ergebnisse entstehen.

## Hinweis zur Performanceberechnung

Die Anwendung ist als persönliches Analysewerkzeug gedacht.
Performanceberechnungen können sich je nach Behandlung von Gebühren,
Steuern, Dividenden, Währungen, Verkäufen, Teilverkäufen, fehlenden
Transaktionen und verfügbaren Kursdaten von den Angaben eines Brokers
oder anderer Portfolio-Tools unterscheiden.

Bei finanziellen Entscheidungen sollten die Ergebnisse daher nicht
ungeprüft verwendet werden.

## Projektstatus

Das Projekt ist experimentell und darf gerne nachvollzogen, verändert
und weiterentwickelt werden. Fehler, Sonderfälle und unvollständige
Instrumentenzuordnungen sind möglich.
