import { useState, useEffect, useRef } from "react";

/* ─── FONT LOADER ─────────────────────────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap";
    document.head.appendChild(l);
  }, []);
}

/* ─── THEME ───────────────────────────────────────────────────────────────── */
const T = {
  dark: {
    bg: "#060a14", bgCard: "#0d1220", bgCard2: "#111827",
    bgInput: "#161d30", border: "#1e2a42", borderLight: "#243047",
    text: "#e8edf8", textMuted: "#7b8db0", textDim: "#3d4f6e",
    accent: "#f0a500", accentHover: "#ffc233", accentSub: "#7c5cfc",
    accentSubHover: "#9b80ff", success: "#10b981", warn: "#f59e0b",
    danger: "#ef4444", info: "#38bdf8",
    headBg: "rgba(6,10,20,0.96)", shadow: "0 8px 32px rgba(0,0,0,0.6)",
    shadowSm: "0 2px 12px rgba(0,0,0,0.4)", glow: "0 0 20px rgba(240,165,0,0.15)",
    glass: "rgba(13,18,32,0.85)", gradHero: "radial-gradient(ellipse at 20% 50%, rgba(124,92,252,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(240,165,0,0.08) 0%, transparent 50%)",
  },
  light: {
    bg: "#f2ede3", bgCard: "#ffffff", bgCard2: "#faf8f4",
    bgInput: "#f5f1eb", border: "#e0d9cf", borderLight: "#ede8e0",
    text: "#1a1625", textMuted: "#6b6070", textDim: "#a89fa8",
    accent: "#1d4ed8", accentHover: "#1e40af", accentSub: "#7c3aed",
    accentSubHover: "#6d28d9", success: "#059669", warn: "#d97706",
    danger: "#dc2626", info: "#0284c7",
    headBg: "rgba(242,237,227,0.96)", shadow: "0 8px 32px rgba(0,0,0,0.1)",
    shadowSm: "0 2px 12px rgba(0,0,0,0.07)", glow: "0 0 20px rgba(29,78,216,0.1)",
    glass: "rgba(255,255,255,0.9)", gradHero: "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(29,78,216,0.05) 0%, transparent 50%)",
  }
};

/* ─── EXAM STEPS DATA ─────────────────────────────────────────────────────── */
const EXAM_GUIDES = {
  "JEE Main": {
    color: "#6366f1", icon: "⚡", subtitle: "National Testing Agency • 2 Sessions/Year",
    phases: [
      { phase: "Phase 1", title: "Check Your Eligibility", icon: "✅", duration: "Before Registration",
        steps: ["No age limit (removed 2021 onwards)", "Maximum 3 consecutive attempts from first year", "Must have passed/appearing in Class 12 with Physics, Chemistry, Mathematics + one more subject", "Min 75% aggregate in Class 12 for admission to NITs/IIITs (65% for SC/ST)", "Any recognized board (CBSE, ISC, State Boards, etc.) accepted", "NRI / foreign nationals also eligible"] },
      { phase: "Phase 2", title: "Registration on NTA Portal", icon: "📝", duration: "Nov–Dec (S1) / Feb–Mar (S2)",
        steps: ["Visit jeemain.nta.nic.in → 'New Registration'", "Enter mobile number and email ID (keep these active!)", "Fill in personal details: name (as in Class 10), DoB, gender, nationality", "Fill academic details: Class 12 board, year of passing/appearing, marks", "Upload scanned Photo (JPG, 10–200 KB) and Signature (4–30 KB)", "Choose 4 exam city preferences (you'll be allotted 1)", "Select papers: Paper 1 (BTech) and/or Paper 2A (BArch) / 2B (BPlan)", "Pay application fee: General/OBC ₹1,000 (1 paper), SC/ST/PwD ₹500", "Note down Application Number — needed for all future logins"] },
      { phase: "Phase 3", title: "Download Admit Card", icon: "🪪", duration: "2–3 weeks before exam",
        steps: ["Login to NTA JEE Main portal with Application Number + Password", "Download Admit Card — print 2 copies on A4 paper", "Admit card contains: Exam date, time, centre address, roll number", "Carry valid photo ID (Aadhaar/PAN/Passport) along with admit card — mandatory", "Check exam centre location in advance using Google Maps", "Report at centre at least 1 hour before exam time (latecomers not allowed)"] },
      { phase: "Phase 4", title: "Exam Day — Paper 1 (BTech)", icon: "🖥️", duration: "3 Hours",
        steps: ["Total 90 questions: Physics (30) + Chemistry (30) + Mathematics (30)", "Each subject: 20 MCQ (–1 for wrong) + 10 Numerical (attempt ANY 5, no negative marking)", "MCQ marking: +4 correct, –1 wrong", "Numerical marking: +4 correct, 0 for unattempted", "Strategy tip: Attempt all 15 attempted (20 MCQ + 5 Numerical) per subject confidently", "No rough sheet allowed outside — use screen scratchpad only", "Carry water bottle, pen, pencil, geometry box (if needed for Paper 2)"] },
      { phase: "Phase 5", title: "Result & NTA Score", icon: "📊", duration: "3–4 weeks after exam",
        steps: ["NTA Score = Percentile, NOT percentage marks", "Percentile = % of candidates who scored EQUAL TO OR LESS than you", "Example: NTA Score 95 means you scored better than 95% of students", "Best of 2 sessions is considered for final rank (from 2024 onwards)", "Check result at jeemain.nta.nic.in using roll number", "Note down your All-India Rank (AIR), Category Rank, and State Rank", "Answer key challenge: Available for ~3 days after preliminary key release — challenge wrong answers with ₹200/question fee (refunded if accepted)"] },
      { phase: "Phase 6", title: "JEE Advanced Eligibility", icon: "🎯", duration: "After Session 2 Result",
        steps: ["Only top 2,50,000 candidates from JEE Main (all sessions combined) qualify", "Qualification is category-wise: General ~96,000, EWS ~24,000, OBC-NCL ~64,000, SC ~35,000, ST ~17,500, PwD ~5,000", "Must not have previously enrolled in IIT", "Maximum 2 attempts in 2 consecutive years for JEE Advanced", "Age: Born on or after Oct 1, 2000 (General/OBC); Oct 1, 1995 (SC/ST/PwD)", "Check your JEE Advanced eligibility on NTA website after result"] },
      { phase: "Phase 7", title: "JoSAA Counselling (NITs/IIITs)", icon: "🏛️", duration: "June–July",
        steps: ["JEE Main AIR (not percentile) is used for NIT/IIIT admission", "Register at josaa.nic.in with JEE Main Application Number", "Fill up to 25,000 choices (institute + branch combinations) in preference order", "Mock allotment released first — check if your desired seat is within reach", "6 regular rounds of seat allotment + 1 spot round", "After each round: Accept Seat / Float (keep + try upgrade) / Slide (same inst, better branch) / Withdraw", "Pay partial fee online after accepting seat in each round", "Final document verification and reporting to allotted institute"] },
    ]
  },
  "JEE Advanced": {
    color: "#f59e0b", icon: "🏆", subtitle: "IIT Exam • For IIT Admission Only",
    phases: [
      { phase: "Phase 1", title: "Verify JEE Main Eligibility", icon: "✅", duration: "After JEE Main Result",
        steps: ["Must be in top 2,50,000 in JEE Main (considering all categories)", "Check NTA website — eligible candidates list published after Session 2 result", "Maximum 2 attempts in 2 consecutive years (e.g., 2025 & 2026 only)", "Should not have been previously admitted to an IIT (even after cancellation)", "Age: Born on or after Oct 1, 2000 (Gen/OBC), Oct 1, 1995 (SC/ST/PwD)"] },
      { phase: "Phase 2", title: "Registration", icon: "📝", duration: "April (2 weeks window)",
        steps: ["Visit jeeadv.ac.in — login with JEE Main Application Number", "Fill personal and academic details", "Choose exam city (limited cities, book early!)", "Upload scanned photo and signature", "Pay registration fee: General/OBC ₹3,200 | SC/ST/Female/PwD ₹1,600", "Foreign nationals: USD 75", "Registration window is only ~2 weeks — don't miss it!", "Note: No application correction window typically provided"] },
      { phase: "Phase 3", title: "Admit Card & Exam Day", icon: "🪪", duration: "May (3 days before exam)",
        steps: ["Download admit card from jeeadv.ac.in", "Two compulsory papers: Paper 1 (morning) + Paper 2 (afternoon) — SAME DAY", "Each paper: 3 hours | Physics + Chemistry + Maths", "Question types vary each year: MCQ (single/multiple correct), numerical, paragraph-based", "Marking: +3/–1 (single correct MCQ), +4/0 (multiple correct partial scoring), +3/0 (numerical)", "No calculator allowed. No rough paper — use question booklet margins", "Carry photo ID + admit card. Biometric verification at centre"] },
      { phase: "Phase 4", title: "Answer Key & Challenges", icon: "📋", duration: "Within 48 hrs of exam",
        steps: ["Provisional answer key released on jeeadv.ac.in", "Challenge window: typically 12–24 hours only", "Fee: ₹200 per question challenged (refunded if accepted)", "Experts review challenges; final answer key published later", "Calculate your expected marks using the final answer key", "CutOffs published separately — check OBC/SC/ST category cutoffs too"] },
      { phase: "Phase 5", title: "Result & Rank Card", icon: "📊", duration: "June",
        steps: ["JEE Advanced rank list released at jeeadv.ac.in", "Common Rank List (CRL) + separate category ranks (OBC-NCL, SC, ST, EWS, PwD)", "Rank card contains: CRL rank, category rank, subject-wise & aggregate marks", "Only candidates who appear in BOTH papers are ranked", "Preparatory course cutoffs for IIT: Even lower cutoff for SC/ST candidates who just miss the mark", "Architecture Aptitude Test (AAT): Additional test for IIT Architecture aspirants — register within 2 days of result"] },
      { phase: "Phase 6", title: "AAT (If Applying for Architecture)", icon: "🎨", duration: "June (3 days after result)",
        steps: ["Only for those targeting IIT BHU / IIT Kharagpur / IIT Roorkee Architecture", "Register at jeeadv.ac.in within 2 days of result announcement", "Test conducted at IIT campuses only (a few centres)", "3-hour test: Freehand drawing, geometric drawing, three-dimensional perception, imagination", "AAT only qualifies you — final seat depends on JEE Advanced rank", "No negative marking in AAT; bring drawing instruments (pencils, erasers, scale, compass)"] },
      { phase: "Phase 7", title: "JoSAA Counselling for IITs", icon: "🏛️", duration: "June–July",
        steps: ["IIT seats are ONLY allocated via JoSAA (josaa.nic.in)", "Login with JEE Advanced Application Number", "Fill choices for IIT programs FIRST (IITs fill before NITs in earlier rounds)", "Up to 25,000 choices allowed — be strategic, fill ALL preferred options", "Mock allotment published before Round 1 — use it to gauge your position", "6 rounds: After each round, choose Accept / Float / Slide / Withdraw", "IIT seats generally fill by Round 4; NITs by Round 6", "After final allotment: Online document upload → Physical reporting to IIT campus"] },
    ]
  },
  "JoSAA Counselling": {
    color: "#8b5cf6", icon: "📋", subtitle: "Joint Seat Allocation Authority • IITs + NITs + IIITs + GFTIs",
    phases: [
      { phase: "Phase 1", title: "Registration & Documents", icon: "📝", duration: "Starts ~5 days after JEE Advanced result",
        steps: ["Visit josaa.nic.in — register with JEE Main/Advanced Application Number", "Required documents: Class 10 certificate, Class 12 certificate/marksheet, Category certificate (if any), JEE admit card, Scorecard, Photo ID, Passport-size photo", "Scan ALL documents in advance — good quality, clear scans required", "Class 12 passed candidates: Upload provisional marksheet; final marksheet at institute", "SC/ST: Caste certificate from competent authority (SDM or above)", "OBC-NCL: Certificate dated within 1 year, Non-Creamy Layer mandatory", "EWS: Income & Asset certificate from competent authority for current financial year"] },
      { phase: "Phase 2", title: "Mock Seat Allotment", icon: "👁️", duration: "2–3 days before Round 1",
        steps: ["JoSAA releases a mock allotment before actual Round 1", "Non-binding: You can change choices AFTER viewing mock allotment", "Use it to understand if your preferred branch/college is reachable", "Check both home state (HS) and other state (OS) quota ranks for NITs", "Strategy: If mock shows a less preferred seat, rearrange your choices accordingly", "Opening/Closing ranks from previous years available on josaa.nic.in — use these!", "Ideal strategy: Put reach choices first, then safe choices, then backup choices"] },
      { phase: "Phase 3", title: "Choice Filling Strategy", icon: "🎯", duration: "Before each round",
        steps: ["You can add up to 25,000 choices (but focus on 50–100 realistic options)", "Fill IIT programs first (they fill in early rounds)", "For NITs: Check HS (Home State) quota — gives 50% reserved seats to students from that state", "Put DREAM choice as Choice 1, no matter how unlikely", "Below dream choices: realistic good options → safe options → backup", "Never leave choices empty — more choices = better chance of upgrade", "DO NOT remove choices once a seat is allotted (it means you're rejected from above choices)", "Recommended: fill all desired IITs → desired NITs → IIITs → GFTIs in priority order"] },
      { phase: "Phase 4", title: "Rounds 1–6: Seat Allotment", icon: "🔄", duration: "6 Rounds over 3 weeks",
        steps: ["Round 1: First allotment released — login to check allotted seat", "For each round, you have 4 choices: (1) Accept Seat — stop here (2) Float — keep allotment, participate in next round for possible upgrade (3) Slide — keep current institute, upgrade branch only in next round (4) Withdraw — leave JoSAA entirely (forfeit fee)", "FLOAT is usually best if you want a better seat — you keep your current seat while trying for upgrade", "After accepting, pay Seat Acceptance Fee: IITs ₹35,000 | NITs/IIITs/GFTIs ₹45,000 (adjustable against final fees)", "Accepted fee is partially non-refundable if you later withdraw", "Upload documents online after accepting seat — do this immediately"] },
      { phase: "Phase 5", title: "Document Verification", icon: "📂", duration: "Online (during rounds) + Physical (at institute)",
        steps: ["Online: Upload all documents on josaa portal after seat acceptance", "Physical verification happens at allotted institute during reporting", "Documents checklist: JEE Main/Advanced Admit Card, Rank Card, Class 10 certificate, Class 12 marksheet (both provisional & final), Category certificate, Photo ID (Aadhaar preferred), 10 passport photos", "Discrepancy in name: Bring gazette notification/affidavit if name differs in certificates", "Medical certificate: Some IITs require medical fitness certificate from govt hospital", "Missing documents = seat cancellation — prepare in advance!"] },
      { phase: "Phase 6", title: "Spot Round (If Seat Vacant)", icon: "⚡", duration: "After Round 6",
        steps: ["JoSAA may conduct spot rounds for vacant seats (not always)", "Only candidates who withdrew or didn't get allotted earlier can participate", "Fresh registration required for spot round", "Seats available mostly in less popular branches or new IITs/NITs", "Payment must be made within 24 hours — no extensions given", "Physical reporting within 2-3 days of spot round allotment"] },
      { phase: "Phase 7", title: "Final Reporting to Institute", icon: "🏛️", duration: "Within 3 days of final allotment",
        steps: ["Report to allotted institute physically within the specified date", "Carry ORIGINALS + 2 sets of photocopies of all documents", "Pay remaining admission fee (deduct already paid seat acceptance fee)", "Medical examination: Many institutes conduct mandatory medical test", "Hostel allocation: Usually done at institute, may require separate application", "Branch change: After first semester, top performers may apply for branch change (institute-specific policy)", "Joining formalities: Fill institute forms, collect ID card, hostel room allocation, lab/library registration"] },
    ]
  },
  "BITSAT": {
    color: "#10b981", icon: "🎯", subtitle: "BITS Pilani Admission Test • Pilani, Goa & Hyderabad campuses",
    phases: [
      { phase: "Phase 1", title: "Eligibility Check", icon: "✅", duration: "Before applying",
        steps: ["Class 12 with Physics, Chemistry, Mathematics as core subjects", "Minimum 75% aggregate in PCM + English in Class 12", "Minimum 60% marks in each of Physics, Chemistry, Mathematics individually", "For CSE programs: Same criteria — 75% aggregate AND 60% in each P/C/M", "Must be appearing in or have passed Class 12 in the year of application", "NRI/PIO/OCI candidates: Apply under NRI quota (different process)"] },
      { phase: "Phase 2", title: "BITS Application Form", icon: "📝", duration: "January–April",
        steps: ["Visit bitsadmission.com — 'Apply for BITSAT 2025'", "Create account, fill personal and academic details", "Select BITS campuses you're interested in (Pilani, Goa, Hyderabad)", "Note: You can opt for more than one campus", "Upload Photo and Signature as per specifications", "Pay Application Fee: ₹3,400 (male applicants) | ₹2,900 (female applicants)", "NRI candidates: Higher fee applicable", "Note your Application ID for all future correspondence"] },
      { phase: "Phase 3", title: "BITSAT Slot Booking", icon: "📅", duration: "April–May",
        steps: ["Login to bitsadmission.com for slot booking (opens separately)", "Choose your preferred exam date and time slot from available options", "Choose test centre city (100+ cities across India)", "Slot booking is first-come-first-served — book as soon as slots open!", "After booking: Admit card available for download 2 weeks before exam", "Admit card shows: Centre address, date, time, roll number"] },
      { phase: "Phase 4", title: "BITSAT Exam", icon: "🖥️", duration: "3 Hours, Computer-Based",
        steps: ["150 questions in 3 hours: Physics (40) + Chemistry (40) + English & Logical Reasoning (25) + Mathematics (45)", "Marking: +3 for correct, –1 for wrong (all sections including LR)", "No negative marking exception: All 150 questions have negative marking", "Important: If you complete 150 questions BEFORE 3 hours → get 12 BONUS questions", "Bonus questions: +3 correct, no negative marking — attempt all if you get them!", "No sectional time limit — manage your time freely across subjects", "Strategy: Prioritize Maths + Physics first; use LR section for scoring boost"] },
      { phase: "Phase 5", title: "Score & Cutoff Analysis", icon: "📊", duration: "Within 24 hrs of exam",
        steps: ["BITSAT score displayed immediately after exam (provisional)", "Final score released after all exam days are complete", "Score range: 0 to 450 (without bonus) or up to 486 (with bonus)", "Typical cutoffs: CSE BITS Pilani ≥ 350-370 | CSE BITS Goa ≥ 330-350 | CSE BITS Hyderabad ≥ 310-330", "Other programs: Electrical, Mechanical, Chemical have lower cutoffs", "Past year cutoffs available on bitsadmission.com — analyze carefully"] },
      { phase: "Phase 6", title: "Board Marks Submission", icon: "📋", duration: "After Class 12 results",
        steps: ["BITS ALSO considers Class 12 board marks for admission", "Upload Class 12 marksheet on bitsadmission.com after results", "You need BOTH: Good BITSAT score AND 75%+ in 12th", "If board marks are below 75% → Not eligible for admission even with high BITSAT score", "Enhancement of board marks: Improvement exam marks also considered if higher"] },
      { phase: "Phase 7", title: "Iteration-Based Admission", icon: "🔄", duration: "June–July",
        steps: ["BITS runs its own admission process (NOT JoSAA)", "Multiple 'Iterations' (usually 3–4) released on bitsadmission.com", "Login with Application ID to view allotted campus + program", "For each iteration: Accept Allotment (pay fee) OR Reject (try next iteration for possible upgrade)", "If you reject: You may get better campus/program OR nothing — risky!", "Pay Seat Acceptance Fee after accepting (partially adjustable later)", "Strategy: Accept if you get your preferred choice — don't gamble for upgrade unless you have JoSAA as backup"] },
      { phase: "Phase 8", title: "Reporting to BITS Campus", icon: "🏛️", duration: "July",
        steps: ["Report to allotted campus: Pilani (Rajasthan) / Goa / Hyderabad", "Carry originals + copies: Class 10 & 12 certificates, BITSAT admit card, Score card, Category certificate, Photos, Photo ID, Medical certificate", "Medical examination: Mandatory at BITS campus (includes vision, general fitness)", "Hostel: Mandatory for first year at BITS — accommodation is residential campus", "Fee payment: Pay remaining semester fee after deducting advance paid", "Campus life: BITS is a fully residential campus — pack accordingly!"] },
    ]
  },
  "VITEEE": {
    color: "#ec4899", icon: "🌟", subtitle: "VIT Engineering Entrance Exam • Vellore, Chennai, Bhopal, AP",
    phases: [
      { phase: "Phase 1", title: "Eligibility & Registration", icon: "📝", duration: "November–March",
        steps: ["Min 60% aggregate in Physics, Chemistry, Maths/Biology in Class 12", "Must have passed Class 12 or appearing in the exam year", "Visit vit.ac.in → 'VITEEE Application'", "Fill form with personal, academic details", "Select exam slot city and preferred VIT campus", "Pay fee: ₹1,300 (approx)", "More accessible than JEE — no negative marking makes it student-friendly"] },
      { phase: "Phase 2", title: "VITEEE Exam", icon: "🖥️", duration: "April (Computer-Based, slotted)",
        steps: ["125 questions in 2.5 hours: Maths/Biology (40) + Physics (35) + Chemistry (35) + Aptitude (10) + English (5)", "NO negative marking — attempt every single question!", "Computer-adaptive: Questions become easier/harder based on performance", "Slot-based exam across multiple days — each slot has different paper", "Score normalized across slots for fair comparison", "Strategy: Since no negative marking — NEVER leave anything blank"] },
      { phase: "Phase 3", title: "Result & Rank Card", icon: "📊", duration: "April–May",
        steps: ["Results published on vit.ac.in", "Download VITEEE Rank Card from portal", "Score = raw marks | Rank = your position among all candidates", "Merit list released campus-wise and program-wise", "Check opening and closing ranks from previous years on VIT website"] },
      { phase: "Phase 4", title: "Online Counselling Registration", icon: "📋", duration: "May",
        steps: ["Register for VITEEE Counselling at vit.ac.in separately", "Pay counselling registration fee (approx ₹50,000 — adjustable towards admission fee)", "Submit preference form for campus and program", "Required documents: Class 10 & 12 marksheets, VITEEE scorecard, Photo ID, Community certificate"] },
      { phase: "Phase 5", title: "Choice Filling & Seat Allotment", icon: "🎯", duration: "May–June",
        steps: ["Login to counselling portal", "Fill program preferences across all 4 VIT campuses (Vellore, Chennai, Bhopal, Amravati)", "Allotment done in multiple rounds based on rank", "After allotment: Accept seat online and pay remaining admission fee", "Higher rounds: Upgrade option available if you get a better program", "Final allotment: No further changes possible after accepting"] },
      { phase: "Phase 6", title: "Reporting & Joining", icon: "🏛️", duration: "July",
        steps: ["Report to allotted VIT campus physically", "Carry: Class 10 & 12 certificates, VITEEE admit card + rank card, Community certificate, Photos, Photo ID, Medical certificate", "Medical examination at campus", "Hostel allocation (VIT has excellent hostel facilities)", "Fee payment for full semester", "Laptop/device requirements: VIT mandates laptop for students — check campus-specific specs"] },
    ]
  },
  "COMEDK": {
    color: "#f97316", icon: "🏛️", subtitle: "Consortium of Medical Engineering & Dental Colleges of Karnataka",
    phases: [
      { phase: "Phase 1", title: "Eligibility & Registration", icon: "📝", duration: "February–April",
        steps: ["Class 12 with PCM, min 45% aggregate in PCM for General; 40% for SC/ST/OBC", "Visit comedk.org → 'COMEDK UGET 2025'", "Register with email and mobile number", "Fill application form with personal and academic details", "Upload Photo (20–50 KB, JPG) and Signature (10–30 KB, JPG)", "Pay fee: ₹1,800 (approx)", "COMEDK is open to ALL India students (not just Karnataka domicile)"] },
      { phase: "Phase 2", title: "COMEDK UGET Exam", icon: "🖥️", duration: "May (Computer-Based, 1 day)",
        steps: ["180 questions in 3 hours: Physics (60) + Chemistry (60) + Maths (60)", "MCQ format: +1 for correct, –0.25 for wrong (25% negative marking)", "Conducted online across 500+ test centres pan-India", "Download admit card 1 week before exam", "Note: This is for Karnataka private engineering colleges (190+ colleges)", "Separate counselling from JoSAA"] },
      { phase: "Phase 3", title: "Result & Rank", icon: "📊", duration: "May",
        steps: ["Results at comedk.org with category-wise ranks", "Check opening/closing ranks from previous years on COMEDK website", "Top colleges: BMSCE, PES University, MSRIT, RV College, BMS College", "COMEDK rank also accepted by some Manipal/other deemed universities separately"] },
      { phase: "Phase 4", title: "Online Counselling", icon: "📋", duration: "June–July",
        steps: ["Register at unigauge.in or comedk.org for COMEDK counselling", "UniGauge: Combined counselling for COMEDK + other private colleges across India (1 application, multiple colleges)", "Pay counselling fee online", "Fill college + branch preferences for all 190+ participating colleges", "Mock allotment published — check, adjust preferences"] },
      { phase: "Phase 5", title: "Seat Allotment & Reporting", icon: "🎯", duration: "July",
        steps: ["Multiple rounds of allotment (typically 3 rounds)", "After each round: Accept seat or wait for next round upgrade", "Pay seat confirmation fee after accepting", "Document verification at a COMEDK Help Center (not at college)", "Required documents: Class 10 & 12 certificates, COMEDK admit card + scorecard, Category certificate, Photo ID, Photos", "After document verification: Report to allotted college within stipulated date"] },
    ]
  },
  "WBJEE": {
    color: "#14b8a6", icon: "🔵", subtitle: "West Bengal Joint Entrance Examination",
    phases: [
      { phase: "Phase 1", title: "Eligibility & Registration", icon: "📝", duration: "December–January",
        steps: ["West Bengal domicile: Must have studied in WB for Class 11–12 (preferred)", "All India candidates: Also eligible, but separate quota/merit list", "Class 12 with PCM, min 45% aggregate in PCM (40% for SC/ST/OBC-A/OBC-B)", "Visit wbjeeb.nic.in for registration", "Pay fee: ₹500 (General) | ₹400 (SC/ST/OBC) via challan or online", "Exam for WB state engineering + Jadavpur University (top destination!)"] },
      { phase: "Phase 2", title: "Exam (OMR Paper-Based)", icon: "📝", duration: "April (Single day, OMR)",
        steps: ["WBJEE is unique — it's a PEN-AND-PAPER (OMR) exam, not computer-based!", "Paper 1: Mathematics — 75 questions, 2 hours", "Paper 2: Physics (40) + Chemistry (40) = 80 questions, 2 hours", "Marking: Category 1 (+1/–0.25), Category 2 (+2/–0.5), Category 3 (+2, no negative)", "Carry admit card + original photo ID to exam centre", "Students must attempt both papers on the same day"] },
      { phase: "Phase 3", title: "Result & Rank", icon: "📊", duration: "June",
        steps: ["Results at wbjeeb.nic.in", "Merit list: Separate for WB domicile and non-domicile students", "Top colleges: Jadavpur University (best), IIEST Shibpur, MAKAUT-affiliated colleges", "Note: Jadavpur University uses WBJEE rank — very competitive (better than many NITs!)"] },
      { phase: "Phase 4", title: "Counselling via WBJEEB Portal", icon: "📋", duration: "July",
        steps: ["Register for counselling at wbjeeb.nic.in", "Choice filling for 150+ participating colleges and programs", "Jadavpur University (JU): Separate merit list but same WBJEE rank", "Pay counselling fee online", "Document verification at district counselling centres", "Multiple rounds of allotment"] },
    ]
  },
  "MHT-CET": {
    color: "#8b5cf6", icon: "🟣", subtitle: "Maharashtra Common Entrance Test • For Maharashtra colleges",
    phases: [
      { phase: "Phase 1", title: "Eligibility & Registration", icon: "📝", duration: "January–March",
        steps: ["Maharashtra domicile: Birth + schooling in Maharashtra (preferred for state quota)", "Class 12 with PCM, min 50% aggregate in PCM for Gen; 45% for reserved categories", "Visit cetcell.mahacet.org for MHT-CET registration", "Pay fee: ₹800 (General) | ₹600 (SC/ST/NT/VJ/OBC)", "Exam for all Maharashtra govt, aided & unaided engineering colleges (700+)"] },
      { phase: "Phase 2", title: "MHT-CET Exam", icon: "🖥️", duration: "April–May (Computer-Based, Multiple Days)",
        steps: ["PCM Paper: Physics (50) + Chemistry (50) + Maths (100) = 200 questions, 3 hours", "Marking: +2 per correct, NO negative marking", "Based on Maharashtra Class 12 syllabus (slightly different from NCERT)", "Multiple exam days — different papers each day (normalized scoring)", "PCB paper also available (for MHT-CET Pharmacy/Agriculture — different from PCM)"] },
      { phase: "Phase 3", title: "Counselling via CAP (Centralized Admission Process)", icon: "📋", duration: "June–July",
        steps: ["CAP: Maharashtra's centralized counselling for all aided/unaided colleges", "Register at cetcell.mahacet.org after result", "Choose from 700+ colleges and thousands of programs", "CAP Round 1, 2, 3: Choice filling + allotment each round", "Direct admissions (for private unaided): Separate process at college level", "Top colleges: COEP Pune, VJTI Mumbai, ICT Mumbai, SPIT Mumbai, PICT Pune"] },
    ]
  },
};

