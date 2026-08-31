/* ================= app state ================= */
var state = {
  tab:'calc', path:'strep', drug:'all', weight:'', wUnit:'kg', age:'', aUnit:'years',
  conc:{}, open:{}, favs:[], est:false, q:'',
  pin:false, pq:null, pscore:{ok:0, n:0}
};
var KEY = 'pdfd-app-v1';
function save(){
  try {
    localStorage.setItem(KEY, JSON.stringify({
      lang:lang, tab:state.tab, path:state.path, drug:state.drug, weight:state.weight,
      wUnit:state.wUnit, age:state.age, aUnit:state.aUnit, favs:state.favs,
      pin:state.pin, pscore:state.pscore
    }));
  } catch (e) {}
}
function restore(){
  var r = null;
  try { r = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  if (!r) return;
  if (r.lang === 'e' || r.lang === 'f') lang = r.lang;
  if (['calc','method','practice','ref','fav'].indexOf(r.tab) >= 0) state.tab = r.tab;
  if (typeof r.pin === 'boolean') state.pin = r.pin;
  if (r.pscore && typeof r.pscore.n === 'number') state.pscore = r.pscore;
  if (r.path && PATHS.filter(function(p){ return p.id === r.path; }).length) state.path = r.path;
  if (typeof r.drug === 'string') state.drug = r.drug;
  ['weight','age'].forEach(function(k){ if (typeof r[k] === 'string') state[k] = r[k]; });
  if (r.wUnit === 'kg' || r.wUnit === 'lb') state.wUnit = r.wUnit;
  if (r.aUnit === 'years' || r.aUnit === 'months') state.aUnit = r.aUnit;
  if (Object.prototype.toString.call(r.favs) === '[object Array]') state.favs = r.favs;
}

function $(s){ return document.querySelector(s); }
function each(sel, fn){ Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
var pathSel, drugSel, wIn, aIn, sIn;

function curPath(){ for (var i=0;i<PATHS.length;i++) if (PATHS[i].id === state.path) return PATHS[i]; }
function kg(){
  var v = parseFloat(state.weight);
  if (!isFinite(v) || v <= 0) return null;
  return state.wUnit === 'lb' ? v / 2.2046 : v;
}
function months(){
  var v = parseFloat(state.age);
  if (!isFinite(v) || v < 0) return null;
  return state.aUnit === 'years' ? v * 12 : v;
}

/* ================= formatting ================= */
function round(v,p){ return Math.round(v * p) / p; }
function dec(s){ return lang === 'f' ? String(s).replace('.', ',') : String(s); }
function fmtMg(v){
  if (v >= 100) return dec(Math.round(v));
  if (v >= 1)   return dec(round(v,10));
  return dec(round(v,100));
}
function fmtMl(v){
  if (v >= 20) return dec(round(v,2));
  if (v >= 1)  return dec(round(v,10));
  return dec(round(v,100));
}
function range(lo,hi,f){ return (Math.abs(lo-hi) < 1e-9) ? f(lo) : f(lo) + '–' + f(hi); }
function pair(v){ return Object.prototype.toString.call(v) === '[object Array]' ? v : [v,v]; }
function esc(x){
  return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                  .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function baseName(n){ return {e:n.e.replace(' (high dose)',''), f:n.f.replace(' (haute dose)','')}; }
function askPrompt(d, pname, w){
  var drug = t(baseName(d.n)), diag = pname ? t(pname) : '';
  if (lang === 'f'){
    return 'Je suis étudiante en soins infirmiers au Québec. Explique-moi en profondeur ' + drug
      + (diag ? ' utilisé pour : ' + diag : '') + (w ? ', chez un enfant de ' + dec(round(w,10)) + ' kg' : '')
      + '. Structure ta réponse comme une monographie : classe et mécanisme d\'action, indications, posologie pédiatrique et doses maximales, contre-indications et précautions, effets indésirables, interactions, surveillance infirmière, enseignement au patient et à la famille.'
      + ' C\'est pour l\'étude seulement — rappelle-moi de valider dans RxVigilance ou le Guide des médicaments.';
  }
  return 'I am a nursing student in Quebec. Go in depth on ' + drug
    + (diag ? ' used for: ' + diag : '') + (w ? ', in a child weighing ' + dec(round(w,10)) + ' kg' : '')
    + '. Structure your answer like a drug monograph: class and mechanism of action, indications, pediatric dosing and maximums, contraindications and precautions, adverse effects, interactions, nursing monitoring, and patient and family teaching.'
    + ' This is for study only — remind me to verify it in RxVigilance or the Guide des médicaments.';
}

/* ================= the maths ================= */
function calc(d, w){
  var out = {capped:false}, p, a, b;
  if (d.kind === 'daily'){
    p = pair(d.mgkg);
    var capD = function(x){
      var day = x * w, raw = day;
      if (d.maxDayKg) day = Math.min(day, d.maxDayKg * w);
      if (d.maxDay)   day = Math.min(day, d.maxDay);
      var dose = day / d.doses;
      if (d.maxDose && dose > d.maxDose){ dose = d.maxDose; day = dose * d.doses; }
      if (day < raw - 1e-6) out.capped = true;
      return {dose:dose, day:day};
    };
    a = capD(p[0]); b = capD(p[1]);
    out.doseLo = a.dose; out.doseHi = b.dose;
    out.thirdK = t(UI.per24); out.thirdV = range(a.day, b.day, fmtMg);
  } else if (d.kind === 'dose' || d.kind === 'once'){
    p = pair(d.mgkg);
    var capX = function(x){
      var dose = x * w;
      if (d.maxDose && dose > d.maxDose){ dose = d.maxDose; out.capped = true; }
      return dose;
    };
    out.doseLo = capX(p[0]); out.doseHi = capX(p[1]);
    if (d.kind === 'once'){ out.thirdK = t(UI.howOften); out.thirdV = '<em>' + t(UI.singleDose) + '</em>'; }
    else {
      var mx = Infinity;
      if (d.maxDayKg) mx = Math.min(mx, d.maxDayKg * w);
      if (d.maxDay)   mx = Math.min(mx, d.maxDay);
      out.thirdK = t(UI.max24);
      out.thirdV = isFinite(mx) ? fmtMg(mx) : '<em>' + t(UI.seeNotes) + '</em>';
    }
  } else if (d.kind === 'mlkg'){
    var v = d.mlkg * w;
    if (d.maxMl && v > d.maxMl){ v = d.maxMl; out.capped = true; }
    out.mlLo = out.mlHi = v;
  }
  return out;
}
function ruleLine(d){
  var bits = [], p;
  if (d.kind === 'daily'){ p = pair(d.mgkg); bits.push(range(p[0],p[1],dec) + t(UI.mgkgday) + (d.unitNote ? ' (' + d.unitNote + ')' : '')); }
  else if (d.kind === 'dose' || d.kind === 'once'){ p = pair(d.mgkg); bits.push(range(p[0],p[1],dec) + t(UI.mgkgdose)); }
  else if (d.kind === 'mlkg') bits.push(dec(d.mlkg) + t(UI.mlkg));
  else if (d.kind === 'ageband') bits.push(t(UI.byAgeRule));
  if (d.freq) bits.push(d.kind === 'daily' && d.doses > 1 ? t(UI.divided) + t(d.freq) : t(d.freq));
  if (d.dur) bits.push(t(d.dur));
  bits.push(t(d.route));
  return bits.join(' · ');
}
function doseText(d, w){
  if (d.kind === 'ageband' || !w) return '';
  var r = calc(d, w);
  if (d.kind === 'mlkg') return range(r.mlLo, r.mlHi, fmtMl) + ' mL';
  var s = range(r.doseLo, r.doseHi, fmtMg) + ' mg';
  if (d.conc && d.conc[0]) s += ' · ' + range(r.doseLo/d.conc[0].m, r.doseHi/d.conc[0].m, fmtMl) + ' mL';
  return s;
}

/* ================= shared card pieces ================= */
function favKey(d){ return d.n.e.replace(' (high dose)',''); }
function isFav(k){ return state.favs.indexOf(k) >= 0; }
function starHtml(k){
  var on = isFav(k);
  return '<button type="button" class="star" data-act="fav" data-fav="' + esc(k) + '"'
    + ' aria-pressed="' + (on ? 'true' : 'false') + '" title="' + esc(on ? t(UI.favOn) : t(UI.favAdd)) + '"'
    + ' aria-label="' + esc(on ? t(UI.favOn) : t(UI.favAdd)) + '">'
    + '<svg viewBox="0 0 24 24" fill="' + (on ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">'
    + '<path d="M12 3.6l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg></button>';
}
function moreHtmlFor(cid, mo, q){
  if (!mo) return '';
  var isOpen = !!state.open[cid];
  return '<div class="more">'
    + '<button type="button" class="more__btn" data-act="more" data-more="' + cid + '" aria-controls="body-' + cid + '"'
    + ' aria-expanded="' + (isOpen ? 'true' : 'false') + '">' + t(UI.deeper) + '</button>'
    + '<div class="more__body' + (isOpen ? ' is-open' : '') + '" id="body-' + cid + '"><div class="mono">'
    + '<div><span class="mono__k">' + t(UI.mClass) + '</span><p class="mono__v">' + t(mo.c) + '</p></div>'
    + '<div><span class="mono__k">' + t(UI.mWatch) + '</span><p class="mono__v">' + t(mo.w) + '</p></div>'
    + '<div><span class="mono__k">' + t(UI.mNurse) + '</span><p class="mono__v">' + t(mo.n) + '</p></div>'
    + '<div><span class="mono__k">' + t(UI.mTeach) + '</span><p class="mono__v">' + t(mo.e) + '</p></div>'
    + '</div><div class="ask">'
    + '<a class="ask__go" target="_blank" rel="noopener noreferrer" href="https://claude.ai/new?q=' + esc(encodeURIComponent(q)) + '">' + t(UI.askGo) + '</a>'
    + '<button type="button" class="ask__copy" data-act="copy" data-q="' + esc(q) + '">' + t(UI.askCopy) + '</button>'
    + '</div><p class="ask__note">' + t(UI.askNote) + '</p></div></div>';
}

/* ================= calculator card ================= */
function card(d, idx, w, m, anim, pname){
  var cid = state.path + '-' + idx;
  var concs = d.conc || [];
  if (concs.length && state.conc[cid] === undefined) state.conc[cid] = 0;
  var conc = concs[state.conc[cid] || 0];
  var r = w ? calc(d, w) : null;

  var k1 = t(UI.perDose), v1 = '<em>—</em>', k2 = t(UI.give), v2 = '<em>—</em>', k3 = t(UI.per24), v3 = '<em>—</em>';
  if (d.kind === 'ageband'){
    k1 = t(UI.dose); k2 = t(UI.howOften); k3 = t(UI.byAge);
    var band = null;
    if (m !== null) for (var i=0;i<d.bands.length;i++) if (m >= d.bands[i].min && m <= d.bands[i].max) band = d.bands[i];
    v1 = band ? t(band.d) : '<em>' + t(UI.enterAge) + '</em>';
    v2 = band ? '<span class="stat__u">' + t(UI.onceDaily) + '</span>' : '<em>—</em>';
    v3 = m === null ? '<em>—</em>' : '<span class="stat__u">' + (m < 12 ? Math.round(m) + ' ' + t(UI.mo) : dec(round(m/12,10)) + ' ' + t(UI.yr)) + '</span>';
  } else if (d.kind === 'mlkg'){
    k1 = t(UI.give); k2 = t(UI.rate); k3 = t(UI.rule);
    v1 = r ? range(r.mlLo, r.mlHi, fmtMl) + ' <span class="stat__u">mL</span>' : '<em>—</em>';
    v2 = '<span class="stat__u">' + t(d.dur) + '</span>';
    v3 = '<span class="stat__u">' + dec(d.mlkg) + ' mL/kg</span>';
  } else {
    v1 = r ? range(r.doseLo, r.doseHi, fmtMg) + ' <span class="stat__u">mg</span>' : '<em>—</em>';
    if (r && conc) v2 = range(r.doseLo/conc.m, r.doseHi/conc.m, fmtMl) + ' <span class="stat__u">mL</span>';
    else if (r) v2 = '<em>' + t(UI.seeNotes) + '</em>';
    k3 = r ? r.thirdK : (d.kind === 'daily' ? t(UI.per24) : t(UI.max24));
    if (r) v3 = r.thirdV.indexOf('<em>') === 0 ? r.thirdV : r.thirdV + ' <span class="stat__u">mg</span>';
    if (d.third){ k3 = t(d.third.k); v3 = '<span class="stat__u">' + t(d.third.v) + '</span>'; }
  }

  var flags = [];
  if (r && r.capped) flags.push({c:'cap', t:t(UI.capped)});
  var ws = d.warn || [];
  for (var j=0;j<ws.length;j++){
    if (ws[j].always) flags.push({c:'warn', t:t(ws[j].t)});
    else if (m !== null && ws[j].minM && m < ws[j].minM) flags.push({c: ws[j].lvl === 'stop' ? 'stop' : 'warn', t:t(ws[j].t)});
  }
  if (d.epiAuto && w) flags.push({c:'cap', t: w < 7.5 ? t(UI.epiSmall) : (w < 25 ? t(UI.epiJr) : t(UI.epiAd))});
  if (d.ondanBand && w && w < 8) flags.push({c:'warn', t:t(UI.ondanSmall)});

  var notes = [];
  (d.notes || []).forEach(function(n){ notes.push(t(n)); });
  if (d.solid) notes.push(t(UI.alsoComes) + t(d.solid) + '.');

  var concHtml = '';
  if (concs.length > 1){
    concHtml = '<label class="conc"><span class="field__label">' + t(UI.using) + '</span><select data-conc="' + cid + '">';
    for (var k=0;k<concs.length;k++)
      concHtml += '<option value="' + k + '"' + (k === (state.conc[cid]||0) ? ' selected' : '') + '>' + t(concs[k].l) + '</option>';
    concHtml += '</select></label>';
  } else if (concs.length === 1){
    concHtml = '<p class="rx__rule">' + t(UI.using) + ' · ' + t(concs[0].l) + '</p>';
  }

  return '<article class="rx' + (anim ? ' rv' : '') + '">'
    + '<header class="rx__head"><div><h3 class="rx__name">' + t(d.n) + '</h3>'
    + '<p class="rx__rule">' + ruleLine(d) + '</p></div>'
    + '<div class="rx__tools">' + starHtml(favKey(d))
    + '<span class="chip' + (t(d.role).indexOf('First line') === 0 || t(d.role).indexOf('Premier choix') === 0 ? ' chip--first' : '') + '">' + t(d.role) + '</span>'
    + '</div></header>'
    + '<div class="readout">'
      + '<div class="stat stat--lead"><span class="stat__k">' + k1 + '</span><span class="stat__v">' + v1 + '</span></div>'
      + '<div class="stat"><span class="stat__k">' + k2 + '</span><span class="stat__v">' + v2 + '</span></div>'
      + '<div class="stat"><span class="stat__k">' + k3 + '</span><span class="stat__v">' + v3 + '</span></div>'
    + '</div>'
    + concHtml
    + (flags.length ? '<div class="flags">' + flags.map(function(f){ return '<p class="flag flag--' + f.c + '">' + f.t + '</p>'; }).join('') + '</div>' : '')
    + (notes.length ? '<ul class="notes">' + notes.map(function(n){ return '<li>' + n + '</li>'; }).join('') + '</ul>' : '')
    + moreHtmlFor(cid, monoFor(d), askPrompt(d, pname, w))
    + '</article>';
}

/* ================= reference index ================= */
var INDEX = (function(){
  var map = {}, order = [];
  PATHS.forEach(function(p){
    p.drugs.forEach(function(d){
      var k = d.n.e.replace(' (high dose)','');
      if (!map[k]){ map[k] = {key:k, n:baseName(d.n), mono:M[k], uses:[]}; order.push(k); }
      map[k].uses.push({p:p, d:d});
    });
  });
  return order.sort().map(function(k){ return map[k]; });
})();

function byName(a, b){
  var x = t(a.n), y = t(b.n);
  return x.localeCompare ? x.localeCompare(y, lang === 'f' ? 'fr' : 'en') : (x < y ? -1 : 1);
}
function refCard(entry, w, anim){
  var cid = 'ref-' + entry.key.replace(/[^A-Za-z]/g,'');
  var uses = entry.uses.map(function(u){
    var dt = doseText(u.d, w);
    return '<li><span class="use__p">' + t(u.p.name) + '</span>'
      + '<span class="use__r">' + ruleLine(u.d) + (dt ? ' → <span class="use__d">' + dt + '</span>' : '') + '</span></li>';
  }).join('');
  return '<article class="rx' + (anim ? ' rv' : '') + '">'
    + '<header class="rx__head"><div><h3 class="rx__name">' + t(entry.n) + '</h3></div>'
    + '<div class="rx__tools">' + starHtml(entry.key) + '</div></header>'
    + '<div><span class="mono__k">' + t(UI.usedFor) + '</span><ul class="uses">' + uses + '</ul></div>'
    + moreHtmlFor(cid, entry.mono, askPrompt(entry.uses[0].d, null, w))
    + '</article>';
}

/* ================= rendering ================= */
function fillDrugs(){
  drugSel.innerHTML = '';
  drugSel.add(new Option(t(UI.all), 'all'));
  curPath().drugs.forEach(function(d,i){ drugSel.add(new Option(t(d.n), String(i))); });
  drugSel.value = state.drug;
}
function fillPaths(){
  pathSel.innerHTML = '';
  PATHS.forEach(function(p){ pathSel.add(new Option(t(p.name), p.id)); });
  pathSel.value = state.path;
}
function chrome(){
  document.documentElement.lang = (lang === 'f') ? 'fr' : 'en';
  $('#h1').innerHTML = t(UI.h1a) + '<span class="lede">' + t(UI.h1b) + '</span>';
  $('#sub').textContent = t(UI.sub);
  $('#caution').innerHTML = t(UI.caution);
  $('#l-path').textContent = t(UI.diagnosis);
  $('#l-drug').textContent = t(UI.medication);
  $('#l-weight').textContent = t(UI.weight);
  $('#l-age').textContent = t(UI.age);
  $('#f-est').textContent = t(UI.estimate);
  $('#u-yr').textContent = t(UI.yr);
  $('#u-mo').textContent = t(UI.mo);
  $('#foot-credit').textContent = t(UI.credit);
  $('#foot-text').textContent = t(UI.foot);
  $('#lab-calc').textContent = t(UI.tabCalc);
  $('#lab-method').textContent = t(UI.tabMethod);
  $('#lab-practice').textContent = t(UI.tabPractice);
  $('#practice-intro').textContent = t(UI.practiceIntro);
  applyPin();
  $('#lab-ref').textContent = t(UI.tabRef);
  $('#lab-fav').textContent = t(UI.tabFav);
  sIn.placeholder = t(UI.search);
  sIn.setAttribute('aria-label', t(UI.search));
}

var sigCalc = null, sigRef = null, sigFav = null;

function renderCalc(){
  var p = curPath(), w = kg(), m = months(), bits = [];
  bits.push(w ? '<strong>' + dec(round(w,10)) + ' kg</strong>' + (state.wUnit === 'lb' ? ' (' + dec(state.weight) + ' lb)' : '') + (state.est ? ' · ' + t(UI.estimated) : '')
              : t(UI.needWeight));
  if (m !== null) bits.push(m < 24 ? '<strong>' + Math.round(m) + ' ' + t(UI.months) + '</strong>' : '<strong>' + dec(round(m/12,10)) + ' ' + t(UI.years) + '</strong>');
  bits.push(t(p.name));
  if (w && w >= 40) bits.push(t(UI.adultZone));
  $('#bar').innerHTML = bits.join(' &nbsp;•&nbsp; ');

  var list = state.drug === 'all'
    ? p.drugs.map(function(d,i){ return [d,i]; })
    : [[p.drugs[+state.drug], +state.drug]];

  var sig = state.path + '|' + state.drug + '|' + lang;
  var anim = sig !== sigCalc; sigCalc = sig;
  $('#grid').innerHTML = list.map(function(x){ return card(x[0], x[1], w, m, anim, p.name); }).join('');

  each('[data-conc]', function(sel){
    sel.addEventListener('change', function(e){ state.conc[e.target.getAttribute('data-conc')] = +e.target.value; renderCalc(); });
  });
  reveal();
}

function renderRef(){
  var w = kg(), q = (state.q || '').trim().toLowerCase();
  var hits = INDEX.slice().sort(byName).filter(function(en){
    if (!q) return true;
    if (en.n.e.toLowerCase().indexOf(q) >= 0 || en.n.f.toLowerCase().indexOf(q) >= 0) return true;
    return en.uses.some(function(u){
      return u.p.name.e.toLowerCase().indexOf(q) >= 0 || u.p.name.f.toLowerCase().indexOf(q) >= 0;
    });
  });
  $('#ref-hint').textContent = w ? t(UI.usingW) : t(UI.setW);
  var sig = q + '|' + lang + '|' + (w ? 'w' : '');
  var anim = sig !== sigRef; sigRef = sig;
  $('#ref-grid').innerHTML = hits.map(function(en){ return refCard(en, w, anim); }).join('');
  $('#ref-empty').textContent = t(UI.noHit);
  $('#ref-empty').hidden = hits.length > 0;
  reveal();
}

function renderFav(){
  var w = kg();
  var hits = INDEX.slice().sort(byName).filter(function(en){ return isFav(en.key); });
  $('#fav-hint').textContent = hits.length ? (w ? t(UI.usingW) : t(UI.setW)) : '';
  var sig = state.favs.join(',') + '|' + lang + '|' + (w ? 'w' : '');
  var anim = sig !== sigFav; sigFav = sig;
  $('#fav-grid').innerHTML = hits.map(function(en){ return refCard(en, w, anim); }).join('');
  $('#fav-empty').textContent = t(UI.noFav);
  $('#fav-empty').hidden = hits.length > 0;
  reveal();
}

function renderTab(){
  if (state.tab === 'calc') renderCalc();
  else if (state.tab === 'method') renderMethod();
  else if (state.tab === 'practice') renderPractice();
  else if (state.tab === 'ref') renderRef();
  else renderFav();
}
function setTab(tab, scroll){
  state.tab = tab;
  each('.tab', function(b){ b.setAttribute('aria-selected', String(b.getAttribute('data-tab') === tab)); });
  each('.panel', function(pn){ pn.classList.toggle('is-on', pn.id === 'p-' + tab); });
  renderTab();
  if (scroll) window.scrollTo(0, 0);
  save();
}
function renderAll(){
  chrome(); fillPaths(); fillDrugs();
  each('.panel', function(pn){ pn.classList.toggle('is-on', pn.id === 'p-' + state.tab); });
  each('.tab', function(b){ b.setAttribute('aria-selected', String(b.getAttribute('data-tab') === state.tab)); });
  renderTab();
}

/* ---------- pixel reveal on scroll ---------- */
var obs = null;
function reveal(){
  var nodes = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)){
    Array.prototype.forEach.call(nodes, function(el){ el.classList.add('in'); });
    return;
  }
  if (!obs) obs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) en.target.classList.add('in');
      else en.target.classList.remove('in');
    });
  }, {threshold:0.05, rootMargin:'0px 0px -6% 0px'});
  Array.prototype.forEach.call(nodes, function(el){
    if (!el.hasAttribute('data-obs')){ el.setAttribute('data-obs','1'); obs.observe(el); }
  });
}

