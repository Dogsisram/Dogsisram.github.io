const L=(key,fallback)=>(window.LOC&&window.LOC[key]!=null)?window.LOC[key]:fallback;
function applyLoc(){for(const el of document.querySelectorAll('[data-loc]')){const v=L(el.dataset.loc);if(v!=null)el.textContent=v;}for(const b of document.querySelectorAll('.hit-img'))b.style.background=`url('assets/buttons/${loadLang.current}/${b.dataset.img}') no-repeat center/100% 100%`;}
function loadLang(name){if(loadLang.current===name)return;const s=document.createElement('script');s.src='localization/'+name+'.js';s.onload=()=>{loadLang.current=name;applyLoc();route();updateLangUI();};document.head.appendChild(s);}
function updateLangUI(){for(const b of document.querySelectorAll('.lang-sub button')){b.firstChild.style.cssText='display:inline-block;padding:1px 7px;border-radius:999px;border:1px solid '+(b.dataset.lang===loadLang.current?'#fff':'transparent');}}
loadLang.current='english';
applyLoc();
const pages=['intro','home','about','projects','heart-of-chaos','what-can-i-do'];
function resize(){document.documentElement.style.setProperty('--scale',Math.min(innerWidth/1440,innerHeight/900));}
addEventListener('resize',resize);resize();
function route(){let id=location.hash.slice(1)||'intro';if(!pages.includes(id))id='intro';for(const page of document.querySelectorAll('.page'))page.hidden=page.id!==id;document.title=L('title.'+id,id)+' · Personal Archive';}
addEventListener('hashchange',route);route();
function hit(page,label,x,y,w,h,action,img){const b=document.createElement('button');b.className='hit'+(img?' hit-img':'');b.setAttribute('aria-label',label);Object.assign(b.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px',color:'transparent',background:img?`url('assets/buttons/${loadLang.current}/${img}') no-repeat center/100% 100%`:'transparent'});if(img)b.dataset.img=img;else b.textContent=label;b.onclick=typeof action==='string'?()=>location.hash=action:action;document.getElementById(page).append(b);return b;}
const dialog=document.getElementById('details');function show(title,text){dialog.querySelector('h2').textContent=title;dialog.querySelector('p').textContent=text;dialog.showModal();}document.getElementById('close-dialog').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
hit('home',L('home.enter','Enter his personal Archive'),447,541,546,52,'about','Enter button.png');hit('about',L('about.viewProjects','View Projects'),693,640,265,56,'projects','View projects.png');hit('about',L('about.whatCanIDo','What can I do'),971,640,265,56,'what-can-i-do','What can I do.png');hit('what-can-i-do',L('wcid.moreAboutMe','More about me'),808,647,292,56,'about','More about me.png');
function setMenu(p,open){const m=p.querySelector('.home-menu');const ov=p.querySelector('.menu-dim');const bi=p.querySelector('.home-btn-img');if(!open){const subs=[m.querySelector('.lang-sub'),m.querySelector('.pages-sub'),m.querySelector('.project-sub')];const rings=[m.querySelector('.lang-toggle'),m.querySelector('.pages-toggle'),m.querySelector('.project-toggle')];subs.forEach(s=>{if(s)s.style.display='none';});rings.forEach(r=>{if(r)r.style.borderColor='transparent';});m.style.opacity='0';ov.style.opacity='0';setTimeout(()=>{m.style.display='none';ov.style.display='none';},500);}else{m.style.display='block';ov.style.display='block';requestAnimationFrame(()=>{m.style.opacity='1';ov.style.opacity='1';});}if(bi)bi.style.zIndex=open?'50':'';}
function closeMenus(){for(const m of document.querySelectorAll('.home-menu'))setMenu(m.parentElement,false);}
document.addEventListener('click',e=>{if(!e.target.closest('.home-menu,.hit-home'))closeMenus();});
function homeMenu(page){
  const menu=document.createElement('div');
  menu.className='home-menu';
  menu.style.cssText='position:absolute;left:1153px;top:117px;width:100px;height:auto;background:#111;display:none;z-index:50;border:1px solid #fff;opacity:0;transition:opacity .5s ease';
  const itemStyle='display:flex;width:100%;height:44px;box-sizing:border-box;padding:0;background:none;border:0;border-bottom:1px solid #fff;color:#fff;font:500 15px/1.2 Inter,"Noto Sans",sans-serif;align-items:center;justify-content:center;cursor:pointer';
  const itemStyleLast=itemStyle.replace('border-bottom:1px solid #fff;','');
  const ringStyle='display:inline-block;padding:1px 7px;border-radius:999px;border:1px solid transparent;white-space:nowrap';
  const subWrap='position:absolute;left:100%;top:0;width:120px;height:auto;background:#111;display:none;border:1px solid #fff';

  const pEl=document.getElementById(page);
  const ov=document.createElement('div');
  ov.className='menu-dim';
  ov.style.cssText='position:absolute;left:0;top:0;width:1440px;height:900px;background:rgba(0,0,0,.55);display:none;z-index:40;opacity:0;transition:opacity .5s ease';
  pEl.appendChild(ov);
  const bi=pEl.querySelector('[data-name="Rectangle"][style*="left:1153px"]');
  if(bi)bi.classList.add('home-btn-img');

  function mkBtn(key,fallback,fn,isLast){
    const b=document.createElement('button');
    const s=document.createElement('span');
    s.dataset.loc=key;s.textContent=L(key,fallback);
    s.style.cssText=ringStyle;
    b.appendChild(s);b.style.cssText=isLast?itemStyleLast:itemStyle;
    b.onclick=fn;menu.appendChild(b);return b;
  }
  function mkSubBtn(key,fallback,hash,isLast){
    const b=document.createElement('button');
    const s=document.createElement('span');
    s.dataset.loc=key;s.textContent=L(key,fallback);
    s.style.cssText=ringStyle;
    b.appendChild(s);b.style.cssText=isLast?itemStyleLast:itemStyle;
    b.onclick=()=>{setMenu(pEl,false);location.hash=hash;};
    return b;
  }
  function mkLangBtn(name,label,isLast){
    const b=document.createElement('button');
    b.dataset.lang=name;
    const s=document.createElement('span');s.textContent=label;
    b.appendChild(s);b.style.cssText=isLast?itemStyleLast:itemStyle;
    b.onclick=()=>loadLang(name);
    return b;
  }

  // Return to home
  mkBtn('menu.returnHome','Home',()=>{setMenu(pEl,false);location.hash='home';});

  // Language submenu
  const langSub=document.createElement('div');
  langSub.className='lang-sub';
  langSub.style.cssText=subWrap;
  langSub.appendChild(mkLangBtn('english','English'));
  langSub.appendChild(mkLangBtn('simpchinese','Chinese',true));

  // Pages submenu
  const pagesSub=document.createElement('div');
  pagesSub.className='pages-sub';
  pagesSub.style.cssText=subWrap;

  // Nested Project submenu (inside pages)
  const projectSub=document.createElement('div');
  projectSub.className='project-sub';
  projectSub.style.cssText=subWrap;

  // Project toggle inside pages
  const projectBtn=document.createElement('button');
  const projectSpan=document.createElement('span');
  projectSpan.dataset.loc='menu.page.projects';
  projectSpan.textContent=L('menu.page.projects','Projects');
  projectSpan.style.cssText=ringStyle+'border:1px solid transparent';
  projectSpan.classList.add('project-toggle');
  projectBtn.appendChild(projectSpan);
  projectBtn.style.cssText=itemStyle;
  projectBtn.onclick=()=>{
    const show=projectSub.style.display==='none';
    projectSub.style.display=show?'block':'none';
    projectSpan.style.borderColor=show?'#fff':'transparent';
    if(show){
      projectSub.style.top=projectBtn.offsetTop+'px';
      projectSub.style.left=pagesSub.offsetWidth+'px';
    }
  };

  // Build pages submenu
  pagesSub.appendChild(mkSubBtn('menu.page.home','Home','home'));
  pagesSub.appendChild(mkSubBtn('menu.page.about','About me','about'));
  pagesSub.appendChild(mkSubBtn('menu.page.catalogue','Catalogue','projects'));
  pagesSub.appendChild(projectBtn);
  projectSub.appendChild(mkSubBtn('menu.page.project1','Project 1','heart-of-chaos',true));
  pagesSub.appendChild(projectSub);
  pagesSub.appendChild(mkSubBtn('menu.page.wcid','What can I do','what-can-i-do',true));

  // Mutual exclusivity for Language and Pages toggles
  const allToggles=[];
  function makeToggle(btn,sub,ring){
    const t={btn,sub,ring};
    allToggles.push(t);
    btn.onclick=()=>{
      const show=sub.style.display==='none';
      allToggles.forEach(other=>{
        if(other!==t){
          other.sub.style.display='none';
          if(other.ring)other.ring.style.borderColor='transparent';
        }
      });
      sub.style.display=show?'block':'none';
      ring.style.borderColor=show?'#fff':'transparent';
      if(show){
        sub.style.top=btn.offsetTop+'px';
        sub.style.left=menu.offsetWidth+'px';
      }
    };
  }

  const langBtn=mkBtn('menu.switchLanguage','Language',()=>{});
  langBtn.firstChild.classList.add('lang-toggle');
  makeToggle(langBtn,langSub,langBtn.firstChild);

  const pagesBtn=mkBtn('menu.pages','Pages',()=>{},true);
  pagesBtn.firstChild.classList.add('pages-toggle');
  makeToggle(pagesBtn,pagesSub,pagesBtn.firstChild);

  menu.appendChild(langSub);
  menu.appendChild(pagesSub);
  pEl.appendChild(menu);

  const hitBtn=hit(page,L('common.home','Home'),1153,67,100,50,()=>setMenu(pEl,menu.style.display==='none'));
  hitBtn.classList.add('hit-home');
}
for(const page of pages){if(page==='intro')continue;homeMenu(page);hit(page,L('common.donateAction','Donate to author'),1197,861,243,39,()=>show(L('dialog.support.title','Support the author'),L('dialog.support.body','Thank you for your interest in supporting Mars Guo. A donation link has not been provided for this archive.')));}
function initIntro(){const stamp=document.getElementById('stamp');const target=document.getElementById('stamp-target');const hint=document.getElementById('intro-hint');if(!stamp||!target)return;let drag=false,dx=0,dy=0,lastMove=0;const scale=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale'))||1;const toDesign=(cx,cy)=>{const r=document.getElementById('archive').getBoundingClientRect();const s=scale();return{x:(cx-r.left)/s,y:(cy-r.top)/s};};const check=()=>{const sx=parseFloat(stamp.style.left),sy=parseFloat(stamp.style.top),sw=stamp.offsetWidth,sh=stamp.offsetHeight;const tx=target.offsetLeft,ty=target.offsetTop,tw=target.offsetWidth,th=target.offsetHeight;const over=!(sx+sw<tx||sx>tx+tw||sy+sh<ty||sy>ty+th);target.style.borderColor=over?'#2ecc71':'#fff';target.style.backgroundColor=over?'rgba(46,204,113,.12)':'transparent';stamp.dataset.over=over?'1':'';stamp.style.cursor=over?'pointer':'grab';};stamp.addEventListener('mousedown',e=>{if(stamp.dataset.confirming)return;const p=toDesign(e.clientX,e.clientY);dx=p.x-parseFloat(stamp.style.left);dy=p.y-parseFloat(stamp.style.top);drag=true;stamp.style.cursor='grabbing';e.preventDefault();});document.addEventListener('mousemove',e=>{if(!drag)return;lastMove=Date.now();const p=toDesign(e.clientX,e.clientY);stamp.style.left=Math.max(0,Math.min(1440-stamp.offsetWidth,p.x-dx))+'px';stamp.style.top=Math.max(0,Math.min(900-stamp.offsetHeight,p.y-dy))+'px';check();});document.addEventListener('mouseup',()=>{drag=false;stamp.style.cursor=stamp.dataset.over?'pointer':'grab';});stamp.addEventListener('click',e=>{if(!stamp.dataset.over||stamp.dataset.confirming)return;stamp.dataset.confirming='1';const intro=document.getElementById('intro');const home=document.getElementById('home');intro.style.transition='opacity 1.8s ease';intro.style.opacity='0';home.hidden=false;home.style.transition='opacity 1.8s ease';home.style.opacity='0';requestAnimationFrame(()=>{home.style.opacity='1';});target.style.opacity='0';stamp.style.transform='scale(1.08)';if(hint)hint.style.opacity='0';setTimeout(()=>{home.style.opacity='';location.hash='home';intro.hidden=true;intro.style.opacity='';home.style.transition='';},1800);});check();}
initIntro();
updateLangUI();
hit('projects',L('projects.heartOfChaos','Heart of Chaos'),687,243,572,85,'heart-of-chaos','Projects 1.png');hit('projects',L('projects.song','宋朝可怜人的友谊'),680,435,572,85,()=>show(L('dialog.song.title','宋朝可怜人的友谊'),L('dialog.song.body','Exploring the Poetry of Huang Tingjian. Additional project content has not been provided.')),'Projects 2.png');hit('projects',L('projects.industry','Industrial Uprising'),660,628,611,85,()=>show(L('dialog.industry.title','Industrial Uprising'),L('dialog.industry.body','A game about the development of industry. Additional project content has not been provided.')),'Projects 3.png');hit('heart-of-chaos',L('hoc.seeMore','See more'),847,627,265,56,'projects','See more.png');
['72:737','72:796','72:792','72:788','72:858'].forEach(id=>{const e=document.querySelector(`[data-node-id="${id}"]`);if(e)e.style.display='none';});['72:830','72:831'].forEach(id=>{const e=document.querySelector(`[data-node-id="${id}"]`);if(e)e.style.display='none';});
addEventListener('keydown',e=>{if(dialog.open)return;const n=pages.indexOf(location.hash.slice(1)||'home');if(e.key==='ArrowRight'&&n<pages.length-1)location.hash=pages[n+1];if(e.key==='ArrowLeft'&&n>0)location.hash=pages[n-1];});
