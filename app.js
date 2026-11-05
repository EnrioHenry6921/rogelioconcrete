/* CapturePoint — Corecrete LLC walkthrough.
   Plain JS, no build step. All data is demo data from data.js. */

const $  = (s, r = document) => r.querySelector(s);
const el = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstElementChild; };
const money = (n) => '$' + n.toLocaleString('en-US');
const mins  = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

/* ---------- header ---------- */
$('#bizName').textContent = BUSINESS.name;
$('#bizMeta').textContent = `${BUSINESS.trade} · ${BUSINESS.city}`;

/* ---------- nav ---------- */
$('#nav').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-v]');
  if (!b) return;
  document.querySelectorAll('#nav button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('on', v.id === 'v-' + b.dataset.v));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- derived numbers ---------- */
const answered  = CALLS.filter(c => c.status === 'answered').length;
const missed    = CALLS.filter(c => c.status === 'missed').length;
const weekA     = CALL_WEEK.reduce((t, d) => t + d.answered, 0);
const weekM     = CALL_WEEK.reduce((t, d) => t + d.missed, 0);
const pickRate  = Math.round(100 * weekA / (weekA + weekM));
const live      = JOBS.filter(j => j.step > 0 && j.step < 5);
const pipeline  = live.reduce((t, j) => t + j.value, 0);
const owed      = INVOICES.filter(i => i.status === 'due').reduce((t, i) => t + i.amount, 0);
const quotedOut = QUOTES.filter(q => q.sent.startsWith('Today') || q.sent.includes('AM') || q.sent.includes('PM'))
                        .reduce((t, q) => t + q.amount, 0);

$('#todaySub').textContent =
  `${BUSINESS.name} · ${new Date().toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric'})} · ${BUSINESS.hours}`;

/* ---------- today ---------- */
const kpi = (n, l, f, cls = '') =>
  `<div class="card kpi ${cls}"><div class="n">${n}</div><div class="l">${l}</div><div class="f">${f}</div></div>`;

$('#kpis').innerHTML =
  kpi(`${answered}`, 'calls answered today', `${missed} missed — each got a text back`, 'good') +
  kpi(`${live.length}`, 'jobs on the board', `${money(pipeline)} of work in play`) +
  kpi(money(quotedOut), 'quoted today', 'follow-ups already scheduled', 'warn') +
  kpi(money(owed), 'waiting to be paid', 'chased automatically');

const maxDay = Math.max(...CALL_WEEK.map(d => d.answered + d.missed));
$('#chart').innerHTML = CALL_WEEK.map(d => {
  const h = 78;
  const a = Math.max(3, h * d.answered / maxDay);
  const m = h * d.missed / maxDay;
  return `<div class="bar" title="${d.day}: ${d.answered} answered, ${d.missed} missed">
    <div class="a" style="height:${a}px"></div>
    ${d.missed ? `<div class="m" style="height:${m}px"></div>` : ''}
    <div class="d">${d.day}</div></div>`;
}).join('');
$('#chartNote').textContent =
  `${weekA} answered, ${weekM} missed this week — ${pickRate}% picked up. Every missed call got a text back inside a minute.`;

$('#moneyMini').innerHTML = [
  ['Quoted, waiting on a yes', money(QUOTES.reduce((t,q)=>t+q.amount,0))],
  ['Booked and scheduled',     money(JOBS.filter(j=>j.step===2).reduce((t,j)=>t+j.value,0))],
  ['Invoiced, not yet paid',   money(owed)],
  ['Paid this month',          money(INVOICES.filter(i=>i.status==='paid').reduce((t,i)=>t+i.amount,0))],
].map(([l, v]) =>
  `<div class="row"><div class="main"><div class="name" style="font-weight:500;font-size:13.5px">${l}</div></div>
   <div class="right amt">${v}</div></div>`).join('');

$('#todayCrew').innerHTML = CREW.map(c =>
  `<div class="row"><div class="main"><div class="name">${c.name}</div>
   <div class="meta">${c.role} — ${c.today}</div></div>
   <div class="right"><span class="pill ${c.status==='on site'?'p-ok':'p-amber'}">${c.status}</span></div></div>`).join('');

/* ---------- calls ---------- */
$('#callKpis').innerHTML =
  kpi(`${pickRate}%`, 'of calls picked up this week', `${weekA} of ${weekA + weekM}`, 'good') +
  kpi(`${weekM}`, 'missed all week', 'all texted back within a minute', 'warn') +
  kpi(`${CALLS.filter(c=>c.job).length}`, 'calls that became a job', 'booked straight from the call') +
  kpi('0', 'calls you had to take yourself', 'while you were on site');

$('#callList').innerHTML = CALLS.map(c => {
  const ok = c.status === 'answered';
  return `<div class="row">
    <div class="icon ${ok?'i-ok':'i-miss'}">${ok?'✓':'!'}</div>
    <div class="main">
      <div class="name">${c.name}</div>
      <div class="meta">${c.phone}${c.street ? ' · ' + c.street : ''} · ${c.at}</div>
      <div class="body">${c.summary}</div>
      <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">
        <span class="pill ${ok?'p-ok':'p-miss'}">${ok ? 'Answered · ' + mins(c.secs) : 'Missed'}</span>
        ${c.textedBack ? '<span class="pill p-amber">Text-back sent</span>' : ''}
        ${c.job ? '<span class="pill p-grey">Made into a job</span>' : ''}
      </div>
    </div></div>`;
}).join('');

/* ---------- jobs ---------- */
function drawJobs() {
  $('#jobList').innerHTML = JOBS.map(j => `
    <div class="card" style="margin-bottom:10px">
      <div class="job-head">
        <div class="t">
          <div class="name" style="font-size:15px;font-weight:650">${j.type}</div>
          <div class="meta">${j.customer} · ${j.street}</div>
        </div>
        <div class="right amt">${money(j.value)}</div>
      </div>
      <div class="steps" data-job="${j.id}">
        ${STEPS.map((s, i) =>
          `<button class="step ${i < j.step ? 'done' : ''} ${i === j.step ? 'now' : ''}" data-i="${i}">${s}</button>`
        ).join('')}
      </div>
      <div class="job-note">${j.note}</div>
      <div class="job-foot"><span>${j.size}</span><span>${j.crew}</span><span>${j.when}</span></div>
    </div>`).join('');
}
drawJobs();

$('#jobList').addEventListener('click', (e) => {
  const b = e.target.closest('.step');
  if (!b) return;
  const job = JOBS.find(j => j.id === b.parentElement.dataset.job);
  job.step = Number(b.dataset.i);
  drawJobs();
});

/* ---------- money ---------- */
$('#moneyKpis').innerHTML =
  kpi(money(QUOTES.reduce((t,q)=>t+q.amount,0)), 'out in quotes', `${QUOTES.length} waiting on an answer`, 'warn') +
  kpi(money(owed), 'invoiced, unpaid', 'chased for you') +
  kpi(money(INVOICES.filter(i=>i.status==='paid').reduce((t,i)=>t+i.amount,0)), 'paid this month', 'cleared', 'good') +
  kpi(`${REVIEWS.length}`, 'review requests', 'sent as jobs finish');

$('#quoteList').innerHTML = QUOTES.map(q =>
  `<div class="row"><div class="main">
     <div class="name">${q.customer}</div>
     <div class="meta">${q.job} · ${q.sent}</div>
     ${q.chase !== '—' ? `<div class="body">${q.chase}</div>` : ''}
   </div><div class="right amt">${money(q.amount)}</div></div>`).join('');

const invPill = { paid:['p-ok','Paid'], due:['p-amber','Due'], deposit:['p-grey','Deposit in'], draft:['p-grey','Draft'] };
$('#invList').innerHTML = INVOICES.map(i => {
  const [cls, label] = invPill[i.status];
  return `<div class="row"><div class="main">
      <div class="name">${i.customer}</div>
      <div class="meta">${i.job} · ${i.due}</div>
      <div style="margin-top:7px"><span class="pill ${cls}">${label}</span></div>
    </div><div class="right amt">${money(i.amount)}</div></div>`;
}).join('');

$('#revList').innerHTML = REVIEWS.map(r =>
  `<div class="row"><div class="main"><div class="name">${r.customer}</div>
   <div class="meta">${r.at}</div></div>
   <div class="right"><span class="pill ${r.state==='sent'?'p-ok':'p-grey'}">${r.state}</span></div></div>`).join('');

/* ---------- crew ---------- */
$('#crewList').innerHTML = CREW.map(c =>
  `<div class="row"><div class="main"><div class="name">${c.name}</div>
   <div class="meta">${c.role}</div><div class="body">${c.today}</div></div>
   <div class="right"><span class="pill ${c.status==='on site'?'p-ok':'p-amber'}">${c.status}</span></div></div>`).join('');

$('#crewFeed').innerHTML = CREW_FEED.map(f =>
  `<div class="row"><div class="main"><div class="name">${f.who}
   <span style="color:var(--ink-3);font-weight:400;font-size:12.5px"> · ${f.at}</span></div>
   <div class="body">${f.text}</div></div></div>`).join('');

/* ---------- customers ---------- */
function drawCust(q = '') {
  const s = q.trim().toLowerCase();
  const list = CUSTOMERS.filter(c =>
    !s || c.name.toLowerCase().includes(s) || c.phone.includes(s) || c.street.toLowerCase().includes(s));
  $('#custList').innerHTML = list.length
    ? list.map(c => `<div class="row"><div class="main">
        <div class="name">${c.name}</div>
        <div class="meta">${c.phone} · ${c.street}</div>
        <div class="body">${c.jobs} job${c.jobs > 1 ? 's' : ''} · ${c.since}</div>
      </div><div class="right">${c.spent ? `<span class="amt">${money(c.spent)}</span>` : '—'}</div></div>`).join('')
    : `<div class="empty">Nobody by that name, phone or street.</div>`;
}
drawCust();
$('#custSearch').addEventListener('input', (e) => drawCust(e.target.value));
