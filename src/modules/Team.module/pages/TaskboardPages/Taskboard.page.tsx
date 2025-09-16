import Container from "../../../../components/layouts/Container/Container";
import PageWrapper from "../../../../components/layouts/PageWrapper/PageWrapper";
import Subheader, {
  SubheaderLeft,
  SubheaderRight,
} from "../../../../components/layouts/Subheader/Subheader";
import Header, {
  HeaderLeft,
  HeaderRight,
} from "../../../../components/layouts/Header/Header";
import DefaultHeaderRightCommon from "../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common";
import Breadcrumb from "../../../../components/layouts/Breadcrumb/Breadcrumb";
import Card, {
  CardHeader,
  CardHeaderChild,
  CardSubTitle,
  CardTitle,
} from "../../../../components/ui/Card";
import { useEffect, useState } from "react";
import TaskSectionCardPartial from "./_partial/TaskSectionCard.partial";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { JobStatus } from "../../../../types/enums/jobStatus.enum";
import {
  getTeamTaskBoardBackLogJobs,
  getTeamTaskBoardCompletedJobs,
  getTeamTaskBoardInProgressJobs,
  getTeamTaskBoardInReviewJobs,
} from "../../../../store/slices/Agency/Taskboard.slice";
import PeriodAndDateRange from "../../../Shared/partials/PeriodAndDateRange/PeriodAndDateRange.partial";
import dayjs from "dayjs";
import { cn } from "../../../../utils/cn";
import CustomDropDown from "../../../AgencyAdmin.module/components/CustomDropDown.component";

const TeamTaskboardPage = () => {
  const [showJobs, setShowJobs] = useState<string>("All Projects");
  const [sortBy, setSortBy] = useState<string>("");
  const [dateRange, setDateRange] = useState<any>({
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: "",
  });
  const dispatch: AppDispatch = useDispatch();

  const { backlogJobs, inProgressJobs, inReviewJobs, completedJobs } =
    useSelector((state: RootState) => state.taskBoard);

  useEffect(() => {
    // Define common payload for API calls
    const payload = {
      limit: 10,
      page: 1,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };

    if (showJobs === "All Projects") {
      dispatch(getTeamTaskBoardBackLogJobs(payload));
      dispatch(getTeamTaskBoardInProgressJobs(payload));
      dispatch(getTeamTaskBoardInReviewJobs(payload));
      dispatch(getTeamTaskBoardCompletedJobs(payload));
    } else if (showJobs === "Backlog") {
      dispatch(getTeamTaskBoardBackLogJobs(payload));
    } else if (showJobs === "In Progress") {
      dispatch(getTeamTaskBoardInProgressJobs(payload));
    } else if (showJobs === "In Review") {
      dispatch(getTeamTaskBoardInReviewJobs(payload));
    } else if (showJobs === "Completed") {
      dispatch(getTeamTaskBoardCompletedJobs(payload));
    }
  }, [dateRange, showJobs, dispatch]); // Add showJobs to the dependency array

  return (
    <>
      <Header>
        <HeaderLeft>
          <Breadcrumb path="Pages / Task Board" currentPage="Manage Task" />
        </HeaderLeft>
        <HeaderRight>
          <DefaultHeaderRightCommon />
        </HeaderRight>
      </Header>
      <PageWrapper name="Task Board">
        <Subheader>
          <SubheaderLeft>
            <CustomDropDown
              setItem={setShowJobs}
              items={[
                "All Projects",
                "Backlog",
                "In Progress",
                "In Review",
                "Completed",
              ]}
              title="All Projects"
              icon="HeroListBullet"
            />

            <CustomDropDown
              setItem={setSortBy}
              items={["Assending", "Descending"]}
              title="Sort By"
              icon="HeroArrowsUpDown"
            />
          </SubheaderLeft>
          <SubheaderRight>
            <PeriodAndDateRange setDateRange={setDateRange} />
          </SubheaderRight>
        </Subheader>
        <Container className="grid grid-cols-4 gap-4 ">
          <Card
            className={cn(
              "col-span-4 grid gap-4 p-4",
              showJobs === "All Projects" ? "grid-cols-4" : "grid-cols-1",
            )}
          >
            <Card className="col-span-full">
              <CardHeader className="w-full">
                <CardHeaderChild className="!block">
                  <CardTitle>Jobs</CardTitle>
                  <CardSubTitle>
                    Create, Delete, and assign Candidates to jobs effectively.
                  </CardSubTitle>
                </CardHeaderChild>
              </CardHeader>
            </Card>
            {showJobs === "All Projects" && (
              <>
                <TaskSectionCardPartial
                  sortBy={sortBy}
                  ListLimit={10}
                  getJobListAction={getTeamTaskBoardBackLogJobs}
                  jobList={backlogJobs}
                  color="amber"
                  lineColor="!border-amber-500"
                  cardType={JobStatus.BACKLOG}
                />
                <TaskSectionCardPartial
                  sortBy={sortBy}
                  ListLimit={10}
                  getJobListAction={getTeamTaskBoardInProgressJobs}
                  jobList={inProgressJobs}
                  color="blue"
                  lineColor="!border-blue-500"
                  cardType={JobStatus.IN_PROGRESS}
                />
                <TaskSectionCardPartial
                  sortBy={sortBy}
                  ListLimit={10}
                  getJobListAction={getTeamTaskBoardInReviewJobs}
                  jobList={inReviewJobs}
                  color="violet"
                  lineColor="!border-violet-500"
                  cardType={JobStatus.IN_REVIEW}
                />
                <TaskSectionCardPartial
                  sortBy={sortBy}
                  ListLimit={10}
                  getJobListAction={getTeamTaskBoardCompletedJobs}
                  jobList={completedJobs}
                  color="emerald"
                  lineColor="!border-emerald-500"
                  cardType={JobStatus.COMPLETED}
                />
              </>
            )}

            {showJobs === "Backlog" && (
              <TaskSectionCardPartial
                sortBy={sortBy}
                ListLimit={10}
                getJobListAction={getTeamTaskBoardBackLogJobs}
                jobList={backlogJobs}
                color="amber"
                lineColor="!border-amber-500"
                cardType={JobStatus.BACKLOG}
              />
            )}

            {showJobs === "In Progress" && (
              <TaskSectionCardPartial
                sortBy={sortBy}
                ListLimit={10}
                getJobListAction={getTeamTaskBoardInProgressJobs}
                jobList={inProgressJobs}
                color="blue"
                lineColor="!border-blue-500"
                cardType={JobStatus.IN_PROGRESS}
              />
            )}

            {showJobs === "In Review" && (
              <TaskSectionCardPartial
                sortBy={sortBy}
                ListLimit={10}
                getJobListAction={getTeamTaskBoardInReviewJobs}
                jobList={inReviewJobs}
                color="violet"
                lineColor="!border-violet-500"
                cardType={JobStatus.IN_REVIEW}
              />
            )}

            {showJobs === "Completed" && (
              <TaskSectionCardPartial
                sortBy={sortBy}
                ListLimit={10}
                getJobListAction={getTeamTaskBoardCompletedJobs}
                jobList={completedJobs}
                color="emerald"
                lineColor="!border-emerald-500"
                cardType={JobStatus.COMPLETED}
              />
            )}
          </Card>
        </Container>
      </PageWrapper>
    </>
  );
};

export default TeamTaskboardPage;
