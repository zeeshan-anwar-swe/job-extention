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
import LabelTitlepartial from "./LabelTitle.partial";
import { NavSeparator } from "../../../../../../components/layouts/Navigation/Nav";
import ResultUserDataPartial from "./ResultUserData.partial";
import Button from "../../../../../../components/ui/Button";
import AssignClientModalPartial from "./AssignJob.partial";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store";
import { createJobs } from "../../../../../../store/slices/Jobs.slice";
import LabelSelectPartial from "./LabelSelect.partial";
import LabelSkillSelectPartial from "./LabelSkillSelect.partial";
import LabelTitleTextareaPartial from "./LabelTitleTextarea.partial";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TitleInputForJobPartial } from "./TitleInputForJob.partial";
import { ExperienceSelectForJobPartial } from "./ExperienceSelectForJob.partial";
import { LocationSelectForJob } from "./LocationSelectForJob.partial";
import { SkillsSelectForJob } from "./SkillSelectForJob.partial";
import RichText from "../../../../../../components/RichText";
import { Descendant } from "slate";
import Label from "../../../../../../components/form/Label";
import SelectReactCreateable from "../../../../../../components/form/SelectReactCreateable";
import { MultiValue } from "react-select";
import SelectReact from "../../../../../../components/form/SelectReact";
import { ExperienceRangeSelector } from "./ExperienceRangeSelector";

export interface FormData {
  title: string;
  description: Descendant[];
  spokenLanguages: string[];
  type: string;
  location: string;
  skills: string[];
  experienceMin: number;
  experienceMax: number;
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
    location: "",
    type: "",
    skills: [],
    spokenLanguages: [],
    experienceMin: 0,
    experienceMax: 0,
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
    } else if (formData.skills.length < 1) {
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
              name="spokenLanguages"
              isMulti
              value={
                formData.spokenLanguages.map((lang) => ({
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
                  spokenLanguages: languages,
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

        <ExperienceRangeSelector
          formData={formData}
          setFormData={setFormData}
        />

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
          <AssignClientModalPartial setModal={setModal} modal={modal} />
        </CardFooterChild>
      </CardFooter>
    </Card>
  );
};

export default CreateJobLeftSidePartial;
