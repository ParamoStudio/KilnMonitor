<a name="top-en"></a>

# Electronic Parts List

> **Language / Idioma** — This guide is in **English**. ¿Prefieres español? → [**Salta a la versión en castellano**](#lista-de-componentes-espanol)

> **Working draft.** This is the bill of materials (BOM) for a Páramo monitor. The core components below are confirmed and in use. Quantities, exact part links and suggested suppliers will be refined, and the optional battery/UPS section at the end is **not implemented yet** — it's a possible future addition, listed here only so the intent is on record.

These are the electronic components that make up a Páramo monitor. The thermocouple itself (probe, compensating cable and connector) is a separate purchase covered in detail in the [Thermocouples guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Core components

| Part | What it is | Notes |
|---|---|---|
| **ESP32-C6 DevKit** (dual USB-C, full-size — not the Super Mini) | The microcontroller: WiFi, runs the firmware | The larger two-port board, not the Super Mini variant. |
| **MAX31856 thermocouple amplifier** (genuine Adafruit) | Reads the thermocouple and reports temperature | Use the **genuine Adafruit** board. Generic clones cannot write their configuration registers and do not work — this is confirmed, not brand preference. |
| **SSD1309 2.42" OLED display** (SPI, monochrome) | The screen | 2.42-inch monochrome OLED. |
| **KY-040 rotary encoder** | Main input: rotate to navigate, press to select | Standard rotary encoder with push-button. |
| **Passive buzzer** | Audible alerts | Passive type (the firmware drives the tone). |
| **PCB pin headers / sockets** | Mount the modules onto the carrier board | Header pins soldered to the PCB, into which the ESP32 and the other modules plug. See the note on the carrier-board approach below. |

---

## Why a carrier board with sockets (not fixed soldering)

The PCB is a **carrier board**: header pins are soldered to the board, and the ESP32 and the other modules **plug into those sockets** rather than being soldered down permanently.

This is a deliberate choice, for a few reasons that matter to me:

- **Modularity.** Each module is its own replaceable unit. If you want to swap the display, upgrade the microcontroller, or reuse a part in another project, you just unplug it.
- **Repairability.** If one component fails, you replace that one part — you don't desolder it from a board or scrap the whole thing. This matters to me a lot; throwaway electronics is exactly what I don't want to build.
- **It fits who's making this.** I design this board as a **ceramist, not an engineer.** Sockets keep the board design simpler and far more forgiving for someone who isn't a professional PCB designer — and they make the whole thing easier to build, fix and live with.

---

## Thermocouple (separate guide)

The Type S thermocouple, its compensating cable and the connector are not in the list above because they're chosen and bought separately. Everything about them — what to buy, where, and how to wire it — is in the [Thermocouples guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Possible future additions (not implemented)

These are ideas under consideration, **not part of the current build.** They're noted here so the design intent is documented, but none of this exists yet — don't buy for it.

- **Battery backup / UPS.** A possible future addition would let the monitor keep running through a mains power cut. The idea is an uninterruptible supply: you plug the whole thing into the battery, and the battery into the wall, so it bridges short outages without the monitor rebooting. Whether this gets integrated is still to be decided.
- **Battery management + power input.** To finish the piece properly, the battery management and the mains input (the actual plug/socket side) would be integrated cleanly rather than bolted on. Also just an intention for now.

---

## Notes

- Quantities are one of each unless stated otherwise.
- Exact part numbers, links and suppliers will be added as the design is finalised — for now this is the confirmed shortlist.
- The PCB these mount onto, and the printed enclosure, are covered in the [Build Your Own guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Build%20Your%20Own.md).

---
---

<a name="lista-de-componentes-espanol"></a>

# Lista de componentes (Español)

> **Idioma / Language** — Esta es la versión en **castellano**. English version above ↑ — [**volver arriba**](#top-en).

> **Borrador de trabajo.** Esta es la lista de materiales (BOM) de un monitor Páramo. Los componentes principales de abajo están confirmados y en uso. Las cantidades, los enlaces exactos a las piezas y los proveedores sugeridos se irán afinando, y la sección opcional de batería/UPS del final **aún no está implementada** — es una posible incorporación futura, listada aquí solo para dejar constancia de la intención.

Estos son los componentes electrónicos que forman un monitor Páramo. El termopar en sí (sonda, cable de compensación y conector) es una compra aparte, tratada en detalle en la [guía de termopares](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Componentes principales

| Pieza | Qué es | Notas |
|---|---|---|
| **ESP32-C6 DevKit** (doble USB-C, tamaño completo — no la Super Mini) | El microcontrolador: WiFi, ejecuta el firmware | La placa más grande de dos puertos, no la variante Super Mini. |
| **Amplificador de termopar MAX31856** (Adafruit original) | Lee el termopar y reporta la temperatura | Usa la placa **original de Adafruit**. Los clones genéricos no pueden escribir sus registros de configuración y no funcionan — esto está confirmado, no es preferencia de marca. |
| **Pantalla OLED SSD1309 de 2,42"** (SPI, monocromo) | La pantalla | OLED monocromo de 2,42 pulgadas. |
| **Encoder rotativo KY-040** | Entrada principal: girar para navegar, pulsar para seleccionar | Encoder rotativo estándar con botón. |
| **Buzzer pasivo** | Avisos sonoros | De tipo pasivo (el firmware genera el tono). |
| **Pines / zócalos para PCB** | Montar los módulos sobre la placa base (carrier board) | Pines de tira que se sueldan a la PCB y en los que se enchufan la ESP32 y el resto de módulos. Mira la nota sobre el enfoque de carrier board más abajo. |

---

## Por qué una carrier board con zócalos (y no soldadura fija)

La PCB es una **carrier board** (placa base): se sueldan pines de tira a la placa, y la ESP32 y el resto de módulos **se enchufan en esos zócalos** en lugar de ir soldados de forma permanente.

Es una decisión deliberada, por unos cuantos motivos que para mí importan:

- **Modularidad.** Cada módulo es su propia unidad reemplazable. Si quieres cambiar la pantalla, mejorar el microcontrolador o reutilizar una pieza en otro proyecto, solo la desenchufas.
- **Reparabilidad.** Si un componente falla, reemplazas esa pieza — no la tienes que desoldar de la placa ni tirar el conjunto entero. Esto me importa mucho; la electrónica de usar y tirar es justo lo que no quiero construir.
- **Encaja con quien hace esto.** Diseño esta placa como **ceramista, no como ingeniera.** Los zócalos mantienen el diseño de la placa más simple y mucho más indulgente para alguien que no es diseñadora profesional de PCB — y hacen que todo el conjunto sea más fácil de construir, arreglar y mantener.

---

## Termopar (guía aparte)

El termopar de Tipo S, su cable de compensación y el conector no están en la lista de arriba porque se eligen y compran por separado. Todo sobre ellos — qué comprar, dónde y cómo conectarlo — está en la [guía de termopares](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Posibles incorporaciones futuras (no implementadas)

Estas son ideas en estudio, **no forman parte de la construcción actual.** Se anotan aquí para dejar documentada la intención de diseño, pero nada de esto existe todavía — no compres pensando en ello.

- **Respaldo de batería / UPS.** Una posible incorporación futura permitiría al monitor seguir funcionando durante un corte de luz. La idea es una alimentación ininterrumpida: enchufas todo el conjunto a la batería, y la batería a la pared, de modo que aguante cortes breves sin que el monitor se reinicie. Si se integra o no está aún por decidir.
- **Gestión de batería + entrada de corriente.** Para dejar la pieza bien rematada, se integrarían de forma limpia la gestión de la batería y la entrada de red (la parte del enchufe/toma en sí), en lugar de añadirla por encima. También es solo una intención por ahora.

---

## Notas

- Las cantidades son una de cada una salvo que se indique otra cosa.
- Los números de pieza exactos, enlaces y proveedores se añadirán a medida que se cierre el diseño — por ahora esta es la lista corta confirmada.
- La PCB sobre la que se montan, y la carcasa impresa, se tratan en la [guía de construcción](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Build%20Your%20Own.md).
