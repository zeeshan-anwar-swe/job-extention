import { Link } from "react-router-dom";
import Button from "../../../../../components/ui/Button";
import { useState } from "react";

import {
  getAgencyCandidatesList,
  hideSingleJobToClient,
  inviteAndChangeCandidateStatus,
  removeAgencyCandidate,
  showSingleJobToClient,
} from "../../../../../store/slices/Candiates.slice";
import ConfirmationModal from "../../../../../components/modal/ConfirmationModal";
import { TCandidateJobProfile } from "../../../../../types/slices.type/candidate.slice.type";
import { ChangeCandidatesStatusModalPartial } from "../../../../Shared/common/changeCandidateStatusModal/Modal.partial";
import { cn } from "../../../../../utils/cn";
import { CandidateJobStatus } from "../../../../../types/enums/candidateJobStatus.enum";
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "../../../../../components/ui/Dropdown";
import { AssignClientModalPartial } from "../../../../Shared/common/AssignClientModal/Modal.partial";
import { TTeamCandidateJobProfile } from "../../../../../types/slices.type/team/teamCandidates.slice.type";

const TableDataActionsPartial = ({
  candidate,
  selectedJob,
}: {
  candidate: any;
  selectedJob: TTeamCandidateJobProfile;
}) => {
  const [assignClientModal, setAssignClientModal] = useState<boolean>(false);
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [showSingle, setShowSingle] = useState<boolean>(false);
  const [hideSingle, setHideSingle] = useState<boolean>(false);


  return (
    <>
      <div className="flex justify-center">
        <Button
          className={cn(
            selectedJob?.status !== CandidateJobStatus.SHORTLISTED
              ? "hidden"
              : "",
          )}
          onClick={() => setInviteModal(true)}
        >
          Invite for Interview
        </Button>
        <Button onClick={() => setAssignClientModal(true)}>
          Assign to Client
        </Button>
        <Link
          to="/dashboard/candidates/cv-edit"
          state={{ candidate, selectedJob }}
        >
          <Button>Edit CV</Button>
        </Link>
        <Dropdown>
          <DropdownToggle hasIcon={false}>
            <Button rounded={"rounded-full"} color="zinc">
              Show To Client
            </Button>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setShowSingle(true)}>
              Show To Client
            </DropdownItem>
            <DropdownItem onClick={() => setHideSingle(true)}>
              Hide To Client
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
        <Link
          to="/dashboard/candidates/profile"
          state={{ candidate, selectedJob }}
        >
          <Button>View CV</Button>
        </Link>
        <Button onClick={() => setDeleteModal(true)}>Remove Candidate</Button>
        <ConfirmationModal
          // onCloseAction={getAgencyCandidatesList({ page: 1, limit: 10 })}
          modal={deleteModal}
          setModal={setDeleteModal}
          title="delete candidate"
          action={removeAgencyCandidate(selectedJob.id)}
        />

        <ConfirmationModal
          // onCloseAction={getAgencyCandidatesList({ page: 1, limit: 10 })}
          modal={showSingle}
          setModal={setShowSingle}
          title="show job to client!"
          action={showSingleJobToClient(selectedJob.id)}
        />

       

        <ConfirmationModal
          onCloseAction={getAgencyCandidatesList({ page: 1, limit: 10 })}
          modal={hideSingle}
          setModal={setHideSingle}
          title="hide job to client!"
          action={hideSingleJobToClient(selectedJob.id)}
        />
      </div>
      {assignClientModal && (
        <AssignClientModalPartial
          title={`Assign candidate to client: ${candidate?.name ?? ""}`}
          assignTo={candidate.id}
          modal={assignClientModal}
          setModal={setAssignClientModal}
        />
      )}

      {inviteModal && (
        <ChangeCandidatesStatusModalPartial
          modal={inviteModal}
          setModal={setInviteModal}
          candidateId={selectedJob.id}
          candidateName={candidate?.name ?? ""}
          action={inviteAndChangeCandidateStatus}
          changeStatusTo={CandidateJobStatus.SCHEDULE_INTERVIEW}
          reFreshList={getAgencyCandidatesList({ page: 1, limit: 10 })}
        />
      )}
    </>
  );
};

export default TableDataActionsPartial;
