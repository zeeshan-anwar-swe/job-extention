import React, { useEffect } from "react";
import Button from "../../../../components/ui/Button";
import { JobDetailsType2 } from "../../../../types/slices.type/jobs.slice.type";
import { textValidationCheck } from "../../../../utils/validationCheck";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import Tooltip from "../../../../components/ui/Tooltip";
import Card, {
  CardBody,
  CardHeader,
  CardHeaderChild,
  CardSubTitle,
  CardTitle,
} from "../../../../components/ui/Card";
import useImageValidation from "../../../../hooks/useImageValidation";
import ImageLoaderWraper from "../../../../components/ui/ImageLoaderWraper";
import {
  assignClientToCandidate,
  getAllCandidatesList,
} from "../../../../store/slices/Candiates.slice";
import {
  TCandidateJobProfile,
  TClientWithJobs,
  TJobForClientWithJobs,
} from "../../../../types/slices.type/clients.slice.type";
import Select from "../../../../components/form/Select";
import SelectReact from "../../../../components/form/SelectReact";
import { getAgencyClientsWithJobs } from "../../../../store/slices/Client.slice";

export const AssignClientModalListItemPartial = ({
  client,
  assignTo,
}: {
  client: TClientWithJobs;
  assignTo: string;
}) => {
  const [isAssiged, setIsAssiged] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<null | any>(null);

  const dispatch: AppDispatch = useDispatch();

  const { loading: loadingImage, imageUrl } = useImageValidation(
    client.clientUser.image,
  );

  const handleAssignTeamToClient = async () => {
    await dispatch(
      assignClientToCandidate({ clientId: selectedJob.id, assignTo }),
    );
    await dispatch(getAgencyClientsWithJobs({ page: 1, limit: 10 }));
  };

  useEffect(() => {
    if (selectedJob) {
      client.jobs.map((job: TJobForClientWithJobs) => {
        job.candidateJobProfiles.map(
          (candidateJobProfile: TCandidateJobProfile) => {
            if (candidateJobProfile.candidateId === assignTo) {
              console.log({
                assignTo,
                candidateId: candidateJobProfile.candidateId,
              });
              setIsAssiged(true);
            }
          },
        );
      });
    }
  }, [selectedJob]);

  return (
    <Card className="border">
      <CardHeader className="grid grid-cols-2">
        <CardHeaderChild>
          <ImageLoaderWraper loading={loadingImage} height="h-14">
            <img
              className="aspect-square w-14 rounded-full object-cover"
              src={imageUrl}
              alt=""
            />
          </ImageLoaderWraper>
          <CardSubTitle className="font-medium">
            {client.clientUser.firstName + " " + client.clientUser.lastName}
          </CardSubTitle>
        </CardHeaderChild>
        <div className="flex items-center justify-end gap-4">
          <div className="flex-1 gap-2">
            <SelectReact
              variant="solid"
              name="jobs"
              className="!w-full"
              options={client.jobs.map((job: any) => {
                return { label: job.title, value: job };
              })}
              onChange={(list: any) => setSelectedJob(list.value)}
            />
          </div>
          <div className="flex-1">
            <CardHeaderChild>
              <Button
                className="w-full"
                rightIcon={isAssiged ? "HeroTwiceCheck" : undefined}
                color={isAssiged ? "emerald" : "blue"}
                isDisable={selectedJob === null}
                onClick={isAssiged ? undefined : handleAssignTeamToClient}
                variant="solid"
              >
                {isAssiged ? "Assigned" : "Assign"}
              </Button>
            </CardHeaderChild>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
