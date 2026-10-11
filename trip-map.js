/* Trip map: the whole route between cities, an overview of each city around its hotel, and every day's full route.
   Day lines follow the itinerary order through the stations we board at; they are smooth sketches between those
   points, not exact tracks or walking paths. No live geolocation or routing. */
(() => {
  'use strict';
  const points = window.TRIP_MAP_POINTS;
  const routes = Object.assign({ cities: [], airports: {}, spots: {}, stations: {}, lines: {}, areas: [], days: {} }, window.TRIP_MAP_ROUTES);
  const original = window.TRIP;
  const allDates = original.days.map(d => d.date);
  const palette = ['#2878b4', '#bd3963', '#7860a5', '#177c70'];
  const shortNames = {
    aoyama: ['青山飯店', 'Aoyama hotel'], sunnide: ['Sunnide', 'Sunnide'], hyatt: ['Hyatt', 'Hyatt'],
    afuri: ['AFURI', 'AFURI'], 'hm-cafe': ['HUMAN MADE 咖啡', 'HUMAN MADE Café'], ginkgo: ['外苑銀杏', 'Gaien ginkgo'], gyoen: ['新宿御苑', 'Shinjuku Gyoen'], tanbo: ['田んぼ', 'Tanbo'], mameya: ['KOFFEE MAMEYA', 'KOFFEE MAMEYA'], nezu: ['根津美術館', 'Nezu Museum'], 'ippodo-aoyama': ['一保堂 青山', 'Ippodo Aoyama'], 'gentle-monster': ['GENTLE MONSTER', 'GENTLE MONSTER'], 'human-tokyo': ['HUMAN MADE / KITH', 'HUMAN MADE / KITH'], yoroniku: ['よろにく', 'Yoroniku'], hanayama: ['花山烏冬', 'Hanayama Udon'], glitch: ['GLITCH', 'GLITCH'], todai: ['東京大學', 'UTokyo'], 'ogawa-azabudai': ['OGAWA COFFEE', 'OGAWA COFFEE'], teamlab: ['teamLab', 'teamLab'], shinchan: ['東京車站角色街', 'Tokyo Character Street'], ginza: ['銀座購物', 'Ginza shopping'], 'sushi-yu': ['鮨 由う', 'Sushi Yu'], higuma: ['Higuma Doughnuts', 'Higuma Doughnuts'], gotokuji: ['豪德寺', 'Gotokuji'], 'fuglen-tokyo': ['Fuglen', 'Fuglen'], 'yoyogi-park': ['代代木公園', 'Yoyogi Park'], 'shinjuku-cat': ['3D 貓看板', '3D cat billboard'], 'gelato-pique': ['LUMINE EST', 'LUMINE EST'], 'echire-isetan': ['ÉCHIRÉ 伊勢丹', 'ÉCHIRÉ Isetan'], 'roppongi-hills': ['六本木燈飾', 'Roppongi lights'], gonpachi: ['權八', 'Gonpachi'],
    oishi: ['大石公園', 'Oishi Park'], lake: ['長崎公園', 'Nagasaki Park'], maple: ['紅葉迴廊', 'Maple corridor'],
    'smart-coffee': ['Smart 珈琲店', 'Smart Coffee'], 'umezono-teramachi': ['梅園 三條寺町', 'Umezono'], teramachi: ['寺町・新京極', 'Teramachi / Shinkyogoku'], hoho: ['HOHO HOJICHA', 'HOHO HOJICHA'], 'kyo-chabana': ['京ちゃばな', 'Kyo-Chabana'], lorimer: ['M&Maison', 'M&Maison'], kimono: ['和服店', 'Kimono rental'], kiyomizu: ['清水寺', 'Kiyomizu-dera'], tofukuji: ['東福寺', 'Tofukuji'], 'fushimi-inari': ['伏見稻荷', 'Fushimi Inari'], byodoin: ['平等院', 'Byodoin'], 'tokichi-uji': ['中村藤吉', 'Nakamura Tokichi'], eikando: ['永觀堂', 'Eikando'], ippodo: ['一保堂', 'Ippodo'], 'blend-kyoto': ['blend kyoto', 'blend kyoto'], 'okuniya-mambei': ['大國屋鰻兵衞', 'Okuniya Mambei'], 'marukyu-nishinotoin': ['丸久小山園', 'Marukyu Koyamaen']
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lonlat = o => [o.lon, o.lat];
  const anchor = id => points[id] ? lonlat(points[id]) : routes.stations[id] ? lonlat(routes.stations[id]) : routes.spots[id] ? lonlat(routes.spots[id]) : routes.airports[id] ? lonlat(routes.airports[id]) : null;
  const sourceDay = date => original.days.find(d => d.date === date);
  const placeCity = new Map(original.places.map(p => [p.id, p.city]));
  const cityById = id => routes.cities.find(c => c.id === id);
  const cityOf = date => routes.days[date]?.city || routes.cities.find(c => c.match === sourceDay(date).city)?.id || routes.cities[0]?.id;
  const datesOf = id => allDates.filter(d => cityOf(d) === id);
  const dayColor = date => palette[Math.max(0, datesOf(cityOf(date)).indexOf(date)) % palette.length];
  const f = n => n.toFixed(1);
  const hav = (a, b) => { const t = Math.PI / 180, dLat = (b[1] - a[1]) * t, dLon = (b[0] - a[0]) * t, h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * t) * Math.cos(b[1] * t) * Math.sin(dLon / 2) ** 2; return 2 * 6371000 * Math.asin(Math.sqrt(h)); };
  const hit = (box, boxes) => boxes.some(o => box.x < o.x + o.w && box.x + box.w > o.x && box.y < o.y + o.h && box.y + box.h > o.y);
  const measure = document.createElement('canvas').getContext('2d');
  let savedSelection = 'trip';
  let activeMap;

  /* Quadratic curve bent to the right of travel, so out-and-back legs separate. */
  function curve(a, b, bend) {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const cx = (a[0] + b[0]) / 2 - dy / len * bend, cy = (a[1] + b[1]) / 2 + dx / len * bend;
    return {
      len, d: `M${f(a[0])} ${f(a[1])}Q${f(cx)} ${f(cy)} ${f(b[0])} ${f(b[1])}`,
      at: t => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * cx + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * cy + t * t * b[1]],
      tan: t => [2 * (1 - t) * (cx - a[0]) + 2 * t * (b[0] - cx), 2 * (1 - t) * (cy - a[1]) + 2 * t * (b[1] - cy)]
    };
  }
  function arrowHead(c, color, size) {
    const [x, y] = c.at(1), [tx, ty] = c.tan(1), l = Math.hypot(tx, ty) || 1, ux = tx / l, uy = ty / l, bx = x - ux * size, by = y - uy * size, w = size * .62;
    return `<path d="M${f(x + ux * 2)} ${f(y + uy * 2)}L${f(bx - uy * w)} ${f(by + ux * w)}L${f(bx + uy * w)} ${f(by - ux * w)}Z" fill="${color}" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>`;
  }
  /* First free spot around a marker: right, left, above, below, then the diagonals. */
  function place(x, y, r, w, h, occupied, width, height, preferTop) {
    const g = 5, d = r * .72;
    let spots = [[x + r + g, y - h / 2], [x - r - g - w, y - h / 2], [x - w / 2, y - r - g - h], [x - w / 2, y + r + g], [x + d + g, y - d - h], [x + d + g, y + d], [x - d - g - w, y - d - h], [x - d - g - w, y + d]];
    if (preferTop) spots = [spots[2], spots[3], spots[0], spots[1], ...spots.slice(4)];
    for (const [lx, ly] of spots) {
      const box = { x: lx, y: ly, w, h };
      if (lx < 4 || ly < 4 || lx + w > width - 4 || ly + h > height - 4 || hit(box, occupied)) continue;
      occupied.push(box);
      return box;
    }
    return null;
  }

  function dispose() {
    if (activeMap) { activeMap.remove(); activeMap = null; }
  }
  function mount(root, { language, trip, initialDate }) {
    dispose();
    const en = language === 'en';
    const tx = (zh, english) => en ? english : zh;
    const label = pair => pair ? pair[en ? 1 : 0] : '';
    const sep = en ? ', ' : '・';
    const comma = en ? ', ' : '，';
    const rootStyle = getComputedStyle(document.documentElement);
    const sans = rootStyle.getPropertyValue('--sans').trim() || 'sans-serif';
    const serif = rootStyle.getPropertyValue('--serif').trim() || 'serif';
    const textWidth = (text, font) => { measure.font = font; return measure.measureText(text).width; };
    const places = new Map(trip.places.map(p => [p.id, p]));
    const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (allDates.includes(initialDate)) savedSelection = initialDate;
    else if (cityById(initialDate)) savedSelection = 'city:' + initialDate;
    let selected = savedSelection === 'trip' || allDates.includes(savedSelection) || cityById(savedSelection.slice(5)) ? savedSelection : 'trip';
    let kind = 'trip', model = null, overviewCity = null, focus = null, hover = null, areaHover = null, lastFit = null;

    const name = id => shortNames[id] ? label(shortNames[id]) : places.get(id)?.name || label(routes.airports[id]?.name) || id;
    const stopName = s => s.airport ? label(routes.airports[s.id].name) : s.base && s.end ? tx(`回${name(s.id)}`, `Back to ${name(s.id)}`) : name(s.id);
    const stopTime = s => s.time || (s.base && !s.end ? tx('出發', 'Start') : '');
    const weekday = date => new Date(date + 'T12:00:00+09:00').getUTCDay();
    const dateLabel = date => en ? `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][weekday(date)]}, Nov ${+date.slice(8)}` : `11/${date.slice(8)} 週${'日一二三四五六'[weekday(date)]}`;
    const shortDate = date => date.slice(5).replace('-', '/');
    const chip = code => `<i class="map-line-chip${code.length > 1 ? ' two' : ''}${routes.lines[code].square ? ' square' : ''}" style="--line-color:${routes.lines[code].color}" aria-hidden="true">${code}</i>`;
    const walkIcon = '<svg class="map-mode-icon" viewBox="0 0 19 19" aria-hidden="true"><g fill="currentColor"><circle cx="3.5" cy="9.5" r="1.7"/><circle cx="9.5" cy="9.5" r="1.7"/><circle cx="15.5" cy="9.5" r="1.7"/></g></svg>';
    const carIcon = '<svg class="map-mode-icon" viewBox="0 0 19 19" aria-hidden="true"><path d="M2 9.5h4m3 0h4m3 0h1" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
    const stayRange = c => { const m = (original.places.find(p => p.id === c.hotel)?.stay || '').match(/(\d+\/\d+)\s*→\s*\d+\/(\d+)/); return m ? `${m[1]}–${m[2]}` : ''; };

    /* ---------- Day model: stops from the itinerary, legs from TRIP_MAP_ROUTES ---------- */
    function resolve(segments, a, b) {
      const pieces = [], spans = [];
      let current = a;
      segments.forEach((g, i) => {
        if (g.l) {
          if (!routes.lines[g.l] || !routes.stations[g.a] || !routes.stations[g.b]) return;
          const from = anchor(g.a), to = anchor(g.b);
          if (hav(current, from) > 40) pieces.push({ k: 'walk', a: current, b: from });
          pieces.push({ k: 'line', a: from, b: to, line: g.l, m: g.m, n: g.n, dep: g.dep, arr: g.arr, from: g.a, to: g.b });
          spans[i] = { a: from, b: to };
          current = to;
          return;
        }
        // walks, taxis and cars head for an explicit `to`, else the next boarding station, else the stop itself
        const next = segments.slice(i + 1).find(x => x.l && routes.stations[x.a]);
        const target = (g.to && anchor(g.to)) || (next ? anchor(next.a) : b);
        spans[i] = { a: current, b: target, to: g.to || (next ? next.a : null) };
        if (g.car != null || g.taxi != null || g.to) {
          if (hav(current, target) > 40) pieces.push({ k: g.car != null ? 'car' : g.taxi != null ? 'taxi' : 'walk', a: current, b: target });
          current = target;
        }
      });
      if (hav(current, b) > 40) pieces.push({ k: 'walk', a: current, b });
      return { pieces, spans };
    }
    function prepareLeg(leg, stops) {
      const a = stops[leg.from].ll, b = stops[leg.to].ll;
      leg.unknown = !leg.s.length;
      const { pieces, spans } = leg.unknown ? { pieces: [{ k: 'plain', a, b }], spans: [] } : resolve(leg.s, a, b);
      leg.pieces = pieces;
      leg.spans = spans;
      leg.estimateAt = i => Math.max(1, Math.round(hav(spans[i]?.a || a, spans[i]?.b || b) * 1.3 / 75));
      leg.lines = leg.s.filter(g => g.l && routes.lines[g.l]).map(g => g.l);
      leg.mode = leg.unknown ? 'plain' : leg.s.some(g => g.car != null) ? 'car' : leg.lines.length ? 'train' : leg.s.some(g => g.taxi != null) ? 'taxi' : 'walk';
      leg.long = pieces.some(p => hav(p.a, p.b) > 20000);
      leg.optional = !!(stops[leg.from].optional || stops[leg.to].optional);
      if (leg.t == null && !leg.unknown) {
        if (leg.s.length === 1 && typeof leg.s[0].w === 'string' && leg.s[0].w !== 'est') leg.t = leg.s[0].w;
        else {
          let sum = 0, known = true;
          leg.s.forEach((g, i) => {
            const road = g.car ?? g.taxi;
            if (road !== undefined) { if (typeof road === 'number' && road > 0) sum += road; else known = false; }
            else if (g.w !== undefined) { const w = g.w === 'est' ? leg.estimateAt(i) : g.w; if (typeof w === 'number' && w > 0) sum += w; else known = false; }
            else if (typeof g.m === 'number') sum += g.m; else known = false;
          });
          leg.t = known && sum ? String(sum) : null;
        }
      }
      return leg;
    }
    function buildDay(date) {
      const index = allDates.indexOf(date), day = trip.days[index], source = original.days[index];
      const route = routes.days[date] || { legs: [] };
      const hotel = source.hotel, start = route.start || (index > 0 ? original.days[index - 1].hotel : null);
      const timeOf = test => { const k = source.items.findIndex(test); return k >= 0 ? day.items[k].time : ''; };
      const stops = [];
      if (routes.airports[start]) stops.push({ id: start, airport: true, time: timeOf(i => i.type === 'flight' && /抵達/.test(i.title || '')) });
      else if (start) {
        const first = source.items.findIndex(i => i.place);
        const lead = source.items.slice(0, first < 0 ? source.items.length : first).findIndex(i => i.type === 'transit');
        stops.push({ id: start, base: true, time: lead >= 0 ? day.items[lead].time : '' });
      }
      let number = 0;
      day.items.forEach((item, i) => {
        const title = source.items[i].title || '';
        const isHotel = item.place && (item.place === hotel || item.place === start) && points[item.place];
        if (isHotel || (hotel && title.includes('回飯店'))) {
          const id = isHotel ? item.place : hotel;
          const checkIn = isHotel && id === hotel && id !== start && !stops.some(s => s.id === id);
          stops.push({ id, base: true, time: item.time, note: checkIn ? tx('入住', 'Check in') : isHotel ? '' : item.title });
        } else if (item.place && points[item.place]) stops.push({ id: item.place, n: ++number, time: item.time, optional: !!item.optional });
      });
      const last = stops[stops.length - 1];
      if (hotel) { if (stops.length > 1 && last.base && last.id === hotel) last.end = true; else stops.push({ id: hotel, base: true, end: true }); }
      else if (routes.airports[route.end]) stops.push({ id: route.end, airport: true, end: true, time: timeOf(i => i.type === 'flight' && /到|抵達/.test(i.title || '')) });
      stops.forEach((s, i) => { s.i = i; s.ll = anchor(s.id); s.city = s.airport ? null : placeCity.get(s.id); });
      const legs = [], specs = route.legs || [];
      let next = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        const to = stops[i + 1].id;
        let spec = null;
        if (specs[next]?.to === to) spec = specs[next++];
        else if (specs[next + 1]?.to === to) { spec = specs[next + 1]; next += 2; }
        legs.push(prepareLeg({ ...(spec || {}), s: spec ? spec.s : [], i, from: i, to: i + 1 }, stops));
      }
      const alts = (route.alts || []).map(a => {
        const k = stops.findIndex(s => s.id === a.skip);
        return k > 0 && k < stops.length - 1 ? prepareLeg({ ...a, from: k - 1, to: k + 1 }, stops) : null;
      }).filter(Boolean);
      const main = stops.filter(s => s.city === source.city);
      return { date, index, stops, legs, alts, count: number, city: cityOf(date), all: stops.map(s => s.ll), main: (main.length ? main : stops).map(s => s.ll), wider: main.length > 0 && main.length < stops.length };
    }
    const days = allDates.map(buildDay);
    const dayModel = date => days[allDates.indexOf(date)];
    const transfers = days.flatMap(d => d.legs.filter(l => l.long).map(leg => ({ day: d, leg })));
    const stays = routes.cities.map(c => ({ city: c, ll: anchor(c.hotel), place: original.places.find(p => p.id === c.hotel) })).filter(s => s.ll);
    const airportsUsed = days.flatMap(d => d.stops.filter(s => s.airport).map(s => ({ ...s, date: d.date })));
    const tripPoints = [...stays.map(s => s.ll), ...airportsUsed.map(s => s.ll)];
    const cityPoints = id => { const c = cityById(id); return [anchor(c.hotel), ...days.filter(d => d.city === id).flatMap(d => d.stops.filter(s => s.city === c.match).map(s => s.ll))]; };
    const areas = routes.areas.map(a => {
      const ids = a.places.filter(id => points[id]), city = cityById(a.city || 'tokyo');
      if (!ids.length || !city) return null;
      const ll = [ids.reduce((s, id) => s + points[id].lon, 0) / ids.length, ids.reduce((s, id) => s + points[id].lat, 0) / ids.length];
      const on = days.filter(d => d.stops.some(s => a.places.includes(s.id))).map(d => d.date);
      return { ...a, city: city.id, ll, dist: hav(anchor(city.hotel), ll), days: on };
    }).filter(a => a && a.days.length).sort((a, b) => a.dist - b.dist);

    /* ---------- Text ---------- */
    const targetName = span => !span?.to ? '' : points[span.to] ? name(span.to) : routes.stations[span.to] ? label(routes.stations[span.to].name) + tx('站', ' Station') : routes.spots[span.to] ? label(routes.spots[span.to].name) : '';
    function parts(leg) {
      if (leg.unknown) return [{ icon: '', text: tx('交通方式見每日行程', 'See the itinerary for how we get here') }];
      return leg.s.map((g, i) => {
        const where = targetName(leg.spans[i]);
        if (g.car != null) return { icon: carIcon, text: tx(`接送車 約 ${g.car} 分`, `Booked car, about ${g.car} min`) };
        if (g.taxi != null) return { icon: carIcon, text: tx(`計程車${g.taxi ? ` 約 ${g.taxi} 分` : ''}${where ? `，到${where}` : ''}`, `Taxi${g.taxi ? `, about ${g.taxi} min` : ''}${where ? ` to ${where}` : ''}`) };
        if (g.w !== undefined) {
          const w = g.w === 'est' ? leg.estimateAt(i) : g.w, to = g.to && where ? tx(`，到${where}`, ` to ${where}`) : '';
          return { icon: walkIcon, text: (!w ? tx('步行', 'Walk') : g.w === 'est' ? tx(`步行約 ${w} 分`, `Walk, about ${w} min`) : tx(`步行 ${w} 分`, `Walk ${w} min`)) + to };
        }
        if (!routes.lines[g.l] || !routes.stations[g.a] || !routes.stations[g.b]) return null;
        const when = g.dep && g.arr ? `${g.dep}–${g.arr}` : g.dep ? (en ? g.dep.replace('約 ', 'about ').replace(' 後', ' or later') : g.dep) : '';
        const bits = [when, g.m ? tx(`${g.m} 分`, `${g.m} min`) : '', g.n ? tx(`${g.n} 站`, `${g.n} stop${g.n > 1 ? 's' : ''}`) : ''].filter(Boolean).join(sep);
        return { icon: chip(g.l), text: `${label(routes.lines[g.l].name)} ${label(routes.stations[g.a].name)} → ${label(routes.stations[g.b].name)}${bits ? comma + bits : ''}` };
      }).filter(Boolean);
    }
    const partsHTML = leg => parts(leg).map(p => `<span class="map-how-line">${p.icon}<span>${esc(p.text)}</span></span>`).join('');
    const track = leg => (leg.unknown ? '<i class="plain"></i>' : leg.s.map(g => g.car != null || g.taxi != null ? '<i class="car"></i>' : g.l && routes.lines[g.l] ? `<i class="line" style="--line-color:${routes.lines[g.l].color}"></i>` : g.w === 0 ? '' : '<i class="walk"></i>').join('')) || '<i class="walk"></i>';
    function directions(d, leg) {
      const a = d.stops[leg.from].ll, b = d.stops[leg.to].ll, url = new URL('https://www.google.com/maps/dir/');
      url.searchParams.set('api', '1');
      url.searchParams.set('origin', a[1] + ',' + a[0]);
      url.searchParams.set('destination', b[1] + ',' + b[0]);
      url.searchParams.set('travelmode', leg.mode === 'walk' ? 'walking' : leg.mode === 'car' || leg.mode === 'taxi' ? 'driving' : 'transit');
      return url.href;
    }
    function bearing(a, b) {
      const t = Math.PI / 180, y = Math.sin((b[0] - a[0]) * t) * Math.cos(b[1] * t), x = Math.cos(a[1] * t) * Math.sin(b[1] * t) - Math.sin(a[1] * t) * Math.cos(b[1] * t) * Math.cos((b[0] - a[0]) * t);
      const i = Math.round(((Math.atan2(y, x) / t + 360) % 360) / 45) % 8;
      return en ? ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'][i] : ['北', '東北', '東', '東南', '南', '西南', '西', '西北'][i];
    }
    const dayChip = date => `<i class="map-day-chip" style="--day-color:${dayColor(date)}" title="${esc(dateLabel(date))}">${date.slice(8)}</i>`;

    /* ---------- Page ---------- */
    root.innerHTML = `${new URLSearchParams(location.search).has('preview') ? `<div class="map-preview-note">${tx('預覽版 · 確認後再發布', 'Preview · review before publishing')}</div>` : ''}
      <div class="trip-map-heading"><div><div class="eyebrow">OUR JAPAN, ON THE MAP</div><h1>${tx('旅程，在地圖上看。', 'Our trip, on the map.')}</h1><p>${tx('先看城市之間怎麼移動，再選一個城市、一天，看完整路線。', 'See how we move between cities, then pick a city and a day to see its whole route.')}</p></div><a class="button secondary compact" href="#plan">${tx('回每日行程', 'Back to the itinerary')}</a></div>
      <nav class="map-nav" aria-label="${tx('選擇地圖', 'Choose a map')}"></nav>
      <div class="trip-map-layout"><section class="map-canvas-wrap" aria-label="${tx('互動地圖', 'Interactive map')}"><div class="map-canvas"></div><div class="map-fit-group"><button class="map-fit" type="button" data-map-fit></button><button class="map-fit" type="button" data-map-fit="all"></button></div><p class="map-network-status" role="status" hidden></p></section><aside class="map-story"></aside></div>
      <div class="map-legend"></div>
      <details class="map-footnote"><summary>${tx('地圖資料與使用說明', 'Map information')}</summary><p>${tx('標記多依公開地址，代表地點附近；沒有地址的公園、商店街與車站內店家用 OpenStreetMap 的位置。入口請以導航為準。路線依行程順序，經過上下車的車站，畫成示意線，不是實際軌道、道路或步行路線。標「約」的步行時間依距離估算。車站位置來自 OpenStreetMap。底圖需要網路。', 'Markers mostly use public address representative points; parks, arcades and station shops without an address use OpenStreetMap positions. Navigate to the actual entrance. Routes follow the itinerary order through the stations we use, drawn as sketches rather than exact rail, road or walking paths. Walking times marked “about” are estimated from distance. Station positions come from OpenStreetMap. The basemap needs internet.')} <a href="https://maps.gsi.go.jp/" target="_blank" rel="noopener">${tx('座標：国土地理院', 'Coordinates: GSI Japan')}</a></p></details>`;
    const nav = root.querySelector('.map-nav');
    const story = root.querySelector('.map-story');
    const status = root.querySelector('.map-network-status');
    const legend = root.querySelector('.map-legend');
    const fitGroup = root.querySelector('.map-fit-group');
    const [fitButton, allButton] = fitGroup.children;

    function navHTML() {
      const city = kind === 'trip' ? null : kind === 'city' ? overviewCity.id : model.city;
      const cities = `<div class="map-city-tabs" role="group" aria-label="${tx('城市', 'City')}"><button type="button" data-map-select="trip" aria-pressed="${kind === 'trip'}"><span>${tx('全程', 'Whole trip')}</span><small>${shortDate(allDates[0])}–${allDates[allDates.length - 1].slice(8)}</small></button>${routes.cities.map(c => `<button type="button" data-map-select="city:${c.id}" aria-pressed="${city === c.id}"><span>${esc(label(c.name))}</span><small>${stayRange(c)}</small></button>`).join('')}</div>`;
      if (!city) return cities;
      const c = cityById(city);
      return cities + `<div class="map-day-tabs" role="group" aria-label="${tx('選擇日期', 'Choose a day')}"><button type="button" data-map-select="city:${c.id}" aria-pressed="${kind === 'city'}">${tx(`認識${label(c.name)}`, `${label(c.name)} overview`)}</button>${datesOf(c.id).map(d => `<button type="button" data-map-select="${d}" aria-pressed="${selected === d}"><span>${shortDate(d)}</span><small>${esc(label(routes.days[d]?.tab))}</small></button>`).join('')}</div>`;
    }

    /* ---------- Story panel ---------- */
    function tripStory() {
      const outbound = original.flights.find(x => x.id === 'outbound'), back = original.flights.find(x => x.id === 'return');
      const events = [
        ...airportsUsed.map(s => ({ date: s.date, order: s.end ? 3 : 0, html: `<li class="map-rail-stop"><button type="button" data-map-select="${s.date}"><span class="map-node air" aria-hidden="true">✈</span><span class="map-rail-text"><small>${esc([shortDate(s.date), s.end ? (back ? `${back.number} ${back.departure} ${tx('起飛', 'departs')}` : '') : (outbound ? `${outbound.number} ${outbound.arrival} ${tx('抵達', 'arrives')}` : '')].filter(Boolean).join(sep))}</small><strong>${esc(label(routes.airports[s.id].name))}</strong></span></button></li>` })),
        ...transfers.map(({ day, leg }) => ({ date: day.date, order: 1, html: `<li class="map-rail-leg"><button type="button" data-map-transfer="${day.date}:${leg.i}"><span class="map-track">${track(leg)}</span><span class="map-how"><b>${esc(dateLabel(day.date))}</b>${partsHTML(leg)}</span></button></li>` })),
        ...stays.map(({ city, place: hotel }) => ({ date: datesOf(city.id)[0], order: 2, html: `<li class="map-rail-stop"><button type="button" data-map-select="city:${city.id}"><span class="map-node home" aria-hidden="true">H</span><span class="map-rail-text"><small>${esc([stayRange(city), hotel?.nights ? tx(`${hotel.nights} 晚`, `${hotel.nights} night${hotel.nights > 1 ? 's' : ''}`) : ''].filter(Boolean).join(sep))}</small><strong>${esc(`${label(city.name)}${sep}${places.get(city.hotel)?.name || name(city.hotel)}`)}</strong></span></button></li>` }))
      ].sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);
      return `<div class="map-story-top"><span class="eyebrow">${shortDate(allDates[0])} – ${shortDate(allDates[allDates.length - 1])}</span><h2>${tx(`${allDates.length} 天，${routes.cities.map(c => label(c.name)).join('、')}。`, `${allDates.length} days: ${routes.cities.map(c => label(c.name)).join(', ')}.`)}</h2><p>${tx('點一個城市看各區在哪，點一段移動看那天的路線。', 'Choose a city to see where its areas are, or a journey to open that day.')}</p></div><ol class="map-rail">${events.map(e => e.html).join('')}</ol>`;
    }
    function cityStory() {
      const c = overviewCity, base = anchor(c.hotel), list = areas.filter(a => a.city === c.id);
      return `<div class="map-story-top"><span class="eyebrow">${esc(tx(`從${name(c.hotel)}出發`, `From ${name(c.hotel)}`))}</span><h2>${tx('每一區在哪個方向、多遠，哪幾天會去。', 'Where each area is, how far, and which days we go.')}</h2></div><ul class="map-area-list">${list.map(a => `<li><button type="button" data-map-area="${a.id}"><strong>${esc(label(a.name))}</strong><small>${en ? `${(a.dist / 1000).toFixed(1)} km ${bearing(base, a.ll)}` : `${bearing(base, a.ll)}方 ${(a.dist / 1000).toFixed(1)} km`}</small><span class="map-area-days">${a.days.map(dayChip).join('')}</span></button></li>`).join('')}</ul><p class="map-story-hint">${tx('色塊上的數字是日期。點一區，打開那天並放大到這裡。', 'The colored numbers are dates. Choose an area to open that day, zoomed in.')}</p>`;
    }
    function dayStory() {
      const { stops, legs, alts, count, date } = model;
      const counts = [[legs.filter(l => l.mode === 'train').length, '搭車', 'train or bus ride'], [legs.filter(l => l.mode === 'taxi' || l.mode === 'car').length, '計程車', 'taxi ride'], [legs.filter(l => l.mode === 'walk').length, '步行', 'walk']].filter(([n]) => n);
      const summary = [count ? tx(`${count} 站`, `${count} stop${count === 1 ? '' : 's'}`) : '', ...counts.map(([n, zh, english]) => tx(`${zh} ${n} 段`, `${n} ${english}${n > 1 ? 's' : ''}`))].filter(Boolean).join(sep);
      let rows = '';
      stops.forEach((s, i) => {
        const node = s.airport ? '<span class="map-node air" aria-hidden="true">✈</span>' : s.base ? '<span class="map-node home" aria-hidden="true">H</span>' : `<span class="map-node${s.optional ? ' optional' : ''}" aria-hidden="true">${s.n}</span>`;
        const sub = [stopTime(s), s.optional && !/可選|optional/i.test(s.time || '') ? tx('可選', 'optional') : '', s.note || ''].filter(Boolean).join(sep);
        rows += `<li class="map-rail-stop"><button type="button" data-map-stop="${i}" aria-pressed="false">${node}<span class="map-rail-text"><small>${esc(sub)}</small><strong>${esc(stopName(s))}</strong></span></button></li>`;
        alts.filter(a => a.from === i).forEach(a => {
          rows += `<li class="map-rail-leg alt"><button type="button" data-map-alt aria-pressed="false"><span class="map-track">${track(a)}</span><span class="map-how"><b>${esc(label(a.label))}</b>${partsHTML(a)}</span></button></li>`;
        });
        const leg = legs[i];
        if (!leg) return;
        const extra = [leg.alt, leg.note].filter(Boolean).map(x => `<em>${esc(label(x))}</em>`).join('');
        rows += `<li class="map-rail-leg${leg.optional ? ' optional' : ''}"><button type="button" data-map-leg="${i}" aria-pressed="false"><span class="map-track">${track(leg)}</span><span class="map-how">${partsHTML(leg)}${extra}</span></button><a class="map-leg-link" href="${esc(directions(model, leg))}" target="_blank" rel="noopener noreferrer">${tx('Google Maps 路線', 'Directions in Google Maps')} ↗</a></li>`;
      });
      return `<div class="map-story-top"><span class="eyebrow">${esc(dateLabel(date))}</span><h2>${esc(label(routes.days[date]?.title) || trip.days[model.index].title)}</h2><p>${esc(summary)}${tx('。點一站或一段，地圖會放大到那裡。', '. Choose a stop or a leg to zoom the map to it.')}</p></div><ol class="map-rail">${rows}</ol><a class="text-button map-to-plan" href="#plan/${date}">${tx('看這天的完整行程', 'See the full day’s itinerary')} →</a>`;
    }
    function renderStory() {
      story.scrollTop = 0;
      story.innerHTML = kind === 'trip' ? tripStory() : kind === 'city' ? cityStory() : dayStory();
    }
    function syncStory() {
      story.querySelectorAll('[data-map-stop],[data-map-leg],[data-map-alt]').forEach(row => {
        const on = !!focus && ((focus.t === 'stop' && row.dataset.mapStop === String(focus.i)) || (focus.t === 'leg' && row.dataset.mapLeg === String(focus.i)) || (focus.t === 'alt' && row.dataset.mapAlt !== undefined));
        row.closest('li').classList.toggle('active', on);
        row.setAttribute('aria-pressed', String(on));
        if (on && story.scrollHeight > story.clientHeight + 4) {
          const box = story.getBoundingClientRect(), r = row.getBoundingClientRect();
          if (r.top < box.top || r.bottom > box.bottom) story.scrollTop += r.top - box.top - box.height / 3;
        }
      });
    }

    /* ---------- Map ---------- */
    const canvas = root.querySelector('.map-canvas');
    let map;
    if (window.maplibregl) {
      try {
        map = activeMap = new maplibregl.Map({ container: canvas, style: new URL('assets/trip-map-style.json', location.href).href, center: anchor('aoyama'), zoom: 9, minZoom: 5, maxZoom: 18, attributionControl: false, dragRotate: false, pitchWithRotate: false, touchPitch: false });
      } catch {
        canvas.innerHTML = `<div class="map-load-error">${tx('此裝置無法顯示互動底圖，仍可使用旁邊的路線清單與 Google Maps。', 'This device cannot display the interactive map. The route list and Google Maps links still work.')}</div>`;
      }
    } else canvas.innerHTML = `<div class="map-load-error">${tx('地圖元件未載入，請重新整理。', 'The map could not load. Please reload.')}</div>`;
    let lines, marks;
    if (map) {
      map.scrollZoom.disable(); map.touchZoomRotate.disableRotation();
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      map.addControl(new maplibregl.ScaleControl({ unit: 'metric', maxWidth: 90 }), 'bottom-left');
      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
      map.on('error', () => { status.hidden = false; status.textContent = tx('底圖載入不完整，請檢查網路。路線清單仍可使用。', 'The basemap is incomplete. Check your connection; the route list still works.'); });
      // ward names from the basemap compete with our own area labels
      map.on('load', () => { status.hidden = true; ['label_city', 'label_city_capital'].forEach(id => { if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', 'none'); }); });
      const overlay = document.createElement('div');
      overlay.className = 'map-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '<svg class="map-overlay-lines"></svg><div class="map-overlay-marks"></div>';
      map.getContainer().appendChild(overlay);
      lines = overlay.firstChild; marks = overlay.lastChild;
      map.on('move', paint);
      map.on('resize', () => { if (lastFit) fitTo(lastFit.lls, { ...lastFit, animate: false }); paint(); });
      map.on('click', () => { if (focus) { focus = null; syncStory(); paint(); } });
    }
    function fitTo(lls, { padding = { top: 64, right: 64, bottom: 46, left: 50 }, maxZoom = 14.6, animate = true } = {}) {
      lls = lls.filter(Boolean);
      if (!map || !lls.length) return;
      lastFit = { lls, padding, maxZoom };
      const c = map.getContainer(), room = Math.min((c.clientWidth - 80) / (padding.left + padding.right), (c.clientHeight - 80) / (padding.top + padding.bottom), 1);
      const pad = Object.fromEntries(Object.entries(padding).map(([k, v]) => [k, Math.max(8, Math.floor(v * Math.max(room, .2)))]));
      const bounds = lls.reduce((box, p) => box.extend(p), new maplibregl.LngLatBounds(lls[0], lls[0]));
      map.fitBounds(bounds, { padding: pad, maxZoom, duration: animate && !reduceMotion() ? 450 : 0 });
    }
    const legPoints = leg => leg.pieces.flatMap(p => [p.a, p.b]);
    const close = { padding: { top: 76, right: 76, bottom: 60, left: 64 }, maxZoom: 15.6 };
    function frame(animate) {
      if (kind === 'trip') fitTo(tripPoints, { padding: { top: 70, right: 70, bottom: 46, left: 60 }, maxZoom: 9, animate });
      else if (kind === 'city') fitTo(cityPoints(overviewCity.id), { padding: { top: 40, right: 40, bottom: 36, left: 40 }, maxZoom: 13, animate });
      else fitTo(model.main, { animate });
    }
    const obstacles = v => [{ x: 0, y: 0, w: fitGroup.offsetWidth + 20, h: 56 }, { x: v.w - 56, y: 0, w: 56, h: 96 }, { x: 0, y: v.h - 32, w: 116, h: 32 }, { x: v.w - 320, y: v.h - 28, w: 320, h: 28 }];

    function drawPieces(v, leg, { opacity = 1, thick = 1, arrow = false, dashed = false } = {}) {
      let out = '';
      leg.pieces.forEach((pc, j) => {
        pc.curve = null;
        const a = v.p(pc.a), b = v.p(pc.b), len = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (len < 3) return;
        const last = j === leg.pieces.length - 1;
        if (pc.k === 'line') {
          const c = curve(a, b, Math.min(len * .12, 38)), color = routes.lines[pc.line].color;
          out += `<path d="${c.d}" fill="none" stroke="#fff" stroke-width="${9 * thick}" stroke-linecap="round" opacity="${opacity}"/><path d="${c.d}" fill="none" stroke="${color}" stroke-width="${5 * thick}" stroke-linecap="round" opacity="${opacity}"${dashed ? ' stroke-dasharray="9 7"' : ''}/>`;
          if (arrow && last) out += `<g opacity="${opacity}">${arrowHead(c, color, 7 + 3 * thick)}</g>`;
          pc.curve = c;
        } else if (pc.k === 'car' || pc.k === 'taxi' || pc.k === 'plain') {
          const c = curve(a, b, pc.k === 'plain' ? 0 : Math.min(len * .06, 14));
          out += `<path d="${c.d}" fill="none" stroke="#5d6f82" stroke-width="${(pc.k === 'plain' ? 2.2 : 3) * thick}" stroke-dasharray="${pc.k === 'plain' ? '2 5' : '8 6'}" stroke-linecap="round" opacity="${opacity}"/>`;
          if (arrow && last && pc.k !== 'plain') out += `<g opacity="${opacity}">${arrowHead(c, '#5d6f82', 6 + 3 * thick)}</g>`;
          pc.curve = c;
        } else {
          const c = curve(a, b, Math.min(len * .1, 20));
          out += `<path d="${c.d}" fill="none" stroke="#24394f" stroke-width="${3.2 * thick + .4}" stroke-dasharray="0.1 ${f(6.5 * Math.max(1, thick * .9))}" stroke-linecap="round" opacity="${opacity * .85}"/>`;
          if (arrow && last) out += `<g opacity="${opacity}">${arrowHead(c, '#24394f', 6 + 3 * thick)}</g>`;
          pc.curve = c;
        }
      });
      return out;
    }
    /* Station dots, station names where there is room, and a chip with minutes or times on each ride. */
    function drawRides(v, legs, { svg, html, occupied, names, badgeAttrs }) {
      const seen = new Set();
      legs.forEach(leg => leg.pieces.forEach(pc => {
        if (pc.k !== 'line') return;
        [[pc.from, pc.a], [pc.to, pc.b]].forEach(([id, ll]) => {
          if (seen.has(id + pc.line)) return;
          seen.add(id + pc.line);
          const [x, y] = v.p(ll);
          svg.push(`<circle cx="${f(x)}" cy="${f(y)}" r="4.6" fill="#fff" stroke="${routes.lines[pc.line].color}" stroke-width="2.6"/>`);
          if (names && !seen.has('label ' + id)) {
            seen.add('label ' + id);
            const text = label(routes.stations[id].name) + tx('站', ' Sta.'), box = place(x, y, 5, textWidth(text, `500 11px ${sans}`), 14, occupied, v.w, v.h);
            if (box) html.push(`<div class="map-label station" style="left:${f(box.x)}px;top:${f(box.y)}px">${esc(text)}</div>`);
          }
        });
      }));
      legs.forEach(leg => leg.pieces.forEach(pc => {
        if (pc.k !== 'line' || !pc.curve || pc.curve.len < 46) return;
        const text = pc.dep && pc.arr ? `${pc.dep}–${pc.arr}` : pc.m ? tx(`${pc.m}分`, `${pc.m} min`) : pc.n ? tx(`${pc.n}站`, `${pc.n} stop${pc.n > 1 ? 's' : ''}`) : label(routes.lines[pc.line].name);
        const w = 26 + textWidth(text, `600 11px ${sans}`) + 10, h = 24;
        // long rides may run off-screen, so look along the whole line for a visible spot
        const along = pc.curve.len > 400 ? [.5, .36, .64, .25, .75, .15, .85, .08, .92] : [.5, .36, .64];
        for (const t of along) {
          const [x, y] = pc.curve.at(t), box = { x: x - w / 2, y: y - h / 2, w, h };
          if (box.x < 4 || box.y < 4 || box.x + w > v.w - 4 || box.y + h > v.h - 4 || hit(box, occupied)) continue;
          occupied.push(box);
          html.push(`<button type="button" tabindex="-1" class="map-badge" ${badgeAttrs(leg)} style="left:${f(x)}px;top:${f(y)}px">${chip(pc.line)}${esc(text)}</button>`);
          break;
        }
      }));
    }
    function clusterPins(v) {
      const pins = [], specials = new Map();
      model.stops.forEach(s => {
        const [x, y] = v.p(s.ll);
        if (s.base || s.airport) { if (!specials.has(s.id)) specials.set(s.id, { x, y, ids: [], id: s.id, airport: !!s.airport }); specials.get(s.id).ids.push(s.i); return; }
        const near = pins.find(c => Math.abs(c.x - x) < 30 + (c.ids.length - 1) * 7 && Math.abs(c.y - y) < 26);
        if (near) near.ids.push(s.i); else pins.push({ x, y, ids: [s.i] });
      });
      return { pins, specials: [...specials.values()] };
    }
    function pinText(c) {
      const stops = c.ids.map(i => model.stops[i]), names = [...new Set(stops.map(s => name(s.id)))];
      const title = names.length > 2 ? names.slice(0, 2).join(en ? ', ' : '、') + ` +${names.length - 2}` : names.join(en ? ', ' : '、');
      const times = [...new Set(stops.map(stopTime).filter(Boolean))], clock = times.filter(t => /\d:\d\d/.test(t));
      return { title, time: times.length < 2 ? (times[0] || '') : clock.length > 1 ? `${clock[0].replace(/^\D+/, '')}–${clock[clock.length - 1].replace(/^\D+/, '')}` : times.join(' / ') };
    }

    /* Day view: every leg drawn at once; a focused stop or leg mutes the rest. */
    function drawDay(v) {
      const { stops, legs, alts } = model, svg = [], html = [], occupied = obstacles(v);
      const fo = hover || focus;
      const legOn = i => !fo || (fo.t === 'leg' && fo.i === i) || (fo.t === 'stop' && (i === fo.i - 1 || i === fo.i));
      const stopOn = i => !fo || (fo.t === 'stop' && fo.i === i) || (fo.t === 'leg' && (legs[fo.i].from === i || legs[fo.i].to === i)) || (fo.t === 'alt' && alts[0] && (i === alts[0].from || i === alts[0].to));
      const showAlt = !!fo && alts.length > 0 && (fo.t === 'alt' || (fo.t === 'stop' && stops[fo.i].optional) || (fo.t === 'leg' && legs[fo.i].optional));
      const { pins, specials } = clusterPins(v);
      legs.forEach(leg => {
        const on = legOn(leg.i);
        svg.push(drawPieces(v, leg, { opacity: on ? (leg.optional ? .75 : 1) : .16, thick: fo && on ? 1.25 : 1, arrow: !!fo && on, dashed: leg.optional }));
      });
      if (showAlt) alts.forEach(a => svg.push(drawPieces(v, a, { opacity: fo.t === 'alt' ? 1 : .55, thick: fo.t === 'alt' ? 1.25 : 1, arrow: fo.t === 'alt' })));
      const shown = legs.filter(l => legOn(l.i)).concat(showAlt ? alts : []);
      pins.forEach(c => occupied.push({ x: c.x - 15, y: c.y - 15, w: 30 + (c.ids.length - 1) * 14, h: 30 }));
      specials.forEach(c => occupied.push({ x: c.x - 16, y: c.y - 16, w: 32, h: 32 }));
      // a long car ride (from Narita) enters from off-screen; label it where it crosses into view
      shown.forEach(leg => leg.pieces.forEach(pc => {
        if (pc.k !== 'car' || hav(pc.a, pc.b) < 15000) return;
        const a = v.p(pc.a), b = v.p(pc.b);
        for (let t = 0; t <= 1; t += .02) {
          const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
          if (x > 40 && x < v.w - 150 && y > 70 && y < v.h - 50) {
            const seg = leg.s.find(g => g.car != null), text = tx(`${stopName(stops[leg.from])} → 接送車 約 ${seg.car} 分`, `From ${stopName(stops[leg.from])} by booked car, about ${seg.car} min`);
            const w = textWidth(text, `500 11px ${sans}`) + 34, bx = Math.min(Math.max(x, w / 2 + 8), v.w - w / 2 - 60);
            html.push(`<div class="map-badge wide" style="left:${f(bx)}px;top:${f(y - 22)}px">${carIcon}${esc(text)}</div>`);
            occupied.push({ x: bx - w / 2, y: y - 34, w, h: 24 });
            break;
          }
        }
      }));
      drawRides(v, shown, { svg, html, occupied, names: !!fo || v.zoom >= 14.3, badgeAttrs: leg => leg.label ? 'data-map-alt' : `data-map-leg="${leg.i}"` });
      specials.forEach(c => {
        const active = fo && c.ids.some(stopOn);
        html.push(`<button type="button" tabindex="-1" class="map-pin ${c.airport ? 'air' : 'home'}${active ? ' active' : ''}" data-map-stop="${c.ids[0]}" style="left:${f(c.x)}px;top:${f(c.y)}px">${c.airport ? '✈' : 'H'}</button>`);
        const text = c.airport ? label(routes.airports[c.id].name) : name(c.id), box = place(c.x, c.y, 15, textWidth(text, `600 13px ${sans}`), 17, occupied, v.w, v.h);
        if (box) html.push(`<div class="map-label hotel" style="left:${f(box.x)}px;top:${f(box.y)}px">${esc(text)}</div>`);
      });
      pins.forEach(c => {
        const multi = new Set(c.ids.map(i => stops[i].id)).size > 1, active = fo && fo.t === 'stop' && c.ids.includes(fo.i), dim = fo && !c.ids.some(stopOn);
        const optional = c.ids.every(i => stops[i].optional);
        html.push(`<button type="button" tabindex="-1" class="map-pin${optional ? ' optional' : ''}${active ? ' active' : ''}${dim ? ' dim' : ''}" ${multi ? `data-map-cluster="${c.ids.join(',')}"` : `data-map-stop="${c.ids[c.ids.length - 1]}"`} style="left:${f(c.x)}px;top:${f(c.y)}px">${c.ids.map(i => stops[i].n).join('·')}</button>`);
      });
      pins.forEach(c => {
        const { title, time } = pinText(c), w = Math.max(textWidth(title, `600 13px ${sans}`), textWidth(time, `500 11px ${sans}`)) + 2, h = time ? 32 : 17;
        const box = place(c.x, c.y, 14, w, h, occupied, v.w, v.h);
        if (box) html.push(`<div class="map-label${fo && !c.ids.some(stopOn) ? ' dim' : ''}" style="left:${f(box.x)}px;top:${f(box.y)}px">${esc(title)}${time ? `<small>${esc(time)}</small>` : ''}</div>`);
      });
      return { svg, html };
    }

    /* Whole trip: hotels, airports and every ride between cities. */
    function drawTrip(v) {
      const svg = [], html = [], occupied = obstacles(v);
      transfers.forEach(({ leg }) => svg.push(drawPieces(v, leg)));
      const pins = [
        ...stays.map(s => ({ ll: s.ll, glyph: 'H', cls: 'home', attr: `data-map-select="city:${s.city.id}"`, title: `${label(s.city.name)}${sep}${name(s.city.hotel)}`, small: [stayRange(s.city), s.place?.nights ? tx(`${s.place.nights} 晚`, `${s.place.nights} night${s.place.nights > 1 ? 's' : ''}`) : ''].filter(Boolean).join(sep) })),
        ...airportsUsed.map(s => ({ ll: s.ll, glyph: '✈', cls: 'air', attr: `data-map-select="${s.date}"`, title: label(routes.airports[s.id].name), small: `${shortDate(s.date)} ${s.time || ''}`.trim() }))
      ].map(m => ({ ...m, xy: v.p(m.ll) }));
      pins.forEach(m => occupied.push({ x: m.xy[0] - 16, y: m.xy[1] - 16, w: 32, h: 32 }));
      pins.forEach(m => {
        const w = Math.max(textWidth(m.title, `600 13px ${sans}`), textWidth(m.small, `500 11px ${sans}`)) + 2, box = place(m.xy[0], m.xy[1], 15, w, 32, occupied, v.w, v.h);
        if (box) html.push(`<div class="map-label hotel" style="left:${f(box.x)}px;top:${f(box.y)}px">${esc(m.title)}<small>${esc(m.small)}</small></div>`);
      });
      drawRides(v, transfers.map(t => t.leg), { svg, html, occupied, names: true, badgeAttrs: leg => `data-map-transfer="${transfers.find(t => t.leg === leg).day.date}:${leg.i}"` });
      pins.forEach(m => html.push(`<button type="button" tabindex="-1" class="map-pin ${m.cls}" ${m.attr} style="left:${f(m.xy[0])}px;top:${f(m.xy[1])}px">${m.glyph}</button>`));
      return { svg, html };
    }

    /* City overview: distance rings around the hotel and the areas we visit. */
    function drawCity(v) {
      const svg = [], html = [], occupied = obstacles(v), c = overviewCity, base = anchor(c.hotel), h = v.p(base);
      const kmLon = 1 / (111.32 * Math.cos(base[1] * Math.PI / 180));
      const rings = (c.rings || [1, 3, 5]).map(k => {
        const edge = v.p([base[0] + k * kmLon, base[1]]), r = Math.hypot(edge[0] - h[0], edge[1] - h[1]);
        svg.push(`<circle cx="${f(h[0])}" cy="${f(h[1])}" r="${f(r)}" fill="none" stroke="#8a9cab" stroke-width="1.2" stroke-dasharray="4 5" opacity=".75"/>`);
        return { k, r };
      });
      html.push(`<div class="map-pin home" style="left:${f(h[0])}px;top:${f(h[1])}px">H</div>`);
      occupied.push({ x: h[0] - 16, y: h[1] - 16, w: 32, h: 32 });
      const list = areas.filter(a => a.city === c.id);
      list.forEach(a => {
        const [x, y] = v.p(a.ll), on = areaHover === a.id;
        svg.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${on ? 7.5 : 5}" fill="#fcdf86" stroke="#b8962f" stroke-width="1.6"/>`);
        occupied.push({ x: x - 6, y: y - 6, w: 12, h: 12 });
      });
      // areas we visit on more days get first pick of label space; ring labels only go where room is left
      list.slice().sort((a, b) => b.days.length - a.days.length || a.dist - b.dist).forEach(a => {
        const [x, y] = v.p(a.ll), text = label(a.short || a.name), w = textWidth(text, `600 15px ${serif}`) + a.days.length * 24 + 8;
        const box = place(x, y, 6, w, 21, occupied, v.w, v.h, true) || place(x, y, 22, w, 21, occupied, v.w, v.h, true);
        if (box) html.push(`<button type="button" tabindex="-1" class="map-area-label${areaHover && areaHover !== a.id ? ' dim' : ''}" data-map-area="${a.id}" style="left:${f(box.x)}px;top:${f(box.y)}px">${esc(text)}${a.days.map(dayChip).join('')}</button>`);
      });
      rings.forEach(({ k, r }) => {
        const text = `${k} km${k === 1 && v.w > 520 ? tx('・步行約 15 分', ' · about 15 min on foot') : ''}`, w = textWidth(text, `600 11px ${sans}`) + 10;
        // bottom of the ring first, then top, right and left
        for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          const x = h[0] + dx * r, y = h[1] + dy * r, box = { x: x - w / 2, y: y - 9, w, h: 18 };
          if (box.x < 4 || box.y < 4 || box.x + w > v.w - 4 || box.y + 18 > v.h - 4 || hit(box, occupied)) continue;
          occupied.push(box);
          html.push(`<div class="map-ring-label" style="left:${f(x)}px;top:${f(y)}px">${esc(text)}</div>`);
          break;
        }
      });
      return { svg, html };
    }
    function paint() {
      if (!map) return;
      const c = map.getContainer(), w = c.clientWidth, h = c.clientHeight;
      const v = { w, h, zoom: map.getZoom(), p: lonlat => { const q = map.project(lonlat); return [q.x, q.y]; } };
      const { svg, html } = kind === 'trip' ? drawTrip(v) : kind === 'city' ? drawCity(v) : drawDay(v);
      lines.setAttribute('viewBox', `0 0 ${w} ${h}`);
      lines.innerHTML = svg.join('');
      marks.innerHTML = html.join('');
    }

    function legendHTML() {
      if (kind === 'city') return `<span><i class="map-key-ring"></i>${tx(`虛線圓圈：離飯店 ${(overviewCity.rings || []).join('、')} 公里`, `Dashed rings: ${(overviewCity.rings || []).join(', ')} km from the hotel`)}</span><span>${dayChip(datesOf(overviewCity.id)[0])}${tx('色塊：那天會去', 'Colored dates: the days we go')}</span>`;
      const common = `<span><i class="map-node home">H</i>${tx('住宿', 'Hotel')}</span><span><i class="map-key-line"></i>${tx('電車・巴士（顏色＝路線，白點＝上下車站）', 'Train or bus (color = line, white dot = station)')}</span><span><i class="map-key-road"></i>${tx('計程車・接送車', 'Taxi or booked car')}</span>`;
      if (kind === 'trip') return common + `<span><i class="map-node air">✈</i>${tx('機場', 'Airport')}</span>`;
      return common + `<span><i class="map-key-walk"></i>${tx('步行', 'Walk')}</span><span><i class="map-key-optional"></i>${tx('可選', 'Optional')}</span>`;
    }
    function show({ area, leg } = {}) {
      focus = hover = areaHover = null;
      kind = selected === 'trip' ? 'trip' : selected.startsWith('city:') ? 'city' : 'day';
      model = kind === 'day' ? dayModel(selected) : null;
      overviewCity = kind === 'city' ? cityById(selected.slice(5)) : null;
      nav.innerHTML = navHTML();
      fitButton.textContent = kind === 'trip' ? tx('看全程', 'Whole trip') : kind === 'city' ? tx('看全部', 'Show all') : tx('看整天', 'Whole day');
      allButton.textContent = tx('連移動一起看', 'Include the journey');
      allButton.hidden = !(kind === 'day' && model.wider);
      fitGroup.hidden = !map;
      legend.innerHTML = legendHTML();
      renderStory();
      if (!map) return;
      frame(false);
      const a = kind === 'day' && area && areas.find(x => x.id === area);
      if (a) { const lls = model.stops.filter(s => a.places.includes(s.id)).map(s => s.ll); if (lls.length) fitTo(lls, close); }
      if (kind === 'day' && leg != null && model.legs[leg]) { focus = { t: 'leg', i: leg }; syncStory(); fitTo(legPoints(model.legs[leg]), { ...close, animate: false }); }
      paint();
    }
    function select(next, options) {
      selected = savedSelection = next;
      const url = new URL(location.href);
      url.hash = next === 'trip' ? 'map' : 'map/' + (next.startsWith('city:') ? next.slice(5) : next);
      history.replaceState(null, '', url);
      show(options);
    }
    function focusOn(next) {
      focus = next;
      syncStory();
      if (!map) return;
      if (next.t === 'stop') { const s = model.stops[next.i], leg = model.legs[next.i - 1] || model.legs[next.i]; fitTo([s.ll, ...(leg ? legPoints(leg) : [])], close); }
      else if (next.t === 'leg') fitTo(legPoints(model.legs[next.i]), close);
      else if (next.t === 'alt' && model.alts[0]) fitTo(legPoints(model.alts[0]), close);
      paint();
    }

    root.addEventListener('click', event => {
      const t = event.target.closest('[data-map-select],[data-map-fit],[data-map-area],[data-map-transfer],[data-map-cluster],[data-map-stop],[data-map-leg],[data-map-alt]');
      if (!t) return;
      if (t.dataset.mapSelect) select(t.dataset.mapSelect);
      else if (t.dataset.mapFit !== undefined) { focus = null; syncStory(); if (t.dataset.mapFit === 'all') fitTo(model.all, { maxZoom: 13 }); else frame(true); paint(); }
      else if (t.dataset.mapArea) { const a = areas.find(x => x.id === t.dataset.mapArea); if (a) select(a.days[0], { area: a.id }); }
      else if (t.dataset.mapTransfer) { const [date, i] = t.dataset.mapTransfer.split(':'); select(date, { leg: +i }); }
      else if (t.dataset.mapCluster) { focus = null; syncStory(); fitTo(t.dataset.mapCluster.split(',').map(i => model.stops[+i].ll), { padding: { top: 110, right: 110, bottom: 110, left: 110 }, maxZoom: 17 }); }
      else if (t.dataset.mapStop) focusOn({ t: 'stop', i: +t.dataset.mapStop });
      else if (t.dataset.mapLeg) focusOn({ t: 'leg', i: +t.dataset.mapLeg });
      else if (t.dataset.mapAlt !== undefined) focusOn({ t: 'alt' });
    });
    root.addEventListener('mouseover', event => {
      if (kind === 'city') {
        const a = event.target.closest('[data-map-area]')?.dataset.mapArea || null;
        if (a === areaHover) return;
        areaHover = a;
        story.querySelectorAll('[data-map-area]').forEach(b => b.classList.toggle('active', b.dataset.mapArea === a));
        paint();
        return;
      }
      if (kind !== 'day') return;
      const row = event.target.closest('.map-story [data-map-stop], .map-story [data-map-leg], .map-story [data-map-alt]');
      const next = row ? (row.dataset.mapStop ? { t: 'stop', i: +row.dataset.mapStop } : row.dataset.mapLeg ? { t: 'leg', i: +row.dataset.mapLeg } : { t: 'alt' }) : null;
      if (JSON.stringify(next) === JSON.stringify(hover)) return;
      hover = next;
      paint();
    });
    story.addEventListener('mouseleave', () => { if (hover || areaHover) { hover = areaHover = null; story.querySelectorAll('[data-map-area].active').forEach(b => b.classList.remove('active')); paint(); } });
    show();
  }
  window.TripMap = { mount, dispose };
})();
