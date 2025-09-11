import Card, {
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderChild,
  CardSubTitle,
  CardTitle,
} from "../../../../../../components/ui/Card";
import { NavSeparator } from "../../../../../../components/layouts/Navigation/Nav";
import SearchPartial from "./Search.partial";
import CandidateCardPartial from "./CandidateCard.partial";
import JobFilterDropdownPartial from "./JobFilterDropdown.partial";
import {RootState } from "../../../../../../store";
import {useSelector } from "react-redux";
import MainLoader from "../../../../../../templates/layouts/main/MainLoader";
import {
  getAllCandidatesList,
  LinkedInProfile,
} from "../../../../../../store/slices/Candiates.slice";
import Pagination from "../../../../../../components/ui/Pagination";

const CreateJobRightSidePartial = () => {
  const {
    allCadidateList,
    filteredCandidate,
    filterOptions,
    paginationCount,
    search,
    pageLoading,
    error,
  } = useSelector((state: RootState) => state.candidates);

  const isFiltered = filteredCandidate?.length > 0;

  console.log({ filteredCandidate, allCadidateList });

  return (
    <Card className="relative col-span-4 flex flex-col gap-2 max-lg:col-span-12">
      <CardHeader>
        <CardHeaderChild className="!block">
          <CardTitle>Assign Candidates</CardTitle>
          <CardSubTitle>Add Candidates to the Job</CardSubTitle>
        </CardHeaderChild>
        <CardHeaderChild className="!flex w-full !justify-between">
          <SearchPartial />
          <JobFilterDropdownPartial />
        </CardHeaderChild>
      </CardHeader>

      <NavSeparator className="!mx-4 mb-4" />
      <CardBody className="flex h-[450px] flex-col gap-4 overflow-y-scroll">
        <MainLoader
          loading={pageLoading}
          error={error}
          data={isFiltered ? filteredCandidate : allCadidateList}
        >
          {(!isFiltered ? allCadidateList : filteredCandidate).map(
            (candidate: LinkedInProfile) => (
              <CandidateCardPartial key={candidate.id} candidate={candidate} />
            ),
          )}
        </MainLoader>
      </CardBody>
      <CardFooter>
        <Pagination
          search={search ?? undefined}
          filterOptions={isFiltered ? filterOptions : undefined}
          count={paginationCount}
          getListAction={getAllCandidatesList}
          limit={10}
        />
      </CardFooter>
    </Card>
  );
};

export default CreateJobRightSidePartial;
