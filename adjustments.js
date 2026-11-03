(() => {
 const defaults={rows:7,columns:18,size:100,x:0,y:0,font:100};
 const bounds={rows:[3,9],columns:[8,24],size:[60,150],x:[-25,25],y:[-25,25],font:[60,150]};
 const key='jiostar-globe-adjustments-v1';let settings={...defaults};
 try{const saved=JSON.parse(localStorage.getItem(key)||'{}');Object.keys(defaults).forEach(k=>{if(Number.isFinite(saved[k]))settings[k]=Math.round(Math.max(bounds[k][0],Math.min(bounds[k][1],saved[k])))})}catch{}
 const root=document.querySelector('[data-globe-gallery-init]'),panel=document.querySelector('#adjust-panel'),toggle=document.querySelector('#adjust-toggle');
 let timer;
 function apply(rebuild=false){
  root.style.transform=`translate(${settings.x}vw,${settings.y}vh) scale(${settings.size/100})`;
  document.documentElement.style.setProperty('--headline-adjust',settings.font/100);
  document.querySelectorAll('[data-setting]').forEach(input=>{const k=input.dataset.setting;input.value=settings[k];document.querySelector('#value-'+k).value=settings[k]+(k==='size'||k==='font'?'%':k==='x'?'vw':k==='y'?'vh':'')});
  document.querySelector('#tile-count').textContent=settings.rows*settings.columns+' cards';
  if(rebuild&&root.globeGallery)root.globeGallery.configure(settings);
  try{localStorage.setItem(key,JSON.stringify(settings))}catch{}
  clearTimeout(timer);timer=setTimeout(()=>{if(window.ScrollTrigger)ScrollTrigger.refresh()},150);
 }
 function close(){panel.close();toggle.setAttribute('aria-expanded','false');toggle.focus()}
 toggle.onclick=()=>{if(panel.open){close();return}panel.show();toggle.setAttribute('aria-expanded','true')};
 document.querySelector('#adjust-close').onclick=close;document.querySelector('#adjust-done').onclick=close;
 panel.addEventListener('cancel',()=>toggle.setAttribute('aria-expanded','false'));
 panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}});
 document.querySelectorAll('[data-setting]').forEach(input=>input.addEventListener('input',()=>{settings[input.dataset.setting]=Number(input.value);apply(['rows','columns'].includes(input.dataset.setting))}));
 document.querySelector('#adjust-reset').onclick=()=>{settings={...defaults};apply(true)};
 root.addEventListener('globe-ready',()=>apply(true));apply(!!root.globeGallery);
})();
