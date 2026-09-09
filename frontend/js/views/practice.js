function esc(v=''){return String(v).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
export function practiceView(lab,index=0,revealed=false){
 const items=lab?.items||[]; const title=lab?.title||'Challenge Lab';
 if(!items.length)return `<main class="review-wrap"><section class="card review-empty"><span class="eyebrow">${esc(title)}</span><h2>No application challenges are available yet.</h2><button class="primary" data-action="home">Back to home</button></section></main>`;
 const i=Math.max(0,Math.min(index,items.length-1)),x=items[i];
 const answer=revealed?`<div class="answer-guide"><span class="eyebrow">Answer guide</span><p>${esc(x.answer_guide)}</p><p class="muted">Compare the reasoning, then try the next challenge from ordinary scientific information.</p></div>`:'';
 return `<main class="review-wrap"><section class="card practice-card"><div class="practice-head"><div><span class="eyebrow">${esc(title)} · ${i+1} of ${items.length}</span><h1>${esc(x.title)}</h1></div><span class="pill">${esc(x.domain)}</span></div><p class="practice-prompt">${esc(x.prompt)}</p><div class="row"><button class="primary" data-action="practice-reveal">Show answer guide</button><button class="secondary" data-action="practice-hint">Story hint</button></div><div id="practiceFeedback">${answer}</div><div class="story-actions"><button class="ghost" data-action="home">Leave challenge lab</button><button class="primary" data-action="practice-next">${i===items.length-1?'Start again':'Next challenge →'}</button></div></section></main>`;
}