/* ─── FOREIGN UNIVERSITIES DATA ──────────────────────────────────────────── */
const FOREIGN_COUNTRIES = [
  {
    country: "USA 🇺🇸", flag: "🇺🇸", color: "#3b82f6",
    tagline: "World's top research universities. High cost, high reward.",
    exams: ["SAT (1200+ preferred)", "ACT (optional at most)", "TOEFL 100+ / IELTS 7.0+"],
    timeline: "EA/ED: Nov 1–15 | Regular Decision: Jan 1–15 | Decision: March–April",
    cost: "$55,000–85,000/year (tuition + living)",
    visa: "F-1 Student Visa",
    workAllowed: "20 hrs/week on-campus, OPT after graduation (3 yr for STEM)",
    universities: [
      { name: "MIT", rank: 1, field: "Engineering & CS", note: "World #1 Engineering" },
      { name: "Stanford University", rank: 3, field: "CS, AI, Entrepreneurship", note: "Silicon Valley nexus" },
      { name: "Caltech", rank: 6, field: "Physics, Engineering", note: "Small, elite research" },
      { name: "UC Berkeley", rank: 10, field: "EECS, Data Science", note: "Best public university" },
      { name: "Carnegie Mellon", rank: 20, field: "CS, Robotics, AI", note: "Best CS program globally" },
      { name: "Georgia Tech", rank: 35, field: "Engineering, CS", note: "Affordable top school" },
    ],
    tips: ["Apply via Common App (commonapp.org) or Coalition App", "Essays matter enormously — start writing in Class 11", "GPA equivalent: 90%+ in Class 12 is competitive", "SAT: 1400+ for top schools, 1500+ for Ivy/MIT/Stanford", "Apply for financial aid at need-blind schools (MIT, Harvard, Princeton, Yale)", "Reach out to Indian students at target universities for insights"],
  },
  {
    country: "UK 🇬🇧", flag: "🇬🇧", color: "#ef4444",
    tagline: "3-year degrees. Prestigious brands. Rich academic heritage.",
    exams: ["IELTS 6.5–7.0 / TOEFL 90+", "No SAT required (Class 12 marks accepted)", "UKCAT/BMAT for Medicine"],
    timeline: "UCAS opens Sept | Oxford/Cambridge: Oct 15 | Other unis: Jan 15",
    cost: "£25,000–40,000/year (tuition + living)",
    visa: "UK Student Visa (formerly Tier 4)",
    workAllowed: "20 hrs/week during term, full-time in holidays. 2-yr Graduate Route after graduation",
    universities: [
      { name: "Imperial College London", rank: 6, field: "Engineering, Medicine, Science", note: "Top STEM university" },
      { name: "University College London (UCL)", rank: 9, field: "All disciplines", note: "London's global university" },
      { name: "University of Edinburgh", rank: 22, field: "CS, Engineering, Medicine", note: "Scotland's finest" },
      { name: "University of Manchester", rank: 32, field: "Engineering, Business", note: "Major research university" },
      { name: "University of Warwick", rank: 67, field: "CS, Mathematics, Economics", note: "Strong STEM & quant" },
      { name: "King's College London (KCL)", rank: 40, field: "Law, Medicine, Humanities", note: "Russell Group prestige" },
    ],
    tips: ["Apply via UCAS (ucas.com) — one application, up to 5 choices", "Personal Statement (4,000 characters): Crucial, subject-focused NOT life story", "No interviews except Oxford/Cambridge", "Indian Class 12 marks: 85%+ for good universities, 90%+ for Imperial/UCL", "Oxford/Cambridge: Research specific college, prepare for admission tests (STEP, MAT, PAT, etc.)", "Student Finance: Only for UK residents — international students pay full fees"],
  },
  {
    country: "Canada 🇨🇦", flag: "🇨🇦", color: "#dc2626",
    tagline: "Post-study work rights. Pathway to PR. High quality of life.",
    exams: ["IELTS 6.5+ / TOEFL 90+", "No standardized entrance exam required", "Strong Class 12 marks (85%+)"],
    timeline: "Apply Oct–Jan for Sept intake | Decisions: Feb–April",
    cost: "CAD 25,000–45,000/year",
    visa: "Canadian Student Visa (Study Permit)",
    workAllowed: "20 hrs/week. PGWP (Post-Graduation Work Permit): Up to 3 years after graduation. Pathway to PR!",
    universities: [
      { name: "University of Toronto", rank: 21, field: "Engineering, CS, Medicine", note: "Canada's #1" },
      { name: "University of British Columbia", rank: 34, field: "CS, Engineering, Sciences", note: "Vancouver's gem" },
      { name: "McGill University", rank: 46, field: "Medicine, Law, Sciences", note: "Montreal's elite" },
      { name: "University of Waterloo", rank: 112, field: "CS, Math, Engineering", note: "Co-op = best placements" },
      { name: "McMaster University", rank: 189, field: "Engineering, Health Sciences", note: "Strong research" },
      { name: "University of Alberta", rank: 110, field: "Petroleum, CS, Science", note: "Affordable + good rankings" },
    ],
    tips: ["Apply directly to universities — no national portal", "Waterloo has legendary co-op program (paid internships every semester)", "Quebec universities (McGill): French language environment, but English programs available", "PGWP is biggest advantage — work in Canada for up to 3 years post-graduation", "Express Entry PR pathway: Canadian degree + work experience makes you very competitive", "Cost of living: Toronto/Vancouver expensive; smaller cities cheaper"],
  },
  {
    country: "Germany 🇩🇪", flag: "🇩🇪", color: "#f59e0b",
    tagline: "Free/near-free education. Engineering powerhouse. Startup ecosystem.",
    exams: ["TestAS (optional but helpful for visa)", "German B2/C1 OR English B2+", "No separate entrance exam"],
    timeline: "Apply April–July for Winter intake (Oct) | Nov–Jan for Summer (April)",
    cost: "€500–1,500/semester (only admin fee!) + €800–1,200/month living costs",
    visa: "German Student Visa (national visa type D)",
    workAllowed: "120 full days / 240 half days per year. 18 months Job-Seeker Visa after graduation",
    universities: [
      { name: "TU Munich (TUM)", rank: 37, field: "Engineering, CS, Natural Sciences", note: "Germany's MIT" },
      { name: "KIT (Karlsruhe)", rank: 119, field: "Engineering, Physics, CS", note: "Elite engineering" },
      { name: "RWTH Aachen", rank: 106, field: "Mechanical, Electrical Engineering", note: "Auto industry nexus" },
      { name: "TU Berlin", rank: 154, field: "Engineering, Economics, CS", note: "Capital city advantage" },
      { name: "Heidelberg University", rank: 43, field: "Sciences, Medicine, Humanities", note: "Germany's oldest" },
      { name: "LMU Munich", rank: 59, field: "Sciences, Economics, Medicine", note: "Top research university" },
    ],
    tips: ["Most public universities: Nearly FREE (only €150–500/semester admin fee)", "Learn German (B2 level minimum for German-taught programs) — it opens doors", "English-taught Masters programs growing rapidly (CS, Engineering, MBA)", "DAAD Scholarships: Prestigious government scholarships for Indian students", "Blocked Account: Show €11,208/year in a blocked German bank account for visa", "APS Certificate: Indians require APS (Academic Evaluation Centre) verification of documents — start early!"],
  },
  {
    country: "Australia 🇦🇺", flag: "🇦🇺", color: "#10b981",
    tagline: "Safe, multicultural, strong post-study work rights.",
    exams: ["IELTS 6.5+ / PTE 58+ / TOEFL 79+", "No entrance exam — Class 12 marks based", "SAT sometimes accepted"],
    timeline: "Apply July–Oct for Feb intake | Nov–Feb for July intake",
    cost: "AUD 35,000–55,000/year",
    visa: "Student Visa (Subclass 500)",
    workAllowed: "48 hrs/fortnight during term. Post-Study Work Visa: 2–4 years based on degree level and location",
    universities: [
      { name: "University of Melbourne", rank: 14, field: "Engineering, Medicine, Sciences", note: "Australia's best" },
      { name: "University of New South Wales (UNSW)", rank: 19, field: "Engineering, CS, Business", note: "Top engineering" },
      { name: "University of Sydney", rank: 18, field: "Medicine, Law, Engineering", note: "Sydney's flagship" },
      { name: "Monash University", rank: 37, field: "Pharmacy, Engineering, Sciences", note: "Melbourne's global uni" },
      { name: "Australian National University (ANU)", rank: 30, field: "Science, Politics, Law", note: "Capital city research" },
      { name: "University of Queensland", rank: 43, field: "Life Sciences, Engineering", note: "Brisbane's best" },
    ],
    tips: ["Strong Indian community — easier social transition", "Class 12 marks: 85–90%+ for top universities (Melbourne, UNSW, Sydney)", "Engineering: Choose AIDAB (Australian Institute for Data and Analytics) recognition for professional mobility", "Part-time work: 48 hrs/fortnight — enough to cover daily expenses", "Post-study work visa (Subclass 485): 2 years for bachelor's, more for regional unis", "PR pathway: Points-based skilled migration — engineering/IT degrees valued highly"],
  },
  {
    country: "Singapore 🇸🇬", flag: "🇸🇬", color: "#a855f7",
    tagline: "Asia's best universities. Short flight from India. High-value degree.",
    exams: ["SAT 1400+ OR A-Levels OR IB", "IELTS 7.0+ / TOEFL 100+ (for some programs)", "Strong Class 12 needed (90%+)"],
    timeline: "Apply Dec–Feb for August intake (NUS/NTU). Very competitive.",
    cost: "SGD 25,000–40,000/year",
    visa: "Student Pass",
    workAllowed: "16 hrs/week during term. 1 year Training Employment Pass after graduation",
    universities: [
      { name: "NUS (National University of Singapore)", rank: 8, field: "CS, Engineering, Business", note: "Asia's #1 university" },
      { name: "NTU (Nanyang Technological University)", rank: 15, field: "Engineering, Sciences, AI", note: "World-class engineering" },
      { name: "SMU (Singapore Management University)", rank: 551+, field: "Business, Law, Information Systems", note: "Strong finance/law" },
    ],
    tips: ["NUS/NTU are among TOP 15 universities globally — huge ROI", "Very competitive — need 90%+ in Class 12 boards AND strong SAT/A-levels", "Scholarships: ASEAN scholarships not for Indians, but NUS/NTU merit scholarships available", "Safe, clean, English-speaking environment — easy for Indian students", "Strong global alumni network, esp in Southeast Asia and tech industry", "Application portal: apply.nus.edu.sg / admissions.ntu.edu.sg"],
  },
];