/* ---------- one delegated click handler ---------- */
function fallbackCopy(text, done){
  var ta = document.createElement('textarea');
  ta.value = text; ta.setAttribute('readonly','');
  ta.style.cssText = 'position:absolute;left:-9999px;top:0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); done(); } catch (e) {}
  document.body.removeChild(ta);
}
document.addEventListener('click', function(ev){
  var el = ev.target && ev.target.closest ? ev.target.closest('[data-act],[data-tab],[data-wunit],[data-aunit],[data-lang]') : null;
  if (!el) return;

  if (el.hasAttribute('data-tab')){ setTab(el.getAttribute('data-tab'), true); return; }

  if (el.hasAttribute('data-wunit')){
    each('[data-wunit]', function(x){ x.setAttribute('aria-pressed', String(x === el)); });
    state.wUnit = el.getAttribute('data-wunit'); renderTab(); save(); return;
  }
  if (el.hasAttribute('data-aunit')){
    each('[data-aunit]', function(x){ x.setAttribute('aria-pressed', String(x === el)); });
    state.aUnit = el.getAttribute('data-aunit'); renderTab(); save(); return;
  }
  if (el.hasAttribute('data-lang')){
    lang = el.getAttribute('data-lang');
    each('[data-lang]', function(x){ x.setAttribute('aria-pressed', String(x === el)); });
    sigCalc = sigRef = sigFav = null;
    renderAll(); save(); return;
  }

  var act = el.getAttribute('data-act');
  if (act === 'more'){
    var key = el.getAttribute('data-more');
    var body = document.getElementById('body-' + key);
    if (!body) return;
    var opening = !body.classList.contains('is-open');
    body.classList.toggle('is-open', opening);
    el.setAttribute('aria-expanded', opening ? 'true' : 'false');
    state.open[key] = opening;
    return;
  }
  if (act === 'fav'){
    var fk = el.getAttribute('data-fav'), i = state.favs.indexOf(fk);
    if (i >= 0) state.favs.splice(i, 1); else state.favs.push(fk);
    save();
    each('[data-fav="' + fk.replace(/"/g,'\\"') + '"]', function(b){
      var on = isFav(fk);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('aria-label', on ? t(UI.favOn) : t(UI.favAdd));
      b.setAttribute('title', on ? t(UI.favOn) : t(UI.favAdd));
      var svg = b.querySelector('svg');
      if (svg) svg.setAttribute('fill', on ? 'currentColor' : 'none');
    });
    if (state.tab === 'fav'){ sigFav = null; renderFav(); }
    return;
  }
  if (act === 'pin'){ state.pin = !state.pin; applyPin(); save(); return; }
  if (act === 'check'){ pqFocus = true; checkAnswer(); return; }
  if (act === 'newq'){ pqFocus = true; newQuestion(); renderPractice(); return; }
  if (act === 'reveal'){ revealAnswer(); return; }
  if (act === 'copy'){
    var q = el.getAttribute('data-q'), label = el.textContent;
    var done = function(){ el.textContent = t(UI.askDone); setTimeout(function(){ el.textContent = label; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(q).then(done, function(){ fallbackCopy(q, done); });
    } else fallbackCopy(q, done);
    return;
  }
});

/* ---------- boot ---------- */
restore();

pathSel = $('#f-path'); drugSel = $('#f-drug');
wIn = $('#f-weight'); aIn = $('#f-age'); sIn = $('#f-search');
wIn.value = state.weight; aIn.value = state.age;
each('[data-wunit]', function(x){ x.setAttribute('aria-pressed', String(x.getAttribute('data-wunit') === state.wUnit)); });
each('[data-aunit]', function(x){ x.setAttribute('aria-pressed', String(x.getAttribute('data-aunit') === state.aUnit)); });
each('[data-lang]',  function(x){ x.setAttribute('aria-pressed', String(x.getAttribute('data-lang') === lang)); });

pathSel.addEventListener('change', function(e){ state.path = e.target.value; state.drug = 'all'; fillDrugs(); renderCalc(); save(); });
drugSel.addEventListener('change', function(e){ state.drug = e.target.value; renderCalc(); save(); });
wIn.addEventListener('input', function(e){ state.weight = e.target.value; state.est = false; renderTab(); save(); });
aIn.addEventListener('input', function(e){ state.age = e.target.value; renderTab(); save(); });
sIn.addEventListener('input', function(e){ state.q = e.target.value; renderRef(); });

$('#f-est').addEventListener('click', function(){
  var m = months();
  if (m === null){ aIn.focus(); return; }
  var y = m / 12, est;
  if (m < 12) est = 0.5 * m + 4;
  else if (y <= 5) est = 2 * y + 8;
  else if (y <= 12) est = 3 * y + 7;
  else est = 50;
  est = round(est, 10);
  each('[data-wunit]', function(x){ x.setAttribute('aria-pressed', String(x.getAttribute('data-wunit') === 'kg')); });
  state.wUnit = 'kg'; state.weight = String(est); wIn.value = est; state.est = true;
  renderTab(); save();
});

/* ================= the control bar gets out of the way ================= */
function applyPin(){
  var btn = document.getElementById('f-pin');
  if (btn){
    btn.setAttribute('aria-pressed', state.pin ? 'true' : 'false');
    var lbl = t(state.pin ? UI.pinOn : UI.pinOff);
    btn.setAttribute('title', lbl);
    btn.setAttribute('aria-label', lbl);
  }
  if (state.pin) tuck(false);
}
function tuck(hide){
  var c = document.querySelector('.controls');
  if (c) c.classList.toggle('is-tucked', !!hide);
}
(function(){
  var lastY = window.pageYOffset || 0, ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function(){
      ticking = false;
      var y = window.pageYOffset || 0;
      if (state.pin || state.tab !== 'calc'){ lastY = y; return; }
      var inBar = document.activeElement && document.activeElement.closest
                  && document.activeElement.closest('.controls');
      if (inBar){ lastY = y; return; }
      if (y > lastY + 5 && y > 240) tuck(true);
      else if (y < lastY - 5) tuck(false);
      lastY = y;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
})();

/* ================= how to calculate ================= */
function renderMethod(){
  var h = HOWTO.map(function(s){
    return '<section class="m-sec"><h2>' + t(s.h) + '</h2><p>' + t(s.p) + '</p>'
      + (s.f ? '<p class="m-form">' + t(s.f) + '</p>' : '') + '</section>';
  }).join('');

  h += '<section class="m-sec m-ex rv"><h2>' + t(HOWEX.title) + '</h2>'
    + '<p>' + t(HOWEX.order) + '</p><ol>'
    + HOWEX.steps.map(function(x){ return '<li>' + t(x) + '</li>'; }).join('')
    + '</ol><p class="m-form">' + t(HOWEX.answer) + '</p></section>';

  h += '<section class="m-sec"><h2>' + t(HOWWRONG.title) + '</h2><ul class="m-list">'
    + HOWWRONG.items.map(function(x){ return '<li>' + t(x) + '</li>'; }).join('')
    + '</ul></section>';

  $('#method-body').innerHTML = h;
  reveal();
}

/* ================= practice mode ================= */
function L(e, f){ return lang === 'f' ? f : e; }
var pqFocus = false;

var POOL = (function(){
  var out = [];
  PATHS.forEach(function(p){
    p.drugs.forEach(function(d){
      if (typeof d.mgkg !== 'number') return;
      if (d.kind !== 'daily' && d.kind !== 'dose') return;
      if (!d.conc || !d.conc.length) return;
      out.push({p:p, d:d});
    });
  });
  return out;
})();

function durDays(d){
  if (!d.dur || !d.dur.e) return null;
  var m = String(d.dur.e).match(/^(\d+)(?:[–-](\d+))?\s*days?/);
  if (!m) return null;
  var ns = [parseInt(m[1], 10)];
  if (m[2]) ns.push(parseInt(m[2], 10));
  return ns[Math.floor(Math.random() * ns.length)];
}
function freqAbbr(d){
  if (d.kind !== 'daily') return '';
  return {1:'DIE (q24h)', 2:'BID (q12h)', 3:'TID (q8h)', 4:'QID (q6h)'}[d.doses] || '';
}
var BOTTLES = [30, 50, 60, 75, 100, 150, 200];
function pickBottle(tot){
  var big = BOTTLES[BOTTLES.length - 1];
  var good = BOTTLES.filter(function(b){ var r = tot / b; return r > 1.05 && Math.ceil(r) <= 5; });
  if (good.length) return good[Math.floor(Math.random() * good.length)];
  if (tot > big) return big;                                  // a long course: biggest bottle on the shelf
  var fits = BOTTLES.filter(function(b){ return b >= tot; }); // a small course: smallest bottle that holds it
  return fits.length ? fits[0] : big;
}

function pnum(d, w){
  var o = {};
  if (d.kind === 'daily'){
    var rawDay = d.mgkg * w, day = rawDay;
    if (d.maxDayKg) day = Math.min(day, d.maxDayKg * w);
    if (d.maxDay)   day = Math.min(day, d.maxDay);
    var dose = day / d.doses;
    if (d.maxDose && dose > d.maxDose){ dose = d.maxDose; day = dose * d.doses; }
    o.rawDay = rawDay; o.rawDose = rawDay / d.doses;
    o.day = day; o.dose = dose; o.capped = day < rawDay - 1e-6;
  } else {
    var rawDose = d.mgkg * w, dz = rawDose;
    if (d.maxDose && dz > d.maxDose) dz = d.maxDose;
    o.rawDose = rawDose; o.dose = dz; o.day = null;
    o.capped = dz < rawDose - 1e-6;
  }
  return o;
}

function newQuestion(){
  var q = POOL[Math.floor(Math.random() * POOL.length)];
  var w = Math.round((4 + Math.random() * 36) * 2) / 2;
  // pick the strength a pharmacist would: the weakest one that still keeps a
  // dose down to a measurable volume, otherwise the strongest on the shelf
  var n0 = pnum(q.d, w);
  var byStrength = q.d.conc.slice().sort(function(x, y){ return y.m - x.m; });
  var conc = byStrength[0];
  for (var ci = byStrength.length - 1; ci >= 0; ci--){
    if (n0.dose / byStrength[ci].m <= 15){ conc = byStrength[ci]; break; }
  }
  var oral = q.d.route && q.d.route.e === 'PO';
  var days = (q.d.kind === 'daily' && oral && w <= 25) ? durDays(q.d) : null;
  var kinds = q.d.kind === 'daily'
    ? (q.d.doses > 1 ? ['perDose','perDose','perDay','volume','volume'] : ['perDose','volume','volume'])
    : ['perDose','volume','volume'];
  var tot = null, bottle = null;
  if (days){
    var nn = pnum(q.d, w);
    tot = (nn.dose / conc.m) * q.d.doses * days;
    bottle = pickBottle(tot);
    kinds = kinds.concat(['courseVol','courseVol','bottles','bottles']);
  }
  state.pq = {
    pid:q.p.id, di:q.p.drugs.indexOf(q.d), w:w,
    ci:q.d.conc.indexOf(conc),
    days:days, bottle:bottle,
    type:kinds[Math.floor(Math.random() * kinds.length)],
    done:false, fb:null
  };
}
function pqParts(){
  var q = state.pq;
  var p = PATHS.filter(function(x){ return x.id === q.pid; })[0];
  var d = p.drugs[q.di];
  return {p:p, d:d, w:q.w, conc:d.conc[q.ci], type:q.type, n:pnum(d, q.w), days:q.days, bottle:q.bottle};
}
function courseVol(k){ return (k.n.dose / k.conc.m) * k.d.doses * k.days; }
function pqAnswer(){
  var k = pqParts();
  if (k.type === 'perDay')   return k.n.day;
  if (k.type === 'volume')   return k.n.dose / k.conc.m;
  if (k.type === 'courseVol')return courseVol(k);
  if (k.type === 'bottles')  return Math.ceil(courseVol(k) / k.bottle - 1e-9);
  return k.n.dose;
}
function pqUnit(){
  var ty = state.pq.type;
  if (ty === 'volume' || ty === 'courseVol') return 'mL';
  if (ty === 'bottles') return t(UI.unitBottles);
  return 'mg';
}
function unitFor(v){
  if (state.pq.type === 'bottles') return t(Math.round(v) === 1 ? UI.unitBottle : UI.unitBottles);
  return pqUnit();
}
function fmtAns(v){
  var ty = state.pq.type;
  if (ty === 'bottles') return dec(Math.round(v));
  return (ty === 'volume' || ty === 'courseVol') ? fmtMl(v) : fmtMg(v);
}

function pqSteps(){
  var k = pqParts(), d = k.d, n = k.n, S = [];
  if (d.kind === 'daily'){
    S.push(dec(d.mgkg) + ' mg/kg × ' + dec(k.w) + ' kg = ' + fmtMg(n.rawDay) + L(' mg for the whole day', ' mg pour toute la journée'));
    if (n.capped) S.push(L('That is above the maximum, so the maximum becomes the dose: ',
                           'C\'est au-dessus du maximum, donc le maximum devient la dose : ') + fmtMg(n.day) + L(' mg per day', ' mg par jour'));
    if (k.type !== 'perDay'){
      if (d.doses > 1)
        S.push(fmtMg(n.day) + ' mg ÷ ' + d.doses + L(' doses = ', ' prises = ') + fmtMg(n.dose) + L(' mg per dose', ' mg par prise'));
      else
        S.push(L('It is given once a day, so the whole day is one dose: ', 'Il se donne une fois par jour, donc toute la journée tient en une seule prise : ') + fmtMg(n.dose) + ' mg');
    }
  } else {
    S.push(dec(d.mgkg) + ' mg/kg × ' + dec(k.w) + ' kg = ' + fmtMg(n.rawDose) + L(' mg per dose', ' mg par prise'));
    if (n.capped) S.push(L('That is above the maximum of ', 'C\'est au-dessus du maximum de ') + fmtMg(d.maxDose)
                         + L(' mg per dose, so give ', ' mg par prise, donc on donne ') + fmtMg(n.dose) + ' mg');
  }
  if (k.type === 'volume' || k.type === 'courseVol' || k.type === 'bottles'){
    S.push(L('The bottle holds ', 'La bouteille contient ') + dec(k.conc.m) + L(' mg in every mL', ' mg dans chaque mL')
           + ' (' + t(k.conc.l) + ')');
    var perDose = n.dose / k.conc.m;
    S.push(fmtMg(n.dose) + ' mg ÷ ' + dec(k.conc.m) + ' mg/mL = ' + fmtMl(perDose) + L(' mL per dose', ' mL par prise'));
  }
  if (k.type === 'courseVol' || k.type === 'bottles'){
    var pd = n.dose / k.conc.m, perDay = pd * d.doses, tot = perDay * k.days;
    if (d.doses > 1)
      S.push(fmtMl(pd) + L(' mL × ', ' mL × ') + d.doses + L(' doses a day = ', ' prises par jour = ') + fmtMl(perDay) + L(' mL a day', ' mL par jour'));
    else
      S.push(L('One dose a day, so that is ', 'Une seule prise par jour, donc c\'est ') + fmtMl(perDay) + L(' mL a day', ' mL par jour'));
    S.push(fmtMl(perDay) + L(' mL × ', ' mL × ') + k.days + L(' days = ', ' jours = ') + fmtMl(tot) + L(' mL for the whole course', ' mL pour toute la cure'));
    if (k.type === 'bottles'){
      var nb = Math.ceil(tot / k.bottle - 1e-9);
      S.push(fmtMl(tot) + ' mL ÷ ' + k.bottle + ' mL = ' + fmtMl(tot / k.bottle)
             + L(' — you cannot dispense part of a bottle, so round UP to ', ' — on ne sert pas une fraction de bouteille, donc on arrondit VERS LE HAUT à ')
             + nb);
    }
  }
  return S;
}

function pqTraps(){
  var k = pqParts(), d = k.d, n = k.n, c = k.conc, T2 = [], ans = pqAnswer();
  if (k.type === 'perDose'){
    if (d.kind === 'daily' && d.doses > 1) T2.push({v:n.day, m:L(
      'That is the total for the whole day. Divide it by the ' + d.doses + ' doses to get one dose.',
      'C\'est le total pour toute la journée. Divisez-le par les ' + d.doses + ' prises pour obtenir une seule dose.')});
    if (n.capped) T2.push({v:n.rawDose, m:L(
      'Your arithmetic is right, but you went past the maximum. When the calculated dose is higher than the maximum, the maximum is the dose.',
      'Votre calcul est bon, mais vous avez dépassé le maximum. Quand la dose calculée dépasse le maximum, c\'est le maximum qui devient la dose.')});
    T2.push({v:n.dose / c.m, m:L(
      'That is the volume in millilitres. This question asks for milligrams — stop one step earlier.',
      'C\'est le volume en millilitres. Cette question demande des milligrammes — arrêtez-vous une étape plus tôt.')});
  }
  if (k.type === 'perDay'){
    T2.push({v:n.dose, m:L(
      'That is one dose. Multiply it by the ' + d.doses + ' doses to get the total for 24 hours.',
      'C\'est une seule prise. Multipliez-la par les ' + d.doses + ' prises pour obtenir le total sur 24 heures.')});
    if (n.capped) T2.push({v:n.rawDay, m:L(
      'You multiplied correctly, but that lands above the maximum for the day. The maximum is the answer.',
      'La multiplication est bonne, mais elle dépasse le maximum pour la journée. C\'est le maximum, la réponse.')});
  }
  if (k.type === 'volume'){
    T2.push({v:n.dose, m:L(
      'Those are the milligrams. Now divide by the milligrams in one millilitre to turn them into a volume.',
      'Ce sont les milligrammes. Divisez maintenant par les milligrammes contenus dans un millilitre pour obtenir un volume.')});
    T2.push({v:n.dose * c.m, m:L(
      'You multiplied by the concentration. To go from milligrams to millilitres you divide by it.',
      'Vous avez multiplié par la concentration. Pour passer des milligrammes aux millilitres, on divise.')});
    if (t(c.l).indexOf('5 mL') >= 0) T2.push({v:n.dose / (c.m * 5), m:L(
      'You divided by the milligrams printed on the label instead of the milligrams in one millilitre. Divide the label first: ' + dec(c.m * 5) + ' ÷ 5 = ' + dec(c.m) + ' mg/mL.',
      'Vous avez divisé par les milligrammes inscrits sur l\'étiquette au lieu des milligrammes contenus dans un millilitre. Divisez d\'abord l\'étiquette : ' + dec(c.m * 5) + ' ÷ 5 = ' + dec(c.m) + ' mg/mL.')});
    if (d.kind === 'daily' && d.doses > 1) T2.push({v:n.day / c.m, m:L(
      'That is the volume for the whole day. Divide the daily dose by the ' + d.doses + ' doses before you convert it to millilitres.',
      'C\'est le volume pour toute la journée. Divisez la dose quotidienne par les ' + d.doses + ' prises avant de la convertir en millilitres.')});
  }
  if (k.type === 'courseVol'){
    var pdv = n.dose / c.m;
    T2.push({v:pdv, m:L(
      'That is one single dose. Multiply it by the ' + d.doses + ' doses a day, then by the ' + k.days + ' days of the course.',
      'C\'est une seule prise. Multipliez-la par les ' + d.doses + ' prises par jour, puis par les ' + k.days + ' jours de la cure.')});
    if (d.doses > 1) T2.push({v:pdv * d.doses, m:L(
      'That is one day\'s worth. The course runs ' + k.days + ' days, so multiply by ' + k.days + '.',
      'C\'est ce qu\'il faut pour une journée. La cure dure ' + k.days + ' jours, il faut donc multiplier par ' + k.days + '.')});
    if (d.doses > 1) T2.push({v:pdv * k.days, m:L(
      'You counted one dose a day. There are ' + d.doses + ' doses a day, so multiply by ' + d.doses + ' as well.',
      'Vous avez compté une seule prise par jour. Il y en a ' + d.doses + ', il faut donc aussi multiplier par ' + d.doses + '.')});
    T2.push({v:n.dose * d.doses * k.days, m:L(
      'Those are the milligrams needed for the course, not the millilitres. Divide by ' + dec(c.m) + ' mg/mL to turn them into a volume.',
      'Ce sont les milligrammes nécessaires pour la cure, pas les millilitres. Divisez par ' + dec(c.m) + ' mg/mL pour obtenir un volume.')});
  }
  if (k.type === 'bottles'){
    var tot2 = courseVol(k);
    T2.push({v:tot2, m:L(
      'That is the total volume in mL. The question asks how many bottles that is — divide it by ' + k.bottle + ' mL.',
      'C\'est le volume total en mL. La question demande combien de bouteilles cela représente — divisez-le par ' + k.bottle + ' mL.')});
    T2.push({v:tot2 / k.bottle, m:L(
      'Right division, but a pharmacy cannot dispense part of a bottle. Always round UP to the next whole bottle.',
      'La division est bonne, mais une pharmacie ne sert pas une fraction de bouteille. On arrondit toujours VERS LE HAUT à la bouteille suivante.')});
    T2.push({v:Math.floor(tot2 / k.bottle), m:L(
      'You rounded down. The patient would run out before the course is finished — always round up.',
      'Vous avez arrondi vers le bas. Le patient manquerait de médicament avant la fin de la cure — on arrondit toujours vers le haut.')});
  }
  T2.push({v:ans * 10, m:L('The digits are right, the decimal point is one place out — your answer is ten times too big.',
                           'Les chiffres sont bons, mais la virgule a glissé d\'une place — votre réponse est dix fois trop grande.')});
  T2.push({v:ans / 10, m:L('The digits are right, the decimal point is one place out — your answer is ten times too small.',
                           'Les chiffres sont bons, mais la virgule a glissé d\'une place — votre réponse est dix fois trop petite.')});
  T2.push({v:d.mgkg, m:L('That is the mg/kg figure straight from the order. It still has to be multiplied by the weight.',
                         'C\'est le chiffre mg/kg tel quel dans l\'ordonnance. Il reste à le multiplier par le poids.')});
  return T2;
}

function near(a, b){ return Math.abs(a - b) <= Math.max(Math.abs(b) * 0.005, 0.049); }

function renderPractice(){
  if (!state.pq) newQuestion();
  var k = pqParts(), q = state.pq;
  var maxTxt = '';
  if (k.d.maxDay)       maxTxt = L(' (max ', ' (max ') + fmtMg(k.d.maxDay) + L(' mg/day)', ' mg/jour)');
  else if (k.d.maxDose) maxTxt = L(' (max ', ' (max ') + fmtMg(k.d.maxDose) + L(' mg/dose)', ' mg/dose)');

  var ask = t(UI.askDose);
  if (k.type === 'perDay') ask = t(UI.askDay);
  else if (k.type === 'volume') ask = t(UI.askVol);
  else if (k.type === 'courseVol') ask = t(UI.askCourse);
  else if (k.type === 'bottles') ask = t(UI.askBottlesA) + k.bottle + t(UI.askBottlesB);

  var abbr = freqAbbr(k.d);
  var isCourse = (k.type === 'courseVol' || k.type === 'bottles');
  var extra = '';
  if (k.type === 'volume' || isCourse) extra += '<br>' + t(UI.youHave) + ' : ' + t(k.conc.l);
  if (isCourse) extra += '<br>' + t(UI.prescribedFor) + ' : ' + k.days + ' ' + t(UI.days);

  var html = '<article class="rx pq rv">'
    + '<div class="pq__order"><span class="mono__k">' + t(UI.order) + '</span>'
    + '<p class="pq__text">' + t(baseName(k.d.n)) + ' ' + ruleLine(k.d) + (abbr ? ' · ' + abbr : '') + maxTxt + '</p>'
    + '<p class="pq__meta"><strong>' + t(UI.child) + ' : ' + dec(k.w) + ' kg</strong>' + extra + '</p></div>'
    + '<p class="pq__ask">' + ask + '</p>'
    + '<div class="pq__row">'
    + '<input type="text" id="pq-ans" inputmode="decimal" autocomplete="off" aria-label="' + esc(t(UI.yourAnswer)) + '" placeholder="0">'
    + '<span class="pq__unit">' + pqUnit() + '</span>'
    + '<button type="button" class="btn btn--go" data-act="check">' + t(UI.check) + '</button>'
    + '</div>'
    + '<div id="pq-fb">' + (q.fb || '') + '</div>'
    + '<div class="pq__foot">'
    + '<div class="ask" style="gap:8px">'
    + '<button type="button" class="btn btn--ghost" data-act="newq">' + t(UI.newQ) + '</button>'
    + (q.done ? '' : '<button type="button" class="btn btn--ghost" data-act="reveal">' + t(UI.reveal) + '</button>')
    + '</div>'
    + '<span class="pq__score">' + state.pscore.ok + ' / ' + state.pscore.n + ' ' + t(UI.score) + '</span>'
    + '</div></article>';

  $('#practice-body').innerHTML = html;
  var inp = document.getElementById('pq-ans');
  if (inp){
    inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') checkAnswer(); });
    if (pqFocus) inp.focus();
  }
  reveal();
}

function stepsHtml(){
  return '<ol>' + pqSteps().map(function(s){ return '<li>' + s + '</li>'; }).join('') + '</ol>';
}

function checkAnswer(){
  var inp = document.getElementById('pq-ans');
  if (!inp) return;
  var raw = (inp.value || '').replace(',', '.').trim();
  var v = parseFloat(raw);
  if (!isFinite(v)){
    state.pq.fb = '<div class="fb fb--tell">' + t(UI.needNum) + '</div>';
    $('#pq-fb').innerHTML = state.pq.fb;
    return;
  }
  var ans = pqAnswer(), first = !state.pq.done;
  if (near(v, ans)){
    if (first){ state.pscore.n++; state.pscore.ok++; }
    state.pq.done = true;
    state.pq.fb = '<div class="fb fb--ok"><b>' + t(UI.right) + '</b>' + stepsHtml() + '</div>';
  } else {
    if (first) state.pscore.n++;
    var why = null, traps = pqTraps();
    for (var i = 0; i < traps.length; i++){
      if (near(v, traps[i].v)){ why = traps[i].m; break; }
    }
    state.pq.done = true;
    state.pq.fb = '<div class="fb fb--no"><b>' + t(UI.wrong) + '</b>'
      + '<p>' + (why || t(UI.genericWrong)) + '</p>'
      + '<p><strong>' + t(UI.theAnswer) + ' ' + fmtAns(ans) + ' ' + unitFor(ans) + '.</strong></p>'
      + stepsHtml() + '</div>';
  }
  save();
  renderPractice();
  var again = document.getElementById('pq-ans');
  if (again) again.value = raw.replace('.', lang === 'f' ? ',' : '.');
}

function revealAnswer(){
  if (!state.pq) return;
  if (!state.pq.done){ state.pscore.n++; state.pq.done = true; }
  state.pq.fb = '<div class="fb fb--tell"><b>' + t(UI.shown) + '</b>'
    + '<p><strong>' + t(UI.theAnswer) + ' ' + fmtAns(pqAnswer()) + ' ' + unitFor(pqAnswer()) + '.</strong></p>'
    + stepsHtml() + '</div>';
  save();
  renderPractice();
}

/* register the service worker so the app keeps working offline */
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0){
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('./sw.js').catch(function(){});
  });
}

function fitSticky(){
  var bar = document.querySelector('.appbar'), c = document.querySelector('.controls');
  if (bar && c) c.style.top = bar.offsetHeight + 'px';
}
window.addEventListener('resize', fitSticky);

renderAll();
fitSticky();
