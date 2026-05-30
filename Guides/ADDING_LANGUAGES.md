# Adding Languages to Páramo (OLED firmware)
# Añadir idiomas a Páramo (firmware OLED)

> This guide covers the **device firmware** (the OLED screen). The web
> dashboard uses a separate translation system (`en.json`) and is not
> covered here.
>
> Esta guía cubre el **firmware del dispositivo** (la pantalla OLED). El
> panel web usa un sistema de traducción aparte (`en.json`) y no se trata
> aquí.

---

## ⚠️ IMPORTANT: Alphabet limitations / Limitación de alfabetos

**EN —** The OLED fonts (U8g2 `*_tr` fonts) only contain **basic Latin
(ASCII)** characters: `a–z`, `A–Z`, digits and common symbols. They do
**not** contain Cyrillic, Chinese (Han), Japanese (kana/kanji), Arabic,
Devanagari (Hindi), etc. If you put non-Latin text in a `lang_*.h` file,
the OLED will show empty boxes or nothing.

Workarounds for non-Latin languages on the OLED:
- **Romanize / transliterate** the strings into the Latin alphabet.
  Examples: Japanese in rōmaji (`温度` → `Ondo`), Chinese in pinyin
  without tone marks (`温度` → `Wendu`), Russian transliterated
  (`Температура` → `Temperatura`). This is what `lang_jap.h` does.
- Pinyin **with** tone marks (`Wēndù`) uses diacritics that the `*_tr`
  fonts may not have — use the **toneless** form to stay safe.
- Languages with complex scripts (Devanagari, Arabic) transliterate
  poorly and are best offered **only on the web dashboard**, where the
  browser renders any script correctly.

**ES —** Las fuentes del OLED (fuentes U8g2 `*_tr`) solo contienen
caracteres **latinos básicos (ASCII)**: `a–z`, `A–Z`, dígitos y símbolos
comunes. **No** contienen cirílico, chino (Han), japonés (kana/kanji),
árabe, devanagari (hindi), etc. Si pones texto no latino en un archivo
`lang_*.h`, el OLED mostrará cuadros vacíos o nada.

Soluciones para idiomas no latinos en el OLED:
- **Romanizar / transliterar** las cadenas al alfabeto latino. Ejemplos:
  japonés en rōmaji (`温度` → `Ondo`), chino en pinyin sin marcas de tono
  (`温度` → `Wendu`), ruso transliterado (`Температура` → `Temperatura`).
  Es lo que hace `lang_jap.h`.
- El pinyin **con** marcas de tono (`Wēndù`) usa diacríticos que las
  fuentes `*_tr` pueden no tener — usa la forma **sin tonos** para ir
  seguro.
- Los idiomas con escrituras complejas (devanagari, árabe) se
  transliteran mal y es mejor ofrecerlos **solo en el panel web**, donde
  el navegador renderiza cualquier escritura correctamente.

**Recommended for native OLED display / Recomendados para OLED nativo:**
English, Spanish, Catalan, French, German, Portuguese, Italian — all
Latin-script, no compromise. / Inglés, español, catalán, francés, alemán,
portugués, italiano — todos en alfabeto latino, sin compromisos.

---

## Checklist — adding a language / añadir un idioma

Example: adding German (`DE`). / Ejemplo: añadir alemán (`DE`).

### ☐ 1. Create `lang_de.h` / Crear `lang_de.h`
Copy `lang_en.h`, rename the array, translate every string **in the same
order** as the enum. The array MUST have exactly `STR_COUNT` entries. /
Copia `lang_en.h`, renombra el array, traduce cada cadena **en el mismo
orden** que el enum. El array DEBE tener exactamente `STR_COUNT` entradas.

```cpp
// src/ui/lang/lang_de.h
#pragma once
#include "lang_manager.h"
const char* const STRINGS_DE[STR_COUNT] = {
  "PARAMO",        // STR_PARAMO
  "Temperatur",    // STR_TEMPERATURE
  // ... all STR_COUNT entries, same order as the enum ...
};
```
Tip: leave a string as `nullptr` to fall back to English for that entry. /
Consejo: deja una cadena como `nullptr` para usar el inglés en esa entrada.

