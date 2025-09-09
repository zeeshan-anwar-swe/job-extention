import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../store";
import {
  getFilteredCandidates,
  getLocationForCandidates,
  setCandidatesFilterOptions,
} from "../store/slices/Candiates.slice";
import {
  FILLERS_PREFIX,
  FILLERS_SUFFIX,
  PAGE_WORDS,
  PRONOUNS,
  VERBS,
} from "../extension-helpers/constants";
import {
  hasCandidateAntiIntent,
  hasHiringIntent,
  normalize,
  parseQuery,
  suggestSkillsForTitleWide,
  tokenScore,
  withArticles,
} from "../extension-helpers/helpers";
// import { TEST_SENTENCES } from "../extension-helpers/test";

type RouteKey =
  | "home"
  | "taskBoard"
  | "profile"
  | "clients"
  | "reports"
  | "aiInterview"
  | "settings"
  | "candidates"
  | "jobs"
  | "jobCreate"
  | "assistant"
  | "candidateTest"
  | "integrations"
  | "manageTeam"
  | "navBack"
  | "navForward"
  | "reload";

const VERB_RE = new RegExp(
  `\\b(?:${VERBS.map((v) => v.replace(/\s+/g, "\\s+")).join("|")})\\b`,
  "i",
);
const SPECIAL_BACK_RE =
  /\b(back|previous|prev|go back|step back|navigate back)\b/i;
const SPECIAL_FORWARD_RE =
  /\b(forward|next|go forward|step forward|navigate forward)\b/i;
const SPECIAL_RELOAD_RE =
  /\b(reload|refresh|reload page|refresh page|hard\s+refresh)\b/i;

const alias: Record<RouteKey, string[]> = {
  home: withArticles(["home", "dashboard", "main", "start", "landing"]),
  taskBoard: withArticles(["task board", "kanban", "tasks board"]),
  profile: withArticles(["profile", "account", "my account"]),
  clients: withArticles([
    "client",
    "client list",
    "client directory",
    "client management",
    "client overview",
  ]),
  reports: withArticles([
    "report and analytics",
    "reports and analytics",
    "report",
    "analytics",
    "insight",
    "metric",
    "statistic",
  ]),
  aiInterview: withArticles([
    "ai interview",
    "virtual interview",
    "interview with ai",
    "talk to ai",
  ]),
  settings: withArticles([
    "setting",
    "configuration",
    "preference",
    "system setting",
    "account setting",
  ]),
  candidates: withArticles([
    "candidate",
    "candidate list",
    "candidate directory",
  ]),
  jobs: withArticles([
    "job",
    "job list",
    "job board",
    "job opening",
    "available job",
  ]),
  jobCreate: withArticles([
    "create job",
    "new job",
    "job creation",
    "post a job",
    "job posting",
  ]),
  assistant: withArticles(["koalabyte assistant", "assistant"]),
  candidateTest: withArticles([
    "test for candidate",
    "candidate test",
    "the test",
  ]),
  integrations: withArticles([
    "integration",
    "integration setting",
    "connect integration",
  ]),
  manageTeam: withArticles([
    "manage team",
    "team management",
    "team setting",
    "team",
  ]),
  navBack: [
    "previous page",
    "go back",
    "navigate back",
    "back",
    "step back",
    "one step back",
    "prior page",
  ],
  navForward: [
    "next page",
    "go forward",
    "navigate forward",
    "forward",
    "step forward",
    "one step forward",
  ],
  reload: ["reload", "refresh", "refresh page", "reload page"],
};

const routes: Record<RouteKey, string> = {
  home: "/dashboard",
  taskBoard: "/dashboard/task-board",
  profile: "/dashboard/settings",
  clients: "/dashboard/clients",
  reports: "/dashboard/report-and-analytics",
  aiInterview: "/dashboard/ai-interview",
  settings: "/dashboard/setting",
  candidates: "/dashboard/candidates",
  jobs: "/dashboard/jobs",
  jobCreate: "/dashboard/jobs/create-job",
  assistant: "/dashboard/koalabyte-assistant",
  candidateTest: "/dashboard/test-for-cadidate",
  integrations: "/dashboard/integrations",
  manageTeam: "/dashboard/manage-team",
  navBack: "__back__",
  navForward: "__forward__",
  reload: "__reload__",
};

