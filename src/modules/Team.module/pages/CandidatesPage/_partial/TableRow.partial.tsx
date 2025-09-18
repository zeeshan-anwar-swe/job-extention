import { Td, Tr } from "../../../../../components/ui/Table";
import TableDataProfilePartial from "./TableDataProfile.partial";
import TableDataFeedbackPartial from "./TableDataFeedback.partial";
import TableDataSourcePartial from "./TableDataSource.partial";
import TableDataActionsPartial from "./TableDataActions.partial";
import {
  TCandidateListItem,
} from "../../../../../types/slices.type/candidate.slice.type";
import { useState } from "react";
import SelectReact from "../../../../../components/form/SelectReact";
import { formatString } from "../../../../../utils/helper";
import Alert from "../../../../../components/ui/Alert";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { TeamCandidate ,TCandidateJob, TTeamCandidateJobProfile } from "../../../../../types/slices.type/team/teamCandidates.slice.type";

const TableRowPartial = ({ candidate }: { candidate: TeamCandidate }) => {
  const [selectedJob, setSelectedJob] = useState<null | TTeamCandidateJobProfile>(
    null,
  );

  return (
    <Tr>
      <Td>
        <TableDataProfilePartial
          image={candidate?.profilePictureUrl}
          title={candidate?.name}
          subTitle={candidate?.email}
        />
      </Td>

      <Td>
        <SelectReact
          variant="solid"
          placeholder="Select Position"
          className="!min-w-48 !border-zinc-300"
          name="job"
          options={candidate?.jobProfiles.map((job: any) => ({
            value: job,
            label: job.job.title,
          }))}
          onChange={(list: any) => setSelectedJob(list.value)}
        />
      </Td>

      {selectedJob ? (
        <>
          <Td>{selectedJob.job.client?.clientUser.firstName ?? ""}</Td>
          <Td>
            <TableDataFeedbackPartial
              title={formatString(selectedJob.status ?? "")}
            />
            
          </Td>
          <Td className="text-center ">
            <Link
              className="!mx-auto "
              target="_blank"
              to={candidate.publicProfileUrl ?? ""}
            >
              <Alert
                className="!mx-auto item-center w-fit"
                icon="HeroLinkedIn"
              ></Alert>
            </Link>
          </Td>
          <Td colSpan={2}>
            <TableDataActionsPartial
              selectedJob={selectedJob}
              candidate={candidate}
            />
          </Td>
        </>
      ) : (
        <Td className="text-center" colSpan={4}>
          Select Position
        </Td>
      )}
    </Tr>
  );
};

export default TableRowPartial;
