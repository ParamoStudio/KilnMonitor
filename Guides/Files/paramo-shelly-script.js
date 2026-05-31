// ═══════════════════════════════════════════════════════════════
// PÁRAMO — Ogemray power snapshot script
// Publishes a consumption snapshot to MQTT at regular intervals
// so the web app can log it during a firing.
//
// Dormant mode: when the relay is off it only publishes a single
// final confirmation message and then stays silent until it is
// switched on again. Avoids flooding the broker with empty data.
//
// Published topic:
//   shellies/<device_id>/power/snapshot
//
// Payload:
//   { ts, output, watts, amps, volts, tC, energyWh }
// ═══════════════════════════════════════════════════════════════
// Interval in milliseconds when the relay is ON.
// Debug: 6000 (6s) — Recommended production: 300000 (5 min)
let INTERVAL_MS = 30000;
// The topic is auto-built from the Shelly's own Client ID.
let DEVICE_ID = Shelly.getDeviceInfo().id;
let TOPIC     = "shellies/" + DEVICE_ID + "/power/snapshot";
// Tracks the last published state to detect power-off
let lastOutputState = null;
function publishSnapshot() {
  let s = Shelly.getComponentStatus("switch", 0);
  if (!s) return;
  let currentOutput = s.output === true;
  // Dormant mode: if the relay has been off since the last cycle, skip.
  // We only publish if: (a) it's ON, or (b) it just went from ON to OFF
  // (that final message tells the web app about the power-off).
  if (!currentOutput && lastOutputState === false) return;
  lastOutputState = currentOutput;
  let payload = {
    ts:       Math.floor(Date.now() / 1000),
    output:   currentOutput,
    watts:    (typeof s.apower   === "number") ? s.apower   : 0,
    amps:     (typeof s.current  === "number") ? s.current  : 0,
    volts:    (typeof s.voltage  === "number") ? s.voltage  : 0,
    tC:       (s.temperature && typeof s.temperature.tC === "number") ? s.temperature.tC : null,
    energyWh: (s.aenergy && typeof s.aenergy.total === "number") ? s.aenergy.total : 0
  };
  MQTT.publish(TOPIC, JSON.stringify(payload), 0, false);
}
// Publish one immediately on startup and then every INTERVAL_MS
publishSnapshot();
Timer.set(INTERVAL_MS, true, publishSnapshot);
