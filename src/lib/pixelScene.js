/* eslint-disable */
// Pixel-art temple at night (rain, fog, lantern glow, falling maple leaves).
// Drawn on a very small canvas that CSS scales up, so it is cheap on phones.
// Used only by the phone home page (MobileHero). Taken from the artifact version.
// The host element (canvas.parentElement) decides the size; it never reads the page.
function mulberry(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export function createPixelScene(canvas,opts){
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  let reduced=!!(opts&&opts.reduced);
  const host=canvas.parentElement||canvas;
  const ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)return null;
  const M=16;
  let W=0,H=0,P=3,portrait=false,s=100,ground=0,bw=0,bh=0;
  let back,mid,front,glowW,glowR,fogTex,cloudTex;
  let wins=[],lants=[],stars=[],leaves=[],bursts=[],rain=[],moon={x:0,y:0,r:10},canopy={x:0,y:0,rx:10,ry:10},cloud=[];
  let tx=0,ty=0,px=0,py=0,sy=0,t=0,flare=0,fade=1,running=false,raf=0,last=0,R=mulberry(1);
  const LEAFC=['#a3242b','#8a1c24','#c23a3f','#701520','#b83038'];
  function layer(draw){const c=document.createElement('canvas');c.width=W+2*M;c.height=H+2*M;const g=c.getContext('2d');g.imageSmoothingEnabled=false;g.translate(M,M);draw(g);return c;}
  function sprite(r,g,b,size){const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');const gr=x.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);gr.addColorStop(0,'rgba('+r+','+g+','+b+',1)');gr.addColorStop(.35,'rgba('+r+','+g+','+b+',.35)');gr.addColorStop(1,'rgba('+r+','+g+','+b+',0)');x.fillStyle=gr;x.fillRect(0,0,size,size);return c;}
  function groundY(x){
    const bumpL=s*.15*Math.exp(-Math.pow((x-W*.1)/(W*.2),2));
    const bumpR=s*.1*Math.exp(-Math.pow((x-W*.96)/(W*.17),2));
    return ground+Math.sin(x*.05)*1.6+Math.sin(x*.021+1)*2.4-bumpL-bumpR;
  }
  function hill(g,base,amp,freq,ph,col){g.beginPath();g.moveTo(-M,H+M);for(let x=-M;x<=W+M;x+=2)g.lineTo(x,base+Math.sin(x*freq+ph)*amp+Math.sin(x*freq*2.3+ph*2)*amp*.4);g.lineTo(W+M,H+M);g.closePath();g.fillStyle=col;g.fill();}
  function pine(g,x,by,h,w,col){g.fillStyle=col;for(let i=0;i<4;i++){const y=by-h*(i/4),ww=w*(1-i*.2);g.beginPath();g.moveTo(x-ww/2,y);g.lineTo(x,y-h*.34);g.lineTo(x+ww/2,y);g.closePath();g.fill();}g.fillRect(x-.6,by,1.2,h*.08);}
  function roof(g,cx,topY,hw,rh,rim){
    const tip=s*.045,lx=cx-hw-tip,rx=cx+hw+tip,yt=topY-rh*.55;
    g.beginPath();
    g.moveTo(lx,yt);
    g.quadraticCurveTo(cx-hw*.85,topY+rh*.15,cx-hw*.55,topY+rh*.12);
    g.lineTo(cx+hw*.55,topY+rh*.12);
    g.quadraticCurveTo(cx+hw*.85,topY+rh*.15,rx,yt);
    g.quadraticCurveTo(cx+hw*.6,topY-rh*.55,cx+hw*.26,topY-rh*1.05);
    g.lineTo(cx-hw*.26,topY-rh*1.05);
    g.quadraticCurveTo(cx-hw*.6,topY-rh*.55,lx,yt);
    g.closePath();g.fill();
    g.strokeStyle=rim;g.lineWidth=1;g.stroke();
  }
  function temple(g,cx,by,sc,reg){
    const u=s*sc;let y=by;
    g.fillStyle='#08090a';
    g.fillRect(cx-u*.58,y-u*.05,u*1.16,u*.05);y-=u*.05;
    const tiers=[{w:1,h:.2,n:6},{w:.74,h:.17,n:5},{w:.5,h:.15,n:4}];
    tiers.forEach((t,i)=>{
      const bww=t.w*u*.82,bhh=t.h*u,rh=u*.075;
      g.fillStyle='#08090a';g.fillRect(cx-bww/2,y-bhh,bww,bhh);
      g.fillStyle='#0b0c0d';for(let k=0;k<5;k++)g.fillRect(cx-bww/2+bww*(k+.5)/5-.5,y-bhh,1,bhh);
      if(reg){for(let k=0;k<t.n;k++){wins.push({x:cx-bww/2+bww*(k+.5)/t.n-u*.016,y:y-bhh*.7,w:u*.032,h:u*.052,ph:R()*6.28,on:R()>.1});}}
      g.fillStyle='#08090a';
      roof(g,cx,y-bhh,bww/2+u*.09,rh,'rgba(196,86,90,.2)');
      y-=bhh+rh*.9;
    });
    g.fillStyle='#08090a';g.fillRect(cx-.7,y-u*.16,1.4,u*.17);
    for(let k=0;k<3;k++)g.fillRect(cx-u*.03,y-u*.03-k*u*.035,u*.06,1);
    g.fillRect(cx-u*.012,y-u*.19,u*.024,u*.03);
  }
  function torii(g,cx,gy,u){
    g.fillStyle='#1a0e10';
    const pw=u*.035,half=u*.22;
    g.fillRect(cx-half-pw/2,gy-u*.4,pw,u*.4);g.fillRect(cx+half-pw/2,gy-u*.4,pw,u*.4);
    g.fillRect(cx-half-u*.04,gy-u*.3,half*2+u*.08,u*.028);
    g.beginPath();g.moveTo(cx-half-u*.11,gy-u*.4);g.quadraticCurveTo(cx,gy-u*.34,cx+half+u*.11,gy-u*.4);g.lineTo(cx+half+u*.09,gy-u*.45);g.quadraticCurveTo(cx,gy-u*.39,cx-half-u*.09,gy-u*.45);g.closePath();g.fill();
    g.strokeStyle='rgba(196,86,90,.28)';g.lineWidth=1;g.stroke();
    g.fillStyle='#3a1517';g.fillRect(cx-half-pw/2,gy-u*.4,1,u*.4);g.fillRect(cx+half-pw/2,gy-u*.4,1,u*.4);
  }
  function lantern(g,x,gy,u){
    g.fillStyle='#13181a';
    g.fillRect(x-u*.5,gy-u*.18,u,u*.18);
    g.fillRect(x-u*.15,gy-u*.7,u*.3,u*.55);
    g.fillRect(x-u*.45,gy-u*.78,u*.9,u*.12);
    g.fillStyle='#1a2022';g.fillRect(x-u*.34,gy-u*1.2,u*.68,u*.44);
    g.fillStyle='#13181a';g.beginPath();g.moveTo(x-u*.62,gy-u*1.2);g.lineTo(x,gy-u*1.55);g.lineTo(x+u*.62,gy-u*1.2);g.closePath();g.fill();
    lants.push({x:x,y:gy-u*.98,w:u*.36,h:u*.28,r:u*3.6,ph:R()*6.28});
  }
  function build(){
    const vw=Math.max(1,host.clientWidth),vh=Math.max(1,host.clientHeight);
    portrait=vw/vh<.95;
    P=Math.max(3,Math.round(Math.max(vw,vh)/330));
    W=Math.ceil(vw/P);H=Math.ceil(vh/P);
    canvas.width=W;canvas.height=H;ctx.imageSmoothingEnabled=false;
    R=mulberry(2026);wins=[];lants=[];stars=[];leaves=[];bursts=[];rain=[];cloud=[];
    s=portrait?Math.min(W*.7,H*.25):H*.62;
    const cx=portrait?W*.5:W*.63;
    ground=portrait?H*.37:H*.8;
    moon=portrait?{x:W*.78,y:H*.14,r:Math.max(13,W*.17)}:{x:W*.72,y:H*.25,r:H*.115};
    const mx=portrait?W*.87:W*.9;
    for(let i=0;i<80;i++)stars.push({x:R()*W,y:R()*H*.55,a:.2+R()*.5,p:R()*6.28});
    glowW=sprite(255,176,90,64);glowR=sprite(200,70,78,128);cloudTex=(function(){const c=document.createElement('canvas');c.width=128;c.height=32;const x=c.getContext('2d');x.save();x.scale(1,.25);const gr=x.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(9,11,13,.95)');gr.addColorStop(.6,'rgba(9,11,13,.55)');gr.addColorStop(1,'rgba(9,11,13,0)');x.fillStyle=gr;x.fillRect(0,0,128,128);x.restore();return c;})();
    fogTex=(function(){const c=document.createElement('canvas');c.width=128;c.height=32;const x=c.getContext('2d');const gr=x.createRadialGradient(64,16,0,64,16,64);gr.addColorStop(0,'rgba(150,170,170,.22)');gr.addColorStop(1,'rgba(150,170,170,0)');x.save();x.scale(1,.25);x.fillStyle=gr;x.fillRect(0,0,128,128);x.restore();return c;})();
    back=layer(g=>{
      const gr=g.createLinearGradient(0,-M,0,H*.92);
      gr.addColorStop(0,'#06070a');gr.addColorStop(.5,'#0d1114');gr.addColorStop(.82,'#171316');gr.addColorStop(1,'#1c1313');
      g.fillStyle=gr;g.fillRect(-M,-M,W+2*M,H+2*M);
      const hg=g.createRadialGradient(moon.x,moon.y,moon.r*.6,moon.x,moon.y,moon.r*4.2);
      hg.addColorStop(0,'rgba(190,70,78,.3)');hg.addColorStop(1,'rgba(190,70,78,0)');g.fillStyle=hg;g.fillRect(-M,-M,W+2*M,H+2*M);
      const mg=g.createRadialGradient(moon.x-moon.r*.3,moon.y-moon.r*.3,moon.r*.1,moon.x,moon.y,moon.r);
      mg.addColorStop(0,'#cf6a70');mg.addColorStop(1,'#a2424a');
      g.fillStyle=mg;g.beginPath();g.arc(moon.x,moon.y,moon.r,0,6.2832);g.fill();
      g.save();g.beginPath();g.arc(moon.x,moon.y,moon.r,0,6.2832);g.clip();
      for(let i=0;i<14;i++){const a=R()*6.28,d=R()*moon.r*.85,cr=moon.r*(.06+R()*.14);g.fillStyle='rgba(112,30,40,'+(.25+R()*.3)+')';g.beginPath();g.arc(moon.x+Math.cos(a)*d,moon.y+Math.sin(a)*d,cr,0,6.2832);g.fill();}
      g.restore();
      hill(g,ground-s*.34,s*.07,.02,1.3,'#0e1213');
      hill(g,ground-s*.16,s*.05,.03,4.1,'#0a0d0d');
    });
    mid=layer(g=>{
      for(let i=0;i<9;i++){const x=R()*W;if(Math.abs(x-cx)<s*.52)continue;pine(g,x,ground-s*.1,s*(.2+R()*.18),s*(.09+R()*.05),i%2?'#090c0c':'#0b0f0f');}
      temple(g,cx+s*.88,ground-s*.07,.46,false);
      temple(g,cx-s*.9,ground-s*.06,.34,false);
      temple(g,cx,ground-s*.04,1,true);
      torii(g,cx-s*.02,ground+s*.06,s*1.05);
    });
    front=layer(g=>{
      const hg=g.createLinearGradient(0,ground-s*.15,0,H);hg.addColorStop(0,'#1b231b');hg.addColorStop(1,'#0b0e0b');
      g.beginPath();g.moveTo(-M,H+M);for(let x=-M;x<=W+M;x+=2)g.lineTo(x,groundY(x));g.lineTo(W+M,H+M);g.closePath();g.fillStyle=hg;g.fill();
      for(let x=-M;x<=W+M;x+=2){const gy=groundY(x),hh=1+R()*3.4;g.fillStyle=R()>.5?'#263326':'#2f3d2c';g.fillRect(x,gy-hh,1,hh+1);}
      g.beginPath();g.moveTo(-M,H+M);for(let x=-M;x<=W+M;x+=2)g.lineTo(x,ground+s*.28+Math.sin(x*.04+2)*2.5);g.lineTo(W+M,H+M);g.closePath();g.fillStyle='#0a0d0a';g.fill();
      for(let x=-M;x<=W+M;x+=2){const gy=ground+s*.28+Math.sin(x*.04+2)*2.5,hh=1+R()*4;g.fillStyle=R()>.5?'#141c14':'#1b261b';g.fillRect(x,gy-hh,1,hh+1);}
      lantern(g,cx-s*.6,groundY(cx-s*.6)+s*.01,s*.07);
      lantern(g,cx+s*.5,groundY(cx+s*.5)+s*.01,s*.07);
      const my=groundY(mx);
      g.fillStyle='#150e0d';g.beginPath();g.moveTo(mx-s*.025,my+2);g.lineTo(mx+s*.025,my+2);g.lineTo(mx+s*.012,my-s*.42);g.lineTo(mx-s*.012,my-s*.42);g.closePath();g.fill();
      g.strokeStyle='#150e0d';g.lineWidth=1.4;
      [[-.2,-.46],[.22,-.5],[-.08,-.58],[.12,-.36]].forEach(b=>{g.beginPath();g.moveTo(mx,my-s*.3);g.lineTo(mx+s*b[0],my+s*b[1]*.7);g.stroke();});
      canopy={x:mx-s*.04,y:my-s*.42,rx:s*.3,ry:s*.2};
      for(let i=0;i<120;i++){const a=R()*6.28,d=Math.sqrt(R());const x=canopy.x+Math.cos(a)*d*canopy.rx,y=canopy.y+Math.sin(a)*d*canopy.ry;g.fillStyle=LEAFC[Math.floor(R()*LEAFC.length)];g.globalAlpha=.8;g.beginPath();g.arc(x,y,1.3+R()*3,0,6.2832);g.fill();}
      g.globalAlpha=1;
      for(let i=0;i<30;i++){g.fillStyle=LEAFC[Math.floor(R()*LEAFC.length)];g.fillRect(mx-s*.35+R()*s*.5,my+R()*s*.07,2,1);}
    });
    for(let i=0;i<36;i++){const l=newLeaf(true);leaves.push(l);}
    for(let i=0;i<70;i++)rain.push({x:R()*(W+20),y:R()*H,l:3+R()*3,v:95+R()*50});
    for(let i=0;i<4;i++)cloud.push({x:R()*W,y:moon.y+(R()-.5)*moon.r*2,w:W*(.25+R()*.3),h:5+R()*7,v:1.2+R()*2});
  }
  function newLeaf(init){
    const fromTree=!init&&Math.random()<.75;
    return {x:fromTree?canopy.x+(Math.random()-.5)*canopy.rx*2:Math.random()*W,y:fromTree?canopy.y+Math.random()*canopy.ry:(init?Math.random()*H:-4),
      vx:-(5+Math.random()*10),vy:7+Math.random()*12,sw:1+Math.random()*2,ph:Math.random()*6.28,c:LEAFC[Math.floor(Math.random()*LEAFC.length)]};
  }
  function draw(dt){
    const ox=clamp(px+Math.sin(t*.17)*.35,-1.3,1.3),oy=py+Math.sin(t*.13+1)*.12,sc=sy*.012;
    ctx.globalCompositeOperation='source-over';
    ctx.drawImage(back,-M-ox*2,-M-oy*1.2-sc*.4);
    ctx.fillStyle='#fff';
    stars.forEach(a=>{ctx.globalAlpha=a.a*(.55+.45*Math.sin(t*1.3+a.p));ctx.fillRect(Math.round(a.x-ox*2),Math.round(a.y-oy*1.2),1,1);});
    ctx.globalAlpha=1;
    ctx.globalCompositeOperation='lighter';
    const pulse=.13+.05*Math.sin(t*.7);
    ctx.globalAlpha=pulse;ctx.drawImage(glowR,moon.x-ox*2-moon.r*2.4,moon.y-oy*1.2-moon.r*2.4-sc*.4,moon.r*4.8,moon.r*4.8);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=.8;
    cloud.forEach(c=>{c.x+=c.v*dt;if(c.x>W+c.w)c.x=-c.w;ctx.drawImage(cloudTex,c.x-ox*2,c.y-oy*1.2,c.w,c.h*2);});
    ctx.globalAlpha=1;
    ctx.drawImage(mid,-M-ox*4,-M-oy*2-sc*.8);
    const fl=1+flare*.9;
    wins.forEach(w=>{
      if(!w.on)return;
      const a=clamp((.72+.28*Math.sin(t*2.3+w.ph))*fl,0,1.4);
      const x=Math.round(w.x-ox*4),y=Math.round(w.y-oy*2-sc*.8);
      ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(222,172,92,'+Math.min(1,a)+')';ctx.fillRect(x,y,Math.max(2,Math.round(w.w)),Math.max(2,Math.round(w.h)));
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.18*a;ctx.drawImage(glowW,x-w.w*1.5,y-w.h*1.2,w.w*4,w.h*3.6);ctx.globalAlpha=1;
    });
    ctx.globalCompositeOperation='source-over';
    ctx.drawImage(front,-M-ox*7,-M-oy*3.5-sc*1.6);
    lants.forEach(l=>{
      const a=clamp((.8+.2*Math.sin(t*5+l.ph)+.1*Math.sin(t*11+l.ph*2))*fl,0,1.6);
      const x=l.x-ox*7,y=l.y-oy*3.5-sc*1.6;
      ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(255,176,84,'+Math.min(1,a)+')';ctx.fillRect(Math.round(x-l.w/2),Math.round(y-l.h/2),Math.max(2,Math.round(l.w)),Math.max(2,Math.round(l.h)));
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55*Math.min(1.2,a);ctx.drawImage(glowW,x-l.r,y-l.r,l.r*2,l.r*2);ctx.globalAlpha=1;
    });
    ctx.globalCompositeOperation='source-over';
    // fog
    ctx.globalAlpha=.9;
    for(let i=0;i<3;i++){const fx=((t*(2+i)+i*W*.4)%(W*1.6))-W*.3;ctx.drawImage(fogTex,fx-ox*3,ground-s*.05+i*s*.06-oy*2,W*.9,s*.3);}
    ctx.globalAlpha=1;
    // leaves
    leaves.forEach(l=>{
      l.x+=(l.vx+Math.sin(t*l.sw+l.ph)*7)*dt;l.y+=l.vy*dt;
      if(l.y>H+4||l.x<-6){Object.assign(l,newLeaf(false));}
      ctx.fillStyle=l.c;const f=Math.floor(t*3+l.ph)%2;ctx.fillRect(Math.round(l.x),Math.round(l.y),f?3:2,f?2:3);
    });
    for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.life-=dt;if(b.life<=0){bursts.splice(i,1);continue;}b.vx*=1-dt*1.6;b.vy=b.vy*(1-dt*1.6)+14*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;ctx.globalAlpha=Math.min(1,b.life*1.6);ctx.fillStyle=b.c;ctx.fillRect(Math.round(b.x),Math.round(b.y),2,2);}
    ctx.globalAlpha=1;
    // rain
    ctx.strokeStyle='rgba(165,190,205,.2)';ctx.lineWidth=1;ctx.beginPath();
    rain.forEach(r=>{r.y+=r.v*dt;r.x-=r.v*dt*.22;if(r.y>H){r.y=-r.l;r.x=Math.random()*(W+20);}ctx.moveTo(Math.round(r.x),Math.round(r.y));ctx.lineTo(Math.round(r.x-r.l*.22),Math.round(r.y+r.l));});
    ctx.stroke();
    flare=Math.max(0,flare-dt*.9);
  }
  function frame(now){
    raf=0;if(!running)return;
    raf=requestAnimationFrame(frame);
    if(now-last<32)return;
    const dt=Math.min(.06,(now-last)/1000||.032);last=now;t+=dt;
    px+=(tx-px)*Math.min(1,dt*4);py+=(ty-py)*Math.min(1,dt*4);
    draw(dt);
  }
  function still(){px=0;py=0;draw(0);}
  function start(){if(running||reduced||fade<.02||document.hidden)return;running=true;last=performance.now();raf=requestAnimationFrame(frame);}
  function stop(){running=false;if(raf)cancelAnimationFrame(raf);raf=0;}
  let lw=host.clientWidth,lh=host.clientHeight,rt=0,active=true,dead=false;
  const onResize=()=>{clearTimeout(rt);rt=setTimeout(()=>{if(dead)return;const w=host.clientWidth,h=host.clientHeight;if(w&&h&&(w!==lw||Math.abs(h-lh)>120)){lw=w;lh=h;build();if(reduced||!running)still();}},160);};
  const onVis=()=>{if(document.hidden)stop();else if(active)start();};
  const onMove=e=>{tx=clamp(e.clientX/innerWidth*2-1,-1,1);ty=clamp(e.clientY/innerHeight*2-1,-1,1);};
  addEventListener('resize',onResize);
  document.addEventListener('visibilitychange',onVis);
  addEventListener('pointermove',onMove,{passive:true});
  build();
  if(reduced)still();else start();
  return {
    setScroll(y,f){sy=y;fade=f;if(f<.02)stop();else if(!reduced&&active)start();else if(reduced)still();},
    /* Pause drawing while the hero is off screen; resume (and redraw once) when it returns. */
    setActive(a){active=!!a;if(!active)stop();else if(reduced)still();else start();},
    destroy(){dead=true;stop();clearTimeout(rt);removeEventListener('resize',onResize);document.removeEventListener('visibilitychange',onVis);removeEventListener('pointermove',onMove);},
    burst(cx,cy){
      flare=1;
      const x=cx/P,y=cy/P;
      for(let i=0;i<14;i++){const a=Math.random()*6.28,v=14+Math.random()*34;bursts.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-10,life:.9+Math.random()*.8,c:LEAFC[Math.floor(Math.random()*LEAFC.length)]});}
      if(reduced)still();
    },
    setReduced(r){reduced=r;if(r){stop();still();}else start();}
  };
}
