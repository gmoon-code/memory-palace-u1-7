const KEY='memory-palace-v2:progress';
const HOUR=60*60*1000, DAY=24*HOUR;
function fresh(){return{activeUnit:'unit-1',activeJourney:'Z3',sceneByJourney:{Z3:0},review:[],storySeen:{},completedJourneys:{},encounteredObjects:{},version:3}}
export function loadState(){try{return{...fresh(),...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return fresh()}}
export function saveState(state){localStorage.setItem(KEY,JSON.stringify(state))}
export function sceneIndex(state,id){return Number(state.sceneByJourney?.[id]||0)}
export function setSceneIndex(state,id,index){state.sceneByJourney={...(state.sceneByJourney||{}),[id]:index};saveState(state)}
export function markSeen(state,journeyId,index){state.storySeen={...(state.storySeen||{}),[`${journeyId}:${index}`]:true};saveState(state)}
export function markJourneyComplete(state,journeyId){state.completedJourneys={...(state.completedJourneys||{}),[journeyId]:true};saveState(state)}
export function journeyProgress(state,journey){
 const seen=journey?Array.from({length:journey.scene_count||0},(_,i)=>state.storySeen?.[`${journey.palace_id}:${i}`]).filter(Boolean).length:0;
 return {seen,total:journey?.scene_count||0,complete:!!state.completedJourneys?.[journey?.palace_id]};
}
export function markEncountered(state,objectId){state.encounteredObjects={...(state.encounteredObjects||{}),[objectId]:true}}
export function scheduleReview(state,item,remembered){
  const now=Date.now(); const next={...item,type:item.type||'exact',dueAt:now+(remembered?DAY:5*60*1000),strength:remembered?Number(item.strength||0)+1:Number(item.strength||0)};
  const rest=(state.review||[]).filter(x=>x.objectId!==item.objectId); state.review=[...rest,next]; saveState(state);
}
export function scheduleEncounteredReview(state,item){
  markEncountered(state,item.objectId);
  if((state.review||[]).some(x=>x.objectId===item.objectId)){saveState(state);return}
  const unitId=item.unitId||'unit-1';
  const pending=(state.review||[]).filter(x=>(x.unitId||'unit-1')===unitId && x.type!=='mixed').length;
  const dayBand=Math.floor(pending/5);
  const withinDay=(pending%5)*90*60*1000;
  state.review=[...(state.review||[]),{...item,type:'exact',unitId,dueAt:Date.now()+18*HOUR+dayBand*DAY+withinDay,strength:0,source:'story'}];saveState(state);
}
export function scheduleEligibleMixedReviews(state,sets=[],unitId='unit-1'){
  if(!sets.length)return;
  const encountered=state.encounteredObjects||{};
  let changed=false;
  for(const set of sets){
    if(!(set.knowledge_ids||[]).every(id=>encountered[id]))continue;
    const objectId=`MIXED:${set.set_id}`;
    if((state.review||[]).some(x=>x.objectId===objectId))continue;
    state.review=[...(state.review||[]),{type:'mixed',unitId,objectId,setId:set.set_id,questionIndex:0,dueAt:Date.now()+Number(set.initial_delay_hours||48)*HOUR,strength:0,source:'mixed-discrimination'}];
    changed=true;
  }
  if(changed)saveState(state);
}
function belongsToUnit(x,unitId){return (x.unitId||'unit-1')===unitId}
export function dueReviews(state,limit=5,unitId='unit-1'){return(state.review||[]).filter(x=>belongsToUnit(x,unitId)&&Number(x.dueAt)<=Date.now()).sort((a,b)=>a.dueAt-b.dueAt).slice(0,limit)}
export function totalDue(state,unitId='unit-1'){return(state.review||[]).filter(x=>belongsToUnit(x,unitId)&&Number(x.dueAt)<=Date.now()).length}
export function completeReview(state,objectId,remembered){
  const existing=(state.review||[]).find(x=>x.objectId===objectId); if(!existing)return;
  scheduleReview(state,existing,remembered);
}
export function completeMixedReview(state,set,remembered){
  const objectId=`MIXED:${set.set_id}`;
  const existing=(state.review||[]).find(x=>x.objectId===objectId); if(!existing)return;
  const questions=set.questions||[]; let next={...existing};
  if(!remembered){next.dueAt=Date.now()+5*60*1000;next.strength=Math.max(0,Number(existing.strength||0)-1)}
  else if(Number(existing.questionIndex||0)+1<questions.length){next.questionIndex=Number(existing.questionIndex||0)+1;next.dueAt=Date.now()+DAY;next.strength=Number(existing.strength||0)+1}
  else{next.questionIndex=0;next.dueAt=Date.now()+7*DAY;next.strength=Number(existing.strength||0)+1}
  state.review=(state.review||[]).map(x=>x.objectId===objectId?next:x);saveState(state);
}
