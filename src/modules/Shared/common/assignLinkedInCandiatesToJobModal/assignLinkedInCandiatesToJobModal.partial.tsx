import Button from "../../../../components/ui/Button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalFooterChild,
  ModalHeader,
} from "../../../../components/ui/Modal";
import SearchPartial from "./Search.partial";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  assignManyCandidatesToJob,
  setAssignedCandidatesWhileCreatingJob,
  setAssignedCandidatesWhileUpdatingJob,
} from "../../../../store/slices/Jobs.slice";
import {
  getAllCandidatesList,
  getCustomProfiles,
  getMoreAllCandidatesList,
  setCandidatesFilterOptions,
  setCandidatesSearch,
} from "../../../../store/slices/Candiates.slice";
import PageLoader from "../../../../templates/layouts/main/PageLoader";
import { cn } from "../../../../utils/cn";
import { LinkedInCandidateCardPartial } from "./linkedInCandidateCard.partial";
import { useEffect, useState } from "react";
import { CursorBasePagination } from "../../../../components/ui/CusrorBasePagination";
import { get } from "lodash";
import JobFilterDropdownPartial from "../../../AgencyAdmin.module/pages/Jobs/JobsCreateNewJob/_partial/JobFilterDropdown.partial";
import { CandidateTypeSwitch } from "../../../AgencyAdmin.module/pages/Jobs/JobsCreateNewJob/_partial/CandidateTypeSwitch";
import { NavSeparator } from "../../../../components/layouts/Navigation/Nav";
import Pagination from "../../../../components/ui/Pagination";

export const AssignLinkedInCandiatesToJobModalPartial = ({
  jobId,
  modal,
  setModal,
  jobTitle,
  reFreshList,
}: {
  modal: boolean;
  jobId: string;
  setModal: any;
  jobTitle?: string;
  reFreshList?: any;
}) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const {
    filteredCandidate,
    allCadidateList,
    candidateSource,
    paginationCount,
    filterOptions,
    pageLoading,
    error,
    next,
  } = useSelector((state: RootState) => state.candidates);

  const isFiltered = filteredCandidate?.length > 0;

  const dispatch: AppDispatch = useDispatch();

  const { assignedCandidatesWhileCreatingJob } = useSelector(
    (state: RootState) => state.jobsSlice,
  );

  const assignManyCandidates = async () => {
    setSubmitLoading(true);
    if (assignedCandidatesWhileCreatingJob.length > 0) {
      const candidateIds = await assignedCandidatesWhileCreatingJob.map(
        (candidate) => candidate.id,
      );

      await dispatch(
        assignManyCandidatesToJob({
          candidateIds,
          jobId,
        }),
      );
    }
    setSubmitLoading(false);
    setModal(false);
    await dispatch(setAssignedCandidatesWhileUpdatingJob([]));
    await dispatch(setAssignedCandidatesWhileCreatingJob([]));
    reFreshList && reFreshList();
  };

  useEffect(() => {
    if (modal) {
      if (candidateSource === "linkedin") {
        dispatch(getAllCandidatesList({ page: 1, limit: 10, filterOptions }));
      }
    }
  }, [candidateSource]);

  return (
    <Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
      <ModalHeader>Assign candidates to job: “{jobTitle ?? ""}” </ModalHeader>

      <div className="p-4">
        <SearchPartial
          filterOptions={filterOptions}
          placeholder="Search candidates..."
          searchListAction={
            candidateSource === "linkedin"
              ? getAllCandidatesList
              : getCustomProfiles
          }
          setFilterOptions={setCandidatesFilterOptions}
        />
      </div>
      <div className="p-4 pt-0 flex items-center justify-between">
        <CandidateTypeSwitch />
        <JobFilterDropdownPartial />
      </div>
      <NavSeparator />

      <ModalBody
        className={cn(
          "!flex !w-full !flex-col !gap-4",
          pageLoading || error || allCadidateList.length === 0
            ? "max-h-[500px] !min-h-[500px] justify-center"
            : "max-h-[500px] !min-h-[500px]",
        )}
      >
        <PageLoader
          data={!isFiltered ? allCadidateList : filteredCandidate}
          loading={pageLoading}
          error={error}
        >
          {(!isFiltered ? allCadidateList : filteredCandidate).map(
            (candidate) => (
              <LinkedInCandidateCardPartial
                candidate={candidate}
                key={candidate.id}
              />
            ),
          )}
        </PageLoader>
        {candidateSource === "linkedin"
          ? !pageLoading &&
            next && (
              <CursorBasePagination
                limit={10}
                use={next.use}
                nextPage={next.page}
                cursor={next.unipileCursor}
                filterOptions={filterOptions}
                getMoreListAction={getMoreAllCandidatesList}
              />
            )
          : null}
      </ModalBody>
      <NavSeparator />

      {candidateSource === "custom" ? (
        <>
          <ModalFooter>
            <Pagination
              limit={10}
              count={paginationCount}
              getListAction={getCustomProfiles}
            />
          </ModalFooter>
        </>
      ) : (
        <></> // or null
      )}

      <ModalFooter>
        <ModalFooterChild className="w-full max-md:!flex-col">
          <Button
            isDisable={submitLoading}
            onClick={() => setModal(false)}
            className="w-full"
            variant="outline"
            color="zinc"
          >
            Cancel
          </Button>
          <Button
            isLoading={submitLoading}
            onClick={() => assignManyCandidates()}
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
