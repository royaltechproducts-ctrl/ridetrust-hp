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
  {n:"02",t:"Get Approved",b:"RoyalTech reviews and sends you a commitment request."},
  {n:"03",t:"3 Guarantors",b:"Bring 3 guarantors. Each guarantor must be either a committed applicant or an existing rider already on the RideTrust platform."},
  {n:"04",t:"Pay Deposit",b:"Bike: ₦200,000 · Keke: ₦500,000. Spread over 3 months max. All 3 guarantors must be confirmed before deposit is accepted."},
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



// ── Main App ─────────────────────────────────────────────────
export default function App(){
  // Detect page from URL path
  const getPage = () => {
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
  const [loading,   setLoading]   = useState(false);
  const [ga4,       setGa4]       = useState(null);
  const [ga4Err,    setGa4Err]    = useState(null);
  // Rider portal
  const [riderPortal, setRiderPortal] = useState(null); // logged-in rider object
  const [rPortalTab,  setRPortalTab]  = useState("overview");
  const [guarantors,  setGuarantors]  = useState([]);
  const [referrals,   setReferrals]   = useState([]);
  const [gForm,       setGForm]       = useState({name:"",email:"",phone:""});
  const [confirmDialog, setConfirmDialog] = useState(null); // {msg, onConfirm}

  const setF = (k,v) => setForm(f=>({...f,[k]:v}));
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),3500); };
  const navigate  = p => { window.location.href = "/#/"+p; };

  const loadRiderPortal = async (rider) => {
    setRiderPortal(rider);
    setRPortalTab("overview");
    const [g, r] = await Promise.all([
      sb.from("rt_guarantors").select("*").eq("beneficiary_rider_id", rider.id),
      sb.from("rt_referrals").select("*").eq("referrer_id", rider.id),
    ]);
    if(g.data) setGuarantors(g.data);
    if(r.data) setReferrals(r.data);
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
    const [r,a,i] = await Promise.all([
      sb.from("rt_riders").select("*").order("created_at",{ascending:false}),
      sb.from("rt_agents").select("*").order("created_at",{ascending:false}),
      sb.from("rt_investors").select("*").order("created_at",{ascending:false}),
    ]);
    if(r.data) setRiders(r.data);
    if(a.data) setAgents(a.data);
    if(i.data) setInvestors(i.data);
    setLoading(false);
  };

  useEffect(()=>{ if(adminOn) loadData(); },[adminOn]);

  useEffect(()=>{
    if(adminOn && adminTab==="analytics" && !ga4){
      fetch("/api/analytics")
        .then(r=>r.json())
        .then(d=>{ if(d.error) setGa4Err(d.error); else setGa4(d); })
        .catch(e=>setGa4Err(e.message));
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
    try {
      if(type==="rider-bike"||type==="rider-keke"){
        const pwd  = genPassword("R");
        const rcode = genReferralCode(form.name);
        const { data: newRider } = await sb.from("rt_riders").insert({
          vehicle_type: type==="rider-bike"?"bike":"keke",
          full_name: form.name, phone: form.phone, email: form.email,
          address: form.address||null, experience: form.experience||null,
          referrer: form.referrer||null,
          photo_id: form.photoId||null,
          password: pwd,
          referral_code: rcode,
          referred_by: form.referrer||null,
          app_status: "under_review",
          rider_status: "not_committed",
          hp_discount_balance: 0,
        }).select().single();
        // Admin notification email
        const vType = type==="rider-bike"?"Dispatch Bike":"Keke Tricycle";
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
        });
      } else if(type==="invest-bike"||type==="invest-keke"){
        await sb.from("rt_investors").insert({
          package_type: type==="invest-bike"?"bike":"keke",
          full_name: form.name, phone: form.phone, email: form.email,
          units: form.units?Number(form.units.split(" ")[0]):1,
          photo_id: form.photoId||null,
          notes: form.notes||null,
        });
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
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Current Market Value</span><strong>₦1,300,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Insurance & Plate License Reg</span><strong>₦200,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Initial deposit</span><strong style={{color:C.orange}}>₦200,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Deposit spread</span><strong>3 months</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Weekly remittance</span><strong>₦28,000 / week</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>HP term</span><strong>78 weeks</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total HP payments</span><strong>₦2,184,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total to own</span><strong style={{color:C.orange}}>₦2,384,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Bike Referral Discount</span><strong style={{color:C.green}}>₦100,000 / Bike Rider</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:13}}><span style={{color:"#AAA"}}>Keke Referral Discount</span><strong style={{color:C.green}}>₦200,000 / Keke Rider</strong></div>
                  </>):(<>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Current Market Value</span><strong>₦4,500,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Insurance & Plate License Reg</span><strong>Inclusive</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Initial deposit</span><strong style={{color:C.green}}>₦500,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Deposit spread</span><strong>3 months</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Weekly remittance</span><strong>₦60,000 / week</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>HP term</span><strong>104 weeks</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total HP payments</span><strong>₦6,240,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Total to own</span><strong style={{color:C.green}}>₦6,740,000</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #333",fontSize:13}}><span style={{color:"#AAA"}}>Bike Referral Discount</span><strong style={{color:C.green}}>₦100,000 / Bike Rider</strong></div>
                    <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:13}}><span style={{color:"#AAA"}}>Keke Referral Discount</span><strong style={{color:C.green}}>₦200,000 / Keke Rider</strong></div>
                  </>)}
                  {riderPortal.hp_discount_balance>0&&(
                    <div style={{marginTop:12,background:"rgba(232,98,10,.2)",borderRadius:6,padding:"10px 12px",fontSize:12,color:C.orange}}>
                      🎯 Referral discount earned: <strong>₦{riderPortal.hp_discount_balance.toLocaleString()}</strong> off your HP balance
                    </div>
                  )}
                </div>

                {/* Deposit instructions */}
                {riderPortal.rider_status==="not_committed"&&(
                  <div style={{background:"#FFF7ED",border:"1.5px solid #FCD34D",borderRadius:10,padding:20}}>
                    <div style={{fontWeight:800,fontSize:14,color:"#92400E",marginBottom:10}}>Pay Your First Deposit to Become a Committed Applicant</div>
                    <div style={{fontSize:13,color:"#92400E",lineHeight:1.8,marginBottom:12}}>
                      {riderPortal.vehicle_type==="bike"?"Bike deposit: ₦200,000":"Keke deposit: ₦500,000"} — spread over 3 months max.
                    </div>
                    <div style={{fontSize:13,color:"#92400E",lineHeight:1.9}}>
                      <strong>Account Name:</strong> RoyalTech Partnership & Investment Limited<br/>
                      <strong>Bank:</strong> Zenith Bank<br/>
                      <strong>Account Number:</strong> 1016621205<br/>
                      <strong>Reference:</strong> {riderPortal.referral_code}
                    </div>
                    <div style={{marginTop:10,fontSize:11,color:"#B45309"}}>After payment, send proof via WhatsApp to {ADMIN_PHONE} with your referral code as reference.</div>
                  </div>
                )}
              </div>
            )}

            {/* Guarantors tab */}
            {rPortalTab==="guarantors"&&(
              <div>
                <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr,marginBottom:16}}>
                  <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>My Guarantors</div>
                  <div style={{fontSize:12,color:C.grey,marginBottom:16}}>You need a minimum of 2 confirmed guarantors before delivery.</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
                    {[0,1].map(i=>{
                      const g = guarantors[i];
                      return(
                        <div key={i} style={{background:g?C.offwhite:"#F9F9F9",borderRadius:8,padding:14,border:"1.5px solid "+(g&&g.status==="confirmed"?C.green:C.lightgr),textAlign:"center"}}>
                          <div style={{fontSize:24,marginBottom:6}}>{g&&g.status==="confirmed"?"✅":g?"⏳":"👤"}</div>
                          <div style={{fontWeight:700,fontSize:13,color:g&&g.status==="confirmed"?C.green:C.grey}}>
                            {g?g.guarantor_name:`Guarantor ${i+1} — Empty`}
                          </div>
                          {g&&<div style={{fontSize:11,color:C.grey,marginTop:2}}>{g.status==="confirmed"?"Confirmed":"Pending confirmation"}</div>}
                        </div>
                      );
                    })}
                  </div>
                  {guarantors.length<2&&(
                    <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:8,padding:14,fontSize:13,color:C.blue,lineHeight:1.8}}>
                      <strong>How to get guarantors:</strong><br/>
                      1. Share your referral code <strong style={{color:C.orange}}>{riderPortal.referral_code}</strong> — anyone who signs up and pays their first deposit automatically becomes your guarantor.<br/>
                      2. Ask an existing committed applicant or rider to go to their portal and fill the guarantor form with your details.
                    </div>
                  )}
                </div>

                {/* Referral invite */}
                <div style={{background:C.black,borderRadius:10,padding:20,color:C.white}}>
                  <div style={{fontWeight:800,fontSize:14,marginBottom:8}}>🔗 Your Referral / Invite Link</div>
                  <div style={{background:"#1A1A1A",borderRadius:6,padding:"10px 14px",fontSize:13,color:C.orange,fontFamily:"monospace",marginBottom:10,wordBreak:"break-all"}}>
                    tbvap.vercel.app/#/ride?ref={riderPortal.referral_code}
                  </div>
                  <div style={{fontSize:12,color:"#AAA",lineHeight:1.7}}>
                    Share this link. When someone signs up through it and pays their first deposit, they automatically become your guarantor AND you earn a referral discount on your HP balance.
                  </div>
                  <button onClick={()=>{navigator.clipboard.writeText("tbvap.vercel.app/#/ride?ref="+riderPortal.referral_code);showToast("Link copied!");}}
                    style={{marginTop:12,background:C.orange,color:C.white,border:"none",padding:"10px 20px",borderRadius:6,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                    Copy Invite Link
                  </button>
                </div>
              </div>
            )}

            {/* Guarantee Someone tab */}
            {rPortalTab==="guarantee"&&(()=>{
              const alreadyGuarantor = guarantors.some(g=>g.guarantor_rider_id===riderPortal.id&&g.status!=="rejected");
              return(
                <div>
                  <div style={{background:C.white,borderRadius:10,padding:20,border:"1.5px solid "+C.lightgr}}>
                    <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>Guarantee Another Rider</div>
                    <div style={{fontSize:12,color:C.grey,marginBottom:16,lineHeight:1.7}}>
                      You can willingly serve as a guarantor for another rider on the platform — but only one at a time. Enter the exact name, email and phone the applicant used when they registered.
                    </div>
                    {alreadyGuarantor?(
                      <div style={{background:"#FEF3C7",border:"1.5px solid #FCD34D",borderRadius:8,padding:14,fontSize:13,color:"#92400E"}}>
                        ⚠️ You are already serving as a guarantor for another rider. You cannot guarantee a second applicant until your current commitment is complete or released.
                      </div>
                    ):(
                      <>
                        <div className="field"><label>Applicant Full Name *</label><input placeholder="Exact name as registered" value={gForm.name} onChange={e=>setGForm(f=>({...f,name:e.target.value}))}/></div>
                        <div className="field"><label>Applicant Email *</label><input type="email" placeholder="Exact email as registered" value={gForm.email} onChange={e=>setGForm(f=>({...f,email:e.target.value}))}/></div>
                        <div className="field"><label>Applicant Phone *</label><input type="tel" placeholder="Exact phone as registered" value={gForm.phone} onChange={e=>setGForm(f=>({...f,phone:e.target.value}))}/></div>
                        <button style={{background:C.orange,color:C.white,border:"none",padding:"12px 24px",borderRadius:6,fontWeight:700,fontSize:14,cursor:"pointer",width:"100%",marginTop:8}}
                          onClick={async()=>{
                            if(!gForm.name.trim()||!gForm.email.trim()||!gForm.phone.trim()){showToast("Please fill all fields.");return;}
                            // Find the applicant
                            const {data:applicants} = await sb.from("rt_riders")
                              .select("*")
                              .ilike("email",gForm.email.trim())
                              .ilike("phone",gForm.phone.trim());
                            if(!applicants||applicants.length===0){showToast("No applicant found with those details. Please check and try again.");return;}
                            const applicant = applicants[0];
                            if(applicant.id===riderPortal.id){showToast("You cannot guarantee yourself.");return;}
                            // Check applicant already has 2 guarantors
                            const {data:existingG} = await sb.from("rt_guarantors").select("*").eq("beneficiary_rider_id",applicant.id).neq("status","rejected");
                            if(existingG&&existingG.length>=2){showToast("This applicant already has 2 confirmed guarantors.");return;}
                            // Submit guarantee
                            await sb.from("rt_guarantors").insert({
                              guarantor_rider_id: riderPortal.id,
                              beneficiary_rider_id: applicant.id,
                              guarantor_name: riderPortal.full_name,
                              guarantor_email: riderPortal.email,
                              guarantor_phone: riderPortal.phone,
                              status: "pending",
                            });
                            setGForm({name:"",email:"",phone:""});
                            showToast("Guarantee submitted successfully for "+applicant.full_name+". Thank you.");
                          }}>
                          Submit Guarantee
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })()}

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
                      {["not_committed","committed_applicant","active_rider"].map(s=>(
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
                    <div className="v-tag">Dispatch Bike</div>
                    <div className="v-emoji">🏍️</div>
                    <div className="v-name cd">Okada / Dispatch Bike</div>
                    <div className="v-desc">Brand new Bajaj, TVS or Qlink 200cc. Insurance and plate registration included.</div>
                  </div>
                  <div className="v-body">
                    <div className="v-row"><span className="v-lbl">Initial deposit</span><span className="v-val hi">₦200,000</span></div>
                    <div className="v-row"><span className="v-lbl">Deposit spread</span><span className="v-val">3 months</span></div>
                    <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦28,000 / week</span></div>
                    <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">78 weeks</span></div>
                    <div className="v-row"><span className="v-lbl">Total HP payments</span><span className="v-val">₦2,184,000</span></div>
                    <div className="v-row"><span className="v-lbl">Total to own</span><span className="v-val hi">₦2,384,000</span></div>
                    <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#166534",lineHeight:1.7}}>
                      🎯 <strong>Referral Discount:</strong> Refer a bike buyer — get ₦100,000 off your balance. Refer a keke buyer — get ₦200,000 off. No limits.
                    </div>
                    <button className="btn btn-orange btn-full" onClick={()=>setModal("rider-bike")}>Apply for This Bike</button>
                  </div>
                </div>

                {/* Keke */}
                <div className="v-card">
                  <div className="v-head" style={{background:"#0D2B0D"}}>
                    <div className="v-tag">Keke NAPEP</div>
                    <div className="v-emoji">🛺</div>
                    <div className="v-name cd">Brand New Keke Tricycle</div>
                    <div className="v-desc">Brand new Bajaj RE, TVS King or Piaggio. Insurance and plate registration included.</div>
                  </div>
                  <div className="v-body">
                    <div className="v-row"><span className="v-lbl">Initial deposit</span><span className="v-val" style={{color:C.green,fontSize:16}}>₦500,000</span></div>
                    <div className="v-row"><span className="v-lbl">Deposit spread</span><span className="v-val">3 months</span></div>
                    <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦60,000 / week</span></div>
                    <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">104 weeks</span></div>
                    <div className="v-row"><span className="v-lbl">Total HP payments</span><span className="v-val">₦6,240,000</span></div>
                    <div className="v-row"><span className="v-lbl">Total to own</span><span className="v-val" style={{color:C.green,fontSize:16}}>₦6,740,000</span></div>
                    <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#166534",lineHeight:1.7}}>
                      🎯 <strong>Referral Discount:</strong> Refer a bike buyer — get ₦100,000 off your balance. Refer a keke buyer — get ₦200,000 off. No limits.
                    </div>
                    <button className="btn btn-full" style={{background:C.green,color:C.white,marginTop:12}} onClick={()=>setModal("rider-keke")}>Apply for This Keke</button>
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
                  <div className="ref-item"><div className="ref-item-t">🏍️ Refer a Bike applicant</div><div className="ref-item-b">Get ₦100,000 taken off your own outstanding HP balance as soon as the person you referred pays their first deposit and becomes a committed subscriber. Terms & Conditions apply.</div></div>
                  <div className="ref-item"><div className="ref-item-t">🛺 Refer a Keke applicant</div><div className="ref-item-b">Get ₦200,000 taken off your own outstanding HP balance as soon as the person you referred pays their first deposit and becomes a committed subscriber. Terms & Conditions apply.</div></div>
                  <div className="ref-item"><div className="ref-item-t">🔄 No limit</div><div className="ref-item-b">No limit on referrals. Each successful one reduces what you still owe on your own vehicle.</div></div>
                  <div className="ref-item"><div className="ref-item-t">✅ When it applies</div><div className="ref-item-b">Discount applies as soon as the person you referred pays their first deposit and becomes a committed subscriber. If they withdraw, the discount is reversed. They may also count as one of your 3 guarantors. Terms & Conditions apply.</div></div>
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
                <div className="lma-earn">
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,marginBottom:16,color:C.white}}>Weekly Commissions</div>
                  <div className="earn-row"><span className="earn-lbl">🏍️ Per bike managed / week</span><span className="earn-val">₦2,500</span></div>
                  <div className="earn-row"><span className="earn-lbl">🛺 Per keke managed / week</span><span className="earn-val">₦4,000</span></div>
                  <div style={{marginTop:12,fontSize:12,color:"#888",lineHeight:1.7}}>Paid monthly by RoyalTech from rider remittances.</div>
                </div>
                <div className="lma-earn">
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:20,marginBottom:16,color:C.white}}>Referral Bonuses</div>
                  <div className="earn-row"><span className="earn-lbl">🏍️ Per bike referral</span><span className="earn-val">₦100,000</span></div>
                  <div className="earn-row"><span className="earn-lbl">🛺 Per keke referral</span><span className="earn-val">₦200,000</span></div>
                  <div style={{marginTop:12,fontSize:12,color:"#888",lineHeight:1.7}}>Paid only when the referred rider takes delivery of their vehicle.</div>
                </div>
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
                  <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦28,000 / week</span></div>
                  <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">78 weeks</span></div>
                </div>
                <div style={{background:C.white,borderRadius:8,padding:20,border:"1.5px solid #BFDBFE"}}>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>🛺 Keke Tricycle</div>
                  <div className="v-row"><span className="v-lbl">Rider deposit</span><span className="v-val">₦500,000</span></div>
                  <div className="v-row"><span className="v-lbl">Weekly remittance</span><span className="v-val">₦60,000 / week</span></div>
                  <div className="v-row"><span className="v-lbl">HP term</span><span className="v-val">104 weeks</span></div>
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
              <button className="btn btn-orange" onClick={()=>setModal("invest-bike")}>🏍️ Two Wheels Package</button>
              <button className="btn" style={{background:"#1A7A3C",color:C.white}} onClick={()=>setModal("invest-keke")}>🛺 Three Wheels Package</button>
            </div>
          </div>

          {/* Investment packages */}
          <div style={{background:C.offwhite}}>
            <div className="wrap">
              <div className="sec-lbl" style={{color:C.orange}}>Investment Packages</div>
              <h2 className="sec-h2">Choose Your Package</h2>
              <div className="divider" style={{background:C.orange}}/>
              <p className="sec-body">Both packages are fully managed by RoyalTech. You invest once. Returns come monthly to your account.</p>
              <div className="invest-grid">
                {/* Bike */}
                <div className="inv-card">
                  <div className="inv-head" style={{background:C.blue}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",opacity:.8,marginBottom:8}}>Two Wheels Package</div>
                    <div style={{fontSize:40,marginBottom:8}}>🏍️</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:28,textTransform:"uppercase"}}>Dispatch Bike</div>
                  </div>
                  <div className="inv-body">
                    <div className="inv-row"><span className="inv-lbl">Your investment</span><span className="inv-val">₦1,500,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Investment term</span><span className="inv-val">78 weeks</span></div>
                    <div className="inv-row"><span className="inv-lbl">Total return</span><span className="inv-profit">₦1,950,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Your net profit</span><span className="inv-profit">₦450,000</span></div>
                    <div style={{background:"#EFF6FF",border:"1.5px solid #BFDBFE",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#1E40AF",lineHeight:1.7}}>
                      Returns paid monthly to your account by RoyalTech.
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
                    <div className="inv-row"><span className="inv-lbl">Your investment</span><span className="inv-val">₦4,500,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Investment term</span><span className="inv-val">104 weeks</span></div>
                    <div className="inv-row"><span className="inv-lbl">Total return</span><span className="inv-profit" style={{color:C.green}}>₦5,720,000</span></div>
                    <div className="inv-row"><span className="inv-lbl">Your net profit</span><span className="inv-profit" style={{color:C.green}}>₦1,220,000</span></div>
                    <div style={{background:"#F0FFF4",border:"1.5px solid #BBF7D0",borderRadius:6,padding:"10px 12px",marginTop:10,fontSize:12,color:"#166534",lineHeight:1.7}}>
                      Returns paid monthly to your account by RoyalTech.
                    </div>
                    <button className="btn btn-full" style={{background:C.green,color:C.white,marginTop:14}} onClick={()=>setModal("invest-keke")}>Invest — Three Wheels</button>
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
              <button className="btn" style={{background:C.blue,color:C.white}} onClick={()=>setModal("invest-bike")}>🏍️ Two Wheels Package</button>
              <button className="btn" style={{background:C.green,color:C.white}} onClick={()=>setModal("invest-keke")}>🛺 Three Wheels Package</button>
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
                <div className="modal-s">Dispatch Bike — ₦200,000 deposit · ₦28,000/week × 78 weeks<br/>RoyalTech will contact you within 24 hours.</div>
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
                <div className="modal-s">Keke Tricycle — ₦500,000 deposit · ₦60,000/week × 104 weeks<br/>RoyalTech will contact you within 24 hours.</div>
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
                <div className="modal-s">Invest ₦1,500,000 · Receive ₦1,950,000 over 78 weeks · Net profit ₦450,000<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>How many units?</label>
                  <select onChange={e=>setF("units",e.target.value)}>
                    <option value="">Select number of units</option>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n} unit{n>1?"s":""} — ₦{(n*1500000).toLocaleString()}</option>)}
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
                <div className="modal-s">Invest ₦4,500,000 · Receive ₦5,720,000 over 104 weeks · Net profit ₦1,220,000<br/>RoyalTech will contact you within 24 hours.</div>
                <div className="field"><label>Full Name *</label><input placeholder="Your full legal name" onChange={e=>setF("name",e.target.value)}/></div>
                <div className="field"><label>Phone Number *</label><input type="tel" placeholder="+234 xxx xxx xxxx" onChange={e=>setF("phone",e.target.value)}/></div>
                <div className="field"><label>Email Address *</label><input type="email" placeholder="your@email.com" onChange={e=>setF("email",e.target.value)}/></div>
                <div className="field"><label>How many units?</label>
                  <select onChange={e=>setF("units",e.target.value)}>
                    <option value="">Select number of units</option>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n}>{n} unit{n>1?"s":""} — ₦{(n*4500000).toLocaleString()}</option>)}
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
