import React, { useState, useEffect } from "react";

const T = {
  pink:"#FF3CA0", violet:"#9B5DE5", blue:"#2DD4F0",
  navy:"#0A0E27", navyMid:"#111635", navyCard:"#161B3A", navyBorder:"#252D5C",
  textPrimary:"#F0F2FF", textSecondary:"#8B93C4", textMuted:"#4A527A",
  green:"#00D68F", amber:"#FFB830", red:"#FF4D6A"
};

const SPORTS = [
  {id:"swimming",   label:"Swimming",      icon:"🏊‍♀️", color:T.blue},
  {id:"basketball", label:"Basketball",    icon:"🏀",  color:T.pink},
  {id:"volleyball", label:"Volleyball",    icon:"🏐",  color:T.violet},
  {id:"soccer",     label:"Soccer",        icon:"⚽",  color:T.green},
  {id:"lacrosse",   label:"Lacrosse",      icon:"🥍",  color:T.amber},
  {id:"track",      label:"Track & Field", icon:"🏃‍♀️", color:T.pink},
  {id:"football",   label:"Football",      icon:"🏈",  color:T.amber},
];

const UNIVERSITIES = [
  {id:1,name:"University of Virginia",shortName:"UVA",city:"Charlottesville",state:"Virginia",tier:"D1 Power 4",conference:"ACC",acceptRate:17,avgGPA:3.9,satLow:1350,satHigh:1540,tuitionOut:58950,swimProgram:"6x consecutive NCAA champion",coachName:"Todd DeSorbo",coachEmail:"swimming@virginia.edu",latinCommunity:"moderate",bilingualCampus:false,scholarshipAvail:true},
  {id:2,name:"Stanford University",shortName:"Stanford",city:"Stanford",state:"California",tier:"D1 Power 4",conference:"ACC",acceptRate:4,avgGPA:3.96,satLow:1500,satHigh:1580,tuitionOut:62484,swimProgram:"12x NCAA champion",coachName:"Chris Lindauer",coachEmail:"swimdive@stanford.edu",latinCommunity:"moderate",bilingualCampus:false,scholarshipAvail:true},
  {id:3,name:"University of Texas",shortName:"UT Austin",city:"Austin",state:"Texas",tier:"D1 Power 4",conference:"SEC",acceptRate:29,avgGPA:3.75,satLow:1230,satHigh:1490,tuitionOut:40996,swimProgram:"Top 3 nationally",coachName:"Carol Capitani",coachEmail:"wswim@utexas.edu",latinCommunity:"very high",bilingualCampus:true,scholarshipAvail:true},
  {id:4,name:"University of Florida",shortName:"UF",city:"Gainesville",state:"Florida",tier:"D1 Power 4",conference:"SEC",acceptRate:24,avgGPA:3.9,satLow:1310,satHigh:1490,tuitionOut:28658,swimProgram:"#6 nationally",coachName:"Anthony Nesty",coachEmail:"swdv@ufl.edu",latinCommunity:"high",bilingualCampus:true,scholarshipAvail:true},
  {id:5,name:"University of Miami",shortName:"UM",city:"Coral Gables",state:"Florida",tier:"D1 Power 4",conference:"ACC",acceptRate:19,avgGPA:3.8,satLow:1350,satHigh:1510,tuitionOut:59330,swimProgram:"Top 15 nationally",coachName:"Andy Kershaw",coachEmail:"swim@miami.edu",latinCommunity:"very high",bilingualCampus:true,scholarshipAvail:true},
  {id:6,name:"American University",shortName:"AU",city:"Washington",state:"DC",tier:"D1 Mid-Major",conference:"Patriot League",acceptRate:38,avgGPA:3.7,satLow:1230,satHigh:1430,tuitionOut:56226,swimProgram:"#1 IR program in USA",coachName:"Michael Donahue",coachEmail:"swim@american.edu",latinCommunity:"moderate",bilingualCampus:false,scholarshipAvail:true},
  {id:7,name:"Georgetown University",shortName:"Georgetown",city:"Washington",state:"DC",tier:"D1 Mid-Major",conference:"Big East",acceptRate:12,avgGPA:3.9,satLow:1440,satHigh:1570,tuitionOut:62244,swimProgram:"SFS world-famous IR",coachName:"John Carroll",coachEmail:"swim@georgetown.edu",latinCommunity:"moderate",bilingualCampus:false,scholarshipAvail:true},
  {id:8,name:"Columbia University",shortName:"Columbia",city:"New York",state:"New York",tier:"D1 Ivy",conference:"Ivy League",acceptRate:4,avgGPA:3.96,satLow:1510,satHigh:1580,tuitionOut:67044,swimProgram:"Latina HC; SIPA #1 globally",coachName:"Diana Casanova",coachEmail:"swim@columbia.edu",latinCommunity:"high",bilingualCampus:true,scholarshipAvail:false},
  {id:9,name:"Nova Southeastern University",shortName:"NSU",city:"Fort Lauderdale",state:"Florida",tier:"D2 Champion",conference:"Sunshine State",acceptRate:60,avgGPA:3.4,satLow:1050,satHigh:1280,tuitionOut:36950,swimProgram:"4x consecutive D2 national champion",coachName:"Josh Corliss",coachEmail:"swim@nova.edu",latinCommunity:"very high",bilingualCampus:true,scholarshipAvail:true},
  {id:10,name:"Harvard University",shortName:"Harvard",city:"Cambridge",state:"Massachusetts",tier:"D1 Ivy",conference:"Ivy League",acceptRate:4,avgGPA:3.96,satLow:1500,satHigh:1580,tuitionOut:57261,swimProgram:"100% need-based aid",coachName:"Stephanie Morawski",coachEmail:"swim@harvard.edu",latinCommunity:"moderate",bilingualCampus:false,scholarshipAvail:false},
];

