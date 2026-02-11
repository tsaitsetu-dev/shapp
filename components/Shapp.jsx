'use client';

import { useState, useCallback, useMemo } from "react";

/* ═══ NYC STORE DATA ═══ */
const NYC = {
"Nike":[{name:"Nike House of Innovation",address:"650 5th Ave"},{name:"Nike SoHo",address:"529 Broadway"},{name:"Nike Williamsburg",address:"68 N 6th St, Brooklyn"}],
"Zara":[{name:"Zara SoHo",address:"503 Broadway"},{name:"Zara Fifth Ave",address:"666 5th Ave"},{name:"Zara 34th St",address:"39 W 34th St"},{name:"Zara Hudson Yards",address:"20 Hudson Yards"}],
"Sephora":[{name:"Sephora Times Square",address:"1535 Broadway"},{name:"Sephora Flatiron",address:"119 5th Ave"},{name:"Sephora SoHo",address:"555 Broadway"},{name:"Sephora UES",address:"1263 3rd Ave"}],
"Target":[{name:"Target Herald Square",address:"112 W 34th St"},{name:"Target Tribeca",address:"255 Greenwich St"},{name:"Target Kips Bay",address:"500 E 33rd St"},{name:"Target East Harlem",address:"517 E 117th St"},{name:"Target Atlantic Terminal",address:"139 Flatbush Ave, Brooklyn"}],
"Uniqlo":[{name:"Uniqlo Fifth Ave",address:"666 5th Ave"},{name:"Uniqlo SoHo",address:"546 Broadway"},{name:"Uniqlo 34th St",address:"31 W 34th St"}],
"Apple":[{name:"Apple Fifth Ave",address:"767 5th Ave"},{name:"Apple SoHo",address:"103 Prince St"},{name:"Apple Grand Central",address:"45 Grand Central Terminal"},{name:"Apple Williamsburg",address:"247 Bedford Ave, Brooklyn"},{name:"Apple WTC",address:"185 Greenwich St"}],
"H&M":[{name:"H&M Herald Square",address:"1328 Broadway"},{name:"H&M Fifth Ave",address:"589 5th Ave"},{name:"H&M SoHo",address:"515 Broadway"},{name:"H&M Times Square",address:"226 W 42nd St"}],
"Nordstrom":[{name:"Nordstrom Flagship",address:"225 W 57th St"},{name:"Nordstrom Rack Union Sq",address:"60 E 14th St"},{name:"Nordstrom Rack FiDi",address:"60 Fulton St"}],
"Macy’s":[{name:"Macy’s Herald Square",address:"151 W 34th St"}],
"Bloomingdale’s":[{name:"Bloomingdale’s 59th St",address:"1000 3rd Ave"},{name:"Bloomingdale’s SoHo",address:"504 Broadway"}],
"Lululemon":[{name:"Lululemon Flatiron",address:"1166 Broadway"},{name:"Lululemon SoHo",address:"481 Broadway"},{name:"Lululemon Columbus Cir",address:"1928 Broadway"}],
"Best Buy":[{name:"Best Buy Union Sq",address:"52 E 14th St"},{name:"Best Buy Midtown",address:"1880 Broadway"}],
"Whole Foods":[{name:"Whole Foods Columbus Cir",address:"10 Columbus Cir"},{name:"Whole Foods Union Sq",address:"4 Union Square S"},{name:"Whole Foods Tribeca",address:"270 Greenwich St"},{name:"Whole Foods Williamsburg",address:"238 Bedford Ave, Brooklyn"}],
"Trader Joe’s":[{name:"Trader Joe’s Union Sq",address:"142 E 14th St"},{name:"Trader Joe’s Chelsea",address:"675 6th Ave"},{name:"Trader Joe’s UWS",address:"2073 Broadway"},{name:"Trader Joe’s Brooklyn",address:"130 Court St, Brooklyn"}],
"Adidas":[{name:"Adidas Flagship",address:"565 5th Ave"},{name:"Adidas SoHo",address:"115 Spring St"}],
"MUJI":[{name:"MUJI Fifth Ave",address:"475 5th Ave"},{name:"MUJI Hudson Yards",address:"20 Hudson Yards"}],
"Urban Outfitters":[{name:"Urban Outfitters SoHo",address:"628 Broadway"},{name:"Urban Outfitters Herald Sq",address:"1333 Broadway"}],
"Foot Locker":[{name:"Foot Locker 34th St",address:"120 W 34th St"},{name:"Foot Locker Times Sq",address:"1560 Broadway"}],
"Bath & Body Works":[{name:"Bath & Body Works Times Sq",address:"1540 Broadway"}],
"REI":[{name:"REI SoHo",address:"303 Lafayette St"}],
};

