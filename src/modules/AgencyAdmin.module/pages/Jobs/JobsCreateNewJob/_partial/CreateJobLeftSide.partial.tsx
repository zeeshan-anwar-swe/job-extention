import React, { useEffect, useState } from 'react';
import Card, {
  CardBody,
  CardFooter,
  CardFooterChild,
  CardHeader,
  CardHeaderChild,
  CardSubTitle,
  CardTitle,
} from '../../../../../../components/ui/Card';
import LabelTitlepartial from './LabelTitle.partial';
import { NavSeparator } from '../../../../../../components/layouts/Navigation/Nav';
import ResultUserDataPartial from './ResultUserData.partial';
import Button from '../../../../../../components/ui/Button';
import AssignClientModalPartial from './AssignJob.partial';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { createDraftJob, createJobs, publishDraftJob, setAssignedCandidatesWhileCreatingJob, updateDraftJob } from '../../../../../../store/slices/Jobs.slice';
import LabelSelectPartial from './LabelSelect.partial';
import LabelSkillSelectPartial from './LabelSkillSelect.partial';
import LabelTitleTextareaPartial from './LabelTitleTextarea.partial';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleInputForJobPartial } from './TitleInputForJob.partial';
import { ExperienceSelectForJobPartial } from './ExperienceSelectForJob.partial';
import { LocationSelectForJob } from './LocationSelectForJob.partial';
import { SkillsSelectForJob } from './SkillSelectForJob.partial';
import RichText from '../../../../../../components/RichText';
import { Descendant } from 'slate';
import Label from '../../../../../../components/form/Label';
import SelectReactCreateable from '../../../../../../components/form/SelectReactCreateable';
import { MultiValue } from 'react-select';
import SelectReact from '../../../../../../components/form/SelectReact';
import { ExperienceRangeSelector } from './ExperienceRangeSelector';
import { error } from 'console';

export interface FormData {
  title: string;
  description: Descendant[];
  spokenLanguages: string[];
  type: string;
  positions?: number | string;
  location: string;
  skills: string[];
  experienceMin: number;
  experienceMax: number;
}

type SpokenLanguage = { value: string; label: string };

