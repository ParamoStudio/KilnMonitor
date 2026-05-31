// ═══════════════════════════════════════════════════════════════
// PÁRAMO — Ogemray power snapshot script
// Publica un snapshot del consumo en MQTT a intervalos regulares
// para que la web lo registre durante una horneada.
//
// Modo dormant: cuando el relé está apagado solo publica un
// mensaje final de confirmación y luego silencio hasta que
// vuelva a encenderse. Evita saturar el broker con datos vacíos.
//
// Topic publicado:
//   shellies/<device_id>/power/snapshot
//
// Payload:
//   { ts, output, watts, amps, volts, tC, energyWh }
// ═══════════════════════════════════════════════════════════════

// Intervalo en milisegundos cuando el relé está ON.
// Debug: 6000 (6s) — Producción recomendada: 300000 (5 min)
let INTERVAL_MS = 30000;

// El topic se autoconstruye con el Client ID del propio Shelly.
let DEVICE_ID = Shelly.getDeviceInfo().id;
let TOPIC     = "shellies/" + DEVICE_ID + "/power/snapshot";

// Rastrea el último estado publicado para detectar el apagado
let lastOutputState = null;

function publishSnapshot() {
  let s = Shelly.getComponentStatus("switch", 0);
  if (!s) return;

  let currentOutput = s.output === true;

  // Modo dormant: si el relé lleva apagado desde el último ciclo, skip.
  // Solo publicamos si: (a) está ON, o (b) acaba de pasar de ON a OFF
  // (ese último mensaje informa a la web del apagado).
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

// Publicar uno inmediatamente al arrancar y luego cada INTERVAL_MS
publishSnapshot();
Timer.set(INTERVAL_MS, true, publishSnapshot);
