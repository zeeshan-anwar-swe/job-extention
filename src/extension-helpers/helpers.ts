import { CANDIDATE_SIDE, HIRING_NOUNS, HIRING_VERBS, KITS } from "./constants";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
const uniqArr = <T>(xs: T[]) => Array.from(new Set(xs));
const cap = (xs: string[], nMin = 2, nMax = 4) =>
  xs.slice(0, Math.max(nMin, Math.min(nMax, xs.length)));
const HAS = (t: string, rx: RegExp) => rx.test(t);

export function suggestSkillsForTitleWide(titleRaw: string): string[] {
  const t = ` ${norm(titleRaw)} `;

  // ---------------------------
  // Role detectors (regex only)
  // ---------------------------
  const is = {
    // Core eng/lang stacks
    python: HAS(t, /\bpython\b/),
    node: HAS(t, /\bnode(?:\.js)?\b/),
    java: HAS(t, /\bjava\b(?!script)/),
    go: HAS(t, /\bgo\b|\bgolang\b/),
    rust: HAS(t, /\brust\b/),
    scala: HAS(t, /\bscala\b/),
    php: HAS(t, /\bphp\b/),
    ruby: HAS(t, /\bruby\b/),
    csharp: HAS(t, /\bc\#|csharp\b|\b\.net\b/),
    cpp: HAS(t, /\bc\+\+|cpp\b/),
    elixir: HAS(t, /\belixir\b/),

    // FE/BE/Fullstack/web UX
    frontend: HAS(t, /\bfront\s*end|frontend|ui\b/),
    backend: HAS(t, /\bback\s*end|backend|api\b/),
    fullstack: HAS(t, /\bfull\s*stack\b/),
    react: HAS(t, /\breact\b(?!\s*native)/),
    nextjs: HAS(t, /\bnext(?:\.js)?\b/),
    angular: HAS(t, /\bangular\b/),
    vue: HAS(t, /\bvue\b/),
    svelte: HAS(t, /\bsvelte\b/),

    // Mobile
    android: HAS(t, /\bandroid\b/),
    ios: HAS(t, /\bios\b|\biphone\b/),
    rn: HAS(t, /\breact\s*native\b/),
    flutter: HAS(t, /\bflutter\b/),
    swift: HAS(t, /\bswift\b/),
    kotlin: HAS(t, /\bkotlin\b/),

    // Data / ML / AI
    dataSci: HAS(t, /\bdata\s*scientist|research\s*scientist\b/),
    dataEng: HAS(t, /\bdata\s*engineer\b/),
    dataAnalyst: HAS(t, /\bdata\s*analyst\b/),
    analyticsEng: HAS(t, /\banalytics\s*engineer\b/),
    mlEng: HAS(t, /\bml\b|\bmachine\s*learning\b/),
    nlp: HAS(t, /\bnlp\b|natural\s+language/),
    cv: HAS(t, /\bcomputer\s+vision\b|\bcv\b/),
    bi: HAS(t, /\bbi\b|business\s+intelligence|power\s*bi|tableau|looker\b/),

    // Cloud / DevOps / SRE / Security
    devops: HAS(t, /\bdev\s*ops|devops\b/),
    sre: HAS(t, /\bsite\s+reliability|sre\b/),
    platform: HAS(t, /\bplatform\s+engineer\b/),
    cloudArch: HAS(t, /\bcloud\s+architect\b/),
    cloudEng: HAS(t, /\bcloud\s+engineer\b/),
    aws: HAS(t, /\baws\b/),
    azure: HAS(t, /\bazure\b/),
    gcp: HAS(t, /\bgcp\b|\bgoogle\s+cloud\b/),
    kube: HAS(t, /\bkubernetes|\bk8s\b/),
    terraform: HAS(t, /\bterraform\b/),
    docker: HAS(t, /\bdocker\b/),
    secEng: HAS(t, /\bsecurity\s+engineer\b/),
    secAnalyst: HAS(t, /\bsecurity\s+analyst\b|soc\b/),
    appsec: HAS(t, /\bapp\s*sec|application\s+security\b/),
    pentest: HAS(t, /\bpenetration\s+tester\b|pentest(er)?\b/),

    // Enterprise platforms
    salesforce: HAS(t, /\bsalesforce\b/),
    servicenow: HAS(t, /\bservicenow\b/),
    sharepoint: HAS(t, /\bsharepoint\b/),
    sap: HAS(t, /\bsap\b/),

    // Embedded / firmware / iot
    embedded: HAS(t, /\bembedded\b/),
    firmware: HAS(t, /\bfirmware\b/),
    iot: HAS(t, /\biot\b/),

    // Game / graphics / web3
    unity: HAS(t, /\bunity\b/),
    unreal: HAS(t, /\bunreal\b/),
    blockchain: HAS(t, /\bblockchain\b|web3\b/),
    solidity: HAS(t, /\bsolidity\b/),

    // Product / project / delivery
    pm: HAS(t, /\bproduct\s+manager|pm\b/),
    pmm: HAS(t, /\bproduct\s+marketing\s+manager\b/),
    pd: HAS(t, /\bproduct\s+designer\b/),
    uxDesigner: HAS(t, /\bux\s+designer\b/),
    uiDesigner: HAS(t, /\bui\s+designer\b/),
    uxResearch: HAS(t, /\bux\s+researcher\b/),
    scrum: HAS(t, /\bscrum\s+master\b/),
    projectMgr: HAS(t, /\bproject\s+manager\b/),
    programMgr: HAS(t, /\bprogram\s+manager\b/),
    ba: HAS(t, /\bbusiness\s+analyst\b/),
    tw: HAS(t, /\btechnical\s+writer\b/),

    // Marketing / growth / content
    marketingMgr: HAS(t, /\bmarketing\s+manager\b|growth\s+manager\b/),
    performanceMkt: HAS(t, /\bperformance\s+marketing\b|paid\s+media\b/),
    seo: HAS(t, /\bseo\b|search\s+engine\s+optimization\b/),
    sem: HAS(t, /\bsem\b|ppc\b/),
    contentWriter: HAS(t, /\bcontent\s+writer|copywriter\b/),
    socialMgr: HAS(t, /\bsocial\s+media\s+manager\b/),
    designer: HAS(t, /\bgraphic\s+designer\b/),

    // Sales / biz dev / cs
    ae: HAS(t, /\baccount\s+executive\b|sales\s+executive\b/),
    sdr: HAS(t, /\bsales\s+development\s+representative\b|\bsdr\b/),
    bdr: HAS(t, /\bbusiness\s+development\s+representative\b|\bbdr\b/),
    bd: HAS(t, /\bbusiness\s+development\b|biz\s*dev\b/),
    salesMgr: HAS(t, /\bsales\s+manager\b/),
    csMgr: HAS(t, /\bcustomer\s+success\s+manager\b|csm\b/),
    tam: HAS(t, /\btechnical\s+account\s+manager\b|tam\b/),
    solutionsArch: HAS(t, /\bsolutions?\s+architect\b/),
    solutionsEng: HAS(t, /\bsolutions?\s+engineer\b/),
    presales: HAS(t, /\bpre\s*sales|presales\b/),

    // HR / people / ops / finance / legal / admin
    recruiter: HAS(t, /\brecruiter\b|talent\s+acquisition\b|recruitment\b/),
    hr: HAS(t, /\bhuman\s+resources\b|\bhr\b/),
    opsMgr: HAS(t, /\boperations\s+manager\b/),
    supplyChain: HAS(t, /\bsupply\s+chain\b/),
    financeAnalyst: HAS(t, /\bfinance\s+analyst\b|financial\s+analyst\b/),
    accountant: HAS(t, /\baccountant\b|bookkeeper\b/),
    legal: HAS(t, /\blegal\s+counsel\b|paralegal\b|compliance\s+officer\b/),
    officeAdmin: HAS(
      t,
      /\boffice\s+admin|administrative\s+assistant|executive\s+assistant\b/,
    ),
    dataEntry: HAS(t, /\bdata\s+entry\b/),

    // QA / test / devrel / support
    qa: HAS(t, /\bqa\b|quality\s+assurance|tester\b|sdet\b/),
    devrel: HAS(t, /\bdev\s*rel|developer\s+advocate|evangelist\b/),
    support: HAS(t, /\b(help|service)\s*desk|desktop\s+support\b/),
  };

  // ---------------------------
  // Skill kits (2–4 each)
  // ---------------------------

  // ---------------------------
  // Routing logic
  // ---------------------------
  let skills: string[] = [];

  // Sales / BizDev / CS (requested: business developer)
  if (is.bd) skills = KITS.BD;
  else if (is.bdr) skills = KITS.BDR;
  else if (is.sdr) skills = KITS.SDR;
  else if (is.ae) skills = KITS.AE;
  else if (is.salesMgr) skills = KITS.SALES_MGR;
  else if (is.csMgr) skills = KITS.CSM;
  else if (is.tam) skills = KITS.TAM;
  else if (is.presales) skills = KITS.PRESALES;
  else if (is.solutionsArch) skills = KITS.SOL_ARCH;
  else if (is.solutionsEng) skills = KITS.SOL_ENG;

  // Product / Project / BA / Writing
  if (!skills.length && is.pm) skills = KITS.PM;
  if (!skills.length && is.pmm) skills = KITS.PMM;
  if (!skills.length && is.scrum) skills = KITS.SCRUM;
  if (!skills.length && is.projectMgr) skills = KITS.PROJECT;
  if (!skills.length && is.programMgr) skills = KITS.PROGRAM;
  if (!skills.length && is.ba) skills = KITS.BA;
  if (!skills.length && is.tw) skills = KITS.TECH_WRITER;

  // Marketing / Content / Design
  if (!skills.length && is.marketingMgr) skills = KITS.PMM;
  if (!skills.length && is.performanceMkt) skills = KITS.SEM;
  if (!skills.length && is.seo) skills = KITS.SEO;
  if (!skills.length && is.sem) skills = KITS.SEM;
  if (!skills.length && is.contentWriter) skills = KITS.CONTENT;
  if (!skills.length && is.socialMgr) skills = KITS.SOCIAL;
  if (!skills.length && is.designer) skills = KITS.GRAPHIC;
  if (!skills.length && is.pd) skills = KITS.PDESIGN;
  if (!skills.length && is.uxDesigner) skills = KITS.UXD;
  if (!skills.length && is.uiDesigner) skills = KITS.UID;
  if (!skills.length && is.uxResearch) skills = KITS.UXR;

  // HR / People / Ops / Finance / Legal / Admin
  if (!skills.length && is.recruiter) skills = KITS.RECRUITER;
  if (!skills.length && is.hr) skills = KITS.HR;
  if (!skills.length && is.opsMgr) skills = KITS.OPS_MGR;
  if (!skills.length && is.supplyChain) skills = KITS.SUPPLY;
  if (!skills.length && is.financeAnalyst) skills = KITS.FIN_ANALYST;
  if (!skills.length && is.accountant) skills = KITS.ACCOUNTANT;
  if (!skills.length && is.legal) skills = KITS.LEGAL;
  if (!skills.length && is.officeAdmin) skills = KITS.OFFICE_ADMIN;
  if (!skills.length && is.dataEntry) skills = KITS.DATA_ENTRY;

  // Enterprise apps
  if (!skills.length && is.salesforce) skills = KITS.SALESFORCE;
  if (!skills.length && is.servicenow) skills = KITS.SERVICENOW;
  if (!skills.length && is.sharepoint) skills = KITS.SHAREPOINT;
  if (!skills.length && is.sap) skills = KITS.SAP;

  // Data / ML / BI
  if (!skills.length && is.analyticsEng) skills = KITS.AE;
  if (!skills.length && is.dataSci) skills = KITS.DS;
  if (!skills.length && is.dataEng) skills = KITS.DE;
  if (!skills.length && is.dataAnalyst) skills = KITS.DA;
  if (!skills.length && is.cv) skills = KITS.CV;
  if (!skills.length && is.nlp) skills = KITS.NLP;
  if (!skills.length && is.mlEng) skills = KITS.MLE;
  if (!skills.length && is.bi) skills = KITS.BI;

  // Cloud / DevOps / SRE / Security
  if (!skills.length && is.platform) skills = KITS.PLATFORM;
  if (!skills.length && is.sre) skills = KITS.SRE;
  if (!skills.length && is.devops) skills = KITS.DEVOPS;
  if (!skills.length && (is.cloudArch || is.cloudEng)) {
    if (is.aws) skills = KITS.CLOUD_AWS;
    else if (is.azure) skills = KITS.CLOUD_AZ;
    else if (is.gcp) skills = KITS.CLOUD_GCP;
    else skills = KITS.DEVOPS;
  }
  if (!skills.length && is.pentest) skills = KITS.PENTEST;
  if (!skills.length && is.appsec) skills = KITS.APPSEC;
  if (!skills.length && is.secEng) skills = KITS.SEC_ENG;
  if (!skills.length && is.secAnalyst) skills = KITS.SEC_ANALYST;

  // Mobile
  if (!skills.length && is.android) skills = KITS.ANDROID;
  if (!skills.length && is.ios) skills = KITS.IOS;
  if (!skills.length && is.rn) skills = KITS.RN;
  if (!skills.length && is.flutter) skills = KITS.FLUTTER;

  // Game / Graphics / Web3
  if (!skills.length && is.unity) skills = KITS.UNITY;
  if (!skills.length && is.unreal) skills = KITS.UNREAL;
  if (!skills.length && (is.blockchain || is.solidity)) skills = KITS.WEB3;

  // Backend / Frontend / Full-stack fallbacks
  if (!skills.length && is.frontend) {
    if (is.react && is.nextjs) skills = KITS.FE_next;
    else if (is.react) skills = KITS.FE_react;
    else if (is.angular) skills = KITS.FE_angular;
    else if (is.vue) skills = KITS.FE_vue;
    else if (is.svelte) skills = KITS.FE_svelte;
    else skills = KITS.FE_generic;
  }
  if (!skills.length && is.backend) {
    if (is.node) skills = KITS.BE_node;
    else if (is.java) skills = KITS.BE_java;
    else if (is.python) skills = KITS.BE_python;
    else if (is.go) skills = KITS.BE_go;
    else if (is.rust) skills = KITS.BE_rust;
    else if (is.scala) skills = KITS.BE_scala;
    else if (is.php) skills = KITS.BE_php;
    else if (is.ruby) skills = KITS.BE_ruby;
    else if (is.csharp) skills = KITS.BE_dotnet;
  }
  if (!skills.length && is.fullstack) skills = KITS.FS_generic;

  // Generic developer/engineer w/ language hints
  if (!skills.length && HAS(t, /\bdeveloper|engineer\b/)) {
    if (is.python) skills = ["Python", "Django/FastAPI", "SQL", "Docker"];
    else if (is.node) skills = ["Node.js", "Express/Nest", "MongoDB", "Docker"];
    else if (is.java) skills = ["Java", "Spring Boot", "SQL", "Docker"];
    else if (is.go) skills = ["Go", "Gin", "PostgreSQL", "Docker"];
    else if (is.rust) skills = ["Rust", "Tokio", "PostgreSQL", "Docker"];
    else if (is.scala) skills = ["Scala", "Akka", "Kafka", "Cassandra"];
    else if (is.php) skills = ["PHP", "Laravel", "MySQL", "Nginx"];
    else if (is.ruby) skills = ["Ruby", "Rails", "PostgreSQL", "Sidekiq"];
    else if (is.csharp) skills = ["C#", ".NET", "SQL Server", "Azure"];
    else skills = ["Git", "APIs", "SQL", "Docker"];
  }

  // QA / DevRel / Support (tech-adjacent)
  if (!skills.length && is.qa)
    skills = HAS(t, /\bsdet\b/) ? KITS.SDET : KITS.QA;
  if (!skills.length && is.devrel) skills = KITS.DEVREL;
  if (!skills.length && is.support) skills = KITS.SUPPORT;

  // Augmenters for cloud hints
  const extras: string[] = [];
  if (
    (is.devops || is.sre || is.platform || is.cloudArch || is.cloudEng) &&
    is.kube
  )
    extras.push("Kubernetes");
  if (
    (is.devops || is.sre || is.platform || is.cloudArch || is.cloudEng) &&
    is.terraform
  )
    extras.push("Terraform");
  if ((is.devops || is.sre) && is.docker) extras.push("Docker");
  if (is.aws && !skills.some((s) => /aws/i.test(s))) extras.push("AWS");
  if (is.azure && !skills.some((s) => /azure/i.test(s))) extras.push("Azure");
  if (is.gcp && !skills.some((s) => /\bgcp|google cloud/i.test(s)))
    extras.push("GCP");

  const final = cap(uniqArr([...skills, ...extras]));
  return final.length ? final : ["Communication", "SQL"]; // ultimate fallback
}

const TITLE_HEADS =
  "developer|engineer|manager|analyst|architect|designer|tester|scientist|specialist|administrator|admin|consultant|researcher|director|lead|owner|coordinator|executive|representative|agent";

const FILLERS_PREFIX = [
  "please",
  "kindly",
  "can you",
  "could you",
  "will you",
  "would you",
  "hey",
  "ok",
  "okay",
  "alright",
  "i want",
  "i need",
  "i would like",
  "show me",
  "get me",
  "give me",
  "looking for",
  "search for",
  "find me",
];

const FILLERS_SUFFIX = [
  "please",
  "now",
  "thanks",
  "thank you",
  "right now",
  "for me",
  "for now",
];

const PREPS = ["based in", "located in", "in", "at", "from", "near"];

// conservative stoppers after a location chunk
const STOP_TOKENS =
  /\b(with|for|and|that|who|having|of|on|as|to|remote|hybrid|onsite|experience|exp|years?|months?|right|now|please|thanks?|thank|you|\d+)\b/i;

const _wordRx = /[A-Za-z\u00C0-\u024F][A-Za-z0-9.&\-\u00C0-\u024F]*/g;

const WORD_NUM: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
};

