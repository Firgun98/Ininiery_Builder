const DESTINATIONS = [
  { id: 'leh', name: 'Leh', lat: 34.1526, lng: 77.5771, desc: 'Cultural capital and acclimatization hub.' },
  { id: 'nubra', name: 'Nubra Valley', lat: 34.6166, lng: 77.5559, desc: 'High desert valley with dunes and monasteries.' },
  { id: 'pangong', name: 'Pangong Lake', lat: 33.7427, lng: 78.9629, desc: 'Iconic alpine lake with changing blue shades.' },
  { id: 'tso-moriri', name: 'Tso Moriri', lat: 32.9706, lng: 78.3184, desc: 'Remote high-altitude freshwater lake.' },
  { id: 'kargil', name: 'Kargil', lat: 34.5594, lng: 76.1258, desc: 'Western Ladakh gateway and heritage corridor.' },
  { id: 'sham', name: 'Sham Valley', lat: 34.2806, lng: 76.8322, desc: 'Apricot villages and easy scenic drives.' },
  { id: 'zanskar', name: 'Zanskar', lat: 33.4944, lng: 76.9876, desc: 'Rugged alpine valleys and dramatic gorges.' },
  { id: 'hanle', name: 'Hanle', lat: 32.7783, lng: 78.9646, desc: 'Dark-sky reserve and observatory destination.' },
  { id: 'lamayuru', name: 'Lamayuru', lat: 34.2819, lng: 76.7682, desc: 'Moonland terrain and ancient gompa.' },
  { id: 'alchi', name: 'Alchi', lat: 34.2274, lng: 77.1711, desc: 'Historic monastery circuit along Indus.' },
  { id: 'hemis', name: 'Hemis', lat: 33.9872, lng: 77.6010, desc: 'Monastery valley with riverside villages.' },
  { id: 'turtuk', name: 'Turtuk', lat: 34.8399, lng: 76.8318, desc: 'Baltic heritage village near Shyok.' }
];

const VILLAGES = [
  ['Choglamsar','leh',34.10,77.61],['Stok','leh',34.05,77.55],['Shey','leh',34.07,77.67],['Thiksey','leh',34.06,77.66],
  ['Diskit','nubra',34.57,77.53],['Hunder','nubra',34.60,77.48],['Sumur','nubra',34.63,77.58],['Panamik','nubra',34.66,77.60],
  ['Tangtse','pangong',33.95,78.41],['Spangmik','pangong',33.86,78.93],['Man','pangong',33.79,78.95],['Merak','pangong',33.72,78.98],
  ['Korzok','tso-moriri',32.97,78.26],['Karzok Phu','tso-moriri',32.99,78.29],['Nyoma','tso-moriri',33.21,78.58],['Mahe','tso-moriri',33.40,78.45],
  ['Drass','kargil',34.43,75.76],['Sankoo','kargil',34.22,76.13],['Mulbekh','kargil',34.26,76.51],['Batalik','kargil',34.67,76.34],
  ['Likir','sham',34.14,76.98],['Basgo','sham',34.26,76.88],['Nimmu','sham',34.25,77.33],['Uleytokpo','sham',34.29,76.95],
  ['Padum','zanskar',33.47,76.89],['Purne','zanskar',33.23,76.76],['Stongde','zanskar',33.60,76.99],['Rangdum','zanskar',34.07,76.22],
  ['Hanle Village','hanle',32.78,78.96],['Loma','hanle',32.87,78.63],['Ukdungle','hanle',32.74,79.10],['Nurpa','hanle',32.69,78.84],
  ['Wanla','lamayuru',34.20,76.74],['Skurbuchan','lamayuru',34.33,76.73],['Saspol','alchi',34.25,77.20],['Domkhar','alchi',34.24,77.09],
  ['Martselang','hemis',33.97,77.73],['Chemrey','hemis',33.98,77.74],['Tyakshi','turtuk',34.87,76.90],['Thang','turtuk',34.92,76.95]
].map(([name,destinationId,lat,lng],i)=>({id:`v${i+1}`,name,destinationId,lat,lng}));

function makeMedia(seed){ return `https://picsum.photos/seed/${seed}/400/300`; }

