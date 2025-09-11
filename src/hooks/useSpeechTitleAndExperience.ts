// useSpeechTitleAndExperience.ts
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  setCandidatesFilterOptions,
  FilterOptionsType,
  getAllCandidatesList,
} from "../store/slices/Candiates.slice";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const wordsToNumber: Record<string, number> = {
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
};
const toNum = (t: string) =>
  /^\d+$/.test(t) ? parseInt(t, 10) : wordsToNumber[t] ?? NaN;

type Extracted = { title?: string; tenure?: { min: number; max: number } };

// Pull "<something> developer" and optional years
function extractTitleAndExperience(raw: string): Extracted {
  const text = normalize(raw);
  const out: Extracted = {};

  // Title ending with "developer"
  const m =
    text.match(
      /^(?:get|find|search|show|look ?up)\s+(?:candidates?\s+(?:for|of)\s+)?(.+?\bdeveloper)\b(?:\s+(?:position|role|job|jobs))?/,
    ) || text.match(/\b(.+?\bdeveloper)\b(?:\s+(?:position|role|job|jobs))?/);
  if (m) out.title = m[1].replace(/\s+/g, " ").trim();

  // Range "3 to 5 years" / "three- five years"
  const r = text.match(
    /(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*(?:to|-|–)\s*(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*(?:years?|yrs?)?/,
  );
  if (r) {
    const a = toNum(r[1]),
      b = toNum(r[2]);
    if (!isNaN(a) && !isNaN(b))
      out.tenure = { min: Math.min(a, b), max: Math.max(a, b) };
  } else {
    // Single "2 years" / "at least 3 years"
    const s = text.match(
      /(?:at least |minimum |min )?(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*(?:years?|yrs?)/,
    );
    if (s) {
      const n = toNum(s[1]);
      if (!isNaN(n)) out.tenure = { min: n, max: n };
    }
  }
  return out;
}

export function useSpeechTitleAndExperience() {
  const dispatch = useDispatch<AppDispatch>();

  // Debounce timer & last fired payload (to de-dupe)
  const debounceRef = useRef<number | null>(null);
  const bufferRef = useRef<string>(""); // latest transcript chunk
  const lastKeyRef = useRef<string>(""); // last applied payload signature
  const DEBOUNCE_MS = 900; // silence window; tweak if needed

  useEffect(() => {
    const KEY = "__kbSpeechTitleExpListener__";
    if ((window as any)[KEY]) return; // singleton across app
    (window as any)[KEY] = true;

    const EVENT = "FROM_IFRAME_SPEECH";

    const finalize = () => {
      const { title, tenure } = extractTitleAndExperience(bufferRef.current);
      if (!title) return; // require "... developer"

      const sig = JSON.stringify({ title, tenure });
      if (sig === lastKeyRef.current) return; // same as last applied -> skip
      lastKeyRef.current = sig;

      const payload: Partial<FilterOptionsType> & { keywords?: string } = {
        keywords: title,
        tenure: tenure ?? { min: 0, max: 0 },
        skills: [],
        location: [],
      };

      // Sync UI (no network) then ONE fetch call
      dispatch(setCandidatesFilterOptions(payload as any));
      dispatch(
        getAllCandidatesList({
          page: 1,
          limit: 10,
          filterOptions: {
            keywords: payload.keywords,
            tenure: payload.tenure as any,
            skills: [],
            location: [],
          },
        }),
      );
    };

    const handler = (e: any) => {
      const raw = String(e?.detail ?? "");
      if (!raw) return;

      bufferRef.current = raw; // keep latest transcript
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      // If your iframe can send a "final" flag, you can short-circuit here instead of waiting.
      debounceRef.current = window.setTimeout(finalize, DEBOUNCE_MS);
    };

    window.addEventListener(EVENT, handler as EventListener, { passive: true });

    return () => {
      window.removeEventListener(EVENT, handler as EventListener);
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      (window as any)[KEY] = false;
    };
  }, [dispatch]);
}