const tidy = (s: string) => s.replace(/\s+/g, " ").trim();
const toNum = (t: string) => (/^\d+$/.test(t) ? +t : WORD_NUM[t] ?? NaN);

const cleanKeyword = (raw: string): string => {
  let s = raw.toLowerCase();

  // strip obvious comma/space clutter
  s = s.replace(/[,;]+/g, " ").replace(/\s+/g, " ").trim();

  // loop-strip leading fillers and command verbs (incl. “show me”, “get me”, etc.)
  const leaders = [
    ...FILLERS_PREFIX,
    "show",
    "find",
    "get",
    "give",
    "bring up",
    "search",
  ]
    .sort((a, b) => b.length - a.length) // longest first
    .map((p) => p.replace(/\s+/g, "\\s+"));
  const leadRe = new RegExp(
    `^(?:${leaders.join("|")})(?:\\s+(?:me|the|my))?\\s+`,
    "i",
  );
  while (leadRe.test(s)) s = s.replace(leadRe, "");

  // drop a/an/the/my if still leading
  s = s.replace(/^(?:a|an|the|my)\s+/i, "");

  // mop up orphaned "N to" left after tenure stripping
  s = s.replace(/\b\d+\s*(?:to|-|–|—)\s*$/i, " ").trim();

  // extract the maximal span that ends with a title head
  const heads = TITLE_HEADS;
  const titleRe = new RegExp(
    // up to ~5 modifier tokens before the head (tech, domain, seniority, etc.)
    `((?:[a-z0-9.+#\\-/]+\\s+){0,5}(?:${heads}))\\b`,
    "i",
  );
  const m = titleRe.exec(` ${s} `);
  if (m) {
    let t = m[1].replace(/\s+/g, " ").trim();
    // singularize common plurals of the head, if any slipped through
    t = t.replace(new RegExp(`\\b(${heads})s\\b`, "i"), (_, $1) => $1);
    // drop leading articles again if captured
    t = t.replace(/^(?:a|an|the|my)\s+/i, "");
    return t.trim();
  }

  return s.trim();
};

