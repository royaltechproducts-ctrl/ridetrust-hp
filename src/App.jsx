import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SB_URL = "https://zlaetfkeeuxvvxrdtbqq.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsYWV0ZmtlZXV4dnZ4cmR0YnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzOTEwMDIsImV4cCI6MjEwNjk2NzAwMn0.RsqkPXCnAl7M3mww8x3Sk4DIfYYOsv6TBv-3LqoOX40";
const sb = createClient(SB_URL, SB_KEY);
const ADMIN_PASS   = "RideTrust@RoyalTech2026";
const ADMIN_EMAIL  = "royaltechproducts@gmail.com";
const ADMIN_PHONE  = "+234 909 999 4816";

const genPassword = (prefix) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = prefix;
  for(let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
};

const genReferralCode = (name) => {
  const initials = name.trim().split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,3);
  const rand = Math.floor(1000+Math.random()*9000);
  return "RT-"+initials+rand;
};

const sendAdminEmail = async (subject, message) => {
  // Log to console — in production wire to EmailJS or similar
  console.log("ADMIN EMAIL:", subject, message);
};

// ── Design tokens ─────────────────────────────────────────────
const C = {
  black:   "#0D0D0D",
  orange:  "#E8620A",
  orangeL: "#FF7A20",
  white:   "#FFFFFF",
  offwhite:"#F7F5F2",
  grey:    "#5A5A5A",
  lightgr: "#E8E5E0",
  green:   "#1A7A3C",
  blue:    "#1A4A8A",
  purple:  "#5B21B6",
};

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Barlow',sans-serif;background:${C.offwhite};color:${C.black};line-height:1.6;}
  button{cursor:pointer;border:none;font-family:'Barlow',sans-serif;}
  .cd{font-family:'Barlow Condensed',sans-serif;}

  /* Nav */
  nav{background:${C.black};padding:0 24px;display:flex;justify-content:space-between;align-items:center;height:56px;position:sticky;top:0;z-index:100;}
  .logo{color:${C.white};font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:20px;}
  .logo span{color:${C.orange};}
  .nav-tag{font-size:11px;color:#888;font-weight:600;letter-spacing:1px;}

  /* Hero */
  .hero{padding:72px 24px 60px;text-align:center;}
  .hero-eyebrow{display:inline-block;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 14px;border-radius:2px;margin-bottom:20px;}
  .hero-h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(48px,9vw,96px);line-height:1;text-transform:uppercase;margin-bottom:12px;}
  .hero-sub{font-size:clamp(16px,3vw,22px);margin-bottom:36px;font-weight:600;}
  .hero-body{font-size:15px;max-width:560px;margin:0 auto 36px;line-height:1.8;}

  /* Buttons */
  .btn{display:inline-block;padding:14px 28px;border-radius:6px;font-weight:700;font-size:15px;cursor:pointer;border:none;font-family:'Barlow',sans-serif;}
  .btn-orange{background:${C.orange};color:${C.white};}
  .btn-orange:hover{background:${C.orangeL};}
  .btn-black{background:${C.black};color:${C.white};}
  .btn-outline{background:transparent;border:2px solid currentColor;color:${C.black};}
  .btn-white{background:${C.white};color:${C.black};}
  .btn-full{display:block;width:100%;text-align:center;margin-top:12px;}

  /* Vehicle cards */
  .v-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:32px;}
  .v-card{background:${C.white};border-radius:10px;overflow:hidden;border:1.5px solid ${C.lightgr};}
  .v-head{padding:22px;color:${C.white};}
  .v-tag{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:.8;margin-bottom:8px;}
  .v-emoji{font-size:36px;margin-bottom:8px;}
  .v-name{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:28px;text-transform:uppercase;line-height:1.1;}
  .v-desc{font-size:12px;opacity:.8;margin-top:6px;line-height:1.6;}
  .v-body{padding:20px;}
  .v-row{display:flex;justify-content:space-between;align-items:baseline;padding:9px 0;border-bottom:1px solid ${C.lightgr};font-size:14px;}
  .v-row:last-of-type{border:none;}
  .v-lbl{color:${C.grey};}
  .v-val{font-weight:700;}
  .v-val.hi{color:${C.orange};font-size:16px;}

  /* Steps */
  .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px;margin-top:28px;}
  .step{background:${C.white};border-radius:8px;padding:18px;border-left:4px solid ${C.orange};}
  .step-n{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:40px;color:${C.lightgr};line-height:1;}
  .step-t{font-weight:700;font-size:14px;margin:4px 0;}
  .step-b{font-size:12px;color:${C.grey};line-height:1.6;}

  /* Ref box */
  .ref-box{background:${C.black};color:${C.white};border-radius:10px;padding:28px;margin-top:28px;}
  .ref-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px;}
  .ref-item{background:rgba(255,255,255,.08);border-radius:8px;padding:14px;}
  .ref-item-t{font-weight:700;font-size:14px;margin-bottom:4px;}
  .ref-item-b{font-size:12px;opacity:.75;line-height:1.6;}
  @media(max-width:480px){.ref-grid{grid-template-columns:1fr;}}

  /* LMA */
  .lma-earn{background:${C.black};color:${C.white};border-radius:10px;padding:24px;margin-bottom:20px;}
  .earn-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #2A2A2A;font-size:14px;}
  .earn-row:last-child{border:none;}
  .earn-lbl{color:#AAA;}
  .earn-val{font-weight:700;color:${C.orange};}
  .req-list{list-style:none;}
  .req-list li{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid ${C.lightgr};font-size:14px;color:${C.grey};line-height:1.5;}
  .req-list li:last-child{border:none;}
  .req-list li::before{content:"✓";color:${C.green};font-weight:700;flex-shrink:0;}

  /* Invest */
  .invest-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:28px;}
  .inv-card{border-radius:10px;overflow:hidden;border:1.5px solid ${C.lightgr};}
  .inv-head{padding:24px;color:${C.white};}
  .inv-body{background:${C.white};padding:20px;}
  .inv-row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid ${C.lightgr};font-size:14px;}
  .inv-row:last-of-type{border:none;}
  .inv-lbl{color:${C.grey};}
  .inv-val{font-weight:700;}
  .inv-profit{color:${C.green};font-size:16px;font-weight:900;}

  /* Access page */
  .access-wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;background:${C.black};}
  .access-card{background:${C.white};border-radius:12px;padding:36px;max-width:420px;width:100%;}
  .access-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:32px;text-transform:uppercase;margin-bottom:4px;}
  .access-sub{font-size:13px;color:${C.grey};margin-bottom:24px;}
  .divider-text{display:flex;align-items:center;gap:12px;margin:20px 0;font-size:12px;color:${C.grey};}
  .divider-text::before,.divider-text::after{content:"";flex:1;height:1px;background:${C.lightgr};}
  .interest-btns{display:flex;flex-direction:column;gap:10px;}
  .int-btn{display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:8px;border:1.5px solid ${C.lightgr};background:${C.offwhite};cursor:pointer;text-align:left;font-family:'Barlow',sans-serif;}
  .int-btn:hover{border-color:${C.orange};background:#FFF7F2;}
  .int-icon{font-size:22px;flex-shrink:0;}
  .int-label{font-weight:700;font-size:14px;color:${C.black};}
  .int-sub{font-size:11px;color:${C.grey};}

  /* Sections */
  .wrap{max-width:960px;margin:0 auto;padding:56px 24px;}
  .sec-lbl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;}
  .sec-h2{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(26px,5vw,42px);text-transform:uppercase;line-height:1.1;margin-bottom:12px;}
  .sec-body{font-size:15px;color:${C.grey};line-height:1.8;max-width:620px;}
  .divider{width:48px;height:4px;margin:12px 0 20px;}

  /* Contact */
  .contact-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:24px;}
  .contact-item{background:${C.white};border-radius:8px;padding:18px;border:1.5px solid ${C.lightgr};}
  .contact-icon{font-size:22px;margin-bottom:6px;}
  .contact-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;}
  .contact-val{font-size:13px;font-weight:600;line-height:1.6;}

  /* CTA strip */
  .cta-strip{padding:48px 24px;text-align:center;}
  .cta-h{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(28px,5vw,52px);text-transform:uppercase;color:${C.white};margin-bottom:10px;}
  .cta-s{color:rgba(255,255,255,.8);font-size:15px;margin-bottom:28px;}
  .cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}

  /* Footer */
  footer{background:${C.black};color:#666;padding:24px;text-align:center;font-size:12px;}
  footer strong{color:#AAA;}

  /* Modal */
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;}
  .modal{background:${C.white};border-radius:10px;max-width:500px;width:100%;max-height:92vh;overflow-y:auto;padding:30px;}
  .modal-close{float:right;background:none;border:none;font-size:24px;color:${C.grey};cursor:pointer;margin-top:-6px;}
  .modal-h{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:24px;text-transform:uppercase;margin-bottom:2px;}
  .modal-s{font-size:12px;color:${C.grey};margin-bottom:20px;line-height:1.6;}
  .field{margin-bottom:12px;}
  .field label{display:block;font-size:12px;font-weight:700;margin-bottom:3px;}
  .field input,.field select,.field textarea{width:100%;padding:10px 12px;border:1.5px solid ${C.lightgr};border-radius:6px;font-size:14px;font-family:'Barlow',sans-serif;background:${C.offwhite};}
  .field textarea{min-height:70px;resize:vertical;}
  .field-note{font-size:11px;color:${C.grey};margin-top:3px;line-height:1.5;}
  .snap-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px;border-radius:8px;border:2px dashed;cursor:pointer;font-size:13px;font-weight:700;font-family:'Barlow',sans-serif;background:none;}
  .submit-btn{width:100%;padding:14px;color:${C.white};font-weight:700;font-size:15px;border-radius:6px;border:none;cursor:pointer;margin-top:8px;font-family:'Barlow',sans-serif;}

  /* Toast */
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:${C.black};color:${C.white};padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;z-index:300;}

  @media(max-width:600px){.wrap{padding:40px 16px;}.hero{padding:52px 16px 44px;}}
