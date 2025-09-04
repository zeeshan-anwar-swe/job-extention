import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../../../../components/ui/Card";
import Button from "../../../../../../components/ui/Button";
import TableDataProfilePartial from "./TableDataProfile.partial";
import { AssignClientToCandidateModalPartial } from "../../_partial/AssignJobToClientModal.partial";
import { getCandidateCV } from "../../../../services/candidates";
import { RootState } from "../../../../../../store";
import { useSelector } from "react-redux";
import { AssignJobModalPartial } from "../../../../common/AssignJobModal/Modal.partial";
import {
  assignJobToCandidate,
  unAssignJobToCandidate,
} from "../../../../../../store/slices/Candiates.slice";
import { AssignClientModalPartial } from "../../../../common/AssignClientModal/Modal.partial";

const HeaderPartial = ({ state }: any) => {
  const [modal, setModal] = useState<boolean>(false);
  const [clientModal, setClientModal] = useState<boolean>(false);
  const navgiateTo = useNavigate();

  console.log({ state });

  const handleDownloadCV = async () => {
    const response = await getCandidateCV(state.selectedJob.id);
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.selectedJob.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  console.log({ state });

  const { cadnidateProfile } = useSelector(
    (state: RootState) => state.candidates,
  );

  return (
    <Card className="flex">
      <div className="flex items-center justify-between !gap-2 px-4 py-2 max-xl:flex-col max-xl:items-start">
        <TableDataProfilePartial
          imageUrl={cadnidateProfile?.candidate?.profilePictureUrl}
          title={cadnidateProfile?.candidate?.name}
          subTitle={cadnidateProfile?.candidate?.email}
        />
        <div className="flex flex-wrap justify-end gap-x-4 max-xl:justify-start max-xl:gap-2">
          <Button
            onClick={() => setClientModal(true)}
            className="h-fit max-sm:w-full"
            variant="solid"
          >
            Assign to a Client
          </Button>
          <Button
            onClick={() => setModal(true)}
            className="h-fit max-sm:w-full"
            variant="solid"
          >
            Assign to a job
          </Button>
          {/* <Button
						rightIcon='HeroPaperAirplane'
						className='h-fit max-sm:w-full'
						variant='solid'>
						Send To ATS
					</Button> */}
          <Button
            onClick={() =>
              navgiateTo("/dashboard/candidates/cv-edit", { state: state })
            }
            rightIcon="HeroPencilSquare"
            className="h-fit max-sm:w-full"
            variant="outline"
            color="zinc"
          >
            Edit CV
          </Button>
          <Button
            onClick={handleDownloadCV}
            rightIcon="HeroArrowDown"
            className="h-fit max-sm:w-full"
            variant="outline"
            color="zinc"
          >
            Download CV
          </Button>
        </div>
      </div>

      <AssignJobModalPartial
        title={`Assign Jobs to candidate: ${cadnidateProfile?.candidate?.name ?? ""}`}
        assignToModule="candidate"
        unAssignAction={unAssignJobToCandidate}
        jobAssignAction={assignJobToCandidate}
        assignTo={state?.candidate?.id ?? ""}
        setModal={setModal}
        modal={modal}
      />
      <AssignClientModalPartial
        title={`Assign Client to Candiate: ${state.candidate?.name ?? ""}`}
        assignTo={state.candidate.id}
        modal={clientModal}
        setModal={setClientModal}
      />
      {/* <AssignClientToCandidateModalPartial
        modal={clientModal}
        setModal={setClientModal}
      /> */}
    </Card>
  );
};

export default HeaderPartial;
