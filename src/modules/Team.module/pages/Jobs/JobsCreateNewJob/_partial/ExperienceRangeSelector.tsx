import { useLocation } from "react-router-dom";
import Label from "../../../../../../components/form/Label";
import SelectReact from "../../../../../../components/form/SelectReact";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/useReduxStore";
import {
  getAllCandidatesList,
  getCustomProfiles,
  setCandidatesFilterOptions,
} from "../../../../../../store/slices/Candiates.slice";
import { FormData } from "./CreateJobLeftSide.partial";

export const ExperienceRangeSelector = ({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: any;
}) => {
  const { pathname } = useLocation();

  const isDetailPage =
    pathname === "/dashboard/jobs/view-job-details" ||
    pathname === "/dashboard/jobs/edit-job";

  const dispatch = useAppDispatch();
  const { filterOptions, candidateSource } = useAppSelector(
    (state) => state.candidates,
  );
  const allExperienceOptions = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];
  // Filtered options for Experience Min dropdown
  const filteredExperienceMinOptions = allExperienceOptions.filter(
    (option) =>
      formData.experienceMax === 0 || option.value < formData.experienceMax,
  );

  // Filtered options for Experience Max dropdown
  const filteredExperienceMaxOptions =
    formData.experienceMin === 0
      ? [...allExperienceOptions, { value: 20, label: "10+" }]
      : [...allExperienceOptions, { value: 20, label: "10+" }].filter(
          (option) => option.value > formData.experienceMin,
        );

  const dispatchGetCandidates = async (tenure: {
    min: number;
    max: number;
  }) => {
    if (candidateSource === "linkedin") {
      dispatch(
        getAllCandidatesList({
          page: 1,
          limit: 10,
          filterOptions: { ...filterOptions, tenure },
        }),
      );
    } else {
      dispatch(
        getCustomProfiles({
          page: 1,
          limit: 10,
          filterOptions: { ...filterOptions, tenure },
        }),
      );
    }
  };

  const handleMinChange = async (selectedOption: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      experienceMin: selectedOption ? selectedOption.value : 0,
      experienceMax:
        selectedOption && selectedOption.value >= prevFormData.experienceMax
          ? 0
          : prevFormData.experienceMax,
    }));

    if (!isDetailPage) {
      await dispatch(
        setCandidatesFilterOptions({
          ...filterOptions,
          tenure: {
            max: filterOptions.tenure?.max ?? 0,
            min: selectedOption.value as number,
          },
        }),
      );

      if (selectedOption.value < formData.experienceMax) {
        dispatchGetCandidates({
          min: selectedOption.value as number,
          max: formData.experienceMax,
        });
      }
    }
  };

  const handleMaxChange = async (selectedOption: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      experienceMax: selectedOption ? selectedOption.value : 0,
      experienceMin:
        selectedOption && selectedOption.value <= prevFormData.experienceMin
          ? 0
          : prevFormData.experienceMin,
    }));

    if (!isDetailPage) {
      await dispatch(
        setCandidatesFilterOptions({
          ...filterOptions,
          tenure: {
            min: filterOptions.tenure?.min ?? 0,
            max: selectedOption.value as number,
          },
        }),
      );

      if (selectedOption.value > formData.experienceMin) {
        dispatchGetCandidates({
          min: formData.experienceMax,
          max: selectedOption.value as number,
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-4 max-md:flex-col">
      <div className="w-full">
        <Label htmlFor="experienceFrom">Experience From</Label>
        <SelectReact
          isClearable
          name="experienceFrom"
          placeholder="Select minimum experience"
          options={filteredExperienceMinOptions}
          value={
            formData.experienceMin
              ? {
                  value: formData.experienceMin,
                  label: formData.experienceMin.toString(),
                }
              : null
          }
          onChange={handleMinChange}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="experienceTo">Experience To</Label>
        <SelectReact
          isClearable
          name="experienceTo"
          placeholder="Select maximum experience"
          options={filteredExperienceMaxOptions}
          value={
            formData.experienceMax
              ? {
                  value: formData.experienceMax,
                  label: `${formData.experienceMax === 20 ? "10+" : formData.experienceMax}`,
                }
              : null
          }
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};