`;

// ── Shared data ───────────────────────────────────────────────
const CONTACT = [
  {icon:"📍",lbl:"Office",val:"SiteTech Office, Alinas Mall, Opp. Crown Estate, Lekki–Epe Expressway, Lagos"},
  {icon:"📞",lbl:"Phone",val:"+234 806 163 1222"},
  {icon:"💬",lbl:"WhatsApp Only",val:"+234 909 999 4816"},
  {icon:"🏦",lbl:"Bank Account",val:"1016621205 · Zenith Bank\nRoyalTech Partnership & Investment Limited"},
];

const RIDER_STEPS = [
  {n:"01",t:"Apply Online",b:"Fill the short application form. Free. No fees."},
  {n:"02",t:"Get Approved",b:"RoyalTech reviews your application, links you with a Local Managing Agent, and sends you a commitment request."},
  {n:"03",t:"2 Guarantors",b:"Bring 2 guarantors. Each guarantor must be either a committed applicant, an existing rider already on the RideTrust platform, or a Third Party Guarantor with credible capacity to surety."},
  {n:"04",t:"Pay Deposit",b:"Bike: ₦200,000 · Keke: ₦600,000 · Mini (Korope): ₦800,000 · Full Bus/Cab: ₦1,000,000. Spread over 3 months max. All guarantors must be confirmed before deposit is accepted."},
  {n:"05",t:"Take Delivery",b:"Collect your brand new vehicle. Start earning immediately."},
  {n:"06",t:"Weekly Remittance",b:"Pay weekly to RoyalTech. Submit proof to your Managing Agent."},
  {n:"07",t:"Own It",b:"Complete all payments. Ownership transfers to you."},
];

// ── Helper components ─────────────────────────────────────────
function ContactSection({accentColor}){
  return(
    <div className="wrap">
      <div className="sec-lbl" style={{color:accentColor}}>Get In Touch</div>
      <h2 className="sec-h2">Contact RoyalTech</h2>
      <div className="divider" style={{background:accentColor}}/>
      <div className="contact-grid">
        {CONTACT.map(c=>(
          <div className="contact-item" key={c.lbl}>
            <div className="contact-icon">{c.icon}</div>
            <div className="contact-lbl" style={{color:accentColor}}>{c.lbl}</div>
            <div className="contact-val" style={{whiteSpace:"pre-line"}}>{c.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer(){
  return(
    <footer>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,color:"#FFF",marginBottom:6}}>RIDETRUST HP</div>
      <div style={{marginBottom:4}}>Powered by <strong>RoyalTech Partnership & Investment Limited</strong></div>
      <div>© 2026 RoyalTech Partnership & Investment Limited. All rights reserved.</div>
    </footer>
  );
}



// ── Referral URL helpers ──────────────────────────────────────
const BASE_URL = "https://ridetrust.com.ng";
const DEST_MAP = { riders:"ride", lma:"agent", investors:"invest" };

const parseReferral = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    refType: params.get("ref"),   // 'admin' | 'lma' | 'rider'
    refId:   params.get("id"),    // uuid for lma/rider links, null for admin
    dest:    params.get("to"),    // 'riders' | 'lma' | 'investors'
  };
};

const logVisit = async (refType, refId, destination) => {
  if(!refType || !destination) return;
  await sb.from("referral_visits").insert({
    ref_type: refType,
    ref_id:   refId || null,
    destination,
    user_agent: navigator.userAgent,
  });
};

// ── Main App ─────────────────────────────────────────────────
export default function App(){
  // Detect page from URL path — also handles referral ?to= param
  const getPage = () => {
    const { dest } = parseReferral();
    if(dest && DEST_MAP[dest]) return DEST_MAP[dest];
    const h = window.location.hash.replace(/^#\/?/,"").toLowerCase();
    const p = window.location.pathname.replace(/\//g,"").toLowerCase();
    return ["ride","agent","invest"].includes(h) ? h : ["ride","agent","invest"].includes(p) ? p : "access";
  };
  const [page, setPage] = useState(getPage());
  // Listen for hash changes (back/forward button)
  useState(()=>{ const fn=()=>setPage(getPage()); window.addEventListener("hashchange",fn); return ()=>window.removeEventListener("hashchange",fn); });
  const [modal,     setModal]     = useState(null);
  const [form,      setForm]      = useState({});
  const [toast,     setToast]     = useState(null);
  const [loginForm, setLoginForm] = useState({email:"",password:""});
  const [adminOn,   setAdminOn]   = useState(false);
  const [adminTab,  setAdminTab]  = useState("riders");
  const [riders,    setRiders]    = useState([]);
  const [agents,    setAgents]    = useState([]);
  const [investors, setInvestors] = useState([]);
  const [buckets,   setBuckets]   = useState({});
  const [remittances, setRemittances] = useState([]);
  const [remitForm, setRemitForm] = useState({rider_id:"",amount:"",week_number:"",has_lma:true,notes:""});
  const [loading,   setLoading]   = useState(false);
  const [ga4,       setGa4]       = useState(null);
  const [ga4Err,    setGa4Err]    = useState(null);
  // Referral system
  const [refVisits,    setRefVisits]    = useState([]);
  const [refVisitsErr, setRefVisitsErr] = useState(null);
  const [copiedKey,    setCopiedKey]    = useState(null);
  // Rider portal
  const [riderPortal, setRiderPortal] = useState(null); // logged-in rider object
  const [rPortalTab,  setRPortalTab]  = useState("overview");
  const [guarantors,  setGuarantors]  = useState([]);
  const [referrals,   setReferrals]   = useState([]);
  const [gForm,       setGForm]       = useState({name:"",email:"",phone:""});
  const [tpGuarantors, setTpGuarantors] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null); // {msg, onConfirm}

  const setF = (k,v) => setForm(f=>({...f,[k]:v}));
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3500); };
  const navigate  = p => { window.location.href = "/#/"+p; };

  const loadRiderPortal = async (rider) => {
    setRiderPortal(rider);
    setRPortalTab("overview");
    const [g, r, tp] = await Promise.all([
      sb.from("rt_guarantors").select("*").eq("beneficiary_rider_id", rider.id),
      sb.from("rt_referrals").select("*").eq("referrer_id", rider.id),
      sb.from("rt_third_party_guarantors").select("*").eq("rider_id", rider.id),
    ]);
    if(g.data) setGuarantors(g.data);
    if(r.data) setReferrals(r.data);
    if(tp.data) setTpGuarantors(tp.data);
  };

  const handleRiderLogin = async () => {
    const emailVal = loginForm.email.trim().toLowerCase();
    const passVal  = loginForm.password.trim();
    if(!emailVal){ showToast("Please enter your email."); return; }
    // Try email match first, then password match
    let query = sb.from("rt_riders").select("*");
    if(emailVal) query = query.ilike("email", emailVal);
    const { data } = await query;
    if(!data||data.length===0){ showToast("No account found with that email."); return; }
    const rider = data[0];
    // If password provided, verify it
    if(passVal && rider.password !== passVal){ showToast("Incorrect password."); return; }
    loadRiderPortal(rider);
  };

  const handleAdminLogin = () => {
    if(loginForm.password === ADMIN_PASS){ setAdminOn(true); }
    else { showToast("Incorrect password."); }
  };

  const loadData = async () => {
    setLoading(true);
    const [r,a,i,b,rem] = await Promise.all([
      sb.from("rt_riders").select("*").order("created_at",{ascending:false}),
      sb.from("rt_agents").select("*").order("created_at",{ascending:false}),
      sb.from("rt_investors").select("*").order("created_at",{ascending:false}),
      sb.from("rt_buckets").select("*"),
      sb.from("rt_remittances").select("*,rt_riders(full_name,vehicle_type)").order("created_at",{ascending:false}).limit(50),
    ]);
    if(r.data) setRiders(r.data);
    if(a.data) setAgents(a.data);
    if(i.data) setInvestors(i.data);
    if(b.data){ const bMap={}; b.data.forEach(x=>bMap[x.bucket_name]=x); setBuckets(bMap); }
    if(rem.data) setRemittances(rem.data);
    setLoading(false);
  };

  // Fund split formula (Rule 1: Investor fixed priority, Rule 2: LMA=10% of gross, Rule 3: remainder 50% RT / 50% Pool)
  // New split formula (Oct 2026 v2):
  // Rule 1: Investor gets fixed weekly amount (first priority)
  // Rule 2: LMA gets 10% of gross weekly remittance
  // Rule 3: Remainder split 50% RoyalTech / 50% Pool (reserve)
  // bike:  ₦40,000/wk → inv ₦32,000 | LMA 10%=₦4,500* | rem ₦3,500 → rt ₦1,750 | pool ₦1,750
  // keke:  ₦90,000/wk → inv ₦65,000 | LMA 10%=₦9,000  | rem ₦16,000 → rt ₦8,000 | pool ₦8,000
  // mini:  ₦90,000/wk → inv ₦65,000 | LMA 10%=₦9,000  | rem ₦16,000 → rt ₦8,000 | pool ₦8,000
  // full:  ₦120,000/wk → inv ₦90,000 | LMA 10%=₦12,000 | rem ₦18,000 → rt ₦9,000 | pool ₦9,000
  // *Bike LMA amount (₦4,500) is fixed per confirmed rate; lmaRate derived from sp.lma/sp.weekly for split logic
  const SPLIT = {
    bike:  {weekly:40000,  inv:32000, lma:4500,  rt:1750,  reserve:1750},
    keke:  {weekly:90000,  inv:65000, lma:9000,  rt:8000,  reserve:8000},
    mini:  {weekly:90000,  inv:65000, lma:9000,  rt:8000,  reserve:8000},
    full:  {weekly:120000, inv:90000, lma:12000, rt:9000,  reserve:9000},
  };

  // Deposit split — triggered once a rider's deposit bucket hits 100% of target
  // Buckets: D/R-D/B (Rider Discount / LMA Bonus) | RT-RPIT (Reg, Plate, Insurance, Tracker) | RT-PO (Overhead/Profit) | CR-IR (Contingency Reserve — Incentives & Rewards)
  // Deposit split — equal 25% to each of 4 buckets
  const DEPOSIT_SPLIT = {
    bike: {target:200000,  drdb:50000,  rpit:50000,  rtpo:50000,  crir:50000},
    keke: {target:600000,  drdb:150000, rpit:150000, rtpo:150000, crir:150000},
    mini: {target:800000,  drdb:200000, rpit:200000, rtpo:200000, crir:200000},
    full: {target:1000000, drdb:250000, rpit:250000, rtpo:250000, crir:250000},
  };

  // Record a remittance and split into buckets
  const recordRemittance = async () => {
    const rider = riders.find(r=>r.id===remitForm.rider_id);
    if(!rider||!remitForm.amount){ showToast("Select rider and enter amount."); return; }
    const amt = Number(remitForm.amount);
    const vt  = rider.vehicle_type;
    const hasLma = remitForm.has_lma;
    // Split calculation — 3-rule formula
    // Rule 1: Investor gets fixed share (highest priority; shortfall absorbed by reserve)
    // Rule 2: LMA gets 10% of gross weekly remittance
    // Rule 3: Remainder split 50% RoyalTech / 50% Pool
    const sp = SPLIT[vt] || SPLIT.keke;
    const expected = sp.weekly;
    if(amt < sp.inv){
      // Severe shortfall: investor gets everything, others get 0
      const invAmt=amt, agentAmt=0, rtAmt=0, reserveAmt=0;
      await sb.from("rt_remittances").insert({
        rider_id: remitForm.rider_id, vehicle_type: vt,
        week_number: Number(remitForm.week_number)||null,
        amount_received: amt, investor_share: invAmt, agent_share: agentAmt,
        royaltech_share: rtAmt, reserve_share: reserveAmt,
        has_lma: hasLma, status:"short", notes: remitForm.notes||null,
      });
      const bUpdates=[{name:"investor_"+vt,add:invAmt}];
      for(const b of bUpdates){ const cur=buckets[b.name]; if(cur){ await sb.from("rt_buckets").update({balance:(cur.balance||0)+b.add,total_received:(cur.total_received||0)+b.add,updated_at:new Date().toISOString()}).eq("bucket_name",b.name); } }
      setRemitForm({rider_id:"",amount:"",week_number:"",has_lma:true,notes:""});
      await loadData();
      showToast("⚠️ Severe shortfall — investor bucket only, others zeroed.");
      return;
    }
    // Normal / partial split
    const lmaRate  = sp.lma / sp.weekly;                         // Rule 2: rate derived from SPLIT (10% gross, all vehicle types)
    const invAmt   = sp.inv;                                     // Rule 1: fixed investor amount
    const agentAmt = hasLma ? Math.round(amt * lmaRate) : 0;    // Rule 2: lmaRate% of gross to LMA
    const remainder = amt - invAmt - agentAmt;
    const rtAmt      = Math.round(remainder * 0.50);             // Rule 3: 50% of remainder to RoyalTech
    const reserveAmt = remainder - rtAmt;                        // Rule 3: 50% of remainder to Pool (exact)
    // Insert remittance record
    await sb.from("rt_remittances").insert({
      rider_id: remitForm.rider_id,
      vehicle_type: vt,
      week_number: Number(remitForm.week_number)||null,
      amount_received: amt,
      investor_share: invAmt,
      agent_share: agentAmt,
      royaltech_share: rtAmt,
      reserve_share: reserveAmt,
      has_lma: hasLma,
      status: amt >= sp.weekly ? "full" : "short",
      notes: remitForm.notes||null,
    });
    // Update bucket balances
    const bUpdates = [
      {name:"investor_"+vt,   add:invAmt},
      {name:"agent_"+vt,      add:agentAmt},
      {name:"royaltech_"+vt,  add:rtAmt},
      {name:"reserve_"+vt,    add:reserveAmt},
    ];
    for(const b of bUpdates){
      const cur = buckets[b.name];
      if(cur){
        await sb.from("rt_buckets").update({
          balance: (cur.balance||0)+b.add,
          total_received: (cur.total_received||0)+b.add,
          updated_at: new Date().toISOString(),
        }).eq("bucket_name",b.name);
      }
    }
    setRemitForm({rider_id:"",amount:"",week_number:"",has_lma:true,notes:""});
    await loadData();
    showToast(amt>=sp.weekly?"Remittance recorded. All buckets updated.":"⚠️ Short remittance recorded. Contingency reserve absorbs investor shortfall next disbursement.");
  };

  // Log referral visit on mount if URL carries ref params
  useEffect(()=>{
    const { refType, refId, dest } = parseReferral();
    if(refType && dest) logVisit(refType, refId, dest);
  },[]);

  useEffect(()=>{ if(adminOn) loadData(); },[adminOn]);

  useEffect(()=>{
    if(adminOn && adminTab==="analytics" && !ga4){
      fetch("/api/analytics")
        .then(r=>r.json())
        .then(d=>{ if(d.error) setGa4Err(d.error); else setGa4(d); })
        .catch(e=>setGa4Err(e.message));
    }
  },[adminOn, adminTab]);

  useEffect(()=>{
    if(adminOn && adminTab==="referrals"){
      sb.from("referral_visits").select("*").order("visited_at",{ascending:false})
        .then(({data,error})=>{ if(error) setRefVisitsErr(error.message); else setRefVisits(data||[]); });
    }
  },[adminOn, adminTab]);

  const updateStatus = async (table, id, status) => {
    await sb.from(table).update({status}).eq("id",id);
    loadData();
    showToast("Status updated.");
  };

  const confirmUpdate = (msg, fn) => setConfirmDialog({msg, onConfirm: fn});

  const submit = async type => {
    if(!form.name?.trim()||!form.phone?.trim()||!form.email?.trim()){
      showToast("Please fill in all required fields."); return;
    }
    // Capture referral attribution from URL
    const { refType, refId, dest } = parseReferral();
    try {
      if(type==="rider-bike"||type==="rider-keke"||type==="rider-mini"||type==="rider-full"){
        const pwd  = genPassword("R");
        const rcode = genReferralCode(form.name);
        const vtMap = {"rider-bike":"bike","rider-keke":"keke","rider-mini":"mini","rider-full":"full"};
        const { data: newRider } = await sb.from("rt_riders").insert({
          vehicle_type: vtMap[type]||"keke",
          full_name: form.name, phone: form.phone, email: form.email,
          address: form.address||null, experience: form.experience||null,
          referrer: form.referrer||null,
          photo_id: form.photoId||null,
          password: pwd,
          referral_code: rcode,
          referred_by: form.referrer||null,
          ref_type: refType||null,
          ref_id: refId||null,
          app_status: "under_review",
          rider_status: "not_committed",
          hp_discount_balance: 0,
        }).select().single();
        // Mark referral visit as converted
        if(refType && dest){
          await sb.from("referral_visits")
            .update({converted:true})
            .eq("ref_type", refType)
            .eq("destination", dest)
            .eq("converted", false)
            .order("visited_at",{ascending:false})
            .limit(1);
        }
        // Auto mutual guarantee — if referred by someone, link them
        if(form.referrer&&newRider){
          // Find referrer by name or phone
          const {data:referrers} = await sb.from("rt_riders").select("*")
            .or(`phone.ilike.%${form.referrer}%,full_name.ilike.%${form.referrer}%`);
          if(referrers&&referrers.length>0){
            const referrer = referrers[0];
            // Referrer becomes new rider's guarantor (mutual)
            await sb.from("rt_guarantors").insert({
              guarantor_rider_id: referrer.id,
              beneficiary_rider_id: newRider.id,
              guarantor_name: referrer.full_name,
              guarantor_email: referrer.email,
              guarantor_phone: referrer.phone,
              status: "pending",
              guarantee_type: "mutual",
            });
            // New rider becomes referrer's guarantor (mutual)
            await sb.from("rt_guarantors").insert({
              guarantor_rider_id: newRider.id,
              beneficiary_rider_id: referrer.id,
              guarantor_name: newRider.full_name,
              guarantor_email: newRider.email,
              guarantor_phone: newRider.phone,
              status: "pending",
              guarantee_type: "mutual",
            });
          }
        }
        // Admin notification email
        const vType = {"rider-bike":"Dispatch Bike","rider-keke":"Keke Tricycle","rider-mini":"Mini Korope (4-Wheel)","rider-full":"Full Bus / Cab (4-Wheel)"}[type]||"Keke Tricycle";
        const waMsg = `New RideTrust ${vType} Application\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nAddress: ${form.address||"—"}\nExperience: ${form.experience||"—"}\nReferral Code: ${rcode}\n\nAction Required: Review ID and update application status.`;
        await sendAdminEmail(
          `New ${vType} Application — ${form.name}`,
          `A new rider application has been submitted.\n\n${waMsg}\n\n---\nWHATSAPP TO: ${form.phone}\nMessage: Dear ${form.name}, your RideTrust HP application has been received. Your portal access:\nEmail: ${form.email}\nPassword: ${pwd}\n\nLog in at: tbvap.vercel.app\nYour referral code: ${rcode}\n\nRideTrust HP | RoyalTech`
        );
      } else if(type==="lma"){
        await sb.from("rt_agents").insert({
          full_name: form.name, phone: form.phone, email: form.email,
          address: form.address||null,
          utility_bill: form.utilityBill||null,
          parking_photo: form.parkingPhoto||null,
          photo_id: form.photoId||null,
          tech_skills: form.techSkills?Number(form.techSkills):null,
          biz_experience: form.bizExp?Number(form.bizExp):null,
          ref_type: refType||null,
          ref_id: refId||null,
        });
        if(refType && dest){
          await sb.from("referral_visits").update({converted:true})
            .eq("ref_type",refType).eq("destination",dest).eq("converted",false)
            .order("visited_at",{ascending:false}).limit(1);
        }
      } else if(type==="invest-bike"||type==="invest-keke"||type==="invest-mini"||type==="invest-full"){
        const pkgMap = {"invest-bike":"bike","invest-keke":"keke","invest-mini":"mini","invest-full":"full"};
        await sb.from("rt_investors").insert({
          package_type: pkgMap[type]||"keke",
          full_name: form.name, phone: form.phone, email: form.email,
          units: form.units?Number(form.units.split(" ")[0]):1,
          photo_id: form.photoId||null,
          notes: form.notes||null,
          ref_type: refType||null,
          ref_id: refId||null,
        });
        if(refType && dest){
          await sb.from("referral_visits").update({converted:true})
            .eq("ref_type",refType).eq("destination",dest).eq("converted",false)
            .order("visited_at",{ascending:false}).limit(1);
        }
      }
      showToast("Application submitted! Check your email for your portal access details.");
      setModal(null); setForm({});
    } catch(e) {
      showToast("Submission failed. Please try again."); 
    }
  };

  const handleLogin = async () => {
    const passVal = loginForm.password.trim();
    if(passVal === ADMIN_PASS){ setAdminOn(true); return; }
    // Try rider login
    await handleRiderLogin();
  };

  return(
    <>
      <style>{S}</style>

      {/* ══ ACCESS PAGE (default / no link) ══════════════════ */}
      {page==="access"&&(
        <div className="access-wrap">
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,color:C.white}}>
              RIDE<span style={{color:C.orange}}>TRUST</span> HP
            </div>
            <div style={{fontSize:12,color:"#666",marginTop:4}}>Powered by RoyalTech Partnership & Investment Limited</div>
          </div>
          <div className="access-card">
            <div className="access-title cd">Welcome Back</div>
            <div className="access-sub">Enter your credentials to access your portal.</div>
            <div className="field"><label>Email Address</label><input type="email" placeholder="your@email.com" value={loginForm.email} onChange={e=>setLoginForm(f=>({...f,email:e.target.value}))}/></div>
            <div className="field"><label>Password</label><input type="password" placeholder="Your password" value={loginForm.password} onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/></div>
            <button className="btn btn-orange btn-full" style={{marginTop:4}} onClick={handleLogin}>Access My Portal</button>
            <div style={{textAlign:"center",marginTop:12}}>
              <button onClick={()=>showToast("Password reset — contact RoyalTech on WhatsApp: +234 909 999 4816")} style={{background:"none",border:"none",color:C.grey,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>Forgot your password?</button>
            </div>

            <div className="divider-text">Not Registered Yet?</div>
            <div style={{fontSize:12,color:C.grey,marginBottom:12,textAlign:"center"}}>Click on your interest for more information and to sign up</div>
            <div className="interest-btns">
              <button className="int-btn" onClick={()=>navigate("ride")}>
                <span className="int-icon">🛺</span>
                <div><div className="int-label">Sign Up to Ride on Hire Purchase</div><div className="int-sub">Brand new bike or keke — own it fully</div></div>
              </button>
              <button className="int-btn" onClick={()=>navigate("agent")}>
                <span className="int-icon">🏢</span>
                <div><div className="int-label">Sign Up to Become a Local Managing Agent</div><div className="int-sub">Manage riders. Earn weekly commissions.</div></div>
              </button>
              <button className="int-btn" onClick={()=>navigate("invest")}>
                <span className="int-icon">💰</span>
                <div><div className="int-label">Sign Up for Investment Without Stress</div><div className="int-sub">Put in capital. Receive returns. Zero operations.</div></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ RIDER PORTAL ═════════════════════════════════════ */}
      {page==="access"&&riderPortal&&!adminOn&&(
        <div style={{position:"fixed",inset:0,background:C.offwhite,zIndex:500,overflowY:"auto"}}>
          {/* Nav */}
          <div style={{background:C.black,padding:"0 20px",display:"flex",justifyContent:"space-between",alignItems:"center",height:56,position:"sticky",top:0,zIndex:10}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,color:C.white}}>
              RIDE<span style={{color:C.orange}}>TRUST</span> <span style={{color:"#888",fontSize:12,fontWeight:400}}>MY PORTAL</span>
            </div>
            <button onClick={()=>{setRiderPortal(null);setLoginForm({email:"",password:""})}} style={{background:"#222",color:"#AAA",border:"none",padding:"6px 14px",borderRadius:4,fontSize:12,cursor:"pointer"}}>Exit Portal</button>
          </div>

          {/* Tabs */}
          <div style={{background:C.white,borderBottom:"2px solid "+C.lightgr,padding:"0 20px",display:"flex",gap:4,overflowX:"auto"}}>
            {[
              {k:"overview",   label:"📋 My Application"},
              {k:"guarantors", label:"🤝 My Guarantors"},
              {k:"guarantee",  label:"✅ Guarantee Someone"},
              {k:"referrals",  label:"🎯 My Discounts"},
            ].map(t=>(
              <button key={t.k} onClick={()=>setRPortalTab(t.k)}
                style={{padding:"14px 14px",background:"none",border:"none",
                borderBottom:rPortalTab===t.k?"3px solid "+C.orange:"3px solid transparent",
                fontWeight:rPortalTab===t.k?700:400,color:rPortalTab===t.k?C.black:C.grey,
                fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{maxWidth:700,margin:"0 auto",padding:"24px 20px"}}>

            {/* Overview tab */}
            {rPortalTab==="overview"&&(
              <div>
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:16}}>
                  <div style={{fontWeight:800,fontSize:16,color:C.black,marginBottom:4}}>Welcome, {riderPortal.full_name.split(" ")[0]}</div>
                  <div style={{fontSize:12,color:C.grey,marginBottom:16}}>Referral Code: <strong style={{color:C.orange}}>{riderPortal.referral_code}</strong> — share this to earn discounts</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div style={{background:C.offwhite,borderRadius:8,padding:14,textAlign:"center"}}>
                      <div style={{fontSize:11,color:C.grey,marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>Application Status</div>
                      <div style={{fontWeight:900,fontSize:14,color:riderPortal.app_status==="valid"?C.green:C.orange,textTransform:"uppercase"}}>
                        {riderPortal.app_status==="under_review"?"Under Review":riderPortal.app_status==="valid"?"✅ Valid":"—"}
                      </div>
                    </div>
                    <div style={{background:C.offwhite,borderRadius:8,padding:14,textAlign:"center"}}>
                      <div style={{fontSize:11,color:C.grey,marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>Rider Status</div>
                      <div style={{fontWeight:900,fontSize:12,color:riderPortal.rider_status==="not_committed"?C.grey:riderPortal.rider_status==="committed_applicant"?C.orange:C.green,textTransform:"uppercase"}}>
                        {riderPortal.rider_status==="not_committed"?"Not Committed":
                         riderPortal.rider_status==="committed_applicant"?
                           (guarantors.filter(g=>g.status==="confirmed").length>=2?"Committed — Delivery Status Adequate":"Committed Applicant"):
                         "Active Rider"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* HP Deal */}
                <div style={{background:C.black,borderRadius:10,padding:20,color:C.white,marginBottom:16}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,marginBottom:14,textTransform:"uppercase"}}>
                    {riderPortal.vehicle_type==="bike"?"🏍️ Dispatch Bike":"🛺 Keke Tricycle"} — Your HP Deal
                  </div>
                  {riderPortal.vehicle_type==="bike"?(<>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>HP Package Value</span><strong>₦2,000,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Insurance & Plate License Reg</span><strong>Inclusive</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Initial deposit</span><strong style={{color:C.orange}}>₦200,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Deposit spread</span><strong>3 months</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Weekly remittance</span><strong>₦40,000 / week</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>HP term</span><strong>45 weeks</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total HP payments</span><strong>₦1,800,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total to own</span><strong style={{color:C.orange}}>₦2,000,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Discount on HP Balance</span><strong style={{color:C.green}}>₦100,000 / Referral of new Bike Applicant</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:13}}><span style={{color:"#AAA"}}>Discount on HP Balance</span><strong style={{color:C.green}}>₦200,000 / Referral of new Keke Applicant</strong></div>
                  </>):(<>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>HP Package Value</span><strong>₦7,620,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Insurance & Plate License Reg</span><strong>Inclusive</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Initial deposit</span><strong style={{color:C.green}}>₦600,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Deposit spread</span><strong>3 months</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Weekly remittance</span><strong>₦90,000 / week</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>HP term</span><strong>78 weeks</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total HP payments</span><strong>₦7,020,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total to own</span><strong style={{color:C.green}}>₦7,620,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Discount on HP Balance</span><strong style={{color:C.green}}>₦100,000 / Referral of new Bike Applicant</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:13}}><span style={{color:"#AAA"}}>Discount on HP Balance</span><strong style={{color:C.green}}>₦200,000 / Referral of new Keke Applicant</strong></div>
                  </>)}
                  {riderPortal.hp_discount_balance>0&&(
                    <div style={{marginTop:12,background:"rgba(232,98,10,.2)",borderRadius:6,padding:"10px 12px",fontSize:12,color:C.orange}}>
                      🎯 Referral discount earned: <strong>₦{riderPortal.hp_discount_balance.toLocaleString()}</strong> off your HP balance
                    </div>
                  )}
                </div>

                {/* Status-gated next steps */}
                {riderPortal.rider_status==="not_committed"&&(
                  <div style={{background:"#FFF7ED",border:"1.5px solid #FCD34D",borderRadius:10,padding:20}}>
                    <div style={{fontWeight:800,fontSize:14,color:"#92400E",marginBottom:8}}>⏳ Application Under Review</div>
                    <div style={{fontSize:13,color:"#92400E",lineHeight:1.8}}>
                      Your application has been received. RoyalTech is reviewing your details and will assign you a Local Managing Agent shortly. You will receive a go-ahead notification before making any financial commitments.
                    </div>
                    <div style={{marginTop:12,fontSize:12,color:"#B45309"}}>
                      While you wait — use your invite link on the Guarantors tab to start building your guarantors through referrals.
                    </div>
                  </div>
                )}
                {riderPortal.rider_status==="lma_linked"&&(
                  <div>
                    <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:10,padding:16,marginBottom:12}}>
                      <div style={{fontWeight:800,fontSize:14,color:C.green,marginBottom:6}}>✅ Go-Ahead Received — You May Now Commit</div>
                      <div style={{fontSize:13,color:"#166534",lineHeight:1.8}}>
                        You have been linked to a Local Managing Agent. You may now make your referrals and pay your deposit to become a Committed Applicant.
                      </div>
                      {riderPortal.lma_name&&(
                        <div style={{marginTop:10,fontSize:12,color:"#166534",background:"rgba(255,255,255,.6)",borderRadius:6,padding:"8px 12px"}}>
                          <strong>Your Managing Agent:</strong> {riderPortal.lma_name}<br/>
                          {riderPortal.lma_phone&&<span><strong>Phone:</strong> {riderPortal.lma_phone}<br/></span>}
                          {riderPortal.lma_email&&<span><strong>Email:</strong> {riderPortal.lma_email}</span>}
                        </div>
                      )}
                    </div>
                    <div style={{background:"#FFF7ED",border:"1.5px solid #FCD34D",borderRadius:10,padding:20}}>
                      <div style={{fontWeight:800,fontSize:14,color:"#92400E",marginBottom:10}}>💰 Pay Your Deposit to Commit</div>
                      <div style={{fontSize:13,color:"#92400E",lineHeight:1.8,marginBottom:12}}>
                        {{bike:"Bike deposit: ₦200,000",keke:"Keke deposit: ₦600,000",mini:"Mini (Korope) deposit: ₦800,000",full:"Full Bus/Cab deposit: ₦1,000,000"}[riderPortal.vehicle_type]||"Deposit amount per vehicle type"} — spread over 3 months max. Non-refundable except where investor matching takes more than 30 days.
                      </div>
                      <div style={{fontSize:13,color:"#92400E",lineHeight:1.9}}>
                        <strong>Account Name:</strong> RoyalTech Partnership & Investment Limited<br/>
                        <strong>Bank:</strong> Zenith Bank<br/>
                        <strong>Account Number:</strong> 1016621205<br/>
                        <strong>Reference:</strong> {riderPortal.referral_code}
                      </div>
                      <div style={{marginTop:10,fontSize:11,color:"#B45309"}}>After each payment, send proof via WhatsApp to {ADMIN_PHONE} with your reference code.</div>
                    </div>
                  </div>
                )}
                {riderPortal.rider_status==="committed_applicant"&&(
                  <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:10,padding:20}}>
                    <div style={{fontWeight:800,fontSize:14,color:C.blue,marginBottom:8}}>🎯 Committed Applicant — Awaiting Investor Match</div>
                    <div style={{fontSize:13,color:"#1E40AF",lineHeight:1.8}}>
                      Your deposit has been confirmed. RoyalTech is now matching you with a Sponsoring Investor. This takes up to 14 working days. Your vehicle will be delivered once a match is confirmed.
                    </div>
                    <div style={{marginTop:10,fontSize:12,color:"#1E40AF",background:"rgba(255,255,255,.6)",borderRadius:6,padding:"8px 12px"}}>
                      ⚠️ If no investor match is made within 30 days, you are entitled to request a full refund of your deposit. Contact RoyalTech at {ADMIN_PHONE}.
                    </div>
                  </div>
                )}
                {riderPortal.rider_status==="active_rider"&&(
                  <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:10,padding:20}}>
                    <div style={{fontWeight:800,fontSize:14,color:C.green,marginBottom:8}}>🏍️ Active Rider — Remittance Instructions</div>
                    <div style={{fontSize:13,color:"#166534",lineHeight:1.9}}>
                      Pay your weekly remittance <strong>every Monday</strong> to:<br/>
                      <strong>Account Name:</strong> RoyalTech Partnership & Investment Limited<br/>
                      <strong>Bank:</strong> Zenith Bank<br/>
                      <strong>Account Number:</strong> 1016621205<br/>
                      <strong>Reference:</strong> {riderPortal.referral_code}
                    </div>
                    <div style={{marginTop:12,fontSize:12,color:"#166534",background:"rgba(255,255,255,.6)",borderRadius:6,padding:"10px 12px",lineHeight:1.8}}>
                      After every payment:<br/>
                      1. Send proof to Admin — WhatsApp: <strong>{ADMIN_PHONE}</strong> or Email: <strong>{ADMIN_EMAIL}</strong><br/>
                      2. Copy your LMA — {riderPortal.lma_name?<span><strong>{riderPortal.lma_name}</strong> · {riderPortal.lma_phone}</span>:"(your assigned LMA)"}
                    </div>
                  </div>
                )}
                {riderPortal.rider_status==="ownership_transferred"&&(
                  <div style={{background:C.black,borderRadius:10,padding:20,textAlign:"center",color:C.white}}>
                    <div style={{fontSize:40,marginBottom:8}}>🏆</div>
                    <div style={{fontWeight:900,fontSize:18,color:C.orange,marginBottom:6}}>HP COMPLETE — VEHICLE OWNED</div>
                    <div style={{fontSize:13,color:"#AAA",lineHeight:1.8}}>
                      Congratulations! You have completed your hire purchase agreement. Contact RoyalTech to complete the change of ownership ceremony.
                    </div>
                    <div style={{marginTop:12,fontSize:13,color:C.orange}}>📞 +234 806 163 1222 · 💬 {ADMIN_PHONE}</div>
                  </div>
                )}
              </div>
            )}

            {/* Guarantors tab */}
            {rPortalTab==="guarantors"&&(
              <div>
                {/* Status */}
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:16}}>
                  <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>My Guarantors</div>
                  <div style={{fontSize:12,color:C.grey,marginBottom:16}}>You need a minimum of 2 confirmed guarantors before delivery. Your referrer is automatically your first guarantor.</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
                    {[...guarantors,...tpGuarantors.map(t=>({guarantor_name:t.guarantor_name,status:t.status,guarantee_type:"third_party"}))].slice(0,4).map((g,i)=>(
                      <div key={i} style={{background:C.offwhite,borderRadius:8,padding:14,border:"1.5px solid "+(g.status==="confirmed"?C.green:g.status==="pending"?"#FCD34D":C.lightgr),textAlign:"center"}}>
                        <div style={{fontSize:22,marginBottom:4}}>{g.status==="confirmed"?"✅":g.status==="pending"?"⏳":"👤"}</div>
                        <div style={{fontWeight:700,fontSize:13,color:g.status==="confirmed"?C.green:C.grey}}>{g.guarantor_name}</div>
                        <div style={{fontSize:10,color:C.grey,marginTop:2}}>
                          {g.guarantee_type==="mutual"?"🔗 Mutual Guarantee":g.guarantee_type==="third_party"?"📋 Third Party":"Platform Guarantee"} · {g.status}
                        </div>
                      </div>
                    ))}
                    {Array.from({length:Math.max(0,2-guarantors.length-tpGuarantors.length)}).map((_,i)=>(
                      <div key={"empty"+i} style={{background:"#F9F9F9",borderRadius:8,padding:14,border:"1.5px dashed "+C.lightgr,textAlign:"center"}}>
                        <div style={{fontSize:22,marginBottom:4}}>👤</div>
                        <div style={{fontWeight:600,fontSize:13,color:C.grey}}>Guarantor slot empty</div>
                      </div>
                    ))}
                  </div>

                  {/* How to get guarantors */}
                  <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:8,padding:14,fontSize:13,color:C.blue,lineHeight:1.9}}>
                    <strong>Two ways to get your second guarantor:</strong><br/>
                    <strong>1. Mutual Guarantee (Fastest)</strong> — Share your invite link below. When someone signs up through your link and commits with first deposit, you both automatically guarantee each other. No forms. No stress.<br/>
                    <strong>2. Third Party Guarantor</strong> — Download the guarantor form below, hand it to a credible individual (employed or business owner). They fill, attach proof of capacity and send back to you to upload on your portal.
                  </div>
                </div>

                {/* Invite link */}
                <div style={{background:C.black,borderRadius:10,padding:20,color:C.white,marginBottom:16}}>
                  <div style={{fontWeight:800,fontSize:14,marginBottom:8}}>🔗 Your Mutual Guarantee Invite Link</div>
                  <div style={{background:"#1A1A1A",borderRadius:6,padding:"10px 14px",fontSize:12,color:C.orange,fontFamily:"monospace",marginBottom:10,wordBreak:"break-all"}}>
                    tbvap.vercel.app/#/ride?ref={riderPortal.referral_code}
                  </div>
                  <div style={{fontSize:12,color:"#AAA",lineHeight:1.7,marginBottom:12}}>Share this link. When someone signs up and commits, you both automatically become guarantors for each other — AND you earn a referral discount on your HP balance.</div>
                  <button onClick={()=>{navigator.clipboard.writeText("tbvap.vercel.app/#/ride?ref="+riderPortal.referral_code);showToast("Link copied!");}}
                    style={{background:C.orange,color:C.white,border:"none",padding:"10px 20px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                    Copy Invite Link
                  </button>
                </div>

                {/* Third party guarantor */}
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr}}>
                  <div style={{fontWeight:800,fontSize:15,marginBottom:8}}>📋 Third Party Guarantor</div>
                  <div style={{fontSize:13,color:C.grey,lineHeight:1.8,marginBottom:16}}>
                    Download the guarantor form, hand it to a credible individual — someone with a good paying job or a thriving business. They fill the form, attach proof of capacity (employment letter, business registration or bank statement), and return it to you. Upload the completed form below.
                  </div>
                  <button onClick={()=>{
                    // Generate and download PDF guarantor form
                    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>RideTrust HP — Guarantor Form</title>
                    <style>body{font-family:Arial,sans-serif;padding:40px;color:#111;max-width:700px;margin:0 auto;}
                    h1{color:#E8620A;font-size:24px;margin-bottom:4px;}h2{font-size:16px;color:#555;margin-bottom:24px;font-weight:400;}
                    .section{border:1px solid #DDD;border-radius:8px;padding:20px;margin-bottom:20px;}
                    .section h3{font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:14px;}
                    .field{margin-bottom:14px;}.field label{display:block;font-size:12px;font-weight:700;margin-bottom:4px;color:#444;}
                    .field .line{border-bottom:1px solid #999;min-height:24px;margin-top:4px;}
                    .declaration{background:#FFF7ED;border:1px solid #FCD34D;border-radius:6px;padding:16px;font-size:12px;line-height:1.8;margin-top:20px;}
                    .sign-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px;}
                    .footer{text-align:center;font-size:11px;color:#888;margin-top:32px;border-top:1px solid #EEE;padding-top:16px;}
                    </style></head><body>
                    <h1>RIDETRUST HP</h1><h2>Third Party Guarantor Form — Powered by RoyalTech Partnership & Investment Limited</h2>
                    <div class="section"><h3>Applicant Details (to be filled by the applicant)</h3>
                      <div class="field"><label>Full Name of Applicant</label><div class="line"></div></div>
                      <div class="field"><label>Applicant Phone Number</label><div class="line"></div></div>
                      <div class="field"><label>Applicant Email Address</label><div class="line"></div></div>
                      <div class="field"><label>Applicant Referral Code</label><div class="line">${riderPortal.referral_code}</div></div>
                      <div class="field"><label>Vehicle Type Applied For</label><div class="line">${{bike:"Dispatch Bike (HP Value: ₦2,000,000)",keke:"Keke Tricycle (HP Value: ₦7,620,000)",mini:"Mini Korope 4-Wheel (HP Value: ₦12,500,000)",full:"Full Bus / Cab 4-Wheel (HP Value: ₦19,240,000)"}[riderPortal.vehicle_type]||riderPortal.vehicle_type}</div></div>
                    </div>
                    <div class="section"><h3>Guarantor Details (to be filled by the guarantor)</h3>
                      <div class="field"><label>Full Name of Guarantor</label><div class="line"></div></div>
                      <div class="field"><label>Phone Number</label><div class="line"></div></div>
                      <div class="field"><label>Email Address</label><div class="line"></div></div>
                      <div class="field"><label>Home Address</label><div class="line"></div></div>
                      <div class="field"><label>Occupation / Business</label><div class="line"></div></div>
                      <div class="field"><label>Employer / Business Name and Address</label><div class="line"></div></div>
                      <div class="field"><label>Proof of Capacity Attached (tick one): &nbsp;[ ] Employment Letter &nbsp;[ ] Business Registration &nbsp;[ ] Bank Statement</label><div class="line"></div></div>
                    </div>
                    <div class="declaration">
                      <strong>Declaration by Guarantor:</strong><br/>
                      I, the undersigned, hereby voluntarily agree to serve as a guarantor for the above-named applicant on the RideTrust HP hire purchase platform operated by RoyalTech Partnership & Investment Limited. I understand that by signing this form, I am confirming that I know the applicant personally and I vouch for their character and commitment to honour their weekly hire purchase obligations. I acknowledge that this guarantee is subject to the Terms and Conditions of RideTrust HP and RoyalTech Partnership & Investment Limited.
                    </div>
                    <div class="sign-row">
                      <div class="field"><label>Guarantor Signature</label><div class="line" style="min-height:40px;"></div></div>
                      <div class="field"><label>Date</label><div class="line" style="min-height:40px;"></div></div>
                    </div>
                    <div class="footer">RideTrust HP · Powered by RoyalTech Partnership & Investment Limited · +234 909 999 4816 · tbvap.vercel.app</div>
                    </body></html>`;
                    const blob = new Blob([html],{type:"text/html"});
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = "RideTrust_Guarantor_Form_"+riderPortal.referral_code+".html";
                    a.click();
                    showToast("Guarantor form downloaded. Print and hand to your guarantor.");
                  }} style={{background:C.blue,color:C.white,border:"none",padding:"12px 20px",borderRadius:6,fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:16}}>
                    📥 Download Guarantor Form (Print & Hand Out)
                  </button>

                  {/* Upload completed form */}
                  <div style={{borderTop:"1px solid "+C.lightgr,paddingTop:16,marginTop:4}}>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Upload Completed & Signed Form</div>
                    <div className="field"><label>Guarantor Full Name *</label><input placeholder="As written on the form" value={gForm.name} onChange={e=>setGForm(f=>({...f,name:e.target.value}))}/></div>
                    <div className="field"><label>Guarantor Phone *</label><input type="tel" placeholder="+234 xxx xxx xxxx" value={gForm.phone} onChange={e=>setGForm(f=>({...f,phone:e.target.value}))}/></div>
                    <div className="field"><label>Guarantor Email</label><input type="email" placeholder="Optional" value={gForm.email} onChange={e=>setGForm(f=>({...f,email:e.target.value}))}/></div>
                    <div className="field"><label>Guarantor Occupation / Business</label><input placeholder="e.g. Civil Servant, Trader" value={gForm.occupation||""} onChange={e=>setGForm(f=>({...f,occupation:e.target.value}))}/></div>
                    <div className="field">
                      <label>Upload Signed Form + Proof of Capacity *</label>
                      <button className="snap-btn" style={{borderColor:"#93C5FD",color:C.blue,background:"#EFF6FF"}} onClick={()=>document.getElementById("snap-tp-form").click()}>
                        <span>📷</span><span>{gForm.proofDoc?"✅ Document captured — tap to retake":"Tap to photograph the completed form"}</span>
                      </button>
                      <input id="snap-tp-form" type="file" accept="image/*,application/pdf" capture="environment" style={{display:"none"}}
                        onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setGForm(g=>({...g,proofDoc:ev.target.result}));r.readAsDataURL(f);}}/>
                    </div>
                    <button style={{background:C.orange,color:C.white,border:"none",padding:"12px 20px",borderRadius:6,fontWeight:700,fontSize:13,cursor:"pointer",width:"100%"}}
                      onClick={async()=>{
                        if(!gForm.name.trim()||!gForm.phone.trim()||!gForm.proofDoc){showToast("Please fill guarantor name, phone and upload the signed form.");return;}
                        await sb.from("rt_third_party_guarantors").insert({
                          rider_id: riderPortal.id,
                          guarantor_name: gForm.name,
                          guarantor_phone: gForm.phone,
                          guarantor_email: gForm.email||null,
                          guarantor_occupation: gForm.occupation||null,
                          proof_document: gForm.proofDoc,
                          status: "pending",
                        });
                        setGForm({name:"",email:"",phone:"",occupation:"",proofDoc:""});
                        await loadRiderPortal(riderPortal);
                        showToast("Third party guarantor submitted. RoyalTech will review within 48 hours.");
                      }}>
                      Submit Third Party Guarantor
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Guarantee Someone tab — REMOVED, replaced by mutual guarantee */}
            {rPortalTab==="guarantee"&&(
              <div style={{background:C.white,borderRadius:10,padding:24,border:"1.5px solid "+C.lightgr,textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:12}}>🔗</div>
                <div style={{fontWeight:800,fontSize:15,marginBottom:8}}>Mutual Guarantee is Automatic</div>
                <div style={{fontSize:13,color:C.grey,lineHeight:1.8,maxWidth:400,margin:"0 auto"}}>
                  When you refer someone through your invite link and they commit with their first deposit, you both automatically guarantee each other. No forms needed. Share your link and let the system handle it.
                </div>
                <button onClick={()=>setRPortalTab("guarantors")} style={{marginTop:16,background:C.orange,color:C.white,border:"none",padding:"10px 20px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  Go to My Guarantors
                </button>
              </div>
            )}

            {/* Referral discounts tab */}
            {rPortalTab==="referrals"&&(
              <div>
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:16}}>
                  <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>My Referral Discounts</div>
                  <div style={{fontSize:12,color:C.grey,marginBottom:16}}>Total discount earned off your HP balance.</div>
                  <div style={{background:C.orange,borderRadius:8,padding:16,textAlign:"center",marginBottom:16}}>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.8)",marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>Total Discount Earned</div>
                    <div style={{fontWeight:900,fontSize:32,color:C.white}}>₦{(riderPortal.hp_discount_balance||0).toLocaleString()}</div>
                  </div>
                  {referrals.length===0?(
                    <div style={{fontSize:13,color:C.grey,textAlign:"center",padding:20}}>No referrals yet. Share your invite link to start earning discounts.</div>
                  ):(
                    referrals.map(r=>(
                      <div key={r.id} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid "+C.lightgr,fontSize:13}}>
                        <span style={{color:C.dark}}>{r.vehicle_type==="bike"?"🏍️ Bike referral":"🛺 Keke referral"}</span>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontWeight:700,color:C.orange}}>₦{(r.discount_amount||0).toLocaleString()} off</div>
                          <div style={{fontSize:11,color:C.grey}}>{r.status}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div style={{background:C.black,borderRadius:10,padding:20,color:C.white}}>
                  <div style={{fontWeight:800,fontSize:14,marginBottom:8}}>🔗 Keep Sharing Your Link</div>
                  <div style={{fontSize:12,color:"#AAA",lineHeight:1.7,marginBottom:10}}>Every person who signs up through your link and pays their first deposit earns you a discount — and becomes your guarantor. No limits.</div>
                  <div style={{background:"#1A1A1A",borderRadius:6,padding:"10px 14px",fontSize:12,color:C.orange,fontFamily:"monospace",wordBreak:"break-all"}}>
                    tbvap.vercel.app/#/ride?ref={riderPortal.referral_code}
                  </div>
                  <button onClick={()=>{navigator.clipboard.writeText("tbvap.vercel.app/#/ride?ref="+riderPortal.referral_code);showToast("Link copied!");}}
                    style={{marginTop:12,background:C.orange,color:C.white,border:"none",padding:"10px 20px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                    Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ ADMIN PORTAL ══════════════════════════════════════ */}
      {page==="access"&&adminOn&&(
        <div style={{position:"fixed",inset:0,background:C.offwhite,zIndex:500,overflowY:"auto"}}>
          {/* Admin nav */}
          <div style={{background:C.black,padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center",height:56,position:"sticky",top:0,zIndex:10}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,color:C.white}}>
              RIDE<span style={{color:C.orange}}>TRUST</span> <span style={{color:"#888",fontSize:13,fontWeight:400}}>ADMIN</span>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button onClick={loadData} style={{background:"#222",color:"#AAA",border:"none",padding:"6px 12px",borderRadius:4,fontSize:12,cursor:"pointer"}}>↻ Refresh</button>
              <button onClick={()=>setAdminOn(false)} style={{background:C.orange,color:C.white,border:"none",padding:"6px 14px",borderRadius:4,fontSize:12,cursor:"pointer",fontWeight:700}}>Exit Admin</button>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{background:C.white,borderBottom:"2px solid "+C.lightgr,padding:"0 24px",display:"flex",gap:4,overflowX:"auto"}}>
            {[
              {k:"riders",   label:"🏍️ Riders ("+riders.length+")"},
              {k:"agents",   label:"🏢 Agents ("+agents.length+")"},
              {k:"investors",label:"💰 Investors ("+investors.length+")"},
              {k:"analytics",label:"📊 Analytics"},
            {k:"remittances",label:"💵 Remittances"},
            {k:"buckets",label:"🪣 Fund Buckets"},
            {k:"documents",label:"📄 Legal Docs"},
            {k:"referrals",label:"🔗 Referral Links"},
            ].map(t=>(
              <button key={t.k} onClick={()=>setAdminTab(t.k)}
                style={{padding:"14px 16px",background:"none",border:"none",
                borderBottom:adminTab===t.k?"3px solid "+C.orange:"3px solid transparent",
                fontWeight:adminTab===t.k?700:400,color:adminTab===t.k?C.black:C.grey,
                fontSize:13,cursor:"pointer",whiteSpace:"nowrap"}}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{maxWidth:1100,margin:"0 auto",padding:"24px 24px"}}>
            {loading&&<div style={{textAlign:"center",padding:40,color:C.grey}}>Loading...</div>}

            {/* ── Riders tab ── */}
            {adminTab==="riders"&&!loading&&(
              <div>
                <div style={{fontWeight:800,fontSize:15,color:C.black,marginBottom:16}}>Rider Applications — {riders.length} total</div>
                {riders.length===0&&<div style={{color:C.grey,fontSize:14}}>No applications yet.</div>}
                {riders.map(r=>(
                  <div key={r.id} style={{background:C.white,borderRadius:10,padding:20,marginBottom:14,border:"1.5px solid "+C.lightgr}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:12}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:15,color:C.black}}>{r.full_name}</div>
                        <div style={{fontSize:12,color:C.grey,marginTop:2}}>{r.email} · {r.phone}</div>
                        <div style={{fontSize:12,color:C.grey}}>{r.address||"—"}</div>
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start",flexWrap:"wrap"}}>
                        <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                          background:r.vehicle_type==="bike"?"#1A1A1A":"#0D2B0D",color:C.white}}>
                          {r.vehicle_type==="bike"?"🏍️ Bike":"🛺 Keke"}
                        </span>
                        <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                          background:r.status==="approved"?"#BBF7D0":r.status==="active"?"#BFDBFE":r.status==="rejected"?"#FEE2E2":"#FEF3C7",
                          color:r.status==="approved"?"#166534":r.status==="active"?"#1E40AF":r.status==="rejected"?"#991B1B":"#92400E"}}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:12,fontSize:12}}>
                      <div><span style={{color:C.grey}}>Experience: </span><strong>{r.experience||"—"}</strong></div>
                      <div><span style={{color:C.grey}}>Referrer: </span><strong>{r.referrer||"None"}</strong></div>
                      <div><span style={{color:C.grey}}>Guarantor 1: </span><strong>{r.guarantor_1||"—"}</strong></div>
                      <div><span style={{color:C.grey}}>Guarantor 2: </span><strong>{r.guarantor_2||"—"}</strong></div>
                      <div><span style={{color:C.grey}}>Guarantor 3: </span><strong>{r.guarantor_3||"—"}</strong></div>
                      <div><span style={{color:C.grey}}>App Status: </span><strong style={{textTransform:"uppercase"}}>{r.app_status||"under_review"}</strong></div>
                      <div><span style={{color:C.grey}}>Rider Status: </span><strong style={{textTransform:"uppercase"}}>{r.rider_status||"not_committed"}</strong></div>
                      <div><span style={{color:C.grey}}>Referral Code: </span><strong>{r.referral_code||"—"}</strong></div>
                      <div><span style={{color:C.grey}}>HP Discount: </span><strong>₦{(r.hp_discount_balance||0).toLocaleString()}</strong></div>
                      <div><span style={{color:C.grey}}>Applied: </span><strong>{new Date(r.created_at).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})}</strong></div>
                    </div>
                    {r.photo_id&&<div style={{marginBottom:12}}><div style={{fontSize:11,color:C.grey,marginBottom:4}}>Photo ID:</div><img src={r.photo_id} alt="ID" style={{maxWidth:200,maxHeight:120,borderRadius:6,border:"1px solid "+C.lightgr}}/></div>}
                    {/* LMA Assignment */}
                    <div style={{marginBottom:12,padding:14,background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:8}}>
                      <div style={{fontWeight:700,fontSize:12,color:C.blue,marginBottom:8}}>🏢 LMA Assignment</div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
                        <input placeholder="LMA Name" defaultValue={r.lma_name||""} id={"lma-name-"+r.id}
                          style={{padding:"6px 8px",border:"1px solid #BFDBFE",borderRadius:4,fontSize:12}}/>
                        <input placeholder="LMA Email" defaultValue={r.lma_email||""} id={"lma-email-"+r.id}
                          style={{padding:"6px 8px",border:"1px solid #BFDBFE",borderRadius:4,fontSize:12}}/>
                        <input placeholder="LMA Phone" defaultValue={r.lma_phone||""} id={"lma-phone-"+r.id}
                          style={{padding:"6px 8px",border:"1px solid #BFDBFE",borderRadius:4,fontSize:12}}/>
                      </div>
                      <button onClick={()=>confirmUpdate(
                        `Link ${r.full_name} to LMA and send go-ahead email?`,
                        async()=>{
                          const lmaName  = document.getElementById("lma-name-"+r.id)?.value||"";
                          const lmaEmail = document.getElementById("lma-email-"+r.id)?.value||"";
                          const lmaPhone = document.getElementById("lma-phone-"+r.id)?.value||"";
                          await sb.from("rt_riders").update({
                            lma_name:lmaName, lma_email:lmaEmail, lma_phone:lmaPhone,
                            rider_status:"lma_linked"
                          }).eq("id",r.id);
                          // Admin email with WhatsApp draft
                          const vType = r.vehicle_type==="bike"?"Dispatch Bike":"Keke Tricycle";
                          const dep   = {bike:"₦200,000",keke:"₦600,000",mini:"₦800,000",full:"₦1,000,000"}[r.vehicle_type]||"₦600,000";
                          const waMsg = `Dear ${r.full_name},\n\nYour RideTrust HP application has been reviewed and approved. You have been linked to a Local Managing Agent who will oversee your hire purchase.\n\nYour Managing Agent:\nName: ${lmaName}\nPhone: ${lmaPhone}\nEmail: ${lmaEmail}\n\nYou may now proceed to:\n1. Make your referrals to secure guarantors\n2. Pay your initial deposit of ${dep} (spread over 3 months max)\n\nPayment Details:\nAccount Name: RoyalTech Partnership & Investment Limited\nBank: Zenith Bank\nAccount Number: 1016621205\nReference: ${r.referral_code}\n\nAfter each deposit payment, send proof via WhatsApp to +234 909 999 4816 with your reference code.\n\nRideTrust HP | RoyalTech`;
                          console.log("ADMIN — SEND THIS WHATSAPP TO "+r.phone+":\n"+waMsg);
                          await loadData();
                          showToast("LMA linked. Rider status updated to LMA Linked.");
                        }
                      )} style={{background:C.blue,color:C.white,border:"none",padding:"7px 16px",borderRadius:4,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                        Link LMA & Send Go-Ahead
                      </button>
                      {r.lma_name&&<div style={{marginTop:8,fontSize:11,color:C.blue}}>✅ Currently linked to: <strong>{r.lma_name}</strong> · {r.lma_phone}</div>}
                    </div>

                    {/* Deposit confirmation button */}
                    {(r.rider_status==="lma_linked"||r.rider_status==="committed_applicant")&&(
                      <div style={{marginBottom:12,padding:14,background:"#FFF7ED",border:"1.5px solid #FCD34D",borderRadius:8}}>
                        <div style={{fontWeight:700,fontSize:12,color:"#92400E",marginBottom:8}}>💰 Deposit Confirmation</div>
                        <button onClick={()=>confirmUpdate(
                          `Confirm full deposit received from ${r.full_name} and update to Committed Applicant?`,
                          async()=>{
                            await sb.from("rt_riders").update({rider_status:"committed_applicant"}).eq("id",r.id);
                            const vType = r.vehicle_type==="bike"?"Dispatch Bike":"Keke Tricycle";
                            const totalHP = {bike:"₦2,000,000",keke:"₦7,620,000",mini:"₦12,500,000",full:"₦19,240,000"}[r.vehicle_type]||"₦7,620,000";
                            const waMsg = `Dear ${r.full_name},\n\nYour deposit payment for the ${vType} hire purchase has been received and confirmed. You are now a COMMITTED APPLICANT on RideTrust HP.\n\nNext Steps:\n- RoyalTech will now match you with a Sponsoring Investor within 14 working days\n- Once matched, your brand new ${vType} will be delivered to you\n- If no investor match is made within 30 days, you are entitled to request a full refund of your deposit\n\nYour HP Details:\nTotal to own: ${totalHP}\nWeekly remittance starts from delivery date every Monday\n\nYour referral code: ${r.referral_code}\nKeep referring to earn discounts on your HP balance.\n\nRideTrust HP | RoyalTech`;
                            console.log("ADMIN — SEND THIS WHATSAPP TO "+r.phone+":\n"+waMsg);
                            await loadData();
                            showToast("Deposit confirmed. Rider is now a Committed Applicant.");
                          }
                        )} style={{background:C.orange,color:C.white,border:"none",padding:"7px 16px",borderRadius:4,fontSize:12,fontWeight:700,cursor:"pointer",marginRight:8}}>
                          ✅ Confirm Full Deposit Received
                        </button>
                      </div>
                    )}

                    {/* Ownership transfer button */}
                    {r.rider_status==="active_rider"&&(
                      <div style={{marginBottom:12,padding:14,background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:8}}>
                        <div style={{fontWeight:700,fontSize:12,color:C.green,marginBottom:8}}>🏆 HP Balance Clearance</div>
                        <button onClick={()=>confirmUpdate(
                          `Confirm HP balance cleared for ${r.full_name} and invite to ownership ceremony?`,
                          async()=>{
                            await sb.from("rt_riders").update({rider_status:"ownership_transferred",app_status:"completed"}).eq("id",r.id);
                            const vType = r.vehicle_type==="bike"?"Dispatch Bike":"Keke Tricycle";
                            const waMsg = `Dear ${r.full_name},\n\nCongratulations! 🎉\n\nYour Hire Purchase balance for your ${vType} has been fully cleared. You have successfully completed your HP agreement with RoyalTech Partnership & Investment Limited.\n\nYou are hereby invited to the ASSET CHANGE OF OWNERSHIP CEREMONY where the vehicle will be officially transferred to your name.\n\nPlease contact RoyalTech to schedule your ceremony:\nPhone: +234 806 163 1222\nWhatsApp: +234 909 999 4816\n\nThank you for being a valued RideTrust HP partner.\n\nRideTrust HP | RoyalTech`;
                            console.log("ADMIN — SEND THIS WHATSAPP TO "+r.phone+":\n"+waMsg);
                            await loadData();
                            showToast("HP cleared. Ownership transfer email logged.");
                          }
                        )} style={{background:C.green,color:C.white,border:"none",padding:"7px 16px",borderRadius:4,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                          🏆 HP Cleared — Invite to Ownership Ceremony
                        </button>
                      </div>
                    )}

                    <div style={{marginBottom:8,fontSize:11,color:C.grey,fontWeight:700}}>Application Status:</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                      {["under_review","valid","rejected"].map(s=>(
                        <button key={s} onClick={()=>confirmUpdate(`Set Application Status to "${s.replace('_',' ')}" for ${r.full_name}?`, ()=>sb.from('rt_riders').update({app_status:s}).eq('id',r.id).then(loadData))}
                          style={{padding:"6px 12px",borderRadius:4,border:"1.5px solid "+C.lightgr,
                          background:(r.app_status||"under_review")===s?C.orange:C.white,
                          color:(r.app_status||"under_review")===s?C.white:C.grey,
                          fontSize:11,fontWeight:700,cursor:"pointer",textTransform:"capitalize"}}>
                          {s.replace("_"," ")}
                        </button>
                      ))}
                    </div>
                    <div style={{marginBottom:8,fontSize:11,color:C.grey,fontWeight:700}}>Rider Status:</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {["not_committed","lma_linked","committed_applicant","active_rider","ownership_transferred"].map(s=>(
                        <button key={s} onClick={()=>confirmUpdate(`Set Rider Status to "${s.replace(/_/g,' ')}" for ${r.full_name}?`, ()=>sb.from('rt_riders').update({rider_status:s}).eq('id',r.id).then(loadData))}
                          style={{padding:"6px 12px",borderRadius:4,border:"1.5px solid "+C.lightgr,
                          background:(r.rider_status||"not_committed")===s?C.blue:C.white,
                          color:(r.rider_status||"not_committed")===s?C.white:C.grey,
                          fontSize:11,fontWeight:700,cursor:"pointer",textTransform:"capitalize"}}>
                          {s.replace(/_/g," ")}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Agents tab ── */}
            {adminTab==="agents"&&!loading&&(
              <div>
                <div style={{fontWeight:800,fontSize:15,color:C.black,marginBottom:16}}>Agent Applications — {agents.length} total</div>
                {agents.length===0&&<div style={{color:C.grey,fontSize:14}}>No applications yet.</div>}
                {agents.map(a=>(
                  <div key={a.id} style={{background:C.white,borderRadius:10,padding:20,marginBottom:14,border:"1.5px solid "+C.lightgr}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:12}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:15,color:C.black}}>{a.full_name}</div>
                        <div style={{fontSize:12,color:C.grey,marginTop:2}}>{a.email} · {a.phone}</div>
                        <div style={{fontSize:12,color:C.grey}}>{a.address||"—"}</div>
                      </div>
                      <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                        background:a.status==="approved"?"#BBF7D0":a.status==="rejected"?"#FEE2E2":"#FEF3C7",
                        color:a.status==="approved"?"#166534":a.status==="rejected"?"#991B1B":"#92400E"}}>
                        {a.status}
                      </span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:12,fontSize:12}}>
                      <div><span style={{color:C.grey}}>Tech skills: </span><strong>{a.tech_skills||"—"}/5</strong></div>
                      <div><span style={{color:C.grey}}>Transport exp: </span><strong>{a.biz_experience||"—"}/5</strong></div>
                      <div><span style={{color:C.grey}}>Applied: </span><strong>{new Date(a.created_at).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})}</strong></div>
                    </div>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
                      {a.utility_bill&&<div><div style={{fontSize:11,color:C.grey,marginBottom:4}}>Utility Bill:</div><img src={a.utility_bill} alt="Utility" style={{maxWidth:160,maxHeight:100,borderRadius:6,border:"1px solid "+C.lightgr}}/></div>}
                      {a.parking_photo&&<div><div style={{fontSize:11,color:C.grey,marginBottom:4}}>Parking Yard:</div><img src={a.parking_photo} alt="Parking" style={{maxWidth:160,maxHeight:100,borderRadius:6,border:"1px solid "+C.lightgr}}/></div>}
                      {a.photo_id&&<div><div style={{fontSize:11,color:C.grey,marginBottom:4}}>Photo ID:</div><img src={a.photo_id} alt="ID" style={{maxWidth:160,maxHeight:100,borderRadius:6,border:"1px solid "+C.lightgr}}/></div>}
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {["pending","approved","rejected"].map(s=>(
                        <button key={s} onClick={()=>confirmUpdate(`Set status to "${s}" for ${a.full_name}?`, ()=>updateStatus('rt_agents',a.id,s))}
                          style={{padding:"6px 12px",borderRadius:4,border:"1.5px solid "+C.lightgr,
                          background:a.status===s?C.blue:C.white,color:a.status===s?C.white:C.grey,
                          fontSize:11,fontWeight:700,cursor:"pointer",textTransform:"capitalize"}}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Investors tab ── */}
            {adminTab==="investors"&&!loading&&(
              <div>
                <div style={{fontWeight:800,fontSize:15,color:C.black,marginBottom:16}}>Investor Enquiries — {investors.length} total</div>
                {investors.length===0&&<div style={{color:C.grey,fontSize:14}}>No enquiries yet.</div>}
                {investors.map(inv=>(
                  <div key={inv.id} style={{background:C.white,borderRadius:10,padding:20,marginBottom:14,border:"1.5px solid "+C.lightgr}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:12}}>
                      <div>
                        <div style={{fontWeight:800,fontSize:15,color:C.black}}>{inv.full_name}</div>
                        <div style={{fontSize:12,color:C.grey,marginTop:2}}>{inv.email} · {inv.phone}</div>
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                        <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                          background:inv.package_type==="bike"?"#EFF6FF":"#F0FFF4",
                          color:inv.package_type==="bike"?C.blue:C.green}}>
                          {inv.package_type==="bike"?"🏍️ Two Wheels":"🛺 Three Wheels"}
                        </span>
                        <span style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                          background:inv.status==="approved"?"#BBF7D0":inv.status==="rejected"?"#FEE2E2":"#FEF3C7",
                          color:inv.status==="approved"?"#166534":inv.status==="rejected"?"#991B1B":"#92400E"}}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:12,fontSize:12}}>
                      <div><span style={{color:C.grey}}>Units: </span><strong>{inv.units}</strong></div>
                      <div><span style={{color:C.grey}}>Total investment: </span><strong>₦{(inv.units*(inv.package_type==="bike"?1500000:4500000)).toLocaleString()}</strong></div>
                      <div><span style={{color:C.grey}}>Total return: </span><strong>₦{(inv.units*(inv.package_type==="bike"?1950000:5720000)).toLocaleString()}</strong></div>
                      <div><span style={{color:C.grey}}>Applied: </span><strong>{new Date(inv.created_at).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})}</strong></div>
                    </div>
                    {inv.notes&&<div style={{fontSize:12,color:C.grey,marginBottom:12,background:C.offwhite,padding:"8px 12px",borderRadius:6}}>Notes: {inv.notes}</div>}
                    {inv.photo_id&&<div style={{marginBottom:12}}><div style={{fontSize:11,color:C.grey,marginBottom:4}}>Photo ID:</div><img src={inv.photo_id} alt="ID" style={{maxWidth:200,maxHeight:120,borderRadius:6,border:"1px solid "+C.lightgr}}/></div>}
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {["pending","approved","active","rejected"].map(s=>(
                        <button key={s} onClick={()=>confirmUpdate(`Set status to "${s}" for ${inv.full_name}?`, ()=>updateStatus('rt_investors',inv.id,s))}
                          style={{padding:"6px 12px",borderRadius:4,border:"1.5px solid "+C.lightgr,
                          background:inv.status===s?C.green:C.white,color:inv.status===s?C.white:C.grey,
                          fontSize:11,fontWeight:700,cursor:"pointer",textTransform:"capitalize"}}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Remittances tab ── */}
            {adminTab==="remittances"&&!loading&&(
              <div>
                {/* Record new remittance */}
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:20}}>
                  <div style={{fontWeight:800,fontSize:15,marginBottom:16}}>💵 Record Weekly Remittance</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                    <div className="field">
                      <label>Select Rider *</label>
                      <select value={remitForm.rider_id} onChange={e=>setRemitForm(f=>({...f,rider_id:e.target.value}))}>
                        <option value="">— Select rider —</option>
                        {riders.filter(r=>r.rider_status==="committed_applicant"||r.rider_status==="active_rider").map(r=>(
                          <option key={r.id} value={r.id}>{r.full_name} ({r.vehicle_type==="bike"?"🏍️ Bike":"🛺 Keke"})</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>Week Number</label>
                      <input type="number" placeholder="e.g. 1" value={remitForm.week_number} onChange={e=>setRemitForm(f=>({...f,week_number:e.target.value}))}/>
                    </div>
                    <div className="field">
                      <label>Amount Received (₦) *</label>
                      <input type="number" placeholder={remitForm.rider_id?(()=>{const sp=SPLIT[riders.find(r=>r.id===remitForm.rider_id)?.vehicle_type]||SPLIT.keke;return"Expected: ₦"+sp.weekly.toLocaleString();})():""} value={remitForm.amount} onChange={e=>setRemitForm(f=>({...f,amount:e.target.value}))}/>
                    </div>
                    <div className="field">
                      <label>Has Local Managing Agent?</label>
                      <select value={remitForm.has_lma} onChange={e=>setRemitForm(f=>({...f,has_lma:e.target.value==="true"}))}>
                        <option value="true">Yes — LMA assigned</option>
                        <option value="false">No — No LMA (RoyalTech takes LMA share)</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Notes (optional)</label>
                    <input placeholder="e.g. Partial payment — balance promised next week" value={remitForm.notes} onChange={e=>setRemitForm(f=>({...f,notes:e.target.value}))}/>
                  </div>
                  {/* Live split preview */}
                  {remitForm.rider_id&&remitForm.amount&&(()=>{
                    const rider = riders.find(r=>r.id===remitForm.rider_id);
                    const vt = rider?.vehicle_type;
                    const amt = Number(remitForm.amount);
                    const hasLma = remitForm.has_lma;
                    const sp2 = SPLIT[vt]||SPLIT.keke;
                    // Rule 1: investor fixed | Rule 2: LMA 10% of gross (rate from SPLIT) | Rule 3: remainder 50/50
                    const lmaRate2 = sp2.lma / sp2.weekly;
                    const invA    = Math.min(amt, sp2.inv);
                    const agentA  = hasLma ? Math.round(amt * lmaRate2) : 0;
                    const rem2    = Math.max(0, amt - invA - agentA);
                    const rtA     = Math.round(rem2 * 0.50);
                    const resA    = rem2 - rtA;
                    const expected = sp2.weekly;
                    return(
                      <div style={{background:amt<expected?"#FEF3C7":"#F0FFF4",border:"1.5px solid "+(amt<expected?"#FCD34D":"#BBF7D0"),borderRadius:8,padding:14,marginBottom:12}}>
                        <div style={{fontWeight:700,fontSize:12,marginBottom:8,color:amt<expected?"#92400E":"#166534"}}>
                          {amt<expected?"⚠️ SHORT PAYMENT — investor share protected; reserve covers gap at disbursement":"✅ Full payment — standard 3-rule split"}
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,fontSize:12}}>
                          {[["Investor",invA,C.blue],["Agent",agentA,C.green],["RoyalTech",rtA,C.orange],["Reserve",resA,"#888"]].map(([l,v,c])=>(
                            <div key={l} style={{textAlign:"center",background:"rgba(255,255,255,.7)",borderRadius:6,padding:8}}>
                              <div style={{fontWeight:900,color:c,fontSize:14}}>₦{v.toLocaleString()}</div>
                              <div style={{color:"#666",fontSize:10,marginTop:2}}>{l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                  <button style={{background:C.orange,color:C.white,border:"none",padding:"12px 24px",borderRadius:6,fontWeight:700,fontSize:14,cursor:"pointer"}} onClick={recordRemittance}>
                    Record Remittance & Split to Buckets
                  </button>
                </div>

                {/* Recent remittances */}
                <div style={{fontWeight:800,fontSize:15,marginBottom:12}}>Recent Remittances</div>
                {remittances.length===0&&<div style={{color:C.grey,fontSize:14}}>No remittances recorded yet.</div>}
                {remittances.map(r=>(
                  <div key={r.id} style={{background:C.white,borderRadius:8,padding:16,marginBottom:10,border:"1.5px solid "+(r.status==="short"?"#FCD34D":C.lightgr)}}>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:14}}>{r.rt_riders?.full_name||"—"} <span style={{fontSize:12,color:C.grey}}>Week {r.week_number||"—"}</span></div>
                        <div style={{fontSize:12,color:C.grey}}>{new Date(r.created_at).toLocaleDateString("en-NG",{day:"numeric",month:"short",year:"numeric"})}</div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontWeight:900,fontSize:16,color:r.status==="short"?"#92400E":C.black}}>₦{r.amount_received.toLocaleString()}</div>
                        <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:10,background:r.status==="short"?"#FEF3C7":"#F0FFF4",color:r.status==="short"?"#92400E":"#166534"}}>{r.status==="short"?"⚠️ Short":"✅ Full"}</span>
                      </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,fontSize:11}}>
                      {[["Investor",r.investor_share,C.blue],["Agent",r.agent_share,C.green],["RoyalTech",r.royaltech_share,C.orange],["Reserve",r.reserve_share,"#888"]].map(([l,v,c])=>(
                        <div key={l} style={{textAlign:"center",background:C.offwhite,borderRadius:4,padding:"4px 6px"}}>
                          <div style={{fontWeight:700,color:c}}>₦{(v||0).toLocaleString()}</div>
                          <div style={{color:C.grey,fontSize:10}}>{l}</div>
                        </div>
                      ))}
                    </div>
                    {r.notes&&<div style={{marginTop:8,fontSize:12,color:C.grey,fontStyle:"italic"}}>{r.notes}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* ── Buckets tab ── */}
            {adminTab==="buckets"&&!loading&&(
              <div>
                <div style={{fontWeight:800,fontSize:15,marginBottom:8}}>🪣 Fund Bucket Balances</div>

                {/* Split formula summary table */}
                <div style={{background:C.black,borderRadius:10,padding:20,marginBottom:24,overflowX:"auto"}}>
                  <div style={{fontWeight:700,fontSize:13,color:C.orange,letterSpacing:1,marginBottom:12,textTransform:"uppercase"}}>📊 Weekly Remittance Split Formula</div>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,color:C.white,minWidth:520}}>
                    <thead>
                      <tr style={{borderBottom:"1px solid rgba(255,255,255,.2)"}}>
                        {["Vehicle","Weekly In","Investor Pool","LMA (10% gross)","RoyalTech (50% rem.)","Pool (50% rem.)"].map(h=>(
                          <th key={h} style={{textAlign:"left",padding:"6px 10px",opacity:.6,fontWeight:600,letterSpacing:.5}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {icon:"🏍️",name:"Bike",    vt:"bike"},
                        {icon:"🛺",name:"Keke",    vt:"keke"},
                        {icon:"🚗",name:"Mini",    vt:"mini"},
                        {icon:"🚌",name:"Full Bus",vt:"full"},
                      ].map(row=>{
                        const sp=SPLIT[row.vt];
                        const pct=v=>+(v/sp.weekly*100).toFixed(1);
                        return(
                          <tr key={row.vt} style={{borderBottom:"1px solid rgba(255,255,255,.08)"}}>
                            <td style={{padding:"9px 10px",fontWeight:700}}>{row.icon} {row.name}</td>
                            <td style={{padding:"9px 10px",color:C.orange,fontWeight:700}}>₦{sp.weekly.toLocaleString()}</td>
                            <td style={{padding:"9px 10px"}}>
                              <span style={{fontWeight:700}}>₦{sp.inv.toLocaleString()}</span>
                              <span style={{opacity:.5,marginLeft:4}}>({pct(sp.inv)}%)</span>
                            </td>
                            <td style={{padding:"9px 10px"}}>
                              <span style={{fontWeight:700}}>₦{sp.lma.toLocaleString()}</span>
                              <span style={{opacity:.5,marginLeft:4}}>({pct(sp.lma)}%)</span>
                            </td>
                            <td style={{padding:"9px 10px"}}>
                              <span style={{fontWeight:700}}>₦{sp.rt.toLocaleString()}</span>
                              <span style={{opacity:.5,marginLeft:4}}>({pct(sp.rt)}%)</span>
                            </td>
                            <td style={{padding:"9px 10px"}}>
                              <span style={{fontWeight:700}}>₦{sp.reserve.toLocaleString()}</span>
                              <span style={{opacity:.5,marginLeft:4}}>({pct(sp.reserve)}%)</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:10,lineHeight:1.6}}>
                    Rule 1: Investor share is paid first and always in full — any weekly shortfall is covered by the Contingency Reserve at monthly disbursement.<br/>
                    Rule 2: LMA receives 10% of the gross weekly remittance, disbursed monthly to their LGA.<br/>
                    Rule 3: The remainder (gross − investor − LMA) is split 50% RoyalTech / 50% Contingency Reserve (Pool).
                  </div>
                </div>

                {/* Bucket balance cards — all 4 vehicle types */}
                {[
                  {vt:"bike",  icon:"🏍️", label:"Bike (2-Wheel)"},
                  {vt:"keke",  icon:"🛺",  label:"Keke / Tricycle (3-Wheel)"},
                  {vt:"mini",  icon:"🚗",  label:"Four Wheels Mini (Korope)"},
                  {vt:"full",  icon:"🚌",  label:"Four Wheels Full (Hiace / Cab)"},
                ].map(({vt,icon,label})=>(
                  <div key={vt} style={{marginBottom:28}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,textTransform:"uppercase",marginBottom:10,color:C.black}}>
                      {icon} {label}
                    </div>
                    {/* Mini split-bar */}
                    {(()=>{
                      const sp=SPLIT[vt];
                      const pcts=[sp.inv/sp.weekly*100,sp.lma/sp.weekly*100,sp.rt/sp.weekly*100,sp.reserve/sp.weekly*100];
                      const colors=[C.blue,C.green,C.orange,"#888"];
                      return(
                        <div style={{display:"flex",height:6,borderRadius:4,overflow:"hidden",marginBottom:10}}>
                          {pcts.map((p,i)=><div key={i} style={{width:p+"%",background:colors[i]}}/>)}
                        </div>
                      );
                    })()}
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12}}>
                      {[
                        {key:"investor_"+vt,   label:"Investor Pool",     color:C.blue},
                        {key:"agent_"+vt,      label:"Agent Commission",  color:C.green},
                        {key:"royaltech_"+vt,  label:"RoyalTech",         color:C.orange},
                        {key:"reserve_"+vt,    label:"Reserve Fund",      color:"#888"},
                        {key:"deposit_"+vt,    label:"Deposits Received", color:C.purple},
                      ].map(b=>{
                        const data = buckets[b.key]||{balance:0,total_received:0};
                        return(
                          <div key={b.key} style={{background:C.white,borderRadius:10,padding:16,border:"1.5px solid "+C.lightgr}}>
                            <div style={{fontSize:11,fontWeight:700,color:b.color,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{b.label}</div>
                            <div style={{fontWeight:900,fontSize:22,color:C.black,marginBottom:4}}>₦{(data.balance||0).toLocaleString()}</div>
                            <div style={{fontSize:11,color:C.grey}}>Total received: ₦{(data.total_received||0).toLocaleString()}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* ═══════════════════════════════════════════════════
                    DEPOSIT SPLIT SECTION
                    Holding bucket per rider → auto-split at 100%
                ═══════════════════════════════════════════════════ */}
                <div style={{marginTop:40,paddingTop:32,borderTop:"2px solid "+C.lightgr}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,textTransform:"uppercase",marginBottom:4,color:C.black}}>
                    💰 Initial Deposit Buckets
                  </div>
                  <div style={{fontSize:13,color:C.grey,marginBottom:24,lineHeight:1.7}}>
                    Each rider's deposit is held in a single per-rider holding bucket. Once the full deposit target is reached, the holding bucket auto-splits into four purpose buckets below.
                  </div>

                  {/* Deposit split formula table */}
                  <div style={{background:C.black,borderRadius:12,padding:20,marginBottom:28,overflowX:"auto"}}>
                    <div style={{fontWeight:700,fontSize:13,color:C.orange,letterSpacing:1,marginBottom:12,textTransform:"uppercase"}}>💰 Deposit Split Formula (on 100% completion)</div>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,color:C.white,minWidth:560}}>
                      <thead>
                        <tr style={{borderBottom:"1px solid rgba(255,255,255,.2)"}}>
                          {["Category","Deposit Target","D/R–D/B","RT Inv. RPIT","RT P/O","CR–IR"].map(h=>(
                            <th key={h} style={{textAlign:"left",padding:"6px 10px",opacity:.6,fontWeight:600,letterSpacing:.5}}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {icon:"🏍️",name:"Bike",    vt:"bike"},
                          {icon:"🛺",name:"Keke",    vt:"keke"},
                          {icon:"🚗",name:"Mini",    vt:"mini"},
                          {icon:"🚌",name:"Full Bus",vt:"full"},
                        ].map(row=>{
                          const ds=DEPOSIT_SPLIT[row.vt];
                          const pcts=[ds.drdb/ds.target*100,ds.rpit/ds.target*100,ds.rtpo/ds.target*100,ds.crir/ds.target*100];
                          return(
                            <tr key={row.vt} style={{borderBottom:"1px solid rgba(255,255,255,.08)"}}>
                              <td style={{padding:"9px 10px",fontWeight:700}}>{row.icon} {row.name}</td>
                              <td style={{padding:"9px 10px",color:C.orange,fontWeight:700}}>₦{ds.target.toLocaleString()}</td>
                              <td style={{padding:"9px 10px"}}><span style={{fontWeight:700}}>₦{ds.drdb.toLocaleString()}</span><span style={{opacity:.5,marginLeft:4}}>({pcts[0].toFixed(1)}%)</span></td>
                              <td style={{padding:"9px 10px"}}><span style={{fontWeight:700}}>₦{ds.rpit.toLocaleString()}</span><span style={{opacity:.5,marginLeft:4}}>({pcts[1].toFixed(1)}%)</span></td>
                              <td style={{padding:"9px 10px"}}><span style={{fontWeight:700}}>₦{ds.rtpo.toLocaleString()}</span><span style={{opacity:.5,marginLeft:4}}>({pcts[2].toFixed(1)}%)</span></td>
                              <td style={{padding:"9px 10px"}}><span style={{fontWeight:700}}>₦{ds.crir.toLocaleString()}</span><span style={{opacity:.5,marginLeft:4}}>({pcts[3].toFixed(1)}%)</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:10,lineHeight:1.7}}>
                      <strong style={{color:"rgba(255,255,255,.6)"}}>D/R–D/B:</strong> Rider Discount / LMA Bonus fund &nbsp;|&nbsp;
                      <strong style={{color:"rgba(255,255,255,.6)"}}>RT Inv. RPIT:</strong> RoyalTech Co-Investment — Registration, Plate, Insurance & Tracker &nbsp;|&nbsp;
                      <strong style={{color:"rgba(255,255,255,.6)"}}>RT P/O:</strong> RoyalTech Overhead / Profit &nbsp;|&nbsp;
                      <strong style={{color:"rgba(255,255,255,.6)"}}>CR–IR:</strong> Contingency Reserve — Incentives & Rewards
                    </div>
                  </div>

                  {/* Per-rider deposit holding buckets */}
                  <div style={{fontWeight:700,fontSize:14,marginBottom:14,color:C.black}}>🔒 Per-Rider Deposit Holding Buckets</div>
                  <div style={{fontSize:12,color:C.grey,marginBottom:16,lineHeight:1.6}}>
                    Showing all riders with deposit on record. A bucket marked <strong>✅ SPLIT READY</strong> has hit 100% — tap to trigger the split into the four destination buckets.
                  </div>
                  {riders.filter(r=>r.deposit_paid>0||r.status==="committed").length===0
                    ? <div style={{color:C.grey,fontSize:13,fontStyle:"italic"}}>No deposit records yet. Deposits appear here once a rider's first payment is logged.</div>
                    : riders.filter(r=>r.status==="committed"||r.status==="active"||r.deposit_paid>0).map(r=>{
                        const ds = DEPOSIT_SPLIT[r.vehicle_type]||DEPOSIT_SPLIT.keke;
                        const held = r.deposit_paid||0;
                        const pct  = Math.min(100, Math.round(held/ds.target*100));
                        const full = held>=ds.target;
                        const vtLabel = {bike:"Dispatch Bike 🏍️",keke:"Keke Tricycle 🛺",mini:"Mini (Korope) 🚗",full:"Full Bus/Cab 🚌"}[r.vehicle_type]||r.vehicle_type;
                        return(
                          <div key={r.id} style={{background:C.white,borderRadius:10,padding:18,marginBottom:12,border:"2px solid "+(full?"#16A34A":C.lightgr)}}>
                            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:10}}>
                              <div>
                                <div style={{fontWeight:800,fontSize:14,color:C.black}}>{r.full_name}</div>
                                <div style={{fontSize:12,color:C.grey}}>{vtLabel} · {r.lga||"—"}</div>
                              </div>
                              <div style={{textAlign:"right"}}>
                                <div style={{fontWeight:900,fontSize:18,color:full?"#16A34A":C.orange}}>₦{held.toLocaleString()} <span style={{fontSize:12,fontWeight:600,color:C.grey}}>/ ₦{ds.target.toLocaleString()}</span></div>
                                {full
                                  ? <span style={{fontSize:11,fontWeight:700,background:"#DCFCE7",color:"#166534",padding:"2px 10px",borderRadius:10}}>✅ SPLIT READY</span>
                                  : <span style={{fontSize:11,fontWeight:700,background:"#FEF3C7",color:"#92400E",padding:"2px 10px",borderRadius:10}}>⏳ {pct}% collected</span>
                                }
                              </div>
                            </div>
                            {/* Progress bar */}
                            <div style={{background:C.lightgr,borderRadius:4,height:8,marginBottom:full?14:0,overflow:"hidden"}}>
                              <div style={{width:pct+"%",height:"100%",background:full?"#16A34A":C.orange,borderRadius:4,transition:"width .4s"}}/>
                            </div>
                            {/* Split preview — only shown when full */}
                            {full&&(
                              <div style={{marginTop:12}}>
                                <div style={{fontSize:11,fontWeight:700,color:C.grey,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Split breakdown on trigger:</div>
                                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8,marginBottom:12}}>
                                  {[
                                    {label:"D/R–D/B",desc:"Rider Discount / LMA Bonus",    val:ds.drdb, color:"#7C3AED"},
                                    {label:"RT Inv. RPIT",desc:"Reg · Plate · Ins · Tracker",val:ds.rpit, color:C.blue},
                                    {label:"RT P/O",desc:"RoyalTech Overhead / Profit",       val:ds.rtpo, color:C.orange},
                                    {label:"CR–IR",desc:"Contingency Reserve — Incentives",   val:ds.crir, color:"#888"},
                                  ].map(b=>(
                                    <div key={b.label} style={{background:C.offwhite,borderRadius:8,padding:"10px 12px",border:"1.5px solid "+C.lightgr}}>
                                      <div style={{fontWeight:900,fontSize:15,color:b.color}}>₦{b.val.toLocaleString()}</div>
                                      <div style={{fontSize:10,fontWeight:700,color:C.black,marginTop:2}}>{b.label}</div>
                                      <div style={{fontSize:9,color:C.grey,marginTop:1,lineHeight:1.4}}>{b.desc}</div>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  style={{background:"#16A34A",color:C.white,padding:"10px 24px",borderRadius:6,fontWeight:700,fontSize:13,cursor:"pointer",border:"none"}}
                                  onClick={async()=>{
                                    if(!window.confirm(`Trigger deposit split for ${r.full_name}? This will move ₦${ds.target.toLocaleString()} from holding into the 4 destination buckets and cannot be undone.`)) return;
                                    const ds2=DEPOSIT_SPLIT[r.vehicle_type]||DEPOSIT_SPLIT.keke;
                                    const vt=r.vehicle_type;
                                    const splits=[
                                      {name:"dep_drdb_"+vt, add:ds2.drdb},
                                      {name:"dep_rpit_"+vt, add:ds2.rpit},
                                      {name:"dep_rtpo_"+vt, add:ds2.rtpo},
                                      {name:"dep_crir_"+vt, add:ds2.crir},
                                    ];
                                    for(const b of splits){
                                      const cur=buckets[b.name];
                                      if(cur){ await sb.from("rt_buckets").update({balance:(cur.balance||0)+b.add,total_received:(cur.total_received||0)+b.add,updated_at:new Date().toISOString()}).eq("bucket_name",b.name); }
                                    }
                                    // Mark deposit as split on the rider record
                                    await sb.from("rt_riders").update({deposit_split_done:true}).eq("id",r.id);
                                    await loadData();
                                    showToast(`✅ Deposit split triggered for ${r.full_name} — 4 buckets updated.`);
                                  }}
                                >
                                  ⚡ Trigger Deposit Split
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                  }

                  {/* Deposit destination bucket totals — all 4 vehicle types */}
                  <div style={{fontWeight:700,fontSize:14,marginBottom:6,marginTop:32,color:C.black}}>📦 Deposit Buckets — Holding & Destination</div>
                  <div style={{fontSize:12,color:C.grey,marginBottom:16,lineHeight:1.6}}>
                    The <strong>Holding</strong> bucket (left) accumulates all partial deposits not yet split. It deflates each time a rider's deposit hits 100% and triggers the split into the four destination buckets to its right.
                  </div>
                  {[
                    {vt:"bike", icon:"🏍️", label:"Bike (2-Wheel)"},
                    {vt:"keke", icon:"🛺",  label:"Keke / Tricycle (3-Wheel)"},
                    {vt:"mini", icon:"🚗",  label:"Four Wheels Mini (Korope)"},
                    {vt:"full", icon:"🚌",  label:"Four Wheels Full (Hiace / Cab)"},
                  ].map(({vt,icon,label})=>{
                    const ds=DEPOSIT_SPLIT[vt];
                    // Pending holding = sum of deposit_paid for all riders of this type NOT yet split
                    const pendingRiders = riders.filter(r=>r.vehicle_type===vt && !r.deposit_split_done && (r.deposit_paid||0)>0);
                    const holdingBal = pendingRiders.reduce((s,r)=>s+(r.deposit_paid||0),0);
                    // How many riders are split-ready vs still accumulating
                    const readyCount = pendingRiders.filter(r=>(r.deposit_paid||0)>=ds.target).length;
                    const accumCount = pendingRiders.filter(r=>(r.deposit_paid||0)<ds.target).length;
                    // Destination bucket split-bar proportions
                    const pcts=[ds.drdb/ds.target*100,ds.rpit/ds.target*100,ds.rtpo/ds.target*100,ds.crir/ds.target*100];
                    const colors=["#7C3AED",C.blue,C.orange,"#888"];
                    return(
                      <div key={vt} style={{marginBottom:28}}>
                        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:17,textTransform:"uppercase",marginBottom:10,color:C.black}}>{icon} {label}</div>
                        {/* Split-bar — holding stripe + 4 destination colours */}
                        <div style={{display:"flex",height:7,borderRadius:4,overflow:"hidden",marginBottom:12,gap:2}}>
                          <div style={{width:"20%",background:"#D97706",borderRadius:"4px 0 0 4px",opacity:.85}}/>
                          {pcts.map((p,i)=><div key={i} style={{width:(p*0.8)+"%",background:colors[i]}}/>)}
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:10}}>

                          {/* ── Column 0: Holding bucket ── */}
                          <div style={{background:"#FFF8EC",borderRadius:10,padding:16,border:"2px solid #F59E0B",position:"relative",overflow:"hidden"}}>
                            {/* animated pulse ring when riders are ready to split */}
                            {readyCount>0&&(
                              <div style={{position:"absolute",top:8,right:8,width:10,height:10,borderRadius:"50%",background:"#16A34A",boxShadow:"0 0 0 3px #BBF7D0"}}/>
                            )}
                            <div style={{fontSize:10,fontWeight:700,color:"#D97706",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>⏳ Holding</div>
                            <div style={{fontSize:9,color:"#92400E",marginBottom:8,lineHeight:1.4}}>Partial deposits — awaiting 100% to split</div>
                            <div style={{fontWeight:900,fontSize:20,color:"#92400E",marginBottom:4}}>₦{holdingBal.toLocaleString()}</div>
                            <div style={{fontSize:10,color:"#92400E",marginBottom:6}}>
                              {pendingRiders.length} rider{pendingRiders.length!==1?"s":""} pending
                            </div>
                            {readyCount>0&&(
                              <div style={{fontSize:10,fontWeight:700,background:"#DCFCE7",color:"#166534",padding:"3px 8px",borderRadius:6,display:"inline-block"}}>
                                ✅ {readyCount} ready to split
                              </div>
                            )}
                            {accumCount>0&&(
                              <div style={{fontSize:10,color:"#92400E",marginTop:4}}>
                                ⏳ {accumCount} still accumulating
                              </div>
                            )}
                          </div>

                          {/* ── Columns 1–4: Destination buckets ── */}
                          {[
                            {key:"dep_drdb_"+vt, label:"D/R–D/B",      desc:"Rider Discount / LMA Bonus",        color:"#7C3AED"},
                            {key:"dep_rpit_"+vt, label:"RT Inv. RPIT", desc:"Reg · Plate · Insurance · Tracker", color:C.blue},
                            {key:"dep_rtpo_"+vt, label:"RT P/O",       desc:"RoyalTech Overhead / Profit",        color:C.orange},
                            {key:"dep_crir_"+vt, label:"CR–IR",        desc:"Contingency Reserve — Incentives",   color:"#888"},
                          ].map(b=>{
                            const data=buckets[b.key]||{balance:0,total_received:0};
                            return(
                              <div key={b.key} style={{background:C.white,borderRadius:10,padding:16,border:"1.5px solid "+C.lightgr}}>
                                <div style={{fontSize:10,fontWeight:700,color:b.color,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{b.label}</div>
                                <div style={{fontSize:9,color:C.grey,marginBottom:8,lineHeight:1.4}}>{b.desc}</div>
                                <div style={{fontWeight:900,fontSize:20,color:C.black,marginBottom:4}}>₦{(data.balance||0).toLocaleString()}</div>
                                <div style={{fontSize:11,color:C.grey}}>Total in: ₦{(data.total_received||0).toLocaleString()}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* ── Legal Documents tab ── */}
            {adminTab==="documents"&&(
              <div>
                <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>📄 RideTrust Legal Document Library</div>
                <div style={{fontSize:12,color:C.grey,marginBottom:24}}>All 7 governing documents. Copy or download as needed for printing, signing, or archiving.</div>
                {[
                  {id:"doc1", title:"Document 1 — Hire Purchase Agreement (Bike / 2-Wheel)", emoji:"🏍️",
                   desc:"Master HP agreement between RoyalTech and bike rider. Covers title retention, weekly instalments (₦40k × 45 wks), deposit (₦200k), default & repossession clauses."},
                  {id:"doc2", title:"Document 2 — Hire Purchase Agreement (Keke / 3-Wheel)", emoji:"🛺",
                   desc:"Master HP agreement for tricycle (keke napep). Weekly instalments ₦90k × 78 wks, deposit ₦600k. Includes guarantor obligations and referral discount schedule."},
                  {id:"doc2a",title:"Document 2A — HP Agreement (Four Wheels Mini — Korope)", emoji:"🚗",
                   desc:"HP for clean Tokunbo Korope / 4-wheel mini. ₦800k deposit, ₦90k/wk × 130 wks = ₦11,700,000 HP repayment."},
                  {id:"doc2b",title:"Document 2B — HP Agreement (Four Wheels Full — Hiace / Cab Ride)", emoji:"🚌",
                   desc:"HP for full Hiace bus or cab. ₦1M deposit, ₦120k/wk × 152 wks = ₦18,240,000 HP repayment."},
                  {id:"doc3", title:"Document 3 — Local Marketing Agent (LMA) Agreement", emoji:"🤝",
                   desc:"LMA recruitment, commission (10% of confirmed weekly instalments), tiered commission reserve model, referral bonus, performance incentive, and prohibition on handling rider funds."},
                  {id:"doc4", title:"Document 4 — Investor Agreement", emoji:"💼",
                   desc:"Investment terms, weekly harvest accrual schedule, payout structure, fund segregation, and exit/transfer provisions for all 4 vehicle-type investment packages."},
                  {id:"doc5", title:"Document 5 — Guarantor Agreement", emoji:"🛡️",
                   desc:"Guarantor obligations, liability cap, replacement trigger (count drops below threshold), and guarantor lifecycle stages 1–4."},
                ].map(doc=>(
                  <div key={doc.id} style={{background:C.white,borderRadius:10,padding:20,marginBottom:14,border:"1.5px solid "+C.lightgr,display:"flex",alignItems:"flex-start",gap:16}}>
                    <div style={{fontSize:32,flexShrink:0,lineHeight:1}}>{doc.emoji}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:14,marginBottom:6,color:C.black,lineHeight:1.3}}>{doc.title}</div>
                      <div style={{fontSize:12,color:C.grey,lineHeight:1.7,marginBottom:12}}>{doc.desc}</div>
                      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                        <button onClick={()=>{
                          const el=document.createElement("textarea");
                          el.value="["+doc.title+"] — Request the full signed copy from the RideTrust admin portal or contact "+ADMIN_EMAIL;
                          document.body.appendChild(el);el.select();document.execCommand("copy");document.body.removeChild(el);
                          showToast("Document reference copied to clipboard.");
                        }} style={{background:C.black,color:C.white,padding:"8px 16px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                          📋 Copy Reference
                        </button>
                        <a href={"mailto:"+ADMIN_EMAIL+"?subject=Request: "+encodeURIComponent(doc.title)+"&body=Please send me the signed copy of "+encodeURIComponent(doc.title)+"."}
                           style={{background:C.orange,color:C.white,padding:"8px 16px",borderRadius:6,fontSize:12,fontWeight:700,textDecoration:"none",display:"inline-block"}}>
                          ✉️ Email Request
                        </a>
                        <button onClick={()=>{
                          const blob=new Blob(["RideTrust Legal Document Reference\n\n"+doc.title+"\n\n"+doc.desc+"\n\nFor the full document, contact:\n"+ADMIN_EMAIL+"\n"+ADMIN_PHONE+"\n\nIssued by RoyalTech Products — RideTrust Platform"],{type:"text/plain"});
                          const a=document.createElement("a");
                          a.href=URL.createObjectURL(blob);
                          a.download=doc.id+"_ridetrust_reference.txt";
                          a.click();
                        }} style={{background:C.offwhite,color:C.black,padding:"8px 16px",borderRadius:6,fontSize:12,fontWeight:700,border:"1.5px solid "+C.lightgr,cursor:"pointer"}}>
                          ⬇️ Download Reference
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{background:"#FEF3C7",border:"1.5px solid #FCD34D",borderRadius:10,padding:16,fontSize:12,color:"#92400E",lineHeight:1.8,marginTop:8}}>
                  <strong>Note:</strong> These are reference summaries. Full executed copies of each agreement are held in the RoyalTech secure document store. To download a signed PDF copy of any document, contact the admin team at <strong>{ADMIN_EMAIL}</strong> or <strong>{ADMIN_PHONE}</strong>.
                </div>
              </div>
            )}

            {/* ── Analytics tab ── */}
            {adminTab==="analytics"&&(
              <div>
                <div style={{fontWeight:800,fontSize:15,color:C.black,marginBottom:16}}>Platform Overview</div>
                {/* Summary stats */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
                  {[
                    {label:"Total Riders",value:riders.length,color:C.black},
                    {label:"Bike Applications",value:riders.filter(r=>r.vehicle_type==="bike").length,color:C.black},
                    {label:"Keke Applications",value:riders.filter(r=>r.vehicle_type==="keke").length,color:C.green},
                    {label:"Mini (Korope)",value:riders.filter(r=>r.vehicle_type==="mini").length,color:"#4338CA"},
                    {label:"Full Bus/Cab",value:riders.filter(r=>r.vehicle_type==="full").length,color:"#991B1B"},
                    {label:"Active Riders",value:riders.filter(r=>r.status==="active").length,color:C.orange},
                    {label:"Agent Applications",value:agents.length,color:C.blue},
                    {label:"Approved Agents",value:agents.filter(a=>a.status==="approved").length,color:C.green},
                    {label:"Investor Enquiries",value:investors.length,color:C.purple},
                    {label:"Active Investors",value:investors.filter(i=>i.status==="active").length,color:C.green},
                  ].map(s=>(
                    <div key={s.label} style={{background:C.white,borderRadius:8,padding:16,border:"1.5px solid "+C.lightgr,textAlign:"center"}}>
                      <div style={{fontWeight:900,fontSize:28,color:s.color}}>{s.value}</div>
                      <div style={{fontSize:11,color:C.grey,marginTop:4,lineHeight:1.4}}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* GA4 panel */}
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr}}>
                  <div style={{fontWeight:800,fontSize:14,color:C.black,marginBottom:16}}>🌐 Website Visitor Analytics — Last 30 Days</div>
                  {!ga4&&!ga4Err&&<div style={{color:C.grey,fontSize:13,textAlign:"center",padding:20}}>Loading visitor data...</div>}
                  {ga4Err&&<div style={{background:"#FEF3C7",border:"1.5px solid #FCD34D",borderRadius:8,padding:12,fontSize:12,color:"#92400E",lineHeight:1.8}}><strong>Analytics unavailable:</strong> {ga4Err}</div>}
                  {ga4&&(
                    <div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:16}}>
                        {[
                          {label:"Today",value:ga4.visitors?.today||0,icon:"👤"},
                          {label:"This Week",value:ga4.visitors?.week||0,icon:"📅"},
                          {label:"This Month",value:ga4.visitors?.month||0,icon:"📆"},
                          {label:"Sessions (30d)",value:ga4.visitors?.sessions||0,icon:"🔄"},
                        ].map(s=>(
                          <div key={s.label} style={{background:C.offwhite,borderRadius:8,padding:12,textAlign:"center"}}>
                            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
                            <div style={{fontWeight:900,color:C.black,fontSize:20}}>{(s.value||0).toLocaleString()}</div>
                            <div style={{fontSize:10,color:C.grey,marginTop:2}}>{s.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                        <div>
                          <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>📱 Devices</div>
                          {(ga4.devices||[]).map(d=>{
                            const total=(ga4.devices||[]).reduce((s,x)=>s+x.sessions,0)||1;
                            const pct=Math.round((d.sessions/total)*100);
                            return(
                              <div key={d.device} style={{marginBottom:8}}>
                                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}>
                                  <span style={{textTransform:"capitalize"}}>{d.device==="mobile"?"📱":d.device==="desktop"?"🖥️":"📟"} {d.device}</span>
                                  <span style={{fontWeight:700}}>{pct}%</span>
                                </div>
                                <div style={{background:C.lightgr,borderRadius:4,height:5}}>
                                  <div style={{background:C.blue,borderRadius:4,height:5,width:pct+"%"}}/>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>🔗 Traffic Sources</div>
                          {(ga4.sources||[]).slice(0,5).map(s=>(
                            <div key={s.source} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",background:C.offwhite,borderRadius:6,fontSize:11,marginBottom:4}}>
                              <span>{s.source}</span><span style={{fontWeight:700}}>{s.sessions}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                        <div>
                          <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>📄 Top Pages</div>
                          {(ga4.pages||[]).map(p=>(
                            <div key={p.path} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",background:C.offwhite,borderRadius:6,fontSize:11,marginBottom:4}}>
                              <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"65%"}}>{p.path}</span>
                              <span style={{fontWeight:700}}>{p.views} views</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>🌍 Top Cities</div>
                          {(ga4.cities||[]).map(c=>(
                            <div key={c.city} style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",background:C.offwhite,borderRadius:6,fontSize:11,marginBottom:4}}>
                              <span>{c.city}</span><span style={{fontWeight:700}}>{c.users}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ══ REFERRAL LINKS TAB ══════════════════════════ */}
            {adminTab==="referrals"&&(
              <div>
                {/* ── Copy helper ── */}
                {(()=>{
                  const copyLink = (key, url) => {
                    navigator.clipboard.writeText(url).then(()=>{
                      setCopiedKey(key);
                      setTimeout(()=>setCopiedKey(null), 2000);
                    });
                  };

                  const CopyBtn = ({linkKey, url}) => (
                    <button onClick={()=>copyLink(linkKey, url)}
                      style={{padding:"7px 14px",borderRadius:6,border:"1.5px solid "+(copiedKey===linkKey?C.green:C.orange),
                        background:copiedKey===linkKey?"#DCFCE7":C.white,color:copiedKey===linkKey?C.green:C.orange,
                        fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",minWidth:90,transition:"all .2s"}}>
                      {copiedKey===linkKey?"✅ Copied!":"📋 Copy"}
                    </button>
                  );

                  const LinkRow = ({label, linkKey, url}) => (
                    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid "+C.lightgr,flexWrap:"wrap"}}>
                      <span style={{fontSize:13,color:C.black,fontWeight:600,minWidth:200,flex:1}}>{label}</span>
                      <span style={{fontSize:11,color:C.grey,fontFamily:"monospace",flex:2,wordBreak:"break-all",background:C.offwhite,padding:"4px 8px",borderRadius:4}}>{url}</span>
                      <CopyBtn linkKey={linkKey} url={url}/>
                    </div>
                  );

                  // Per-LMA links
                  const lmaLinks = agents.filter(a=>a.status==="approved").map(a=>({
                    id: a.id,
                    name: a.name,
                    riderUrl:  `${BASE_URL}/?ref=lma&id=${a.id}&to=riders`,
                    lmaUrl:    `${BASE_URL}/?ref=lma&id=${a.id}&to=lma`,
                  }));

                  // Per-rider links
                  const riderLinks = riders.filter(r=>r.status==="active").map(r=>({
                    id: r.id,
                    name: r.name,
                    url: `${BASE_URL}/?ref=rider&id=${r.id}&to=riders`,
                  }));

                  // Referral visit stats
                  const totalVisits = refVisits.length;
                  const converted  = refVisits.filter(v=>v.converted).length;
                  const byDest = ["riders","lma","investors"].map(d=>({
                    dest: d,
                    count: refVisits.filter(v=>v.destination===d).length,
                  }));
                  const byType = ["admin","lma","rider"].map(t=>({
                    type: t,
                    count: refVisits.filter(v=>v.ref_type===t).length,
                  }));
                  const today = new Date().toDateString();
                  const todayCount = refVisits.filter(v=>new Date(v.visited_at).toDateString()===today).length;

                  return (
                    <div>
                      {/* Stats row */}
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:24}}>
                        {[
                          {label:"Total Link Visits",value:totalVisits,color:C.blue},
                          {label:"Today's Visits",value:todayCount,color:C.orange},
                          {label:"Conversions",value:converted,color:C.green},
                          {label:"Rider Page Visits",value:byDest.find(b=>b.dest==="riders")?.count||0,color:C.black},
                          {label:"LMA Page Visits",value:byDest.find(b=>b.dest==="lma")?.count||0,color:C.blue},
                          {label:"Investor Page Visits",value:byDest.find(b=>b.dest==="investors")?.count||0,color:C.purple},
                        ].map(s=>(
                          <div key={s.label} style={{background:C.white,borderRadius:8,padding:14,border:"1.5px solid "+C.lightgr,textAlign:"center"}}>
                            <div style={{fontWeight:900,fontSize:26,color:s.color}}>{s.value}</div>
                            <div style={{fontSize:10,color:C.grey,marginTop:4,lineHeight:1.4}}>{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Admin links */}
                      <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:20}}>
                        <div style={{fontWeight:800,fontSize:14,color:C.black,marginBottom:4}}>🏢 Admin Referral Links</div>
                        <div style={{fontSize:12,color:C.grey,marginBottom:14}}>Share these on WhatsApp or any channel to direct audiences to the right landing page.</div>
                        <LinkRow label="🏍️ Riders / Drivers Page"   linkKey="admin-riders"    url={`${BASE_URL}/?ref=admin&to=riders`}/>
                        <LinkRow label="🤝 LMA Recruitment Page"     linkKey="admin-lma"       url={`${BASE_URL}/?ref=admin&to=lma`}/>
                        <LinkRow label="💰 Investors Page"           linkKey="admin-investors" url={`${BASE_URL}/?ref=admin&to=investors`}/>
                      </div>

                      {/* LMA links */}
                      <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:20}}>
                        <div style={{fontWeight:800,fontSize:14,color:C.black,marginBottom:4}}>🤝 LMA Unique Referral Links</div>
                        <div style={{fontSize:12,color:C.grey,marginBottom:14}}>Each approved LMA gets two links — one to recruit riders, one to recruit new LMAs. Applications are automatically attributed.</div>
                        {lmaLinks.length===0&&<div style={{fontSize:12,color:C.grey,textAlign:"center",padding:16}}>No approved LMAs yet.</div>}
                        {lmaLinks.map(l=>(
                          <div key={l.id} style={{marginBottom:16,background:C.offwhite,borderRadius:8,padding:14}}>
                            <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:C.black}}>👤 {l.name}</div>
                            <LinkRow label="→ Refer Riders/Drivers" linkKey={`lma-riders-${l.id}`} url={l.riderUrl}/>
                            <LinkRow label="→ Recruit New LMA"      linkKey={`lma-lma-${l.id}`}    url={l.lmaUrl}/>
                          </div>
                        ))}
                      </div>

                      {/* Rider links */}
                      <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:20}}>
                        <div style={{fontWeight:800,fontSize:14,color:C.black,marginBottom:4}}>🏍️ Active Rider Unique Referral Links</div>
                        <div style={{fontSize:12,color:C.grey,marginBottom:14}}>Each active rider gets one link. When someone applies through it, the discount is credited to that rider's HP balance.</div>
                        {riderLinks.length===0&&<div style={{fontSize:12,color:C.grey,textAlign:"center",padding:16}}>No active riders yet.</div>}
                        {riderLinks.map(r=>(
                          <div key={r.id} style={{marginBottom:8}}>
                            <LinkRow label={"🏍️ "+r.name} linkKey={`rider-${r.id}`} url={r.url}/>
                          </div>
                        ))}
                      </div>

                      {/* Recent visits log */}
                      <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr}}>
                        <div style={{fontWeight:800,fontSize:14,color:C.black,marginBottom:14}}>📋 Recent Link Visits</div>
                        {refVisitsErr&&<div style={{color:"#DC2626",fontSize:12,marginBottom:8}}>⚠️ {refVisitsErr}</div>}
                        {refVisits.length===0&&!refVisitsErr&&<div style={{color:C.grey,fontSize:12,textAlign:"center",padding:16}}>No visits recorded yet. Share the links above to get started.</div>}
                        {refVisits.slice(0,50).map(v=>{
                          const who = v.ref_type==="admin" ? "Admin link" :
                            v.ref_type==="lma"  ? (agents.find(a=>a.id===v.ref_id)?.name||"LMA (unknown)")+" (LMA)" :
                            v.ref_type==="rider"? (riders.find(r=>r.id===v.ref_id)?.name||"Rider (unknown)")+" (Rider)" : v.ref_type;
                          const dest = v.destination==="riders"?"Riders page":v.destination==="lma"?"LMA page":"Investors page";
                          const when = new Date(v.visited_at).toLocaleString("en-NG",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"});
                          return(
                            <div key={v.id} style={{display:"flex",gap:10,alignItems:"center",padding:"7px 0",borderBottom:"1px solid "+C.lightgr,flexWrap:"wrap",fontSize:12}}>
                              <span style={{color:C.grey,minWidth:110}}>{when}</span>
                              <span style={{fontWeight:600,flex:1}}>{who}</span>
                              <span style={{color:C.blue,minWidth:100}}>{dest}</span>
                              <span style={{color:v.converted?C.green:C.grey,fontWeight:v.converted?700:400}}>{v.converted?"✅ Converted":"–"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══ RIDER PAGE (/ride) ════════════════════════════════ */}
      {page==="ride"&&(
        <>
          <nav>
            <div className="logo cd">RIDE<span>TRUST</span> HP</div>
            <div className="nav-tag">HIRE PURCHASE</div>
          </nav>

          {/* Hero */}
          <div style={{background:C.black,padding:"72px 24px 60px",textAlign:"center"}}>
            <div className="hero-eyebrow" style={{background:C.orange,color:C.white}}>RoyalTech Partnership & Investment Limited</div>
            <h1 className="hero-h1 cd" style={{color:C.white}}>Ride To <span style={{color:C.orange}}>Own</span></h1>
            <div className="hero-sub" style={{color:"#CCC"}}>Best Hire Purchase Ever</div>
            <p style={{fontSize:15,color:"#AAA",maxWidth:520,margin:"0 auto 36px",lineHeight:1.8}}>Brand new bike or keke. Fixed deposit. Weekly payments. Full ownership at the end. No bank. No wahala.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn btn-orange" onClick={()=>setModal("rider-bike")}>🏍️ Apply for Bike</button>
              <button className="btn" style={{background:"#1A1A1A",color:C.white,border:"1.5px solid #333"}} onClick={()=>setModal("rider-keke")}>🛺 Apply for Keke</button>
            </div>
          </div>

          {/* Vehicles */}
          <div style={{background:C.offwhite}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.orange}}>Choose Your Vehicle</div>
              <h2 className="sec-h2">Pick Your Hire Purchase Deal</h2>
              <div className="divider" style={{background:C.orange}}/>
              <p className="sec-body">Insurance and plate registration included in every deal. Deposit spread over 3 months.</p>
              <div className="v-grid">
                {/* Bike */}
                <div className="v-card">
                  <div className="v-head" style={{background:C.black}}>
                    <div className="v-tag">Two Wheels</div>
                    <div className="v-emoji">🏍️</div>
                    <div className="v-name cd">Okada / Dispatch Bike</div>
                    <div className="v-desc">Brand new Bajaj, TVS or Qlink 200cc. Insurance and plate registration included.</div>
                  </div>
                  <div className="v-body">
                    <div className="v-row"><span className="v-lbl">Current Market Value</span><span className="v-val" style={{color:C.grey}}>₦1,200,000</span></div>
                    <div className="v-row"><span className="v-lbl">HP Package Value</span><span className="v-val">₦2,000,000</span></div>
                    <div className="v-row"><span className="v-lbl">Insurance & Plate License Reg</span><span className="v-val">Inclusive</span></div>
                    <div className="v-row"><span className="v-lbl">Initial deposit</span><span className="v-val hi">₦200,000</span></div>
                    <div className="v-row"><span className="v-lbl">Deposit spread</span><span className="v-val">3 months</span></div>
                    <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦40,000 / week</span></div>
                    <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">45 weeks</span></div>
                    <div className="v-row"><span className="v-lbl">Total HP payments</span><span className="v-val">₦1,800,000</span></div>
                    <div className="v-row"><span className="v-lbl">Total to own</span><span className="v-val hi">₦2,000,000</span></div>
                    <div style={{borderTop:"1.5px solid #E8E5E0",margin:"10px 0 6px",paddingTop:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.orange,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>🎁 Rider/Driver Referral Discounts</div>
                      <div className="v-row"><span className="v-lbl">Refer a Bike rider</span><span className="v-val" style={{color:"#1A7A3C"}}>₦50,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Keke rider</span><span className="v-val" style={{color:"#1A7A3C"}}>₦150,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Minibus driver</span><span className="v-val" style={{color:"#1A7A3C"}}>₦200,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Full Bus/Cab driver</span><span className="v-val" style={{color:"#1A7A3C"}}>₦250,000 discount off your HP</span></div>
                      <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:6,padding:"8px 10px",marginTop:6,fontSize:11,color:"#166534",lineHeight:1.6}}>
                        Each confirmed referral reduces your outstanding balance — same ₦40,000/week, fewer weeks. No limit on referrals.
                      </div>
                    </div>
                    <button className="btn btn-orange btn-full" onClick={()=>setModal("rider-bike")}>Apply for This Bike</button>
                  </div>
                </div>

                {/* Keke */}
                <div className="v-card">
                  <div className="v-head" style={{background:"#0D2B0D"}}>
                    <div className="v-tag">Three Wheels</div>
                    <div className="v-emoji">🛺</div>
                    <div className="v-name cd">Brand New Keke Tricycle</div>
                    <div className="v-desc">Brand new Bajaj RE, TVS King or Piaggio. Insurance and plate registration included.</div>
                  </div>
                  <div className="v-body">
                    <div className="v-row"><span className="v-lbl">Current Market Value</span><span className="v-val" style={{color:C.grey}}>₦4,000,000</span></div>
                    <div className="v-row"><span className="v-lbl">HP Package Value</span><span className="v-val">₦7,620,000</span></div>
                    <div className="v-row"><span className="v-lbl">Insurance & Plate License Reg</span><span className="v-val">Inclusive</span></div>
                    <div className="v-row"><span className="v-lbl">Initial deposit</span><span className="v-val" style={{color:C.green,fontSize:16}}>₦600,000</span></div>
                    <div className="v-row"><span className="v-lbl">Deposit spread</span><span className="v-val">3 months</span></div>
                    <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦90,000 / week</span></div>
                    <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">78 weeks</span></div>
                    <div className="v-row"><span className="v-lbl">Total HP payments</span><span className="v-val">₦7,020,000</span></div>
                    <div className="v-row"><span className="v-lbl">Total to own</span><span className="v-val" style={{color:C.green,fontSize:16}}>₦7,620,000</span></div>
                    <div style={{borderTop:"1.5px solid #E8E5E0",margin:"10px 0 6px",paddingTop:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.green,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>🎁 Rider/Driver Referral Discounts</div>
                      <div className="v-row"><span className="v-lbl">Refer a Bike rider</span><span className="v-val" style={{color:"#1A7A3C"}}>₦50,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Keke rider</span><span className="v-val" style={{color:"#1A7A3C"}}>₦150,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Minibus driver</span><span className="v-val" style={{color:"#1A7A3C"}}>₦200,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Full Bus/Cab driver</span><span className="v-val" style={{color:"#1A7A3C"}}>₦250,000 discount off your HP</span></div>
                      <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:6,padding:"8px 10px",marginTop:6,fontSize:11,color:"#166534",lineHeight:1.6}}>
                        Each confirmed referral reduces your outstanding balance — same ₦90,000/week, fewer weeks. No limit on referrals.
                      </div>
                    </div>
                    <button className="btn btn-full" style={{background:C.green,color:C.white,marginTop:12}} onClick={()=>setModal("rider-keke")}>Apply for This Keke</button>
                  </div>
                </div>

                {/* 4-Wheel Mini */}
                <div className="v-card">
                  <div className="v-head" style={{background:"#1A1A4A"}}>
                    <div className="v-tag">Four Wheels — Minibus</div>
                    <div className="v-emoji">🚐</div>
                    <div className="v-name cd">Minibus (Korope)</div>
                    <div className="v-desc">Clean tokunbo Korope minibus. Insurance and plate registration included.</div>
                  </div>
                  <div className="v-body">
                    <div className="v-row"><span className="v-lbl">Current Market Value</span><span className="v-val" style={{color:C.grey}}>₦7,000,000</span></div>
                    <div className="v-row"><span className="v-lbl">HP Package Value</span><span className="v-val">₦12,500,000</span></div>
                    <div className="v-row"><span className="v-lbl">Insurance & Plate License Reg</span><span className="v-val">Inclusive</span></div>
                    <div className="v-row"><span className="v-lbl">Initial deposit</span><span className="v-val hi" style={{color:"#6366F1"}}>₦800,000</span></div>
                    <div className="v-row"><span className="v-lbl">Deposit spread</span><span className="v-val">3 months</span></div>
                    <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦90,000 / week</span></div>
                    <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">130 weeks</span></div>
                    <div className="v-row"><span className="v-lbl">Total HP payments</span><span className="v-val">₦11,700,000</span></div>
                    <div className="v-row"><span className="v-lbl">Total to own</span><span className="v-val" style={{color:"#6366F1",fontSize:16}}>₦12,500,000</span></div>
                    <div style={{borderTop:"1.5px solid #C7D2FE",margin:"10px 0 6px",paddingTop:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#4338CA",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>🎁 Rider/Driver Referral Discounts</div>
                      <div className="v-row"><span className="v-lbl">Refer a Bike rider</span><span className="v-val" style={{color:"#3730A3"}}>₦50,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Keke rider</span><span className="v-val" style={{color:"#3730A3"}}>₦150,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Minibus driver</span><span className="v-val" style={{color:"#3730A3"}}>₦200,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Full Bus/Cab driver</span><span className="v-val" style={{color:"#3730A3"}}>₦250,000 discount off your HP</span></div>
                      <div style={{background:"#EEF2FF",border:"1.5px solid #C7D2FE",borderRadius:6,padding:"8px 10px",marginTop:6,fontSize:11,color:"#3730A3",lineHeight:1.6}}>
                        Each confirmed referral reduces your outstanding balance — same ₦90,000/week, fewer weeks. No limit on referrals.
                      </div>
                    </div>
                    <button className="btn btn-full" style={{background:"#4338CA",color:C.white,marginTop:12}} onClick={()=>setModal("rider-mini")}>Apply for Minibus (Korope)</button>
                  </div>
                </div>

                {/* 4-Wheel Full */}
                <div className="v-card">
                  <div className="v-head" style={{background:"#4A1A0A"}}>
                    <div className="v-tag">Four Wheels — Full Bus / Cab</div>
                    <div className="v-emoji">🚌</div>
                    <div className="v-name cd">Full Bus / Cab Ride</div>
                    <div className="v-desc">Full-size Hiace bus or cab ride vehicle. Insurance and plate registration included.</div>
                  </div>
                  <div className="v-body">
                    <div className="v-row"><span className="v-lbl">Current Market Value</span><span className="v-val" style={{color:C.grey}}>₦10,000,000</span></div>
                    <div className="v-row"><span className="v-lbl">HP Package Value</span><span className="v-val">₦19,240,000</span></div>
                    <div className="v-row"><span className="v-lbl">Insurance & Plate License Reg</span><span className="v-val">Inclusive</span></div>
                    <div className="v-row"><span className="v-lbl">Initial deposit</span><span className="v-val hi" style={{color:"#DC2626"}}>₦1,000,000</span></div>
                    <div className="v-row"><span className="v-lbl">Deposit spread</span><span className="v-val">3 months</span></div>
                    <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦120,000 / week</span></div>
                    <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">152 weeks</span></div>
                    <div className="v-row"><span className="v-lbl">Total HP payments</span><span className="v-val">₦18,240,000</span></div>
                    <div className="v-row"><span className="v-lbl">Total to own</span><span className="v-val" style={{color:"#DC2626",fontSize:16}}>₦19,240,000</span></div>
                    <div style={{borderTop:"1.5px solid #FECACA",margin:"10px 0 6px",paddingTop:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#DC2626",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>🎁 Rider/Driver Referral Discounts</div>
                      <div className="v-row"><span className="v-lbl">Refer a Bike rider</span><span className="v-val" style={{color:"#991B1B"}}>₦50,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Keke rider</span><span className="v-val" style={{color:"#991B1B"}}>₦150,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Minibus driver</span><span className="v-val" style={{color:"#991B1B"}}>₦200,000 discount off your HP</span></div>
                      <div className="v-row"><span className="v-lbl">Refer a Full Bus/Cab driver</span><span className="v-val" style={{color:"#991B1B"}}>₦250,000 discount off your HP</span></div>
                      <div style={{background:"#FEF2F2",border:"1.5px solid #FECACA",borderRadius:6,padding:"8px 10px",marginTop:6,fontSize:11,color:"#991B1B",lineHeight:1.6}}>
                        Each confirmed referral reduces your outstanding balance — same ₦120,000/week, fewer weeks. No limit on referrals.
                      </div>
                    </div>
                    <button className="btn btn-full" style={{background:"#B91C1C",color:C.white,marginTop:12}} onClick={()=>setModal("rider-full")}>Apply for Full Bus / Cab</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{background:C.white}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.orange}}>The Process</div>
              <h2 className="sec-h2">How It Works — Step by Step</h2>
              <div className="divider" style={{background:C.orange}}/>
              <div className="steps">
                {RIDER_STEPS.map(s=>(
                  <div className="step" key={s.n}>
                    <div className="step-n cd">{s.n}</div>
                    <div className="step-t">{s.t}</div>
                    <div className="step-b">{s.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Referral */}
          <div style={{background:C.offwhite}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.orange}}>Referral Discount</div>
              <h2 className="sec-h2">Refer Someone. Get a Discount on Your HP Balance.</h2>
              <div className="divider" style={{background:C.orange}}/>
              <div className="ref-box">
                <p style={{color:"#AAA",fontSize:14,lineHeight:1.8,marginBottom:16}}>For every person you successfully refer to RideTrust, you receive a discount off your own outstanding HP balance. The more you refer, the less you owe.</p>
                <div className="ref-grid">
                  <div className="ref-item"><div className="ref-item-t">🏍️ Refer a Bike rider</div><div className="ref-item-b">Get <strong>₦50,000</strong> taken off your own outstanding HP balance as soon as the person you referred pays their first deposit and becomes a committed subscriber. Terms & Conditions apply.</div></div>
                  <div className="ref-item"><div className="ref-item-t">🛺 Refer a Keke rider</div><div className="ref-item-b">Get <strong>₦150,000</strong> taken off your own outstanding HP balance as soon as the person you referred pays their first deposit and becomes a committed subscriber. Terms & Conditions apply.</div></div>
                  <div className="ref-item"><div className="ref-item-t">🚐 Refer a Minibus driver</div><div className="ref-item-b">Get <strong>₦200,000</strong> taken off your own outstanding HP balance as soon as the person you referred pays their first deposit and becomes a committed subscriber. Terms & Conditions apply.</div></div>
                  <div className="ref-item"><div className="ref-item-t">🚌 Refer a Full Bus / Cab driver</div><div className="ref-item-b">Get <strong>₦250,000</strong> taken off your own outstanding HP balance as soon as the person you referred pays their first deposit and becomes a committed subscriber. Terms & Conditions apply.</div></div>
                  <div className="ref-item"><div className="ref-item-t">🔄 No limit on referrals</div><div className="ref-item-b">Refer as many people as you want. Each successful referral reduces what you still owe — higher vehicle types earn you bigger discounts.</div></div>
                  <div className="ref-item"><div className="ref-item-t">✅ When it applies</div><div className="ref-item-b">Discount applies as soon as the person you referred pays their first deposit and becomes a committed subscriber. If they withdraw, the discount is reversed. Each person you refer automatically becomes one of your guarantors. And you likewise become their guarantor. Terms & Conditions apply.</div></div>
                </div>
              </div>
            </div>
          </div>

          <ContactSection accentColor={C.orange}/>

          {/* CTA */}
          <div className="cta-strip" style={{background:C.orange}}>
            <h2 className="cta-h cd">Ready to Own Your Vehicle?</h2>
            <p className="cta-s">No bank. No wahala. Brand new. Yours at the end.</p>
            <div className="cta-btns">
              <button className="btn btn-white" onClick={()=>setModal("rider-bike")}>🏍️ Apply for Bike</button>
              <button className="btn btn-black" onClick={()=>setModal("rider-keke")}>🛺 Apply for Keke</button>
            </div>
          </div>
          <Footer/>
        </>
      )}

      {/* ══ AGENT PAGE (/agent) ═══════════════════════════════ */}
      {page==="agent"&&(
        <>
          <nav>
            <div className="logo cd">RIDE<span>TRUST</span> HP</div>
            <div className="nav-tag">MANAGING AGENT</div>
          </nav>

          {/* Hero */}
          <div style={{background:C.blue,padding:"72px 24px 60px",textAlign:"center",color:C.white}}>
            <div className="hero-eyebrow" style={{background:C.white,color:C.blue}}>RoyalTech Partnership & Investment Limited</div>
            <h1 className="hero-h1 cd">Local Managing<br/><span style={{color:"#93C5FD"}}>Agent Requirement</span></h1>
            <div className="hero-sub" style={{color:"#BFDBFE"}}>Keke/Commercial Tricycles & Dispatch Bikes</div>
            <p style={{fontSize:15,color:"#BFDBFE",maxWidth:520,margin:"0 auto 36px",lineHeight:1.8}}>Manage riders in your area. Earn weekly commissions from every vehicle under your management — plus referral bonuses for every new rider you bring in.</p>
            <button className="btn" style={{background:C.white,color:C.blue}} onClick={()=>setModal("lma")}>Apply as Managing Agent</button>
          </div>

          {/* Earnings */}
          <div style={{background:C.offwhite}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.blue}}>What You Earn</div>
              <h2 className="sec-h2">Your Commission & Bonuses</h2>
              <div className="divider" style={{background:C.blue}}/>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>

                {/* Card 1 — Weekly commission from remittances */}
                <div className="lma-earn">
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,marginBottom:4,color:C.white}}>💰 Weekly Commission</div>
                  <div style={{fontSize:11,color:"#94A3B8",marginBottom:14,lineHeight:1.5}}>Earned as a percentage of whatever the rider remits each week. Rate depends on how complete the remittance is.</div>
                  <div className="earn-row"><span className="earn-lbl">✅ Full remittance (100%)</span><span className="earn-val" style={{color:"#4ADE80"}}>10% of amount paid</span></div>
                  <div className="earn-row"><span className="earn-lbl">⚠️ Shortfall (50%–99%)</span><span className="earn-val" style={{color:"#FCD34D"}}>5% of amount paid</span></div>
                  <div className="earn-row"><span className="earn-lbl">❌ Below 50% of target</span><span className="earn-val" style={{color:"#F87171"}}>0% — no commission</span></div>
                  <div style={{marginTop:10,background:"#0F2027",borderRadius:6,padding:"10px 12px",fontSize:11,color:"#94A3B8",lineHeight:1.8}}>
                    <strong style={{color:C.white}}>Example — Keke rider (₦90,000/week target):</strong><br/>
                    Pays ₦90,000 → LMA earns <strong style={{color:"#4ADE80"}}>₦9,000</strong><br/>
                    Pays ₦50,000 → LMA earns <strong style={{color:"#FCD34D"}}>₦2,500</strong><br/>
                    Pays ₦40,000 → LMA earns <strong style={{color:"#F87171"}}>₦0</strong>
                  </div>
                  <div style={{marginTop:12,fontSize:11,color:"#64748B",lineHeight:1.6,borderTop:"1px solid #334155",paddingTop:10}}>
                    ✅ Aggregated and paid <strong style={{color:"#94A3B8"}}>monthly</strong> by RoyalTech. No advances.
                  </div>
                </div>

                {/* Card 2 — Rider/Driver referral bonus */}
                <div className="lma-earn">
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,marginBottom:4,color:C.white}}>🎁 Rider/Driver Referral Bonus</div>
                  <div style={{fontSize:11,color:"#94A3B8",marginBottom:14,lineHeight:1.5}}>Earned for each rider/driver you recruit who successfully takes delivery of their vehicle.</div>
                  <div className="earn-row"><span className="earn-lbl">🏍️ Refer a bike rider</span><span className="earn-val">₦50,000</span></div>
                  <div className="earn-row"><span className="earn-lbl">🛺 Refer a keke rider</span><span className="earn-val">₦150,000</span></div>
                  <div className="earn-row"><span className="earn-lbl">🚐 Refer a minibus driver</span><span className="earn-val">₦200,000</span></div>
                  <div className="earn-row"><span className="earn-lbl">🚌 Refer a full bus / cab driver</span><span className="earn-val">₦250,000</span></div>
                  <div style={{marginTop:12,fontSize:11,color:"#64748B",lineHeight:1.6,borderTop:"1px solid #334155",paddingTop:10}}>
                    ✅ Redeemable: After the referred rider takes delivery of their vehicle and makes their <strong style={{color:"#94A3B8"}}>first weekly remittance</strong>.
                  </div>
                </div>

                {/* Card 3 — LMA-to-LMA referral bonus */}
                <div className="lma-earn">
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,marginBottom:4,color:C.white}}>🤝 LMA Recruitment Bonus</div>
                  <div style={{fontSize:11,color:"#94A3B8",marginBottom:14,lineHeight:1.5}}>Earned when you successfully recruit another LMA onto RideTrust and they activate their jurisdiction.</div>
                  <div className="earn-row"><span className="earn-lbl">Per LMA recruited</span><span className="earn-val">₦50,000</span></div>
                  <div style={{marginTop:6,fontSize:11,color:"#94A3B8",lineHeight:1.6}}>No cap — earn for every LMA you bring on board who qualifies.</div>
                  <div style={{marginTop:12,fontSize:11,color:"#64748B",lineHeight:1.6,borderTop:"1px solid #334155",paddingTop:10}}>
                    ✅ Redeemable: After the recruited LMA has <strong style={{color:"#94A3B8"}}>3 riders delivered</strong> and each has made at least <strong style={{color:"#94A3B8"}}>4 weekly remittances</strong> — no ghost LMAs.
                  </div>
                </div>

                {/* Card 4 — Quarterly zero-default bonus */}
                <div className="lma-earn">
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:18,marginBottom:4,color:C.white}}>⭐ Zero-Default Bonus</div>
                  <div style={{fontSize:11,color:"#94A3B8",marginBottom:14,lineHeight:1.5}}>Quarterly reward for LMAs with zero missed or partial remittances across their entire active rider portfolio.</div>
                  <div className="earn-row"><span className="earn-lbl">Rate</span><span className="earn-val">2% of quarterly remittances</span></div>
                  <div style={{marginTop:10,background:"#0F2027",borderRadius:6,padding:"10px 12px",fontSize:11,color:"#94A3B8",lineHeight:1.8}}>
                    <strong style={{color:C.white}}>Example — 15-rider portfolio:</strong><br/>
                    10 bikes × ₦40,000 × 13 weeks = ₦5,200,000<br/>
                    5 kekes × ₦90,000 × 13 weeks = ₦5,850,000<br/>
                    Total remittances = ₦11,050,000<br/>
                    <strong style={{color:C.orange}}>2% bonus = ₦221,000 for the quarter</strong>
                  </div>
                  <div style={{marginTop:12,fontSize:11,color:"#64748B",lineHeight:1.6,borderTop:"1px solid #334155",paddingTop:10}}>
                    ✅ Redeemable: End of each quarter — zero shortfalls, zero defaults, across all active riders for the full 13-week period.
                  </div>
                </div>

              </div>

              {/* Combined T&Cs */}
              <div style={{marginTop:20,background:"#1A1A2E",borderRadius:10,padding:"16px 20px",fontSize:12,color:"#94A3B8",lineHeight:1.8}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:16,color:C.white,marginBottom:12}}>📋 Bonus & Commission — Terms & Conditions</div>

                <div style={{color:C.orange,fontWeight:700,marginBottom:4,fontSize:12}}>A. Weekly Commission (Remittance)</div>
                1. Commission is calculated as a percentage of the amount actually remitted by the rider each week, on a three-tier scale:<br/>
                &nbsp;&nbsp;&nbsp;• <strong style={{color:C.white}}>Full remittance (100% of weekly target)</strong> → LMA earns <strong style={{color:"#4ADE80"}}>10%</strong> of the amount paid.<br/>
                &nbsp;&nbsp;&nbsp;• <strong style={{color:C.white}}>Shortfall (50% to 99% of weekly target)</strong> → LMA earns <strong style={{color:"#FCD34D"}}>5%</strong> of the amount paid.<br/>
                &nbsp;&nbsp;&nbsp;• <strong style={{color:C.white}}>Below 50% of weekly target</strong> → LMA earns <strong style={{color:"#F87171"}}>0%</strong> — no commission for that week.<br/>
                2. The percentage is applied to what the rider actually paid, not the weekly target amount.<br/>
                3. Commission is confirmed only after RoyalTech verifies and accepts the remittance.<br/>
                4. Commission is aggregated and paid <strong style={{color:C.white}}>monthly</strong>. No advances.<br/><br/>

                <div style={{color:C.orange,fontWeight:700,marginBottom:4,fontSize:12}}>B. Rider / Driver Referral Bonus</div>
                4. Bonus is paid <strong style={{color:C.white}}>only after</strong> the referred applicant takes delivery of their vehicle and completes their first weekly remittance.<br/>
                5. If the referred applicant withdraws before delivery, the bonus is forfeited and reversed if already advanced.<br/>
                6. The referring LMA automatically becomes a <strong style={{color:C.white}}>co-guarantor</strong> for the referred rider for the first 12 weeks of their HP term.<br/>
                7. RoyalTech reserves the right to withhold or claw back the bonus if the referred rider defaults within the first 12 weeks.<br/>
                8. The referred applicant must not already be registered under any other LMA on the platform at time of referral.<br/><br/>

                <div style={{color:C.orange,fontWeight:700,marginBottom:4,fontSize:12}}>C. LMA Recruitment Bonus</div>
                9. Bonus is paid only after the recruited LMA has been formally onboarded, signed the RoyalTech/Agent Agreement, and has <strong style={{color:C.white}}>at least 3 riders/drivers who have taken delivery</strong> in their jurisdiction, each having completed a minimum of <strong style={{color:C.white}}>4 weekly remittance payments</strong>.<br/>
                10. The 3 qualifying riders must be in the recruited LMA's own jurisdiction — riders already registered under another LMA do not count.<br/>
                11. If the recruited LMA exits or is deactivated before the threshold is reached, no bonus is paid.<br/>
                12. All referrals (rider and LMA) must be registered through the official LMA portal. Verbal or informal referrals are not eligible.<br/><br/>

                <div style={{color:C.orange,fontWeight:700,marginBottom:4,fontSize:12}}>D. Quarterly Zero-Default Bonus</div>
                13. Bonus is calculated at <strong style={{color:C.white}}>2% of total confirmed remittances</strong> received by RoyalTech from the LMA's active rider portfolio over the 13-week quarter.<br/>
                14. A single missed, partial, or reversed remittance from any rider in the LMA's portfolio in that quarter disqualifies the LMA from the zero-default bonus for that quarter.<br/>
                15. The bonus is assessed and paid within 14 days of the quarter end. No partial credits are given — the standard is zero defaults, no exceptions.<br/>
                16. An LMA on probation or under investigation for the quarter is automatically excluded from the zero-default bonus for that period.
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div style={{background:C.white}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.blue}}>Qualification</div>
              <h2 className="sec-h2">What You Need to Qualify</h2>
              <div className="divider" style={{background:C.blue}}/>
              <ul className="req-list">
                <li>Valid government-issued photo ID — National ID, Voter's Card, Driver's Licence, Passport or NIN slip</li>
                <li>Home or work address with utility bill — your name must match on both the ID and the utility bill</li>
                <li>Parking yard with enough space for at least 10 keke tricycles — photo evidence required</li>
                <li>Self-rate your tech skills from 1 (none) to 5 (very good)</li>
                <li>Self-rate your transport business management experience from 1 (none) to 5 (very experienced)</li>
                <li>2 guarantors</li>
                <li>Basic training — product knowledge and operational SOPs from RoyalTech</li>
                <li>Signed RoyalTech/Agent agreement</li>
              </ul>
              <button className="btn btn-full" style={{background:C.blue,color:C.white,marginTop:24}} onClick={()=>setModal("lma")}>Apply Now — It's Free</button>
            </div>
          </div>

          {/* Rider info for agents */}
          <div style={{background:"#EFF6FF",borderTop:"1.5px solid #BFDBFE"}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.blue}}>The Product You Will Manage</div>
              <h2 className="sec-h2">Understanding the Hire Purchase Deals</h2>
              <div className="divider" style={{background:C.blue}}/>
              <p className="sec-body">As a Managing Agent, you need to understand what your riders are on. Here are the exact hire purchase terms for both vehicle types.</p>
              <div className="v-grid" style={{marginTop:24}}>
                <div style={{background:C.white,borderRadius:8,padding:20,border:"1.5px solid #BFDBFE"}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>🏍️ Dispatch Bike</div>
                  <div className="v-row"><span className="v-lbl">Rider deposit</span><span className="v-val">₦200,000</span></div>
                  <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦40,000 / week</span></div>
                  <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">45 weeks</span></div>
                </div>
                <div style={{background:C.white,borderRadius:8,padding:20,border:"1.5px solid #BFDBFE"}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>🛺 Keke Tricycle</div>
                  <div className="v-row"><span className="v-lbl">Rider deposit</span><span className="v-val">₦600,000</span></div>
                  <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦90,000 / week</span></div>
                  <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">78 weeks</span></div>
                </div>
                <div style={{background:C.white,borderRadius:8,padding:20,border:"1.5px solid #BFDBFE"}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>🚗 Mini (Korope)</div>
                  <div className="v-row"><span className="v-lbl">Rider deposit</span><span className="v-val">₦800,000</span></div>
                  <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦90,000 / week</span></div>
                  <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">130 weeks</span></div>
                </div>
                <div style={{background:C.white,borderRadius:8,padding:20,border:"1.5px solid #BFDBFE"}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>🚌 Full Bus / Cab</div>
                  <div className="v-row"><span className="v-lbl">Rider deposit</span><span className="v-val">₦1,000,000</span></div>
                  <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦120,000 / week</span></div>
                  <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">152 weeks</span></div>
                </div>
              </div>
              <div style={{marginTop:16,fontSize:13,color:C.grey,lineHeight:1.8}}>
                Riders make weekly remittances directly to RoyalTech and submit proof of payment to you for financial update. You track compliance and report to RoyalTech.
              </div>
              <div style={{marginTop:16}}>
                <button className="btn btn-outline" style={{color:C.blue,borderColor:C.blue,fontSize:13}} onClick={()=>navigate("ride")}>View Full Rider Information →</button>
              </div>
            </div>
          </div>

          <ContactSection accentColor={C.blue}/>

          <div className="cta-strip" style={{background:C.blue}}>
            <h2 className="cta-h cd">Ready to Become a Managing Agent?</h2>
            <p className="cta-s">Free application. Weekly commissions. Referral bonuses. No limits.</p>
            <div className="cta-btns">
              <button className="btn btn-white" style={{color:C.blue}} onClick={()=>setModal("lma")}>Apply Now — Free</button>
            </div>
          </div>
          <Footer/>
        </>
      )}

      {/* ══ INVESTOR PAGE (/invest) ═══════════════════════════ */}
      {page==="invest"&&(
        <>
          <nav>
            <div className="logo cd">RIDE<span>TRUST</span> HP</div>
            <div className="nav-tag">INVESTORS</div>
          </nav>

          {/* Hero */}
          <div style={{background:"#0F2027",padding:"72px 24px 60px",textAlign:"center",color:C.white,backgroundImage:"linear-gradient(135deg,#0F2027,#203A43,#2C5364)"}}>
            <div className="hero-eyebrow" style={{background:C.orange,color:C.white}}>RoyalTech Partnership & Investment Limited</div>
            <h1 className="hero-h1 cd">Investors <span style={{color:C.orange}}>Haven</span></h1>
            <div className="hero-sub" style={{color:"#CCC"}}>Stress Free Income</div>
            <p style={{fontSize:15,color:"#AAA",maxWidth:540,margin:"0 auto 36px",lineHeight:1.8}}>Put in your capital. RoyalTech handles everything — the vehicle, the rider, the weekly collections. You receive your returns monthly. Zero operations on your end.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn btn-orange" onClick={()=>setModal("invest-bike")}>🏍️ Two Wheels</button>
              <button className="btn" style={{background:"#1A7A3C",color:C.white}} onClick={()=>setModal("invest-keke")}>🛺 Three Wheels</button>
              <button className="btn" style={{background:"#4338CA",color:C.white}} onClick={()=>setModal("invest-mini")}>🚗 Mini (Korope)</button>
              <button className="btn" style={{background:"#B91C1C",color:C.white}} onClick={()=>setModal("invest-full")}>🚌 Full Bus / Cab</button>
            </div>
          </div>

          {/* Investment packages */}
          <div style={{background:C.offwhite}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.orange}}>Investment Packages</div>
              <h2 className="sec-h2">Choose Your Package</h2>
              <div className="divider" style={{background:C.orange}}/>
              <p className="sec-body">All packages are fully managed by RoyalTech. You invest once. Returns come monthly to your account.</p>
              <div className="invest-grid">
                {/* Bike */}
                <div className="inv-card">
                  <div className="inv-head" style={{background:C.blue}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.8,marginBottom:8}}>Two Wheels Package</div>
                    <div style={{fontSize:40,marginBottom:8}}>🏍️</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,textTransform:"uppercase"}}>Dispatch Bike</div>
                  </div>
                  <div className="inv-body">
                    <div className="inv-row"><span className="inv-lbl">Your investment</span><span className="inv-val">₦1,200,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Investment term</span><span className="inv-val">45 weeks</span></div>
                    <div className="inv-row"><span className="inv-lbl">Weekly investor accrual</span><span className="inv-val">₦32,000 / week</span></div>
                    <div className="inv-row"><span className="inv-lbl">Total return</span><span className="inv-profit">₦1,440,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Your net profit</span><span className="inv-profit">₦240,000</span></div>
                    <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#1E40AF",lineHeight:1.7}}>
                      ₦32,000 × 45 weeks pooled monthly to your account. Zero operations on your end.
                    </div>
                    <button className="btn btn-full" style={{background:C.blue,color:C.white,marginTop:14}} onClick={()=>setModal("invest-bike")}>Invest — Two Wheels</button>
                  </div>
                </div>

                {/* Keke */}
                <div className="inv-card">
                  <div className="inv-head" style={{background:C.green}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.8,marginBottom:8}}>Three Wheels Package</div>
                    <div style={{fontSize:40,marginBottom:8}}>🛺</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,textTransform:"uppercase"}}>Keke Tricycle</div>
                  </div>
                  <div className="inv-body">
                    <div className="inv-row"><span className="inv-lbl">Your investment</span><span className="inv-val">₦4,000,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Investment term</span><span className="inv-val">78 weeks</span></div>
                    <div className="inv-row"><span className="inv-lbl">Weekly investor accrual</span><span className="inv-val">₦65,000 / week</span></div>
                    <div className="inv-row"><span className="inv-lbl">Total return</span><span className="inv-profit" style={{color:C.green}}>₦5,070,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Your net profit</span><span className="inv-profit" style={{color:C.green}}>₦1,070,000</span></div>
                    <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#166534",lineHeight:1.7}}>
                      ₦65,000 × 78 weeks pooled monthly to your account. Zero operations on your end.
                    </div>
                    <button className="btn btn-full" style={{background:C.green,color:C.white,marginTop:14}} onClick={()=>setModal("invest-keke")}>Invest — Three Wheels</button>
                  </div>
                </div>

                {/* 4-Wheel Mini */}
                <div className="inv-card">
                  <div className="inv-head" style={{background:"#4338CA"}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.8,marginBottom:8}}>Four Wheels — Mini Package</div>
                    <div style={{fontSize:40,marginBottom:8}}>🚐</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,textTransform:"uppercase"}}>Korope Minibus</div>
                  </div>
                  <div className="inv-body">
                    <div className="inv-row"><span className="inv-lbl">Your investment</span><span className="inv-val">₦7,000,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Investment term</span><span className="inv-val">130 weeks</span></div>
                    <div className="inv-row"><span className="inv-lbl">Weekly investor accrual</span><span className="inv-val">₦65,000 / week</span></div>
                    <div className="inv-row"><span className="inv-lbl">Total return</span><span className="inv-profit" style={{color:"#6366F1"}}>₦8,450,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Your net profit</span><span className="inv-profit" style={{color:"#6366F1"}}>₦1,450,000</span></div>
                    <div style={{background:"#EEF2FF",border:"1.5px solid #C7D2FE",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#3730A3",lineHeight:1.7}}>
                      ₦65,000 × 130 weeks pooled monthly to your account. Managed end-to-end by RoyalTech.
                    </div>
                    <button className="btn btn-full" style={{background:"#4338CA",color:C.white,marginTop:14}} onClick={()=>setModal("invest-mini")}>Invest — Four Wheels Mini</button>
                  </div>
                </div>

                {/* 4-Wheel Full */}
                <div className="inv-card">
                  <div className="inv-head" style={{background:"#991B1B"}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.8,marginBottom:8}}>Four Wheels — Full Option</div>
                    <div style={{fontSize:40,marginBottom:8}}>🚌</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,textTransform:"uppercase"}}>Hiace Bus / Cab Ride</div>
                  </div>
                  <div className="inv-body">
                    <div className="inv-row"><span className="inv-lbl">Your investment</span><span className="inv-val">₦10,500,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Investment term</span><span className="inv-val">152 weeks</span></div>
                    <div className="inv-row"><span className="inv-lbl">Weekly investor accrual</span><span className="inv-val">₦90,000 / week</span></div>
                    <div className="inv-row"><span className="inv-lbl">Total return</span><span className="inv-profit" style={{color:"#DC2626"}}>₦13,680,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Your net profit</span><span className="inv-profit" style={{color:"#DC2626"}}>₦3,180,000</span></div>
                    <div style={{background:"#FEF2F2",border:"1.5px solid #FECACA",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#991B1B",lineHeight:1.7}}>
                      ₦90,000 × 152 weeks pooled monthly to your account. Managed end-to-end by RoyalTech.
                    </div>
                    <button className="btn btn-full" style={{background:"#B91C1C",color:C.white,marginTop:14}} onClick={()=>setModal("invest-full")}>Invest — Full Bus / Cab</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it works for investors */}
          <div style={{background:C.white}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.orange}}>How It Works</div>
              <h2 className="sec-h2">Zero Operations. Pure Returns.</h2>
              <div className="divider" style={{background:C.orange}}/>
              <div className="steps">
                {[
                  {n:"01",t:"You Invest",b:"Transfer your capital to RoyalTech. One time."},
                  {n:"02",t:"We Handle Everything",b:"RoyalTech sources the vehicle, the rider, and manages all operations."},
                  {n:"03",t:"Rider Pays Weekly",b:"The rider makes weekly remittances directly to RoyalTech."},
                  {n:"04",t:"You Receive Monthly",b:"RoyalTech pays your monthly returns directly to your bank account."},
                  {n:"05",t:"Investment Complete",b:"At the end of the term, your full return has been paid. Clean exit."},
                ].map(s=>(
                  <div className="step" key={s.n} style={{borderLeftColor:C.orange}}>
                    <div className="step-n cd">{s.n}</div>
                    <div className="step-t">{s.t}</div>
                    <div className="step-b">{s.b}</div>
                  </div>
                ))}
              </div>

              {/* Links to other pages */}
              <div style={{marginTop:32,padding:20,background:C.offwhite,borderRadius:8,border:"1.5px solid "+C.lightgr}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:C.black}}>Want to understand the full ecosystem?</div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <button className="btn" style={{background:C.blue,color:C.white,padding:"10px 18px",fontSize:13}} onClick={()=>navigate("agent")}>🏢 How Agents Work →</button>
                  <button className="btn" style={{background:C.black,color:C.white,padding:"10px 18px",fontSize:13}} onClick={()=>navigate("ride")}>🏍️ How Riders Work →</button>
                </div>
              </div>
            </div>
          </div>

          <ContactSection accentColor={C.orange}/>

          <div className="cta-strip" style={{backgroundImage:"linear-gradient(135deg,#0F2027,#203A43,#2C5364)"}}>
            <h2 className="cta-h cd">Start Earning Without Stress</h2>
            <p className="cta-s">One investment. Monthly returns. Full RoyalTech management.</p>
            <div className="cta-btns">
              <button className="btn" style={{background:C.blue,color:C.white}} onClick={()=>setModal("invest-bike")}>🏍️ Two Wheels</button>
              <button className="btn" style={{background:C.green,color:C.white}} onClick={()=>setModal("invest-keke")}>🛺 Three Wheels</button>
              <button className="btn" style={{background:"#4338CA",color:C.white}} onClick={()=>setModal("invest-mini")}>🚗 Mini</button>
              <button className="btn" style={{background:"#991B1B",color:C.white}} onClick={()=>setModal("invest-full")}>🚌 Full Bus</button>
            </div>
          </div>
          <Footer/>
        </>
      )}

      {/* ══ MODALS ════════════════════════════════════════════ */}
      {modal&&(
        <div className="overlay" onClick={e=>{if(e.target.classList.contains("overlay"))setModal(null)}}>
          <div className="modal">
            <button className="modal-close" onClick={()=>setModal(null)}>×</button>

            {/* Rider — Bike */}
            {modal==="rider-bike"&&(
              <>
                <div className="modal-h cd">🏍️ Bike Application</div>
                <div className="modal-s">Dispatch Bike — ₦200,000 deposit · ₦40,000/week × 45 weeks<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>Home Address</label><input placeholder="Street, Area, State" onChange={e=>setF("address",e.target.value)}/></div>
                <div className="field"><label>Riding / Driving Experience</label>
                  <select onChange={e=>setF("experience",e.target.value)}>
                    <option value="">Select</option>
                    <option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>More than 5 years</option>
                  </select>
                </div>
                <div className="field"><label>Referred by someone? (Optional)</label><input placeholder="Referrer's name or phone" onChange={e=>setF("referrer",e.target.value)}/></div>
                <div className="field">
                  <label>Guarantor 1 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g1",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Guarantor 2 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g2",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Guarantor 3 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g3",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#93C5FD",color:C.blue,background:"#EFF6FF"}} onClick={()=>document.getElementById("snap-id-bike").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-bike" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                  <div className="field-note">National ID, Voter's Card, Driver's Licence, Passport or NIN slip.</div>
                </div>
                <button className="submit-btn" style={{background:C.orange}} onClick={()=>submit("rider-bike")}>Submit Bike Application</button>
              </>
            )}

            {/* Rider — Keke */}
            {modal==="rider-keke"&&(
              <>
                <div className="modal-h cd">🛺 Keke Application</div>
                <div className="modal-s">Keke Tricycle — ₦600,000 deposit · ₦90,000/week × 78 weeks<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>Home Address</label><input placeholder="Street, Area, State" onChange={e=>setF("address",e.target.value)}/></div>
                <div className="field"><label>Keke / Driving Experience</label>
                  <select onChange={e=>setF("experience",e.target.value)}>
                    <option value="">Select</option>
                    <option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>More than 5 years</option>
                  </select>
                </div>
                <div className="field"><label>Referred by someone? (Optional)</label><input placeholder="Referrer's name or phone" onChange={e=>setF("referrer",e.target.value)}/></div>
                <div className="field">
                  <label>Guarantor 1 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g1",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Guarantor 2 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g2",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Guarantor 3 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g3",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#93C5FD",color:C.blue,background:"#EFF6FF"}} onClick={()=>document.getElementById("snap-id-keke").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-keke" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                  <div className="field-note">National ID, Voter's Card, Driver's Licence, Passport or NIN slip.</div>
                </div>
                <button className="submit-btn" style={{background:C.green}} onClick={()=>submit("rider-keke")}>Submit Keke Application</button>
              </>
            )}

            {/* Rider — Mini */}
            {modal==="rider-mini"&&(
              <>
                <div className="modal-h cd">🚗 Mini Korope Application</div>
                <div className="modal-s">Clean Tokunbo Korope — ₦800,000 deposit · ₦90,000/week × 130 weeks<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>Home Address</label><input placeholder="Street, Area, State" onChange={e=>setF("address",e.target.value)}/></div>
                <div className="field"><label>Driving Experience</label>
                  <select onChange={e=>setF("experience",e.target.value)}>
                    <option value="">Select</option>
                    <option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>More than 5 years</option>
                  </select>
                </div>
                <div className="field"><label>Referred by someone? (Optional)</label><input placeholder="Referrer's name or phone" onChange={e=>setF("referrer",e.target.value)}/></div>
                <div className="field"><label>Guarantor 1 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g1",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field"><label>Guarantor 2 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g2",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field"><label>Guarantor 3 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g3",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#A5B4FC",color:"#4338CA",background:"#EEF2FF"}} onClick={()=>document.getElementById("snap-id-mini").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-mini" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                  <div className="field-note">National ID, Voter's Card, Driver's Licence, Passport or NIN slip.</div>
                </div>
                <button className="submit-btn" style={{background:"#4338CA"}} onClick={()=>submit("rider-mini")}>Submit Mini Application</button>
              </>
            )}

            {/* Rider — Full */}
            {modal==="rider-full"&&(
              <>
                <div className="modal-h cd">🚌 Full Bus / Cab Application</div>
                <div className="modal-s">Full Hiace Bus or Cab Ride — ₦1,000,000 deposit · ₦120,000/week × 152 weeks<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>Home Address</label><input placeholder="Street, Area, State" onChange={e=>setF("address",e.target.value)}/></div>
                <div className="field"><label>Driving Experience</label>
                  <select onChange={e=>setF("experience",e.target.value)}>
                    <option value="">Select</option>
                    <option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>More than 5 years</option>
                  </select>
                </div>
                <div className="field"><label>Referred by someone? (Optional)</label><input placeholder="Referrer's name or phone" onChange={e=>setF("referrer",e.target.value)}/></div>
                <div className="field"><label>Guarantor 1 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g1",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field"><label>Guarantor 2 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g2",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field"><label>Guarantor 3 — Name & Phone *</label>
                  <input placeholder="Full name and phone number" onChange={e=>setF("g3",e.target.value)}/>
                  <div className="field-note">Must be a committed applicant or existing RideTrust rider.</div>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#FCA5A5",color:"#991B1B",background:"#FFF1F2"}} onClick={()=>document.getElementById("snap-id-full").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-full" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                  <div className="field-note">National ID, Voter's Card, Driver's Licence, Passport or NIN slip.</div>
                </div>
                <button className="submit-btn" style={{background:"#991B1B"}} onClick={()=>submit("rider-full")}>Submit Full Bus / Cab Application</button>
              </>
            )}

            {/* LMA */}
            {modal==="lma"&&(
              <>
                <div className="modal-h cd">🏢 Agent Application</div>
                <div className="modal-s">Free application. No fees. RoyalTech will contact you within 48 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>Home / Work Address *</label><input placeholder="Street, Area, State" onChange={e=>setF("address",e.target.value)}/></div>
                <div className="field">
                  <label>Utility Bill Photo * <span style={{color:C.grey,fontWeight:400,fontSize:11}}>(name must match ID)</span></label>
                  <button className="snap-btn" style={{borderColor:"#FCD34D",color:C.orange,background:"#FFF7ED"}} onClick={()=>document.getElementById("snap-util").click()}>
                    <span>📄</span><span>{form.utilityBill?"✅ Captured — tap to retake":"Tap to snap utility bill"}</span>
                  </button>
                  <input id="snap-util" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("utilityBill",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field">
                  <label>Parking Yard Photo * <span style={{color:C.grey,fontWeight:400,fontSize:11}}>(must fit at least 10 keke)</span></label>
                  <button className="snap-btn" style={{borderColor:"#86EFAC",color:C.green,background:"#F0FFF4"}} onClick={()=>document.getElementById("snap-park").click()}>
                    <span>🅿️</span><span>{form.parkingPhoto?"✅ Captured — tap to retake":"Tap to snap parking yard"}</span>
                  </button>
                  <input id="snap-park" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("parkingPhoto",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#93C5FD",color:C.blue,background:"#EFF6FF"}} onClick={()=>document.getElementById("snap-id-lma").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-lma" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field"><label>Tech Skills (1 = None, 5 = Very Good)</label>
                  <select onChange={e=>setF("techSkills",e.target.value)}>
                    <option value="">Select</option>{[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="field"><label>Transport Business Experience (1 = None, 5 = Very Experienced)</label>
                  <select onChange={e=>setF("bizExp",e.target.value)}>
                    <option value="">Select</option>{[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}
                  </select>
                </div>
                <button className="submit-btn" style={{background:C.blue}} onClick={()=>submit("lma")}>Submit Agent Application</button>
              </>
            )}

            {/* Investor — Bike */}
            {modal==="invest-bike"&&(
              <>
                <div className="modal-h cd">🏍️ Two Wheels Investment</div>
                <div className="modal-s">Invest ₦1,200,000 · Receive ₦1,440,000 over 45 weeks · Net profit ₦240,000<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>How many units?</label>
                  <select onChange={e=>setF("units",e.target.value)}>
                    <option value="">Select number of units</option>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n} unit{n>1?"s":""} — ₦{(n*1260000).toLocaleString()}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#93C5FD",color:C.blue,background:"#EFF6FF"}} onClick={()=>document.getElementById("snap-id-ibike").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-ibike" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field"><label>Questions or notes? (Optional)</label><textarea placeholder="Anything you want RoyalTech to know" onChange={e=>setF("notes",e.target.value)}/></div>
                <button className="submit-btn" style={{background:C.blue}} onClick={()=>submit("invest-bike")}>Submit Investment Enquiry</button>
              </>
            )}

            {/* Investor — Keke */}
            {modal==="invest-keke"&&(
              <>
                <div className="modal-h cd">🛺 Three Wheels Investment</div>
                <div className="modal-s">Invest ₦4,000,000 · Receive ₦5,070,000 over 78 weeks · Net profit ₦1,070,000<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>How many units?</label>
                  <select onChange={e=>setF("units",e.target.value)}>
                    <option value="">Select number of units</option>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n} unit{n>1?"s":""} — ₦{(n*4200000).toLocaleString()}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#86EFAC",color:C.green,background:"#F0FFF4"}} onClick={()=>document.getElementById("snap-id-ikeke").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-ikeke" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field"><label>Questions or notes? (Optional)</label><textarea placeholder="Anything you want RoyalTech to know" onChange={e=>setF("notes",e.target.value)}/></div>
                <button className="submit-btn" style={{background:C.green}} onClick={()=>submit("invest-keke")}>Submit Investment Enquiry</button>
              </>
            )}

            {/* Investor — Mini */}
            {modal==="invest-mini"&&(
              <>
                <div className="modal-h cd">🚗 Four Wheels Mini Investment</div>
                <div className="modal-s">Invest ₦7,000,000 · Receive ₦8,450,000 over 130 weeks · Net profit ₦1,450,000<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>How many units?</label>
                  <select onChange={e=>setF("units",e.target.value)}>
                    <option value="">Select number of units</option>{[1,2,3,4,5].map(n=><option key={n}>{n} unit{n>1?"s":""} — ₦{(n*6924000).toLocaleString()}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#A5B4FC",color:"#4338CA",background:"#EEF2FF"}} onClick={()=>document.getElementById("snap-id-imini").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-imini" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field"><label>Questions or notes? (Optional)</label><textarea placeholder="Anything you want RoyalTech to know" onChange={e=>setF("notes",e.target.value)}/></div>
                <button className="submit-btn" style={{background:"#4338CA"}} onClick={()=>submit("invest-mini")}>Submit Investment Enquiry</button>
              </>
            )}

            {/* Investor — Full */}
            {modal==="invest-full"&&(
              <>
                <div className="modal-h cd">🚌 Four Wheels Full Investment</div>
                <div className="modal-s">Invest ₦10,500,000 · Receive ₦13,680,000 over 152 weeks · Net profit ₦3,180,000<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>How many units?</label>
                  <select onChange={e=>setF("units",e.target.value)}>
                    <option value="">Select number of units</option>{[1,2,3,4,5].map(n=><option key={n}>{n} unit{n>1?"s":""} — ₦{(n*8920000).toLocaleString()}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Valid Photo ID *</label>
                  <button className="snap-btn" style={{borderColor:"#FCA5A5",color:"#991B1B",background:"#FFF1F2"}} onClick={()=>document.getElementById("snap-id-ifull").click()}>
                    <span>📷</span><span>{form.photoId?"✅ ID captured — tap to retake":"Tap to snap your ID"}</span>
                  </button>
                  <input id="snap-id-ifull" type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photoId",ev.target.result);r.readAsDataURL(f);}}/>
                </div>
                <div className="field"><label>Questions or notes? (Optional)</label><textarea placeholder="Anything you want RoyalTech to know" onChange={e=>setF("notes",e.target.value)}/></div>
                <button className="submit-btn" style={{background:"#991B1B"}} onClick={()=>submit("invest-full")}>Submit Investment Enquiry</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Confirm dialog */}
      {confirmDialog&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:C.white,borderRadius:10,padding:28,maxWidth:380,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:24,marginBottom:12}}>⚠️</div>
            <div style={{fontWeight:700,fontSize:15,color:C.black,marginBottom:20,lineHeight:1.6}}>{confirmDialog.msg}</div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={()=>setConfirmDialog(null)}
                style={{padding:"10px 24px",borderRadius:6,border:"1.5px solid "+C.lightgr,background:C.white,color:C.grey,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Cancel
              </button>
              <button onClick={()=>{confirmDialog.onConfirm();setConfirmDialog(null);}}
                style={{padding:"10px 24px",borderRadius:6,border:"none",background:C.orange,color:C.white,fontWeight:700,fontSize:14,cursor:"pointer"}}>
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {toast&&<div className="toast">{toast}</div>}
    </>
  );
}
