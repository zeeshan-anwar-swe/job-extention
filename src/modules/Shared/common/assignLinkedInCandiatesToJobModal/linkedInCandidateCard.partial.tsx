import { useState } from "react";
import Card, {
  CardBody,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/Card";
import { textValidationCheck } from "../../../../utils/validationCheck";
import Button from "../../../../components/ui/Button";
import { NavSeparator } from "../../../../components/layouts/Navigation/Nav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { assignCandidateWhileCreatingJob, assignCustomCandidateWhileCreatingJob } from "../../../../store/slices/Jobs.slice";
import { objectExistsInArray } from "../../../../utils/helper";
import { LinkedInProfile } from "../../../../store/slices/Candiates.slice";
import useImageValidation from "../../../../hooks/useImageValidation";
import { calculateTotalExperience } from "../../../../utils/linkedin.util";

export const LinkedInCandidateCardPartial = ({
  candidate,
}: {
  candidate: LinkedInProfile;
}) => {
  console.log({ candidate });
  
  const dispatch: AppDispatch = useDispatch();

  const { candidateSource } = useSelector(
    (state: RootState) => state.candidates,
  );

  

  const { jobDetails, assignedCandidatesWhileCreatingJob,assignedCustomCandidatesWhileCreatingJob } = useSelector(
    (state: RootState) => state.jobsSlice,
  );

  const preAssignedCandidates: any =
    jobDetails?.candidateJobProfiles?.map((candidate: any) => {
      return { id: candidate.candidateId };
    }) || [];

  const isPreAssigned = objectExistsInArray(preAssignedCandidates, candidate);

  const isAssigned = objectExistsInArray(
    assignedCandidatesWhileCreatingJob,
    candidate,
  );

  const isAssigned2 = objectExistsInArray(
    assignedCustomCandidatesWhileCreatingJob,
    candidate,
  );
  const { imageUrl } = useImageValidation(candidate.profilePictureUrl);

  return (
    <Card className="bg-zinc-100 dark:bg-zinc-800 dark:border dark:border-zinc-100">
      <CardHeader className="gap-4">
        <img
          className="aspect-square w-14 rounded-xl border"
          alt="profile-image"
          src={imageUrl}
        />
        <div className="flex-1">
          <h5>{textValidationCheck(candidate.name)}</h5>
          <p>{textValidationCheck(candidate.headline)}</p>
        </div>
      </CardHeader>

      <CardBody className="!flex flex-wrap !gap-4 max-md:flex-col">
        <Button
          borderWidth="border"
          className="gap-2 !p-1"
          variant="outline"
          color="zinc"
        >
          Experience:{" "}
          <b>
            {" "}
            {candidate.experience
              ? candidate.experience + " Years"
              : calculateTotalExperience(candidate.workExperience)}
          </b>
        </Button>
        <Button
          borderWidth="border"
          className="gap-2 !p-1"
          variant="outline"
          color="zinc"
        >
          location: <b>{textValidationCheck(candidate?.location)}</b>
        </Button>
        <Button
          borderWidth="border"
          className="gap-2 !p-1"
          variant="outline"
          color="zinc"
        >
          Availability: <b>{candidate.canSendInmail ? "Yes" : "No"}</b>
        </Button>
      </CardBody>
      <NavSeparator className="!mx-4 !mb-4" />
      <CardFooter className="!justify-start max-md:!justify-center">
        <Button
          rightIcon={isPreAssigned || isAssigned2 || isAssigned ? "HeroTwiceCheck" : undefined}
          color={isPreAssigned ? "zinc" : isAssigned || isAssigned2 ? "emerald" : "blue"}
          variant="solid"
          onClick={() => {
            isPreAssigned
              ? null
              : dispatch(
                  candidateSource === "linkedin"
                    ? assignCandidateWhileCreatingJob(candidate)
                    : assignCustomCandidateWhileCreatingJob(candidate),
                );
          }}
        >
          {isPreAssigned ? "Pre Assigned" : isAssigned || isAssigned2? "Assigned" : "Assign"}
        </Button>
        <Link target="_blank" to={candidate.publicProfileUrl}>
          <Button variant="outline" borderWidth="border" color="zinc">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
