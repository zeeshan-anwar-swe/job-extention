import { useCallback, useState } from "react";
import Search from "../Search.partial";
import Button from "../../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import PageLoader from "../../../../templates/layouts/main/PageLoader";
import { JobsStatusChangeModalListItem } from "./ModalListItem.partial";
import {
  setTaskboardJobsSearch,
  getJobsListExceptStatus,
  changeMultipleJobsStatus,
  getTaskBoardBackLogJobs,
  getTaskBoardInProgressJobs,
  getTaskBoardInReviewJobs,
  getTaskBoardCompletedJobs,
  getTeamTaskBoardBackLogJobs,
  getTeamTaskBoardInProgressJobs,
  getTeamTaskBoardInReviewJobs,
  getTeamTaskBoardCompletedJobs,
} from "../../../../store/slices/Agency/Taskboard.slice";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalFooterChild,
  ModalHeader,
} from "../../../../components/ui/Modal";
import { JobStatus } from "../../../../types/enums/jobStatus.enum";
import Pagination from "../../../../components/ui/Pagination";
import { Roles } from "../../../../constants/role.enums";

export const JobStatusChangeModalPartial = ({
  modal,
  module,
  setModal,
  title = "Change Job Status",
  changeStatusTo,
}: {
  title?: string;
  modal: boolean;
  setModal: any;
  module?: Roles;
  changeStatusTo: JobStatus;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { rows, loading, error, count, search } = useSelector(
    (state: RootState) => state.taskBoard.modalJobs,
  );

  const { loading: backlogLoading } = useSelector(
    (state: RootState) => state.taskBoard.backlogJobs,
  );

  const { loading: inProgessLoading } = useSelector(
    (state: RootState) => state.taskBoard.inProgressJobs,
  );

  const { loading: inReviewLoading } = useSelector(
    (state: RootState) => state.taskBoard.inReviewJobs,
  );

  const { loading: completedLoading } = useSelector(
    (state: RootState) => state.taskBoard.completedJobs,
  );

  const [jobIds, setJobIds] = useState<string[]>([]);

  const getListAction = useCallback(
    ({
      page,
      limit,
      search,
    }: {
      page: number;
      limit: number;
      search?: string;
    }) => {
      return getJobsListExceptStatus({
        exceptStatus: changeStatusTo,
        page,
        limit,
        search,
      });
    },
    [changeStatusTo],
  );

  const handleDone = async () => {
    dispatch(changeMultipleJobsStatus({ jobIds, status: changeStatusTo }));
    dispatch(getTaskBoardBackLogJobs({ page: 1, limit: 10 }));
    dispatch(getTaskBoardInProgressJobs({ page: 1, limit: 10 }));
    dispatch(getTaskBoardInReviewJobs({ page: 1, limit: 10 }));
    await dispatch(getTaskBoardCompletedJobs({ page: 1, limit: 10 }));
    setModal(false);
  };

  const handleDoneTeam = async () => {
    dispatch(changeMultipleJobsStatus({ jobIds, status: changeStatusTo }));
    dispatch(getTeamTaskBoardBackLogJobs({ page: 1, limit: 10 }));
    dispatch(getTeamTaskBoardInProgressJobs({ page: 1, limit: 10 }));
    dispatch(getTeamTaskBoardInReviewJobs({ page: 1, limit: 10 }));
    await dispatch(getTeamTaskBoardCompletedJobs({ page: 1, limit: 10 }));
    setModal(false);
  };

  return (
    <Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
      <ModalHeader>{title}</ModalHeader>
      <div className="p-4">
        <Search
          searchLimit={10}
          setSearchActionForPagination={setTaskboardJobsSearch}
          searchListAction={getListAction}
          placeholder="Search Client..."
        />
      </div>

      <ModalBody className="flex h-96 w-full flex-col gap-4 overflow-y-scroll">
        <PageLoader data={rows} loading={loading} error={error}>
          {rows.map((job: any) => (
            <JobsStatusChangeModalListItem
              setJobIds={setJobIds}
              jobIds={jobIds}
              job={job}
              key={job.id}
            />
          ))}
        </PageLoader>
      </ModalBody>

      <ModalFooter className="flex-col !items-end">
        <ModalFooterChild>
          <Pagination
            count={count}
            limit={10}
            search={search}
            getListAction={getListAction}
          />
        </ModalFooterChild>
        <ModalFooterChild className="w-full">
          <Button
            onClick={() => setModal(false)}
            className="w-full"
            variant="outline"
            color="zinc"
          >
            Cancel
          </Button>
          <Button
            isDisable={jobIds.length < 1}
            isLoading={
              backlogLoading ||
              inProgessLoading ||
              inReviewLoading ||
              completedLoading
            }
            onClick={() => {
              if (module) {
                if (module === Roles.TEAM) {
                  handleDoneTeam();
                }
              } else {
                handleDone();
              }
            }}
            className="w-full"
            variant="solid"
          >
            Done
          </Button>
        </ModalFooterChild>
      </ModalFooter>
    </Modal>
  );
};
