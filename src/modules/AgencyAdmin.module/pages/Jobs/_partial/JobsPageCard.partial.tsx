import Alert from '../../../../../components/ui/Alert';
import Button from '../../../../../components/ui/Button';
import CardBodyTagPartial from './CardBodyTag.partial';
import CardDropdownPartial from './CardDropdown.partial';
import {
  profileImageUrlValidationCheck,
  textValidationCheck,
} from '../../../../../utils/validationCheck';
import Card, {
  CardBody,
  CardFooter,
  CardFooterChild,
  CardHeader,
} from '../../../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { formatString } from '../../../../../utils/helper';
import { ConfirmationModal } from '../../../../Shared/components/CustomModal/confirmationModal';
import { deleteDraftJob, deleteJob, getDraftJobsList, getJobsList } from '../../../../../store/slices/Jobs.slice';

const JobsPageCardPartial = ({ item, isDraft }: { item: any; isDraft?: boolean }) => {
  const navigateTo = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <Card className=' col-span-4 flex flex-col gap-2 border border-zinc-300 max-2xl:col-span-6 max-2xl:last:col-span-12 max-lg:col-span-12'>
      {deleteModal && (
        <ConfirmationModal
          modal={deleteModal}
          setModal={setDeleteModal}
          onClose={isDraft? getDraftJobsList({limit:9,page:1}):getJobsList({ limit: 9, page: 1 })}
          title='remove job'
          action={isDraft? deleteDraftJob(item.id): deleteJob(item.id)}
        />
      )}

      <CardHeader className='mt-4 gap-4 max-md:!flex-col-reverse'>
        <Alert icon='HeroFolder' variant='solid' />
        <div
          className='flex-1 hover:cursor-pointer'
          onClick={() => navigateTo(`/dashboard/jobs/view-job-details`, { state: item })}>
          <h4 className='max-md:text-sm'>{textValidationCheck(item?.title)}</h4>
          <Button
            rounded='rounded-full'
            variant='outline'
            color='zinc'
            className={`!cursor-default gap-2 !px-2 !py-1 hover:!cursor-default ${!item?.client && 'hidden'}`}
            rightIcon='Hero'>
            <img
              className='aspect-square w-6 rounded-full object-cover '
              src={profileImageUrlValidationCheck(item?.client?.clientUser?.image)}
              alt='profile-image'
            />
            <h5 className='max-md:text-sm'>
              {item?.client?.clientUser?.firstName} {item?.client?.clientUser?.lastName}
            </h5>
          </Button>
        </div>
        {!isDraft && (
          <div className='h-full max-md:flex-1'>
            <CardDropdownPartial item={item} />
          </div>
        )}
      </CardHeader>
      <CardBody
        onClick={() => navigateTo(`/dashboard/jobs/view-job-details`, { state: item })}
        className='flex flex-col justify-center gap-4 hover:cursor-pointer'>
        <div className='flex  flex-wrap items-center gap-2 truncate max-md:flex-col max-md:items-start'>
          <CardBodyTagPartial
            title='Experience:'
            value={`${item.experienceMin} - ${item.experienceMax}`}
          />
          <CardBodyTagPartial title='Location:' value={item?.location} />
          <CardBodyTagPartial title='Job Type:' value={formatString(item?.type)} />
        </div>
      </CardBody>
      <CardFooter className='border-t-2 !py-2'>
        {!isDraft && (
          <CardFooterChild>
            <Button
              onClick={() => {
                navigateTo(`/dashboard/jobs/view-job-details`, { state: item });
              }}
              size='lg'
              className='!px-0 !text-xl !font-bold'
              rightIcon='HeroArrowUpRight'>
              View Cadidates
            </Button>
          </CardFooterChild>
        )}
        <CardFooterChild>
          <div className='flex items-center'>
            {!isDraft &&
              item?.[
                item?.appliedCandidates
                  ? 'appliedCandidates'
                  : item.candidateJobProfiles
                    ? 'candidateJobProfiles'
                    : 'candidateIds'
              ]
                .slice(0, 5)
                .map((cadidateItem: any, index: number) => (
                  <img
                    key={index}
                    className='-mr-6 aspect-square w-10 rounded-full border-2 border-blue-500 object-cover'
                    src={profileImageUrlValidationCheck(cadidateItem?.candidate?.profilePictureUrl)}
                  />
                ))}
            {!isDraft && (
              <Button
                variant='solid'
                onClick={() => {
                  navigateTo(`/dashboard/jobs/view-job-details`, { state: item });
                }}
                // onClick={() => setAssignCandidateModal(true)}
                rounded='rounded-full'
                // className='!bg-white dark:!bg-zinc-800 dark:text-white'
                icon='HeroPlus'></Button>
            )}

            <Button
              className='ml-2'
              onClick={() => {
                isDraft
                  ? navigateTo(`/dashboard/jobs/create-job`, { state: { job: item, isDraft } })
                  : navigateTo(`/dashboard/jobs/edit-job`, { state: item });
              }}
              variant='solid'
              rounded='rounded-full'
              iconSize='text-2xl'
              rightIcon='HeroPencilSquare'></Button>
            <Button
              className='ml-2'
              onClick={() => setDeleteModal(true)}
              variant='solid'
              color='red'
              rounded='rounded-full'
              iconSize='text-2xl'
              rightIcon='HeroTrash'></Button>
          </div>
          {/* {assignCandidateModal && <AssignCandidatesModalPartial modal={assignCandidateModal} setModal={setAssignCandidateModal} jobId={item?.id} jobTitle={item?.title} />} */}
        </CardFooterChild>
      </CardFooter>
    </Card>
  );
};

export default JobsPageCardPartial;
