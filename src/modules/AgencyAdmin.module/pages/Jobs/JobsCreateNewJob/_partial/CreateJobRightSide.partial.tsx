import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../store";
import Card, {
  CardBody,
  CardTitle,
  CardHeader,
  CardSubTitle,
  CardHeaderChild,
} from "../../../../../../components/ui/Card";
import {
  getAllCandidatesList,
  getCustomProfiles,
  getMoreAllCandidatesList,
  LinkedInProfile,
  setCandidatesFilterOptions,
} from "../../../../../../store/slices/Candiates.slice";
import CandidateCardPartial from "./CandidateCard.partial";
import JobFilterDropdownPartial from "./JobFilterDropdown.partial";
import MainLoader from "../../../../../../templates/layouts/main/MainLoader";
import { NavSeparator } from "../../../../../../components/layouts/Navigation/Nav";
import { CursorBasePagination } from "../../../../../../components/ui/CusrorBasePagination";
import SearchPartial from "../../../../../Shared/common/assignLinkedInCandiatesToJobModal/Search.partial";
import { useEffect } from "react";
import { CandidateTypeSwitch } from "./CandidateTypeSwitch";
import Pagination from "../../../../../../components/ui/Pagination";

const CreateJobRightSidePartial = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    next,
    error,
    pageLoading,
    filterOptions,
    allCadidateList,
    candidateSource,
    paginationCount,
    filteredCandidate,
  } = useSelector((state: RootState) => state.candidates);

  const isFiltered = filteredCandidate?.length > 0;

  useEffect(() => {
    if (candidateSource === "linkedin") {
      dispatch(
        getAllCandidatesList({
          page: 1,
          limit: 10,
          filterOptions,
          candidateSource,
        }),
      );
    }
  }, [candidateSource]);

  return (
    <Card className="relative col-span-4 flex flex-col gap-2 max-lg:col-span-12">
      <CardHeader>
        <CardHeaderChild className="!block">
          <CardTitle>Assign Candidates</CardTitle>
          <CardSubTitle>Add Candidates to the Job</CardSubTitle>
        </CardHeaderChild>
        <CardHeaderChild className="!flex !items-start w-full !gap-2">
          <div className="flex-1">
            <SearchPartial
              searchLimit={10}
              filterOptions={filterOptions}
              placeholder="Search Candidate..."
              searchListAction={candidateSource === "linkedin" ? getAllCandidatesList: getCustomProfiles}
              setFilterOptions={setCandidatesFilterOptions}
            />
          </div>
          <JobFilterDropdownPartial />
        </CardHeaderChild>
        <CandidateTypeSwitch />
      </CardHeader>

      <NavSeparator className="!mx-4 mb-4" />
      <CardBody className="flex h-[450px] flex-col gap-4 overflow-y-scroll">
        <MainLoader
          error={error}
          loading={pageLoading}
          data={isFiltered ? filteredCandidate : allCadidateList}
        >
          {(!isFiltered ? allCadidateList : filteredCandidate).map(
            (candidate: LinkedInProfile) => (
              <CandidateCardPartial key={candidate.id} candidate={candidate} />
            ),
          )}
        </MainLoader>
        {candidateSource === "custom" ? (
          <Pagination
            limit={10}
            count={paginationCount}
            filterOptions={filterOptions}
            getListAction={getCustomProfiles}
          />
        ) : (
          !pageLoading &&
          next && (
            <CursorBasePagination
              limit={10}
              use={next.use}
              nextPage={next.page}
              cursor={next.unipileCursor}
              filterOptions={filterOptions}
              candidateSource={candidateSource}
              getMoreListAction={getMoreAllCandidatesList}
            />
          )
        )}
      </CardBody>
    </Card>
  );
};

export default CreateJobRightSidePartial;
