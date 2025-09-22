import React, { useState } from "react";
import Card, {
  CardBody,
  CardFooter,
  CardFooterChild,
  CardHeader,
  CardHeaderChild,
  CardSubTitle,
  CardTitle,
} from "../../../../../../components/ui/Card";
import { NavSeparator } from "../../../../../../components/layouts/Navigation/Nav";
import ResultUserDataPartial from "./ResultUserData.partial";
import Button from "../../../../../../components/ui/Button";
import AssignClientModalPartial from "./AssignJob.partial";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store";
import { createJobs } from "../../../../../../store/slices/Jobs.slice";
import LabelSelectPartial from "./LabelSelect.partial";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TitleInputForJobPartial } from "./TitleInputForJob.partial";
import { LocationSelectForJob } from "./LocationSelectForJob.partial";
import { SkillsSelectForJob } from "./SkillSelectForJob.partial";
import RichText from "../../../../../../components/RichText";
import { Descendant } from "slate";
import Label from "../../../../../../components/form/Label";
import SelectReactCreateable from "../../../../../../components/form/SelectReactCreateable";
import { MultiValue } from "react-select";
import SelectReact from "../../../../../../components/form/SelectReact";
import { Roles } from "../../../../../../constants/role.enums";

export interface FormData {
  title: string;
  description: Descendant[];
  spokenLanguage: string[];
  // experience: string;
  type: string;
  location: string;
  // positions: string;
  skills: string[];
  experienceFrom: string;
  experienceTo: string;
}

type SpokenLanguage = { value: string; label: string };

