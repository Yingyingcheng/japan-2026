# 秋日日本 · 2026

Trip companion for November 20–28, 2026.

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

## Trip map

The Map tab (`#map`) opens on the whole trip: our three hotels, the airports, and every ride between cities (the Narita car, Fuji Excursion, the Mishima bus and Shinkansen, HARUKA). Each city has an overview (`#map/tokyo`, `#map/kawaguchiko`, `#map/kyoto`) with distance rings around that city's hotel, each area's direction and distance, and the days we go there; choosing an area opens that day zoomed in. Date views (`#map/2026-11-26`, for example) draw the whole day at once: train and bus rides use their line color and pass through the stations we board and leave at, taxis are dashed, walks are dotted, and each stop shows its name and time. Travel days open on the destination city; "Include the journey" zooms out to the whole move. The side list mirrors the route leg by leg; choosing a stop or leg zooms the map to it and shows a Google Maps directions link for that leg. Lines are sketches between stops and stations, not actual track, road or walking paths.

Stops come from the trip data in `data.js`; each day starts at the previous night's hotel and ends at that night's hotel. How we travel between stops lives in `TRIP_MAP_ROUTES` in `trip-map-data.js`: per day, legs are listed in visiting order and matched by destination place ID, with segments for walking (`w`), train or bus lines (`l`, from station `a` to `b`, `m` minutes, `n` stops, `dep`/`arr` times), taxis (`taxi`) and the booked car (`car`). A walk or taxi can name an intermediate stop with `to` (a place, station or spot ID). `w: 'est'` estimates walking time from distance. When a stop is added or reordered in `data.js`, update the matching legs; a stop without a matching leg is still drawn, with a thin dotted line and a pointer to the itinerary. `cities` sets each city's hotel and ring distances, `areas` groups places for the city overviews, and each day's `tab` and `title` label the map.

`trip-map-data.js` stores representative coordinates for every place. Most are geocoded from public addresses by Japan's Geospatial Information Authority (GSI); parks, arcades and station shops without a street address use OpenStreetMap positions, noted in each point's `source`. Station positions also come from OpenStreetMap via OpenFreeMap. None are guaranteed entrance coordinates. `trip-map.js` and `trip-map.css` contain the bilingual map UI. `assets/trip-map-style.json` customizes OpenFreeMap's Positron basemap with quieter labels and parks. Vector map data comes from OpenFreeMap / OpenMapTiles / OpenStreetMap and needs internet; the route list is cached for offline use. Map libraries and licenses are vendored in `assets/vendor/`: MapLibre GL JS 5.10.0.

Map selection does not modify itinerary data or saved personal notes. Add `?preview=map&lang=zh#map` to show a review badge for local previews. The travelers approved publishing this map on October 11, 2026.
