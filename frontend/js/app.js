import {api} from './api.js';
import {loadState,saveState,sceneIndex,setSceneIndex,markSeen,markJourneyComplete,markEncountered,scheduleReview,scheduleEncounteredReview,scheduleEligibleMixedReviews,dueReviews,totalDue,completeReview,completeMixedReview} from './state.js';
import {speak,stopSpeech} from './audio.js';
import {homeView} from './views/home.js';
import {learnView,sceneSpeech} from './views/learn.js';
import {reviewView} from './views/review.js';
import {practiceView} from './views/practice.js';

const root=document.querySelector('#app');
const state=loadState();
let course=null,unit=null,journeys=[],activeJourney=null,applicationLab=null,reviewManifest={targets:[]},mixedData={sets:[]};
let practiceIndex=0,practiceRevealed=false,view='home',recallOpen=false,mixedPending=null;
function shell(content){return `<div class="shell"><header class="topbar"><div class="brand">Memory Palace <span>AP Biology</span></div><nav class="nav"><button data-nav="home" class="${view==='home'?'active':''}">Home</button><button data-nav="learn" class="${view==='learn'?'active':''}">Learn</button><button data-nav="review" class="${view==='review'?'active':''}">Review</button></nav></header>${content}</div>`}
function currentUnitId(){return state.activeUnit||'unit-1'}
function targetMap(){return new Map((reviewManifest?.targets||[]).map(x=>[x.knowledge_id,x]))}
async function render(){
 if(view==='home')root.innerHTML=shell(homeView(course,unit,journeys,state,totalDue(state,currentUnitId())));
 if(view==='learn'&&activeJourney)root.innerHTML=shell(learnView(activeJourney,sceneIndex(state,activeJourney.palace_id),recallOpen));
 if(view==='review')root.innerHTML=shell(reviewView(dueReviews(state,5,currentUnitId()),totalDue(state,currentUnitId()),mixedData?.sets||[]));
 if(view==='practice')root.innerHTML=shell(practiceView(applicationLab,practiceIndex,practiceRevealed));
 bind();
 centerCurrentRoute();
}
function centerCurrentRoute(){
 const strip=document.querySelector('.route-strip'); const current=strip?.querySelector('.route-node.current');
 if(!strip||!current)return;
 const target=current.offsetLeft-(strip.clientWidth-current.clientWidth)/2;
 strip.scrollLeft=Math.max(0,target);
}
async function loadUnit(unitId){
 state.activeUnit=unitId; unit=await api.unit(unitId); ({guided_journeys:journeys}=await api.journeys(unitId));
 applicationLab=await api.applicationLab(unitId);
 reviewManifest=await api.reviewManifest(unitId);
 mixedData=await api.mixedDiscrimination(unitId);
 if(!journeys.some(j=>j.palace_id===state.activeJourney))state.activeJourney=journeys[0]?.palace_id||null;
 activeJourney=null; saveState(state);
}
async function switchUnit(unitId){
 stopSpeech(); recallOpen=false; mixedPending=null; view='home';
 await loadUnit(unitId);
 const u=new URL(location.href); if(unitId==='unit-1')u.searchParams.delete('unit');else u.searchParams.set('unit',unitId); history.replaceState({},'',u);
 await render();
}
async function openJourney(id=state.activeJourney||journeys[0]?.palace_id){
 if(!id)return;
 activeJourney=await api.journey(currentUnitId(),id);state.activeJourney=id;saveState(state);view='learn';recallOpen=false;render();
}
function currentScene(){return activeJourney.scenes[sceneIndex(state,activeJourney.palace_id)]}
async function showHint(objectId,target='recallHint'){
 const scene=currentScene();const beat=(scene.story_beats||[]).find(x=>x.object_id===objectId);const obj=await api.object(currentUnitId(),objectId);const host=document.getElementById(target);const hint=scene.checkpoint_hint||beat?.hint||obj.mnemonic_actor_or_object||obj.phonological_keyword||'Return to the scene image.';const answer=scene.checkpoint_answer||beat?.term||obj.canonical_term;if(host)host.innerHTML=`<div class="hint"><span class="eyebrow">One story hint</span><p>${hint}</p><strong>Answer · ${answer}</strong></div>`;return {...obj,storyHint:hint,storyAnswer:answer}
}
function scheduleSceneMemories(scene){
 const unitId=currentUnitId(); const map=targetMap();
 for(const beat of (scene.story_beats||[]))markEncountered(state,beat.object_id);
 const beats=(scene.story_beats||[]).filter(b=>b.exact_name);
 const targets=beats.length?beats:(scene.story_beats||[]).slice(0,1);
 targets.forEach(beat=>{
   const locked=map.get(beat.object_id);
   scheduleEncounteredReview(state,{unitId,objectId:beat.object_id,journeyId:activeJourney.palace_id,prompt:locked?.prompt||`What term or idea matches this scientific meaning? ${beat.science}`,hint:locked?.hint||beat.hint||'Picture the defining action from the story.',answer:locked?.target_answer||beat.term});
 });
 scheduleEligibleMixedReviews(state,mixedData?.sets||[],unitId);
 saveState(state);
}
function bind(){
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{const v=b.dataset.nav;if(v==='learn')openJourney(state.activeJourney||journeys[0]?.palace_id);else{view=v;stopSpeech();render()}});
 document.querySelectorAll('[data-action="home"]').forEach(b=>b.onclick=()=>{view='home';stopSpeech();render()});
 document.querySelectorAll('[data-action="learn"]').forEach(b=>b.onclick=()=>openJourney(b.dataset.id));
 document.querySelectorAll('[data-action="switch-unit"]').forEach(b=>b.onclick=()=>switchUnit(b.dataset.unit));
 document.querySelectorAll('[data-action="review"]').forEach(b=>b.onclick=()=>{view='review';mixedPending=null;render()});
 document.querySelectorAll('[data-action="practice"]').forEach(b=>b.onclick=()=>{practiceIndex=0;practiceRevealed=false;view='practice';render()});
 document.querySelector('[data-action="practice-reveal"]')?.addEventListener('click',()=>{practiceRevealed=true;render()});
 document.querySelector('[data-action="practice-hint"]')?.addEventListener('click',()=>{const x=applicationLab?.items?.[practiceIndex];const host=document.getElementById('practiceFeedback');if(host)host.innerHTML=`<div class="hint"><span class="eyebrow">Story hint</span><p>${x?.story_hint||'Return to the relevant story scene.'}</p></div>`});
 document.querySelector('[data-action="practice-next"]')?.addEventListener('click',()=>{practiceIndex=(practiceIndex+1)%(applicationLab?.items?.length||1);practiceRevealed=false;render()});
 document.querySelector('[data-action="listen"]')?.addEventListener('click',()=>{const ok=speak(sceneSpeech(activeJourney,sceneIndex(state,activeJourney.palace_id)));const status=document.getElementById('audioStatus');if(status)status.textContent=ok?'Reading this scene aloud.':'Text-to-speech is unavailable in this browser.'});
 document.querySelector('[data-action="stop-audio"]')?.addEventListener('click',()=>{stopSpeech();const status=document.getElementById('audioStatus');if(status)status.textContent='Audio stopped.'});
 document.querySelector('[data-action="open-recall"]')?.addEventListener('click',()=>{recallOpen=true;stopSpeech();render()});
 document.querySelector('[data-action="cancel-recall"]')?.addEventListener('click',()=>{recallOpen=false;render()});
 document.querySelector('[data-action="hint"]')?.addEventListener('click',async e=>{const obj=await showHint(e.currentTarget.dataset.object);const scene=currentScene();scheduleReview(state,{unitId:currentUnitId(),objectId:obj.memory_object_id,journeyId:activeJourney.palace_id,prompt:scene.checkpoint_prompt,hint:obj.storyHint,answer:obj.storyAnswer},false)});
 document.querySelector('[data-action="remembered"]')?.addEventListener('click',async e=>{const obj=await api.object(currentUnitId(),e.currentTarget.dataset.object);const scene=currentScene();const beat=(scene.story_beats||[]).find(x=>x.object_id===obj.memory_object_id);scheduleReview(state,{unitId:currentUnitId(),objectId:obj.memory_object_id,journeyId:activeJourney.palace_id,prompt:scene.checkpoint_prompt,hint:scene.checkpoint_hint||beat?.hint||'Return to the story scene.',answer:scene.checkpoint_answer||beat?.term||obj.canonical_term},true);nextScene()});
 document.querySelector('[data-action="next-scene"]')?.addEventListener('click',nextScene);
 document.querySelector('[data-action="review-hint"]')?.addEventListener('click',e=>{const x=dueReviews(state,5,currentUnitId()).find(i=>i.objectId===e.currentTarget.dataset.object);const host=document.getElementById('reviewFeedback');if(host)host.innerHTML=`<div class="hint"><strong>Hint</strong> · ${x?.hint||'Return to the story scene.'}<br/><strong>Answer</strong> · ${x?.answer||''}<div style="margin-top:12px"><button class="primary" data-action="review-next">Continue review</button></div></div>`;completeReview(state,e.currentTarget.dataset.object,false);document.querySelector('[data-action="review-next"]')?.addEventListener('click',()=>render())});
 document.querySelector('[data-action="review-remembered"]')?.addEventListener('click',e=>{completeReview(state,e.currentTarget.dataset.object,true);render()});
 document.querySelectorAll('[data-action="mixed-choice"]').forEach(b=>b.onclick=()=>{
   const set=(mixedData?.sets||[]).find(s=>s.set_id===b.dataset.set); const due=dueReviews(state,5,currentUnitId())[0]; const q=set?.questions?.[Number(due?.questionIndex||0)]; if(!set||!q)return;
   const correct=b.dataset.choice===q.answer; mixedPending={set,correct};
   document.querySelectorAll('[data-action="mixed-choice"]').forEach(x=>x.disabled=true);
   const host=document.getElementById('reviewFeedback'); if(host)host.innerHTML=`<div class="review-feedback"><strong>${correct?'Correct':'Not yet'}</strong><p>${q.explanation}</p>${!correct?`<p><strong>Answer · ${q.answer}</strong></p>`:''}<button class="primary" data-action="mixed-next">Continue review</button></div>`;
   document.querySelector('[data-action="mixed-next"]')?.addEventListener('click',()=>{completeMixedReview(state,set,correct);mixedPending=null;render()});
 });
}
function nextScene(){
 const id=activeJourney.palace_id;let i=sceneIndex(state,id);const scene=activeJourney.scenes[i];markSeen(state,id,i);scheduleSceneMemories(scene);
 if(i>=activeJourney.scenes.length-1){markJourneyComplete(state,id);setSceneIndex(state,id,0);view='home';recallOpen=false;stopSpeech();render();return}
 setSceneIndex(state,id,i+1);recallOpen=false;stopSpeech();render();
}
async function boot(){try{course=await api.course();const requested=new URLSearchParams(location.search).get('unit');await loadUnit(requested||state.activeUnit||'unit-1');await render()}catch(err){root.innerHTML=`<div class="shell"><section class="card" style="padding:28px"><h1>Could not start Memory Palace V2</h1><p>${err.message}</p><p>Run <code>python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload</code>.</p></section></div>`}}
boot();