/* ═══ HELPERS ═══ */
const COLORS=["#E8590C","#2563EB","#16A34A","#9333EA","#DB2777","#CA8A04","#0891B2","#4F46E5","#DC2626","#059669"];
const gc=i=>COLORS[i%COLORS.length];
const ini=n=>(n||"?").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
const exSt=url=>{try{return new URL(url).hostname.replace("www.","").split(".")[0].replace(/^./,c=>c.toUpperCase())}catch{return null}};
const isUr=s=>{try{new URL(s);return true}catch{return false}};
function findL(store){if(NYC[store])return NYC[store];const l=store.toLowerCase();for(const[k,v]of Object.entries(NYC))if(k.toLowerCase().includes(l)||l.includes(k.toLowerCase()))return v;return null;}

/* ═══ THEME ═══ */
const T={accent:"#E8590C",acDk:"#D14E0A",acLt:"#FFF3EE",bg:"#FAF8F5",card:"#FFF",bdr:"#E8E4DF",tx:"#1A1614",mt:"#8C8279",sub:"#F3F0ED"};

/* ═══ INVITE PANEL — link + past friends ═══ */
function InvitePanel({dayId,dayName,currentIds,allFriends,onAdd,onClose}){
const[copied,setCopied]=useState(false);
const[search,setSearch]=useState("");
const link=`https://squadshop.app/join/${dayId.slice(0,8)}`;
const past=allFriends.filter(f=>!currentIds.includes(f.id));
const filt=past.filter(f=>!search||f.name.toLowerCase().includes(search.toLowerCase())||(f.email||"").toLowerCase().includes(search.toLowerCase()));
const copy=()=>{if(navigator.clipboard)navigator.clipboard.writeText(link).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000)};
const inp={padding:"10px 14px",borderRadius:10,border:`1.5px solid ${T.bdr}`,fontSize:14,fontFamily:"‘DM Sans’,sans-serif",background:T.bg,width:"100%"};
return(
<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:16}} onClick={onClose}>
<div className="sc" onClick={e=>e.stopPropagation()} style={{background:T.card,borderRadius:20,padding:24,maxWidth:440,width:"100%",maxHeight:"85vh",overflowY:"auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
<h3 style={{fontSize:17,fontWeight:700}}>Invite to "{dayName}"</h3>
<button onClick={onClose} style={{background:"none",border:"none",color:T.mt,padding:4}}>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
</button>
</div>

```
    <label style={{fontSize:11,fontWeight:700,color:T.mt,textTransform:"uppercase",letterSpacing:.8,marginBottom:8,display:"block"}}>🔗 Share invite link</label>
    <div style={{display:"flex",gap:8,marginBottom:8}}>
      <div style={{flex:1,padding:"10px 14px",background:T.bg,borderRadius:10,border:`1.5px solid ${T.bdr}`,fontSize:13,color:T.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{link}</div>
      <button onClick={copy} style={{padding:"10px 18px",borderRadius:10,border:"none",fontSize:13,fontWeight:600,background:copied?"#16A34A":T.accent,color:"#FFF",transition:"background .15s",flexShrink:0,display:"flex",alignItems:"center",gap:5}}>
        {copied?<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Copied</>:<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy</>}
      </button>
    </div>
    <p style={{fontSize:12,color:T.mt,marginBottom:20,lineHeight:1.5}}>Anyone with this link can join. New users sign up with their name, existing users see an invite notification.</p>

    {past.length>0&&<>
      <div style={{height:1,background:T.bdr,margin:"0 -24px 20px"}}/>
      <label style={{fontSize:11,fontWeight:700,color:T.mt,textTransform:"uppercase",letterSpacing:.8,marginBottom:8,display:"block"}}>👥 Add from past trips</label>
      {past.length>3&&<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search friends..." style={{...inp,marginBottom:10}}/>}
      <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:220,overflowY:"auto"}}>
        {filt.map((f,i)=>(
          <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:T.bg,borderRadius:10}}>
            <span style={{width:32,height:32,borderRadius:"50%",background:gc(i+1),color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{ini(f.name)}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600}}>{f.name}</div>
              {f.email&&<div style={{fontSize:11,color:T.mt,overflow:"hidden",textOverflow:"ellipsis"}}>{f.email}</div>}
            </div>
            <button onClick={()=>onAdd(f)} style={{padding:"5px 14px",borderRadius:8,border:`1.5px solid ${T.accent}`,background:"transparent",color:T.accent,fontSize:12,fontWeight:600,transition:"all .15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=T.accent;e.currentTarget.style.color="#FFF"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.accent}}>+ Add</button>
          </div>
        ))}
        {filt.length===0&&<p style={{fontSize:13,color:T.mt,padding:10}}>No matching friends.</p>}
      </div>
    </>}
  </div>
</div>

);
}

/* ═══════════════════════════════════════════════════════════════
MAIN APP
═══════════════════════════════════════════════════════════════ */
export default function SquadShop(){
const ME_ID="u1";
const[me,setMe]=useState(null);
const[loginName,setLoginName]=useState("");
const[loginEmail,setLoginEmail]=useState("");
const[loginErr,setLoginErr]=useState("");
const[showInvite,setShowInvite]=useState(false);
const meId=me?.id||ME_ID;
const meName=me?.name||"You";

const[pendingInvites,setPendingInvites]=useState([
{id:"inv1",dayId:"d-inv",dayName:"Brooklyn Vintage Hunt",fromName:"Mika",fromId:"u2"},
]);

const[days,setDays]=useState([
{id:"d1",name:"Weekend SoHo Run",by:"u1",
friends:[{id:"u1",name:"You",email:"you@email.com"},{id:"u2",name:"Mika",email:"mika@email.com"},{id:"u3",name:"Jordan",email:"jordan@email.com"}],
items:[
{id:"i1",name:"White sneakers",store:"Nike",url:"",by:"u1",assigned:["u1","u3"]},
{id:"i2",name:"Foundation",store:"Sephora",url:"",by:"u2",assigned:["u2"]},
{id:"i3",name:"Oversized blazer",store:"Zara",url:"https://www.zara.com/us/en/oversized-blazer",by:"u3",assigned:[]},
{id:"i4",name:"USB-C cable",store:"Apple",url:"",by:"u1",assigned:["u1"]},
{id:"i5",name:"Protein bars",store:"Trader Joe’s",url:"",by:"u1",assigned:["u1","u2"]},
]},
{id:"d2",name:"Birthday Gift Run",by:"u1",
friends:[{id:"u1",name:"You",email:"you@email.com"},{id:"u4",name:"Priya",email:"priya@email.com"}],
items:[
{id:"i6",name:"Candles set",store:"Bath & Body Works",url:"",by:"u1",assigned:["u1"]},
{id:"i7",name:"Lipstick",store:"Sephora",url:"",by:"u4",assigned:["u4"]},
{id:"i8",name:"Notebook + pens",store:"MUJI",url:"",by:"u1",assigned:["u1","u4"]},
]},
]);

const[dayId,setDayId]=useState(null);
const[tab,setTab]=useState("items");
const[expanded,setExpanded]=useState({});
const[mode,setMode]=useState("manual");
const[ni,setNi]=useState({name:"",store:"",url:""});
const[err,setErr]=useState("");
const[showNew,setShowNew]=useState(false);
const[nd,setNd]=useState({name:""});
const[assigning,setAssigning]=useState(null);

const day=days.find(d=>d.id===dayId);

const allKnown=useMemo(()=>{const m={};days.forEach(d=>d.friends.forEach(f=>{if(f.id!==meId)m[f.id]=f}));return Object.values(m)},[days,meId]);

const stores=useMemo(()=>{if(!day)return{};return day.items.reduce((a,it)=>{const s=it.store||exSt(it.url)||"Unknown";(a[s]=a[s]||[]).push(it);return a},{});},[day]);
const sc=Object.keys(stores).length;

const createDay=()=>{if(!nd.name.trim()||!me)return;const d={id:`d${Date.now()}`,name:nd.name,by:meId,friends:[{id:meId,name:meName,email:me?.email||""}],items:[]};setDays(p=>[...p,d]);setNd({name:""});setShowNew(false);setDayId(d.id)};

const addFriendToDay=f=>{if(!day||day.friends.some(x=>x.id===f.id))return;setDays(p=>p.map(d=>d.id===dayId?{...d,friends:[...d.friends,f]}:d))};

const acceptInvite=inv=>{const newD={id:inv.dayId,name:inv.dayName,by:inv.fromId,friends:[{id:meId,name:meName,email:me?.email||""},{id:inv.fromId,name:inv.fromName,email:""}],items:[]};setDays(p=>[...p,newD]);setPendingInvites(p=>p.filter(i=>i.id!==inv.id))};
const declineInvite=id=>{setPendingInvites(p=>p.filter(i=>i.id!==id))};

const addItem=useCallback(()=>{if(!day)return;setErr("");let item;if(mode==="url"){if(!ni.url||!isUr(ni.url)){setErr("Enter a valid URL");return}item={id:`i${Date.now()}`,name:"",store:exSt(ni.url)||"",url:ni.url,by:meId,assigned:[]}}else{if(!ni.name.trim()){setErr("Enter an item name");return}if(!ni.store.trim()){setErr("Enter a store");return}item={id:`i${Date.now()}`,name:ni.name,store:ni.store,url:"",by:meId,assigned:[]}}setDays(p=>p.map(d=>d.id===dayId?{...d,items:[...d.items,item]}:d));setNi({name:"",store:"",url:""})},[mode,ni,dayId,day,meId]);

const removeItem=useCallback(iid=>{if(!day)return;const it=day.items.find(i=>i.id===iid);if(it&&it.by!==meId)return;setDays(p=>p.map(d=>d.id===dayId?{...d,items:d.items.filter(i=>i.id!==iid)}:d))},[dayId,day,meId]);

const toggleAssign=(iid,fid)=>{setDays(p=>p.map(d=>d.id!==dayId?d:{...d,items:d.items.map(it=>it.id!==iid?it:{...it,assigned:it.assigned.includes(fid)?it.assigned.filter(f=>f!==fid):[...it.assigned,fid]})}))};

const deleteDay=did=>{setDays(p=>p.filter(d=>d.id!==did));if(dayId===did)setDayId(null)};
const gf=fid=>day?.friends.find(f=>f.id===fid);
const gfi=fid=>day?.friends.findIndex(f=>f.id===fid)??0;

const css=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:wght@600;700;800&display=swap'); *{box-sizing:border-box;margin:0;padding:0}input::placeholder{color:${T.mt};opacity:.55}input:focus,select:focus{outline:none;border-color:${T.accent}!important;box-shadow:0 0 0 3px ${T.accent}22}button{cursor:pointer;font-family:'DM Sans',sans-serif}textarea{font-family:'DM Sans',sans-serif} @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} @keyframes si{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}} @keyframes sc{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}} .fu{animation:fu .3s ease forwards}.si{animation:si .25s ease forwards}.sc{animation:sc .2s ease forwards}`;

const inp={padding:"10px 14px",borderRadius:10,border:`1.5px solid ${T.bdr}`,fontSize:14,fontFamily:"‘DM Sans’,sans-serif",background:T.bg,width:"100%"};
const btnP={padding:"11px 20px",background:T.accent,color:"#FFF",border:"none",borderRadius:10,fontSize:14,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:"100%",transition:"background .15s"};

const I={
Plus:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
Trash:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
Link:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
Pin:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
Chev:({o})=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{transform:o?"rotate(90deg)":"rotate(0)",transition:"transform .2s"}}><polyline points="9 18 15 12 9 6"/></svg>,
Bag:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
Store:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
Users:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
Back:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
Cal:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
Lock:()=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
Check:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
X:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
Mail:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
Bell:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
};

const doLogin=()=>{if(!loginName.trim()||!loginEmail.trim()){setLoginErr("Please enter name and email");return}const u={id:ME_ID,name:loginName.trim(),email:loginEmail.trim()};setMe(u);setDays(p=>p.map(d=>({...d,friends:d.friends.map(f=>f.id===ME_ID?{...f,name:u.name,email:u.email}:f)})))};

/* ═══ LOGIN SCREEN ═══ */
if(!me)return(
<div style={{minHeight:"100vh",background:T.bg,fontFamily:"‘DM Sans’,sans-serif",color:T.tx,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
<style>{css}</style>
<div className="sc" style={{maxWidth:400,width:"100%"}}>
<div style={{textAlign:"center",marginBottom:32}}>
<div style={{width:56,height:56,borderRadius:16,background:T.accent,display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#FFF",marginBottom:16}}><I.Bag/></div>
<h1 style={{fontFamily:"‘Playfair Display’,serif",fontWeight:800,fontSize:32,letterSpacing:"-.5px",marginBottom:6}}>Squad Shop</h1>
<p style={{color:T.mt,fontSize:15}}>Plan group shopping trips in NYC</p>
</div>
<div style={{background:T.card,borderRadius:20,padding:28,border:`1px solid ${T.bdr}`,boxShadow:"0 4px 24px rgba(0,0,0,.06)"}}>
<h2 style={{fontSize:18,fontWeight:700,marginBottom:20}}>Get Started</h2>
<label style={{fontSize:11,fontWeight:700,color:T.mt,textTransform:"uppercase",letterSpacing:.8,marginBottom:6,display:"block"}}>Your Name</label>
<input value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder="e.g. Alex" style={{...inp,marginBottom:14}}/>
<label style={{fontSize:11,fontWeight:700,color:T.mt,textTransform:"uppercase",letterSpacing:.8,marginBottom:6,display:"block"}}>Email</label>
<input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="you@email.com" onKeyDown={e=>e.key==="Enter"&&doLogin()} style={{...inp,marginBottom:6}}/>
{loginErr&&<p style={{color:"#D63B15",fontSize:12,marginBottom:8,fontWeight:500}}>{loginErr}</p>}
<p style={{fontSize:12,color:T.mt,marginBottom:18}}>Your email is used to save trips and receive invites.</p>
<button onClick={doLogin} style={{...btnP,padding:"13px 20px",boxShadow:"0 2px 12px rgba(232,89,12,.25)"}} onMouseEnter={e=>e.currentTarget.style.background=T.acDk} onMouseLeave={e=>e.currentTarget.style.background=T.accent}>Continue →</button>
</div>
<p style={{textAlign:"center",fontSize:12,color:T.mt,marginTop:16}}>No password needed for beta.</p>
</div>
</div>
);

/* ═══ DAYS LIST SCREEN ═══ */
if(!dayId)return(
<div style={{minHeight:"100vh",background:T.bg,fontFamily:"‘DM Sans’,sans-serif",color:T.tx}}>
<style>{css}</style>
<div style={{background:"linear-gradient(135deg,#1A1614,#2C2420)",padding:"34px 24px 30px",borderBottom:`3px solid ${T.accent}`}}>
<div style={{maxWidth:540,margin:"0 auto"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
<div style={{width:44,height:44,borderRadius:12,background:T.accent,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF"}}><I.Bag/></div>
<h1 style={{fontFamily:"‘Playfair Display’,serif",fontWeight:800,fontSize:28,color:"#FFF",letterSpacing:"-.5px"}}>Squad Shop</h1>
</div>
<p style={{color:"#B8AFA7",fontSize:14,marginLeft:56}}>NYC group shopping trips</p>
<div style={{display:"flex",alignItems:"center",gap:8,marginTop:14,marginLeft:56,padding:"6px 12px 6px 6px",background:"rgba(255,255,255,.06)",borderRadius:20,width:"fit-content"}}>
<span style={{width:24,height:24,borderRadius:"50%",background:T.accent,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{ini(meName)}</span>
<span style={{fontSize:12,color:"#D4CDC6"}}>{meName}</span>
<span style={{fontSize:11,color:"#8C8279"}}>· {me?.email||""}</span>
</div>
</div>
</div>
<div style={{maxWidth:540,margin:"0 auto",padding:"24px 16px 80px"}}>

```
    {/* Pending invites */}
    {pendingInvites.length>0&&(
      <div style={{marginBottom:20}}>
        <label style={{fontSize:11,fontWeight:700,color:T.mt,textTransform:"uppercase",letterSpacing:.8,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
          <I.Bell/> Pending Invites
          <span style={{background:"#DC2626",color:"#FFF",fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:20}}>{pendingInvites.length}</span>
        </label>
        {pendingInvites.map(inv=>(
          <div key={inv.id} className="fu" style={{background:T.card,borderRadius:12,padding:"14px 16px",border:`1px solid ${T.accent}44`,marginBottom:8,boxShadow:`0 0 0 1px ${T.accent}11`,display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,borderRadius:10,background:T.acLt,display:"flex",alignItems:"center",justifyContent:"center",color:T.accent,flexShrink:0}}><I.Mail/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:600}}>{inv.dayName}</div>
              <div style={{fontSize:12,color:T.mt}}>from {inv.fromName}</div>
            </div>
            <button onClick={()=>acceptInvite(inv)} style={{padding:"6px 14px",borderRadius:8,background:T.accent,border:"none",color:"#FFF",fontSize:12,fontWeight:600}}>Join</button>
            <button onClick={()=>declineInvite(inv.id)} style={{padding:"6px 10px",borderRadius:8,background:T.sub,border:"none",color:T.mt,fontSize:12,fontWeight:600}}>✕</button>
          </div>
        ))}
      </div>
    )}

    {/* New Day */}
    {!showNew?(
      <button onClick={()=>setShowNew(true)} style={{...btnP,marginBottom:24,padding:"14px 20px",boxShadow:"0 2px 12px rgba(232,89,12,.25)"}} onMouseEnter={e=>e.currentTarget.style.background=T.acDk} onMouseLeave={e=>e.currentTarget.style.background=T.accent}><I.Plus/> New Shopping Day</button>
    ):(
      <div className="sc" style={{background:T.card,borderRadius:16,padding:22,border:`1px solid ${T.bdr}`,marginBottom:24,boxShadow:"0 4px 20px rgba(0,0,0,.06)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <span style={{fontSize:16,fontWeight:700}}>Create Shopping Day</span>
          <button onClick={()=>setShowNew(false)} style={{background:"none",border:"none",color:T.mt,padding:4}}><I.X/></button>
        </div>
        <input placeholder="Trip name (e.g. Weekend SoHo Run)" value={nd.name} onChange={e=>setNd({name:e.target.value})} onKeyDown={e=>e.key==="Enter"&&createDay()} style={{...inp,marginBottom:14}}/>
        <p style={{fontSize:12,color:T.mt,marginBottom:14}}>🗽 All trips are NYC-based. You can invite friends after creating.</p>
        <button onClick={createDay} style={btnP}><I.Cal/> Create Shopping Day</button>
      </div>
    )}

    {/* Day cards */}
    {days.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:T.mt}}><p style={{fontSize:15}}>No shopping days yet!</p></div>:(
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {days.map((d,idx)=>{
          const dsc=d.items.reduce((a,it)=>{a.add(it.store||exSt(it.url)||"?");return a},new Set()).size;
          return(
            <div key={d.id} className="fu" style={{background:T.card,borderRadius:14,padding:"18px 20px",border:`1px solid ${T.bdr}`,cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.04)",animationDelay:`${idx*.06}s`,transition:"all .2s",position:"relative"}}
              onClick={()=>{setDayId(d.id);setTab("items");setExpanded({});setAssigning(null)}}>
              <div style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,#1A1614,#3A3330)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>🗽</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{d.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                    <span style={{fontSize:12,color:T.mt}}>{d.items.length} items</span>
                    <span style={{fontSize:12,color:T.mt}}>{dsc} stores</span>
                    <span style={{fontSize:12,color:T.mt,display:"flex",alignItems:"center",gap:3}}><I.Users/> {d.friends.length}</span>
                  </div>
                </div>
                <I.Chev o={false}/>
              </div>
              <div style={{display:"flex",marginTop:12,marginLeft:62}}>
                {d.friends.slice(0,6).map((f,fi)=><div key={f.id} style={{width:26,height:26,borderRadius:"50%",background:gc(fi),color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,border:"2px solid #FFF",marginLeft:fi>0?-7:0,zIndex:6-fi}}>{ini(f.name)}</div>)}
                {d.friends.length>6&&<div style={{width:26,height:26,borderRadius:"50%",background:T.sub,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:600,color:T.mt,marginLeft:-7,border:"2px solid #FFF"}}>+{d.friends.length-6}</div>}
              </div>
              <button onClick={e=>{e.stopPropagation();deleteDay(d.id)}} style={{position:"absolute",top:14,right:42,background:"none",border:"none",color:T.mt,padding:4,borderRadius:6,opacity:.3,transition:"opacity .15s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.3}><I.Trash/></button>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>

);

/* ═══ ACTIVE DAY SCREEN ═══ */
return(
<div style={{minHeight:"100vh",background:T.bg,fontFamily:"‘DM Sans’,sans-serif",color:T.tx}}>
<style>{css}</style>
{showInvite&&<InvitePanel dayId={day.id} dayName={day.name} currentIds={day.friends.map(f=>f.id)} allFriends={allKnown} onAdd={f=>{addFriendToDay(f);setShowInvite(false)}} onClose={()=>setShowInvite(false)}/>}

```
  {/* Header */}
  <div style={{background:"linear-gradient(135deg,#1A1614,#2C2420)",padding:"14px 16px 0",borderBottom:`3px solid ${T.accent}`}}>
    <div style={{maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
        <button onClick={()=>setDayId(null)} style={{background:"rgba(255,255,255,.08)",border:"none",borderRadius:10,padding:8,display:"flex",color:"#FFF"}}><I.Back/></button>
        <div style={{flex:1}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:21,color:"#FFF",letterSpacing:"-.3px"}}>{day.name}</h1>
          <span style={{fontSize:12,color:"#B8AFA7"}}>🗽 New York City</span>
        </div>
      </div>

      {/* Friends bar + invite button */}
      <div style={{display:"flex",alignItems:"center",gap:7,margin:"10px 0 12px",overflowX:"auto",paddingBottom:2}}>
        {day.friends.map((f,fi)=>(
          <div key={f.id} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 9px 3px 3px",background:"rgba(255,255,255,.08)",borderRadius:20,flexShrink:0}}>
            <span style={{width:22,height:22,borderRadius:"50%",background:gc(fi),color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>{ini(f.name)}</span>
            <span style={{fontSize:12,color:"#E0DCD7",fontWeight:500}}>{f.name}</span>
          </div>
        ))}
        <button onClick={()=>setShowInvite(true)} style={{padding:"5px 12px",borderRadius:20,background:"rgba(255,255,255,.08)",border:"1px dashed rgba(255,255,255,.25)",color:"#B8AFA7",fontSize:11,fontWeight:600,flexShrink:0,display:"flex",alignItems:"center",gap:4}}>
          <I.Plus/> Invite
        </button>
      </div>

      {/* Tabs */}
      <div style={{display:"flex"}}>
        {[{k:"items",l:"Shopping List",ic:<I.Bag/>,c:day.items.length},{k:"stores",l:"Stores",ic:<I.Store/>,c:sc}].map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} style={{flex:1,padding:"12px 10px",background:tab===t.k?T.card:"transparent",border:"none",borderRadius:"11px 11px 0 0",fontSize:13,fontWeight:tab===t.k?600:400,color:tab===t.k?T.tx:"#8C8279",display:"flex",alignItems:"center",justifyContent:"center",gap:6,transition:"all .15s"}}>
            <span style={{opacity:tab===t.k?1:.5}}>{t.ic}</span>{t.l}
            <span style={{background:tab===t.k?T.accent:"#3A3330",color:"#FFF",fontSize:10,fontWeight:700,padding:"1px 7px",borderRadius:20,minWidth:18,textAlign:"center"}}>{t.c}</span>
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Content */}
  <div style={{maxWidth:600,margin:"0 auto",padding:"20px 16px 80px"}}>

    {/* ITEMS TAB */}
    {tab==="items"&&<div>
      <div style={{background:T.card,borderRadius:16,padding:18,border:`1px solid ${T.bdr}`,marginBottom:20,boxShadow:"0 2px 12px rgba(0,0,0,.04)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <span style={{fontSize:14,fontWeight:600}}>Add Item</span>
          <div style={{display:"flex",background:T.sub,borderRadius:8,overflow:"hidden"}}>
            {["manual","url"].map(m=><button key={m} onClick={()=>{setMode(m);setErr("")}} style={{padding:"5px 12px",border:"none",fontSize:11,fontWeight:500,background:mode===m?T.accent:"transparent",color:mode===m?"#FFF":T.mt,transition:"all .15s"}}>{m==="manual"?"Name + Store":"Paste URL"}</button>)}
          </div>
        </div>
        {mode==="manual"?<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <input placeholder="Item name" value={ni.name} onChange={e=>setNi(p=>({...p,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addItem()} style={{...inp,flex:"2 1 160px"}}/>
          <input placeholder="Store" value={ni.store} onChange={e=>setNi(p=>({...p,store:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addItem()} style={{...inp,flex:"1 1 100px"}}/>
        </div>:<input type="url" placeholder="Paste item URL" value={ni.url} onChange={e=>setNi(p=>({...p,url:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addItem()} style={inp}/>}
        {err&&<p style={{color:"#D63B15",fontSize:12,marginTop:6,fontWeight:500}}>{err}</p>}
        <button onClick={addItem} style={{...btnP,marginTop:12}} onMouseEnter={e=>e.currentTarget.style.background=T.acDk} onMouseLeave={e=>e.currentTarget.style.background=T.accent}><I.Plus/> Add to List</button>
      </div>

      {day.items.length===0?<div style={{textAlign:"center",padding:"48px 20px",color:T.mt}}><p>No items yet. Add your first item!</p></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {day.items.map((it,idx)=>{
            const sn=it.store||exSt(it.url)||"Unknown";const dn=it.name||"Linked item";
            const ab=day.friends.find(f=>f.id===it.by);const abi=day.friends.findIndex(f=>f.id===it.by);
            const own=it.by===meId;const isA=assigning===it.id;
            return(
              <div key={it.id} className="fu" style={{background:T.card,borderRadius:12,padding:"12px 14px",border:`1px solid ${isA?T.accent:T.bdr}`,boxShadow:isA?`0 0 0 2px ${T.accent}22`:"0 1px 4px rgba(0,0,0,.03)",animationDelay:`${idx*.03}s`,transition:"border .15s,box-shadow .15s"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:34,height:34,borderRadius:9,background:T.acLt,display:"flex",alignItems:"center",justifyContent:"center",color:T.accent,fontSize:14,fontWeight:700,flexShrink:0}}>{sn.charAt(0).toUpperCase()}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{dn}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3,flexWrap:"wrap"}}>
                      <span style={{fontSize:11,color:T.mt,fontWeight:500,background:T.sub,padding:"1px 7px",borderRadius:5}}>{sn}</span>
                      {it.url&&<a href={it.url} target="_blank" rel="noopener noreferrer" style={{color:T.accent,display:"flex",alignItems:"center",gap:2,fontSize:11,textDecoration:"none",fontWeight:500}}><I.Link/> Link</a>}
                      {ab&&<span style={{fontSize:11,color:T.mt,display:"flex",alignItems:"center",gap:3}}>
                        <span style={{width:14,height:14,borderRadius:"50%",background:gc(abi),color:"#FFF",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700}}>{ini(ab.name)}</span>{ab.name}
                      </span>}
                    </div>
                  </div>
                  <button onClick={()=>setAssigning(isA?null:it.id)} style={{background:isA?T.accent:T.sub,border:"none",borderRadius:8,padding:"5px 8px",color:isA?"#FFF":T.mt,fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:3,transition:"all .15s"}}><I.Users/> {it.assigned.length||""}</button>
                  {own?<button onClick={()=>removeItem(it.id)} style={{background:"none",border:"none",color:T.mt,padding:4,borderRadius:6,display:"flex",transition:"color .15s"}} onMouseEnter={e=>e.currentTarget.style.color="#D63B15"} onMouseLeave={e=>e.currentTarget.style.color=T.mt}><I.Trash/></button>
                  :<span style={{color:T.mt,opacity:.4,display:"flex",padding:4}} title="Added by someone else"><I.Lock/></span>}
                </div>
                {it.assigned.length>0&&!isA&&<div style={{display:"flex",gap:4,marginTop:8,marginLeft:46,flexWrap:"wrap"}}>
                  {it.assigned.map(fid=>{const f=gf(fid);const fi=gfi(fid);if(!f)return null;
                    return (<span key={fid} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 8px 2px 2px",borderRadius:14,background:`${gc(fi)}10`,fontSize:11,fontWeight:500,color:gc(fi)}}>
                      <span style={{width:16,height:16,borderRadius:"50%",background:gc(fi),color:"#FFF",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700}}>{ini(f.name)}</span>{f.name}
                    </span>)})}
                </div>}
                {isA&&<div className="sc" style={{marginTop:10,padding:"10px 12px",background:T.bg,borderRadius:10,border:`1px solid ${T.bdr}`}}>
                  <p style={{fontSize:10,fontWeight:700,color:T.mt,textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Assign to friends</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {day.friends.map((f,fi)=>{const on=it.assigned.includes(f.id);
                      return (<button key={f.id} onClick={()=>toggleAssign(it.id,f.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px 5px 5px",borderRadius:20,background:on?`${gc(fi)}14`:T.card,border:`1.5px solid ${on?gc(fi):T.bdr}`,fontSize:12,fontWeight:500,color:on?gc(fi):T.mt,transition:"all .15s"}}>
                        <span style={{width:22,height:22,borderRadius:"50%",background:gc(fi),color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>{on?<I.Check/>:ini(f.name)}</span>{f.name}
                      </button>)})}
                  </div>
                </div>}
              </div>
            );
          })}
        </div>
      )}
    </div>}

    {/* STORES TAB */}
    {tab==="stores"&&<div>
      {sc===0?<div style={{textAlign:"center",padding:"48px 20px",color:T.mt}}><p>No stores yet. Add items first.</p></div>:(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {Object.entries(stores).map(([sn,si],idx)=>{
            const op=expanded[sn];const locs=findL(sn);
            return(
              <div key={sn} className="fu" style={{background:T.card,borderRadius:14,overflow:"hidden",border:`1px solid ${T.bdr}`,boxShadow:"0 2px 8px rgba(0,0,0,.04)",animationDelay:`${idx*.05}s`}}>
                <button onClick={()=>setExpanded(p=>({...p,[sn]:!p[sn]}))} style={{width:"100%",padding:"14px 16px",background:"none",border:"none",display:"flex",alignItems:"center",gap:12,textAlign:"left",transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=T.sub} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  <div style={{width:40,height:40,borderRadius:11,background:`linear-gradient(135deg,${T.accent},#F97316)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF",fontSize:17,fontWeight:700,flexShrink:0}}>{sn.charAt(0).toUpperCase()}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:15,fontWeight:600,color:T.tx}}>{sn}</div>
                    <div style={{fontSize:12,color:T.mt,marginTop:2}}>{si.length} item{si.length!==1?"s":""} · {locs?locs.length:"No"} NYC location{(!locs||locs.length!==1)?"s":""}</div>
                  </div>
                  <I.Chev o={op}/>
                </button>
                {op&&<div style={{borderTop:`1px solid ${T.bdr}`,padding:"0 16px 16px"}}>
                  <div style={{padding:"12px 0 8px"}}>
                    <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:T.mt,marginBottom:8}}>Items to get</p>
                    {si.map(it=>{const af=it.assigned.map(fid=>gf(fid)).filter(Boolean);
                      return (<div key={it.id} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:13,color:T.tx}}>
                        <span style={{width:5,height:5,borderRadius:"50%",background:T.accent,flexShrink:0}}/><span style={{flex:1}}>{it.name||"Linked item"}</span>
                        {af.length>0&&<div style={{display:"flex",gap:2}}>{af.map(f=><span key={f.id} style={{width:18,height:18,borderRadius:"50%",background:gc(gfi(f.id)),color:"#FFF",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700}}>{ini(f.name)}</span>)}</div>}
                        {it.url&&<a href={it.url} target="_blank" rel="noopener noreferrer" style={{color:T.accent,display:"flex"}}><I.Link/></a>}
                      </div>)})}
                  </div>
                  <div style={{paddingTop:6}}>
                    <p style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:T.mt,marginBottom:8}}>NYC Locations</p>
                    {locs?<div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {locs.map((l,li)=><div key={li} className="si" style={{display:"flex",alignItems:"flex-start",gap:8,padding:"9px 11px",background:T.bg,borderRadius:9,animationDelay:`${li*.04}s`}}>
                        <span style={{color:T.accent,marginTop:1,flexShrink:0}}><I.Pin/></span>
                        <div><div style={{fontSize:13,fontWeight:500}}>{l.name}</div><div style={{fontSize:11,color:T.mt,marginTop:1}}>{l.address}</div></div>
                      </div>)}
                    </div>:<div style={{padding:12,background:"#FEF6F0",borderRadius:9,fontSize:12,color:"#B5590A",border:"1px dashed #F0C9A8"}}>No pre-loaded NYC locations for {sn}.</div>}
                  </div>
                </div>}
              </div>
            );
          })}
        </div>
      )}
    </div>}
  </div>
</div>

);
}
