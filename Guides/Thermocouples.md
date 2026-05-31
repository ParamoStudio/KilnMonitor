# Thermocouples

> **Language / Idioma** — This guide is in **English**. ¿Prefieres español? → [**Salta a la versión en castellano**](#termopares-español)

A practical guide to the thermocouple Páramo is built around: which type, why, where to buy it, and how to wire it up. Written from the perspective of a hobbyist potter running this on a small budget — not an industrial spec sheet.

---

## Why only Type S?

Páramo supports **Type S thermocouples only**. This is a deliberate choice, not a limitation I haven't gotten around to fixing.

Type S is a noble-metal thermocouple: a positive leg of platinum–10% rhodium against a negative leg of pure platinum. In ceramics that buys you three things that matter:

- **Accuracy and stability.** Type S holds its calibration with very little drift over time. Type K (the common chromel/alumel sensor in most kilns) tends to lose accuracy at high temperatures, and many potters find it "spits," degrades, and needs replacing regularly. Type S can outlast it by years — some are never replaced at all.
- **High-temperature endurance.** It's the sensor of choice for cone 10 work and for long holds like crystalline glaze firings, where a Type K would be drifting or breaking down.
- **A sane usable range** for ceramics, roughly 0–1480 °C.

So why not offer Type K as well, for people who already have one? Two reasons. First, supporting multiple thermocouple types adds firmware complexity, configuration surface, and support burden to a project I develop **alone**. Second — and this is the part that surprised me — the cost argument for Type K has largely evaporated. From Chinese suppliers today, a complete Type S setup is genuinely affordable. Type K stopped being meaningfully cheaper, while staying meaningfully worse. Once that was true, narrowing the project to a single, better sensor was the obvious call.

If you have strong feelings about another type, the firmware is open — but the supported, tested path is Type S.

---

## What you need

Three parts. That's it:

1. **A Type S thermocouple** (the probe itself).
2. **Type S compensating cable** (to extend the signal to the reader).
3. **A Type S male/female connector** (the plug pair).

You do **not** have to buy these from AliExpress. Any ceramic-supply vendor — including your local one — will have them. The only thing that matters is that all three are **Type S**: a Type S probe, Type S compensating cable, and a Type S connector. Mixing types, or substituting ordinary wire, will give you wrong readings.

For full transparency, here's exactly what I buy and use. As someone working with limited resources, I can vouch that this kit works well, and the whole lot currently costs me **under €30** total:

- **Thermocouple (Type S):** <https://es.aliexpress.com/item/1005012192966913.html>
- **Compensating cable (Type S):** <https://es.aliexpress.com/item/1005002333578424.html>
- **Male/female connector (Type S):** <https://es.aliexpress.com/item/1005002779968037.html>

This is what I use, not a sponsorship and not the only right answer — buy from whoever you trust.

### Choosing the probe

**Length.** Type S probes come in different lengths depending on your kiln. The tip needs to protrude into the chamber **a little — but not too much.** Too far in and it's fragile (easy to knock and snap) and more exposed; too little and you risk false readings or letting the cold junction run hotter than it should. Pick the length that suits your kiln wall and how far you want the tip to sit inside.

**Wire gauge.** They also come in different wire thicknesses:

- **0.1 / 0.12 mm** — the cheapest option, and probably the shorter-lived.
- **0.2 mm** — noticeably more expensive (up to ~3× the price), but considerably more durable and longer-lasting.

In principle the **accuracy is the same** between gauges — you're paying for longevity, not precision. Choose based on how hard you fire and how often you want to replace it.

### Why the compensating cable matters

The compensating cable isn't optional fluff — it keeps your readings clean and accurate. Type S leads are platinum and rhodium, which are far too expensive to run any real distance, so a **compensating cable** carries the signal from the connector back to the reader using cheaper alloys that mimic the same behaviour in the ambient temperature range at the terminal.

A word of warning: plenty of people extend thermocouples with ordinary **hi-fi cable (red/black speaker wire)** and report success. **I don't recommend it.** Using plain copper creates two new cold junctions at the connection and introduces an error that can easily be tens of degrees. Use proper Type S compensating cable.

### The connector

The male/female connector **must be Type S.** On the AliExpress listing above it's marked **"R/S"** and is **dark green** — that's the one you want. (Green is the standard colour code for the positive leg on R/S-type cabling.)

---

## How to wire it

Once you have the three parts:

1. **Cut** the length of compensating cable you need.
2. **Connect your thermocouple to the cable**, matching **positive to positive and negative to negative.** The screws on the thermocouple terminals (usually the middle connection, or one of the side screws on each pole) hold very fine leads — **be careful, they're thin and hard to see, and easy to break.**
3. **Wind your cable leads** (positive and negative) firmly onto the unused screws of each pole.
4. **Attach the male side** of the connector to the cable.

You now have a Type S thermocouple with a compensating cable and a male plug.

### Connecting to Páramo

- **If you bought the kiln monitor:** the housing already ships with the **female** connector wired internally to the reader. You supply your own thermocouple, compensating cable and **male** plug, and plug that assembly into the housing's female socket. If readings come out reversed, the two thermocouple wires are simply swapped — reverse them. No damage results from reversed polarity on the MAX31856.

- **If you're building it yourself:** connect the **female side** to the temperature reader — the **MAX31856 module** — as described in the device build guide.

Building the device is a **separate guide**, spread across several sections of the GitHub repository (firmware, hardware, etc.). Look there for the full build.

---

## Things to keep in mind

- **Mounting depth:** tip protrudes into the chamber a little, not a lot. Protect the cold junction from excessive heat.
- **Avoid contamination:** keep the probe away from metallic vapours and flux residues, which can alter the reading over time.
- **`FAULT` / read errors:** if you get a persistent fault or the monitor doesn't detect the probe properly (e.g. an open-circuit fault), the **internal lead is most likely broken.** Request a replacement or refund — they usually arrive fine. I've had a lot of success firing with these over many cycles. If a vendor keeps sending duds, buy from a more reputable supplier.
- **Witness cones:** as with any thermocouple, the ground truth of what your kiln actually did is a self-supporting witness cone. Use them to sanity-check, especially as any thermocouple ages.

---
---

<a name="termopares-español"></a>

# Termopares (Español)

> **Idioma / Language** — Esta es la versión en **castellano**. English version above ↑ — [**volver arriba**](#thermocouples).

Una guía práctica del termopar sobre el que se construye Páramo: qué tipo, por qué, dónde comprarlo y cómo conectarlo. Está escrita desde el punto de vista de una ceramista aficionada con poco presupuesto, no como una hoja de especificaciones industrial.

---

## ¿Por qué solo Tipo S?

Páramo admite **únicamente termopares de Tipo S**. Es una decisión deliberada, no una carencia que esté pendiente de arreglar.

El Tipo S es un termopar de metal noble: una pata positiva de platino–10% rodio frente a una pata negativa de platino puro. En cerámica eso aporta tres ventajas que importan:

- **Precisión y estabilidad.** El Tipo S mantiene su calibración con muy poca deriva con el tiempo. El Tipo K (el típico chromel/alumel de la mayoría de hornos) tiende a perder precisión a altas temperaturas, y mucha gente nota que "escupe", se degrada y hay que cambiarlo a menudo. El Tipo S puede durar años más, y algunos no se reemplazan nunca.
- **Aguante a alta temperatura.** Es el sensor preferido para trabajo a cono 10 y para mantenimientos largos, como los esmaltes cristalinos, donde un Tipo K ya estaría derivando o rompiéndose.
- **Un rango útil razonable** para cerámica, de unos 0–1480 °C.

¿Y por qué no ofrecer también Tipo K, para quien ya tenga uno? Por dos motivos. El primero: admitir varios tipos de termopar añade complejidad al firmware, más opciones de configuración y más mantenimiento a un proyecto que desarrollo **yo sola**. El segundo, y es lo que me sorprendió: el argumento de coste a favor del Tipo K prácticamente ha desaparecido. Hoy, comprando a proveedores chinos, un equipo completo de Tipo S sale realmente barato. El Tipo K ha dejado de ser mucho más barato, pero sigue siendo bastante peor. Con eso sobre la mesa, ceñir el proyecto a un único sensor mejor era la decisión evidente.

Si tienes una opinión firme sobre otro tipo, el firmware es abierto; pero la vía soportada y probada es el Tipo S.

---

## Qué necesitas

Tres piezas. Nada más:

1. **Un termopar de Tipo S** (la sonda en sí).
2. **Cable de compensación de Tipo S** (para llevar la señal hasta el lector).
3. **Un enchufe macho/hembra de Tipo S** (el par de conectores).

**No** hace falta comprarlas en AliExpress. Cualquier suministrador de materiales cerámicos, incluido el de tu zona, las tendrá. Lo único importante es que las tres sean **de Tipo S**: sonda Tipo S, cable de compensación Tipo S y conector Tipo S. Si mezclas tipos, o sustituyes por cable corriente, las lecturas saldrán mal.

Por transparencia, esto es exactamente lo que compro y uso yo. Como persona con recursos limitados, puedo dar fe de que este equipo funciona bien, y el conjunto entero me cuesta ahora mismo **menos de 30 €** en total:

- **Termopar (Tipo S):** <https://es.aliexpress.com/item/1005012192966913.html>
- **Cable de compensación (Tipo S):** <https://es.aliexpress.com/item/1005002333578424.html>
- **Enchufe macho/hembra (Tipo S):** <https://es.aliexpress.com/item/1005002779968037.html>

Es lo que uso yo, ni es publicidad ni la única opción válida; compra a quien te fíes.

### Elegir la sonda

**Longitud.** Las sondas de Tipo S vienen en distintas longitudes según el horno. La punta tiene que sobresalir hacia el interior de la cámara **un poco, pero no demasiado.** Si entra mucho, queda frágil (es fácil darle un golpe y partirla) y más expuesta; si entra poco, te arriesgas a lecturas falsas o a que la junta fría se caliente más de lo que debería. Elige la longitud que encaje con la pared de tu horno y con lo que quieras que la punta entre dentro.

**Grosor de hilo.** También vienen con distintos grosores de cable:

- **0,1 / 0,12 mm**: la opción más barata, y seguramente la de menos vida útil.
- **0,2 mm**: bastante más cara (hasta unas 3× el precio), pero mucho más duradera.

En principio la **precisión es la misma** entre grosores; lo que pagas es longevidad, no precisión. Elige según lo fuerte que hornees y cada cuánto quieras cambiarla.

### Por qué importa el cable de compensación

El cable de compensación no es un extra prescindible: es lo que mantiene las lecturas limpias y precisas. Las patas del Tipo S son de platino y rodio, demasiado caras para tirar de ellas a cualquier distancia, así que el **cable de compensación** lleva la señal desde el conector hasta el lector usando aleaciones más baratas que imitan el mismo comportamiento dentro del rango de temperatura ambiente que ve el terminal.

Un aviso: hay mucha gente que alarga el termopar con **cable hi-fi corriente (el rojo/negro de altavoz)** y dice que le va bien. **Yo no lo recomiendo.** Usar cobre normal crea dos juntas frías nuevas en la conexión e introduce un error que puede ser de decenas de grados con facilidad. Usa cable de compensación de Tipo S, que es lo suyo.

### El conector

El conector macho/hembra **tiene que ser de Tipo S.** En el anuncio de AliExpress de arriba aparece marcado como **"R/S"** y es de color **verde oscuro**; ese es el que quieres. (El verde es el código de color estándar de la pata positiva en cableado tipo R/S.)

---

## Cómo se conecta

Cuando tengas las tres piezas:

1. **Corta** el trozo de cable de compensación que necesites.
2. **Conecta el termopar al cable**, haciendo coincidir **positivo con positivo y negativo con negativo.** Los tornillos de los bornes del termopar (normalmente el del medio, o uno de los laterales de cada polo) sujetan unas patas muy finas: **ten cuidado, son finas, cuesta verlas y se rompen con nada.**
3. **Enrolla bien tus hilos** (positivo y negativo) en los tornillos libres de cada polo.
4. **Monta el lado macho** del conector en el cable.

Con eso ya tienes un termopar de Tipo S con su cable de compensación y su lado macho.

### Conexión a Páramo

- **Si compraste el monitor de hornos:** la carcasa ya trae el conector **hembra** cableado por dentro al lector. Tú pones tu termopar, tu cable de compensación y tu enchufe **macho**, y enchufas ese conjunto a la hembra de la carcasa. Si las lecturas salen invertidas, es que los dos hilos del termopar están cambiados; dales la vuelta. La polaridad invertida no daña el MAX31856.

- **Si vas a construirlo tú:** conecta el **lado hembra** al lector de temperaturas, el **módulo MAX31856**, tal y como se explica en la guía de construcción del dispositivo.

La construcción del dispositivo es una **guía aparte**, repartida por varias secciones del repositorio de GitHub (firmware, hardware, etc.). Búscala ahí para el montaje completo.

---

## Cosas a tener en cuenta

- **Profundidad de montaje:** la punta sobresale hacia la cámara un poco, no mucho. Protege la junta fría del calor excesivo.
- **Evita la contaminación:** mantén la sonda lejos de vapores metálicos y restos de fundente, que pueden alterar la lectura con el tiempo.
- **Errores de `FAULT` / lectura:** si te da un fallo persistente o el monitor no detecta bien la sonda (por ejemplo, un fallo de circuito abierto), lo más probable es que el **hilo interno esté roto.** Pide un cambio o una devolución; normalmente vienen bien. Yo he horneado con estas un montón de veces sin problema. Si un vendedor te manda una detrás de otra defectuosa, cómprala en un proveedor con mejor reputación.
- **Conos testigo:** como con cualquier termopar, lo que de verdad te dice lo que ha hecho el horno es un cono testigo autoportante. Úsalos para contrastar, sobre todo según envejece el termopar.
