const pptxgen = require("pptxgenjs");

// Create presentation
const pres = new pptxgen();

// Gen-Connect Brand Colors
const BRAND_BLUE = "1E3A8A";
const BRAND_ORANGE = "F97316";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F3F4F6";
const DARK_GRAY = "374151";

// Set presentation properties
pres.author = "Gen-Connect";
pres.company = "Gen-Connect";
pres.title = "Microsoft Partnership Proposal - Gen-Connect";
pres.subject = "Bridging the Generation Gap in STEM";

// Helper function to add slide title
function addSlideTitle(slide, title, subtitle = null) {
  slide.addText(title, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.8,
    fontSize: 36,
    bold: true,
    color: BRAND_BLUE,
    fontFace: "Arial",
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5,
      y: 1.2,
      w: 9,
      h: 0.5,
      fontSize: 18,
      color: DARK_GRAY,
      fontFace: "Arial",
    });
  }
}

// Helper function to add branded footer
function addFooter(slide, slideNumber) {
  // Footer line
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 7.3,
    w: 10,
    h: 0.02,
    fill: { color: BRAND_ORANGE },
  });

  // Footer text
  slide.addText("Gen-Connect | Connecting Relatable STEM Mentors", {
    x: 0.5,
    y: 7.4,
    w: 8,
    h: 0.3,
    fontSize: 10,
    color: DARK_GRAY,
    fontFace: "Arial",
  });

  // Slide number
  slide.addText(`${slideNumber}`, {
    x: 9,
    y: 7.4,
    w: 0.5,
    h: 0.3,
    fontSize: 10,
    color: DARK_GRAY,
    align: "right",
    fontFace: "Arial",
  });
}

// SLIDE 1: HOOK - Stats on generation gap
const slide1 = pres.addSlide();
addSlideTitle(slide1, "The Generation Gap in STEM");

slide1.addText("The Challenge", {
  x: 0.5,
  y: 1.8,
  w: 9,
  h: 0.5,
  fontSize: 24,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const stats = [
  { stat: "9%", label: "Low socioeconomic background representation in UK tech" },
  { stat: "26%", label: "Women in STEM workforce (fewer than 1 in 4)" },
  { stat: "65%", label: "White men dominate STEM roles" },
  { stat: "Critical", label: "Generation gap: Students can't see themselves in tech careers" }
];

let yPos = 2.6;
stats.forEach((item, index) => {
  // Stat box
  slide1.addShape(pres.ShapeType.rect, {
    x: 0.5,
    y: yPos,
    w: 9,
    h: 0.9,
    fill: { color: index === 3 ? BRAND_ORANGE : BRAND_BLUE },
  });

  // Stat text
  slide1.addText(item.stat, {
    x: 0.8,
    y: yPos + 0.15,
    w: 2,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: WHITE,
    fontFace: "Arial",
  });

  // Label text
  slide1.addText(item.label, {
    x: 3,
    y: yPos + 0.25,
    w: 6,
    h: 0.6,
    fontSize: 16,
    color: WHITE,
    fontFace: "Arial",
  });

  yPos += 1.1;
});

addFooter(slide1, 1);

// SLIDE 2: PROBLEM - Two barriers
const slide2 = pres.addSlide();
addSlideTitle(slide2, "The Problem", "Two Critical Barriers");

const barriers = [
  {
    title: "Relatability",
    icon: "👥",
    desc: "Students can't see 'someone like me' in STEM careers",
    impact: "Limits aspiration and perceived possibility"
  },
  {
    title: "Safeguarding",
    icon: "🛡️",
    desc: "Schools struggle to find trusted, vetted mentors",
    impact: "Creates access barriers for quality placements"
  }
];

let xPos = 0.5;
barriers.forEach((barrier) => {
  // Barrier box
  slide2.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 2.2,
    w: 4.25,
    h: 4.5,
    fill: { color: LIGHT_GRAY },
    line: { color: BRAND_BLUE, width: 2 },
  });

  // Icon
  slide2.addText(barrier.icon, {
    x: xPos + 0.5,
    y: 2.5,
    w: 3.25,
    h: 0.8,
    fontSize: 48,
    align: "center",
    fontFace: "Arial",
  });

  // Title
  slide2.addText(barrier.title, {
    x: xPos + 0.5,
    y: 3.5,
    w: 3.25,
    h: 0.5,
    fontSize: 24,
    bold: true,
    color: BRAND_BLUE,
    align: "center",
    fontFace: "Arial",
  });

  // Description
  slide2.addText(barrier.desc, {
    x: xPos + 0.3,
    y: 4.2,
    w: 3.65,
    h: 1.2,
    fontSize: 14,
    color: DARK_GRAY,
    align: "center",
    fontFace: "Arial",
  });

  // Impact
  slide2.addText(barrier.impact, {
    x: xPos + 0.3,
    y: 5.6,
    w: 3.65,
    h: 0.8,
    fontSize: 12,
    italic: true,
    color: BRAND_ORANGE,
    align: "center",
    fontFace: "Arial",
  });

  xPos += 4.75;
});

