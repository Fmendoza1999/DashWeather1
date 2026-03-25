// ═══════════════════════════════════════════════════════
//  GLOBE.JS — 3D Canvas Globe Engine
// ═══════════════════════════════════════════════════════
const gc=document.getElementById('globe');
const ctx=gc.getContext('2d');
let DPR=Math.min(window.devicePixelRatio||1,3);
let LOGICAL_SIZE=400;
function sizeGlobe(){
  const sec=gc.closest('.globe-section');
  const ls=Math.max(260,Math.min(sec.clientWidth-90,sec.clientHeight-150,520));
  gc.style.width=ls+'px';gc.style.height=ls+'px';
  gc.width=Math.round(ls*DPR);gc.height=Math.round(ls*DPR);
  ctx.scale(DPR,DPR);LOGICAL_SIZE=ls;
}
sizeGlobe();window.addEventListener('resize',()=>sizeGlobe());
let rotX=0.38,rotY=0.4,isDrag=false,lastX=0,lastY=0,clickX=0,clickY=0,velX=0,velY=0.002,selC=null,hovC=null;
function ll3d(lat,lon){const phi=(90-lat)*Math.PI/180,th=(lon+180)*Math.PI/180;return{x:-Math.sin(phi)*Math.cos(th),y:Math.cos(phi),z:Math.sin(phi)*Math.sin(th)};}
function rot3d(p){let x=p.x*Math.cos(rotY)+p.z*Math.sin(rotY);let z=-p.x*Math.sin(rotY)+p.z*Math.cos(rotY);let y2=p.y*Math.cos(rotX)-z*Math.sin(rotX);let z2=p.y*Math.sin(rotX)+z*Math.cos(rotX);return{x,y:y2,z:z2};}
function dims(){const W=LOGICAL_SIZE,R=W/2-5,CX=W/2,CY=W/2;return{W,R,CX,CY};}
function drawRing(coords,R,CX,CY){if(!coords||coords.length<3)return;const THRESH=R*.15;ctx.beginPath();let started=false,px=0,py=0;for(let i=0;i<coords.length;i++){const[lon,lat]=coords[i];const r=rot3d(ll3d(lat,lon));if(r.z<-0.02){started=false;continue;}const sx=CX+r.x*R,sy=CY-r.y*R;if(!started){ctx.moveTo(sx,sy);started=true;}else{const dist=Math.hypot(sx-px,sy-py);if(dist>THRESH)ctx.moveTo(sx,sy);else ctx.lineTo(sx,sy);}px=sx;py=sy;}ctx.closePath();}
function draw(){
  const{W,R,CX,CY}=dims();ctx.clearRect(0,0,W,W);
  const bg=ctx.createRadialGradient(CX*.7,CY*.65,0,CX,CY,R);bg.addColorStop(0,'#0d2845');bg.addColorStop(.55,'#071a30');bg.addColorStop(1,'#030c18');
  ctx.beginPath();ctx.arc(CX,CY,R,0,Math.PI*2);ctx.fillStyle=bg;ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(CX,CY,R,0,Math.PI*2);ctx.clip();
  if(geoReady&&geoFeatures.length>0){for(const feat of geoFeatures){for(const ring of feat.coords)drawRing(ring,R,CX,CY);ctx.fillStyle='#0e3d20';ctx.fill('evenodd');ctx.strokeStyle='rgba(0,255,100,0.13)';ctx.lineWidth=0.7;ctx.stroke();}}
  ctx.strokeStyle='rgba(0,150,220,0.09)';ctx.lineWidth=0.5;
  for(let lo=-180;lo<180;lo+=30){ctx.beginPath();let s=true;for(let la=-90;la<=90;la+=4){const r=rot3d(ll3d(la,lo));if(r.z<0){s=true;continue;}const sx=CX+r.x*R,sy=CY-r.y*R;s?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);s=false;}ctx.stroke();}
  for(let la=-60;la<=60;la+=30){ctx.beginPath();let s=true;for(let lo=-180;lo<=180;lo+=4){const r=rot3d(ll3d(la,lo));if(r.z<0){s=true;continue;}const sx=CX+r.x*R,sy=CY-r.y*R;s?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);s=false;}ctx.stroke();}
  ctx.strokeStyle='rgba(0,220,255,0.2)';ctx.lineWidth=1;ctx.beginPath();let eq=true;for(let lo=-180;lo<=180;lo+=2){const r=rot3d(ll3d(0,lo));if(r.z<0){eq=true;continue;}const sx=CX+r.x*R,sy=CY-r.y*R;eq?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);eq=false;}ctx.stroke();
  ctx.restore();
  const atm=ctx.createRadialGradient(CX,CY,R*.9,CX,CY,R+12);atm.addColorStop(0,'rgba(0,150,255,0)');atm.addColorStop(.5,'rgba(0,150,255,0.05)');atm.addColorStop(1,'rgba(0,100,200,0.18)');ctx.beginPath();ctx.arc(CX,CY,R+12,0,Math.PI*2);ctx.fillStyle=atm;ctx.fill();
  const sp=ctx.createRadialGradient(CX-R*.35,CY-R*.35,0,CX,CY,R);sp.addColorStop(0,'rgba(255,255,255,0.13)');sp.addColorStop(.3,'rgba(255,255,255,0.03)');sp.addColorStop(1,'rgba(0,0,0,0)');ctx.beginPath();ctx.arc(CX,CY,R,0,Math.PI*2);ctx.fillStyle=sp;ctx.fill();
  const vis=[];
  for(const c of CTRS){const r=rot3d(ll3d(c.la,c.lo));if(r.z<0.05)continue;vis.push({...c,px:CX+r.x*R,py:CY-r.y*R,z:r.z});}
  vis.sort((a,b)=>a.z-b.z);
  for(const c of vis){
    const isSel=selC?.n===c.n,isHov=hovC?.n===c.n,hasExplorer=!!getCountryData(c.n),dr=isSel?7:isHov?5.5:3.5,al=.45+c.z*.55;
    if(isSel||isHov){const rg=ctx.createRadialGradient(c.px,c.py,0,c.px,c.py,dr*4);rg.addColorStop(0,isSel?'rgba(255,107,53,0.65)':'rgba(0,220,255,0.45)');rg.addColorStop(1,'rgba(0,0,0,0)');ctx.beginPath();ctx.arc(c.px,c.py,dr*4,0,Math.PI*2);ctx.fillStyle=rg;ctx.fill();}
    ctx.beginPath();ctx.arc(c.px,c.py,dr,0,Math.PI*2);ctx.fillStyle=isSel?'#ff6b35':isHov?'#00e5ff':hasExplorer?`rgba(255,180,80,${al})`:`rgba(0,220,255,${al})`;ctx.fill();
    if(c.z>.3||isSel||isHov){ctx.font=isSel?'bold 10px Space Mono':'8px Space Mono';ctx.fillStyle=isSel?'#ff6b35':`rgba(180,230,255,${Math.min(1,al+.15)})`;ctx.fillText(c.n.split(' ')[0],c.px+8,c.py-3);}
  }
  ctx.beginPath();ctx.arc(CX,CY,R,0,Math.PI*2);ctx.strokeStyle='rgba(0,200,255,0.2)';ctx.lineWidth=1.5;ctx.stroke();
}
const tip=document.getElementById('tip');
gc.addEventListener('mousedown',e=>{isDrag=true;lastX=e.clientX;lastY=e.clientY;clickX=e.clientX;clickY=e.clientY;velX=0;velY=0;});
window.addEventListener('mouseup',e=>{if(!isDrag)return;isDrag=false;if(Math.hypot(e.clientX-clickX,e.clientY-clickY)<4&&hovC)pick(hovC);});
window.addEventListener('mousemove',e=>{
  if(isDrag){const dx=e.clientX-lastX,dy=e.clientY-lastY;velY=dx*.007;velX=dy*.007;rotY+=velY;rotX=Math.max(-1.4,Math.min(1.4,rotX+velX));lastX=e.clientX;lastY=e.clientY;}
  else{const rect=gc.getBoundingClientRect();const mx=e.clientX-rect.left,my=e.clientY-rect.top;const{R,CX,CY}=dims();let f=null,best=22;for(const c of CTRS){const r=rot3d(ll3d(c.la,c.lo));if(r.z<.05)continue;const px=CX+r.x*R,py=CY-r.y*R;const d=Math.hypot(mx-px,my-py);if(d<best){best=d;f=c;}}hovC=f;if(f){tip.style.display='block';tip.style.left=(e.clientX+14)+'px';tip.style.top=(e.clientY-10)+'px';const hasData=getCountryData(f.n)?'📷✈️':'';tip.textContent=f.f+' '+f.n+' '+hasData;gc.style.cursor='pointer';}else{tip.style.display='none';gc.style.cursor='grab';}}
});
gc.addEventListener('touchstart',e=>{const t=e.touches[0];isDrag=true;lastX=t.clientX;lastY=t.clientY;clickX=t.clientX;clickY=t.clientY;velX=0;velY=0;e.preventDefault();},{passive:false});
gc.addEventListener('touchmove',e=>{const t=e.touches[0];velY=(t.clientX-lastX)*.007;velX=(t.clientY-lastY)*.007;rotY+=velY;rotX=Math.max(-1.4,Math.min(1.4,rotX+velX));lastX=t.clientX;lastY=t.clientY;e.preventDefault();},{passive:false});
gc.addEventListener('touchend',()=>{isDrag=false;});
function pick(c){selC=c;const el=document.getElementById('selLbl');el.textContent=c.f+' '+c.n;el.className='sel-lbl';}
function loop(){if(!isDrag){velY*=.94;velX*=.90;rotY+=velY;rotX=Math.max(-1.4,Math.min(1.4,rotX+velX));}draw();requestAnimationFrame(loop);}
loop();