const HOMESTAYS = VILLAGES.slice(0,34).map((v, i) => ({
  id: `h${i+1}`,
  villageId: v.id,
  destinationId: v.destinationId,
  name: `${v.name} Mountain Homestay`,
  host: `Host ${String.fromCharCode(65 + (i % 26))} Dolma`,
  contact: `+91-99${(10000000+i).toString().slice(-8)}`,
  shortDesc: 'Family-run stay with local meals and warm rooms.',
  lat: v.lat + 0.01,
  lng: v.lng + 0.01,
  photo: makeMedia(`homestay-${i+1}`)
}));

const EXPERIENCES = VILLAGES.slice(4,40).map((v, i) => ({
  id: `e${i+1}`,
  villageId: v.id,
  destinationId: v.destinationId,
  name: `${v.name} Local Experience`,
  durationHrs: 2 + (i % 4),
  contact: `+91-88${(12000000+i).toString().slice(-8)}`,
  shortDesc: 'Guided cultural and nature activity with local experts.',
  lat: v.lat - 0.008,
  lng: v.lng - 0.008,
  photo: makeMedia(`exp-${i+1}`)
}));

const state = {
  itineraryDays: [],
  selectedDestinationId: null,
  selectedVillageId: null,
  usedIds: new Set(),
  markers: [],
  recommendationMarkers: [],
  generatedDraft: null
};

const els = {
  tripStart: document.getElementById('tripStart'),
  startDate: document.getElementById('startDate'),
  tripNights: document.getElementById('tripNights'),
  kmPerDay: document.getElementById('kmPerDay'),
  buildDaysBtn: document.getElementById('buildDaysBtn'),
  destinationSelect: document.getElementById('destinationSelect'),
  villageSelect: document.getElementById('villageSelect'),
  homestaySelect: document.getElementById('homestaySelect'),
  experienceSelect: document.getElementById('experienceSelect'),
  addDestinationBtn: document.getElementById('addDestinationBtn'),
  addVillageBtn: document.getElementById('addVillageBtn'),
  addHomestayBtn: document.getElementById('addHomestayBtn'),
  addExperienceBtn: document.getElementById('addExperienceBtn'),
  itinerary: document.getElementById('itinerary'),
  suggestBtn: document.getElementById('suggestBtn'),
  suggestions: document.getElementById('suggestions'),
  centerModal: document.getElementById('centerModal'),
  modalTitle: document.getElementById('modalTitle'),
  modalBody: document.getElementById('modalBody'),
  modalCancel: document.getElementById('modalCancel'),
  modalConfirm: document.getElementById('modalConfirm'),
  promptInput: document.getElementById('promptInput'),
  generatePromptBtn: document.getElementById('generatePromptBtn'),
  promptPreview: document.getElementById('promptPreview'),
  applyPromptBtn: document.getElementById('applyPromptBtn')
};

const map = L.map('map', { zoomControl: true, minZoom: 7, maxZoom: 12 });
const ladakhBounds = L.latLngBounds([32.0, 75.2], [35.9, 79.9]);
map.fitBounds(ladakhBounds);
map.setMaxBounds(ladakhBounds);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM contributors' }).addTo(map);

