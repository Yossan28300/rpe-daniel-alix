(async()=>{
const $=id=>document.getElementById(id);
// Contenu éditorial de chaque page : modification depuis Pages CMS, sans changer le HTML.
const cmsPage=document.body.dataset.pageCms;
if(cmsPage && (location.protocol==='http:' || location.protocol==='https:')){
 try {
  const r=await fetch('data/contenu_'+cmsPage+'.json',{cache:'no-store'});
  if(r.ok){
   const values=await r.json();
   document.querySelectorAll('[data-cms-key]').forEach(el=>{
    const value=values[el.dataset.cmsKey];
    if(typeof value==='string')el.textContent=value;
   });
  }
 }catch(err){console.warn('Contenu éditorial indisponible',err)}
}

const old=window.RPE_CONFIG||{};
let c={...old};
let team=[...(old.titularMembers||[]).map(name=>({name,status:'Titulaire'})),...(old.substituteMembers||[]).map(name=>({name,status:'Suppléant'})),...(old.unassignedMembers||[]).map(name=>({name,status:'À confirmer'}))];
let news=old.news||[], docs=old.documents||[];
if(location.protocol==='http:'||location.protocol==='https:'){
  try{
    const paths=['data/parametres.json','data/equipe.json','data/actualites.json','data/documents.json'];
    const loaded=await Promise.all(paths.map(async path=>{const res=await fetch(path,{cache:'no-store'});if(!res.ok)throw Error('Fichier introuvable: '+path);return res.json()}));
    c={...c,...loaded[0]};team=loaded[1];news=loaded[2];docs=loaded[3];
  }catch(err){console.warn('Contenu temporairement indisponible; affichage de la version de secours.',err);}
}
function setText(id,value){const el=$(id);if(el&&value!==undefined&&value!==null)el.textContent=value}
setText('school-title',c.schoolName?'— '+c.schoolName:'— Notre école');
setText('footer-school',c.schoolName);setText('footer-city',c.city);setText('footer-year',c.schoolYear);
setText('team-description',c.teamIntro);setText('next-meeting',c.nextMeeting);setText('meeting-note',c.meetingNote);
if($('team-list')){
 const groups=[['Représentants titulaires','Titulaire'],['Représentants suppléants','Suppléant'],['Statut à confirmer','À confirmer']];
 const container=document.createElement('div');container.className='team-groups';
 for(const [title,status] of groups){const names=(Array.isArray(team)?team:[]).filter(m=>m.status===status&&m.name).map(m=>m.name);if(!names.length)continue;const sect=document.createElement('section');sect.className='team-group';const h=document.createElement('h3');h.textContent=title;const ul=document.createElement('ul');for(const name of names){const li=document.createElement('li');li.textContent=name;ul.appendChild(li)}sect.append(h,ul);container.appendChild(sect)}
 $('team-list').replaceChildren(container);
}
if($('documents')){
 const list=$('documents');list.replaceChildren();let count=0;
 for(const d of Array.isArray(docs)?docs:[]){const path=String(d.url||'');if(!(/^(https:\/\/|\/?documents\/)[^<>"']+\.pdf(?:\?[^<>"']*)?$/i.test(path)))continue;
 const article=document.createElement('div');article.className='docitem';const left=document.createElement('div');const strong=document.createElement('strong');strong.textContent='📄 '+(d.title||'Document PDF');left.appendChild(strong);if(d.date){const date=document.createElement('small');date.textContent=d.date;left.appendChild(date)}
 const a=document.createElement('a');a.className='btn teal';a.href=path;a.textContent='Télécharger le PDF ↓';a.setAttribute('download','');article.append(left,a);list.appendChild(article);count++;
 }
 if(!count)list.innerHTML='<div class="empty">Aucun PDF publié pour le moment.</div>';
}
if($('news-list')){const list=$('news-list');list.replaceChildren();const entries=Array.isArray(news)?news:[];for(const n of entries){const item=document.createElement('article');item.className='news';const date=document.createElement('small');date.className='muted';date.textContent=n.date||'';const h=document.createElement('h3');h.textContent=n.title||'';const p=document.createElement('p');p.textContent=n.text||'';item.append(date,h,p);list.appendChild(item)}if(!entries.length)list.innerHTML='<p class="muted">Aucune actualité publiée pour le moment.</p>'}
if($('contact-form')){
 if(c.contactEmail&&/^\S+@\S+\.\S+$/.test(c.contactEmail)){$('email-message').replaceChildren();$('email-message').append('Écrivez-nous à ');const a=document.createElement('a');a.href='mailto:'+c.contactEmail;a.textContent=c.contactEmail;$('email-message').append(a)}
 else{$('send-btn').disabled=true;$('send-btn').title='Adresse e-mail non renseignée';$('noemail').classList.remove('hide')}
 $('contact-form').addEventListener('submit',e=>{e.preventDefault();if(!c.contactEmail)return;const subject=$('subject').value.trim(),msg=$('message').value.trim();if(!subject||!msg)return;const body=[msg,'','---','Nom : '+($('sender').value.trim()||'Non indiqué'),'Email de réponse : '+($('reply').value.trim()||'Non indiqué')].join('\n');location.href='mailto:'+c.contactEmail+'?subject='+encodeURIComponent('[RPE] '+subject)+'&body='+encodeURIComponent(body)})
}
if(c.readyForPublication===true&&$('demo-note'))$('demo-note').classList.add('hide');
})();