export async function getJSON(path){
  const res=await fetch(path);
  if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
export const api={
  course:()=>getJSON('/api/course'),
  units:()=>getJSON('/api/units'),
  unit:(unitId)=>getJSON(`/api/units/${encodeURIComponent(unitId)}`),
  journeys:(unitId='unit-1')=>getJSON(`/api/units/${encodeURIComponent(unitId)}/journeys`),
  journey:(unitId,id)=>getJSON(`/api/units/${encodeURIComponent(unitId)}/journeys/${encodeURIComponent(id)}`),
  object:(unitId,id)=>getJSON(`/api/units/${encodeURIComponent(unitId)}/objects/${encodeURIComponent(id)}`),
  applicationLab:(unitId='unit-1')=>getJSON(`/api/units/${encodeURIComponent(unitId)}/application-lab`),
  reviewManifest:(unitId)=>getJSON(`/api/units/${encodeURIComponent(unitId)}/review-manifest`),
  mixedDiscrimination:(unitId)=>getJSON(`/api/units/${encodeURIComponent(unitId)}/mixed-discrimination`),
};