const SWIM_STANDARDS = {
  "50 Free":   {d1Top:"22.30",d1B:"22.76",d2:"23.70"},
  "100 Free":  {d1Top:"48.50",d1B:"49.49",d2:"51.40"},
  "200 Free":  {d1Top:"1:45.00",d1B:"1:47.08",d2:"1:50.90"},
  "500 Free":  {d1Top:"4:42.00",d1B:"4:46.49",d2:"4:56.80"},
  "100 Back":  {d1Top:"52.50",d1B:"54.01",d2:"55.80"},
  "200 Back":  {d1Top:"1:53.00",d1B:"1:56.32",d2:"2:00.00"},
  "100 Breast":{d1Top:"59.00",d1B:"1:00.21",d2:"1:02.50"},
  "200 Breast":{d1Top:"2:09.00",d1B:"2:11.77",d2:"2:15.00"},
  "100 Fly":   {d1Top:"52.00",d1B:"53.76",d2:"55.40"},
  "200 Fly":   {d1Top:"1:56.00",d1B:"1:58.43",d2:"2:02.00"},
  "200 IM":    {d1Top:"1:57.00",d1B:"1:59.65",d2:"2:03.40"},
  "400 IM":    {d1Top:"4:12.00",d1B:"4:17.29",d2:"4:26.00"},
};

function tSec(t){if(!t?.trim())return null;const p=t.trim().split(":");if(p.length===2){const m=parseFloat(p[0]),s=parseFloat(p[1]);return isNaN(m)||isNaN(s)?null:m*60+s;}const s=parseFloat(t);return isNaN(s)?null:s;}

function getTier(ev,t){const s=SWIM_STANDARDS[ev];if(!s||!t)return null;const ts=tSec(t);if(ts===null)return null;if(ts<=tSec(s.d1Top))return{label:"D1 elite",color:T.green};if(ts<=tSec(s.d1B))return{label:"D1 recruit",color:T.blue};if(ts<=tSec(s.d2))return{label:"D2 recruit",color:T.violet};return{label:"Developing",color:T.textMuted};}

function calcMatch(s,u){let sc=50;if(s.latinCommunityPref&&u.latinCommunity==="very high")sc+=15;else if(s.latinCommunityPref&&u.latinCommunity==="high")sc+=8;if(s.bilingualPref&&u.bilingualCampus)sc+=10;if(s.needAthletic&&!u.scholarshipAvail)sc-=25;if(s.needAthletic&&u.scholarshipAvail)sc+=10;const gpa=parseFloat(s.gpa);if(!isNaN(gpa)){const d=gpa-u.avgGPA;if(d>=.2)sc+=12;else if(d>=0)sc+=6;else if(d<-.3)sc-=8;}const sat=parseInt(s.satScore);if(!isNaN(sat)){if(sat>=u.satHigh)sc+=10;else if(sat>=u.satLow)sc+=5;else sc-=6;}return Math.max(0,Math.min(100,sc));}

const STORAGE_KEY="laneup_v2";
const EP={firstName:"",lastName:"",email:"",phone:"",highSchool:"",graduationYear:"2028",gpa:"",satScore:"",actScore:"",parentsOrigin:"",swimEvents:[],swimTimes:{},swimPercentile:"",majorInterests:[],locationPref:"anywhere",needAthletic:false,latinCommunityPref:false,bilingualPref:false};

