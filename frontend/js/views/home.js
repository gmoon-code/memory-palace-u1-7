function esc(v=''){return String(v).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
function guideName(j){return typeof j.guide==='object'?j.guide.name:j.guide||'Your guide'}
function statusText(u){
 if(u.status==='STUDENT_READY')return 'Student ready';
 if(String(u.status||'').includes('F4G'))return 'All 7 journeys narrative preview';
 if(String(u.status||'').includes('F4F'))return 'Journeys 1–6 narrative preview';
 if(String(u.status||'').includes('F4E'))return 'Journeys 1–5 narrative preview';
 if(String(u.status||'').includes('F4D'))return 'Journeys 1–4 narrative preview';
 if(String(u.status||'').includes('F4C'))return 'Journeys 1–3 narrative preview';
 if(String(u.status||'').includes('F4B'))return 'Journeys 1–2 narrative preview';
 if(String(u.status||'').includes('F4A'))return 'Journey 1 narrative preview';
 if(String(u.status||'').includes('F3'))return 'Scene briefs locked';
 if(String(u.status||'').includes('F2'))return 'Learning architecture locked';
 if(String(u.status||'').includes('F1'))return 'Science locked';
 if(u.status==='SOURCE_AVAILABLE_NOT_MIGRATED')return 'Source ready · content build not started';
 return esc(u.status||'Planned');
}
export function homeView(course,unit,journeys,state,dueCount=0){
 const active=journeys.find(j=>j.palace_id===state.activeJourney)||journeys[0];
 const idx=Number(state.sceneByJourney?.[active?.palace_id]||0);
 const continueLabel=active?(idx>0?`Continue ${esc(active.story_title)}`:`Enter ${esc(active.story_title)}`):'No journey released yet';
 const cards=journeys.map(j=>{
   const seen=Array.from({length:j.scene_count},(_,i)=>state.storySeen?.[`${j.palace_id}:${i}`]).filter(Boolean).length;
   const done=!!state.completedJourneys?.[j.palace_id];
   const pct=j.scene_count?Math.round((seen/j.scene_count)*100):0;
   return `<article class="card journey-card"><div class="journey-card-top"><span class="eyebrow">${esc(j.palace_name)}</span><span class="pill">${done?'Complete':seen?`${pct}%`: `${j.estimated_minutes} min`}</span></div><h3>${esc(j.story_title)}</h3><p>${esc(j.tagline)}</p><div class="journey-meta"><span>${j.scene_count} locations</span><span>${j.checkpoint_count} optional recalls</span><span>Guide · ${esc(guideName(j))}</span></div><button class="${seen?'primary':'secondary'}" data-action="learn" data-id="${esc(j.palace_id)}">${done?'Walk it again':seen?'Continue journey':'Begin journey'}</button></article>`;
 }).join('');
 const roadmap=(course?.units||[]).filter(u=>u.unit_id!==unit?.unit_id).map(u=>`<div class="roadmap-row"><span>Unit ${u.number}</span><strong>${esc(u.title)}</strong><em>${statusText(u)}</em>${u.status==='STUDENT_READY'?`<button class="ghost unit-open" data-action="switch-unit" data-unit="${esc(u.unit_id)}">Open</button>`:''}</div>`).join('');
 const isPreview=String(unit?.status||'').includes('F4');
 const metrics=unit?.unit_id==='unit-1'
  ? `<div class="metric-grid"><div class="metric"><strong>9</strong><span>palaces</span></div><div class="metric"><strong>207</strong><span>student-runtime objects</span></div><div class="metric"><strong>229</strong><span>canonical records</span></div></div>`
  : `<div class="metric-grid"><div class="metric"><strong>${unit?.polished_journeys||journeys.length||0}</strong><span>guided journeys</span></div><div class="metric"><strong>${unit?.polished_scenes||journeys.reduce((a,j)=>a+j.scene_count,0)}</strong><span>story locations</span></div><div class="metric"><strong>${unit?.canonical_records||142}</strong><span>accounted records</span></div></div>`;
 const challenge=(unit?.application_challenges||0)>0?`<section class="card challenge-strip"><div><span class="eyebrow">After the stories</span><h2>Unit ${unit.number} Challenge Lab</h2><p>Short applications stay outside the palace so you practice using the science without depending on the story.</p></div><div class="challenge-side"><strong>${unit.application_challenges} challenges</strong><span>One at a time</span><button class="secondary" data-action="practice">Open challenge lab</button></div></section>`:'';
 return `<main class="stack">
  ${isPreview?`<section class="preview-banner card"><strong>Unit ${esc(unit?.number||'')} narrative preview</strong><span>Only the polished journeys are visible. The remaining journeys stay hidden until they pass the same prose QA.</span></section>`:''}
  <section class="card hero"><div><span class="eyebrow">AP Biology · Unit ${esc(unit?.number||'')} · ${esc(unit?.title||'')}</span><h1>${isPreview?'Build the science in your mind.':'One vivid journey at a time.'}</h1><p>${isPreview?`Follow the polished Unit ${esc(unit?.number||'')} preview journeys. Every concept is introduced through a stable location, visible scientific action, and a causal reason to continue.`:'Choose a palace and follow the story. Every location has a clear physical layout, recurring characters, and scientific actions that make the terms mean something before you review them.'}</p><div class="row">${active?`<button class="primary" data-action="learn" data-id="${esc(active.palace_id)}">${continueLabel}</button>`:''}<button class="secondary" data-action="review">Review ${dueCount?`${dueCount} due memories`:'memories'}</button></div></div><aside class="hero-side"><span class="eyebrow">${isPreview?'Unit '+esc(unit?.number||'')+' narrative preview':'Unit '+esc(unit?.number||'')+' live'}</span><strong>${journeys.length} ${journeys.length===1?'guided journey':'connected journeys'}</strong><p class="muted">${isPreview?`${unit?.polished_scenes||journeys.reduce((a,j)=>a+j.scene_count,0)} polished locations · ${journeys.reduce((a,j)=>a+j.checkpoint_count,0)} optional first-exposure recalls · scientific source lock preserved.`:'Learn through a small number of coherent routes while the deeper mastery system stays behind the interface.'}</p>${metrics}</aside></section>
  <section class="library-section"><div class="library-heading"><div><span class="eyebrow">Unit ${esc(unit?.number||'')} journey library</span><h2>${journeys.length?'Choose the place you want to enter':'No student journey released yet'}</h2></div><p>${isPreview?`${journeys.length} polished ${journeys.length===1?'journey is':'journeys are'} available for narrative-quality review. The remaining journeys stay blocked until they pass the same prose QA.`:'Each palace is independent enough to study in class order, but the science remains connected across the unit.'}</p></div><div class="journey-list">${cards}</div></section>
  ${challenge}
  <details class="card roadmap"><summary><span><span class="eyebrow">AP Biology expansion</span><strong>Course development status</strong></span><span>⌄</span></summary><div class="roadmap-list">${roadmap}</div></details>
 </main>`
}
