# 秋日日本 · 2026

Trip companion for November 20–28, 2026. Published at https://yingyingcheng.github.io/japan-2026/.

The latest confirmed hotels and flight screenshots are authoritative. The older itinerary is a wish list; trains, restaurant reservations, and experiences are suggestions until the travelers book them.

## Use on a trip

- Open in Safari and use Share → Add to Home Screen.
- Open online once and check the offline confirmation on the preparation page. Itinerary, hotel address cards, and the place list then work offline.
- Maps, booking services, and phone calls need their own connection.
- Notes, favorites, checklists, and reservation progress stay in the current browser. Export and import a backup to transfer them between phones. There is no automatic synchronization.
- Calendar downloads contain the itinerary and reminders. Importing a reminder does not make a reservation.
- Use the 中文 / EN controls to switch languages. The language is remembered on the current device, and `?lang=en` opens a shareable English version. Switching preserves the selected day, personal notes, saved places and checklists. Japanese names, addresses and navigation destinations stay unchanged.

## Maintenance

This is a static site that can be served directly, with no build step. `data.js` contains dates, places, transportation, and source links; `app.js` renders the interface; `styles.css` defines the responsive layout. Flat color-block illustrations (`fuji.jpg`, `tokyo.jpg`, `kyoto.jpg`) and app icons live in `assets/`.

`en.js` supplies English trip copy over the shared IDs and confirmed details. `i18n.js` supplies interface copy. The `html` / `text` template helpers translate authored template fragments only, so interpolated personal notes, Japanese addresses and URLs are not translated. Keep both trip languages updated when editing content. The English install manifest is `manifest-en.webmanifest`.

When updating content or assets, increment the cache version in `sw.js`. For changed script URLs that carry a version in `index.html`, update that version in both the HTML and service worker precache list so existing browser caches refresh and offline use stays available. Its scope is limited to this trip directory. Keep booking references, traveler phone numbers, payment information, and personal notes out of the public source.

The site lives below the existing GitHub Pages homepage and does not replace it.

## Tokyo geography and day maps

The Map tab (`#map`) shows Tokyo neighborhoods around our Aoyama base. Date views (`#map/2026-11-22`, for example) derive their numbered stops from the current trip data. Selecting a stop highlights only the preceding leg; the full set of connections is optional. Lines indicate visit order, not actual walking or transit routes. Google Maps links open the selected leg with the appropriate starting point.

`tokyo-map-data.js` stores representative coordinates geocoded from public addresses by Japan's Geospatial Information Authority (GSI). They are not guaranteed entrance coordinates. `tokyo-map.js` and `tokyo-map.css` contain the bilingual map UI. `assets/tokyo-map-style.json` customizes OpenFreeMap's Positron basemap with quieter labels and parks. Vector map data comes from OpenFreeMap / OpenMapTiles / OpenStreetMap and needs internet; the stop list is cached for offline use. Map libraries and licenses are vendored in `assets/vendor/`: MapLibre GL JS 5.10.0.

The optional university toggle and map selection do not modify itinerary data or saved personal notes. Add `?preview=map&lang=zh#map` to show a review badge for local previews. The travelers approved publishing this map on October 11, 2026.