const css = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#0A0E27;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#F0F2FF;}
  input,select,textarea{background:#111635;border:1px solid #252D5C;color:#F0F2FF;border-radius:10px;padding:10px 14px;font-size:13px;outline:none;width:100%;}
  input:focus,select:focus,textarea:focus{border-color:#9B5DE5;}
  input::placeholder,textarea::placeholder{color:#4A527A;}
  select option{background:#111635;}
  ::-webkit-scrollbar{width:4px;}
  ::-webkit-scrollbar-thumb{background:#252D5C;border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}
  .fu{animation:fadeUp .4s ease both;}
  .fu1{animation:fadeUp .4s .05s ease both;}
  .fu2{animation:fadeUp .4s .1s ease both;}
`;

function Btn({children,onClick,color,outline,full,small,disabled}){
  const bg=outline?"transparent":color||T.pink;
  const col=outline?(color||T.pink):T.navy;
  return <button onClick={onClick} disabled={disabled} style={{background:bg,border:`1.5px solid ${color||T.pink}`,color:col,borderRadius:50,padding:small?"7px 18px":"12px 28px",fontSize:small?12:14,fontWeight:600,cursor:disabled?"default":"pointer",width:full?"100%":"auto",opacity:disabled?.4:1,display:"inline-flex",alignItems:"center",gap:7,justifyContent:"center",fontFamily:"inherit"}}>{children}</button>;}

function Card({children,style:s={},glow}){return <div style={{background:T.navyCard,border:`1px solid ${T.navyBorder}`,borderRadius:16,padding:16,boxShadow:glow?`0 0 0 1px ${T.violet}30`:undefined,...s}}>{children}</div>;}

function Badge({children,color=T.violet}){return <span style={{background:color+"22",color,border:`1px solid ${color}44`,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{children}</span>;}

function Pill({active,onClick,children}){return <button onClick={onClick} style={{background:active?T.violet:"transparent",border:`1px solid ${active?T.violet:T.navyBorder}`,color:active?"#fff":T.textSecondary,borderRadius:20,padding:"5px 13px",fontSize:12,fontWeight:active?600:400,cursor:"pointer",fontFamily:"inherit"}}>{children}</button>;}

function ScoreBadge({score}){const color=score>=75?T.green:score>=55?T.amber:T.red;return <div style={{background:color+"18",border:`1px solid ${color}44`,borderRadius:10,padding:"6px 10px",textAlign:"center",minWidth:52,flexShrink:0}}><div style={{fontSize:18,fontWeight:700,color}}>{Math.round(score)}</div><div style={{fontSize:9,color,textTransform:"uppercase",letterSpacing:".08em",marginTop:1}}>match</div></div>;}

const NAV=[{id:"home",label:"Home",path:"M3 12l9-9 9 9M5 10v9h5v-5h4v5h5v-9"},{id:"search",label:"Schools",path:"M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"},{id:"tracker",label:"Tracker",path:"M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"},{id:"times",label:"Times",path:"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2"},{id:"profile",label:"Profile",path:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"}];

function BottomNav({tab,setTab}){return <div style={{position:"sticky",bottom:0,background:T.navyMid,borderTop:`1px solid ${T.navyBorder}`,display:"flex",padding:"8px 0 12px",zIndex:100}}>{NAV.map(n=>{const active=tab===n.id;return <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:"none",border:"none",cursor:"pointer",color:active?T.pink:T.textMuted,fontFamily:"inherit",transition:"color .15s"}}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={n.path}/></svg><span style={{fontSize:10,fontWeight:active?600:400}}>{n.label}</span></button>;})}</div>;}

function SplashScreen({onContinue}){
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:T.navy,padding:32,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:T.pink+"12",filter:"blur(80px)",top:-60,left:-60,pointerEvents:"none"}}/>
    <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:T.violet+"18",filter:"blur(100px)",bottom:-100,right:-80,pointerEvents:"none"}}/>
    <div className="fu" style={{textAlign:"center",maxWidth:340,position:"relative"}}>
      <div style={{width:80,height:80,borderRadius:22,background:`linear-gradient(135deg,${T.pink},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:40}}>🏊‍♀️</div>
      <h1 style={{fontSize:48,fontWeight:700,letterSpacing:"-.02em",lineHeight:1,marginBottom:6}}>Lane<span style={{color:T.pink}}>Up</span></h1>
      <p style={{color:T.textSecondary,fontSize:14,marginBottom:4}}>Your recruiting journey</p>
      <p style={{color:T.textMuted,fontSize:12,fontStyle:"italic",marginBottom:8}}>from first lap to signing day</p>
      <div style={{height:2,background:`linear-gradient(90deg,${T.pink},${T.violet},${T.blue})`,borderRadius:2,marginBottom:16}}/>
      <p style={{color:T.textMuted,fontSize:11,marginBottom:8}}>Built by a swimmer, for every athlete.</p>
      <p style={{color:T.pink,fontSize:12,fontStyle:"italic",marginBottom:32}}>Made with love for Alejandra — Ale — Stich ♡</p>
      <Btn onClick={onContinue} full>Get started →</Btn>
    </div>
  </div>;}

function SportSelector({onSelect}){
  return <div style={{padding:"24px 16px",minHeight:"100vh",background:T.navy}}>
    <div className="fu" style={{marginBottom:28}}>
      <div style={{fontSize:11,color:T.violet,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",marginBottom:8}}>LaneUp</div>
      <h2 style={{fontSize:26,fontWeight:700,lineHeight:1.2,marginBottom:8}}>What sport do you play?</h2>
      <p style={{color:T.textSecondary,fontSize:13}}>Everything adapts to your sport</p>
    </div>
    <div className="fu1" style={{display:"flex",flexDirection:"column",gap:10}}>
      {SPORTS.map(s=><button key={s.id} onClick={()=>onSelect(s.id)} style={{background:T.navyCard,border:`1px solid ${T.navyBorder}`,borderRadius:14,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,textAlign:"left",fontFamily:"inherit"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.navyBorder;}}>
        <div style={{width:44,height:44,borderRadius:12,background:s.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.icon}</div>
        <div style={{flex:1}}><div style={{fontSize:15,fontWeight:600,color:T.textPrimary,marginBottom:2}}>{s.label}</div></div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke={T.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>)}
    </div>
  </div>;}

function HomeTab({student,savedUnis,fups,sport,setTab,customEvents}){
  const cfg=SPORTS.find(s=>s.id===sport)||SPORTS[0];
  const totalF=Object.values(fups).reduce((a,b)=>a+b.length,0);
  const doneF=Object.values(fups).reduce((a,b)=>a+b.filter(f=>f.done).length,0);
  const pct=totalF?Math.round((doneF/totalF)*100):0;
  return <div style={{padding:"20px 16px 4px"}}>
    <div className="fu" style={{marginBottom:20}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:11,color:T.violet,fontWeight:600,textTransform:"uppercase",letterSpacing:".1em",marginBottom:4}}>{cfg.icon} {cfg.label}</div>
          <h1 style={{fontSize:26,fontWeight:700,lineHeight:1.2}}>{student.firstName?`Hey, ${student.firstName}`:"Welcome to LaneUp"}</h1>
          <p style={{color:T.textSecondary,fontSize:13,marginTop:4}}>Your recruiting dashboard</p>
        </div>
        <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${T.pink},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,boxShadow:`0 0 20px ${T.pink}40`}}>{student.firstName?student.firstName[0].toUpperCase():"A"}</div>
      </div>
    </div>
    <div style={{height:3,background:`linear-gradient(90deg,${T.pink},${T.violet},${T.blue})`,borderRadius:2,marginBottom:16}}/>
    <div className="fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
      {[["🏫",savedUnis.length,"Saved",T.violet],["✓",`${doneF}/${totalF}`,"Steps",T.pink],["🔔",customEvents?.length||0,"Reminders",T.blue]].map(([ic,v,l,c])=><div key={l} style={{background:T.navyCard,border:`1px solid ${T.navyBorder}`,borderRadius:14,padding:"12px 10px",textAlign:"center"}}><div style={{fontSize:18,marginBottom:4}}>{ic}</div><div style={{fontSize:20,fontWeight:700,color:c}}>{v}</div><div style={{fontSize:10,color:T.textMuted,marginTop:2}}>{l}</div></div>)}
    </div>
    {totalF>0&&<Card style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:13,fontWeight:500}}>Recruiting progress</span><span style={{fontSize:13,color:T.violet,fontWeight:700}}>{pct}%</span></div>
      <div style={{height:6,background:T.navyBorder,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,width:`${pct}%`,background:`linear-gradient(90deg,${T.pink},${T.violet})`,transition:"width .5s ease"}}/></div>
    </Card>}
    {(student.gpa||student.satScore)&&<Card style={{marginBottom:14}}>
      <div style={{fontSize:12,color:T.textMuted,marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Academic profile</div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
        {student.gpa&&<div><div style={{fontSize:24,fontWeight:700,color:T.pink}}>{student.gpa}</div><div style={{fontSize:11,color:T.textMuted}}>GPA</div></div>}
        {student.satScore&&<div><div style={{fontSize:24,fontWeight:700,color:T.violet}}>{student.satScore}</div><div style={{fontSize:11,color:T.textMuted}}>SAT</div></div>}
        {student.actScore&&<div><div style={{fontSize:24,fontWeight:700,color:T.blue}}>{student.actScore}</div><div style={{fontSize:11,color:T.textMuted}}>ACT</div></div>}
      </div>
    </Card>}
    <div className="fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      {[["🏫","Find schools",T.pink,"search"],["⏱","My times",T.blue,"times"],["✅","Tracker",T.violet,"tracker"],["👤","My profile",T.amber,"profile"]].map(([ic,label,color,t])=><button key={t} onClick={()=>setTab(t)} style={{background:T.navyCard,border:`1px solid ${T.navyBorder}`,borderRadius:14,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontFamily:"inherit"}} onMouseEnter={e=>e.currentTarget.style.borderColor=color} onMouseLeave={e=>e.currentTarget.style.borderColor=T.navyBorder}><span style={{fontSize:20}}>{ic}</span><span style={{fontSize:13,fontWeight:500,color:T.textPrimary}}>{label}</span></button>)}
    </div>
    <div style={{textAlign:"center",padding:"8px 0 4px"}}><span style={{fontSize:11,color:T.textMuted}}>LaneUp · </span><span style={{fontSize:11,color:T.pink,fontWeight:600}}>by Ale ♡</span></div>
  </div>;}

function SearchTab({student,saved,togSave,fups,addFup,notes,updNote}){
  const [q,setQ]=useState("");
  const [tier,setTier]=useState("All");
  const [exp,setExp]=useState(null);
  const TIER_COLOR={"D1 Power 4":T.pink,"D1 Mid-Major":T.violet,"D1 Ivy":T.blue,"D2 Champion":T.green};
  const STEPS=["Initial email sent","Questionnaire submitted","Coach replied","Call scheduled","Call completed","Visit requested","Visit scheduled","Application submitted","Scholarship offer","Verbal commitment","Signed NLI"];
  const unis=UNIVERSITIES.filter(u=>{if(tier!=="All"&&u.tier!==tier)return false;if(q){const lq=q.toLowerCase();return u.name.toLowerCase().includes(lq)||u.city.toLowerCase().includes(lq)||u.coachName.toLowerCase().includes(lq);}return true;}).map(u=>({...u,ms:calcMatch(student,u)})).sort((a,b)=>b.ms-a.ms);
  return <div style={{padding:"20px 16px 4px"}}>
    <div className="fu" style={{marginBottom:14}}>
      <h2 style={{fontSize:24,fontWeight:700}}>Find schools</h2>
      <p style={{color:T.textSecondary,fontSize:13,marginTop:4}}>{unis.length} programs · sorted by match</p>
    </div>
    <div style={{marginBottom:12}}>
      <input placeholder="Search schools, coaches..." value={q} onChange={e=>setQ(e.target.value)} style={{marginBottom:10}}/>
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4}}>
        {["All","D1 Power 4","D1 Mid-Major","D1 Ivy","D2 Champion"].map(t=><Pill key={t} active={tier===t} onClick={()=>setTier(t)}>{t}</Pill>)}
      </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {unis.map(u=>{
        const isSaved=saved.includes(u.id);const isExp=exp===u.id;const tc=TIER_COLOR[u.tier]||T.violet;const uF=fups[`${u.id}`]||[];
        return <div key={u.id} style={{background:T.navyCard,borderRadius:16,overflow:"hidden",border:`1px solid ${isSaved?T.pink+"60":T.navyBorder}`}}>
          <div style={{padding:"14px 14px 12px",cursor:"pointer"}} onClick={()=>setExp(isExp?null:u.id)}>
            <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <ScoreBadge score={u.ms}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:15,fontWeight:600}}>{u.shortName}</span>
                  <Badge color={tc}>{u.tier}</Badge>
                  {u.latinCommunity==="very high"&&<Badge color={T.amber}>🌮 Latin</Badge>}
                  {u.bilingualCampus&&<Badge color={T.green}>Bilingual</Badge>}
                </div>
                <div style={{fontSize:12,color:T.textSecondary}}>{u.city}, {u.state} · {u.conference}</div>
                <div style={{fontSize:11,color:T.textMuted,marginTop:2}}>Coach: {u.coachName}</div>
                {uF.length>0&&<div style={{fontSize:11,color:T.violet,marginTop:3}}>✓ {uF.filter(f=>f.done).length}/{uF.length} steps done</div>}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
                <button onClick={e=>{e.stopPropagation();togSave(u.id);}} style={{background:isSaved?T.pink:"transparent",border:`1px solid ${isSaved?T.pink:T.navyBorder}`,color:isSaved?T.navy:T.textMuted,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{isSaved?"Saved ♡":"Save"}</button>
              </div>
            </div>
          </div>
          {isExp&&<div style={{borderTop:`1px solid ${T.navyBorder}`,padding:"12px 14px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              {[["Accept",`${u.acceptRate}%`],["Avg GPA",u.avgGPA],["SAT",`${u.satLow}–${u.satHigh}`],["Tuition",`$${u.tuitionOut.toLocaleString()}`]].map(([l,v])=><div key={l} style={{background:T.navyMid,borderRadius:8,padding:"8px 10px"}}><div style={{fontSize:10,color:T.textMuted,marginBottom:2}}>{l}</div><div style={{fontSize:13,fontWeight:600}}>{v}</div></div>)}
            </div>
            <div style={{fontSize:12,color:T.textSecondary,marginBottom:10,lineHeight:1.5}}>{u.swimProgram}</div>
            <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:10}}>
              <a href={`mailto:${u.coachEmail}`} style={{fontSize:12,color:T.blue,textDecoration:"none",background:T.blue+"15",padding:"6px 12px",borderRadius:20,border:`1px solid ${T.blue}40`}}>✉ Email coach</a>
              <button onClick={()=>addFup(u.id,"Initial email sent")} style={{fontSize:12,color:T.violet,background:T.violet+"15",border:`1px solid ${T.violet}40`,padding:"6px 12px",borderRadius:20,cursor:"pointer",fontFamily:"inherit"}}>+ Track step</button>
            </div>
            <textarea placeholder="My notes about this school..." value={notes[`${u.id}`]||""} onChange={e=>updNote(u.id,e.target.value)} style={{minHeight:52,resize:"vertical"}}/>
          </div>}
        </div>;})}
    </div>
  </div>;}

function TrackerTab({savedUnis,fups,addFup,togFup,remFup,notes}){
  const STEPS=["Initial email sent","Questionnaire submitted","Coach replied","Call scheduled","Call completed","Visit requested","Visit scheduled","Application submitted","Scholarship offer","Verbal commitment","Signed NLI"];
  if(savedUnis.length===0)return <div style={{padding:"20px 16px",textAlign:"center",paddingTop:80}}><div style={{fontSize:40,marginBottom:12}}>🏫</div><h3 style={{fontSize:20,marginBottom:8}}>No schools saved yet</h3><p style={{color:T.textSecondary,fontSize:13}}>Go to Find Schools and save programs</p></div>;
  return <div style={{padding:"20px 16px 4px"}}>
    <div className="fu" style={{marginBottom:14}}><h2 style={{fontSize:24,fontWeight:700}}>Tracker</h2></div>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {savedUnis.map(u=>{
        const uF=fups[`${u.id}`]||[];const done=uF.filter(f=>f.done).length;const pct=uF.length?Math.round((done/uF.length)*100):0;
        return <Card key={u.id} glow={pct===100}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div><div style={{fontSize:16,fontWeight:600}}>{u.shortName}</div><div style={{fontSize:12,color:T.textSecondary}}>{u.city} · <a href={`mailto:${u.coachEmail}`} style={{color:T.blue,textDecoration:"none"}}>{u.coachEmail}</a></div></div>
            <Badge color={pct===100?T.green:T.violet}>{pct===100?"✓ Done":`${pct}%`}</Badge>
          </div>
          {uF.length>0&&<div style={{height:4,background:T.navyBorder,borderRadius:2,marginBottom:10,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${T.pink},${T.violet})`,borderRadius:2,transition:"width .4s"}}/></div>}
          {uF.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",borderBottom:`1px solid ${T.navyBorder}`}}>
            <div onClick={()=>togFup(u.id,i)} style={{width:18,height:18,borderRadius:5,flexShrink:0,cursor:"pointer",background:f.done?T.green:"transparent",border:`1.5px solid ${f.done?T.green:T.navyBorder}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {f.done&&<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke={T.navy} strokeWidth="1.5" strokeLinecap="round"/></svg>}
            </div>
            <span style={{fontSize:12,flex:1,color:f.done?T.textMuted:T.textPrimary,textDecoration:f.done?"line-through":"none"}}>{f.type}</span>
            <span style={{fontSize:10,color:T.textMuted}}>{f.date}</span>
            <button onClick={()=>remFup(u.id,i)} style={{background:"none",border:"none",cursor:"pointer",color:T.textMuted,fontSize:14,padding:"0 4px"}}>×</button>
          </div>)}
          <div style={{marginTop:10}}>
            <select onChange={e=>{if(e.target.value){addFup(u.id,e.target.value);e.target.value=""}}} style={{fontSize:12}}>
              <option value="">+ Log a follow-up step...</option>
              {STEPS.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </Card>;})}
    </div>
  </div>;}

function TimesTab({student,updS}){
  const events=Object.keys(SWIM_STANDARDS);
  const hasAny=events.some(ev=>(student.swimTimes||{})[ev]);
  return <div style={{padding:"20px 16px 4px"}}>
    <div className="fu" style={{marginBottom:14}}>
      <h2 style={{fontSize:24,fontWeight:700}}>My times</h2>
      <p style={{color:T.textSecondary,fontSize:13,marginTop:4}}>Enter SCY times — tier updates instantly</p>
    </div>
    <Card style={{marginBottom:14}}>
      <div style={{fontSize:12,color:T.textMuted,marginBottom:8}}>Look up your official times</div>
      <a href="https://www.usaswimming.org/times/data-hub/time-search" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.blue+"15",border:`1px solid ${T.blue}40`,borderRadius:10,padding:"10px 14px",textDecoration:"none"}}>
        <span style={{fontSize:13,color:T.blue,fontWeight:500}}>USA Swimming time search</span>
        <span style={{color:T.blue}}>→</span>
      </a>
    </Card>
    <div className="fu1" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {events.map(ev=>{
        const t=(student.swimTimes||{})[ev]||"";const tier=t?getTier(ev,t):null;
        return <div key={ev} style={{background:tier?tier.color+"15":T.navyCard,border:`1px solid ${tier?tier.color+"50":T.navyBorder}`,borderRadius:12,padding:"10px 12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{fontSize:11,color:T.textSecondary}}>{ev}</span>
            {tier&&<span style={{fontSize:10,color:tier.color,fontWeight:600}}>{tier.label}</span>}
          </div>
          <input placeholder="e.g. 54.23" value={t} onChange={e=>updS("swimTimes",{...(student.swimTimes||{}),[ev]:e.target.value})} style={{background:"transparent",border:"none",color:tier?tier.color:T.textPrimary,fontSize:18,fontWeight:700,padding:0,outline:"none",width:"100%"}}/>
        </div>;})}
    </div>
    {hasAny&&<Card>
      <div style={{fontSize:12,color:T.textMuted,marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Standards reference (Women's SCY 2025-26)</div>
      {events.filter(ev=>(student.swimTimes||{})[ev]).map(ev=>{
        const s=SWIM_STANDARDS[ev];const t=(student.swimTimes||{})[ev];const tier=getTier(ev,t);
        return <div key={ev} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:`1px solid ${T.navyBorder}`}}>
          <div style={{width:80,fontSize:11,color:T.textSecondary,flexShrink:0}}>{ev}</div>
          <div style={{flex:1,fontSize:14,fontWeight:600,color:tier?.color||T.textPrimary}}>{t}</div>
          {tier&&<Badge color={tier.color}>{tier.label}</Badge>}
          <div style={{fontSize:10,color:T.textMuted,flexShrink:0}}>B: {s.d1B}</div>
        </div>;})}
    </Card>}
  </div>;}

function ProfileTab({student,updS,togArr,doSave,savedMsg,sport,setSport}){
  const [sec,setSec]=useState("personal");
  const MAJORS=["Business / Management","International Relations","Political Science","Economics","Finance","Marketing","Communications","Pre-Law","Engineering","Computer Science"];
  const EVENTS=Object.keys(SWIM_STANDARDS);
  return <div style={{padding:"20px 16px 4px"}}>
    <div className="fu" style={{marginBottom:16}}>
      <h2 style={{fontSize:24,fontWeight:700}}>My profile</h2>
      <p style={{color:T.textSecondary,fontSize:13,marginTop:4}}>Fill in your details for better school matches</p>
    </div>
    <div style={{display:"flex",gap:7,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
      {[["personal","Personal"],["academic","Academic"],["athletic","Athletic"],["preferences","Fit"]].map(([id,label])=><Pill key={id} active={sec===id} onClick={()=>setSec(id)}>{label}</Pill>)}
    </div>
    {sec==="personal"&&<div className="fu">
      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Name</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
          <input placeholder="First name" value={student.firstName||""} onChange={e=>updS("firstName",e.target.value)}/>
          <input placeholder="Last name" value={student.lastName||""} onChange={e=>updS("lastName",e.target.value)}/>
        </div>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Contact</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
          <input placeholder="Email" value={student.email||""} onChange={e=>updS("email",e.target.value)}/>
          <input placeholder="Phone" value={student.phone||""} onChange={e=>updS("phone",e.target.value)}/>
        </div>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>School</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <input placeholder="High school name" value={student.highSchool||""} onChange={e=>updS("highSchool",e.target.value)}/>
          <select value={student.graduationYear||"2028"} onChange={e=>updS("graduationYear",e.target.value)}>
            {["2026","2027","2028","2029"].map(y=><option key={y} value={y}>Class of {y}</option>)}
          </select>
        </div>
      </Card>
      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}}>Heritage</div>
        <input placeholder="Family origin (e.g. Colombia)" value={student.parentsOrigin||""} onChange={e=>updS("parentsOrigin",e.target.value)} style={{marginBottom:8}}/>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Languages</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {["English","Spanish","Portuguese","French","Other"].map(l=>{const active=(student.additionalLanguages||[]).includes(l);return <Pill key={l} active={active} onClick={()=>togArr("additionalLanguages",l)}>{l}</Pill>;})}
        </div>
      </Card>
    </div>}
    {sec==="academic"&&<div className="fu">
      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}}>Test scores</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
          {[["GPA","gpa","3.80"],["SAT","satScore","1350"],["ACT","actScore","30"]].map(([l,k,ph])=><div key={k}><div style={{fontSize:10,color:T.textMuted,marginBottom:4}}>{l}</div><input type="number" placeholder={ph} value={student[k]||""} onChange={e=>updS(k,e.target.value)}/></div>)}
        </div>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Intended majors</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {MAJORS.map(m=><Pill key={m} active={(student.majorInterests||[]).includes(m)} onClick={()=>togArr("majorInterests",m)}>{m}</Pill>)}
        </div>
      </Card>
    </div>}
    {sec==="athletic"&&<div className="fu">
      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Sport</div>
        <select value={sport} onChange={e=>setSport(e.target.value)} style={{marginBottom:12}}>
          {SPORTS.map(s=><option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
        </select>
        {sport==="swimming"&&<>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>National percentile</div>
          <select value={student.swimPercentile||""} onChange={e=>updS("swimPercentile",e.target.value)} style={{marginBottom:12}}>
            <option value="">Unknown / not sure</option>
            <option value="top1">Top 1-2% (Olympic Trials)</option>
            <option value="top5">Top 5% (Junior Nationals)</option>
            <option value="top15">Top 10-15% (Sectionals)</option>
            <option value="top25">Top 25% (Regional)</option>
          </select>
          <div style={{fontSize:11,color:T.textMuted,marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Best events</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {EVENTS.map(ev=><Pill key={ev} active={(student.swimEvents||[]).includes(ev)} onClick={()=>togArr("swimEvents",ev)}>{ev}</Pill>)}
          </div>
          {(student.swimEvents||[]).length>0&&<>
            <div style={{fontSize:11,color:T.textMuted,marginBottom:6,textTransform:"uppercase",letterSpacing:".06em"}}>Best times (SCY)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {(student.swimEvents||[]).map(ev=><div key={ev}><div style={{fontSize:11,color:T.textMuted,marginBottom:3}}>{ev}</div><input placeholder="e.g. 52.34" value={(student.swimTimes||{})[ev]||""} onChange={e=>updS("swimTimes",{...student.swimTimes,[ev]:e.target.value})}/></div>)}
            </div>
          </>}
        </>}
      </Card>
    </div>}
    {sec==="preferences"&&<div className="fu">
      <Card style={{marginBottom:12}}>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Max tuition (thousands/yr)</div>
        <input type="number" placeholder="e.g. 40 = $40,000/yr" value={student.maxTuition||""} onChange={e=>updS("maxTuition",e.target.value)} style={{marginBottom:12}}/>
        <div style={{fontSize:11,color:T.textMuted,marginBottom:8,textTransform:"uppercase",letterSpacing:".06em"}}>Priorities</div>
        {[["needAthletic","Athletic scholarship required"],["latinCommunityPref","Latin community important"],["bilingualPref","Bilingual campus preferred"]].map(([k,label])=><div key={k} onClick={()=>updS(k,!student[k])} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,marginBottom:8,cursor:"pointer",background:student[k]?T.violet+"22":T.navyMid,border:`1px solid ${student[k]?T.violet:T.navyBorder}`}}>
          <div style={{width:18,height:18,borderRadius:5,flexShrink:0,background:student[k]?T.violet:T.navyBorder,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {student[k]&&<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          </div>
          <span style={{fontSize:13,color:student[k]?T.textPrimary:T.textSecondary}}>{label}</span>
        </div>)}
      </Card>
    </div>}
    <Btn onClick={doSave} full>{savedMsg?"✓ Saved!":"Save profile"}</Btn>
  </div>;}

export default function App(){
  const [screen,setScreen]=useState("splash");
  const [sport,setSport]=useState("");
  const [tab,setTab]=useState("home");
  const [student,setStudent]=useState(EP);
  const [saved,setSaved]=useState([]);
  const [fups,setFups]=useState({});
  const [notes,setNotes]=useState({});
  const [customEvents]=useState([]);
  const [savedMsg,setSavedMsg]=useState(false);

  useEffect(()=>{
    try{const d=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");if(d.student)setStudent(d.student);if(d.saved)setSaved(d.saved);if(d.fups)setFups(d.fups);if(d.notes)setNotes(d.notes);if(d.sport){setSport(d.sport);setScreen("app");}else if(d.seenSplash)setScreen("sport");}catch(e){}
  },[]);

  function persist(ns,nsa,nf,nn,nsp){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify({student:ns||student,saved:nsa||saved,fups:nf||fups,notes:nn||notes,sport:nsp!==undefined?nsp:sport,seenSplash:true}));}catch(e){}
  }

  function updS(k,v){const ns={...student,[k]:v};setStudent(ns);persist(ns);}
  function togArr(k,v){const a=student[k]||[];const ns={...student,[k]:a.includes(v)?a.filter(x=>x!==v):[...a,v]};setStudent(ns);persist(ns);}
  function togSave(id){const ns=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];setSaved(ns);persist(null,ns);}
  function addFup(id,type){const k=`${id}`,ex=fups[k]||[],nf={...fups,[k]:[...ex,{type,date:new Date().toLocaleDateString(),done:false}]};setFups(nf);persist(null,null,nf);}
  function togFup(id,i){const k=`${id}`,a=(fups[k]||[]).map((f,j)=>j===i?{...f,done:!f.done}:f),nf={...fups,[k]:a};setFups(nf);persist(null,null,nf);}
  function remFup(id,i){const k=`${id}`,a=(fups[k]||[]).filter((_,j)=>j!==i),nf={...fups,[k]:a};setFups(nf);persist(null,null,nf);}
  function updNote(id,v){const nn={...notes,[`${id}`]:v};setNotes(nn);persist(null,null,null,nn);}
  function doSave(){persist(student,saved,fups,notes,sport);setSavedMsg(true);setTimeout(()=>setSavedMsg(false),2000);}
  function selectSport(s){setSport(s);setScreen("app");persist(null,null,null,null,s);}

  const savedUnis=UNIVERSITIES.filter(u=>saved.includes(u.id)).map(u=>({...u,ms:calcMatch(student,u)}));

  if(screen==="splash")return <><style>{css}</style><SplashScreen onContinue={()=>{persist();setScreen("sport");}}/></>;
  if(screen==="sport")return <><style>{css}</style><SportSelector onSelect={selectSport}/></>;

  return <>
    <style>{css}</style>
    <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",display:"flex",flexDirection:"column",background:T.navy}}>
      <div style={{flex:1,overflowY:"auto"}}>
        {tab==="home"&&<HomeTab student={student} savedUnis={savedUnis} fups={fups} sport={sport} setTab={setTab} customEvents={customEvents}/>}
        {tab==="search"&&<SearchTab student={student} saved={saved} togSave={togSave} fups={fups} addFup={addFup} notes={notes} updNote={updNote}/>}
        {tab==="tracker"&&<TrackerTab savedUnis={savedUnis} fups={fups} addFup={addFup} togFup={togFup} remFup={remFup} notes={notes}/>}
        {tab==="times"&&<TimesTab student={student} updS={updS}/>}
        {tab==="profile"&&<ProfileTab student={student} updS={updS} togArr={togArr} doSave={doSave} savedMsg={savedMsg} sport={sport} setSport={s=>{setSport(s);persist(null,null,null,null,s);}}/>}
      </div>
      <BottomNav tab={tab} setTab={setTab}/>
    </div>
  </>;}
