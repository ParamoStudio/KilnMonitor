<a name="top-en"></a>

# Troubleshooting

> **Language / Idioma** — This guide is in **English**. ¿Prefieres español? → [**Salta a la versión en castellano**](#solucion-de-problemas-espanol)

> **This is a living document.** Páramo is an evolving, one-person project, and some failure modes will only surface (and get properly documented) after extensive real-world firing. If you hit something not listed here, it's genuinely useful feedback — please open an issue on GitHub.

This guide is aimed at the **everyday user** of a Páramo monitor that's already built or bought: what you might see, and what to do about it, in plain terms. Anything that involves wiring, code, the serial console, or flashing firmware lives in the separate **[Build Your Own](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Build%20Your%20Own.md)**, not here.

A general rule before anything else: **if something behaves strangely, the first thing to try is turning the monitor off and on again.** A surprising number of transient glitches clear with a clean restart.

---

## Display & startup

| Symptom | Likely cause | What to do |
|---|---|---|
| Screen stays completely black | No power, or a loose USB / power connection | Check the cable and power source. Try a different USB cable or adapter — many cables are charge-only and carry no data/stable power. |
| Stuck on the boot logo / animation | Can't get past WiFi connection, or a one-off glitch | Wait a full minute (first WiFi connection can be slow). If still stuck, power-cycle. If it persists, see WiFi section below. |
| Screen on but frozen / not updating | Software hiccup | Power-cycle the monitor. If it recurs often, note what you were doing and report it. |
| Faint, garbled, or partial display | Display connection or a damaged screen | If you built it, this is a hardware/wiring matter — see the Build guide. If bought, contact support. |

---

## Temperature readings

This is the most common area, and most of it comes down to the thermocouple. See the [Thermocouples guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md) for full detail on the sensor itself.

| Symptom | Likely cause | What to do |
|---|---|---|
| Reads `FAULT`, or an open-circuit / sensor error | Broken internal thermocouple wire, or a bad connection at the plug | Re-seat the thermocouple plug. Check the screw terminals are tight. If it persists, the probe's internal wire is most likely broken — request a replacement. This is the single most common thermocouple failure. |
| Temperature goes **down** when it should go **up** | Thermocouple wires reversed (polarity) | Swap the two thermocouple wires. No damage results from reversed polarity. |
| Wildly wrong or jumpy readings | Loose connection, wrong cable type, or interference | Make sure you're using proper Type S compensating cable (not hi-fi / speaker wire). Check all connections are firm. |
| Reading drifts slowly off over months | Normal thermocouple ageing | Cross-check against a witness cone. Type S drifts very little, but no sensor lasts forever. |
| No sensor detected at all | Plug not connected, or internal wiring (self-build) | Confirm the thermocouple is plugged into the housing. If self-built, see the Build guide. |

---

## WiFi & device connection

| Symptom | Likely cause | What to do |
|---|---|---|
| Monitor won't join your WiFi | Wrong password, or 5 GHz-only network | Most hobby microcontrollers only support **2.4 GHz** WiFi. Make sure you're giving it a 2.4 GHz network, not 5 GHz only. Double-check the password. |
| A "Kiln Setup" WiFi network appears | The monitor is in setup mode (captive portal) | This is normal on first use or after a reset. Connect your phone to it and enter your home WiFi details in the page that opens. |
| Connects but drops out repeatedly | Weak signal where the kiln is | Kilns are often in garages or outbuildings with poor coverage. Consider a WiFi extender or moving the router closer. |
| Was working, now offline | Router changed, password changed, or signal lost | If you changed your WiFi, re-run setup. Otherwise check signal and power-cycle. |

---

## The web dashboard

The dashboard and the monitor both connect to an MQTT server in the middle — see the [MQTT Server guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Server.md). Most dashboard problems are really connection problems.

| Symptom | Likely cause | What to do |
|---|---|---|
| Dashboard won't connect to the server | Wrong host / username / password | Re-check the three connection fields against your MQTT account. They must match exactly. |
| Connected, but no temperature appears | The monitor isn't online or isn't publishing | Check the monitor itself is powered, on WiFi, and showing a reading on its screen. The dashboard only shows what the monitor sends. |
| Chart is empty after opening | History still loading, or a fresh session | Give it a few seconds to pull recent history. A brand-new firing starts with an empty chart by design. |
| Old data won't go away | Retained history on the server | Use the "New firing" / clear function to start clean. |
| Works on one device, not another | Browser, network, or credentials on that device | Try another browser; confirm the connection details were entered on that device too. |

---

## Relay & power cut-off (electric kilns)

The optional relay lets the dashboard cut kiln power. If you don't use one, ignore this section.

| Symptom | Likely cause | What to do |
|---|---|---|
| Power panel stays greyed out | The dashboard hasn't heard from the relay yet | On connect it waits for the relay to respond before activating. Give it up to a minute. If it never activates, the relay isn't reachable — see next row. |
| "Relay not responding — check connections" | The relay is offline or unreachable | Check the relay has power and is on your WiFi/MQTT. Confirm it's the right device. Power-cycle it. |
| Relay command does nothing / times out | Relay lost connection mid-session | The panel greys out after a failed command. Once the relay is back, it reactivates on its own. |
| Not sure if the relay is safe to rely on | It's a remote convenience, not a safety device | Treat remote power cut-off as a convenience. Never rely on it as your only safety measure around a kiln. |

---

## Notifications (ntfy)

| Symptom | Likely cause | What to do |
|---|---|---|
| No notifications arriving | Topic not subscribed on your phone, or wrong topic | Make sure your phone's ntfy app is subscribed to the exact topic set on the monitor. |
| Some notifications, not others | Different events have different triggers | Faults, thresholds and cooldown each fire under their own conditions — not every event sends every time. |
| Delayed notifications | Phone battery / background restrictions | Phones often throttle background apps. Check the ntfy app is allowed to run and notify in the background. |

---

## When to ask for help

If you've worked through the relevant section and it's still not right, open an issue on the [GitHub repository](https://github.com/ParamoStudio/KilnMonitor). Useful things to include: what you saw, what the monitor's screen showed, whether it's self-built or bought, and what you'd already tried. Because this is an evolving project, your report may be the thing that gets a new row added to this very guide.

---
---

<a name="solucion-de-problemas-espanol"></a>

# Solución de problemas (Español)

> **Idioma / Language** — Esta es la versión en **castellano**. English version above ↑ — [**volver arriba**](#top-en).

> **Este es un documento vivo.** Páramo es un proyecto en evolución y de una sola persona, y algunos fallos solo saldrán a la luz (y se documentarán como es debido) tras hornear mucho en el mundo real. Si te encuentras con algo que no está aquí, es información muy útil — por favor, abre una incidencia en GitHub.

Esta guía está pensada para el **usuario corriente** de un monitor Páramo ya montado o comprado: qué puedes ver y qué hacer al respecto, en términos sencillos. Todo lo que implique cableado, código, la consola serie o flashear el firmware vive en la **[Build Your Own](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Build%20Your%20Own.md)** aparte, no aquí.

Una regla general antes de nada: **si algo se comporta de forma rara, lo primero que hay que probar es apagar el monitor y volver a encenderlo.** Un número sorprendente de fallos pasajeros se arregla con un reinicio limpio.

---

## Pantalla y arranque

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| La pantalla se queda completamente negra | Sin alimentación, o una conexión USB / de corriente floja | Revisa el cable y la fuente de alimentación. Prueba otro cable o adaptador USB — muchos cables son solo de carga y no llevan datos ni corriente estable. |
| Se queda en el logo / la animación de arranque | No consigue pasar de la conexión WiFi, o un fallo puntual | Espera un minuto entero (la primera conexión WiFi puede ser lenta). Si sigue atascado, apaga y enciende. Si persiste, mira la sección de WiFi más abajo. |
| Pantalla encendida pero congelada / sin actualizarse | Tropiezo del software | Apaga y enciende el monitor. Si se repite a menudo, anota qué estabas haciendo y repórtalo. |
| Pantalla tenue, con basura o incompleta | Conexión de la pantalla o pantalla dañada | Si lo montaste tú, es un asunto de hardware/cableado — mira la guía de construcción. Si lo compraste, contacta con soporte. |

---

## Lecturas de temperatura

Es la zona más habitual, y casi todo se reduce al termopar. Consulta la [guía de termopares](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md) para el detalle completo del sensor.

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Marca `FAULT`, o un error de circuito abierto / de sensor | Hilo interno del termopar roto, o mala conexión en el enchufe | Vuelve a encajar el enchufe del termopar. Comprueba que los tornillos están apretados. Si persiste, lo más probable es que el hilo interno de la sonda esté roto — pide un recambio. Es el fallo de termopar más común con diferencia. |
| La temperatura **baja** cuando debería **subir** | Hilos del termopar invertidos (polaridad) | Intercambia los dos hilos del termopar. La polaridad invertida no causa ningún daño. |
| Lecturas disparatadas o que dan saltos | Conexión floja, tipo de cable incorrecto o interferencias | Asegúrate de usar cable de compensación de Tipo S de verdad (no cable hi-fi / de altavoz). Comprueba que todas las conexiones están firmes. |
| La lectura se desvía poco a poco a lo largo de meses | Envejecimiento normal del termopar | Contrasta con un cono testigo. El Tipo S se desvía muy poco, pero ningún sensor dura para siempre. |
| No detecta ningún sensor | Enchufe sin conectar, o cableado interno (autoconstruido) | Confirma que el termopar está enchufado a la carcasa. Si lo montaste tú, mira la guía de construcción. |

---

## WiFi y conexión del dispositivo

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| El monitor no se une a tu WiFi | Contraseña incorrecta, o red solo de 5 GHz | La mayoría de microcontroladores de aficionado solo admiten WiFi de **2,4 GHz**. Asegúrate de darle una red de 2,4 GHz, no una solo de 5 GHz. Revisa la contraseña. |
| Aparece una red WiFi llamada "Kiln Setup" | El monitor está en modo configuración (portal captivo) | Es normal en el primer uso o tras un reinicio de fábrica. Conecta tu móvil a ella e introduce los datos de tu WiFi de casa en la página que se abre. |
| Conecta pero se cae repetidamente | Señal débil donde está el horno | Los hornos suelen estar en garajes o casetas con mala cobertura. Plantéate un repetidor WiFi o acercar el router. |
| Funcionaba y ahora está desconectado | Cambió el router, la contraseña, o se perdió señal | Si cambiaste tu WiFi, vuelve a hacer la configuración. Si no, comprueba la señal y apaga y enciende. |

---

## El panel web

El panel y el monitor se conectan los dos a un servidor MQTT intermedio — mira la [guía del servidor MQTT](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Server.md). La mayoría de problemas del panel son en realidad problemas de conexión.

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| El panel no conecta con el servidor | Host / usuario / contraseña incorrectos | Vuelve a revisar los tres campos de conexión contra tu cuenta MQTT. Tienen que coincidir exactamente. |
| Conecta, pero no aparece temperatura | El monitor no está en línea o no está publicando | Comprueba que el propio monitor tiene corriente, está en la WiFi y muestra una lectura en su pantalla. El panel solo muestra lo que el monitor envía. |
| La gráfica está vacía al abrir | El historial aún se está cargando, o es una sesión nueva | Dale unos segundos para traer el historial reciente. Una horneada recién empezada arranca con la gráfica vacía a propósito. |
| Los datos viejos no desaparecen | Historial retenido en el servidor | Usa la función de "Nueva horneada" / borrar para empezar limpio. |
| Funciona en un dispositivo, en otro no | Navegador, red o credenciales en ese dispositivo | Prueba otro navegador; confirma que los datos de conexión también se introdujeron en ese dispositivo. |

---

## Relé y corte de potencia (hornos eléctricos)

El relé opcional permite al panel cortar la corriente del horno. Si no usas uno, ignora esta sección.

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| El panel de potencia se queda en gris | El panel aún no ha tenido noticia del relé | Al conectar, espera a que el relé responda antes de activarse. Dale hasta un minuto. Si no se activa nunca, el relé no es alcanzable — mira la fila siguiente. |
| "El relé no responde — revisa las conexiones" | El relé está apagado o inalcanzable | Comprueba que el relé tiene corriente y está en tu WiFi/MQTT. Confirma que es el dispositivo correcto. Apágalo y enciéndelo. |
| El comando del relé no hace nada / agota el tiempo | El relé perdió la conexión a mitad de sesión | El panel se pone en gris tras un comando fallido. En cuanto el relé vuelve, se reactiva solo. |
| No sé si puedo fiarme del relé | Es una comodidad remota, no un dispositivo de seguridad | Trata el corte de potencia remoto como una comodidad. Nunca lo uses como tu única medida de seguridad con un horno. |

---

## Notificaciones (ntfy)

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| No llega ninguna notificación | El topic no está suscrito en tu móvil, o es el topic equivocado | Asegúrate de que la app ntfy de tu móvil está suscrita al topic exacto configurado en el monitor. |
| Llegan unas notificaciones, otras no | Cada evento tiene sus propios disparadores | Los fallos, los umbrales y el enfriamiento se disparan cada uno bajo sus propias condiciones — no todos los eventos avisan siempre. |
| Notificaciones con retraso | Batería / restricciones de segundo plano del móvil | Los móviles suelen limitar las apps en segundo plano. Comprueba que la app ntfy tiene permiso para ejecutarse y avisar en segundo plano. |

---

## Cuándo pedir ayuda

Si has repasado la sección correspondiente y sigue sin ir bien, abre una incidencia en el [repositorio de GitHub](https://github.com/ParamoStudio/KilnMonitor). Cosas útiles que incluir: qué viste, qué mostraba la pantalla del monitor, si es autoconstruido o comprado, y qué habías probado ya. Como este es un proyecto en evolución, tu reporte puede ser justo lo que añada una fila nueva a esta misma guía.
