<a name="top-en"></a>

# Build Your Own Páramo

> **Language / Idioma** — This guide is in **English**. ¿Prefieres español? → [**Salta a la versión en castellano**](#construye-el-tuyo-espanol)

> **Early draft — work in progress.** This is the skeleton of the build guide. Several sections are placeholders: the PCB files, the component list and the 3D-printable STLs **do not exist yet** and will be added as the hardware is finalised. Do not attempt a full build from this document until the placeholders are filled in. The overall process, however, is already settled and shown below.

Building a Páramo monitor is a relatively straightforward process. At a high level: get a PCB made, buy the parts, assemble and test the board, attach the thermocouple and flash the firmware, print the enclosure, then put it all together and run the initial setup. Each step is broken down below.

---

## Step 1 — Get the PCB made

Take the PCB design files (Gerbers and related manufacturing files) and send them to a PCB fabrication service — for example **JLCPCB** or **PCBWay** — to have one or several boards printed. You only need one for a single monitor, but ordering a few is often barely more expensive.

> **Placeholder.** The PCB design files do not exist yet. Once finalised, they'll be provided in the [`Hardware/PCB`](https://github.com/ParamoStudio/KilnMonitor/tree/main/Hardware/PCB) folder of the repository, along with the exact ordering options to select (board size, thickness, finish).

---

## Step 2 — Buy the components

Order the parts from the component list. These are standard, widely available electronic components plus the thermocouple hardware (covered in its own guide).

> **Placeholder.** The full component list (the BOM — bill of materials) is not finalised yet. It will live at [`Hardware/Electronic Parts List`](https://github.com/ParamoStudio/KilnMonitor/blob/main/Hardware/Electronic%20Parts%20List.md) and list every part, quantity, and a suggested source. For the thermocouple specifically, see the [Thermocouples guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Step 3 — Assemble and test the board

Solder the components onto the PCB. Once assembled, power the board from a computer over USB and check that it responds: that the microcontroller is detected, and that the basic components come up as expected before going any further.

> **Placeholder.** Detailed assembly notes, soldering order, and exactly what a healthy board should report on first power-up will be added here.

---

## Step 4 — Attach the thermocouple and flash the firmware

Connect the thermocouple to the board that reads temperature (the MAX31856 reader). Then flash the most up-to-date official firmware onto the device.

> **Placeholder.** Step-by-step flashing instructions (tools, the correct firmware file, and how to confirm a successful flash) will live with the firmware at [`Firmware/README`](https://github.com/ParamoStudio/KilnMonitor/blob/main/Firmware/README.md). Thermocouple wiring is covered in the [Thermocouples guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Step 5 — Print the enclosure

Print the enclosure parts on a 3D printer — your own, or through a printing service if you don't have one. Use the STL files provided in the hardware section.

> **Placeholder.** The STL files do not exist yet. Once ready they'll be in the [`Hardware/3D PRINTED CASE`](https://github.com/ParamoStudio/KilnMonitor/tree/main/Hardware/3D%20PRINTED%20CASE) folder, with suggested print settings (material, layer height, infill, supports).

---

## Step 6 — Final assembly and initial setup

Put everything together: board, thermocouple, and printed enclosure. Then do the first power-on test and the initial configuration — connect it to your WiFi, set up the MQTT server connection, and start checking that everything works.

From here on, the device is built and running. For how to actually **use** it — connecting the dashboard, the journal, notifications, and the rest — refer to the [in-app usage guide](https://paramostudio.github.io/KilnMonitor/info.html?tab=guide) and the other guides, which cover day-to-day operation in full.

> **Placeholder.** A final assembly checklist and the first-run setup walkthrough will be expanded here. For server setup see the [MQTT Server guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/MQTT%20Server.md); if anything misbehaves, the [Troubleshooting guide](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Troubleshooting.md) is the place to look.

---
---

<a name="construye-el-tuyo-espanol"></a>

# Construye tu propio Páramo (Español)

> **Idioma / Language** — Esta es la versión en **castellano**. English version above ↑ — [**volver arriba**](#top-en).

> **Borrador inicial — en construcción.** Este es el esqueleto de la guía de construcción. Varias secciones son marcadores de posición: los archivos de la PCB, la lista de componentes y los STL imprimibles en 3D **aún no existen** y se añadirán a medida que se cierre el hardware. No intentes una construcción completa con este documento hasta que se rellenen los huecos. El proceso general, eso sí, ya está definido y se muestra abajo.

Construir un monitor Páramo es un proceso relativamente sencillo. A grandes rasgos: encargar una PCB, comprar las piezas, montar y testar la placa, conectar el termopar y flashear el firmware, imprimir la carcasa, y por último juntarlo todo y hacer la configuración inicial. Cada paso se desglosa abajo.

---

## Paso 1 — Encargar la PCB

Coge los archivos de diseño de la PCB (los Gerber y demás archivos de fabricación) y envíalos a un proveedor de fabricación de PCB — por ejemplo **JLCPCB** o **PCBWay** — para que te impriman una o varias placas. Solo necesitas una para un único monitor, pero pedir unas cuantas suele costar apenas un poco más.

> **Pendiente.** Los archivos de diseño de la PCB aún no existen. Cuando se cierren, se proporcionarán en la carpeta [`Hardware/PCB`](https://github.com/ParamoStudio/KilnMonitor/tree/main/Hardware/PCB) del repositorio, junto con las opciones exactas de pedido que hay que seleccionar (tamaño de placa, grosor, acabado).

---

## Paso 2 — Comprar los componentes

Pide las piezas de la lista de componentes. Son componentes electrónicos estándar y de fácil acceso, más el material del termopar (que se trata en su propia guía).

> **Pendiente.** La lista completa de componentes (la BOM — lista de materiales) aún no está cerrada. Vivirá en [`Hardware/Electronic Parts List`](https://github.com/ParamoStudio/KilnMonitor/blob/main/Hardware/Electronic%20Parts%20List.md) e incluirá cada pieza, su cantidad y una fuente sugerida. Para el termopar en concreto, consulta la [guía de termopares](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Paso 3 — Montar y testar la placa

Suelda los componentes en la PCB. Una vez montada, alimenta la placa desde un ordenador por USB y comprueba que responde: que el microcontrolador se detecta y que los componentes básicos arrancan como se espera antes de seguir adelante.

> **Pendiente.** Aquí se añadirán las notas detalladas de montaje, el orden de soldadura y qué debería reportar exactamente una placa sana en el primer encendido.

---

## Paso 4 — Conectar el termopar y flashear el firmware

Conecta el termopar a la placa que mide la temperatura (el lector MAX31856). Después flashea en el dispositivo el firmware oficial más actualizado que haya.

> **Pendiente.** Las instrucciones de flasheo paso a paso (herramientas, el archivo de firmware correcto y cómo confirmar que el flasheo fue bien) vivirán junto al firmware en [`Firmware/README`](https://github.com/ParamoStudio/KilnMonitor/blob/main/Firmware/README.md). El cableado del termopar se trata en la [guía de termopares](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Thermocouples.md).

---

## Paso 5 — Imprimir la carcasa

Imprime las piezas de la carcasa en una impresora 3D — la tuya, o a través de un servicio de impresión si no tienes una. Usa los archivos STL que se proporcionan en la sección de hardware.

> **Pendiente.** Los archivos STL aún no existen. Cuando estén listos estarán en la carpeta [`Hardware/3D PRINTED CASE`](https://github.com/ParamoStudio/KilnMonitor/tree/main/Hardware/3D%20PRINTED%20CASE), con los ajustes de impresión sugeridos (material, altura de capa, relleno, soportes).

---

## Paso 6 — Ensamblaje final y configuración inicial

Júntalo todo: placa, termopar y carcasa impresa. Después haz la primera prueba de encendido y la configuración inicial — conéctalo a tu WiFi, establece la conexión con el servidor MQTT y empieza a comprobar que todo funciona.

A partir de aquí, el dispositivo está construido y en marcha. Para saber cómo **usarlo** de verdad — conectar el panel, el diario, las notificaciones y lo demás — consulta la [guía de uso dentro de la app](https://paramostudio.github.io/KilnMonitor/info.html?tab=guide) y las otras guías, que cubren el uso diario al completo.

> **Pendiente.** Aquí se ampliarán una lista de comprobación del ensamblaje final y el recorrido de la configuración inicial. Para la configuración del servidor, mira la [guía del servidor MQTT](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/MQTT%20Server.md); si algo va mal, la [guía de solución de problemas](https://github.com/ParamoStudio/KilnMonitor/blob/main/Guides/Troubleshooting.md) es el sitio donde mirar.
