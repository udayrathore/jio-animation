// Page integration for the supplied Osmo Globe Gallery.
(async function(){
const images=await fetch('images.json').then(r=>r.json());
const root=document.querySelector('[data-globe-gallery-init]'),stage=document.querySelector('.stage'),index=document.querySelector('.index'),dialog=document.querySelector('dialog');
let selected=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,grid=false,scrollScene;
function sync(){if(root.globeGallery)root.globeGallery.paused=paused||grid||dialog.open;document.querySelector('#pause').textContent=paused?'Resume motion':'Pause motion';document.querySelector('#pause').setAttribute('aria-pressed',String(paused))}
function open(i){selected=(i+images.length)%images.length;dialog.querySelector('img').src=images[selected].src;dialog.querySelector('img').alt=images[selected].title;dialog.querySelector('.caption span').textContent=images[selected].title;if(!dialog.open)dialog.showModal();sync()}
images.forEach((im,i)=>{const card=document.createElement('button'),img=document.createElement('img'),label=document.createElement('span');img.src=im.src;img.alt=im.title;label.textContent=String(i+1).padStart(2,'0')+' / '+im.title;card.append(img,label);card.onclick=()=>open(i);index.append(card)});
document.querySelector('#count').textContent=images.length+' STORIES / ONE GLOBE';
dialog.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('close',sync);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.querySelector('#detail-prev').onclick=()=>open(selected-1);document.querySelector('#detail-next').onclick=()=>open(selected+1);
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')open(selected-1);if(e.key==='ArrowRight')open(selected+1)});
document.querySelector('#pause').onclick=()=>{paused=!paused;sync()};
document.querySelector('#view').onclick=()=>{grid=!grid;if(scrollScene&&grid)scrollScene.scrollTrigger.disable(true);index.hidden=!grid;stage.hidden=grid;stage.style.display=grid?'none':'';if(scrollScene&&!grid)scrollScene.scrollTrigger.enable();document.querySelector('#view').textContent=grid?'View globe ↗':'View index ↗';sync();if(window.ScrollTrigger)ScrollTrigger.refresh()};
if(!window.gsap){stage.style.display='none';index.hidden=false;document.querySelector('#status').textContent='Motion could not load. The image index is available.';return}
initGlobeGallery();sync();
// Keep source duplicates inert; the index provides access to every original image.
let dragged=false,startX=0,lastX=0,activePointer=null;
root.style.touchAction='pan-y';root.tabIndex=0;root.setAttribute('aria-label','Globe gallery. Drag or use left and right arrow keys to rotate.');
root.addEventListener('pointerdown',e=>{if(e.button!==0)return;activePointer=e.pointerId;startX=lastX=e.clientX;dragged=false;root.globeGallery.paused=true});
window.addEventListener('pointermove',e=>{if(e.pointerId!==activePointer)return;if(Math.abs(e.clientX-startX)>5)dragged=true;if(dragged){root.globeGallery.turn((e.clientX-lastX)*.25);lastX=e.clientX}});
function release(e){if(e.pointerId===activePointer){activePointer=null;sync()}}
window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();root.globeGallery.turn(e.key==='ArrowLeft'?-20:20)}});
root.addEventListener('click',e=>{const card=e.target.closest('[data-image-index]');if(card&&!dragged)open(Number(card.dataset.imageIndex))});
document.querySelector('#prev').onclick=()=>root.globeGallery.turn(-20);document.querySelector('#next').onclick=()=>root.globeGallery.turn(20);
if(window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);scrollScene=gsap.timeline({scrollTrigger:{trigger:stage,start:'center center',end:()=>'+='+Math.round(innerHeight*.85),pin:true,pinSpacing:true,scrub:.6,anticipatePin:1,invalidateOnRefresh:true}}).to('.globe-zoom',{scale:1.3,duration:1,ease:'none'}).to({},{duration:.2});ScrollTrigger.refresh()}
})();
const searchToggle=document.querySelector('#search-toggle'),searchBar=document.querySelector('.search-bar'),searchInput=document.querySelector('#search');
searchToggle.onclick=()=>{const show=searchBar.hidden;searchBar.hidden=!show;searchToggle.setAttribute('aria-expanded',String(show));if(show){if(document.querySelector('.index').hidden)document.querySelector('#view').click();searchInput.focus()}else{searchInput.value='';searchInput.dispatchEvent(new Event('input'))}};
searchInput.oninput=()=>{const query=searchInput.value.toLowerCase().trim();let found=0;document.querySelectorAll('.index button').forEach(card=>{card.hidden=!card.textContent.toLowerCase().includes(query);if(!card.hidden)found++});document.querySelector('#search-result').textContent=found+(found===1?' story':' stories')};
const menuToggle=document.querySelector('#menu-toggle'),mainMenu=document.querySelector('#main-menu');
function closeMenu(){mainMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false')}
menuToggle.onclick=()=>{const opening=mainMenu.hidden;mainMenu.hidden=!opening;menuToggle.setAttribute('aria-expanded',String(opening))};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mainMenu.hidden){closeMenu();menuToggle.focus()}});
document.addEventListener('click',e=>{if(!mainMenu.hidden&&!e.target.closest('header'))closeMenu()});
mainMenu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
let textScale=1;
document.querySelectorAll('[data-text-size]').forEach(button=>button.onclick=()=>{const action=button.dataset.textSize;textScale=action==='reset'?1:Math.max(.85,Math.min(1.3,textScale+(action==='increase'?.1:-.1)));document.documentElement.style.setProperty('--text-scale',textScale);if(window.ScrollTrigger)ScrollTrigger.refresh()});
document.querySelector('#contrast').onclick=e=>{const enabled=document.body.classList.toggle('high-contrast');e.currentTarget.setAttribute('aria-pressed',String(enabled))};