/* ─── TOP COLLEGES SUMMARY DATA ─────────────────────────────────────────── */
const TOP_COLLEGES_DATA = [
  { name:"IIT Madras", type:"IIT", exam:"JEE Advanced", nirf:1, csRank:"1–125", fees:"~₹2.2L/yr", city:"Chennai", color:"#6366f1" },
  { name:"IIT Delhi", type:"IIT", exam:"JEE Advanced", nirf:2, csRank:"1–60", fees:"~₹2.2L/yr", city:"New Delhi", color:"#6366f1" },
  { name:"IIT Bombay", type:"IIT", exam:"JEE Advanced", nirf:3, csRank:"1–67", fees:"~₹2.2L/yr", city:"Mumbai", color:"#6366f1" },
  { name:"IIT Kanpur", type:"IIT", exam:"JEE Advanced", nirf:4, csRank:"63–180", fees:"~₹2.2L/yr", city:"Kanpur", color:"#6366f1" },
  { name:"IIT Kharagpur", type:"IIT", exam:"JEE Advanced", nirf:5, csRank:"100–280", fees:"~₹1.4L/yr", city:"Kharagpur", color:"#6366f1" },
  { name:"IIT Roorkee", type:"IIT", exam:"JEE Advanced", nirf:6, csRank:"200–500", fees:"~₹2.2L/yr", city:"Roorkee", color:"#6366f1" },
  { name:"NIT Trichy", type:"NIT", exam:"JEE Main", nirf:9, csRank:"1.2K–4.5K (HS)", fees:"~₹1.5L/yr", city:"Tiruchirappalli", color:"#10b981" },
  { name:"NIT Warangal", type:"NIT", exam:"JEE Main", nirf:28, csRank:"300–4.8K (OS)", fees:"~₹1.4L/yr", city:"Warangal", color:"#10b981" },
  { name:"NIT Surathkal", type:"NIT", exam:"JEE Main", nirf:26, csRank:"500–5.5K (OS)", fees:"~₹1.6L/yr", city:"Mangalore", color:"#10b981" },
  { name:"NIT Calicut", type:"NIT", exam:"JEE Main", nirf:30, csRank:"600–6K (OS)", fees:"~₹1.4L/yr", city:"Kozhikode", color:"#10b981" },
  { name:"BITS Pilani", type:"BITS", exam:"BITSAT", nirf:24, csRank:"350+ score", fees:"~₹5.8L/yr", city:"Pilani", color:"#10b981" },
  { name:"BITS Goa", type:"BITS", exam:"BITSAT", nirf:null, csRank:"330+ score", fees:"~₹5.5L/yr", city:"Goa", color:"#10b981" },
  { name:"VIT Vellore", type:"Deemed", exam:"VITEEE", nirf:11, csRank:"Top 25K rank", fees:"~₹2.0L/yr", city:"Vellore", color:"#ec4899" },
  { name:"IIIT Hyderabad", type:"IIIT", exam:"JEE Main/UGEE", nirf:null, csRank:"2K–6K (JoSAA)", fees:"~₹2.5L/yr", city:"Hyderabad", color:"#f59e0b" },
  { name:"Jadavpur University", type:"State Univ.", exam:"WBJEE", nirf:15, csRank:"Top 1K (WBJEE)", fees:"~₹50K/yr", city:"Kolkata", color:"#14b8a6" },
  { name:"DTU Delhi", type:"State Univ.", exam:"JEE Main", nirf:36, csRank:"Delhi Quota", fees:"~₹1.7L/yr", city:"New Delhi", color:"#8b5cf6" },
  { name:"PES University", type:"Private", exam:"COMEDK/PESSAT", nirf:null, csRank:"COMEDK 1–800", fees:"~₹3.5L/yr", city:"Bangalore", color:"#f97316" },
  { name:"Thapar University", type:"Deemed", exam:"JEE Main", nirf:43, csRank:"JEE Merit", fees:"~₹2.5L/yr", city:"Patiala", color:"#64748b" },
  { name:"COEP Pune", type:"Govt (Auto)", exam:"MHT-CET", nirf:null, csRank:"Top MHT-CET", fees:"~₹1.5L/yr", city:"Pune", color:"#8b5cf6" },
  { name:"Anna University (CEG)", type:"State Univ.", exam:"TNEA", nirf:12, csRank:"TNEA Merit", fees:"~₹50K/yr", city:"Chennai", color:"#64748b" },
];

/* ─── UPCOMING EXAMS ─────────────────────────────────────────────────────── */
const UPCOMING = [
  { exam:"VITEEE", date:"21–27 Apr 2025", days:null, color:"#ec4899" },
  { exam:"WBJEE", date:"27 Apr 2025", days:null, color:"#14b8a6" },
  { exam:"COMEDK", date:"11 May 2025", days:null, color:"#f97316" },
  { exam:"BITSAT Phase 1", date:"20–26 May 2025", days:null, color:"#10b981" },
  { exam:"JEE Advanced", date:"18 May 2025", days:null, color:"#f59e0b" },
  { exam:"JoSAA Starts", date:"June 2025", days:null, color:"#8b5cf6" },
];

/* ─── COUNSELLOR QUICK PROMPTS ───────────────────────────────────────────── */
const QUICK_PROMPTS = [
  "Walk me through the complete JEE Main to IIT seat allocation process",
  "My JEE Main rank is 15,000. Which NITs and branches can I get?",
  "Explain JoSAA Float vs Accept vs Slide strategy",
  "How does BITSAT admission work? It's different from JoSAA, right?",
  "I got 95 percentile in JEE Main. Am I eligible for JEE Advanced?",
  "What should I do after JEE Advanced result if I'm not satisfied?",
  "Compare studying in USA vs Germany vs Canada — costs, ROI, visa",
  "I'm from OBC-NCL category. How does reservation work in JoSAA?",
  "What documents do I need for JoSAA counselling?",
  "How should I fill my choices in JoSAA to maximize my chances?",
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN APP                                                                   */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  useFonts();
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("dashboard");
  const t = dark ? T.dark : T.light;

  const baseStyle = {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: t.bg, color: t.text,
    minHeight: "100vh", transition: "background 0.35s, color 0.35s",
  };

  return (
    <div style={baseStyle}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        .hover-card:hover { transform: translateY(-3px); box-shadow: ${t.shadow}; }
        .hover-card { transition: transform 0.2s, box-shadow 0.2s; }
        .pill-btn:hover { opacity: 0.85; transform: scale(1.02); }
        .pill-btn { transition: opacity 0.15s, transform 0.15s; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .anim-fadeup { animation: fadeUp 0.4s ease forwards; }
        .spin { animation: spin 1s linear infinite; }
        .step-dot { transition: background 0.2s, transform 0.2s; }
      `}</style>
      <Header dark={dark} setDark={setDark} tab={tab} setTab={setTab} t={t} />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 80px", paddingTop: 80 }}>
        {tab === "dashboard" && <Dashboard t={t} setTab={setTab} />}
        {tab === "guide" && <ExamGuide t={t} />}
        {tab === "josaa" && <JoSAAGuide t={t} />}
        {tab === "counsellor" && <AICounsellor t={t} dark={dark} />}
        {tab === "colleges" && <IndiaColleges t={t} />}
        {tab === "collegesearch" && <CollegeSearch t={t} />}
        {tab === "abroad" && <StudyAbroad t={t} />}
      </main>
    </div>
  );
}

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
function Header({ dark, setDark, tab, setTab, t }) {
  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: "⚡" },
    { id: "guide", label: "Exam Guide", icon: "📖" },
    { id: "josaa", label: "JoSAA Guide", icon: "📋" },
    { id: "counsellor", label: "AI Counsellor", icon: "🤖" },
    { id: "colleges", label: "Colleges India", icon: "🏛️" },
    { id: "collegesearch", label: "College Search", icon: "🔍" },
    { id: "abroad", label: "Study Abroad", icon: "🌍" },
  ];
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: t.headBg, backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${t.border}`,
      display: "flex", alignItems: "center", gap: 8,
      padding: "0 20px", height: 58, overflowX: "auto",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0, marginRight:12 }}>
        <span style={{ fontSize:22 }}>🎓</span>
        <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:15, color:t.accent, letterSpacing:"-0.3px" }}>ExamReady</span>
        <span style={{ fontSize:11, color:t.textMuted, fontWeight:500 }}>India</span>
      </div>
      <nav style={{ display:"flex", gap:4, flexGrow:1 }}>
        {TABS.map(x => (
          <button key={x.id} onClick={() => setTab(x.id)} className="pill-btn" style={{
            padding:"5px 11px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12.5, fontWeight:600,
            whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif",
            background: tab===x.id ? t.accent : "transparent",
            color: tab===x.id ? (dark?"#000":"#fff") : t.textMuted,
          }}>
            <span style={{ marginRight:4 }}>{x.icon}</span>{x.label}
          </button>
        ))}
      </nav>
      <button onClick={() => setDark(d=>!d)} className="pill-btn" style={{
        flexShrink:0, padding:"5px 12px", borderRadius:20, border:`1px solid ${t.border}`,
        background:"transparent", cursor:"pointer", fontSize:13, color:t.text, fontWeight:600,
      }}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────────────────────── */