const CreateJobLeftSidePartial = () => {
  const { state } = useLocation();

  const [isDraft, setIsDraft] = useState<boolean>(state?.isDraft ?? false);

  const {
    assignedCandidatesWhileCreatingJob,
    assignedClientWhileCreatingJob,
    assignedCustomCandidatesWhileCreatingJob,
  } = useSelector((state: RootState) => state.jobsSlice);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDraftSubmitting, setIsDraftSubmitting] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: state?.job?.description? JSON.parse(state?.job?.description) : [],
    location: '',
    type: 'ON_SITE',
    skills: [],
    spokenLanguages: [],
    positions:1,
    experienceMin: 0,
    experienceMax: 0,
  });

  const dispatchCreateJob = async () => {
    try {
      setIsSubmitting(true);

      const isAssigned = assignedCandidatesWhileCreatingJob.length > 0;
      const customCandidateIds = await assignedCustomCandidatesWhileCreatingJob.map(
        (c: any) => c.id,
      );

      if (formData.title.length < 3) {
        toast.error('Enter at least 3 characters for title');
        setIsSubmitting(false);
        return;
      } else if (formData.skills.length < 1) {
        toast.error('Enter at least one skill');
        setIsSubmitting(false);

        return;
      } else if (formData.location.length < 3) {
        toast.error('Enter at least 3 characters for location');
        setIsSubmitting(false);

        return;
      } else if (formData.type === '') {
        toast.error('Job type should not be empty');
        setIsSubmitting(false);
        return;
      }
      const strigifiedDescription = await JSON.stringify(formData.description);
      const newFormData = await {
        ...formData,
        description: strigifiedDescription,
        customCandidateIds,
      };

      if(state?.job?.id){
         // @ts-ignore
        // prettier-ignore
        await dispatch(publishDraftJob( {payload:isAssigned ? {...newFormData, clientId: assignedClientWhileCreatingJob?.id??null,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: {...newFormData,clientId: assignedClientWhileCreatingJob?.id??null}, id: state.job.id}));
        await dispatch(createJobs( isAssigned ? {...newFormData, clientId: assignedClientWhileCreatingJob?.id??null,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: {...newFormData,clientId: assignedClientWhileCreatingJob?.id??null}));
      
      }else{

        
        // @ts-ignore
        // prettier-ignore
        await dispatch(createJobs( isAssigned ? {...newFormData, clientId: assignedClientWhileCreatingJob?.id??null,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: {...newFormData,clientId: assignedClientWhileCreatingJob?.id??null}));
      }
      navigate('/dashboard/jobs');
    } catch (error) {
      console.log({ error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDescriptionChange = (newValue: any) => {
    setFormData((prevState) => ({
      ...prevState,
      description: newValue,
    }));
  };

  const handleDispatchDraftJob = async () => {
    try {
      setIsDraftSubmitting(true);
      const isAssigned = assignedCandidatesWhileCreatingJob.length > 0;
      const customCandidateIds = await assignedCustomCandidatesWhileCreatingJob.map(
        (c: any) => c.id,
      );

      if (formData.title.length < 3) {
        toast.error('Enter at least 3 characters for title');
        return;
      }

      if (state?.job?.id) {
         const newFormData = await {
          ...formData,
          description: JSON.stringify(formData.description),
        };

        // @ts-ignore
        // prettier-ignore
        await dispatch(updateDraftJob({payload: isAssigned ? {...newFormData,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: newFormData, id: state.job.id}));
      } else {
        const newFormData = await {
          ...formData,
          description: JSON.stringify(formData.description),
        };

        // @ts-ignore
        // prettier-ignore
        await dispatch(createDraftJob( isAssigned ? {...newFormData,candidateIds: assignedCandidatesWhileCreatingJob.map((c: any) => c.id)}: newFormData));

      }
      navigate('/dashboard/jobs',{ state: { isDraft: true } });
    } catch (err) {
      console.log(err);
    } finally {
      setIsDraftSubmitting(false);
    }
  };

  useEffect(() => {
    if (state?.job) {
      
      setFormData({
        title: state.job.title,
        description: state.job.description ? JSON.parse(state.job.description) : [],
        spokenLanguages: state.job.spokenLanguages || [],
        type: state.job.type || '',
        positions: state.job.positions || 1,
        location: state.job.location || '',
        experienceMax: state.job.experienceMax || 0,
        experienceMin: state.job.experienceMin || 0,
        skills: state.job.skills || [],
      } as FormData);
    }
    dispatch(setAssignedCandidatesWhileCreatingJob(state?.job?.candidateIds.map((id: string) => ({ id })) || []));



    // return  () => {
    //   if(state?.job){
    //      const newFormData = {
    //       ...formData,
    //       description: JSON.stringify(formData.description),
    //     };

    //      // @ts-ignore
    //     // prettier-ignore
    //     await dispatch(updateDraftJob({payload:newFormData, id: state.job.id}));


    //   }else{
    //      const newFormData = {
    //       ...formData,
    //       description: JSON.stringify(formData.description),
    //     };

    //     // @ts-ignore
    //     // prettier-ignore
    //     await dispatch(createDraftJob(newFormData));

    //   }
    // }
  }, []);

  return (
    <Card className='col-span-8 flex flex-col gap-2 max-lg:col-span-12'>
      <CardHeader>
        <CardHeaderChild className='!block'>
          <CardTitle>{state?.job?.id? "Publish Job":"Create a New Job"}</CardTitle>
          <CardSubTitle>
            Effortlessly create jobs, assign candidates, send to a client.
          </CardSubTitle>
        </CardHeaderChild>
      </CardHeader>
      <CardBody className='flex flex-col gap-y-4'>
        <TitleInputForJobPartial setFormData={setFormData} formData={formData} />
        <div className='flex items-center gap-4 max-md:flex-col'>
          <div className='w-full'>
            <Label htmlFor='positions'>Required Spoken Languages</Label>
            <SelectReactCreateable
              name='spokenLanguages'
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
                { value: 'English', label: 'English' },
                { value: 'Romansh', label: 'Romansh' },
                { value: 'Spanish', label: 'Spanish' },
                { value: 'French', label: 'French' },
                { value: 'German', label: 'German' },
                { value: 'Italian', label: 'Italian' },
                { value: 'Urdu', label: 'Urdu' },
                { value: 'Hindi', label: 'Hindi' },
                { value: 'Portuguese', label: 'Portuguese' },
              ]}
            />
          </div>
        </div>

        <ExperienceRangeSelector formData={formData} setFormData={setFormData} />

        <div className='flex items-center gap-4 max-md:flex-col'>
          <LabelSelectPartial
            placeholder='Select Job Type'
            id='type'
            setFormData={setFormData}
            formData={formData}
            label='Job Type'
            options={[
              { value: '', label: '' },
              { value: 'REMOTE', label: 'Remote' },
              { value: 'ON_SITE', label: 'On Site' },
              { value: 'HYBRID', label: 'Hybrid' },
            ]}
          />
          <LocationSelectForJob formData={formData} setFormData={setFormData} />
        </div>
        <div className='w-full'>
          <Label htmlFor='description'>Description</Label>
          <RichText
            id='description'
            value={formData.description}
            className='min-h-48'
            handleChange={handleDescriptionChange}
          />
        </div>

        <SkillsSelectForJob formData={formData} setFormData={setFormData} />
        <NavSeparator className='mt-8' />
      </CardBody>
      <CardFooter className='!flex-col !items-start'>
        <CardFooterChild>
          {assignedCandidatesWhileCreatingJob.length > 0 && (
            <CardTitle>Assigned LinkedIn Candidates</CardTitle>
          )}

          <div className='flex w-full flex-wrap items-center gap-4 max-md:flex-col max-md:items-start'>
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

          <div className='flex w-full flex-wrap items-center gap-4 max-md:flex-col max-md:items-start'>
            {assignedCustomCandidatesWhileCreatingJob.map((candidate: any) => (
              <ResultUserDataPartial
                isCustomCandidate={true}
                candidate={candidate}
                key={candidate.id}
              />
            ))}
          </div>
        </CardFooterChild>
        <CardFooterChild className='ml-auto'>
          <Button
            isDisable={isSubmitting || isDraftSubmitting}
            onClick={() => navigate('/dashboard/jobs' ,{ state: { isDraft: state?.job ? true : false } })}
            variant='outline'
            color='zinc'
            borderWidth='border'>
            Cancel
          </Button>

          <Button
            isDisable={isSubmitting}
          variant='outline' isLoading={isDraftSubmitting} onClick={handleDispatchDraftJob}>
            {state?.job ? 'Update as Draft' : 'Save as Draft'}
          </Button>
          <Button
          isDisable={isDraftSubmitting}
          isLoading={isSubmitting} onClick={dispatchCreateJob} variant='solid'>
            {state?.job ? 'Publish Job' : 'Create Job'}
          </Button>
          <Button
            isDisable={isSubmitting || isDraftSubmitting}
          variant='solid' onClick={() => setModal(true)}>
            Assign To client
          </Button>
          <AssignClientModalPartial setModal={setModal} modal={modal} />
        </CardFooterChild>
      </CardFooter>
    </Card>
  );
};

export default CreateJobLeftSidePartial;