export const hasHiringIntent = (text: string) => {
  const verb = anyWord(HIRING_VERBS);
  const noun = anyWord(HIRING_NOUNS);
  const structure =
    /\b(for|to)\s+(a|an)?\s*(.+?\b(developer|engineer|qa|sdet|designer|manager|analyst|architect)\b)/i;
  const expCue =
    /\b(\d+\+?\s*(y|yr|yrs|yoe|year|years|m|mo|mos|month|months)|at least \d+|minimum \d+|min \d+|up to \d+)\b/i;
  return (
    verb.test(text) ||
    noun.test(text) ||
    structure.test(text) ||
    expCue.test(text)
  );
};

export const anyWord = (arr: string[]) =>
  new RegExp(`\\b(${arr.join("|")})\\b`, "i");

export const hasCandidateAntiIntent = (text: string) => {
  const anti = anyWord(CANDIDATE_SIDE);
  if (/^(i|i'm|im|i am|my)\b/i.test(text)) return true;
  return anti.test(text);
};

const stripFillers = (s: string) => {
  let out = ` ${s.toLowerCase().trim()} `;
  for (const p of FILLERS_PREFIX) {
    const re = new RegExp(`^\\s*${p.replace(/\s+/g, "\\s+")}\\s+`, "i");
    out = out.replace(re, " ");
  }
  for (const p of FILLERS_SUFFIX) {
    const re = new RegExp(`\\s+${p.replace(/\s+/g, "\\s+")}\\s*$`, "i");
    out = out.replace(re, " ");
  }
  return tidy(out);
};

const extractTenure = (
  s: string,
): { min: number; max: number | null; unit: "years" | "months" } | null => {
  const text = s.toLowerCase();

  // 1) Ranges: "1 to 2 years", "1-2 years", "1–2 years"
  let m = text.match(
    /\b(\d+|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s*(?:to|-|–|—)\s*(\d+|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+(years?|yrs?|y|months?|mos?)\b/i,
  );
  if (m) {
    const min = toNum(m[1]);
    const max = toNum(m[2]);
    const unit = /mo/i.test(m[3]) ? "months" : "years";
    if (!Number.isNaN(min) && !Number.isNaN(max)) return { min, max, unit };
  }

  // 2) Single bound with optional tails:
  // "X+ years", "X plus years", "at least X years", and also
  // "X years experience", "X years of experience", "X years experienced"
  m = text.match(
    /\b(?:at\s+least|minimum|min|more\s+than|over)?\s*(\d+|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s*(?:\+|plus)?\s+(years?|yrs?|y|months?|mos?)(?:\s+(?:of\s+experience|experience|experienced))?\b/i,
  );
  if (m) {
    const n = toNum(m[1]);
    const unit = /mo/i.test(m[2]) ? "months" : "years";
    if (!Number.isNaN(n)) return { min: n, max: null, unit };
  }

  // 3) Bare "X years"/"X yrs" (fallback)
  m = text.match(
    /\b(\d+|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+(?:years?|yrs?|y)\b/i,
  );
  if (m) {
    const n = toNum(m[1]);
    if (!Number.isNaN(n)) return { min: n, max: n, unit: "years" };
  }

  return null;
};

const extractLocation = (raw: string): string | null => {
  const text = ` ${raw} `;
  const preps = PREPS.map((p) => p.replace(/\s+/g, "\\s+")).join("|");
  const prepRe = new RegExp(`\\b(?:${preps})\\b\\s+`, "gi");

  let m: RegExpExecArray | null;
  while ((m = prepRe.exec(text))) {
    let i = prepRe.lastIndex;
    const buf: string[] = [];
    let wMatch: RegExpExecArray | null;

    _wordRx.lastIndex = i;
    while ((wMatch = _wordRx.exec(text))) {
      const w = wMatch[0];
      const lw = w.toLowerCase();
      if (STOP_TOKENS.test(lw)) break;
      buf.push(w);
      i = _wordRx.lastIndex;
      if (buf.length >= 3) break;
      _wordRx.lastIndex = i;
    }
    const cand = tidy(buf.join(" "));
    if (cand && !/^remote$/i.test(cand)) return cand;
  }

  // fallback: trailing "in <city>" at end if simple
  const trailing = text.match(
    /\bin\s+([a-z\u00C0-\u024F][a-z0-9\u00C0-\u024F.\-\s]{1,60})\s*$/i,
  );
  if (trailing) {
    const cand = tidy(
      trailing[1]
        .split(/\s+/)
        .filter((w) => !STOP_TOKENS.test(w.toLowerCase()))
        .slice(0, 3)
        .join(" "),
    );
    if (cand && !/^remote$/i.test(cand)) return cand;
  }

  return null;
};

const stripTenureAndLocation = (raw: string) => {
  let s = ` ${raw.toLowerCase()} `;

  s = s
    .replace(
      /\b(at\s+least|minimum|min|more\s+than|over)\s+\d+\s+(years?|yrs?|y|months?|mos?)(?:\s+(?:of\s+experience|experience|experienced))?\b/g,
      " ",
    )
    .replace(
      /\b\d+\s*(?:\+|plus)?\s+(years?|yrs?|y|months?|mos?)(?:\s+(?:of\s+experience|experience|experienced))?\b/g,
      " ",
    )
    .replace(
      /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s*(?:to|-|–|—)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\s+(years?|yrs?|y|months?|mos?)\b/g,
      " ",
    );

  const preps = PREPS.map((p) => p.replace(/\s+/g, "\\s+")).join("|");
  s = s.replace(new RegExp(`\\b(?:${preps})\\b\\s+[^,.;]*`, "i"), " ");

  s = s.replace(/\bwith\b\s*/g, " ");

  return tidy(s);
};

export function parseQuery(str: string): {
  keyword: string;
  tenure: { min: number; max: number | null; unit: "years" | "months" } | null;
  location: string | null;
} {
  const cleaned = stripFillers(str);

  const tenure = extractTenure(cleaned);
  const location = extractLocation(cleaned);

  let keyword = stripTenureAndLocation(cleaned);
  keyword = cleanKeyword(keyword);

  const extractTitle = (s: string): string | null => {
    const text = ` ${s.toLowerCase()} `;
    const re = new RegExp(
      `\\b(?:a|an|the|my)?\\s*((?:[a-z0-9.+#\\-/]+\\s+){0,4}(?:${TITLE_HEADS}))s?\\b`,
      "i",
    );
    const m = re.exec(text);
    if (!m) return null;

    let title = m[1]
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/^(?:a|an|the|my)\s+/, "")
      .trim();

    title = title.replace(new RegExp(`\\b(${TITLE_HEADS})s\\b`, "i"), (_, $1) =>
      $1.toLowerCase(),
    );

    return title || null;
  };

  if (!keyword) {
    const t = extractTitle(cleaned);
    if (t) keyword = t;
  }

  if (!keyword) {
    keyword = cleaned.split(/\s+/).slice(0, 4).join(" ").trim();
  }

  return { keyword, tenure, location };
}

export const uniq = <T>(xs: T[]) => Array.from(new Set(xs));
export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[^\p{L}\p{N}\s\-–+.,/@]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export const tokenScore = (a: string, b: string) => {
  const A = new Set(a.split(" ").filter(Boolean));
  const B = new Set(b.split(" ").filter(Boolean));
  let inter = 0;
  A.forEach((t) => {
    if (B.has(t)) inter++;
  });
  const denom = Math.max(A.size, B.size);
  return denom ? inter / denom : 0;
};

export const EXPAND_SING_PLUR = (xs: string[]) => {
  const out: string[] = [];
  xs.forEach((x) => {
    const w = x.trim();
    out.push(w);
    const parts = w.split(" ");
    const last = parts.pop()!;
    const plural =
      last.endsWith("y") && !/[aeiou]y$/.test(last)
        ? last.slice(0, -1) + "ies"
        : last.endsWith("s")
          ? last
          : last + "s";
    out.push([...parts, plural].join(" ").trim());
  });
  return uniq(out);
};

export const withArticles = (xs: string[]) => {
  const base = EXPAND_SING_PLUR(xs);
  return uniq([
    ...base,
    ...base.flatMap((x) => [`the ${x}`, `my ${x}`]),
    ...base.flatMap((x) => [
      `${x} page`,
      `the ${x} page`,
      `${x} pages`,
      `the ${x} pages`,
    ]),
  ]);
};