function Dashboard({ t, setTab }) {
  return (
    <div className="anim-fadeup">
      {/* Hero */}
      <div style={{
        borderRadius:20, padding:"36px 32px", marginBottom:24,
        background: t.bgCard2, border:`1px solid ${t.border}`,
        backgroundImage: t.gradHero, position:"relative", overflow:"hidden"
      }}>
        <div style={{ position:"absolute", right:24, top:20, fontSize:80, opacity:0.07, userSelect:"none" }}>🎓</div>
        <div style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, letterSpacing:"-0.5px", marginBottom:8 }}>
          Welcome to <span style={{ color:t.accent }}>ExamReady India</span>
        </div>
        <div style={{ color:t.textMuted, fontSize:15, maxWidth:560, lineHeight:1.6 }}>
          Your complete guide from <strong style={{ color:t.text }}>Class 12 to Final Seat Allocation</strong> — JEE, BITSAT, VITEEE, WBJEE, COMEDK, and Study Abroad paths covered.
        </div>
        <div style={{ marginTop:20, display:"flex", gap:10, flexWrap:"wrap" }}>
          {[
            { label:"Step-by-Step Exam Guide", tab:"guide", icon:"📖", accent:true },
            { label:"Talk to AI Counsellor", tab:"counsellor", icon:"🤖", accent:false },
            { label:"Explore Study Abroad", tab:"abroad", icon:"🌍", accent:false },
          ].map(b => (
            <button key={b.tab} onClick={() => setTab(b.tab)} className="pill-btn" style={{
              padding:"9px 18px", borderRadius:10, border: b.accent ? "none" : `1px solid ${t.border}`,
              background: b.accent ? t.accent : t.bgInput, color: b.accent ? (t===T.dark?"#000":"#fff") : t.text,
              cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif",
            }}>
              {b.icon} {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12, marginBottom:24 }}>
        {[
          { label:"Exams Covered", val:"8+", icon:"📚", color:t.accent },
          { label:"Colleges in DB", val:"100+", icon:"🏛️", color:t.success },
          { label:"Foreign Countries", val:"6", icon:"🌍", color:t.accentSub },
          { label:"Steps Documented", val:"50+", icon:"📋", color:t.warn },
          { label:"AI Counsellor", val:"24/7", icon:"🤖", color:t.info },
        ].map(s => (
          <div key={s.label} className="hover-card" style={{
            background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"16px 18px",
          }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
            <div style={{ fontSize:12, color:t.textMuted, fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming exams */}
      <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16, padding:"20px 22px", marginBottom:24 }}>
        <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:16, marginBottom:14 }}>
          📅 Upcoming Exam Dates 2025
        </div>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {UPCOMING.map(u => (
            <div key={u.exam} style={{
              background:t.bgCard2, border:`1px solid ${t.border}`, borderRadius:10,
              padding:"10px 14px", minWidth:150,
            }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:u.color, marginBottom:6 }}></div>
              <div style={{ fontWeight:700, fontSize:13, color:t.text }}>{u.exam}</div>
              <div style={{ fontSize:11.5, color:t.textMuted, marginTop:3 }}>{u.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick nav cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14 }}>
        {[
          { tab:"guide", icon:"📖", color:"#6366f1", title:"Step-by-Step Exam Guides", desc:"Complete phases for JEE, BITSAT, VITEEE, COMEDK — from registration to seat allocation." },
          { tab:"josaa", icon:"📋", color:"#8b5cf6", title:"JoSAA Counselling Guide", desc:"Float, Slide, Accept, Withdraw explained simply. HS/OS quota, choice-filling strategy, checklist." },
          { tab:"counsellor", icon:"🤖", color:t.accent, title:"AI Counsellor (Groq)", desc:"Ask any question about JEE, cutoffs, counselling strategies, category reservations — answered in seconds." },
          { tab:"collegesearch", icon:"🔍", color:"#38bdf8", title:"Find Any College in India", desc:"Search any engineering college — get its official website, location, exam, and type instantly." },
          { tab:"colleges", icon:"🏛️", color:t.success, title:"College Explorer India", desc:"Browse IITs, NITs, BITS, and 100+ colleges with cutoff ranks, fees, and ratings." },
          { tab:"abroad", icon:"🌍", color:t.accentSub, title:"Study Abroad Guide", desc:"USA, UK, Canada, Germany, Australia, Singapore — exams, costs, visa, top universities." },
        ].map(c => (
          <div key={c.tab} className="hover-card" onClick={() => setTab(c.tab)} style={{
            background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16,
            padding:"22px 22px", cursor:"pointer",
          }}>
            <div style={{ fontSize:32, marginBottom:10 }}>{c.icon}</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, color:c.color, marginBottom:6 }}>{c.title}</div>
            <div style={{ fontSize:13, color:t.textMuted, lineHeight:1.6 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── EXAM GUIDE ─────────────────────────────────────────────────────────── */
function ExamGuide({ t }) {
  const exams = Object.keys(EXAM_GUIDES);
  const [selected, setSelected] = useState("JEE Main");
  const [openPhase, setOpenPhase] = useState(0);
  const guide = EXAM_GUIDES[selected];

  return (
    <div className="anim-fadeup">
      <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, marginBottom:4 }}>📖 Step-by-Step Exam Guide</div>
      <div style={{ color:t.textMuted, fontSize:14, marginBottom:20 }}>Every phase explained — from eligibility to final seat. Click an exam to begin.</div>

      {/* Exam selector */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        {exams.map(e => {
          const g = EXAM_GUIDES[e];
          return (
            <button key={e} onClick={() => { setSelected(e); setOpenPhase(0); }} className="pill-btn" style={{
              padding:"8px 16px", borderRadius:10, border:`1px solid ${selected===e ? g.color : t.border}`,
              background: selected===e ? g.color+"22" : t.bgCard, color: selected===e ? g.color : t.textMuted,
              cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif",
            }}>
              {g.icon} {e}
            </button>
          );
        })}
      </div>

      {/* Guide header */}
      <div style={{
        background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16,
        padding:"22px 24px", marginBottom:16,
        borderLeft:`4px solid ${guide.color}`
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:32 }}>{guide.icon}</span>
          <div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20, color:guide.color }}>{selected}</div>
            <div style={{ color:t.textMuted, fontSize:13, marginTop:2 }}>{guide.subtitle}</div>
          </div>
          <div style={{ marginLeft:"auto", background:guide.color+"22", color:guide.color, borderRadius:8, padding:"4px 10px", fontSize:12, fontWeight:700 }}>
            {guide.phases.length} Phases
          </div>
        </div>
      </div>

      {/* Phases accordion */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {guide.phases.map((phase, i) => (
          <div key={i} style={{
            background:t.bgCard, border:`1px solid ${openPhase===i ? guide.color+"55" : t.border}`,
            borderRadius:14, overflow:"hidden", transition:"border-color 0.2s",
          }}>
            <button onClick={() => setOpenPhase(openPhase===i ? -1 : i)} style={{
              width:"100%", padding:"16px 20px", display:"flex", alignItems:"center", gap:12,
              background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
            }}>
              <div style={{
                width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
                background: openPhase===i ? guide.color : t.bgCard2, border:`2px solid ${guide.color}`,
                fontSize:14, fontWeight:800, color: openPhase===i ? (t===T.dark?"#000":"#fff") : guide.color,
                fontFamily:"'Sora',sans-serif",
              }}>
                {i+1}
              </div>
              <div style={{ flexGrow:1 }}>
                <div style={{ fontSize:11, color:guide.color, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{phase.phase}</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, color:t.text, marginTop:2 }}>
                  {phase.icon} {phase.title}
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                <span style={{ fontSize:11, color:t.textMuted, background:t.bgCard2, padding:"3px 8px", borderRadius:6 }}>{phase.duration}</span>
                <span style={{ color:t.textMuted, fontSize:16, transform: openPhase===i ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▼</span>
              </div>
            </button>
            {openPhase===i && (
              <div style={{ padding:"0 20px 20px 64px", animation:"fadeUp 0.25s ease" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {phase.steps.map((step, si) => (
                    <div key={si} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                      <div style={{
                        width:22, height:22, flexShrink:0, borderRadius:"50%",
                        background:guide.color+"22", border:`1px solid ${guide.color}44`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:11, fontWeight:700, color:guide.color, marginTop:1,
                      }}>{si+1}</div>
                      <div style={{ fontSize:13.5, color:t.text, lineHeight:1.65, fontWeight:450 }}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── AI COUNSELLOR ──────────────────────────────────────────────────────── */
function AICounsellor({ t, dark }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const SYSTEM = `You are ExamReady Counsellor — an expert guide for Indian engineering entrance exams and higher education abroad. You have deep, precise knowledge of:

INDIAN EXAMS:
- JEE Main (NTA, 2 sessions, percentile scoring, JoSAA counselling for NITs/IIITs/GFTIs)
- JEE Advanced (IIT exam, top 2.5L from JEE Main, 2 papers, JoSAA for IITs)
- JoSAA Counselling (6 rounds, Float/Accept/Slide/Withdraw strategy, HS vs OS quota, document verification, fee structure)
- BITSAT (BITS Pilani/Goa/Hyderabad, 150 Qs no negative except structure, iteration-based admission NOT JoSAA)
- VITEEE (VIT campuses, no negative marking, counselling rounds)
- COMEDK (Karnataka private colleges, UniGauge counselling)
- WBJEE (Pen-paper OMR, Jadavpur University via WBJEE)
- MHT-CET (Maharashtra CAP rounds)

RESERVATION CATEGORIES: General, OBC-NCL (27%), SC (15%), ST (7.5%), EWS (10%), PwD — how each affects rank cutoffs in JoSAA.

FOREIGN UNIVERSITY ADMISSIONS:
- USA: Common App, SAT/ACT, TOEFL/IELTS, EA/ED/RD deadlines, financial aid at need-blind schools
- UK: UCAS, personal statement, no SAT needed, 3-year degrees
- Canada: No entrance exam, PGWP post-study work advantage, Waterloo co-op
- Germany: Free education at public unis, APS certificate for Indians, DAAD scholarships
- Australia: IELTS, post-study work visa, PR pathway
- Singapore: NUS/NTU highly competitive, SAT or A-levels

Style: Be warm, encouraging, and precise. When explaining processes, use numbered steps. When discussing ranks/cutoffs, give specific numbers. Assume the student knows NOTHING about the process — explain from scratch. Be practical and honest. Avoid vague generic advice. Always mention what to do NEXT.`;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const newMsgs = [...messages, { role:"user", content: msg }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method:"POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          system: SYSTEM,
          messages: newMsgs.map(m => ({ role:m.role, content:m.content })),
        })
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't process that. Please try again.";
      setMessages([...newMsgs, { role:"assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role:"assistant", content:"⚠️ Connection error. Please check your internet and try again." }]);
    }
    setLoading(false);
  }

  return (
    <div className="anim-fadeup" style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, marginBottom:4 }}>🤖 AI Exam Counsellor</div>
        <div style={{ color:t.textMuted, fontSize:14 }}>Powered by Groq · Llama 3.3 70B · Ask anything about JEE, BITSAT, VITEEE, JoSAA, Study Abroad, reservations, counselling strategy — explained from scratch.</div>
      </div>

      {/* Quick prompts */}
      {messages.length === 0 && (
        <div>
          <div style={{ fontSize:13, color:t.textMuted, marginBottom:10, fontWeight:600 }}>💡 Try asking:</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {QUICK_PROMPTS.map(q => (
              <button key={q} onClick={() => send(q)} className="pill-btn" style={{
                padding:"7px 13px", borderRadius:20, border:`1px solid ${t.border}`,
                background:t.bgCard, color:t.text, cursor:"pointer", fontSize:12.5, fontWeight:500,
                textAlign:"left", fontFamily:"'DM Sans',sans-serif", maxWidth:320,
              }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat messages */}
      {messages.length > 0 && (
        <div style={{
          background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16,
          padding:"16px", maxHeight:480, overflowY:"auto",
          display:"flex", flexDirection:"column", gap:14,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display:"flex", gap:10, justifyContent: m.role==="user" ? "flex-end" : "flex-start" }}>
              {m.role==="assistant" && (
                <div style={{ width:32, height:32, borderRadius:"50%", background:t.accent+"22", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
              )}
              <div style={{
                maxWidth:"80%", padding:"11px 15px", borderRadius:14, fontSize:13.5, lineHeight:1.7,
                background: m.role==="user" ? t.accent : t.bgCard2,
                color: m.role==="user" ? (dark?"#000":"#fff") : t.text,
                borderRadius: m.role==="user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                whiteSpace:"pre-wrap", fontWeight: m.role==="user" ? 600 : 400,
              }}>
                {m.content}
              </div>
              {m.role==="user" && (
                <div style={{ width:32, height:32, borderRadius:"50%", background:t.accentSub+"22", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🧑</div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:t.accent+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
              <div style={{ background:t.bgCard2, padding:"11px 15px", borderRadius:"14px 14px 14px 4px" }}>
                <span style={{ display:"inline-flex", gap:4 }}>
                  {[0,1,2].map(d => <span key={d} style={{ width:6,height:6, borderRadius:"50%", background:t.accent, display:"inline-block", animation:`pulse 1.2s ease ${d*0.3}s infinite` }}></span>)}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>
      )}

      {/* Input */}
      <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if(e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Type your question… (e.g. 'What rank do I need for NIT Trichy CS?')"
          rows={2}
          style={{
            flexGrow:1, padding:"12px 16px", borderRadius:12, border:`1px solid ${t.border}`,
            background:t.bgInput, color:t.text, fontSize:14, resize:"none", outline:"none",
            fontFamily:"'DM Sans',sans-serif", lineHeight:1.5,
          }}
        />
        <button onClick={() => send()} disabled={!input.trim() || loading} className="pill-btn" style={{
          padding:"12px 20px", borderRadius:12, border:"none",
          background: !input.trim() || loading ? t.borderLight : t.accent,
          color: dark?"#000":"#fff", cursor: !input.trim() || loading ? "not-allowed" : "pointer",
          fontWeight:700, fontSize:14, flexShrink:0, height:52,
        }}>
          {loading ? "..." : "Send ↑"}
        </button>
      </div>

      {messages.length > 0 && (
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button onClick={() => setMessages([])} className="pill-btn" style={{
            padding:"5px 12px", borderRadius:8, border:`1px solid ${t.border}`,
            background:"transparent", color:t.textMuted, cursor:"pointer", fontSize:12,
          }}>🗑 Clear Chat</button>
          {["What should I do next?", "Explain that in simpler terms", "Give me a checklist"].map(q => (
            <button key={q} onClick={() => send(q)} className="pill-btn" style={{
              padding:"5px 12px", borderRadius:8, border:`1px solid ${t.border}`,
              background:t.bgCard, color:t.textMuted, cursor:"pointer", fontSize:12,
            }}>{q}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── INDIA COLLEGES ─────────────────────────────────────────────────────── */
function IndiaColleges({ t }) {
  const types = ["All", "IIT", "NIT", "BITS", "IIIT", "Deemed", "State Univ.", "Private", "Govt (Auto)"];
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = TOP_COLLEGES_DATA.filter(c =>
    (filter==="All" || c.type===filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="anim-fadeup">
      <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, marginBottom:4 }}>🏛️ College Explorer — India</div>
      <div style={{ color:t.textMuted, fontSize:14, marginBottom:16 }}>Browse top engineering colleges with cutoff ranks, fees, and admission exam info.</div>

      <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search college or city..."
          style={{ flex:1, minWidth:200, padding:"9px 14px", borderRadius:10, border:`1px solid ${t.border}`, background:t.bgInput, color:t.text, fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
      </div>

      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:18 }}>
        {types.map(tp => (
          <button key={tp} onClick={() => setFilter(tp)} className="pill-btn" style={{
            padding:"5px 12px", borderRadius:20, border:`1px solid ${filter===tp ? t.accent : t.border}`,
            background: filter===tp ? t.accent+"22" : "transparent",
            color: filter===tp ? t.accent : t.textMuted, cursor:"pointer", fontSize:12.5, fontWeight:600,
          }}>{tp}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {filtered.map(c => (
          <div key={c.name} className="hover-card" style={{
            background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16, padding:"18px 20px",
            borderLeft:`3px solid ${c.color}`,
          }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
              <div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14.5, color:t.text }}>{c.name}</div>
                <div style={{ fontSize:12, color:t.textMuted, marginTop:2 }}>{c.city}</div>
              </div>
              <span style={{ background:c.color+"22", color:c.color, borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700, flexShrink:0 }}>{c.type}</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {[
                { icon:"📝", label:"Exam", val:c.exam },
                { icon:"🎯", label:"CS Cutoff", val:c.csRank },
                { icon:"💰", label:"Fees/yr", val:c.fees },
                c.nirf && { icon:"🏆", label:"NIRF Rank", val:`#${c.nirf}` },
              ].filter(Boolean).map(row => (
                <div key={row.label} style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:13 }}>{row.icon}</span>
                  <span style={{ fontSize:12, color:t.textMuted, minWidth:70 }}>{row.label}</span>
                  <span style={{ fontSize:12.5, color:t.text, fontWeight:600 }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign:"center", color:t.textMuted, padding:40, fontSize:14 }}>No colleges found for your search.</div>
      )}
    </div>
  );
}

/* ─── JOSAA COUNSELLING GUIDE ────────────────────────────────────────────── */
function JoSAAGuide({ t }) {
  const [openSection, setOpenSection] = useState(0);
  const [checklist, setChecklist] = useState({});

  const accent = "#8b5cf6";

  const CHECKLIST_ITEMS = [
    "JEE Main AIR (All India Rank) downloaded from NTA website",
    "JEE Advanced rank card (if applicable)",
    "Class 10 certificate — original + 2 photocopies",
    "Class 12 marksheet (provisional if final not out) — original + 2 copies",
    "Category certificate (SC/ST/OBC-NCL/EWS) — fresh, within 1 year for OBC-NCL",
    "Aadhaar card / Passport / Photo ID — original + 2 copies",
    "10 passport-sized photographs (white background)",
    "Researched previous year Opening/Closing ranks on josaa.nic.in",
    "Made a list of 50–100 college + branch choices in priority order",
    "₹45,000–50,000 ready for Seat Acceptance Fee",
    "Registered on josaa.nic.in with Application Number",
    "Scanned copies of all documents saved on phone + email",
  ];

  const SECTIONS = [
    {
      icon: "🤔", title: "What is Counselling?", color: "#6366f1",
      content: (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ fontSize:14, color:t.text, lineHeight:1.8 }}>
            After JEE results come out, you don't directly get admission to a college. You go through a <strong style={{color:accent}}>seat allocation process</strong> called counselling.
          </div>
          <div style={{
            background: accent+"15", border:`1px solid ${accent}33`, borderRadius:12,
            padding:"16px 18px", fontSize:13.5, color:t.text, lineHeight:1.8
          }}>
            <div style={{fontWeight:700, marginBottom:6, color:accent}}>The Simple Flow:</div>
            {["You score in JEE → You get a Rank", "You register on josaa.nic.in", "You fill a list of college + branch preferences", "JoSAA system automatically gives you the BEST seat from your list based on your rank", "This happens over 6 rounds across ~3 weeks in June–July"].map((s,i) => (
              <div key={i} style={{display:"flex", gap:10, marginBottom:6, alignItems:"flex-start"}}>
                <span style={{color:accent, fontWeight:800, flexShrink:0}}>{i+1}.</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ background:t.bgCard2, border:`1px solid ${t.border}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{fontWeight:700, fontSize:13, color:t.text, marginBottom:8}}>🏛️ Which colleges are in JoSAA?</div>
            {[["IITs (23 campuses)", "#f59e0b"], ["NITs (31 campuses)", "#10b981"], ["IIITs (26 campuses)", "#6366f1"], ["GFTIs (Govt Funded Technical Institutes)", "#38bdf8"]].map(([name, c]) => (
              <div key={name} style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
                <div style={{width:8, height:8, borderRadius:"50%", background:c, flexShrink:0}}></div>
                <span style={{fontSize:13, color:t.text}}>{name}</span>
              </div>
            ))}
            <div style={{marginTop:8, fontSize:12.5, color:t.textMuted}}>⚠️ BITS Pilani, VIT, Manipal are NOT in JoSAA — they have their own separate admission process.</div>
          </div>
        </div>
      )
    },
    {
      icon: "🔢", title: "Key Terms Explained", color: "#38bdf8",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          {[
            { term:"AIR (All India Rank)", color:"#6366f1", simple:"Your rank among ALL JEE students in India. AIR 1 = best. AIR 50,000 = 49,999 students scored more.", example:"Used for NIT/IIIT seats. For IITs, JEE Advanced rank is used instead." },
            { term:"HS Quota (Home State)", color:"#10b981", simple:"50% of NIT seats are reserved for students from THAT state. Competition is only within your state.", example:"NIT Trichy is in Tamil Nadu. Tamil Nadu students compete for HS seats. Students from other states compete for OS seats." },
            { term:"OS Quota (Other State)", color:"#f59e0b", simple:"Remaining 50% NIT seats open for students from ALL other states. Usually tougher cutoff.", example:"A student from UP applying to NIT Trichy competes in OS quota — needs a better rank than HS applicants." },
            { term:"Opening Rank", color:"#38bdf8", simple:"The best (lowest) rank that got allotted a particular seat in any round.", example:"NIT Warangal CS Opening Rank 300 means no one ranked worse than 300 got that seat in the first allotment." },
            { term:"Closing Rank", color:"#ec4899", simple:"The worst (highest number) rank that still got a seat. This is the most useful number.", example:"If NIT Warangal CS Closing Rank is 4,800 → anyone with AIR ≤ 4,800 likely qualifies." },
            { term:"Choice Filling", color:"#8b5cf6", simple:"You make a priority list of college+branch combinations (up to 25,000!). JoSAA gives you the BEST one your rank can get.", example:"Put IIT Bombay CS at #1 even if it seems impossible. You have nothing to lose — system gives best available option." },
            { term:"Mock Allotment", color:"#f97316", simple:"A practice run before Round 1. Not real. Use it to see if your choices are realistic.", example:"If mock shows you'd get NIT Surathkal Mechanical but you wanted CS → rearrange choices before Round 1 deadline." },
          ].map(item => (
            <div key={item.term} style={{
              background:t.bgCard2, border:`1px solid ${t.border}`, borderRadius:12, padding:"14px 16px",
              borderLeft:`3px solid ${item.color}`
            }}>
              <div style={{fontWeight:800, fontSize:14, color:item.color, marginBottom:6}}>{item.term}</div>
              <div style={{fontSize:13, color:t.text, lineHeight:1.7, marginBottom:6}}>{item.simple}</div>
              <div style={{fontSize:12, color:t.textMuted, background:t.bgCard, borderRadius:8, padding:"8px 10px", lineHeight:1.6}}>
                💡 <strong>Example:</strong> {item.example}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: "🔄", title: "The 4 Options After Each Round", color: "#10b981",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          <div style={{fontSize:13.5, color:t.textMuted, lineHeight:1.7}}>
            After every round of seat allotment, if you received a seat, you must choose ONE of these 4 options within 12–24 hours:
          </div>

          {/* Big 4 Cards */}
          {[
            {
              option:"✅ ACCEPT (Freeze)", color:"#10b981",
              tagline:"I'm happy. This seat is mine. Done.",
              what:"You pay the seat fee. This seat is locked for you. You do NOT participate in further rounds.",
              when:"When you got exactly what you wanted. OR when it's Round 6 (last round) — you must accept or lose everything.",
              risk:"No risk. But no further upgrade possible.",
              riskColor:"#10b981"
            },
            {
              option:"🌊 FLOAT", color:"#38bdf8",
              tagline:"Keep my seat AND try to upgrade to a better one.",
              what:"Your current seat is kept safely. JoSAA tries to move you to a higher-ranked choice next round. If upgrade available → you get it automatically. If not → you keep current seat.",
              when:"When you want a better college OR better branch than what you got. MOST students choose this.",
              risk:"Zero risk — you can NEVER go backward. You always stay at current seat or better.",
              riskColor:"#10b981"
            },
            {
              option:"🔀 SLIDE", color:"#f59e0b",
              tagline:"Stay at THIS college, but upgrade my branch.",
              what:"Your college is locked. JoSAA only looks for a better branch within your current institute in the next round.",
              when:"When you love the college and want a better branch there. E.g., got NIT Trichy Mechanical, want NIT Trichy CS.",
              risk:"Zero risk — you stay at same institute. But you CANNOT move to a different college.",
              riskColor:"#f59e0b"
            },
            {
              option:"🚪 WITHDRAW", color:"#ef4444",
              tagline:"I'm leaving JoSAA entirely.",
              what:"You lose your seat AND forfeit part of the fee paid (₹10,000–15,000 is non-refundable). You CANNOT re-enter JoSAA.",
              when:"Only if you've decided to go to BITS, VIT, or another non-JoSAA college, or taking a drop year.",
              risk:"⚠️ IRREVERSIBLE. No undo. Be absolutely sure before choosing this.",
              riskColor:"#ef4444"
            },
          ].map(item => (
            <div key={item.option} style={{
              background:t.bgCard, border:`2px solid ${item.color}33`, borderRadius:14, padding:"18px 20px",
              borderTop:`3px solid ${item.color}`
            }}>
              <div style={{fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16, color:item.color, marginBottom:4}}>{item.option}</div>
              <div style={{fontSize:13, color:t.textMuted, fontStyle:"italic", marginBottom:10}}>"{item.tagline}"</div>
              <div style={{display:"flex", flexDirection:"column", gap:8}}>
                <div style={{fontSize:13, color:t.text, lineHeight:1.7}}><strong style={{color:item.color}}>What happens:</strong> {item.what}</div>
                <div style={{fontSize:13, color:t.text, lineHeight:1.7}}><strong style={{color:item.color}}>Choose when:</strong> {item.when}</div>
                <div style={{
                  fontSize:12.5, color:item.riskColor, background:item.riskColor+"15",
                  borderRadius:8, padding:"7px 10px", fontWeight:600
                }}>⚡ Risk level: {item.risk}</div>
              </div>
            </div>
          ))}

          {/* Float vs Slide comparison */}
          <div style={{background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"18px 20px"}}>
            <div style={{fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, marginBottom:14}}>🆚 Float vs Slide — Quick Comparison</div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0, borderRadius:10, overflow:"hidden", border:`1px solid ${t.border}`}}>
              {[
                {label:"", float:"FLOAT 🌊", slide:"SLIDE 🔀"},
                {label:"Move to better college?", float:"✅ Yes", slide:"❌ No"},
                {label:"Upgrade branch?", float:"✅ Yes", slide:"✅ Yes"},
                {label:"Risk of losing current seat?", float:"❌ None", slide:"❌ None"},
                {label:"Best for", float:"Want better college OR branch", slide:"Love the college, want better branch"},
              ].map((row, i) => (
                <React.Fragment key={i}>
                  {["label","float","slide"].map(col => (
                    <div key={col} style={{
                      padding:"10px 12px", fontSize:12.5,
                      background: i===0 ? accent+"22" : i%2===0 ? t.bgCard2 : t.bgCard,
                      color: i===0 ? accent : col==="label" ? t.textMuted : t.text,
                      fontWeight: i===0 || col==="label" ? 700 : 400,
                      borderBottom: i<4 ? `1px solid ${t.border}` : "none",
                      borderRight: col !== "slide" ? `1px solid ${t.border}` : "none",
                      lineHeight:1.5
                    }}>
                      {row[col]}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div style={{marginTop:12, fontSize:13, color:t.textMuted, background:t.bgCard2, borderRadius:8, padding:"10px 12px"}}>
              💡 <strong style={{color:t.text}}>Simple rule:</strong> Choose <strong style={{color:"#38bdf8"}}>FLOAT</strong> in every round unless you're 100% happy with your college AND branch. Float has zero downside.
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "📅", title: "JoSAA Timeline", color: "#f59e0b",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <div style={{fontSize:13.5, color:t.textMuted, marginBottom:4}}>Approximate timeline every year (June–July after JEE Advanced result):</div>
          {[
            { week:"Week 1", event:"Registration opens on josaa.nic.in", detail:"Login with JEE Main/Advanced Application Number. Register and verify documents.", color:"#6366f1" },
            { week:"Week 1–2", event:"Choice Filling Window", detail:"Add up to 25,000 college+branch combinations in your priority order. You can edit choices until the window closes.", color:"#38bdf8" },
            { week:"Week 2", event:"Mock Allotment Released", detail:"Preview of where you'd get a seat. NOT real. Use this to rearrange choices if needed.", color:"#f59e0b" },
            { week:"Week 3", event:"Round 1 Allotment", detail:"First real allotment. Check your seat. Choose: Accept / Float / Slide / Withdraw within 24 hrs.", color:"#10b981" },
            { week:"Week 3–5", event:"Rounds 2–6 (every 3–4 days)", detail:"Each round: new allotment based on vacated seats. Keep choosing Float for upgrades.", color:"#10b981" },
            { week:"Week 6", event:"Spot Round (if seats vacant)", detail:"Only for students without a seat. Fresh registration required. Very tight 24-hr payment window.", color:"#f97316" },
            { week:"Week 7", event:"Report to Institute", detail:"Physically report to your allotted college within 3 days. Bring originals + copies of all documents.", color:"#8b5cf6" },
          ].map((item, i) => (
            <div key={i} style={{display:"flex", gap:14, alignItems:"flex-start"}}>
              <div style={{
                flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center",
              }}>
                <div style={{
                  width:38, height:38, borderRadius:"50%", background:item.color+"22",
                  border:`2px solid ${item.color}`, display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:11, fontWeight:800, color:item.color,
                  fontFamily:"'Sora',sans-serif", textAlign:"center", lineHeight:1.2
                }}>{i+1}</div>
                {i < 6 && <div style={{width:2, height:20, background:t.border, marginTop:4}}></div>}
              </div>
              <div style={{
                background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:12,
                padding:"12px 14px", flexGrow:1, marginBottom:4
              }}>
                <div style={{fontSize:11, color:item.color, fontWeight:700, textTransform:"uppercase", letterSpacing:0.8, marginBottom:3}}>{item.week}</div>
                <div style={{fontWeight:700, fontSize:14, color:t.text, marginBottom:4}}>{item.event}</div>
                <div style={{fontSize:13, color:t.textMuted, lineHeight:1.6}}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: "🏷️", title: "Reservations & Categories", color: "#ec4899",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <div style={{fontSize:13.5, color:t.text, lineHeight:1.8}}>
            Every college seat is split into categories. Your rank competes only within YOUR category.
          </div>
          {/* Seat split visual */}
          <div style={{background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"18px"}}>
            <div style={{fontWeight:700, fontSize:14, marginBottom:14, color:t.text}}>How 60 CS seats at an NIT are distributed:</div>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {[
                {cat:"General (Open)", pct:"40.5%", seats:24, color:"#6366f1", note:"Open to all"},
                {cat:"OBC-NCL", pct:"27%", seats:16, color:"#f59e0b", note:"Non-Creamy Layer certificate required"},
                {cat:"SC", pct:"15%", seats:9, color:"#10b981", note:"Schedule Caste certificate"},
                {cat:"ST", pct:"7.5%", seats:5, color:"#38bdf8", note:"Schedule Tribe certificate"},
                {cat:"EWS", pct:"10%", seats:6, color:"#f97316", note:"Income & Asset certificate (current year)"},
              ].map(item => (
                <div key={item.cat} style={{display:"flex", alignItems:"center", gap:10}}>
                  <div style={{
                    width:120, flexShrink:0, fontSize:12.5, fontWeight:700, color:item.color
                  }}>{item.cat}</div>
                  <div style={{flexGrow:1, height:24, background:t.bgCard2, borderRadius:6, overflow:"hidden"}}>
                    <div style={{
                      width:item.pct, height:"100%", background:item.color+"44",
                      borderRight:`2px solid ${item.color}`,
                      display:"flex", alignItems:"center", paddingLeft:8,
                      fontSize:11.5, fontWeight:700, color:item.color
                    }}>{item.seats} seats</div>
                  </div>
                  <div style={{fontSize:11, color:t.textMuted, width:40, textAlign:"right", flexShrink:0}}>{item.pct}</div>
                </div>
              ))}
            </div>
          </div>
          {/* PwD note */}
          <div style={{background:"#8b5cf622", border:"1px solid #8b5cf644", borderRadius:10, padding:"12px 14px"}}>
            <div style={{fontWeight:700, color:"#8b5cf6", fontSize:13, marginBottom:4}}>PwD (Person with Disability)</div>
            <div style={{fontSize:13, color:t.text, lineHeight:1.7}}>5% horizontal reservation in EACH category above. Means a PwD-General student competes in General PwD seats, not the open pool.</div>
          </div>
          {/* OBC warning */}
          <div style={{background:"#f59e0b22", border:"1px solid #f59e0b44", borderRadius:10, padding:"12px 14px"}}>
            <div style={{fontWeight:700, color:"#f59e0b", fontSize:13, marginBottom:4}}>⚠️ OBC-NCL Certificate Warning</div>
            <div style={{fontSize:13, color:t.text, lineHeight:1.7}}>
              The certificate must be: <strong>dated within the last 1 year</strong> AND must explicitly say <strong>"Non-Creamy Layer"</strong>. An old certificate or one without NCL text will be rejected during document verification — you'll lose your seat!
            </div>
          </div>
          {/* CRL explanation */}
          <div style={{background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:12, padding:"14px 16px"}}>
            <div style={{fontWeight:700, fontSize:13, color:t.text, marginBottom:6}}>What is CRL (Common Rank List)?</div>
            <div style={{fontSize:13, color:t.textMuted, lineHeight:1.7}}>Your overall rank ignoring category. A General student's AIR IS their CRL rank. Reserved category students have both a CRL rank and a Category rank. JoSAA uses category rank for filling reserved seats, and CRL rank for open/supernumerary seats.</div>
          </div>
        </div>
      )
    },
    {
      icon: "🎯", title: "Choice Filling Strategy", color: "#6366f1",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <div style={{
            background:"#6366f122", border:"1px solid #6366f133", borderRadius:12, padding:"14px 16px"
          }}>
            <div style={{fontWeight:800, fontSize:15, color:"#6366f1", marginBottom:8}}>The Golden Rule</div>
            <div style={{fontSize:14, color:t.text, lineHeight:1.8}}>
              Always put your <strong style={{color:"#6366f1"}}>DREAM choice at #1</strong>, even if it seems impossible. The system gives you the BEST available seat from your list. Putting a hard choice first has <strong>zero penalty</strong>.
            </div>
          </div>
          <div style={{background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"16px 18px"}}>
            <div style={{fontWeight:700, fontSize:14, color:t.text, marginBottom:12}}>📝 Recommended Filling Order:</div>
            {[
              {step:"1", title:"All IIT programs you want", desc:"IIT seats fill fast (Rounds 1–4). Put all desired IIT+branch combos first.", color:"#f59e0b"},
              {step:"2", title:"Top NITs (HS quota first)", desc:"If you're from Tamil Nadu → NIT Trichy/Surathkal HS quota. Home state cutoff is always better.", color:"#10b981"},
              {step:"3", title:"Other NITs (OS quota)", desc:"NITs from other states. Cross-check OS closing ranks from previous years.", color:"#38bdf8"},
              {step:"4", title:"IIITs you prefer", desc:"IIITs like IIIT Hyderabad, IIIT Bangalore have excellent placement records.", color:"#8b5cf6"},
              {step:"5", title:"GFTIs and backup options", desc:"Government funded institutes. Good safety net with affordable fees.", color:"#f97316"},
            ].map(item => (
              <div key={item.step} style={{display:"flex", gap:12, marginBottom:10, alignItems:"flex-start"}}>
                <div style={{
                  width:28, height:28, borderRadius:"50%", background:item.color+"22",
                  border:`1.5px solid ${item.color}`, display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:12, fontWeight:800, color:item.color, flexShrink:0
                }}>{item.step}</div>
                <div>
                  <div style={{fontWeight:700, fontSize:13.5, color:t.text}}>{item.title}</div>
                  <div style={{fontSize:12.5, color:t.textMuted, marginTop:2, lineHeight:1.6}}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <div style={{background:"#10b98122", border:"1px solid #10b98133", borderRadius:10, padding:"12px 14px"}}>
              <div style={{fontWeight:700, color:"#10b981", fontSize:13, marginBottom:6}}>✅ DO This</div>
              {["Fill 50–100 realistic choices minimum","Use josaa.nic.in previous year data","Keep HS quota options above OS","Fill everything — more = better chance"].map(s => (
                <div key={s} style={{fontSize:12.5, color:t.text, marginBottom:4}}>• {s}</div>
              ))}
            </div>
            <div style={{background:"#ef444422", border:"1px solid #ef444433", borderRadius:10, padding:"12px 14px"}}>
              <div style={{fontWeight:700, color:"#ef4444", fontSize:13, marginBottom:6}}>❌ DON'T Do This</div>
              {["Don't put 'safe' options at #1","Don't remove choices mid-counselling","Don't miss response deadline (24 hrs!)","Don't Withdraw without backup plan"].map(s => (
                <div key={s} style={{fontSize:12.5, color:t.text, marginBottom:4}}>• {s}</div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "💰", title: "Fees & Finances", color: "#f97316",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:12}}>
          <div style={{background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14, padding:"18px"}}>
            <div style={{fontWeight:700, fontSize:14, color:t.text, marginBottom:12}}>💳 Seat Acceptance Fee (Paid after each allotment round)</div>
            {[
              {institute:"IITs", fee:"₹35,000", note:"Adjustable against total admission fee"},
              {institute:"NITs / IIITs / GFTIs", fee:"₹45,000", note:"Adjustable against total admission fee"},
            ].map(item => (
              <div key={item.institute} style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                background:t.bgCard2, border:`1px solid ${t.border}`, borderRadius:10,
                padding:"12px 14px", marginBottom:8
              }}>
                <div>
                  <div style={{fontWeight:700, fontSize:13.5, color:t.text}}>{item.institute}</div>
                  <div style={{fontSize:12, color:t.textMuted, marginTop:2}}>{item.note}</div>
                </div>
                <div style={{fontWeight:800, fontSize:16, color:"#f97316"}}>{item.fee}</div>
              </div>
            ))}
            <div style={{fontSize:12.5, color:t.textMuted, marginTop:8, lineHeight:1.6}}>
              This is NOT the full college fee. It's an advance paid to hold your seat. It gets deducted from your first-semester fee when you join.
            </div>
          </div>
          <div style={{background:"#ef444422", border:"1px solid #ef444433", borderRadius:12, padding:"14px 16px"}}>
            <div style={{fontWeight:700, color:"#ef4444", fontSize:13, marginBottom:6}}>⚠️ What you LOSE if you Withdraw</div>
            <div style={{fontSize:13, color:t.text, lineHeight:1.7}}>
              If you Withdraw after paying the seat fee, <strong>₹10,000–15,000 is non-refundable</strong>. The rest comes back. So choose Withdraw only if you're 100% sure you don't need a JoSAA seat.
            </div>
          </div>
          <div style={{background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:12, padding:"14px 16px"}}>
            <div style={{fontWeight:700, fontSize:13, color:t.text, marginBottom:8}}>📊 Typical Annual College Fees (for reference)</div>
            {[
              {name:"IITs", fee:"₹2–2.5 Lakh/year", note:"Government subsidized"},
              {name:"NITs / IIITs / GFTIs", fee:"₹1.3–1.8 Lakh/year", note:"Government subsidized"},
              {name:"BITS Pilani/Goa/Hyderabad", fee:"₹5.5–6 Lakh/year", note:"Private, but strong placement"},
              {name:"VIT / Manipal / SRM", fee:"₹2–4 Lakh/year", note:"Private deemed universities"},
            ].map(item => (
              <div key={item.name} style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
                <div>
                  <div style={{fontSize:13, fontWeight:600, color:t.text}}>{item.name}</div>
                  <div style={{fontSize:11, color:t.textMuted}}>{item.note}</div>
                </div>
                <div style={{fontSize:13, fontWeight:700, color:"#f97316"}}>{item.fee}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      icon: "⚠️", title: "5 Common Mistakes", color: "#ef4444",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {[
            {num:"1", title:"Putting safe choices at the top", detail:"Students write NIT Raipur as Choice #1 because they think 'I'll definitely get it.' Wrong! Always put your DREAM option first. The system never penalizes you for aiming high.", fix:"Fix: Put IIT/top-NIT of choice at #1. Work downward."},
            {num:"2", title:"Not filling enough choices", detail:"Some students fill only 10–15 choices. Then they miss an upgrade in Round 3 because that college wasn't on their list.", fix:"Fix: Fill at least 50–100 choices. Spend 2–3 hours on this — it's the most important step."},
            {num:"3", title:"Choosing Withdraw accidentally", detail:"Students sometimes click Withdraw thinking it means 'skip this round.' It actually means you exit JoSAA completely and lose money.", fix:"Fix: Read every screen TWICE. Withdraw = Game Over. Accept = Lock seat. Float = Try for better."},
            {num:"4", title:"Missing the 24-hour response window", detail:"After each round, you have ~12–24 hours to respond. If you don't, your seat gets cancelled automatically.", fix:"Fix: Set phone alarms for allotment dates. Check JoSAA every day during counselling week."},
            {num:"5", title:"OBC-NCL certificate issues", detail:"Students bring an OBC certificate that's 2 years old or doesn't say 'Non-Creamy Layer.' Seat is cancelled during verification.", fix:"Fix: Get a fresh OBC-NCL certificate from SDM/Tehsildar before counselling starts. Check the date!"},
          ].map(item => (
            <div key={item.num} style={{
              background:t.bgCard, border:`1px solid #ef444433`, borderRadius:12, padding:"16px 18px",
              borderLeft:"3px solid #ef4444"
            }}>
              <div style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                <div style={{
                  width:28, height:28, borderRadius:"50%", background:"#ef444422",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:13, fontWeight:800, color:"#ef4444", flexShrink:0
                }}>{item.num}</div>
                <div>
                  <div style={{fontWeight:700, fontSize:14, color:"#ef4444", marginBottom:5}}>{item.title}</div>
                  <div style={{fontSize:13, color:t.text, lineHeight:1.7, marginBottom:6}}>{item.detail}</div>
                  <div style={{fontSize:12.5, color:"#10b981", background:"#10b98115", borderRadius:8, padding:"7px 10px", fontWeight:600}}>
                    ✅ {item.fix}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      icon: "✅", title: "Counselling Checklist", color: "#10b981",
      content: (
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          <div style={{fontSize:13.5, color:t.textMuted, marginBottom:4}}>Tick off each item before counselling starts. Missing any document = seat cancellation!</div>
          {CHECKLIST_ITEMS.map((item, i) => {
            const done = checklist[i];
            return (
              <div
                key={i}
                onClick={() => setChecklist(prev => ({...prev, [i]: !prev[i]}))}
                style={{
                  display:"flex", gap:12, alignItems:"flex-start", cursor:"pointer",
                  background: done ? "#10b98115" : t.bgCard,
                  border:`1px solid ${done ? "#10b98144" : t.border}`,
                  borderRadius:10, padding:"12px 14px",
                  transition:"all 0.2s"
                }}
              >
                <div style={{
                  width:22, height:22, borderRadius:6, border:`2px solid ${done ? "#10b981" : t.textMuted}`,
                  background: done ? "#10b981" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, flexShrink:0, marginTop:1, transition:"all 0.2s"
                }}>
                  {done ? "✓" : ""}
                </div>
                <div style={{fontSize:13.5, color: done ? t.textMuted : t.text, lineHeight:1.6, textDecoration: done ? "line-through" : "none"}}>
                  {item}
                </div>
              </div>
            );
          })}
          <div style={{
            background: Object.values(checklist).filter(Boolean).length === CHECKLIST_ITEMS.length ? "#10b98122" : t.bgCard2,
            border:`1px solid ${t.border}`, borderRadius:10, padding:"12px 14px",
            display:"flex", justifyContent:"space-between", alignItems:"center"
          }}>
            <div style={{fontSize:13.5, fontWeight:700, color:t.text}}>
              Progress: {Object.values(checklist).filter(Boolean).length} / {CHECKLIST_ITEMS.length} items done
            </div>
            {Object.values(checklist).filter(Boolean).length === CHECKLIST_ITEMS.length && (
              <div style={{fontSize:13, fontWeight:700, color:"#10b981"}}>🎉 Ready for counselling!</div>
            )}
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="anim-fadeup">
      {/* Header */}
      <div style={{marginBottom:20}}>
        <div style={{fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, marginBottom:4}}>
          📋 JoSAA Counselling Guide
        </div>
        <div style={{color:t.textMuted, fontSize:14}}>
          Everything about seat allocation — Float, Slide, Accept, Withdraw — explained simply. No jargon.
        </div>
      </div>

      {/* Section pills */}
      <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:20}}>
        {SECTIONS.map((s, i) => (
          <button key={i} onClick={() => setOpenSection(openSection === i ? -1 : i)} className="pill-btn" style={{
            padding:"7px 14px", borderRadius:20, cursor:"pointer",
            border:`1px solid ${openSection === i ? s.color : t.border}`,
            background: openSection === i ? s.color+"22" : t.bgCard,
            color: openSection === i ? s.color : t.textMuted,
            fontSize:12.5, fontWeight:700, fontFamily:"'DM Sans',sans-serif",
          }}>
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Sections accordion */}
      <div style={{display:"flex", flexDirection:"column", gap:10}}>
        {SECTIONS.map((s, i) => (
          <div key={i} style={{
            background:t.bgCard, border:`1px solid ${openSection===i ? s.color+"55" : t.border}`,
            borderRadius:14, overflow:"hidden", transition:"border-color 0.2s"
          }}>
            <button onClick={() => setOpenSection(openSection===i ? -1 : i)} style={{
              width:"100%", padding:"16px 20px", display:"flex", alignItems:"center", gap:12,
              background:"transparent", border:"none", cursor:"pointer", textAlign:"left"
            }}>
              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background: openSection===i ? s.color : s.color+"22",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:18, transition:"background 0.2s"
              }}>{s.icon}</div>
              <div style={{flexGrow:1}}>
                <div style={{fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, color: openSection===i ? s.color : t.text}}>
                  {s.title}
                </div>
              </div>
              <span style={{color:t.textMuted, fontSize:16, transform: openSection===i ? "rotate(180deg)" : "none", transition:"transform 0.2s"}}>▼</span>
            </button>
            {openSection===i && (
              <div style={{padding:"0 20px 20px 20px", animation:"fadeUp 0.25s ease"}}>
                {s.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── COLLEGE SEARCH ─────────────────────────────────────────────────────── */
const COLLEGE_DB = [
  // IITs
  { name:"IIT Bombay", short:"IITB", type:"IIT", city:"Mumbai", state:"Maharashtra", exam:"JEE Advanced", url:"https://www.iitb.ac.in", nirf:3 },
  { name:"IIT Delhi", short:"IITD", type:"IIT", city:"New Delhi", state:"Delhi", exam:"JEE Advanced", url:"https://home.iitd.ac.in", nirf:2 },
  { name:"IIT Madras", short:"IITM", type:"IIT", city:"Chennai", state:"Tamil Nadu", exam:"JEE Advanced", url:"https://www.iitm.ac.in", nirf:1 },
  { name:"IIT Kanpur", short:"IITK", type:"IIT", city:"Kanpur", state:"Uttar Pradesh", exam:"JEE Advanced", url:"https://www.iitk.ac.in", nirf:4 },
  { name:"IIT Kharagpur", short:"IITKgp", type:"IIT", city:"Kharagpur", state:"West Bengal", exam:"JEE Advanced", url:"https://www.iitkgp.ac.in", nirf:5 },
  { name:"IIT Roorkee", short:"IITR", type:"IIT", city:"Roorkee", state:"Uttarakhand", exam:"JEE Advanced", url:"https://www.iitr.ac.in", nirf:6 },
  { name:"IIT Guwahati", short:"IITG", type:"IIT", city:"Guwahati", state:"Assam", exam:"JEE Advanced", url:"https://www.iitg.ac.in", nirf:7 },
  { name:"IIT Hyderabad", short:"IITH", type:"IIT", city:"Hyderabad", state:"Telangana", exam:"JEE Advanced", url:"https://www.iith.ac.in", nirf:8 },
  { name:"IIT Indore", short:"IITI", type:"IIT", city:"Indore", state:"Madhya Pradesh", exam:"JEE Advanced", url:"https://www.iiti.ac.in", nirf:null },
  { name:"IIT Jodhpur", short:"IITJ", type:"IIT", city:"Jodhpur", state:"Rajasthan", exam:"JEE Advanced", url:"https://www.iitj.ac.in", nirf:null },
  { name:"IIT Mandi", short:"IITMandi", type:"IIT", city:"Mandi", state:"Himachal Pradesh", exam:"JEE Advanced", url:"https://www.iitmandi.ac.in", nirf:null },
  { name:"IIT Patna", short:"IITP", type:"IIT", city:"Patna", state:"Bihar", exam:"JEE Advanced", url:"https://www.iitp.ac.in", nirf:null },
  { name:"IIT Ropar", short:"IITRpr", type:"IIT", city:"Rupnagar", state:"Punjab", exam:"JEE Advanced", url:"https://www.iitrpr.ac.in", nirf:null },
  { name:"IIT Bhubaneswar", short:"IITBBS", type:"IIT", city:"Bhubaneswar", state:"Odisha", exam:"JEE Advanced", url:"https://www.iitbbs.ac.in", nirf:null },
  { name:"IIT Gandhinagar", short:"IITGN", type:"IIT", city:"Gandhinagar", state:"Gujarat", exam:"JEE Advanced", url:"https://www.iitgn.ac.in", nirf:null },
  { name:"IIT Tirupati", short:"IITTP", type:"IIT", city:"Tirupati", state:"Andhra Pradesh", exam:"JEE Advanced", url:"https://www.iittp.ac.in", nirf:null },
  { name:"IIT Palakkad", short:"IITPKD", type:"IIT", city:"Palakkad", state:"Kerala", exam:"JEE Advanced", url:"https://www.iitpkd.ac.in", nirf:null },
  { name:"IIT Jammu", short:"IITJmu", type:"IIT", city:"Jammu", state:"J&K", exam:"JEE Advanced", url:"https://www.iitjammu.ac.in", nirf:null },
  { name:"IIT Bhilai", short:"IITBhi", type:"IIT", city:"Bhilai", state:"Chhattisgarh", exam:"JEE Advanced", url:"https://www.iitbhilai.ac.in", nirf:null },
  { name:"IIT Dharwad", short:"IITDhw", type:"IIT", city:"Dharwad", state:"Karnataka", exam:"JEE Advanced", url:"https://www.iitdh.ac.in", nirf:null },
  { name:"IIT Goa", short:"IITGoa", type:"IIT", city:"Goa", state:"Goa", exam:"JEE Advanced", url:"https://www.iitgoa.ac.in", nirf:null },
  { name:"IIT (ISM) Dhanbad", short:"IIT ISM", type:"IIT", city:"Dhanbad", state:"Jharkhand", exam:"JEE Advanced", url:"https://www.iitism.ac.in", nirf:null },
  { name:"IIT (BHU) Varanasi", short:"IIT BHU", type:"IIT", city:"Varanasi", state:"Uttar Pradesh", exam:"JEE Advanced", url:"https://www.iitbhu.ac.in", nirf:null },
  // NITs
  { name:"NIT Trichy", short:"NITT", type:"NIT", city:"Tiruchirappalli", state:"Tamil Nadu", exam:"JEE Main", url:"https://www.nitt.edu", nirf:9 },
  { name:"NIT Warangal", short:"NITW", type:"NIT", city:"Warangal", state:"Telangana", exam:"JEE Main", url:"https://www.nitw.ac.in", nirf:28 },
  { name:"NIT Surathkal", short:"NITK", type:"NIT", city:"Mangaluru", state:"Karnataka", exam:"JEE Main", url:"https://www.nitk.ac.in", nirf:26 },
  { name:"NIT Calicut", short:"NITC", type:"NIT", city:"Kozhikode", state:"Kerala", exam:"JEE Main", url:"https://www.nitc.ac.in", nirf:30 },
  { name:"NIT Rourkela", short:"NITR", type:"NIT", city:"Rourkela", state:"Odisha", exam:"JEE Main", url:"https://www.nitrkl.ac.in", nirf:19 },
  { name:"NIT Allahabad (MNNIT)", short:"MNNIT", type:"NIT", city:"Prayagraj", state:"Uttar Pradesh", exam:"JEE Main", url:"https://www.mnnit.ac.in", nirf:null },
  { name:"NIT Jaipur (MNIT)", short:"MNIT", type:"NIT", city:"Jaipur", state:"Rajasthan", exam:"JEE Main", url:"https://www.mnit.ac.in", nirf:null },
  { name:"NIT Nagpur (VNIT)", short:"VNIT", type:"NIT", city:"Nagpur", state:"Maharashtra", exam:"JEE Main", url:"https://vnit.ac.in", nirf:null },
  { name:"NIT Surat (SVNIT)", short:"SVNIT", type:"NIT", city:"Surat", state:"Gujarat", exam:"JEE Main", url:"https://www.svnit.ac.in", nirf:null },
  { name:"NIT Bhopal (MANIT)", short:"MANIT", type:"NIT", city:"Bhopal", state:"Madhya Pradesh", exam:"JEE Main", url:"https://www.manit.ac.in", nirf:null },
  { name:"NIT Kurukshetra", short:"NITKKR", type:"NIT", city:"Kurukshetra", state:"Haryana", exam:"JEE Main", url:"https://nitkkr.ac.in", nirf:null },
  { name:"NIT Silchar", short:"NITS", type:"NIT", city:"Silchar", state:"Assam", exam:"JEE Main", url:"https://www.nits.ac.in", nirf:null },
  { name:"NIT Hamirpur", short:"NITH", type:"NIT", city:"Hamirpur", state:"Himachal Pradesh", exam:"JEE Main", url:"https://nith.ac.in", nirf:null },
  { name:"NIT Durgapur", short:"NITDGP", type:"NIT", city:"Durgapur", state:"West Bengal", exam:"JEE Main", url:"https://nitdgp.ac.in", nirf:null },
  { name:"NIT Patna", short:"NITP", type:"NIT", city:"Patna", state:"Bihar", exam:"JEE Main", url:"https://www.nitp.ac.in", nirf:null },
  { name:"NIT Agartala", short:"NITA", type:"NIT", city:"Agartala", state:"Tripura", exam:"JEE Main", url:"https://www.nita.ac.in", nirf:null },
  { name:"NIT Raipur", short:"NITRR", type:"NIT", city:"Raipur", state:"Chhattisgarh", exam:"JEE Main", url:"https://www.nitrr.ac.in", nirf:null },
  { name:"NIT Goa", short:"NITG", type:"NIT", city:"Goa", state:"Goa", exam:"JEE Main", url:"https://www.nitgoa.ac.in", nirf:null },
  { name:"NIT Manipur", short:"NITMN", type:"NIT", city:"Imphal", state:"Manipur", exam:"JEE Main", url:"https://www.nitmanipur.ac.in", nirf:null },
  { name:"NIT Mizoram", short:"NITMZ", type:"NIT", city:"Aizawl", state:"Mizoram", exam:"JEE Main", url:"https://www.nitmz.ac.in", nirf:null },
  { name:"NIT Meghalaya", short:"NITM", type:"NIT", city:"Shillong", state:"Meghalaya", exam:"JEE Main", url:"https://www.nitm.ac.in", nirf:null },
  { name:"NIT Arunachal Pradesh", short:"NITAP", type:"NIT", city:"Yupia", state:"Arunachal Pradesh", exam:"JEE Main", url:"https://www.nitap.ac.in", nirf:null },
  { name:"NIT Sikkim", short:"NITSKM", type:"NIT", city:"Ravangla", state:"Sikkim", exam:"JEE Main", url:"https://nitsikkim.ac.in", nirf:null },
  { name:"NIT Uttarakhand", short:"NITUK", type:"NIT", city:"Srinagar", state:"Uttarakhand", exam:"JEE Main", url:"https://nituk.ac.in", nirf:null },
  { name:"NIT Andhra Pradesh", short:"NITANDHRA", type:"NIT", city:"Tadepalligudem", state:"Andhra Pradesh", exam:"JEE Main", url:"https://www.nitandhra.ac.in", nirf:null },
  { name:"NIT Delhi", short:"NITD", type:"NIT", city:"New Delhi", state:"Delhi", exam:"JEE Main", url:"https://nitdelhi.ac.in", nirf:null },
  { name:"NIT Puducherry", short:"NITPY", type:"NIT", city:"Karaikal", state:"Puducherry", exam:"JEE Main", url:"https://nitpy.ac.in", nirf:null },
  { name:"NIT Nagaland", short:"NITN", type:"NIT", city:"Chumukedima", state:"Nagaland", exam:"JEE Main", url:"https://www.nitnagaland.ac.in", nirf:null },
  // BITS
  { name:"BITS Pilani", short:"BITS Pilani", type:"BITS", city:"Pilani", state:"Rajasthan", exam:"BITSAT", url:"https://www.bits-pilani.ac.in", nirf:24 },
  { name:"BITS Goa", short:"BITS Goa", type:"BITS", city:"Goa", state:"Goa", exam:"BITSAT", url:"https://www.bits-pilani.ac.in/goa", nirf:null },
  { name:"BITS Hyderabad", short:"BITS Hyd", type:"BITS", city:"Hyderabad", state:"Telangana", exam:"BITSAT", url:"https://www.bits-pilani.ac.in/hyderabad", nirf:null },
  // IIITs
  { name:"IIIT Hyderabad", short:"IIITH", type:"IIIT", city:"Hyderabad", state:"Telangana", exam:"JEE Main/UGEE", url:"https://www.iiit.ac.in", nirf:null },
  { name:"IIIT Allahabad", short:"IIITA", type:"IIIT", city:"Prayagraj", state:"Uttar Pradesh", exam:"JEE Main", url:"https://www.iiita.ac.in", nirf:null },
  { name:"IIIT Bangalore", short:"IIITB", type:"IIIT", city:"Bengaluru", state:"Karnataka", exam:"JEE Main/PGEE", url:"https://www.iiitb.ac.in", nirf:null },
  { name:"IIIT Delhi", short:"IIITD", type:"IIIT", city:"New Delhi", state:"Delhi", exam:"JEE Main/JAC", url:"https://www.iiitd.ac.in", nirf:null },
  { name:"IIIT Gwalior", short:"ABV-IIITM", type:"IIIT", city:"Gwalior", state:"Madhya Pradesh", exam:"JEE Main", url:"https://www.iiitm.ac.in", nirf:null },
  { name:"IIIT Pune", short:"IIITP", type:"IIIT", city:"Pune", state:"Maharashtra", exam:"JEE Main", url:"https://www.iiitp.ac.in", nirf:null },
  { name:"IIIT Kota", short:"IIITK", type:"IIIT", city:"Kota", state:"Rajasthan", exam:"JEE Main", url:"https://www.iiitkota.ac.in", nirf:null },
  { name:"IIIT Lucknow", short:"IIITL", type:"IIIT", city:"Lucknow", state:"Uttar Pradesh", exam:"JEE Main", url:"https://www.iiitl.ac.in", nirf:null },
  { name:"IIIT Vadodara", short:"IIITV", type:"IIIT", city:"Vadodara", state:"Gujarat", exam:"JEE Main", url:"https://www.iiitvadodara.ac.in", nirf:null },
  { name:"IIIT Bhopal", short:"IIITBPL", type:"IIIT", city:"Bhopal", state:"Madhya Pradesh", exam:"JEE Main", url:"https://www.iiitbhopal.ac.in", nirf:null },
  { name:"IIIT Kalyani", short:"IIITK", type:"IIIT", city:"Kalyani", state:"West Bengal", exam:"JEE Main", url:"https://www.iiitkalyani.ac.in", nirf:null },
  { name:"IIIT Una", short:"IIITUna", type:"IIIT", city:"Una", state:"Himachal Pradesh", exam:"JEE Main", url:"https://www.iiituna.ac.in", nirf:null },
  { name:"IIIT Sri City", short:"IIITS", type:"IIIT", city:"Sri City", state:"Andhra Pradesh", exam:"JEE Main", url:"https://www.iiits.ac.in", nirf:null },
  { name:"IIIT Sonepat", short:"IIITSon", type:"IIIT", city:"Sonepat", state:"Haryana", exam:"JEE Main", url:"https://www.iiisonepat.ac.in", nirf:null },
  { name:"IIIT Nagpur", short:"IIITN", type:"IIIT", city:"Nagpur", state:"Maharashtra", exam:"JEE Main", url:"https://www.iiitn.ac.in", nirf:null },
  { name:"IIIT Ranchi", short:"IIITRanchi", type:"IIIT", city:"Ranchi", state:"Jharkhand", exam:"JEE Main", url:"https://www.iiitranchi.ac.in", nirf:null },
  { name:"IIIT Manipur", short:"IIITManpur", type:"IIIT", city:"Imphal", state:"Manipur", exam:"JEE Main", url:"https://www.iiitmanipur.ac.in", nirf:null },
  // Deemed
  { name:"VIT Vellore", short:"VIT", type:"Deemed", city:"Vellore", state:"Tamil Nadu", exam:"VITEEE", url:"https://vit.ac.in", nirf:11 },
  { name:"VIT Chennai", short:"VIT Chennai", type:"Deemed", city:"Chennai", state:"Tamil Nadu", exam:"VITEEE", url:"https://chennai.vit.ac.in", nirf:null },
  { name:"VIT Bhopal", short:"VIT Bhopal", type:"Deemed", city:"Bhopal", state:"Madhya Pradesh", exam:"VITEEE", url:"https://vitbhopal.ac.in", nirf:null },
  { name:"VIT-AP", short:"VIT AP", type:"Deemed", city:"Amaravati", state:"Andhra Pradesh", exam:"VITEEE", url:"https://vitap.ac.in", nirf:null },
  { name:"Manipal Institute of Technology", short:"MIT Manipal", type:"Deemed", city:"Manipal", state:"Karnataka", exam:"MET/JEE Main", url:"https://manipal.edu/mit.html", nirf:null },
  { name:"SRM Institute of Science and Technology", short:"SRMIST", type:"Deemed", city:"Chennai", state:"Tamil Nadu", exam:"SRMJEEE/JEE Main", url:"https://www.srmist.edu.in", nirf:null },
  { name:"Thapar Institute of Engineering", short:"Thapar", type:"Deemed", city:"Patiala", state:"Punjab", exam:"JEE Main", url:"https://www.thapar.edu", nirf:43 },
  { name:"Amity University", short:"Amity", type:"Deemed", city:"Noida", state:"Uttar Pradesh", exam:"Amity JEE/JEE Main", url:"https://www.amity.edu", nirf:null },
  { name:"Symbiosis Institute of Technology", short:"SIT Pune", type:"Deemed", city:"Pune", state:"Maharashtra", exam:"SET", url:"https://www.sitpune.edu.in", nirf:null },
  { name:"Kalinga Institute of Industrial Technology", short:"KIIT", type:"Deemed", city:"Bhubaneswar", state:"Odisha", exam:"KIITEE", url:"https://kiit.ac.in", nirf:null },
  { name:"Vellore Institute of Technology (VIT)", short:"VIT", type:"Deemed", city:"Vellore", state:"Tamil Nadu", exam:"VITEEE", url:"https://vit.ac.in", nirf:11 },
  // State Universities
  { name:"Jadavpur University", short:"JU", type:"State Univ.", city:"Kolkata", state:"West Bengal", exam:"WBJEE", url:"https://jadavpuruniversity.in", nirf:15 },
  { name:"Anna University (College of Engineering Guindy)", short:"CEG", type:"State Univ.", city:"Chennai", state:"Tamil Nadu", exam:"TNEA", url:"https://www.annauniv.edu", nirf:12 },
  { name:"Delhi Technological University", short:"DTU", type:"State Univ.", city:"New Delhi", state:"Delhi", exam:"JEE Main (Delhi)", url:"https://dtu.ac.in", nirf:36 },
  { name:"Netaji Subhas University of Technology", short:"NSUT", type:"State Univ.", city:"New Delhi", state:"Delhi", exam:"JEE Main (Delhi)", url:"https://nsut.ac.in", nirf:null },
  { name:"IIEST Shibpur", short:"IIEST", type:"State Univ.", city:"Howrah", state:"West Bengal", exam:"WBJEE/JEE Main", url:"https://www.iiests.ac.in", nirf:null },
  { name:"PEC Chandigarh", short:"PEC", type:"State Univ.", city:"Chandigarh", state:"Chandigarh", exam:"JEE Main", url:"https://pec.ac.in", nirf:null },
  { name:"Pune University (COEP)", short:"COEP", type:"Govt (Auto)", city:"Pune", state:"Maharashtra", exam:"MHT-CET/JEE Main", url:"https://www.coeptech.ac.in", nirf:null },
  { name:"VJTI Mumbai", short:"VJTI", type:"Govt (Auto)", city:"Mumbai", state:"Maharashtra", exam:"MHT-CET/JEE Main", url:"https://vjti.ac.in", nirf:null },
  { name:"ICT Mumbai", short:"ICT Mumbai", type:"State Univ.", city:"Mumbai", state:"Maharashtra", exam:"MHT-CET", url:"https://www.ictmumbai.edu.in", nirf:null },
  { name:"BMS College of Engineering", short:"BMSCE", type:"Private", city:"Bengaluru", state:"Karnataka", exam:"COMEDK/KCET", url:"https://www.bmsce.ac.in", nirf:null },
  { name:"PES University", short:"PESU", type:"Private", city:"Bengaluru", state:"Karnataka", exam:"PESSAT/COMEDK", url:"https://pes.edu", nirf:null },
  { name:"RV College of Engineering", short:"RVCE", type:"Private", city:"Bengaluru", state:"Karnataka", exam:"COMEDK/KCET", url:"https://www.rvce.edu.in", nirf:null },
  { name:"MS Ramaiah Institute of Technology", short:"MSRIT", type:"Private", city:"Bengaluru", state:"Karnataka", exam:"COMEDK/KCET", url:"https://www.msrit.edu", nirf:null },
  { name:"Nirma University", short:"Nirma", type:"Deemed", city:"Ahmedabad", state:"Gujarat", exam:"NUAT/JEE Main", url:"https://nirmauni.ac.in", nirf:null },
  { name:"LPU (Lovely Professional University)", short:"LPU", type:"Deemed", city:"Phagwara", state:"Punjab", exam:"LPUNEST/JEE Main", url:"https://www.lpu.in", nirf:null },
  { name:"Chandigarh University", short:"CU", type:"Deemed", city:"Mohali", state:"Punjab", exam:"CUCET/JEE Main", url:"https://www.cuchd.in", nirf:null },
  { name:"MIT Pune (Maharashtra Institute of Technology)", short:"MIT Pune", type:"Private", city:"Pune", state:"Maharashtra", exam:"MHT-CET", url:"https://www.mitpune.com", nirf:null },
  { name:"SPIT Mumbai", short:"SPIT", type:"Govt (Auto)", city:"Mumbai", state:"Maharashtra", exam:"MHT-CET/JEE Main", url:"https://www.spit.ac.in", nirf:null },
  { name:"PICT Pune", short:"PICT", type:"Private", city:"Pune", state:"Maharashtra", exam:"MHT-CET", url:"https://pict.edu", nirf:null },
  // GFTIs
  { name:"NIFFT Ranchi", short:"NIFFT", type:"GFTI", city:"Ranchi", state:"Jharkhand", exam:"JEE Main", url:"https://www.nifft.ac.in", nirf:null },
  { name:"HIT Haldia", short:"HITHALDIA", type:"GFTI", city:"Haldia", state:"West Bengal", exam:"JEE Main", url:"https://www.hithaldia.in", nirf:null },
  { name:"SLIET Longowal", short:"SLIET", type:"GFTI", city:"Sangrur", state:"Punjab", exam:"JEE Main", url:"https://www.sliet.ac.in", nirf:null },
  { name:"NERIST Nirjuli", short:"NERIST", type:"GFTI", city:"Nirjuli", state:"Arunachal Pradesh", exam:"JEE Main", url:"https://www.nerist.ac.in", nirf:null },
  { name:"CIT Kokrajhar", short:"CITK", type:"GFTI", city:"Kokrajhar", state:"Assam", exam:"JEE Main", url:"https://www.cit.ac.in", nirf:null },
  { name:"Assam University Silchar", short:"AUS", type:"GFTI", city:"Silchar", state:"Assam", exam:"JEE Main", url:"https://www.aus.ac.in", nirf:null },
  // More popular private/state
  { name:"Shiv Nadar University", short:"SNU", type:"Deemed", city:"Greater Noida", state:"Uttar Pradesh", exam:"SNUSAT/JEE Main", url:"https://snu.edu.in", nirf:null },
  { name:"IIIT Kottayam", short:"IIITK", type:"IIIT", city:"Kottayam", state:"Kerala", exam:"JEE Main", url:"https://www.iiitkottayam.ac.in", nirf:null },
  { name:"Bennett University", short:"Bennett", type:"Deemed", city:"Greater Noida", state:"Uttar Pradesh", exam:"BUAT/JEE Main", url:"https://www.bennett.edu.in", nirf:null },
  { name:"Graphic Era University", short:"GEU", type:"Deemed", city:"Dehradun", state:"Uttarakhand", exam:"JEE Main/Own", url:"https://www.geu.ac.in", nirf:null },
  { name:"Karunya Institute of Technology", short:"Karunya", type:"Deemed", city:"Coimbatore", state:"Tamil Nadu", exam:"Own/JEE Main", url:"https://www.karunya.edu", nirf:null },
  { name:"Alliance University", short:"Alliance", type:"Deemed", city:"Bengaluru", state:"Karnataka", exam:"Own/JEE Main", url:"https://www.alliance.edu.in", nirf:null },
  { name:"GH Raisoni College", short:"GHRCE", type:"Private", city:"Nagpur", state:"Maharashtra", exam:"MHT-CET", url:"https://raisoni.net", nirf:null },
  { name:"Sathyabama Institute", short:"Sathyabama", type:"Deemed", city:"Chennai", state:"Tamil Nadu", exam:"Own/JEE Main", url:"https://www.sathyabama.ac.in", nirf:null },
  { name:"PSG College of Technology", short:"PSGCT", type:"Private", city:"Coimbatore", state:"Tamil Nadu", exam:"TNEA", url:"https://www.psgtech.edu", nirf:null },
  { name:"SSN College of Engineering", short:"SSNCE", type:"Private", city:"Chennai", state:"Tamil Nadu", exam:"TNEA", url:"https://www.ssn.edu.in", nirf:null },
];

const TYPE_COLORS = {
  "IIT":"#f59e0b","NIT":"#10b981","BITS":"#10b981","IIIT":"#6366f1",
  "Deemed":"#ec4899","State Univ.":"#14b8a6","Govt (Auto)":"#8b5cf6",
  "Private":"#f97316","GFTI":"#38bdf8"
};

function CollegeSearch({ t }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function doSearch(q) {
    const term = q.toLowerCase().trim();
    if (!term) { setResults([]); setSearched(false); return; }
    const matches = COLLEGE_DB.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.short.toLowerCase().includes(term) ||
      c.city.toLowerCase().includes(term) ||
      c.state.toLowerCase().includes(term) ||
      c.type.toLowerCase().includes(term) ||
      c.exam.toLowerCase().includes(term)
    ).slice(0, 20);
    setResults(matches);
    setSearched(true);
  }

  function handleInput(e) {
    setQuery(e.target.value);
    doSearch(e.target.value);
  }

  const googleFallback = `https://www.google.com/search?q=${encodeURIComponent(query + " engineering college official site India")}`;

  return (
    <div className="anim-fadeup">
      {/* Header */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, marginBottom:4 }}>🔍 Find Any College in India</div>
        <div style={{ color:t.textMuted, fontSize:14 }}>Search by college name, city, state, or exam. We'll take you straight to the official website.</div>
      </div>

      {/* Search bar */}
      <div style={{ position:"relative", marginBottom:20 }}>
        <div style={{
          position:"absolute", left:16, top:"50%", transform:"translateY(-50%)",
          fontSize:18, opacity:0.5
        }}>🔍</div>
        <input
          ref={inputRef}
          value={query}
          onChange={handleInput}
          onKeyDown={e => { if(e.key==="Enter") doSearch(query); }}
          placeholder="Type college name, city, state or exam… e.g. 'IIT Bombay', 'Trichy', 'WBJEE'"
          style={{
            width:"100%", padding:"14px 16px 14px 46px", borderRadius:14,
            border:`2px solid ${query ? "#38bdf8" : t.border}`,
            background:t.bgInput, color:t.text, fontSize:15, outline:"none",
            fontFamily:"'DM Sans',sans-serif", lineHeight:1.5,
            transition:"border-color 0.2s",
          }}
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }} style={{
            position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
            background:"transparent", border:"none", cursor:"pointer",
            fontSize:18, color:t.textMuted, padding:4,
          }}>✕</button>
        )}
      </div>

      {/* Quick type filters */}
      {!searched && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:13, color:t.textMuted, fontWeight:600, marginBottom:10 }}>Browse by type:</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {Object.keys(TYPE_COLORS).map(type => (
              <button key={type} onClick={() => { setQuery(type); doSearch(type); }} className="pill-btn" style={{
                padding:"6px 14px", borderRadius:20, border:`1px solid ${TYPE_COLORS[type]}44`,
                background:TYPE_COLORS[type]+"15", color:TYPE_COLORS[type],
                cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'DM Sans',sans-serif",
              }}>{type}</button>
            ))}
          </div>

          {/* Popular searches */}
          <div style={{ fontSize:13, color:t.textMuted, fontWeight:600, marginTop:18, marginBottom:10 }}>Popular searches:</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["IIT Bombay","NIT Trichy","BITS Pilani","IIIT Hyderabad","VIT Vellore","Jadavpur","COEP Pune","NIT Warangal"].map(s => (
              <button key={s} onClick={() => { setQuery(s); doSearch(s); }} className="pill-btn" style={{
                padding:"6px 13px", borderRadius:20, border:`1px solid ${t.border}`,
                background:t.bgCard, color:t.text, cursor:"pointer",
                fontSize:12.5, fontFamily:"'DM Sans',sans-serif",
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div>
          <div style={{ fontSize:13, color:t.textMuted, marginBottom:12 }}>
            {results.length > 0
              ? `Found ${results.length} college${results.length > 1 ? "s" : ""} matching "${query}"`
              : `No colleges found for "${query}"`}
          </div>

          {results.length > 0 ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:12 }}>
              {results.map((c, i) => {
                const color = TYPE_COLORS[c.type] || "#6366f1";
                return (
                  <div key={i} className="hover-card" style={{
                    background:t.bgCard, border:`1px solid ${t.border}`,
                    borderRadius:14, padding:"18px 20px",
                    borderLeft:`3px solid ${color}`,
                    display:"flex", flexDirection:"column", gap:10,
                  }}>
                    {/* Top row */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                      <div style={{ flexGrow:1 }}>
                        <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:15, color:t.text, lineHeight:1.3 }}>{c.name}</div>
                        <div style={{ fontSize:12, color:t.textMuted, marginTop:3 }}>📍 {c.city}, {c.state}</div>
                      </div>
                      <span style={{
                        background:color+"22", color:color, borderRadius:7,
                        padding:"3px 9px", fontSize:11, fontWeight:700, flexShrink:0
                      }}>{c.type}</span>
                    </div>

                    {/* Info row */}
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                      <div style={{ fontSize:12, color:t.textMuted }}>
                        📝 <span style={{ color:t.text, fontWeight:600 }}>{c.exam}</span>
                      </div>
                      {c.nirf && (
                        <div style={{ fontSize:12, color:t.textMuted }}>
                          🏆 NIRF <span style={{ color:"#f59e0b", fontWeight:700 }}>#{c.nirf}</span>
                        </div>
                      )}
                    </div>

                    {/* URL preview */}
                    <div style={{ fontSize:12, color:color, fontFamily:"monospace", background:color+"0f", borderRadius:7, padding:"5px 9px", wordBreak:"break-all" }}>
                      🌐 {c.url.replace("https://","").replace("http://","")}
                    </div>

                    {/* Buttons */}
                    <div style={{ display:"flex", gap:8, marginTop:2 }}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flexGrow:1, padding:"9px 0", borderRadius:9, border:"none",
                          background:color, color:"#fff", fontWeight:700, fontSize:13,
                          cursor:"pointer", textDecoration:"none", textAlign:"center",
                          fontFamily:"'DM Sans',sans-serif", display:"block",
                        }}
                      >
                        🌐 Official Website ↗
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(c.name + " admission " + new Date().getFullYear())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding:"9px 14px", borderRadius:9, border:`1px solid ${t.border}`,
                          background:t.bgCard2, color:t.text, fontWeight:600, fontSize:13,
                          cursor:"pointer", textDecoration:"none", textAlign:"center",
                          fontFamily:"'DM Sans',sans-serif", display:"block", whiteSpace:"nowrap",
                        }}
                      >
                        🔎 Search
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Not found — Google fallback */
            <div style={{
              background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:14,
              padding:"28px 24px", textAlign:"center",
            }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🏫</div>
              <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:17, color:t.text, marginBottom:8 }}>
                College not in our list yet
              </div>
              <div style={{ fontSize:13.5, color:t.textMuted, marginBottom:20, lineHeight:1.7 }}>
                We might not have this college yet. Click below to search Google for its official site — we'll take you straight to the results.
              </div>
              <a
                href={googleFallback}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:"inline-block", padding:"11px 24px", borderRadius:10, border:"none",
                  background:"#38bdf8", color:"#fff", fontWeight:700, fontSize:14,
                  cursor:"pointer", textDecoration:"none", fontFamily:"'DM Sans',sans-serif",
                }}
              >
                🔍 Search "{query}" on Google ↗
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── STUDY ABROAD ───────────────────────────────────────────────────────── */
function StudyAbroad({ t }) {
  const [selected, setSelected] = useState(0);
  const country = FOREIGN_COUNTRIES[selected];

  return (
    <div className="anim-fadeup">
      <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, marginBottom:4 }}>🌍 Study Abroad Guide</div>
      <div style={{ color:t.textMuted, fontSize:14, marginBottom:20 }}>Exams, costs, visa, top universities and insider tips for Indian students — per country.</div>

      {/* Country tabs */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22 }}>
        {FOREIGN_COUNTRIES.map((c, i) => (
          <button key={i} onClick={() => setSelected(i)} className="pill-btn" style={{
            padding:"8px 16px", borderRadius:10, border:`1px solid ${selected===i ? c.color : t.border}`,
            background: selected===i ? c.color+"22" : t.bgCard, color: selected===i ? c.color : t.textMuted,
            cursor:"pointer", fontWeight:700, fontSize:14, fontFamily:"'DM Sans',sans-serif",
          }}>
            {c.flag} {c.country.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* Country detail */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Left: Overview */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{
            background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16, padding:"22px",
            borderTop:`3px solid ${country.color}`
          }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:22, fontWeight:800, marginBottom:4 }}>{country.country}</div>
            <div style={{ color:t.textMuted, fontSize:13.5, marginBottom:16, fontStyle:"italic" }}>{country.tagline}</div>
            {[
              { icon:"📝", label:"Required Exams", val: country.exams.join(" · ") },
              { icon:"📅", label:"Application Timeline", val: country.timeline },
              { icon:"💰", label:"Annual Cost", val: country.cost },
              { icon:"🛂", label:"Visa Type", val: country.visa },
              { icon:"💼", label:"Work Rights", val: country.workAllowed },
            ].map(row => (
              <div key={row.label} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:16, flexShrink:0 }}>{row.icon}</span>
                <div>
                  <div style={{ fontSize:11, color:t.textMuted, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{row.label}</div>
                  <div style={{ fontSize:13, color:t.text, marginTop:1, lineHeight:1.5 }}>{row.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16, padding:"20px" }}>
            <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, marginBottom:12, color:country.color }}>💡 Pro Tips for Indian Students</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {country.tips.map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ color:country.color, fontWeight:700, fontSize:13, flexShrink:0 }}>{i+1}.</span>
                  <span style={{ fontSize:13, color:t.text, lineHeight:1.6 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Universities */}
        <div style={{ background:t.bgCard, border:`1px solid ${t.border}`, borderRadius:16, padding:"22px" }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, marginBottom:14 }}>🏛️ Top Universities</div>
          <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
            {country.universities.map((u, i) => (
              <div key={i} style={{
                background:t.bgCard2, border:`1px solid ${t.border}`, borderRadius:12, padding:"14px 16px",
                display:"flex", gap:12, alignItems:"flex-start"
              }}>
                <div style={{
                  width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
                  background:country.color+"22", color:country.color, fontSize:13, fontWeight:800, fontFamily:"'Sora',sans-serif",
                }}>#{u.rank}</div>
                <div style={{ flexGrow:1 }}>
                  <div style={{ fontWeight:700, fontSize:14, color:t.text }}>{u.name}</div>
                  <div style={{ fontSize:12, color:t.textMuted, marginTop:2 }}>{u.field}</div>
                  <div style={{ fontSize:11.5, color:country.color, marginTop:3, fontWeight:600 }}>{u.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
