# Reading the Chinese License Plate

A long-form explainer that breaks down how to read a Chinese license plate — the province character, the city letter, the colour codes, and the patterns hidden in those seven (or eight) slots.

## Sections

1. **Hero plate** — full-size animated plate. Click any of the 31 province characters in the grid below to swap the prefix; the digits cycle on a timer.
2. **Anatomy** — annotated diagram of the seven slots: province · city letter · separator · five-character serial.
3. **Geography** — schematic China map with hoverable provinces. Sticky detail card shows capital, population, pinyin, and a fun fact for each. Defaults to Beijing.
4. **Province ticker** — every province character laid out 16 + 15 across two rows, each cell stacking the hanzi above its pinyin.
5. **Colour codes** — the six plate colours (blue, yellow, green, gradient, white, black) with sample plates and what each means.
6. **Fun facts** — three sidebar facts: the missing letters I and O, Shanghai's $12k plate auctions, and the 2016 eighth-slot rule.

## Files

| File | Purpose |
|---|---|
| `Reading the Chinese License Plate.html` | Entry point. Loads React, Babel, fonts, and the JSX/CSS below. |
| `app.jsx` | All React components — Hero, ChinaMap, PlateTypes, Anatomy, FunFacts. |
| `data.js` | Province data (31 entries: char, pinyin, name, capital, population, region, fun-fact). Plate-type definitions. Anatomy slot data. |
| `map-paths.js` | Real China province boundaries projected to SVG paths, plus interior-point label positions for each province (computed via inscribed-circle sampling). Generated from `china-provinces.json`. |
| `china-provinces.json` | Raw GeoJSON source from datav.aliyun. |
| `styles.css` | All styling — typography (Saira Condensed for plate Latin, Noto Sans SC for hanzi, serif headlines, sans-serif kickers), layout, plate rendering, map, ticker. |

## Map labels

Province label positions are not hand-placed — they're computed from each province's polygon by sampling the interior on a grid and picking the point furthest from any edge (poor-man's polylabel). This keeps every character inside its province, including thin/curved ones (Gansu, Inner Mongolia, Tibet).

## Running

Open `Reading the Chinese License Plate.html` in any modern browser. No build step — JSX compiles in the browser via Babel standalone.
