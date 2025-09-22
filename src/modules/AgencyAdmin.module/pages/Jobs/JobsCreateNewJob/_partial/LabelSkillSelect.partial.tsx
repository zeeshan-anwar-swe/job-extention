import { useState, KeyboardEvent } from "react";
import { textValidationCheck } from "../../../../../../utils/validationCheck";
import Label from "../../../../../../components/form/Label";
import SelectReact from "../../../../../../components/form/SelectReact";

type AllowedId = "skills";

const LabelSkillSelectPartial = ({
  label,
  id,
  formData,
  setFormData,
}: {
  label?: string;
  id: AllowedId;
  detail?: string;
  formData: any;
  setFormData: any;
}) => {
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

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setFormData({
      ...formData,
      skills: selectedValues,
    });
  };

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id ?? ""} className="font-light">
          {textValidationCheck(label)}
        </Label>
      )}

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
        id={id}
        name={id}
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

export default LabelSkillSelectPartial;
