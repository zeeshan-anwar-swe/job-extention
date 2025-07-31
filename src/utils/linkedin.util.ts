import { format } from 'date-fns';

interface Experience {
  id: string;
  linkedinId: string;
  company: string;
  companyId: string | null;
  companyUrl: string | null;
  industry: string | null;
  location: string | null;
  role: string;
  start: {
    year: number;
    month?: number;
  };
  end: {
    year: number;
    month?: number;
  } | null;
  description: string | null;
  skills: {
    name: string;
    endorsement_count: number;
  }[];
  logo: string | null;
  createdAt: string;
  updatedAt: string;
}

export const calculateTotalExperience = (experiences: Experience[] | null | undefined): string => {
  // Add a defensive check here to ensure experiences is an array
  if (!experiences || !Array.isArray(experiences)) {
    console.warn("Invalid input: 'experiences' is not an array or is null/undefined. Returning '0 months'.");
    return '0 months';
  }

  let totalMonths = 0;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  for (const experience of experiences) {
    if (!experience.start || typeof experience.start.year === 'undefined') {
      console.warn("Skipping experience due to missing or invalid 'start' data:", experience);
      continue;
    }

    const startYear = experience.start.year;
    const startMonth = experience.start.month ?? 1;

    let endYear: number;
    let endMonth: number;

    if (experience.end === null || typeof experience.end.year === 'undefined') {
      endYear = currentYear;
      endMonth = currentMonth;
    } else {
      endYear = experience.end.year;
      endMonth = experience.end.month ?? 1;
    }

    const monthsInExperience = (endYear - startYear) * 12 + (endMonth - startMonth);
    totalMonths += monthsInExperience;
  }

  if (totalMonths < 12) {
    return `${totalMonths} months`;
  } else {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0) {
      return `${years} years`;
    } else {
      // You can return a more descriptive string like "X years Y months"
      // or keep it as "X years" for simplicity.
      // The original code only returned years if there were remaining months.
      return `${years} years and ${months} months`;
    }
  }
};