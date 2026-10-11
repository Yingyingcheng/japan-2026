/* Tokyo geography and itinerary order. No live geolocation or routing service. */
(() => {
  'use strict';
  const points = window.TOKYO_MAP_POINTS;
  const original = window.TRIP;
  const dates = original.days.filter(d => d.city === '東京').map(d => d.date);
  const colors = ['#2878b4', '#bd3963', '#7860a5', '#177c70'];
  const districts = [
    { id: 'aoyama', zh: '青山・外苑前', en: 'Aoyama / Gaienmae', tip: ['四晚都住這裡。往西是表參道，往北是外苑；每天以這裡出發。', 'Our four-night base. Omotesando is west, Gaien is north. Start here each day.'] },
    { id: 'mameya', zh: '表參道・原宿', en: 'Omotesando / Harajuku', tip: ['在飯店西側，咖啡、選物店與建築散步集中在這一帶。', 'West of the hotel: coffee, boutiques and an architecture walk close together.'] },
    { id: 'human-tokyo', zh: '澀谷・宮下公園', en: 'Shibuya / Miyashita Park', tip: ['比原宿更往西南。HUMAN MADE、KITH 一帶可以串成同一段逛街。', 'Farther southwest than Harajuku. HUMAN MADE and KITH belong to one shopping stretch.'] },
    { id: 'shinjuku-cat', zh: '新宿', en: 'Shinjuku', tip: ['在青山西北。御苑與東口百貨是兩個不同的小區，11/21、11/23 都會來。', 'Northwest of Aoyama. The garden and east-exit shops are separate clusters; we visit on Nov 21 and 23.'] },
    { id: 'fuglen-tokyo', zh: '富谷・代代木公園', en: 'Tomigaya / Yoyogi', tip: ['在原宿西側。這裡是 Fuglen 附近的咖啡街區，與澀谷站前不同。', 'West of Harajuku. Fuglen’s coffee neighborhood is distinct from the busy Shibuya station area.'] },
    { id: 'gotokuji', zh: '世田谷・豪德寺', en: 'Setagaya / Gotokuji', tip: ['比澀谷、青山都更往西，是 11/23 特別拉出去的一段行程。', 'Farther west than Shibuya and Aoyama: a deliberate detour on Nov 23.'] },
    { id: 'roppongi-hills', zh: '六本木・西麻布', en: 'Roppongi / Nishi-Azabu', tip: ['在飯店東南。11/23 晚上的燈飾與權八在這個方向。', 'Southeast of the hotel. The Nov 23 illuminations and Gonpachi are in this direction.'] },
    { id: 'teamlab', zh: '麻布台', en: 'Azabudai', tip: ['比六本木更往東。teamLab 和小川咖啡在同一組建築附近。', 'East of Roppongi. teamLab and Ogawa Coffee are close together in the same complex.'] },
    { id: 'ginza', zh: '銀座', en: 'Ginza', tip: ['在青山東側。花山、GLITCH、晚餐壽司與中央通購物都聚在這一區。', 'East of Aoyama. Hanayama, GLITCH, sushi and Chuo-dori shopping share this area.'] },
    { id: 'shinchan', zh: '東京車站', en: 'Tokyo Station', tip: ['在銀座北側。角色商店集中在車站八重洲側地下街，不在新宿站。', 'North of Ginza. The character shops are under the Yaesu side of Tokyo Station, not Shinjuku.'] },
    { id: 'todai', zh: '本鄉・東京大學', en: 'Hongo / University of Tokyo', tip: ['在東京車站更北邊。11/22 的可選站，加入後會先往北再折回麻布台。', 'Farther north than Tokyo Station. This optional Nov 22 stop takes us north before returning to Azabudai.'] }
  ];
  const shortNames = {
    aoyama: ['青山飯店', 'Aoyama hotel'], afuri: ['AFURI', 'AFURI'], 'hm-cafe': ['HUMAN MADE 咖啡', 'HUMAN MADE Café'], ginkgo: ['外苑銀杏', 'Gaien ginkgo'], gyoen: ['新宿御苑', 'Shinjuku Gyoen'], amanohaku: ['天ノ箔', 'Amanohaku'], mameya: ['KOFFEE MAMEYA', 'KOFFEE MAMEYA'], nezu: ['根津美術館', 'Nezu Museum'], 'ippodo-aoyama': ['一保堂 青山', 'Ippodo Aoyama'], 'gentle-monster': ['GENTLE MONSTER', 'GENTLE MONSTER'], 'human-tokyo': ['HUMAN MADE / KITH', 'HUMAN MADE / KITH'], yoroniku: ['よろにく', 'Yoroniku'], hanayama: ['花山烏冬', 'Hanayama Udon'], glitch: ['GLITCH', 'GLITCH'], todai: ['東京大學（可選）', 'University of Tokyo (optional)'], 'ogawa-azabudai': ['OGAWA COFFEE', 'OGAWA COFFEE'], teamlab: ['teamLab', 'teamLab'], shinchan: ['東京車站角色街', 'Tokyo Character Street'], ginza: ['銀座購物', 'Ginza shopping'], 'sushi-yu': ['鮨 由う', 'Sushi Yu'], higuma: ['Higuma Doughnuts', 'Higuma Doughnuts'], gotokuji: ['豪德寺', 'Gotokuji'], 'fuglen-tokyo': ['Fuglen', 'Fuglen'], 'yoyogi-park': ['代代木公園', 'Yoyogi Park'], 'shinjuku-cat': ['3D 貓看板', '3D cat billboard'], 'gelato-pique': ['LUMINE EST', 'LUMINE EST'], 'echire-isetan': ['ÉCHIRÉ 伊勢丹', 'ÉCHIRÉ Isetan'], 'roppongi-hills': ['六本木燈飾', 'Roppongi lights'], gonpachi: ['權八', 'Gonpachi'], 'love-table': ['LOVE & TABLE（口袋清單）', 'LOVE & TABLE (wish list)']
  };
  const dayInsights = [
    ['第一晚，只留在飯店附近', 'Stay close to the hotel on arrival night'],
    ['先往北去御苑，再回青山逛街', 'North to the garden, then back to Aoyama'],
    ['東邊的一天：銀座、麻布台與東京車站', 'An eastern day: Ginza, Azabudai and Tokyo Station'],
    ['先往西看招財貓，再繞回市中心', 'West to the lucky cats, then back across the city']
  ];
  const overviewCopy = [
    '以青山飯店為中心：新宿在西北；表參道、澀谷在西側；銀座、東京車站在東側。豪德寺更往西，東大更往北。',
    'Use Aoyama as your anchor: Shinjuku is northwest; Omotesando and Shibuya are west; Ginza and Tokyo Station are east. Gotokuji is farther west, the university farther north.'
  ];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const latlng = id => [points[id].lat, points[id].lon];
  const coords = id => [points[id].lon,points[id].lat];
  let savedSelection = 'overview';
  let includeOptional = true;
  let showAllConnections = false;
  let activeMap;

  function dispose() {
    if (activeMap) { activeMap.remove(); activeMap = null; }
  }
  function mount(root, { language, trip, initialDate }) {
    dispose();
    const en = language === 'en';
    const tx = (zh, english) => en ? english : zh;
    const label = pair => pair[en ? 1 : 0];
    const places = new Map(trip.places.map(p => [p.id, p]));
    if (dates.includes(initialDate)) savedSelection = initialDate;
    let selected = dates.includes(savedSelection) ? savedSelection : 'overview';
    let selectedNumber = 1;
    let currentStops = [];
    let fitBounds;
    let pinVisits = new Map();
    const routeColor = '#3478df';
    const areaNames = {
      aoyama: ['青山', 'Aoyama'], mameya: ['表參道', 'Omotesando'],
      'human-tokyo': ['澀谷', 'Shibuya'], 'shinjuku-cat': ['新宿', 'Shinjuku'],
      'fuglen-tokyo': ['代代木', 'Yoyogi'], gotokuji: ['豪德寺', 'Gotokuji'],
      'roppongi-hills': ['六本木', 'Roppongi'], teamlab: ['麻布台', 'Azabudai'],
      ginza: ['銀座', 'Ginza'], shinchan: ['東京車站', 'Tokyo Station'], todai: ['本鄉・東大', 'Hongo / Todai']
    };
    const mainAreas = new Set(['mameya','human-tokyo','shinjuku-cat','gotokuji','roppongi-hills','ginza','shinchan','todai']);
    root.innerHTML = `${new URLSearchParams(location.search).has('preview') ? `<div class="map-preview-note">${tx('預覽版 · 確認後再發布', 'Preview · review before publishing')}</div>` : ''}
      <div class="tokyo-map-heading"><div><div class="eyebrow">OUR TOKYO, ON THE MAP</div><h1>${tx('東京，在地圖上看。', 'Our Tokyo, on the map.')}</h1><p>${tx('先認識街區，再選一天。點編號，一次看一段。', 'Get to know the neighborhoods, then pick a day. Tap a number to see one leg at a time.')}</p></div><a class="button secondary compact" href="#plan">${tx('回每日行程', 'Back to the itinerary')}</a></div>
      <div class="map-day-tabs" role="group" aria-label="${tx('選擇東京地圖', 'Choose a Tokyo map')}"><button data-map-day="overview">${tx('認識東京', 'Tokyo overview')}</button>${dates.map((date,i) => `<button data-map-day="${date}" style="--day-color:${colors[i]}"><span>11/${date.slice(-2)}</span><small>${label([['抵達日','Arrival'],['御苑・青山','Garden / Aoyama'],['銀座・東側','Ginza / East'],['豪德寺・西側','Gotokuji / West']][i])}</small></button>`).join('')}</div>
      <div class="tokyo-map-layout"><section class="map-canvas-wrap" aria-label="${tx('東京互動地圖', 'Interactive Tokyo map')}"><div class="map-canvas" id="tokyo-map-canvas"></div><div class="map-north" aria-hidden="true">↑ N</div><button class="map-fit" type="button">${tx('看完整範圍', 'Fit this view')}</button><label class="map-connections-control" hidden><input type="checkbox" data-map-connections ${showAllConnections?'checked':''}>${tx('顯示全日連線', 'Show all connections')}</label><div class="map-focus-card" hidden></div><p class="map-network-status" role="status" hidden></p></section><aside class="map-story" aria-live="polite"></aside></div>
      <div class="map-legend"><span><i class="map-home-key">H</i>${tx('青山飯店', 'Aoyama hotel')}</span><span><i class="map-order-key">1</i>${tx('當天站點', 'Day’s stops')}</span><span class="map-line-legend" hidden><i class="map-route-key"></i>${tx('行程順序示意・實際路線看 Google Maps', 'Visit order · use Google Maps for the actual route')}</span></div>
      <details class="map-footnote"><summary>${tx('地圖資料與使用說明', 'Map information')}</summary><p>${tx('標記依公開地址，代表地點附近；公園、地下街與建築入口請以導航為準。連線只表示行程順序，不是地鐵或步行路線。底圖需要網路。', 'Markers use public address representative points; navigate to the actual park, underground or building entrance. Lines show visit order, not rail or walking paths. The basemap needs internet.')} <a href="https://maps.gsi.go.jp/" target="_blank" rel="noopener">${tx('座標：国土地理院', 'Coordinates: GSI Japan')}</a></p></details>`;
    const story = root.querySelector('.map-story');
    const status = root.querySelector('.map-network-status');
    const focusCard = root.querySelector('.map-focus-card');
    if (!window.maplibregl) {
      root.querySelector('.map-canvas').innerHTML = `<div class="map-load-error">${tx('地圖元件未載入，請重新整理。', 'The map could not load. Please reload.')}</div>`; return;
    }
    let map;
    try {
      map=activeMap=new maplibregl.Map({container:root.querySelector('.map-canvas'),style:new URL('assets/tokyo-map-style.json',location.href).href,center:coords('aoyama'),zoom:12,minZoom:8,maxZoom:18,attributionControl:false,dragRotate:false,pitchWithRotate:false,touchPitch:false});
    } catch {
      root.querySelector('.map-canvas').innerHTML=`<div class="map-load-error">${tx('此裝置無法顯示互動底圖，仍可使用站點清單與 Google Maps。', 'This device cannot display the interactive map. Use the stop list and Google Maps.')}</div>`; return;
    }
    map.scrollZoom.disable();map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
    map.addControl(new maplibregl.ScaleControl({unit:'metric',maxWidth:90}),'bottom-left');
    map.addControl(new maplibregl.AttributionControl({compact:true}),'bottom-right');
    map.on('error',()=>{status.hidden=false;status.textContent=tx('底圖載入不完整，請檢查網路。站點清單仍可使用。','The basemap is incomplete. Check your connection; the stop list is still available.');});
    let drawnMarkers=[];
    const markers=new Map();
    let arrow;
    let focusedLeg=null;
    let popup;
    function element(className,html,click,aria) {
      const el=document.createElement(click?'button':'div');
      el.className=className;el.innerHTML=html;
      if(click){el.type='button';el.addEventListener('click',click);el.setAttribute('aria-label',aria);el.title=aria;}
      return el;
    }
    function marker(id,el,retain=true) {
      const m=new maplibregl.Marker({element:el}).setLngLat(coords(id)).addTo(map);
      if(retain)drawnMarkers.push(m);
      return m;
    }
    const homeHTML=`<span>H</span><small class="map-home-tag">${tx('青山 · 我們住這裡','Aoyama · our hotel')}</small>`;
    const home=marker('aoyama',element('map-home-marker',homeHTML,()=>{
      if(selected==='overview')renderOverviewStory('aoyama');
      if(popup)popup.remove();
      popup=new maplibregl.Popup({offset:24,maxWidth:'290px'}).setLngLat(coords('aoyama')).setHTML(`<div class="map-popup"><strong>${esc(places.get('aoyama').name)}</strong><p>11/20–24 · ${tx('四晚基地','Our four-night base')}</p><p lang="ja">${esc(places.get('aoyama').address)}</p></div>`).addTo(map);
    },tx('青山飯店基地','Aoyama hotel base')),false);
    function distance(a,b){return new maplibregl.LngLat(...coords(a)).distanceTo(new maplibregl.LngLat(...coords(b)));}
    function bounds(ids){return ids.reduce((box,id)=>box.extend(coords(id)),new maplibregl.LngLatBounds());}
    function updateLines() {
      if(!map.getSource('trip-connections'))return;
      const features=[];
      function add(a,b,role){if(a.id===b.id)return;features.push({type:'Feature',properties:{role,optional:!!(a.optional||b.optional)},geometry:{type:'LineString',coordinates:[coords(a.id),coords(b.id)]}});}
      if(selected!=='overview'){
        if(showAllConnections)for(let i=1;i<currentStops.length;i++)add(currentStops[i-1],currentStops[i],'all');
        if(focusedLeg)add(focusedLeg[0],focusedLeg[1],'focus');
      }
      map.getSource('trip-connections').setData({type:'FeatureCollection',features});
    }
    map.on('load',()=>{
      status.hidden=true;
      map.addSource('trip-connections',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:'trip-all',type:'line',source:'trip-connections',filter:['==',['get','role'],'all'],paint:{'line-color':routeColor,'line-width':2,'line-opacity':.25}});
      map.addLayer({id:'trip-focus-halo',type:'line',source:'trip-connections',filter:['==',['get','role'],'focus'],layout:{'line-cap':'round'},paint:{'line-color':'#fff','line-width':7,'line-opacity':.95}});
      map.addLayer({id:'trip-focus',type:'line',source:'trip-connections',filter:['==',['get','role'],'focus'],layout:{'line-cap':'round'},paint:{'line-color':routeColor,'line-width':4,'line-opacity':.95}});
      updateLines();
    });
    function name(id) { return shortNames[id] ? label(shortNames[id]) : places.get(id)?.name || id; }
    function fit(animate=true) {
      if(!fitBounds)return;
      map.fitBounds(fitBounds,{padding:{top:75,right:55,bottom:selected==='overview'?65:145,left:55},maxZoom:selected==='overview'?12.5:14,duration:animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches?250:0});
    }
    function renderOverviewStory(id) {
      story.scrollTop = 0;
      const d = districts.find(d => d.id === id);
      story.innerHTML = `<div class="map-story-top"><span class="eyebrow">OUR TOKYO BASE</span><h2>${tx('從青山，記住三個方向。', 'Three directions from Aoyama.')}</h2></div><div class="map-compass-list"><p><b>↖ ${tx('西北', 'Northwest')}</b><span>${tx('新宿・御苑・百貨', 'Shinjuku · garden & shopping')}</span></p><p><b>← ${tx('西側', 'West')}</b><span>${tx('表參道・澀谷，再往西是豪德寺', 'Omotesando · Shibuya, then Gotokuji farther west')}</span></p><p><b>→ ${tx('東側', 'East')}</b><span>${tx('六本木・銀座・東京車站', 'Roppongi · Ginza · Tokyo Station')}</span></p></div>${d ? `<div class="map-selected-area"><strong>${en ? d.en : d.zh}</strong><p>${label(d.tip)}</p></div>` : ''}<details class="map-more-areas" ${d?'open':''}><summary>${tx('各區在哪裡？', 'Where is each neighborhood?')}</summary><div class="map-district-list">${districts.map(d => `<button type="button" data-map-area="${d.id}" class="${d.id===id?'active':''}" aria-pressed="${d.id===id}"><span>${en?d.en:d.zh}</span></button>`).join('')}</div></details><p class="map-story-hint">${tx('選上方日期，看這一天的站點。', 'Choose a date above to see that day’s stops.')}</p>`;
    }
    function buildStops(day) {
      const result = [{ id: 'aoyama', base: true, time: tx('出發', 'Start') }];
      let order = 0;
      const sourceDay = original.days.find(d => d.date === day.date);
      day.items.forEach((item,i) => {
        if (item.place && points[item.place] && (includeOptional || !item.optional)) {
          if (item.place !== 'aoyama') result.push({ ...item, id: item.place, number: ++order });
        } else if (sourceDay.items[i].title?.includes('回飯店')) {
          result.push({ id: 'aoyama', base: true, time: item.time, detail: item.detail });
        }
      });
      return result;
    }
    function drawConnections(){updateLines();}
    function addStopMarkers(stops) {
      pinVisits=new Map();
      stops.filter(s=>!s.base).forEach(s=>{const list=pinVisits.get(s.id)||[];list.push(s);pinVisits.set(s.id,list);});
      pinVisits.forEach((visits,id)=>{
        const nums=visits.map(s=>s.number).join('/');
        const el=element('map-stop-marker','',()=>highlightStop(visits.find(s=>s.number>selectedNumber)?.number||visits[0].number),`${nums} ${name(id)}`);
        markers.set(id,marker(id,el));
      });
    }
    function layoutPins() {
      if(selected==='overview')return;
      const h=map.project(coords('aoyama'));
      const occupied=[{x:h.x,y:h.y,w:38,h:54}];
      const candidates=[[0,0],[0,-34],[34,0],[-34,0],[0,34],[34,-34],[-34,-34],[34,34],[-34,34],[0,-64],[64,0],[-64,0],[0,64]];
      pinVisits.forEach((visits,id)=>{
        const p=map.project(coords(id));
        const nums=visits.map(s=>s.number).join('/');
        const width=nums.length>2?40:30;
        const collision=(dx,dy)=>occupied.some(r=>Math.abs(p.x+dx-r.x)<(width+r.w)/2+4&&Math.abs(p.y+dy-r.y)<(30+r.h)/2+4);
        const [dx,dy]=candidates.find(([dx,dy])=>!collision(dx,dy))||[0,0];
        occupied.push({x:p.x+dx,y:p.y+dy,w:width,h:30});
        const leader=Math.hypot(dx,dy),active=visits.some(s=>s.number===selectedNumber);
        const marker=markers.get(id);
        const el=marker.getElement();
        el.classList.toggle('map-stop-active',active);
        el.innerHTML=`${leader?`<i class="map-stop-dot"></i><i class="map-pin-leader" style="width:${leader}px;transform:rotate(${Math.atan2(dy,dx)*180/Math.PI}deg)"></i>`:''}<span class="${visits[0].optional?'optional':''}" style="left:${dx-(width-30)/2}px;top:${dy}px;width:${width}px">${nums}</span>`;

      });
    }
    function highlightStop(number) {
      const index=currentStops.findIndex(s=>s.number===number);
      if(index<0)return;
      selectedNumber=number;
      const stop=currentStops[index],previous=currentStops[index-1];
      focusedLeg=[previous,stop];updateLines();
      if(arrow)arrow.remove();
      if(previous.id!==stop.id){
        const p1=map.project(coords(previous.id)),p2=map.project(coords(stop.id));
        const mid=map.unproject([(p1.x+p2.x)/2,(p1.y+p2.y)/2]);
        const el=element('map-arrow-marker',`<span style="background:${routeColor};transform:rotate(${Math.atan2(p2.y-p1.y,p2.x-p1.x)*180/Math.PI}deg)"></span>`);
        el.setAttribute('aria-hidden','true');
        arrow=new maplibregl.Marker({element:el}).setLngLat(mid).addTo(map);
      }
      const total=currentStops.filter(s=>!s.base).length;
      const origin=previous.base?tx('青山飯店', 'Aoyama hotel'):name(previous.id);
      const direction=new URL('https://www.google.com/maps/dir/');
      direction.searchParams.set('api','1');
      direction.searchParams.set('origin',latlng(previous.id).join(','));
      direction.searchParams.set('destination',latlng(stop.id).join(','));
      direction.searchParams.set('travelmode',distance(previous.id,stop.id)<1000?'walking':'transit');
      focusCard.hidden=false;
      focusCard.innerHTML=`<div class="map-focus-text"><small>${esc(stop.time||'')} · ${number} / ${total}</small><strong>${esc(name(stop.id))}</strong><span>${esc(origin)} → ${tx('這一站', 'this stop')}</span></div><div class="map-focus-actions"><div><button type="button" data-map-step="-1" aria-label="${tx('上一站', 'Previous stop')}" ${number===1?'disabled':''}>‹</button><button type="button" data-map-step="1" aria-label="${tx('下一站', 'Next stop')}" ${number===total?'disabled':''}>›</button></div><a href="${esc(direction.href)}" target="_blank" rel="noopener noreferrer">Google Maps ↗</a></div>`;
      story.querySelectorAll('[data-map-stop]').forEach(b=>{const active=Number(b.dataset.mapStop)===number;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
      layoutPins();
    }
    function renderDayStory(day,stops,index) {
      story.scrollTop=0;
      story.innerHTML=`<div class="map-story-top"><span class="eyebrow">11/${day.date.slice(-2)} · ${tx('當天站點', 'DAY’S STOPS')}</span><h2>${label(dayInsights[index])}</h2>${index===0?`<p>${tx('成田機場 → 已訂接送車 → 青山飯店。地圖顯示晚餐附近。', 'Narita → booked private car → Aoyama hotel. The map shows the dinner area.')}</p>`:''}<p>${tx('點選一站，只突出前一站到這裡。', 'Pick a stop to highlight just the leg leading to it.')}</p>${index===2?`<label class="map-optional-control"><input type="checkbox" data-map-optional ${includeOptional?'checked':''}>${tx('包含東大可選站', 'Include the optional university stop')}</label>`:''}</div><ol class="map-stop-list"><li class="map-base-row"><span class="map-base-dot">H</span><span>${tx('青山飯店・出發', 'Aoyama hotel · start')}</span></li>${stops.slice(1).map(s=>s.base?`<li class="map-base-row"><span class="map-base-dot">H</span><span>${esc(s.time)} · ${tx('回飯店休息', 'Back to the hotel')}</span></li>`:`<li><button type="button" data-map-stop="${s.number}" aria-pressed="false"><span class="map-list-number ${s.optional?'optional':''}">${s.number}</span><span><small>${esc(s.time)}${s.optional?' · '+tx('可選','optional'):''}</small><strong>${esc(name(s.id))}</strong></span></button></li>`).join('')}</ol><a class="text-button map-to-plan" href="#plan/${day.date}">${tx('看這天的完整行程', 'See the full day’s itinerary')} →</a>`;
    }
    function drawContextAreas(index) {
      const sets=[[],['shinjuku-cat','mameya','human-tokyo'],['ginza','teamlab','shinchan',...(includeOptional?['todai']:[])],['gotokuji','fuglen-tokyo','shinjuku-cat','roppongi-hills']];
      const offsets={'shinjuku-cat':[0,-35],mameya:[-60,-25],'human-tokyo':[-45,25],ginza:[-50,35],teamlab:[-65,-20],shinchan:[0,-40],todai:[-60,0],gotokuji:[0,-38],'fuglen-tokyo':[-50,-10],'roppongi-hills':[0,-35]};
      sets[index].forEach(id=>{
        const [dx,dy]=offsets[id];
        marker(id,element('map-context-area',`<span style="transform:translate(${dx}px,${dy}px)">${esc(label(areaNames[id]))}</span>`));
      });
    }
    function addArea(d) {
      const offset=d.id==='mameya'?[0,-42]:d.id==='human-tokyo'?[-30,8]:d.id==='roppongi-hills'?[40,0]:[0,-22];
      const el=element('map-overview-point',`<i></i><span style="left:${offset[0]}px;top:${offset[1]}px">${esc(label(areaNames[d.id]))}</span>`,()=>renderOverviewStory(d.id),en?d.en:d.zh);
      markers.set(d.id,marker(d.id,el));
    }
    function drawOverview() {
      currentStops=[];
      districts.filter(d=>mainAreas.has(d.id)).forEach(d=>addArea(d));
      fitBounds=bounds(districts.map(d=>d.id));
      renderOverviewStory(null);
    }
    function draw() {
      drawnMarkers.forEach(m=>m.remove());drawnMarkers=[];markers.clear();focusedLeg=null;if(arrow){arrow.remove();arrow=null;}if(popup)popup.remove();
      focusCard.hidden=true;
      root.querySelector('.map-connections-control').hidden=selected==='overview';
      root.querySelector('.map-line-legend').hidden=selected==='overview';
      root.querySelectorAll('[data-map-day]').forEach(b=>{const active=b.dataset.mapDay===selected;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
      if(selected==='overview')drawOverview();
      else {
        const index=dates.indexOf(selected),day=trip.days.find(d=>d.date===selected);
        currentStops=buildStops(day);
        drawContextAreas(index);
        addStopMarkers(currentStops);
        fitBounds=bounds(currentStops.map(s=>s.id));
        renderDayStory(day,currentStops,index);
        drawConnections();
      }
      map.resize();fit(false);
      if(selected!=='overview')highlightStop(Math.min(selectedNumber,currentStops.filter(s=>!s.base).length));else updateLines();
    }
    map.on('moveend',layoutPins);
    map.on('resize',()=>{fit(false);layoutPins();});
    root.addEventListener('click',event=>{
      const day=event.target.closest('[data-map-day]');
      if(day){selected=savedSelection=day.dataset.mapDay;selectedNumber=1;const url=new URL(location.href);url.hash=selected==='overview'?'map':'map/'+selected;history.replaceState(null,'',url);draw();return;}
      const area=event.target.closest('[data-map-area]');
      if(area){const id=area.dataset.mapArea;renderOverviewStory(id);if(id!=='aoyama'&&!markers.has(id))addArea(districts.find(d=>d.id===id));map.easeTo({center:coords(id),zoom:13,padding:0,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:250});return;}
      const stop=event.target.closest('[data-map-stop]');
      if(stop){highlightStop(Number(stop.dataset.mapStop));return;}
      const step=event.target.closest('[data-map-step]');
      if(step){highlightStop(selectedNumber+Number(step.dataset.mapStep));return;}
      if(event.target.closest('.map-fit'))fit();
    });
    root.addEventListener('change',event=>{
      if(event.target.matches('[data-map-optional]')){includeOptional=event.target.checked;selectedNumber=1;draw();}
      if(event.target.matches('[data-map-connections]')){showAllConnections=event.target.checked;drawConnections();}
    });
    draw();
  }
  window.TokyoTripMap = { mount, dispose };
})();
