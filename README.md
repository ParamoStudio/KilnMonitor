# Páramo — Web Application

Browser-based monitoring dashboard for the Páramo Kiln Monitor. Connects to your ESP32 device via MQTT over WebSocket — no backend server required.

→ **Live app:** [paramostudio.github.io/KilnMonitor](https://paramostudio.github.io/KilnMonitor)

---

## Structure

```
/
├── index.html          # Main dashboard
├── info.html           # Guide, contact and licence page
├── journal.html        # Firing history and search tool
├── favicon.ico
└── lang/
    ├── manifest.json   # Available languages
    ├── en.json         # English strings
    └── es.json         # Spanish strings
```
You can add any language you need if your preffered one is not already implemented!
1. Copy the en.json and translate the texts to any language you preffer.
2. Call it X.json (Example: JAP for Japanese)
3. Add Jap.json to the Manifest.json.
4. Reload the website. Delete cache and reload again if it is not working.
---

## Features

**Live monitoring**
Connects to your kiln's ESP32 via HiveMQ Cloud (MQTT over WebSocket). Temperature, cold junction, ramp rate, and session stats update in real time. The ESP32 publishes a circular history buffer on connect so the chart reconstructs even if you weren't watching.

**Firing modes**
Select a firing type (Bisque, Glaze, Crystalline, Raku) to overlay a reference ramp curve on the chart and tag the session for later search.

**Alarm threshold**
Set a target temperature — the ESP32 fires an alert once when it's reached, independently of the browser.

**Kiln power**
Optional MQTT relay bridge to cut kiln power remotely in case of emergency. See the [Kiln Power Guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Kiln%20Power).

**Notes**
Add free-text observations during or after a firing before exporting. Saved with the session JSON.

**Export / Import / Reset**
Export your full configuration and firing data as JSON. Re-import on any device. Useful for backups and moving between setups.

**Firing journal**
Searchable database of all your exported sessions. Load files locally or connect Google Drive for automatic sync. Filter by date, temperature, duration, and firing type.

**Internationalisation**
UI language switches between English and Spanish via a dropdown. Language preference persists across sessions. Adding a new language is a matter of adding a JSON file to `/lang/` and its code to `manifest.json`.

**Dark / light theme**
Synced with the dashboard via `localStorage`. Persists across pages.

**PWA-ready**
Add to home screen on mobile and use as a web app. No install required.

---

## Licence

This web application is released under the **GNU Affero General Public License v3.0**.

The AGPL was chosen deliberately. If you run a modified version of this software as an online service, you must publish your source code under the same terms. No silent forks. No proprietary cloud wrappers.

Full licence text and the reasoning behind it: [LICENSE](./LICENSE) · [github.com/ParamoStudio/KilnMonitor](https://github.com/ParamoStudio/KilnMonitor)

---

## Part of the Páramo Kiln Monitor project

This webapp is one component of a wider open hardware project. The full stack — firmware, hardware designs, and documentation — lives at [github.com/ParamoStudio/KilnMonitor](https://github.com/ParamoStudio/KilnMonitor).

*Open source. Anti-obsolescence. Built by a ceramicist who needed a tool.*