### ☐ 2. Edit `lang_manager.h` (4 changes) / Editar `lang_manager.h` (4 cambios)

**a.** Add the ID to `enum LangID`, before `LANG_COUNT`: / Añade el ID al
`enum LangID`, antes de `LANG_COUNT`:
```cpp
enum LangID {
  LANG_EN = 0, LANG_ES = 1, LANG_FR = 2, LANG_CAT = 3, LANG_JAP = 4,
  LANG_DE = 5,        // ← new
  LANG_COUNT
};
```

**b.** Declare the table: / Declara la tabla:
```cpp
extern const char* const STRINGS_DE[STR_COUNT];
```

**c.** Add a `case` in `T()`: / Añade un `case` en `T()`:
```cpp
case LANG_DE: table = STRINGS_DE; break;
```

**d.** Add the short name in `langName()`: / Añade el nombre corto en
`langName()`:
```cpp
case LANG_DE: return "DE";
```

### ☐ 3. Edit `lang_manager.cpp` (1 change) / Editar `lang_manager.cpp` (1 cambio)
Add the include: / Añade el include:
```cpp
#include "lang_de.h"
```

### ☐ 4. Edit `screen_lang.cpp` (the easy one to forget) / Editar `screen_lang.cpp` (el fácil de olvidar)
Add the language to the carousel list and bump the count. Without this,
the language exists but is **invisible** in the menu. / Añade el idioma a
la lista del carrusel y sube el contador. Sin esto, el idioma existe pero
es **invisible** en el menú.
```cpp
static const LangID LANG_ORDER[] = {LANG_EN, LANG_ES, LANG_FR, LANG_CAT, LANG_JAP, LANG_DE};
static const int    N_LANGS = 6;   // ← was 5
```

### ☐ 5. Compile and verify / Compilar y verificar
- It compiles with no errors. / Compila sin errores.
- The new language appears in the language carousel. / El nuevo idioma
  aparece en el carrusel de idiomas.
- Selecting it changes the UI strings (Latin scripts) or shows English
  fallback / romanized text as expected. / Al seleccionarlo cambian las
  cadenas (alfabeto latino) o se ve el fallback a inglés / texto
  romanizado según corresponda.

---

## Common mistakes / Errores comunes

| Symptom / Síntoma | Cause / Causa |
|---|---|
| Garbled / shifted strings | `STRINGS_X[]` has wrong number of entries (≠ `STR_COUNT`) or wrong order / array con número o orden incorrecto |
| Language not in menu / no sale en el menú | Forgot step 4 (`LANG_ORDER` + `N_LANGS`) / olvidado el paso 4 |
| Empty boxes on screen / cuadros vacíos | Non-Latin text with `*_tr` font — romanize / texto no latino con fuente `*_tr` — romanizar |
| Compile error `STRINGS_X not declared` | Forgot step 2b or step 3 / olvidado el paso 2b o el 3 |
| Some strings English, some translated | `nullptr` entries fall back to English (by design) / entradas `nullptr` usan inglés (por diseño) |

---

## Notes / Notas

- The carousel shows 5 languages at once (center + 2 each side). With 6+
  languages it works fine; you just see the rest as you rotate. With
  **fewer than 5** the side slots repeat and look odd — keep at least 5. /
  El carrusel muestra 5 idiomas a la vez (centro + 2 a cada lado). Con 6+
  funciona bien; el resto se ven al rotar. Con **menos de 5** los laterales
  se repiten y se ve raro — mantén al menos 5.
- The English fallback in `T()` means partial translations are safe:
  untranslated entries show in English instead of breaking. / El fallback
  a inglés en `T()` hace seguras las traducciones parciales: las entradas
  sin traducir salen en inglés en vez de romperse.
- Keep the order of every `STRINGS_X[]` array identical to the `StringID`
  enum. When you add a new string to the enum, add it to every language
  file (or leave `nullptr`). / Mantén el orden de cada array `STRINGS_X[]`
  idéntico al enum `StringID`. Cuando añadas una cadena nueva al enum,
  añádela a cada archivo de idioma (o deja `nullptr`).
