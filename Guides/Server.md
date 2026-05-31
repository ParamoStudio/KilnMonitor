<a name="top-en"></a>

# The MQTT Server

> **Language / Idioma** — This guide is in **English**. ¿Prefieres español? → [**Salta a la versión en castellano**](#el-servidor-mqtt-espanol)

Páramo doesn't talk to your kiln monitor directly. The device and the web dashboard both connect to a shared **MQTT broker** in the middle, which relays messages between them. This guide explains why Páramo uses HiveMQ Cloud by default, and what you need to know if you'd rather run your own broker.

---

## What the broker does

MQTT is a lightweight publish/subscribe messaging protocol. Your Páramo device **publishes** readings (thermocouple temperature, status, history) to topics like `kiln/thermocouple`; the web dashboard **subscribes** to those topics and displays them. The broker is the post office in the middle — neither side talks to the other directly, they just both talk to the broker.

This indirection is what lets you watch a firing from your phone on the other side of the world: the device pushes to the broker, the broker pushes to your browser.

---

## Why HiveMQ Cloud?

Páramo defaults to **HiveMQ Cloud Serverless** for a few practical reasons:

- **Free, with room to spare.** The free serverless tier provides far more capacity than a single hobbyist kiln will ever use — no cost to the end user.
- **No server to maintain.** It's managed for you. Nothing to install, patch or keep alive.
- **Browser-friendly.** It exposes MQTT over secure WebSocket (WSS), which is exactly what a web dashboard needs (more on this below).
- **TLS by default.** Connections are encrypted end to end.

For a project developed by one person, leaning on a solid free managed broker keeps the barrier to entry low and the maintenance burden off my plate. It's the path of least friction for most people.

---

## Running your own broker (self-hosting)

**You are not locked into HiveMQ.** The web app does not hardcode HiveMQ as a company — the host, username and password are all fields you fill in yourself. If you'd rather self-host (for privacy, control, or to keep everything on your own infrastructure), you can.

What you'll need from your own broker is exactly what you'd get from HiveMQ: a **host address, a username and a password.** Enter those in the Connection panel and it works the same way.

There is, however, **one technical requirement** to be aware of, and it's not specific to Páramo — it's a hard rule of every web browser:

> A browser **cannot** speak raw MQTT over a plain TCP socket. The only transport a browser supports is **MQTT over WebSocket.** Because the dashboard is served over HTTPS, it specifically needs the **secure** variant, **WebSocket Secure (`wss://`)**.

Concretely, Páramo builds its connection like this:

```
wss://<your-host>:8884/mqtt
```

So your own broker must:

1. Expose an **MQTT-over-WebSocket-Secure (WSS) listener**, not just the plain MQTT TCP port (1883) or even plain TLS (8883). Those plain ports work for the *device*, but the *browser* needs WSS.
2. Serve it on **port `8884`** with the path **`/mqtt`** — that's the endpoint the dashboard expects, and it matches HiveMQ Cloud's default. (If your broker uses a different WSS port or path, you'd need to change that one line in the web app's source, which is open.)
3. Provide **host, username and password** for you to enter.

Common self-hostable brokers — Mosquitto, EMQX, HiveMQ's own self-hosted edition — all support MQTT over WebSocket; you just have to enable and configure the WSS listener accordingly. Note also that a browser can't present a client certificate, so authentication is via username/password, not mutual TLS.

**A note on scope:** setting up and securing your own MQTT broker is well-trodden ground, with many good guides already out there. Writing one isn't my place or my task here — this guide simply confirms that self-hosting is possible and tells you the one endpoint shape Páramo expects. The rest is standard broker administration.

### For the technically curious: changing the transport

If for some reason you need the dashboard to connect differently — a different WSS port, a different path, or a non-default scheme — you can, **at your own risk.** It lives in one place in `index.html`, inside the `connectMqtt()` function:

```js
const url = 'wss://' + k.host + ':8884/mqtt';
mqttClient = mqtt.connect(url, { username: k.user, password: k.pass, clean: true, reconnectPeriod: 0 });
```

That first line is the entire endpoint definition. Change the port (`8884`), the path (`/mqtt`), or the scheme there to match your broker's WebSocket listener. The connection options (auth, clean session, reconnect behaviour) are the second argument to `mqtt.connect()` — that's where you'd adjust MQTT.js client settings if you know what you're doing. Bear in mind the browser constraint still applies: it must remain a WebSocket scheme (`wss://`, or `ws://` only if you serve the dashboard over plain HTTP, which is not recommended). Anything you change here is unsupported and on you to test.

---

## Summary

- The broker relays messages between your device and the web dashboard.
- HiveMQ Cloud is the default because it's free, managed, encrypted and browser-friendly.
- You can self-host instead — the app isn't tied to HiveMQ.
- Your broker must offer **MQTT over WebSocket Secure on `wss://<host>:8884/mqtt`**, and give you host + username + password.

---
---

<a name="el-servidor-mqtt-espanol"></a>

# El servidor MQTT (Español)

> **Idioma / Language** — Esta es la versión en **castellano**. English version above ↑ — [**volver arriba**](#top-en).

Páramo no habla directamente con tu monitor de hornos. Tanto el dispositivo como el panel web se conectan a un **broker MQTT** intermedio, que hace de intermediario y pasa los mensajes entre ambos. Esta guía explica por qué Páramo usa HiveMQ Cloud por defecto y qué necesitas saber si prefieres montar tu propio broker.

---

## Qué hace el broker

MQTT es un protocolo de mensajería ligero de tipo publicación/suscripción. Tu dispositivo Páramo **publica** lecturas (temperatura del termopar, estado, historial) en topics como `kiln/thermocouple`; el panel web **se suscribe** a esos topics y los muestra. El broker es la oficina de correos del medio: ninguna de las dos partes habla con la otra directamente, las dos hablan con el broker.

Esa indirección es justo lo que te permite vigilar una horneada desde el móvil al otro lado del mundo: el dispositivo empuja al broker, y el broker empuja a tu navegador.

---

## ¿Por qué HiveMQ Cloud?

Páramo usa por defecto **HiveMQ Cloud Serverless** por unos cuantos motivos prácticos:

- **Gratis y con margen de sobra.** El plan serverless gratuito da muchísima más capacidad de la que un solo horno aficionado va a usar jamás, sin coste para el usuario final.
- **Sin servidor que mantener.** Está gestionado por ellos. No hay nada que instalar, parchear ni mantener vivo.
- **Compatible con el navegador.** Expone MQTT sobre WebSocket seguro (WSS), que es justo lo que necesita un panel web (más sobre esto abajo).
- **TLS por defecto.** Las conexiones van cifradas de extremo a extremo.

Para un proyecto que desarrollo yo sola, apoyarme en un broker gestionado, gratuito y sólido mantiene baja la barrera de entrada y me quita el mantenimiento de encima. Es el camino con menos fricción para la mayoría de la gente.

---

## Montar tu propio broker (self-hosting)

**No estás atado a HiveMQ.** La web no tiene HiveMQ como empresa metido a fuego en el código: el host, el usuario y la contraseña son campos que rellenas tú. Si prefieres alojarlo tú mismo (por privacidad, por control o para tenerlo todo en tu propia infraestructura), puedes.

Lo que vas a necesitar de tu propio broker es exactamente lo que te daría HiveMQ: una **dirección de host, un usuario y una contraseña.** Los metes en el panel de conexión y funciona igual.

Eso sí, hay **un requisito técnico** que conviene tener claro, y no es propio de Páramo: es una regla fija de todos los navegadores web.

> Un navegador **no puede** hablar MQTT en crudo por un socket TCP normal. El único transporte que admite un navegador es **MQTT sobre WebSocket.** Y como el panel se sirve por HTTPS, necesita en concreto la variante **segura, WebSocket Secure (`wss://`)**.

En concreto, Páramo construye su conexión así:

```
wss://<tu-host>:8884/mqtt
```

Así que tu propio broker debe:

1. Exponer un **listener de MQTT sobre WebSocket Secure (WSS)**, no solo el puerto MQTT TCP normal (1883) ni siquiera el TLS normal (8883). Esos puertos sirven para el *dispositivo*, pero el *navegador* necesita WSS.
2. Servirlo en el **puerto `8884`** con la ruta **`/mqtt`** — es el endpoint que el panel espera, y coincide con el predeterminado de HiveMQ Cloud. (Si tu broker usa otro puerto o ruta de WSS, tendrías que cambiar esa línea en el código de la web, que es abierto.)
3. Darte **host, usuario y contraseña** para introducirlos.

Los brokers autoalojables más habituales — Mosquitto, EMQX, la propia edición self-hosted de HiveMQ — todos admiten MQTT sobre WebSocket; solo tienes que activar y configurar el listener WSS como corresponda. Ten en cuenta también que un navegador no puede presentar un certificado de cliente, así que la autenticación es por usuario/contraseña, no por TLS mutuo.

**Una nota sobre el alcance:** montar y asegurar tu propio broker MQTT es terreno muy trillado, con muchas guías buenas ya disponibles. Escribir una no es mi lugar ni mi tarea aquí; esta guía solo confirma que el self-hosting es posible y te dice la forma exacta del endpoint que Páramo espera. El resto es administración estándar de un broker.

### Para los curiosos técnicos: cambiar el transporte

Si por lo que sea necesitas que el panel se conecte de otra forma — otro puerto WSS, otra ruta, o un esquema distinto del predeterminado — puedes hacerlo, **bajo tu propio riesgo.** Vive en un único sitio de `index.html`, dentro de la función `connectMqtt()`:

```js
const url = 'wss://' + k.host + ':8884/mqtt';
mqttClient = mqtt.connect(url, { username: k.user, password: k.pass, clean: true, reconnectPeriod: 0 });
```

Esa primera línea es toda la definición del endpoint. Cambia ahí el puerto (`8884`), la ruta (`/mqtt`) o el esquema para que encaje con el listener WebSocket de tu broker. Las opciones de conexión (autenticación, sesión limpia, comportamiento de reconexión) son el segundo argumento de `mqtt.connect()`: ahí ajustarías la configuración del cliente MQTT.js si sabes lo que haces. Ten presente que la restricción del navegador sigue aplicando: tiene que seguir siendo un esquema WebSocket (`wss://`, o `ws://` solo si sirves el panel por HTTP plano, lo cual no se recomienda). Todo lo que cambies aquí no está soportado y corre de tu cuenta probarlo.

---

## Resumen

- El broker pasa los mensajes entre tu dispositivo y el panel web.
- HiveMQ Cloud es el predeterminado por ser gratis, gestionado, cifrado y compatible con el navegador.
- Puedes alojarlo tú en su lugar: la app no está atada a HiveMQ.
- Tu broker debe ofrecer **MQTT sobre WebSocket Secure en `wss://<host>:8884/mqtt`**, y darte host + usuario + contraseña.
