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
    month?: number; // Month is now optional
  };
  end: {
    year: number;
    month?: number; // Month is now optional
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

export const calculateTotalExperience = (experiences: Experience[]): string => {
  let totalMonths = 0;
  const currentDate = new Date();
  // getMonth() is 0-indexed, so add 1 to get the actual month number (1-12)
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; 

  for (const experience of experiences) {
    // Defensive check: Ensure 'start' object and its 'year' property exist.
    // If not, this experience cannot be calculated, so we skip it.
    if (!experience.start || typeof experience.start.year === 'undefined') {
      console.warn("Skipping experience due to missing or invalid 'start' data:", experience);
      continue; 
    }

    const startYear = experience.start.year;
    // Default to January (1) if start month is not provided (month is optional)
    const startMonth = experience.start.month ?? 1; 
    
    let endYear: number;
    let endMonth: number;

    // Defensive check: If 'end' object is null, or its 'year' property is missing,
    // use the current date as the end date.
    if (experience.end === null || typeof experience.end.year === 'undefined') {
      endYear = currentYear;
      endMonth = currentMonth;
    } else {
      endYear = experience.end.year;
      // Default to January (1) if end month is not provided (month is optional)
      endMonth = experience.end.month ?? 1; 
    }

    // Calculate duration in months for the current experience period
    const monthsInExperience = (endYear - startYear) * 12 + (endMonth - startMonth);
    totalMonths += monthsInExperience;
  }

  // If total experience is less than 12 months, return the duration in months
  if (totalMonths < 12) {
    return `${totalMonths} months`;
  } else {
    // Calculate total years and remaining months
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    // Format the output string based on whether there are remaining months
    if (months === 0) {
      return `${years} years`;
    } else {
      return `${years} years`;
    }
  }
};
