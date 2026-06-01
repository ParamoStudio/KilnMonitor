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
    ├── en.json         # English strings (source of truth)
    ├── es.json         # Spanish
    ├── cat.json        # Catalan
    ├── de.json         # German
    ├── fr.json         # French
    ├── ru.json         # Russian
    ├── zh.json         # Chinese (Simplified)
    └── jap.json        # Japanese
```

English also lives inline in each HTML as an offline fallback; every other language is loaded only from its JSON file.

You can add any language you need if yours is not already there:

1. Copy `en.json` and translate the **values** (not the keys). Keep `{placeholders}`, `<br>` and `\n` intact, and leave proper nouns (Páramo, HiveMQ, etc.) untranslated.
2. Name it `xx.json` (e.g. `jap.json` for Japanese) and update its `_meta` block.
3. Add the code `"xx"` to `manifest.json`.
4. Reload the site. Clear the cache and reload again if it doesn't show up.

Full guide: [Add a Language](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Add%20a%20Language.md).

---

## Features

**Live monitoring**
Connects to your kiln's ESP32 via HiveMQ Cloud (MQTT over WebSocket). Temperature, cold junction, ramp rate, and session stats update in real time. The ESP32 publishes a circular history buffer on connect so the chart reconstructs even if you weren't watching.

**Firing modes**
Select a firing type (Bisque, Glaze, Crystalline, Raku) to overlay a reference ramp curve on the chart and tag the session for later search.

**Alarm threshold**
Set a target temperature — the ESP32 fires an alert once when it's reached, independently of the browser. A separate cooldown alarm can warn you once the kiln has cooled past a safe point.

**Kiln power**
Optional MQTT relay bridge to cut kiln power remotely in case of emergency. See the [Kiln Power Guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Kiln%20Power).

**Kiln type**
Tag each kiln as electric, gas, wood or other — controls which power options appear and lets you filter by type in the journal.

**Notes**
Add free-text observations during or after a firing before exporting. Saved with the session JSON.

**Export / Import / Reset**
Export your full configuration and firing data as JSON. Re-import on any device. Useful for backups and moving between setups.

**Firing journal**
Searchable database of all your exported sessions. Load files locally or connect Google Drive for automatic sync. Filter by date, temperature, duration, firing type, kiln type and target cone. Export any firing as a printable greyscale PNG to share or keep on paper.

**Internationalisation**
UI available in eight languages, switchable from a dropdown: English, Spanish, Catalan, German, French, Russian, Chinese and Japanese. Your choice persists across sessions and pages. Adding a new language is a matter of dropping a JSON file into `/lang/` and its code into `manifest.json`.

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
