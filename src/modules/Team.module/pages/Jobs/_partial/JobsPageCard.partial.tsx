import Alert from "../../../../../components/ui/Alert";
import Button from "../../../../../components/ui/Button";
import CardBodyTagPartial from "./CardBodyTag.partial";
import CardDropdownPartial from "./CardDropdown.partial";
import {
  profileImageUrlValidationCheck,
  textValidationCheck,
} from "../../../../../utils/validationCheck";
import Card, {
  CardBody,
  CardFooter,
  CardFooterChild,
  CardHeader,
} from "../../../../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TeamJob } from "../../../../../types/slices.type/team/jobs.slice.type";
import { ConfirmationModal } from "../../../../Shared/components/CustomModal/confirmationModal";
import { deleteJob } from "../../../../../store/slices/Jobs.slice";
import { getTeamJobs } from "../../../../../store/slices/Team/TeamJobs.slice";
import { useAuth } from "../../../../../context/authContext";

const JobsPageCardPartial = ({ teamJob }: { teamJob: TeamJob }) => {
  const { userStorage } = useAuth();
  const isOwnJob = teamJob.createdBy === userStorage.id;
  const navigateTo = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <Card className="col-span-4 max-2xl:last:col-span-12 flex flex-col gap-2 border border-zinc-300 hover:cursor-pointer max-2xl:col-span-6 max-lg:col-span-12">
      <CardHeader className="gap-4 max-md:!flex-col-reverse">
        <Alert icon="HeroFolder" variant="solid" />
        <div className="flex-1">
          <h4 className="max-md:text-sm">
            {textValidationCheck(teamJob?.title)}
          </h4>
          <Button
            rounded="rounded-full"
            variant="outline"
            color="zinc"
            className={`gap-2 !px-2 !py-1 ${!teamJob?.client && "hidden"}`}
            rightIcon="Hero"
          >
            <img
              className="aspect-square w-6 rounded-full object-cover "
              src={profileImageUrlValidationCheck(
                teamJob?.client?.clientUser?.image,
              )}
              alt="profile-image"
            />
            <h5 className="max-md:text-sm">
              {teamJob?.client?.clientUser?.firstName}{" "}
              {teamJob?.client?.clientUser?.lastName}
            </h5>
          </Button>
        </div>
        <div className="h-full max-md:flex-1">
          <CardDropdownPartial item={teamJob} />
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
          <CardBodyTagPartial title="No. of Positions:" value="4" />
          <CardBodyTagPartial title="Experience:" value={teamJob?.experience} />
        </div>
        <div className="flex items-center gap-2 max-md:flex-col max-md:items-start">
          <CardBodyTagPartial title="Location:" value={teamJob?.location} />
          <CardBodyTagPartial title="Job Type:" value={teamJob?.type} />
        </div>
      </CardBody>
      <CardFooter className="border-t-2 !py-2">
        <CardFooterChild>
          <Button
            onClick={() => {
              navigateTo(`/dashboard/jobs/view-job-details`, {
                state: teamJob,
              });
            }}
            size="lg"
            className="!px-0 !text-xl !font-bold"
            rightIcon="HeroArrowUpRight"
          >
            View Cadidates
          </Button>
        </CardFooterChild>

        <CardFooterChild>
          <div className="flex items-center">
            {teamJob.candidateJobProfiles
              .slice(0, 5)
              .map((cadidateItem: any, index: number) => (
                <img
                  key={index}
                  className="-mr-6 aspect-square w-10 rounded-full border-2 border-blue-500 object-cover"
                  src={profileImageUrlValidationCheck(
                    cadidateItem?.candidate?.profilePictureUrl,
                  )}
                />
              ))}

            <Button
              variant="solid"
              onClick={() => {
                navigateTo(`/dashboard/jobs/view-job-details`, {
                  state: teamJob,
                });
              }}
              // onClick={() => setAssignCandidateModal(true)}
              rounded="rounded-full"
              // className='!bg-white dark:!bg-zinc-800 dark:text-white'
              icon="HeroPlus"
            ></Button>

            {isOwnJob && (
              <>
                <Button
                  className="ml-2"
                  onClick={() => {
                    navigateTo(`/dashboard/jobs/edit-job`, { state: teamJob });
                  }}
                  variant="solid"
                  rounded="rounded-full"
                  iconSize="text-2xl"
                  rightIcon="HeroPencilSquare"
                ></Button>
                <Button
                  className="ml-2"
                  onClick={() => setDeleteModal(true)}
                  variant="solid"
                  color="red"
                  rounded="rounded-full"
                  iconSize="text-2xl"
                  rightIcon="HeroTrash"
                ></Button>
              </>
            )}
          </div>
        </CardFooterChild>
        {deleteModal && (
          <ConfirmationModal
            modal={deleteModal}
            setModal={setDeleteModal}
            onClose={getTeamJobs({ limit: 9, page: 1 })}
            title="remove job"
            action={deleteJob(teamJob.id)}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default JobsPageCardPartial;
