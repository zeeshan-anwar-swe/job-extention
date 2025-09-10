import { useState } from "react";
import Button from "../../../../../../components/ui/Button";
import Card, {
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/Card";
import LabelSkillSelectPartial from "./LabelSkillSelect.partial";

import { AppDispatch } from "../../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterOptionsType,
  getAllCandidatesList,
  getCustomProfiles,
  getFilteredCandidates,
  setCandidatesFilterOptions,
  setCandidatesLocations,
  setCandidatesSearch,
} from "../../../../../../store/slices/Candiates.slice";
import { RootState } from "../../../../../../store";
import { JobsFilterDropdownLocation } from "./JobsFilterDropdownLocation";
import Dropdown, {
  DropdownMenu,
  DropdownToggle,
} from "../../../../../../components/ui/Dropdown";

interface ExperienceItem {
  title: string;
  value: number;
}

const JobFilterDropdownPartial = () => {
  const { filterOptions, candidateSource } = useSelector(
    (state: RootState) => state.candidates,
  );

  const emptyFilterOptions: FilterOptionsType = {
    skills: [],
    location: [],
    keywords: "",
    tenure: { min: 0, max: 0 },
  };
  const dispatch: AppDispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const experience: ExperienceItem[] = [
    { title: "1 Year", value: 1 },
    { title: "2 Year", value: 2 },
    { title: "3 Year", value: 3 },
    { title: "4 Year", value: 4 },
    { title: "5 Year", value: 5 },
    { title: "6 Year", value: 6 },
    { title: "7 Year", value: 7 },
    { title: "8 Year", value: 8 },
    { title: "9 Year", value: 9 },
    { title: "10 Year", value: 10 },
    { title: "10+ Year", value: 100 },
  ];

  const handleMouseLeave = () => {
    dropdownOpen&&
    setDropdownOpen(true);
  };

  const handleExperienceClick = (value: number) => {
    const { tenure } = filterOptions;
    if (!tenure) return;
    let newMin = tenure.min;
    let newMax = tenure.max;

    // Case 1: If the clicked value matches an existing boundary, toggle it off.
    if (value === newMin && newMin !== 0) {
      newMin = 0;
      // If min was set and max was also set, but min is now 0,
      // and max is no longer a valid upper bound (e.g., if max was 5 and min was 3, and 3 is clicked, now min is 0, so 5 is still a valid max),
      // we might want to ensure the range remains logical.
      // If newMax now becomes the only set value, it implicitly becomes the 'min' of a single-point range, or we clear it too.
      if (newMax !== 0 && newMin === 0) {
        // If we've just cleared min, and max is still set,
        // decide if max should become the new min of a single-point range, or clear the whole range.
        // For a mature range, usually clearing min means the entire range is reset, or max becomes the new lower bound.
        // Let's make it smarter: if min is cleared, and max still exists, max becomes the new min.
        newMin = newMax;
        newMax = 0;
      }
    } else if (value === newMax && newMax !== 0) {
      newMax = 0;
      // If max was cleared and min is still set, ensure min remains the lower bound.
      // If min was e.g. 5, and max was 10, and 10 is clicked, now max is 0. So 5 should just be min.
    }
    // Case 2: If the range is empty (both 0), set the clicked value as the initial min.
    else if (newMin === 0 && newMax === 0) {
      newMin = value;
    }
    // Case 3: If only one boundary is set (either min or max is 0, but not both)
    else if (newMin !== 0 && newMax === 0) {
      // Only min is set, and max is 0
      if (value < newMin) {
        newMax = newMin; // Current min becomes the new max
        newMin = value; // Clicked value becomes the new min
      } else if (value >= newMin) {
        newMax = value; // Clicked value becomes the new max
      }
    } else if (newMax !== 0 && newMin === 0) {
      // Only max is set, and min is 0 (less common in a typical UI, but for robustness)
      if (value > newMax) {
        newMin = newMax; // Current max becomes the new min
        newMax = value; // Clicked value becomes the new max
      } else if (value <= newMax) {
        newMin = value; // Clicked value becomes the new min
      }
    }
    // Case 4: Both min and max are already set.
    else if (newMin !== 0 && newMax !== 0) {
      if (value <= newMin) {
        newMin = value; // Update min if the value is less than or equal to current min
      } else if (value >= newMax) {
        newMax = value; // Update max if the value is greater than or equal to current max
      } else {
        // If the value is between min and max, you might have different behaviors:
        // 1. Reset the entire range: newMin = 0; newMax = 0;
        // 2. Treat it as a new single point: newMin = value; newMax = 0;
        // 3. Keep the current range: (do nothing)
        // For this mature version, let's assume if it's strictly between, we pick the closer one
        // or we clear the whole range to start fresh for a new point.
        // Let's choose to reset the range if a value strictly inside is clicked.
        newMin = value;
        newMax = 0;
      }
    }

    // Final check: Ensure min is always less than or equal to max, unless both are 0.
    // Also, if one is 0 and the other is not, the non-zero one effectively becomes the single-point range.
    if (newMin !== 0 && newMax !== 0 && newMin > newMax) {
      [newMin, newMax] = [newMax, newMin]; // Swap them if they got out of order
    } else if (newMin === 0 && newMax !== 0) {
      // If min is 0 but max is not, max becomes the new min, and newMax becomes 0
      newMin = newMax;
      newMax = 0;
    }

    dispatch(
      setCandidatesFilterOptions({
        ...filterOptions,
        tenure: { min: newMin, max: newMax },
      }),
    );
  };

  const handleSkillsChange = (skillChangeEvet: any) => {
    dispatch(setCandidatesFilterOptions(skillChangeEvet));
  };

  const applyFilter = () => {
    const { location, tenure, skills, keywords } = filterOptions;

    if (candidateSource === "linkedin") {
      dispatch(
        getFilteredCandidates({
          page: 1,
          limit: 10,
          skills,
          location,
          keywords,
          tenure,
        }),
      );
    } else {
      dispatch(getCustomProfiles({ page: 1, limit: 10, filterOptions }));
    }

    dropdownOpen && setDropdownOpen(false);
    // dispatch(setCandidatesLocations([]));
  };

  const clearAllFilters = async () => {
    await dispatch(setCandidatesFilterOptions(emptyFilterOptions));
    await dispatch(setCandidatesLocations([{title:"Search location...", id:""}]));
    await dispatch(setCandidatesSearch(""));
    dropdownOpen && setDropdownOpen(false);
    if (candidateSource === "linkedin") {
      await dispatch(
        getAllCandidatesList({
          page: 1,
          limit: 10,
          filterOptions: emptyFilterOptions,
        }),
      );
    } else {
      await dispatch(
        getCustomProfiles({
          page: 1,
          limit: 10,
          filterOptions: emptyFilterOptions,
        }),
      );
    }
  };

  return (
    <div onMouseLeave={handleMouseLeave} >
      <Dropdown onMouseOver={()=>null} isOpen={dropdownOpen} setIsOpen={setDropdownOpen}>
        <DropdownToggle hasIcon={false}>
          <Button
            rounded="rounded-full"
            variant={dropdownOpen ? "solid" : "outline"}
            color={dropdownOpen ? "blue" : "zinc"}
            icon="HeroBarFilter"
          >
            Filter
          </Button>
        </DropdownToggle>

        <DropdownMenu placement="bottom-end">
          <Card>
            <CardHeader>
              <CardTitle className="!text-lg !font-medium">
                Experience
              </CardTitle>
            </CardHeader>
            <CardBody className="grid grid-cols-3 gap-2">
              {experience.map((item) => (
                <Button
                  rounded="rounded-full"
                  key={item.value}
                  color={
                    filterOptions?.tenure?.min === item?.value ||
                    filterOptions?.tenure?.max === item?.value
                      ? "blue"
                      : "zinc"
                  }
                  variant={
                    filterOptions?.tenure?.min === item?.value ||
                    filterOptions?.tenure?.max === item?.value
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => handleExperienceClick(item?.value)}
                >
                  {item.title}
                </Button>
              ))}
            </CardBody>
          </Card>
          <JobsFilterDropdownLocation />
          <Card>
            <CardHeader>
              <CardTitle className="!text-lg !font-medium">Skills</CardTitle>
            </CardHeader>
            <CardBody>
              <LabelSkillSelectPartial
                setFormData={handleSkillsChange}
                id="skills"
                formData={filterOptions}
                label=""
              />
            </CardBody>
          </Card>
          <Card>
            <CardFooter>
              <Button
                className="flex-1"
                variant="outline"
                color="zinc"
                onClick={clearAllFilters}
              >
                Clear All
              </Button>
              <Button onClick={applyFilter} className="flex-1" variant="solid">
                Apply Filter
              </Button>
            </CardFooter>
          </Card>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default JobFilterDropdownPartial;