function haversineKm(a, b) {
  const r = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const q = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;
  return 2*r*Math.asin(Math.sqrt(q));
}
function driveTimeHours(km){ return km / 32; }
function bearing(a,b){
  const y = Math.sin((b.lng-a.lng)*Math.PI/180)*Math.cos(b.lat*Math.PI/180);
  const x = Math.cos(a.lat*Math.PI/180)*Math.sin(b.lat*Math.PI/180)-Math.sin(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.cos((b.lng-a.lng)*Math.PI/180);
  return (Math.atan2(y,x)*180/Math.PI+360)%360;
}
function normalizeAngle(diff){ return Math.min(diff, 360-diff); }

function getAllByType(type){
  if (type==='destination') return DESTINATIONS;
  if (type==='village') return VILLAGES;
  if (type==='homestay') return HOMESTAYS;
  return EXPERIENCES;
}
function addOptions(select, items, placeholder='Select...'){
  select.innerHTML = `<option value="">${placeholder}</option>` + items.map(i=>`<option value="${i.id}">${i.name}</option>`).join('');
}
function getStartCoordForDay(dayIdx){
  if (dayIdx===0) {
    const start = DESTINATIONS.find(d=>d.id===els.tripStart.value) || DESTINATIONS[0];
    return {lat:start.lat,lng:start.lng,name:start.name};
  }
  const prev = state.itineraryDays[dayIdx-1].items.at(-1);
  if (prev) return prev;
  return getStartCoordForDay(dayIdx-1);
}

function recalcDayStats(day){
  const start = getStartCoordForDay(day.dayIndex);
  let totalKm=0;
  let last = start;
  day.items.forEach(item=>{ const km = haversineKm(last, item); totalKm += km; last = item;});
  day.totalKm = Math.round(totalKm);
  day.totalHours = +(driveTimeHours(totalKm)).toFixed(1);
}

function renderItinerary(){
  els.itinerary.innerHTML = '';
  state.itineraryDays.forEach(day=>{
    recalcDayStats(day);
    const limit = Number(els.kmPerDay.value || 120);
    const warn = day.totalKm > limit ? `<div class="warning">⚠ Exceeds ${limit} km/day</div>` : '';
    const col = document.createElement('div');
    col.className='day-column';
    col.innerHTML = `<h3>Day ${day.dayIndex+1} ${day.date ? `• ${day.date}`:''}</h3>
    <div class="day-stats">${day.totalKm} km • ${day.totalHours} h ${warn}</div>
    <div class="dropzone" data-day="${day.dayIndex}"></div>`;
    const zone = col.querySelector('.dropzone');
    zone.addEventListener('dragover', e=>e.preventDefault());
    zone.addEventListener('drop', e=>{
      e.preventDefault();
      const payload = JSON.parse(e.dataTransfer.getData('text/plain'));
      moveItem(payload.fromDay, payload.itemId, day.dayIndex);
    });
    day.items.forEach(item=>{
      const div = document.createElement('div');
      div.className='plan-item';
      div.draggable = true;
      div.dataset.itemId = item.uid;
      div.innerHTML = `<strong>${item.name}</strong><small>${item.type} • ${item.meta || ''}</small>`;
      div.addEventListener('dragstart', e=> e.dataTransfer.setData('text/plain', JSON.stringify({fromDay: day.dayIndex, itemId:item.uid})));
      zone.appendChild(div);
    });
    els.itinerary.appendChild(col);
  });
  refreshMapPins();
}

function moveItem(fromDay, uid, toDay){
  if (fromDay===toDay) return;
  const src = state.itineraryDays[fromDay];
  const idx = src.items.findIndex(i=>i.uid===uid);
  if (idx<0) return;
  const [item] = src.items.splice(idx,1);
  if (!canInsertOnDay(item, toDay, true)) { src.items.splice(idx,0,item); alert('Constraint conflict for destination direction / homestay rule'); return; }
  state.itineraryDays[toDay].items.push(item);
  renderItinerary();
}

function canInsertOnDay(item, dayIdx, moving=false){
  const day = state.itineraryDays[dayIdx];
  if (item.type === 'homestay' && day.items.some(i=>i.type==='homestay')) return false;
  const base = getStartCoordForDay(dayIdx);
  const bearings = day.items.filter(i=>i.type==='destination'||i.type==='village').map(i=>bearing(base,i));
  if (['destination','village'].includes(item.type) && bearings.length){
    const ref = bearings.reduce((a,b)=>a+b,0)/bearings.length;
    const diff = normalizeAngle(Math.abs(ref - bearing(base,item)));
    if (diff > 110) return false;
  }
  return true;
}

function addPlanItem(raw, type, dayIndex=0, bookingMeta=''){
  if (state.usedIds.has(raw.id) && !['homestay','experience'].includes(type)) return;
  const item = { ...raw, type, uid: `${type}-${raw.id}-${Date.now()}-${Math.random()}`, meta: bookingMeta };
  if (!canInsertOnDay(item, dayIndex)) { alert('Cannot add due to smart constraints on same day.'); return; }
  state.itineraryDays[dayIndex].items.push(item);
  state.usedIds.add(raw.id);
  renderLinkedSelection();
  renderItinerary();
}

function renderLinkedSelection(){
  const destAvailable = DESTINATIONS.filter(d=>!state.usedIds.has(d.id));
  addOptions(els.destinationSelect, destAvailable, 'Select Destination');
  const destId = els.destinationSelect.value || state.selectedDestinationId;
  if (!destId) {
    addOptions(els.villageSelect, [], 'Select Village');
    addOptions(els.homestaySelect, [], 'Select Homestay');
    addOptions(els.experienceSelect, [], 'Select Experience');
    els.villageSelect.disabled = els.addVillageBtn.disabled = true;
    els.homestaySelect.disabled = els.addHomestayBtn.disabled = true;
    els.experienceSelect.disabled = els.addExperienceBtn.disabled = true;
    return;
  }
  const villages = VILLAGES.filter(v=>v.destinationId===destId && !state.usedIds.has(v.id));
  addOptions(els.villageSelect, villages, 'Select Village');
  els.villageSelect.disabled = els.addVillageBtn.disabled = false;

  const villageId = els.villageSelect.value || state.selectedVillageId;
  if (!villageId) {
    addOptions(els.homestaySelect, [], 'Select Homestay');
    addOptions(els.experienceSelect, [], 'Select Experience');
    els.homestaySelect.disabled = els.addHomestayBtn.disabled = true;
    els.experienceSelect.disabled = els.addExperienceBtn.disabled = true;
    return;
  }
  addOptions(els.homestaySelect, HOMESTAYS.filter(h=>h.villageId===villageId && !state.usedIds.has(h.id)), 'Select Homestay');
  addOptions(els.experienceSelect, EXPERIENCES.filter(x=>x.villageId===villageId && !state.usedIds.has(x.id)), 'Select Experience');
  els.homestaySelect.disabled = els.addHomestayBtn.disabled = false;
  els.experienceSelect.disabled = els.addExperienceBtn.disabled = false;
}

function refreshMapPins(){
  state.markers.forEach(m=>m.remove());
  state.markers = [];
  state.itineraryDays.flatMap(d=>d.items).forEach(item=>{
    const marker = L.marker([item.lat, item.lng]).addTo(map).bindPopup(`<strong>${item.name}</strong><br>${item.type}`);
    state.markers.push(marker);
  });
}

function clearSuggestionPins(){ state.recommendationMarkers.forEach(m=>m.remove()); state.recommendationMarkers=[]; }

function smartSuggest(){
  clearSuggestionPins();
  els.suggestions.innerHTML='';
  const limit = Number(els.kmPerDay.value || 120);
  state.itineraryDays.forEach(day=>{
    const start = getStartCoordForDay(day.dayIndex);
    const options = DESTINATIONS
      .filter(d=>!state.usedIds.has(d.id))
      .map(d=>({d,km:haversineKm(start,d)}))
      .filter(x=>x.km<=limit)
      .sort((a,b)=>a.km-b.km)
      .slice(0,4);
    if (!options.length) return;
    const section = document.createElement('div');
    section.className='suggestion';
    section.innerHTML = `<strong>Day ${day.dayIndex+1} suggestions from ${start.name || 'last stop'}:</strong>`;
    options.forEach(({d,km})=>{
      const hrs = driveTimeHours(km).toFixed(1);
      const btn = document.createElement('button');
      btn.textContent = `${d.name} • ${km.toFixed(0)} km • ${hrs} h`;
      btn.addEventListener('click', ()=>openDayPickerModal(d, 'destination'));
      section.appendChild(btn);
      const marker = L.circleMarker([d.lat,d.lng],{radius:8,color:'#ef4444'}).addTo(map).bindPopup(`Recommended: ${d.name}`);
      state.recommendationMarkers.push(marker);
    });
    els.suggestions.appendChild(section);
  });
}

function openModal(title, html, onConfirm){
  els.modalTitle.textContent = title;
  els.modalBody.innerHTML = html;
  els.centerModal.classList.remove('hidden');
  els.modalConfirm.onclick = ()=>{ onConfirm(); els.centerModal.classList.add('hidden'); };
}
els.modalCancel.onclick = ()=> els.centerModal.classList.add('hidden');

function openDayPickerModal(raw, type){
  const opts = state.itineraryDays.map(d=>`<option value="${d.dayIndex}">Day ${d.dayIndex+1} ${d.date||''}</option>`).join('');
  openModal(`Add ${raw.name}`, `<label>Choose day <select id="modalDay">${opts}</select></label>`, ()=>{
    const day = Number(document.getElementById('modalDay').value);
    addPlanItem(raw, type, day);
  });
}

function openBookingModal(raw, type){
  const days = state.itineraryDays.map(d=>`<option value="${d.dayIndex}">Day ${d.dayIndex+1}</option>`).join('');
  const isHomestay = type==='homestay';
  const template = isHomestay
    ? `<label>Day<select id="bDay">${days}</select></label>
       <label>Pax<input id="pax" type="number" value="2" min="1"></label>
       <label>Nights<input id="nights" type="number" value="1" min="1"></label>
       <label>Meal Plan<select id="meal"><option>MAP</option><option>AP</option><option>CP</option></select></label>
       <label>Check-in Time<input id="checkin" type="time" value="17:00"></label>
       <p>Host: ${raw.host}<br>Contact: ${raw.contact}<br>Directions: Reach ${raw.name} near ${VILLAGES.find(v=>v.id===raw.villageId)?.name}</p>
       <div class="photo-row"><img src="${raw.photo}" alt="${raw.name}"></div>`
    : `<label>Day<select id="bDay">${days}</select></label>
       <label>Pax<input id="pax" type="number" value="2" min="1"></label>
       <label>Time Slot<input id="slot" type="time" value="10:00"></label>
       <label>Duration (hrs)<input id="duration" type="number" value="${raw.durationHrs}" min="1"></label>
       <p>Contact: ${raw.contact}<br>${raw.shortDesc}</p>
       <div class="photo-row"><img src="${raw.photo}" alt="${raw.name}"></div>`;
  openModal(`Book ${raw.name}`, template, ()=>{
    const dayIdx = Number(document.getElementById('bDay').value);
    const start = getStartCoordForDay(dayIdx);
    const km = haversineKm(start, raw).toFixed(0);
    const drive = driveTimeHours(km).toFixed(1);
    if (isHomestay) {
      const checkin = document.getElementById('checkin');
      if (checkin.value==='17:00') {
        const hour = Math.min(20, 9 + Math.floor(Number(drive)));
        checkin.value = `${String(hour).padStart(2,'0')}:00`;
      }
    }
    const meta = isHomestay
      ? `${document.getElementById('pax').value} pax, ${document.getElementById('nights').value} night(s), ${document.getElementById('meal').value}, check-in ${document.getElementById('checkin').value}, ${km}km/${drive}h`
      : `${document.getElementById('pax').value} pax, slot ${document.getElementById('slot').value}, ${document.getElementById('duration').value}h, ${km}km/${drive}h`;
    addPlanItem(raw, type, dayIdx, meta);
  });
}

function parsePrompt(text){
  const lower = text.toLowerCase();
  const nights = Number((lower.match(/(\d+)\s*n/)||[])[1] || els.tripNights.value);
  const km = Number((lower.match(/(\d+)\s*km\s*\/\s*day/)||[])[1] || els.kmPerDay.value);
  const adults = Number((lower.match(/(\d+)\s*adult/)||[])[1] || 2);
  const mustBlock = (lower.match(/must\s*:\s*([^,]+)/)||[])[1] || '';
  const must = mustBlock.split(/[+&]/).map(s=>s.trim()).filter(Boolean);
  const startName = DESTINATIONS.find(d=> lower.includes(`start ${d.name.toLowerCase()}`) || lower.includes(`start ${d.id}`))?.id || els.tripStart.value;
  const prefersHomestays = lower.includes('prefer homestay');
  return {nights, km, adults, must, startName, prefersHomestays};
}

function generateFromPrompt(){
  const parsed = parsePrompt(els.promptInput.value);
  els.tripNights.value = parsed.nights;
  els.kmPerDay.value = parsed.km;
  els.tripStart.value = parsed.startName;
  buildDays();

  const days = state.itineraryDays.map(d=>({ ...d, items: [] }));
  const used = new Set();
  const mustIds = parsed.must.map(m=>DESTINATIONS.find(d=>d.name.toLowerCase().includes(m) || d.id.includes(m))?.id).filter(Boolean);
  let cursor = DESTINATIONS.find(d=>d.id===parsed.startName);

  days.forEach((day, idx)=>{
    const pool = DESTINATIONS.filter(d=>!used.has(d.id));
    let pick = mustIds.find(id=>!used.has(id));
    if (!pick) {
      const near = pool.map(d=>({d,km:haversineKm(cursor,d)})).filter(x=>x.km<=parsed.km).sort((a,b)=>a.km-b.km);
      pick = near[0]?.d.id || pool[0]?.id;
    }
    if (!pick) return;
    const dest = DESTINATIONS.find(d=>d.id===pick);
    used.add(dest.id);
    day.items.push({ ...dest, type:'destination', uid:`g-${idx}-${dest.id}` });
    const v = VILLAGES.find(x=>x.destinationId===dest.id && !used.has(x.id));
    if (v) { used.add(v.id); day.items.push({ ...v, type:'village', uid:`g-v-${idx}` }); }
    if (parsed.prefersHomestays && v) {
      const h = HOMESTAYS.find(x=>x.villageId===v.id && !used.has(x.id));
      if (h) { used.add(h.id); day.items.push({ ...h, type:'homestay', uid:`g-h-${idx}`, meta:`${parsed.adults} pax, 1 night` }); }
    } else if (v) {
      const e = EXPERIENCES.find(x=>x.villageId===v.id && !used.has(x.id));
      if (e) { used.add(e.id); day.items.push({ ...e, type:'experience', uid:`g-e-${idx}`, meta:`${parsed.adults} pax` }); }
    }
    cursor = day.items.at(-1) || cursor;
  });

  state.generatedDraft = { days, used };
  els.applyPromptBtn.disabled = false;
  els.promptPreview.innerHTML = '<h4>Preview</h4>' + days.map((d,i)=>`<p><strong>Day ${i+1}</strong>: ${d.items.map(x=>x.name).join(' → ') || 'Rest / buffer'}</p>`).join('');
}

function applyGeneratedPlan(){
  if (!state.generatedDraft) return;
  state.itineraryDays = state.generatedDraft.days;
  state.usedIds = state.generatedDraft.used;
  renderLinkedSelection();
  renderItinerary();
}

function buildDays(){
  const nights = Number(els.tripNights.value || 5);
  const startDate = els.startDate.value ? new Date(els.startDate.value) : null;
  state.itineraryDays = Array.from({length:nights}, (_,i)=>{
    const d = startDate ? new Date(startDate.getTime() + i*86400000) : null;
    return { dayIndex:i, date:d?d.toISOString().slice(0,10):'', items:[], totalKm:0,totalHours:0 };
  });
  renderItinerary();
}

function init(){
  addOptions(els.tripStart, DESTINATIONS, 'Start Point');
  els.tripStart.value = 'leh';
  addOptions(els.destinationSelect, DESTINATIONS, 'Select Destination');
  buildDays();
  renderLinkedSelection();

  els.destinationSelect.addEventListener('change', ()=>{ state.selectedDestinationId = els.destinationSelect.value; state.selectedVillageId=null; renderLinkedSelection(); });
  els.villageSelect.addEventListener('change', ()=>{ state.selectedVillageId = els.villageSelect.value; renderLinkedSelection(); });

  els.addDestinationBtn.onclick = ()=>{
    const raw = DESTINATIONS.find(d=>d.id===els.destinationSelect.value);
    if (raw) openDayPickerModal(raw, 'destination');
  };
  els.addVillageBtn.onclick = ()=>{
    const raw = VILLAGES.find(v=>v.id===els.villageSelect.value);
    if (raw) openDayPickerModal(raw, 'village');
  };
  els.addHomestayBtn.onclick = ()=>{
    const raw = HOMESTAYS.find(v=>v.id===els.homestaySelect.value);
    if (raw) openBookingModal(raw, 'homestay');
  };
  els.addExperienceBtn.onclick = ()=>{
    const raw = EXPERIENCES.find(v=>v.id===els.experienceSelect.value);
    if (raw) openBookingModal(raw, 'experience');
  };

  els.buildDaysBtn.onclick = buildDays;
  els.suggestBtn.onclick = smartSuggest;
  els.generatePromptBtn.onclick = generateFromPrompt;
  els.applyPromptBtn.onclick = applyGeneratedPlan;
}

init();
