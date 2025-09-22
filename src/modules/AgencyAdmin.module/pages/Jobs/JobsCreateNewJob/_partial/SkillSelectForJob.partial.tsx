import { useState, KeyboardEvent } from "react";
import Label from "../../../../../../components/form/Label";
import SelectReact from "../../../../../../components/form/SelectReact";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store";
import {
  getAllCandidatesList,
  getCustomProfiles,
  setCandidatesFilterOptions,
} from "../../../../../../store/slices/Candiates.slice";

export const SkillsSelectForJob = ({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) => {
  const { filterOptions, candidateSource } = useSelector(
    (state: RootState) => state.candidates,
  );
  const dispatch: AppDispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>("");
  const [selectInputValue, setSelectInputValue] = useState<string>(""); // Local state for SelectReact input

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      const newSkill = inputValue.trim();
      const updatedSkills = [...formData.skills, newSkill];
      setFormData({
        ...formData,
        skills: updatedSkills,
      });
      setInputValue("");
      setSelectInputValue(""); // Clear the SelectReact input
    }
  };

  const handleChange = async (selectedOptions: any) => {
    const selectedValues = await selectedOptions.map(
      (option: any) => option.value,
    );

    await setFormData({
      ...formData,
      skills: selectedValues,
    });

    await dispatch(
      setCandidatesFilterOptions({ ...filterOptions, skills: selectedValues }),
    );

    if (candidateSource === "linkedin") {
      dispatch(
        getAllCandidatesList({
          page: 1,
          limit: 10,
          filterOptions: { ...filterOptions, skills: selectedValues },
        }),
      );
    } else {
      dispatch(
        getCustomProfiles({
          page: 1,
          limit: 10,
          filterOptions: { ...filterOptions, skills: selectedValues },
        }),
      );
    }
  };

  return (
    <div className="w-full">
      <Label htmlFor="skills" className="font-light">
        Skills
      </Label>

      <SelectReact
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        options={[
          {
            label: "Artificial Intelligence",
            value: "Artificial Intelligence",
          },
          {
            label: "Data Science & Analytics",
            value: "Data Science & Analytics",
          },
          { label: "Cybersecurity", value: "Cybersecurity" },
          {
            label: "Cloud Computing (AWS, Azure, GCP)",
            value: "Cloud Computing (AWS, Azure, GCP)",
          },
          { label: "DevOps", value: "DevOps" },
          { label: "Full-Stack Development", value: "Full-Stack Development" },
          {
            label: "JavaScript (React, Node)",
            value: "JavaScript (React, Node)",
          },
          { label: "Python", value: "Python" },
          { label: "UI/UX Design", value: "UI/UX Design" },
          { label: "Blockchain", value: "Blockchain" },
          { label: "Digital Marketing", value: "Digital Marketing" },
          { label: "Project Management", value: "Project Management" },
          { label: "Business Analysis", value: "Business Analysis" },
          {
            label: "Internet of Things (IoT)",
            value: "Internet of Things (IoT)",
          },
          {
            label: "Extended Reality (AR/VR)",
            value: "Extended Reality (AR/VR)",
          },
          { label: "C++ & C#", value: "C++ & C#" },
          { label: "Java", value: "Java" },
          { label: "Data Visualization", value: "Data Visualization" },
          { label: "Problem-Solving", value: "Problem-Solving" },
          {
            label: "Communication & Collaboration",
            value: "Communication & Collaboration",
          },
        ]}
        isMulti
        isClearable
        isSearchable
        id="skills"
        name="skills"
        placeholder="Write skill and press enter"
        onInputChange={(value: string) => {
          setInputValue(value);
          setSelectInputValue(value); // Update local input state
        }}
        onKeyDown={handleKeyDown}
        value={formData?.skills?.map((skill: any) => ({
          value: skill,
          label: skill,
        }))}
        onChange={handleChange}
        inputValue={selectInputValue} // Pass the local input value
      />
    </div>
  );
};