addFooter(slide2, 2);

// SLIDE 3: CHALLENGE DEEP DIVE
const slide3 = pres.addSlide();
addSlideTitle(slide3, "Challenge Deep Dive", "Understanding the barriers in detail");

slide3.addText("Relatability Gap", {
  x: 0.5,
  y: 2,
  w: 4.25,
  h: 0.5,
  fontSize: 20,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const relatabilityPoints = [
  "Students from working-class backgrounds rarely encounter STEM professionals who share their lived experience",
  "Without relatable role models, STEM careers feel unattainable ('not for people like me')",
  "Critical decision point: Ages 14-16, when GCSE choices shape future pathways",
  "Representation matters: Seeing 'someone like me' transforms aspiration into action"
];

let yPosRel = 2.6;
relatabilityPoints.forEach((point) => {
  slide3.addText(`• ${point}`, {
    x: 0.8,
    y: yPosRel,
    w: 4,
    h: 0.6,
    fontSize: 11,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosRel += 0.7;
});

slide3.addText("Safeguarding Challenge", {
  x: 5.25,
  y: 2,
  w: 4.25,
  h: 0.5,
  fontSize: 20,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const safeguardingPoints = [
  "Schools need DBS-checked, trusted professionals for work placements",
  "Traditional placement sourcing is time-intensive and inconsistent",
  "Quality varies: Schools can't guarantee meaningful experiences",
  "Scaling is impossible without systematic vetting and matching"
];

let yPosSafe = 2.6;
safeguardingPoints.forEach((point) => {
  slide3.addText(`• ${point}`, {
    x: 5.5,
    y: yPosSafe,
    w: 4,
    h: 0.6,
    fontSize: 11,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosSafe += 0.7;
});

// Combined impact box
slide3.addShape(pres.ShapeType.rect, {
  x: 1.5,
  y: 5.8,
  w: 7,
  h: 1.2,
  fill: { color: BRAND_ORANGE },
});

slide3.addText("Combined Impact: Talented students miss STEM opportunities due to lack of access to relatable, vetted mentors", {
  x: 1.8,
  y: 6,
  w: 6.4,
  h: 0.8,
  fontSize: 14,
  bold: true,
  color: WHITE,
  align: "center",
  valign: "middle",
  fontFace: "Arial",
});

addFooter(slide3, 3);

// SLIDE 4: ROOT CAUSE
const slide4 = pres.addSlide();
addSlideTitle(slide4, "Root Cause");

slide4.addText("Visibility = Possibility", {
  x: 1,
  y: 2,
  w: 8,
  h: 1,
  fontSize: 44,
  bold: true,
  color: BRAND_BLUE,
  align: "center",
  fontFace: "Arial",
});

slide4.addShape(pres.ShapeType.rect, {
  x: 1.5,
  y: 3.5,
  w: 7,
  h: 3,
  fill: { color: LIGHT_GRAY },
  line: { color: BRAND_ORANGE, width: 3 },
});

const visibilityText = [
  "When students see professionals from similar backgrounds thriving in STEM, they understand it's achievable for them too.",
  "",
  "The problem isn't lack of talent or interest—it's lack of visibility into pathways that feel accessible.",
  "",
  "Corporate employees with diverse backgrounds are the untapped solution: they're already vetted, passionate about giving back, and represent the 'proof of possibility' students need to see."
];

slide4.addText(visibilityText.join("\n"), {
  x: 2,
  y: 3.8,
  w: 6,
  h: 2.5,
  fontSize: 14,
  color: DARK_GRAY,
  align: "center",
  valign: "middle",
  fontFace: "Arial",
});

addFooter(slide4, 4);

// SLIDE 5: SOLUTION - GenConnect Concept
const slide5 = pres.addSlide();
addSlideTitle(slide5, "The Solution: Gen-Connect", "Activating Microsoft's diverse employees to close the generation gap");

slide5.addText("The Approach", {
  x: 0.5,
  y: 2,
  w: 9,
  h: 0.5,
  fontSize: 20,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

// Key points
const solutionPoints = [
  {
    title: "Activate Diverse Employees",
    desc: "Leverage Microsoft's workforce diversity as mentors for students from similar backgrounds"
  },
  {
    title: "Two-Phase Approach",
    desc: "Phase 1: Validate demand • Phase 2: Deliver sized pilot"
  },
  {
    title: "Partnership Model",
    desc: "Not a vendor relationship—a collaborative partnership for shared impact"
  }
];

let yPosSol = 2.8;
solutionPoints.forEach((point, index) => {
  // Number circle
  slide5.addShape(pres.ShapeType.ellipse, {
    x: 0.8,
    y: yPosSol - 0.05,
    w: 0.5,
    h: 0.5,
    fill: { color: BRAND_ORANGE },
  });

  slide5.addText(`${index + 1}`, {
    x: 0.8,
    y: yPosSol - 0.05,
    w: 0.5,
    h: 0.5,
    fontSize: 20,
    bold: true,
    color: WHITE,
    align: "center",
    valign: "middle",
    fontFace: "Arial",
  });

  // Title
  slide5.addText(point.title, {
    x: 1.5,
    y: yPosSol - 0.05,
    w: 7.5,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: BRAND_BLUE,
    fontFace: "Arial",
  });

  // Description
  slide5.addText(point.desc, {
    x: 1.5,
    y: yPosSol + 0.4,
    w: 7.5,
    h: 0.5,
    fontSize: 14,
    color: DARK_GRAY,
    fontFace: "Arial",
  });

  yPosSol += 1.3;
});

// Value proposition box
slide5.addShape(pres.ShapeType.rect, {
  x: 1,
  y: 6.2,
  w: 8,
  h: 0.8,
  fill: { color: BRAND_BLUE },
});

slide5.addText("Outcome: Students gain relatable mentors, schools get quality placements, Microsoft drives measurable D&I impact", {
  x: 1.3,
  y: 6.35,
  w: 7.4,
  h: 0.5,
  fontSize: 13,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

addFooter(slide5, 5);

// SLIDE 6: PHASE 1 - Validate Demand
const slide6 = pres.addSlide();
addSlideTitle(slide6, "Phase 1: Validate Demand ⭐", "Prove employees want this before committing resources");

slide6.addText("Purpose", {
  x: 0.5,
  y: 2,
  w: 9,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: BRAND_ORANGE,
  fontFace: "Arial",
});

slide6.addText("Demonstrate employee interest and gather data to size the pilot appropriately", {
  x: 0.5,
  y: 2.5,
  w: 9,
  h: 0.4,
  fontSize: 14,
  color: DARK_GRAY,
  fontFace: "Arial",
});

// What we're proposing
slide6.addText("What We're Proposing", {
  x: 0.5,
  y: 3.2,
  w: 4.5,
  h: 0.4,
  fontSize: 16,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const proposalPoints = [
  "DEI survey/campaign to MS employees",
  "Questions: Would you mentor? Which school? What's your background?",
  "Gather: Numbers, profiles, schools, geography"
];

let yPosPhase1 = 3.7;
proposalPoints.forEach((point) => {
  slide6.addText(`• ${point}`, {
    x: 0.8,
    y: yPosPhase1,
    w: 4,
    h: 0.4,
    fontSize: 12,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosPhase1 += 0.5;
});

slide6.addShape(pres.ShapeType.rect, {
  x: 0.5,
  y: 5.3,
  w: 4.5,
  h: 0.7,
  fill: { color: LIGHT_GRAY },
});

slide6.addText("Outcome: Know pilot size + feasibility before commitment", {
  x: 0.7,
  y: 5.45,
  w: 4.1,
  h: 0.4,
  fontSize: 12,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

// Timeline and Investment
slide6.addText("Timeline & Investment", {
  x: 5.25,
  y: 3.2,
  w: 4.25,
  h: 0.4,
  fontSize: 16,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

slide6.addShape(pres.ShapeType.rect, {
  x: 5.25,
  y: 3.8,
  w: 4.25,
  h: 1,
  fill: { color: BRAND_BLUE },
});

slide6.addText("Timeline: Q1 2026\n(2-3 months)", {
  x: 5.5,
  y: 3.95,
  w: 3.75,
  h: 0.7,
  fontSize: 14,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

slide6.addShape(pres.ShapeType.rect, {
  x: 5.25,
  y: 5,
  w: 4.25,
  h: 1,
  fill: { color: BRAND_ORANGE },
});

slide6.addText("Investment: Minimal\n(survey design, DEI team distributes)", {
  x: 5.5,
  y: 5.15,
  w: 3.75,
  h: 0.7,
  fontSize: 14,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

addFooter(slide6, 6);

// SLIDE 7: PHASE 2 - Sized Pilot
const slide7 = pres.addSlide();
addSlideTitle(slide7, "Phase 2: Sized Pilot", "If Phase 1 shows strong demand");

slide7.addText("Program Delivery", {
  x: 0.5,
  y: 2,
  w: 4.5,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const deliveryPoints = [
  "Pilot sized based on mentor numbers (20? 50? 100?)",
  "Schools matched to mentor profiles and geography",
  "Full program delivery in 2026-27 school year",
  "Meaningful work placements with relatable mentors"
];

let yPosPhase2 = 2.6;
deliveryPoints.forEach((point) => {
  slide7.addText(`• ${point}`, {
    x: 0.8,
    y: yPosPhase2,
    w: 4,
    h: 0.4,
    fontSize: 12,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosPhase2 += 0.5;
});

slide7.addText("Platform Acceleration", {
  x: 5.25,
  y: 2,
  w: 4.25,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const platformPoints = [
  "We have MVP scoped and ready",
  "MS tech stack (Azure, AI) accelerates build",
  "Positions as tech-for-good investment",
  "Students exposed to Microsoft AI technology"
];

let yPosPlatform = 2.6;
platformPoints.forEach((point) => {
  slide7.addText(`• ${point}`, {
    x: 5.5,
    y: yPosPlatform,
    w: 4,
    h: 0.4,
    fontSize: 12,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosPlatform += 0.5;
});

// Impact box
slide7.addShape(pres.ShapeType.rect, {
  x: 1,
  y: 5.5,
  w: 8,
  h: 1.5,
  fill: { color: LIGHT_GRAY },
  line: { color: BRAND_ORANGE, width: 2 },
});

slide7.addText("Expected Impact", {
  x: 1.5,
  y: 5.7,
  w: 7,
  h: 0.4,
  fontSize: 16,
  bold: true,
  color: BRAND_BLUE,
  align: "center",
  fontFace: "Arial",
});

slide7.addText("40% of students changing their perception of STEM careers after experiencing relatable mentorship\n\nMeasurable outcomes for Microsoft's D&I commitments", {
  x: 1.5,
  y: 6.2,
  w: 7,
  h: 0.9,
  fontSize: 12,
  color: DARK_GRAY,
  align: "center",
  fontFace: "Arial",
});

addFooter(slide7, 7);

// SLIDE 8: THE PARTNERSHIP
const slide8 = pres.addSlide();
addSlideTitle(slide8, "The Partnership Model ⭐", "Mutual value exchange for shared success");

// Microsoft Provides
slide8.addShape(pres.ShapeType.rect, {
  x: 0.5,
  y: 2,
  w: 4.25,
  h: 0.6,
  fill: { color: BRAND_BLUE },
});

slide8.addText("Microsoft Provides", {
  x: 0.5,
  y: 2.15,
  w: 4.25,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

const msProvides = [
  "Access to DEI channels for Phase 1 survey",
  "Technology (Azure credits, AI stack access)",
  "Funding for platform + operations",
  "Brand (tech-for-good story)"
];

let yPosMS = 2.8;
msProvides.forEach((item) => {
  slide8.addText(`✓ ${item}`, {
    x: 0.8,
    y: yPosMS,
    w: 3.7,
    h: 0.4,
    fontSize: 11,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosMS += 0.45;
});

// Gen-Connect Provides
slide8.addShape(pres.ShapeType.rect, {
  x: 5.25,
  y: 2,
  w: 4.25,
  h: 0.6,
  fill: { color: BRAND_ORANGE },
});

slide8.addText("Gen-Connect Provides", {
  x: 5.25,
  y: 2.15,
  w: 4.25,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

const gcProvides = [
  "Survey design + analysis (Phase 1)",
  "All operations + 'heavy lifting' (Phase 2)",
  "Schools engagement and matching",
  "Impact measurement + reporting"
];

let yPosGC = 2.8;
gcProvides.forEach((item) => {
  slide8.addText(`✓ ${item}`, {
    x: 5.5,
    y: yPosGC,
    w: 3.7,
    h: 0.4,
    fontSize: 11,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosGC += 0.45;
});

// Joint Benefit
slide8.addShape(pres.ShapeType.rect, {
  x: 1,
  y: 5,
  w: 8,
  h: 0.6,
  fill: { color: DARK_GRAY },
});

slide8.addText("Joint Benefit", {
  x: 1,
  y: 5.15,
  w: 8,
  h: 0.3,
  fontSize: 16,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

const jointBenefits = [
  "Youth and schools exposed to Microsoft AI technology",
  "Positive PR story: Tech enabling social mobility",
  "Microsoft positioned as enabler, not just donor",
  "Measurable D&I impact with authentic community connection"
];

let yPosJoint = 5.8;
jointBenefits.forEach((item) => {
  slide8.addText(`⭐ ${item}`, {
    x: 1.5,
    y: yPosJoint,
    w: 7,
    h: 0.35,
    fontSize: 11,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosJoint += 0.4;
});

addFooter(slide8, 8);

// SLIDE 9: THE ASK
const slide9 = pres.addSlide();
addSlideTitle(slide9, "The Ask ⭐", "Low-risk Phase 1 commitment with clear validation");

slide9.addText("Phase 1 Commitment", {
  x: 0.5,
  y: 2,
  w: 9,
  h: 0.5,
  fontSize: 20,
  bold: true,
  color: BRAND_BLUE,
  fontFace: "Arial",
});

const phase1Ask = [
  "Access to DEI channels (ERGs, internal comms)",
  "DEI team support for survey distribution",
  "2-3 hour workshop to design survey together"
];

let yPosAsk1 = 2.7;
phase1Ask.forEach((item, index) => {
  slide9.addShape(pres.ShapeType.rect, {
    x: 1.5,
    y: yPosAsk1 - 0.05,
    w: 7,
    h: 0.5,
    fill: { color: BRAND_BLUE },
  });

  slide9.addText(`${index + 1}. ${item}`, {
    x: 1.8,
    y: yPosAsk1 + 0.05,
    w: 6.4,
    h: 0.4,
    fontSize: 13,
    color: WHITE,
    fontFace: "Arial",
  });

  yPosAsk1 += 0.65;
});

slide9.addText("If Validation Proves Demand", {
  x: 0.5,
  y: 4.8,
  w: 9,
  h: 0.5,
  fontSize: 18,
  bold: true,
  color: BRAND_ORANGE,
  fontFace: "Arial",
});

const phase2Ask = [
  "Phase 2 partnership discussion (tech + funding)",
  "Scope sized appropriately based on survey results",
  "Clear ROI and impact metrics defined together"
];

let yPosAsk2 = 5.4;
phase2Ask.forEach((item) => {
  slide9.addText(`• ${item}`, {
    x: 1.5,
    y: yPosAsk2,
    w: 7,
    h: 0.4,
    fontSize: 12,
    color: DARK_GRAY,
    fontFace: "Arial",
  });
  yPosAsk2 += 0.5;
});

// Next step CTA
slide9.addShape(pres.ShapeType.rect, {
  x: 2,
  y: 6.5,
  w: 6,
  h: 0.7,
  fill: { color: BRAND_ORANGE },
});

slide9.addText("Next Step: Pilot Design Workshop (2 hours)", {
  x: 2.3,
  y: 6.65,
  w: 5.4,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

addFooter(slide9, 9);

// SLIDE 10: CLOSE - Vision of Impact
const slide10 = pres.addSlide();

// Full-slide gradient background simulation
slide10.addShape(pres.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 10,
  h: 7.5,
  fill: { color: BRAND_BLUE },
});

slide10.addText("Imagine the Impact", {
  x: 0.5,
  y: 1.5,
  w: 9,
  h: 1,
  fontSize: 42,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

const visionText = [
  "A student from a council estate in Manchester meets a Microsoft engineer who grew up on the same streets.",
  "",
  "For the first time, they see someone who looks like them, sounds like them, and made it in tech.",
  "",
  "That two-week placement changes everything—not just GCSE choices, but life trajectory.",
  "",
  "This is the power of relatable mentorship at scale."
];

slide10.addText(visionText.join("\n"), {
  x: 1.5,
  y: 3.2,
  w: 7,
  h: 3,
  fontSize: 16,
  color: WHITE,
  align: "center",
  valign: "middle",
  fontFace: "Arial",
});

slide10.addShape(pres.ShapeType.rect, {
  x: 2.5,
  y: 6.5,
  w: 5,
  h: 0.7,
  fill: { color: BRAND_ORANGE },
});

slide10.addText("Let's Make It Happen Together", {
  x: 2.7,
  y: 6.65,
  w: 4.6,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

// Contact info
slide10.addText("Gen-Connect | gen-connect.org", {
  x: 0,
  y: 7.2,
  w: 10,
  h: 0.3,
  fontSize: 11,
  color: WHITE,
  align: "center",
  fontFace: "Arial",
});

// Save presentation
pres.writeFile({ fileName: "GenConnect-Microsoft-Partnership.pptx" })
  .then(() => {
    console.log("✅ Presentation created successfully: GenConnect-Microsoft-Partnership.pptx");
  })
  .catch((err) => {
    console.error("❌ Error creating presentation:", err);
  });
