# Kiln Power Guide

**EN** — [Ver en español](#guía-de-kiln-power)

Páramo can control a smart relay to cut kiln power remotely — useful when a firing goes wrong and you can't be in the studio. This guide covers how to connect an **Ogemray 25A SW40PbS** (or any Shelly Gen2-compatible relay) to Páramo's MQTT dashboard.

The relay integrates over the same HiveMQ broker your ESP32 already uses. No additional hardware on the ESP32 side is required.

---

## Supported hardware

The recommended relay is the **Ogemray 25A SW40PbS** ([technical documentation](https://shelly-api-docs.shelly.cloud/gen2/Devices/PoweredByShelly/Ogemray25A/)), rated for up to 25A / 230V AC. It includes a power meter, so Páramo can also display live watts, amps, and voltage during a firing — useful for tracking energy consumption and diagnosing heating element degradation over time.

Any **Shelly Gen2 or Gen2+ device** with the same MQTT control interface should work with minor adjustments.

> **Important:** This setup is designed for **single-phase electric kilns**. A gas kiln solution is currently being studied — see [Gas kilns](#gas-kilns) below.

---

## How it works

```
Kiln Power button (web) → HiveMQ broker → Ogemray relay → kiln
                                       ↑
                          Ogemray script publishes
                          power snapshots every 5 min
```

The web dashboard publishes a plain-text `on` or `off` command to an MQTT topic the Ogemray is subscribed to. The Ogemray executes the command and publishes a status confirmation. The ESP32 monitors that confirmation and sends an ntfy notification to your phone.

---

## Wiring

> **Warning:** Work with the relay unplugged from the mains. If you are not confident working with mains wiring, have a qualified electrician do this part.

The Ogemray 25A has five terminals:

| Terminal | Side | Connect to |
|----------|------|------------|
| **N** | Power | Mains neutral |
| **L** | Power | Mains live (phase) |
| **L1** | Power | Kiln live input |
| **COM** | Control | Leave unconnected (or switch GND if using physical button) |
| **S1** | Control | Leave unconnected (or switch signal if using physical button) |

The module powers itself from **L + N**. The relay switches the live line between **L** and **L1**. Neutral and earth pass through independently — do not break the neutral or earth through the relay.

### Step-by-step

- [ ] Cut power at the breaker before touching any wiring.
- [ ] Run mains live (brown) to terminal **L**.
- [ ] Run mains neutral (blue) to terminal **N**.
- [ ] Connect earth (yellow-green) directly to kiln — it does not pass through the relay.
- [ ] Run a wire from terminal **L1** to the kiln's live input.
- [ ] Restore power. The Ogemray LED should light up.

For a lamp test (recommended before connecting to the kiln), wire a lamp socket between **L1** (live) and a neutral tap in parallel with **N**. The relay will switch the lamp.

---

## Ogemray MQTT configuration

Once the Ogemray has joined your WiFi (follow its first-boot AP setup), open its local web interface at its IP address and go to **Settings → MQTT**.

- [ ] Enable MQTT: **on**
- [ ] Connection type: **TLS no validation** (for HiveMQ Cloud)
- [ ] Server: `your-cluster.s1.eu.hivemq.cloud:8883`
- [ ] Username: your HiveMQ username
- [ ] Password: your HiveMQ password
- [ ] Client ID: leave as default (e.g. `ogemray25a-089272451f04`)
- [ ] Enable MQTT Control: **on**
- [ ] Enable RPC over MQTT: **on**
- [ ] RPC status notifications over MQTT: **on**
- [ ] Generic status update over MQTT: **on**
- [ ] Save and reboot.

After reboot, subscribe to `#` in the HiveMQ web client. You should see messages appearing from the Ogemray within a few seconds.

---

## Páramo script for the Ogemray

The Ogemray runs a small script that publishes power snapshots to the broker every 5 minutes while the relay is ON. When the relay is OFF, it goes silent (dormant mode) to avoid filling the broker with zero-watt noise.

**Install the script:**

1. Open the Ogemray's local web interface.
2. Go to **Scripts → Add script**.
3. Name it `paramo-power`.
4. Paste the contents of [`paramo-shelly-script.js`](https://github.com/ParamoStudio/KilnMonitor/blob/main/paramo-shelly-script.js).
5. Click **Save**, then **Start**.
6. Enable **Run on startup**.

The script auto-detects the device's own Client ID and builds its topic automatically — no configuration needed inside the script.

---

## Páramo web configuration

In the Páramo dashboard, open the **Kiln Power** card in the sidebar.

- [ ] Set **Kiln type** to `Electric`.
- [ ] Enter your average electricity price in **Avg. price per kWh** and select your currency. This is saved per firing and used in the Journal to estimate firing cost.
- [ ] The relay status and power readings (W, A, V, relay temperature) will populate automatically once the Ogemray connects to the broker — no manual device ID entry required.

The dashboard detects the Ogemray from the first incoming MQTT message and caches its ID locally.

---

## Using Kiln Power

Once everything is connected:

- **Turn on / Turn off** — the button in the Kiln Power card sends the command immediately. The relay responds within a few seconds and the status updates.
- **Emergency cutoff** — press Turn off from anywhere with internet access. Your ESP32 will send an ntfy notification to your phone confirming the relay changed state.
- **Power monitoring** — during a firing, the sidebar displays live watts, amps, volts, and relay module temperature. At export, the firing JSON includes a power log sampled every 5 minutes, and the Journal shows total energy consumed and estimated cost.

---

## Troubleshooting

**Relay does not appear in the dashboard**
Subscribe to `#` in the HiveMQ web client and check for messages from the Ogemray. If nothing appears, check that TLS is enabled in the Ogemray MQTT settings and that the server address includes the port (`:8883`).

**Commands sent but relay does not respond**
Verify that **Enable MQTT Control** is checked in the Ogemray MQTT settings. This is the option that enables the `command/switch:0` topic the dashboard uses.

**Power readings show `—`**
The script may not be running. Check Scripts in the Ogemray interface and confirm `paramo-power` is active and set to run on startup.

**Relay module temperature is high**
The Ogemray 25A includes a small heatsink. Sustained loads above 16A in a warm enclosure can push temperatures above 70°C. Ensure adequate ventilation around the relay.

---

## Gas kilns

> Work in progress

A solution for gas kilns is currently being studied. The goal is a non-invasive actuator — mounted externally on an existing manual shutoff — that can close the gas supply remotely without modifying the gas installation itself.

The most promising direction is a motorised actuator fitted to a **quarter-turn ball valve handle** at the burner outlet, controlled by a dedicated ESP32 and integrated into the same MQTT infrastructure as the rest of Páramo. No electrovalves, no plumbing work.

As a reference point within the Shelly ecosystem, the [Shelly GAS Add-on Manipulator](https://www.shelly.com/products/shelly-gas-add-on) is a commercially available motorised actuator designed to physically operate gas shutoff valves. While it targets residential appliances rather than ceramic kilns specifically, it represents the same principle and confirms the approach is technically viable as a finished product.

This section will be updated once the hardware design is validated. If you have a gas kiln and want to follow or contribute to this work, open an issue on the repository.

---

*Part of the [Páramo Kiln Monitor](https://github.com/ParamoStudio/KilnMonitor) project.*

---
---

# Guía de Kiln Power

**ES** — [See in English](#kiln-power-guide)

Páramo puede controlar un relé inteligente para cortar la alimentación del horno a distancia — útil cuando una horneada va mal y no puedes estar en el taller. Esta guía explica cómo conectar un **Ogemray 25A SW40PbS** (o cualquier relé compatible con Shelly Gen2) al panel MQTT de Páramo.

El relé se integra a través del mismo broker HiveMQ que ya usa tu ESP32. No se necesita hardware adicional en el lado del ESP32.

---

## Hardware recomendado

El relé recomendado es el **Ogemray 25A SW40PbS** ([documentación técnica](https://shelly-api-docs.shelly.cloud/gen2/Devices/PoweredByShelly/Ogemray25A/)), con capacidad de hasta 25A / 230V AC. Incluye un medidor de potencia, lo que permite a Páramo mostrar vatios, amperios y tensión en tiempo real durante una horneada — útil para seguir el consumo energético y detectar el desgaste de las resistencias a lo largo del tiempo.

Cualquier **dispositivo Shelly Gen2 o Gen2+** con la misma interfaz de control MQTT debería funcionar con pequeños ajustes.

> **Importante:** Esta configuración está diseñada para **hornos eléctricos monofásicos**. Hay una solución para hornos de gas en estudio — ver [Hornos de gas](#hornos-de-gas) más abajo.

---

## Cómo funciona

```
Botón Kiln Power (web) → broker HiveMQ → relé Ogemray → horno
                                      ↑
                         Script del Ogemray publica
                         snapshots de consumo cada 5 min
```

El panel web publica un comando de texto plano `on` u `off` en un topic MQTT al que el Ogemray está suscrito. El Ogemray ejecuta el comando y publica una confirmación de estado. El ESP32 monitoriza esa confirmación y envía una notificación ntfy a tu móvil.

---

## Cableado

> **Aviso:** Trabaja con el relé desenchufado de la red. Si no tienes experiencia con cableado de red eléctrica, encarga esta parte a un electricista.

El Ogemray 25A tiene cinco terminales:

| Terminal | Lado | Conectar a |
|----------|------|------------|
| **N** | Potencia | Neutro de red |
| **L** | Potencia | Fase de red |
| **L1** | Potencia | Entrada de fase del horno |
| **COM** | Control | Dejar libre (o GND del pulsador si se usa) |
| **S1** | Control | Dejar libre (o señal del pulsador si se usa) |

El módulo se alimenta desde **L + N**. El relé conmuta la fase entre **L** y **L1**. El neutro y la tierra pasan de forma independiente — no cortes el neutro ni la tierra a través del relé.

### Paso a paso

- [ ] Corta la corriente en el cuadro eléctrico antes de tocar cualquier cable.
- [ ] Conecta la fase de red (marrón) al terminal **L**.
- [ ] Conecta el neutro de red (azul) al terminal **N**.
- [ ] Conecta la tierra (amarillo-verde) directamente al horno — no pasa por el relé.
- [ ] Conecta un cable desde el terminal **L1** a la entrada de fase del horno.
- [ ] Restablece la corriente. El LED del Ogemray debe encenderse.

Para una prueba con lámpara (recomendada antes de conectar al horno), cablea un casquillo entre **L1** (fase) y un neutro en paralelo con **N**. El relé conmutará la lámpara.

---

## Configuración MQTT del Ogemray

Una vez que el Ogemray se haya unido a tu WiFi (sigue el proceso de primer arranque en modo AP), abre su interfaz web local en su dirección IP y ve a **Ajustes → MQTT**.

- [ ] Habilitar MQTT: **activado**
- [ ] Tipo de conexión: **TLS sin validación** (para HiveMQ Cloud)
- [ ] Servidor: `tu-cluster.s1.eu.hivemq.cloud:8883`
- [ ] Usuario: tu usuario de HiveMQ
- [ ] Contraseña: tu contraseña de HiveMQ
- [ ] Client ID: dejar el valor por defecto (p. ej. `ogemray25a-089272451f04`)
- [ ] Habilitar MQTT Control: **activado**
- [ ] Habilitar RPC sobre MQTT: **activado**
- [ ] Notificaciones de estado RPC sobre MQTT: **activado**
- [ ] Actualización genérica de estado sobre MQTT: **activado**
- [ ] Guardar y reiniciar.

Tras el reinicio, suscríbete a `#` en el cliente web de HiveMQ. En pocos segundos deberían aparecer mensajes del Ogemray.

---

## Script de Páramo para el Ogemray

El Ogemray ejecuta un pequeño script que publica snapshots de consumo al broker cada 5 minutos mientras el relé está encendido. Cuando el relé está apagado, el script entra en modo silencioso para no llenar el broker con datos de cero vatios.

**Instalar el script:**

1. Abre la interfaz web local del Ogemray.
2. Ve a **Scripts → Añadir script**.
3. Ponle el nombre `paramo-power`.
4. Pega el contenido de [`paramo-shelly-script.js`](https://github.com/ParamoStudio/KilnMonitor/blob/main/paramo-shelly-script.js).
5. Haz clic en **Guardar** y luego en **Iniciar**.
6. Activa **Ejecutar al arrancar**.

El script detecta automáticamente el Client ID del propio dispositivo y construye su topic solo — no hay nada que configurar dentro del script.

---

## Configuración en la web de Páramo

En el panel de Páramo, abre la tarjeta **Kiln Power** en el panel lateral.

- [ ] Establece el **Tipo de horno** en `Eléctrico`.
- [ ] Introduce tu precio medio de electricidad en **Precio medio por kWh** y selecciona tu divisa. Este dato se guarda con cada horneada y el Journal lo usa para calcular el coste aproximado.
- [ ] El estado del relé y las lecturas de consumo (W, A, V, temperatura del relé) aparecerán automáticamente en cuanto el Ogemray se conecte al broker — no es necesario introducir el ID del dispositivo manualmente.

El panel detecta el Ogemray a partir del primer mensaje MQTT entrante y guarda su ID en caché localmente.

---

## Uso de Kiln Power

Una vez conectado todo:

- **Encender / Apagar** — el botón de la tarjeta Kiln Power envía el comando de forma inmediata. El relé responde en unos segundos y el estado se actualiza.
- **Corte de emergencia** — pulsa Apagar desde cualquier lugar con acceso a internet. Tu ESP32 enviará una notificación ntfy a tu móvil confirmando el cambio de estado del relé.
- **Monitorización de consumo** — durante una horneada, el panel lateral muestra vatios, amperios, voltios y temperatura del módulo del relé en tiempo real. Al exportar, el JSON de la horneada incluye un registro de consumo muestreado cada 5 minutos, y el Journal muestra la energía total consumida y el coste estimado.

---

## Resolución de problemas

**El relé no aparece en el panel**
Suscríbete a `#` en el cliente web de HiveMQ y comprueba si aparecen mensajes del Ogemray. Si no aparece nada, verifica que TLS esté activado en la configuración MQTT del Ogemray y que la dirección del servidor incluya el puerto (`:8883`).

**Se envían comandos pero el relé no responde**
Comprueba que **Habilitar MQTT Control** esté marcado en la configuración MQTT del Ogemray. Es la opción que activa el topic `command/switch:0` que usa el panel.

**Las lecturas de consumo muestran `—`**
Es posible que el script no esté en ejecución. Comprueba Scripts en la interfaz del Ogemray y confirma que `paramo-power` está activo y configurado para ejecutarse al arrancar.

**La temperatura del módulo del relé es alta**
El Ogemray 25A incluye un pequeño disipador. Cargas sostenidas superiores a 16A en un espacio cerrado y cálido pueden superar los 70°C. Asegúrate de que haya ventilación suficiente alrededor del relé.

---

## Hornos de gas

> En desarrollo

Se está estudiando una solución para hornos de gas. El objetivo es un actuador no invasivo — montado externamente sobre un cierre manual ya existente — que pueda cortar el suministro de gas a distancia sin modificar la instalación de gas.

La dirección más prometedora es un actuador motorizado acoplado al **mango de un grifo de bola de cuarto de vuelta** a la salida del quemador, controlado por un ESP32 dedicado e integrado en la misma infraestructura MQTT que el resto de Páramo. Sin electroválvulas, sin obras de fontanería.

Como referencia dentro del ecosistema Shelly, el [Shelly GAS Add-on Manipulator](https://www.shelly.com/products/shelly-gas-add-on) es un actuador motorizado comercial diseñado para operar físicamente válvulas de corte de gas. Aunque está orientado a electrodomésticos residenciales y no a hornos cerámicos específicamente, representa el mismo principio y confirma que el enfoque es técnicamente viable como producto terminado.

Esta sección se actualizará cuando el diseño de hardware esté validado. Si tienes un horno de gas y quieres seguir o contribuir a este trabajo, abre un issue en el repositorio.

---

*Parte del proyecto [Páramo Kiln Monitor](https://github.com/ParamoStudio/KilnMonitor).*
