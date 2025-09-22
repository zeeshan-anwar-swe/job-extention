import React, { useEffect, useState } from "react";
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
import { assignClientToCandidate } from "../../../../store/slices/Candiates.slice";
import {
  TCandidateJobProfile,
  TClientWithJobs,
  TJobForClientWithJobs,
} from "../../../../types/slices.type/clients.slice.type";
import Select from "../../../../components/form/Select";
import SelectReact from "../../../../components/form/SelectReact";
import { assignJobToClients } from "../../../../store/slices/Jobs.slice";
import { useAppSelector } from "../../../../hooks/useReduxStore";

export const AssignClientModalListItemPartial = ({ item, assignTo, assignedId }: { item: any, assignedId: string, assignTo: string }) => {
  const {componentLoading} = useAppSelector((state) => state.jobsSlice);
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const isAssiged = item?.id === assignedId;

  const { loading: loadingImage, imageUrl } = useImageValidation(
    item?.image,
  );

  const handleAssignToClient = async () => {
    setLoading(true);
    await dispatch(assignJobToClients({client:item, jobId:assignTo}));
    setLoading(false);
  };

  return (
    <Card className="border">
      <CardHeader>
        <CardHeaderChild>
          <ImageLoaderWraper loading={loadingImage} height="h-14">
            <img
              className="aspect-square w-14 rounded-full object-cover"
              src={imageUrl}
              alt=""
            />
          </ImageLoaderWraper>
          <CardSubTitle className="font-medium">
            {item?.name}
          </CardSubTitle>
        </CardHeaderChild>
       
        <CardHeaderChild>
          <Button
            isDisable={componentLoading}
            isLoading={loading}
            rightIcon={isAssiged ? "HeroTwiceCheck" : undefined}
            color={isAssiged ? "emerald" : "blue"}
            onClick={isAssiged ? undefined : handleAssignToClient}
            variant="solid"
          >
            {isAssiged ? "Assigned" : "Assign"}
          </Button>
        </CardHeaderChild>
      </CardHeader>
    </Card>
  );
};