const CreateJobLeftSidePartial = () => {
  const {
    assignedCandidatesWhileCreatingJob,
    assignedClientWhileCreatingJob,
    assignedCustomCandidatesWhileCreatingJob,
  } = useSelector((state: RootState) => state.jobsSlice);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: [],
    // experience: "",
    location: "",
    type: "",
    // positions: "",
    skills: [],
    spokenLanguage: [],
    experienceFrom: "",
    experienceTo: "",
  });

  const dispatchCreateJob = async () => {
    setIsSubmitting(true);
    const isAssigned = assignedCandidatesWhileCreatingJob.length > 0;
    const customCandidateIds =
      await assignedCustomCandidatesWhileCreatingJob.map((c: any) => c.id);

    if (formData.title.length < 3) {
      toast.error("Enter at least 3 characters for title");
      setIsSubmitting(false);
      return;
    }  else if (formData.skills.length < 1) {
      toast.error("Enter at least one skill");
      setIsSubmitting(false);

      return;
    } else if (formData.location.length < 3) {
      toast.error("Enter at least 3 characters for location");
      setIsSubmitting(false);

      return;
    } else if (formData.type === "") {
      toast.error("Job type should not be empty");
      setIsSubmitting(false);
      return;
    }
    const strigifiedDescription = await JSON.stringify(formData.description);
    const newFormData = await {
      ...formData,
      description: strigifiedDescription,
      customCandidateIds,
    };

    // @ts-ignore
    // prettier-ignore
    await dispatch(createJobs( isAssigned ? {...newFormData, clientId: assignedClientWhileCreatingJob?.id??null,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: {...newFormData,clientId: assignedClientWhileCreatingJob?.id??null}));
    setIsSubmitting(false);
    navigate("/dashboard/jobs");
  };

  const handleDescriptionChange = (newValue: any) => {
    setFormData((prevState) => ({
      ...prevState,
      description: newValue,
    }));
  };

  return (
    <Card className="col-span-8 flex flex-col gap-2 max-lg:col-span-12">
      <CardHeader>
        <CardHeaderChild className="!block">
          <CardTitle>Create a New Job</CardTitle>
          <CardSubTitle>
            Effortlessly create jobs, assign candidates, send to a client.
          </CardSubTitle>
        </CardHeaderChild>
      </CardHeader>
      <CardBody className="flex flex-col gap-y-4">
        <TitleInputForJobPartial
          setFormData={setFormData}
          formData={formData}
        />
        <div className="flex items-center gap-4 max-md:flex-col">
          <div className="w-full">
            <Label htmlFor="positions">Required Spoken Languages</Label>
            <SelectReactCreateable
              name="spokenLanguage"
              isMulti
              value={
                formData.spokenLanguage.map((lang) => ({
                  label: lang,
                  value: lang,
                })) as SpokenLanguage[]
              }
              onChange={(selectedOptions: any) => {
                const languages = selectedOptions
                  ? (selectedOptions as SpokenLanguage[]).map(
                      (option: SpokenLanguage) => option.value,
                    )
                  : [];
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  spokenLanguage: languages,
                }));
              }}
              options={[
                { value: "English", label: "English" },
                { value: "Romansh", label: "Romansh" },
                { value: "Spanish", label: "Spanish" },
                { value: "French", label: "French" },
                { value: "German", label: "German" },
                { value: "Italian", label: "Italian" },
                { value: "Urdu", label: "Urdu" },
                { value: "Hindi", label: "Hindi" },
                { value: "Portuguese", label: "Portuguese" },
              ]}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 max-md:flex-col">
          <div className="w-full">
            <Label htmlFor="experienceFrom">Experience From</Label>
            <SelectReact
              isClearable
              name="experienceFrom"
              placeholder="Select minimum experience"
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
                { value: "7", label: "7" },
                { value: "8", label: "8" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
              ].filter((option) =>
                formData.experienceTo
                  ? Number(option.value) < Number(formData.experienceTo)
                  : true,
              )}
              value={
                formData.experienceFrom
                  ? {
                      value: formData.experienceFrom,
                      label: formData.experienceFrom,
                    }
                  : null
              }
              onChange={(selectedOption: any) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  experienceFrom: selectedOption ? selectedOption.value : "",
                }));
              }}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="experienceTo">Experience To</Label>
            <SelectReact
              isClearable
              name="experienceTo"
              placeholder="Select maximum experience"
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
                { value: "7", label: "7" },
                { value: "8", label: "8" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
                { value: "20", label: "10+" },
              ].filter((option) =>
                formData.experienceFrom
                  ? Number(option.value) > Number(formData.experienceFrom)
                  : true,
              )}
              value={
                formData.experienceTo
                  ? {
                      value: formData.experienceTo,
                      label: formData.experienceTo,
                    }
                  : null
              }
              onChange={(selectedOption: any) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  experienceTo: selectedOption ? selectedOption.value : "",
                }));
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 max-md:flex-col">
          <LabelSelectPartial
            placeholder="Select Job Type"
            id="type"
            setFormData={setFormData}
            formData={formData}
            label="Job Type"
            options={[
              { value: "", label: "" },
              { value: "REMOTE", label: "Remote" },
              { value: "ON_SITE", label: "On Site" },
              { value: "HYBRID", label: "Hybrid" },
            ]}
          />
          <LocationSelectForJob formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-full">
          <Label htmlFor="description">Description</Label>
          <RichText
            id="description"
            value={formData.description}
            className="min-h-48"
            handleChange={handleDescriptionChange}
          />
        </div>

        <SkillsSelectForJob formData={formData} setFormData={setFormData} />
        <NavSeparator className="mt-8" />
      </CardBody>
      <CardFooter className="!flex-col !items-start">
        <CardFooterChild>
          {assignedCandidatesWhileCreatingJob.length > 0 && (
            <CardTitle>Assigned LinkedIn Candidates</CardTitle>
          )}

          <div className="flex w-full flex-wrap items-center gap-4 max-md:flex-col max-md:items-start">
            {assignedCandidatesWhileCreatingJob.map((candidate: any) => (
              <ResultUserDataPartial
                isCustomCandidate={false}
                candidate={candidate}
                key={candidate.id}
              />
            ))}
          </div>
        </CardFooterChild>
        <CardFooterChild>
          {assignedCustomCandidatesWhileCreatingJob.length > 0 && (
            <CardTitle>Assigned Custom Candidates</CardTitle>
          )}

          <div className="flex w-full flex-wrap items-center gap-4 max-md:flex-col max-md:items-start">
            {assignedCustomCandidatesWhileCreatingJob.map((candidate: any) => (
              <ResultUserDataPartial
                isCustomCandidate={true}
                candidate={candidate}
                key={candidate.id}
              />
            ))}
          </div>
        </CardFooterChild>
        <CardFooterChild className="ml-auto">
          <Button
            onClick={() => navigate("/dashboard/jobs")}
            variant="outline"
            color="zinc"
            borderWidth="border"
          >
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            onClick={dispatchCreateJob}
            variant="solid"
          >
            Save Job
          </Button>
          <Button variant="solid" onClick={() => setModal(true)}>
            Assign To client
          </Button>
          <AssignClientModalPartial moduleType={Roles.TEAM} setModal={setModal} modal={modal} />
        </CardFooterChild>
      </CardFooter>
    </Card>
  );
};

export default CreateJobLeftSidePartial;