const buildVerbPart = () =>
  `(?:${[
    ...VERBS,
    ...VERBS.map((v) => v + " the"),
    ...VERBS.map((v) => v + " my"),
  ]
    .map((v) => v.replace(/\s+/g, "\\s+"))
    .join("|")})`;
const buildPageWordPart = () => `(?:\\s+(?:${PAGE_WORDS.join("|")}))?`;
const buildPronounPart = () => `(?:\\s+(?:${PRONOUNS.join("|")}))?`;
const buildFillersPrefix = () =>
  `(?:${FILLERS_PREFIX.map((f) => f.replace(/\s+/g, "\\s+")).join("|")}\\s+)?`;
const buildFillersSuffix = () =>
  `(?:\\s+(?:${FILLERS_SUFFIX.map((f) => f.replace(/\s+/g, "\\s+"))}))?`;

const INTENT_RE = new RegExp(
  buildFillersPrefix() +
    buildVerbPart() +
    "(?:\\s+(?:to|into|onto|over\\s+to|back\\s+to))?" +
    buildPronounPart() +
    "\\s+(?<target>[\\p{L}\\p{N}\\-\\s]{1,64})" +
    buildPageWordPart() +
    buildFillersSuffix(),
  "iu",
);

export function useGlobalVoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [transcriptText, setTranscriptText] = useState("");
  const lastNavAt = useRef(0);
  const lastFilterAt = useRef(0);
  const lastFilterSig = useRef<string>("");
  const lastRawRef = useRef<string>("");
  const debounceRef = useRef<number | null>(null);

  const phraseIndex = useMemo(() => {
    const list: Array<{ key: RouteKey; phrase: string }> = [];
    (Object.keys(alias) as RouteKey[]).forEach((k) =>
      alias[k].forEach((p) => list.push({ key: k, phrase: normalize(p) })),
    );
    return list;
  }, []);

  const coolDownMs = 1000;
  const DEBOUNCE_MS = 800;

  const resolveNavKey = (raw: string): RouteKey | null => {
    const text = normalize(raw);
    if (SPECIAL_BACK_RE.test(text)) return "navBack";
    if (SPECIAL_FORWARD_RE.test(text)) return "navForward";
    if (SPECIAL_RELOAD_RE.test(text)) return "reload";
    const hasVerb = VERB_RE.test(text);
    if (!hasVerb) return null;

    let captured = "";
    const m = INTENT_RE.exec(text);
    if (m?.groups?.target) captured = m.groups.target as string;

    captured = normalize(
      captured
        .replace(new RegExp(`\\b(?:${PRONOUNS.join("|")})\\b`, "gi"), "")
        .replace(new RegExp(`\\b(?:${PAGE_WORDS.join("|")})\\b`, "gi"), ""),
    );
    if (!captured) return null;

    let best: { key: RouteKey; score: number } | null = null;
    for (const c of phraseIndex) {
      const s = tokenScore(captured, c.phrase);
      if (!best || s > best.score) best = { key: c.key, score: s };
    }
    return best && best.score >= 0.5 ? best.key : null;
  };

  const hasNavIntent = (raw: string) => {
    const t = normalize(raw);
    if (
      SPECIAL_BACK_RE.test(t) ||
      SPECIAL_FORWARD_RE.test(t) ||
      SPECIAL_RELOAD_RE.test(t)
    )
      return true;
    return VERB_RE.test(t) && !!resolveNavKey(raw);
  };

  const goTo = (key: RouteKey | null) => {
    if (!key) return false;
    const dest = routes[key];
    if (!dest) return false;
    if (dest === "__back__") {
      if (window.history.length > 1) window.history.back();
      return true;
    }
    if (dest === "__forward__") {
      window.history.forward();
      return true;
    }
    if (dest === "__reload__") {
      window.location.reload();
      return true;
    }
    navigate(dest);
    return true;
  };

  // NEW: take a plain location string and fetch the first match
  const fetchFirstLocation = async (locStr?: string | null) => {
    try {
      const q = (locStr || "").trim();
      if (!q) return null;
      const res = await dispatch(
        getLocationForCandidates({ page: 1, limit: 10, keywords: q }),
      ).unwrap();

      const rows: any[] = Array.isArray(res)
        ? res
        : Array.isArray(res?.rows)
          ? res.rows
          : Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res?.data?.rows)
              ? res.data.rows
              : Array.isArray(res?.data?.data)
                ? res.data.data
                : [];

      if (!rows.length) return null;
      return rows[0];
    } catch {
      return null;
    }
  };

  // useEffect(() => {
  //   for (let t of TEST_SENTENCES) {
  //     const payload = parseQuery(t);

  //     console.log(t, payload);
  //   }
  // }, []);

  useEffect(() => {
    const finalize = async () => {
      const raw = (window as any).__kbVoiceBuffer__ as string;
      if (!raw) return;

      // hard guard against duplicate identical speech events
      if (normalize(raw) === normalize(lastRawRef.current)) return;
      lastRawRef.current = raw;

      const now = Date.now();
      const t = normalize(raw);
      const navIntent = hasNavIntent(raw);
      const onCreateJob = location.pathname === "/dashboard/jobs/create-job";

      // Use your minimal intent gate
      const filterIntent =
        onCreateJob && hasHiringIntent(t) && !hasCandidateAntiIntent(t);

      const navKey = resolveNavKey(raw);
      let didNavigate = false;
      let didFilter = false;

      if (navKey && now - lastNavAt.current >= coolDownMs) {
        lastNavAt.current = now;
        didNavigate = goTo(navKey);
      }
      if (didNavigate) return;

      if (filterIntent) {
        // parse with your simplified helper
        const parsed = parseQuery(raw); // { keyword, tenure, location }

        const skills = suggestSkillsForTitleWide(parsed.keyword);
        // if no meaningful bits, bail
        const nothingUseful =
          !parsed.keyword && !parsed.tenure && !parsed.location;
        if (nothingUseful) {
          if (!navIntent)
            toast.error("Unable to get the candidates with filters");
        } else {
          const loc = await fetchFirstLocation(parsed.location);

          const tenure = parsed.tenure
            ? { min: parsed.tenure.min ?? 0, max: parsed.tenure.max ?? 0 }
            : { min: 0, max: 0 };

          const payload = {
            keywords: parsed.keyword ?? "",
            tenure,
            skills,
            location: loc
              ? [
                  {
                    id: (loc as any).id || (loc as any).locationId,
                    title: (loc as any).title,
                  },
                ]
              : [],
          };

          const empty =
            !payload.keywords &&
            payload.skills.length === 0 &&
            payload.location.length === 0 &&
            payload.tenure.min === 0 &&
            payload.tenure.max === 0;

          if (!empty) {
            const sig = JSON.stringify(payload);
            const filterCooldownOk = now - lastFilterAt.current >= coolDownMs;
            if (sig !== lastFilterSig.current && filterCooldownOk) {
              lastFilterSig.current = sig;
              lastFilterAt.current = now;
              didFilter = true;

              dispatch(setCandidatesFilterOptions(payload));
              dispatch(
                getFilteredCandidates({
                  page: 1,
                  limit: 10,
                  ...payload,
                } as any),
              );
            }
          } else {
            if (!navIntent)
              toast.error("Unable to get the candidates with filters");
          }
        }
      }

      if (!didNavigate && !didFilter && !navIntent && !filterIntent) {
        toast.error("Unable to get");
      }
    };

    const handler = (e: any) => {
      const raw = String(e?.detail ?? "");
      if (!raw) return;
      (window as any).__kbVoiceBuffer__ = raw;
      setTranscriptText(raw);
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        finalize();
      }, DEBOUNCE_MS);
      setTimeout(() => setTranscriptText(""), 2200);
    };

    const KEY = "__kbGlobalVoiceListener__";
    if (!(window as any)[KEY]) {
      (window as any)[KEY] = true;
      window.addEventListener("FROM_IFRAME_SPEECH", handler as EventListener, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener(
        "FROM_IFRAME_SPEECH",
        handler as EventListener,
      );
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      (window as any)[KEY] = false;
    };
  }, [location.pathname, navigate, dispatch, phraseIndex]);

  return { transcriptText };
}