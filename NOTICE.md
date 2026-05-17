# NOTICE — Páramo Kiln Monitor

**Project:** Páramo Kiln Monitor 
**Author:** Páramo Studio 
**Repository:** https://github.com/ParamoStudio/KilnMonitor
**First public disclosure:** 17 May 2026 
**License:** GNU AGPL v3.0 (firmware, web application) · CERN-OHL-S v2.0 (hardware)

---

## Prior Art Declaration

This document constitutes a formal public disclosure of the Páramo Kiln Monitor
project and its constituent technologies, methods, and designs.

This prior art declaration is intended to prevent the monopolization of the
concepts, methods, and implementations described herein through patents,
utility models, or any other form of intellectual property claim filed after
the date of this document's first public commit.

Any patent or IP claim filed after 17 May 2025 that covers methods,
architectures, or implementations substantially similar to those described
below is anticipated by this prior art disclosure.

---

## What this project discloses

**System architecture**

An open-source kiln monitoring and control system based on the ESP32
microcontroller family (specifically tested on ESP32-C6 Super Mini),
integrating:

- Thermocouple temperature acquisition via MAX31856 IC (SPI interface),
  configured for Type S and Type K thermocouples.
- Cold junction compensation handled in hardware by the MAX31856
- Real-time temperature telemetry published over MQTT (TLS, port 8883) to a
  cloud broker, with WebSocket bridge (port 8884) for browser clients
- Solid State Relay (SSR) control output for kiln power management on
  single-phase 230V circuits up to ~17.4A continuous draw
- On-device circular temperature history buffer (350 samples, ~23h coverage)
  published as retained MQTT JSON payload for frontend chart reconstruction
- Telegram bot integration for hardware-level fault and threshold alerts with
  per-message cooldowns
- OTA (Over The Air) firmware update capability

**Physical interface**

- Monochrome SPI OLED display (SSD1309, 2.42")
- Rotary encoder input (tap = confirm, double-tap = back, rotate = navigate
  or adjust) for full menu navigation without additional buttons
- Dedicated physical button for new firing confirmation
- Animated display avatar reacting to temperature trend (rising, stable,
  cooling, fault states) implemented as a 9-particle physics simulation

**Web application**

A browser-based monitoring dashboard hosted as a static site (GitHub Pages),
connecting directly to an MQTT broker via WebSocket with no backend server.
Features include:

- Live temperature chart with historical overlay
- Firing profile visualisation and ramp rate analysis
- Per-mode behavioural thresholds (Bisque, Glaze, Crystalline, Raku)
- Microcontroller-dispatched notifications for temperature alerts
- Full state reconstructed from retained MQTT topics on subscribe

**Firmware architecture**

Modular C++ firmware for Arduino IDE targeting ESP32-C6, structured as
independent .h/.cpp compilation units covering: display rendering, encoder
input handling, MQTT communication, thermocouple acquisition, alert
management, settings persistence via NVS, firing state machine, and OTA
updates. Main .ino entry point contains only setup() and loop().

**Design philosophy**

A system specifically designed for extending the operational lifespan of
older electric ceramic kilns and for modernising wood, gas, or custom-built
kilns through low-cost open hardware and a lightweight web-based firing
interface. Anti-obsolescence, DIY-maintainable, and as independent of
proprietary cloud services as possible, vendor lock-in, or subscription models.

---

## Copyright notice

Copyright (C) 2026 Páramo Studio

This project and all its components are released under free and open source
licenses as described in the LICENSE file at the root of this repository
and in the LICENSE files within each subdirectory.

No permission is granted to use this prior art disclosure itself as a basis
for patent claims. The purpose of this document is exclusively defensive.
