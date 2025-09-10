import Container from "../../../../../components/layouts/Container/Container";
import PageWrapper from "../../../../../components/layouts/PageWrapper/PageWrapper";
import Subheader, {
  SubheaderLeft,
} from "../../../../../components/layouts/Subheader/Subheader";
import Header, {
  HeaderLeft,
  HeaderRight,
} from "../../../../../components/layouts/Header/Header";
import DefaultHeaderRightCommon from "../../../../../templates/layouts/Headers/_common/DefaultHeaderRight.common";
import Button from "../../../../../components/ui/Button";
import Breadcrumb from "../../../../../components/layouts/Breadcrumb/Breadcrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EditCVFormPartial } from "./_partial/EditCVForm.partial";
import { useFormik } from "formik";
import { EditCVRightPartial } from "./_partial/EditCVRight.partial";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import {
  getCandidateProfile,
  setCandidateProfile,
  updateCandidateProfile,
} from "../../../../../store/slices/Candiates.slice";
import PageLoader from "../../../../../templates/layouts/main/PageLoader";
import { getSocialLinkWithId } from "../../../../../utils/helper";
import { Descendant } from "slate";

interface SocialLink {
  id?: string;
  provider: string;
  link: string;
}

export type EditCVFormValues = {
  isShowImage: "0" | "1";
  customCVTitle:string;
  selectedJob: { label: string; value: string };
  action: "create" | "update" | "";
  name: string;
  file: File | null;
  about: string;
  skills: string[];
  availabilty: string;
  roles: string[];
  experience: number;
  education: string;
  cvText: Descendant[];
  LinkedIn: string;
  GitHub: string;
  socialProfiles: SocialLink[];
};

const CandidateCVEditPage = () => {
  const navigateTo = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { pageLoading, cadnidateProfile, error } = useSelector(
    (state: RootState) => state.candidates,
  );

  const { state } = useLocation();

  const formik = useFormik({
    initialValues: {
      customCVTitle:"",
      action: "update",
      isShowImage: "1",
      name: "",
      skills: [],
      file: null,
      about: "",
      availabilty: "",
      roles: [],
      experience: 0,
      socialProfiles: [],
      education: "",
      LinkedIn: "",
      GitHub: "",
      selectedJob: { label: "search jobs", value: "" },
      cvText: JSON.parse(
        '[{"type":"paragraph","children":[{"text":""}]}]',
      ) as Descendant[],
    },

    validate: (values: EditCVFormValues) => {
      const errors: Partial<EditCVFormValues> = {};

      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length < 2) {
        errors.name = "Name must be at least 2 characters long";
      }

      // // Add validation for required GitHub field
      if (values.GitHub) {
        const githubRegex =
          /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;

        if (values.GitHub && !githubRegex.test(values.GitHub)) {
          errors.GitHub =
            "Please enter a valid GitHub profile URL,Example: https://github.com/your-username.";
        }
      }

      if (values.action === "create") {
        if (!values.customCVTitle) {
          errors.customCVTitle = "Custom CV Title is required";
        }
      }

      return errors;
    },
    onSubmit: async (values: EditCVFormValues) => {
      const {
        file,
        name,
        action,
        cvText,
        isShowImage,
        roles,
        customCVTitle,
        experience,
        education,
        skills,
        GitHub,
        about,
        selectedJob,
      } = values;

      const preGitHub: { id: string; link: string } | null =
        getSocialLinkWithId(
          cadnidateProfile?.profile?.socialProfiles ?? [],
          "GitHub",
        );

      const formData = new FormData();

      if (isShowImage) {
        if (file) {
          formData.append("file", file);
        }
      }

      if (action === "update") {
        action === "update" &&
          formData.append("jobProfileId", state.selectedJob.id);
      } else if (action === "create") {
        formData.append("customCVTitle", customCVTitle);
        formData.append("candidateId", state.candidate.id);
      }
      const stringifiedCVText = await JSON.stringify(cvText);
      formData.append("cv", stringifiedCVText);
      formData.append("isShowImage", isShowImage);
      formData.append("about", about);
      formData.append("name", name);
      formData.append("action", action);
      formData.append("roles", JSON.stringify(roles));
      formData.append("experience", experience.toString());
      formData.append("education", education);
      formData.append("skills", JSON.stringify(skills));
      GitHub
        ? formData.append(
            "socialProfiles",
            JSON.stringify([
              preGitHub
                ? { id: preGitHub.id, provider: "GitHub", link: GitHub }
                : { provider: "GitHub", link: GitHub },
            ]),
          )
        : formData.append("socialProfiles", JSON.stringify([]));

      await dispatch(
        updateCandidateProfile({
          payload: formData,
        }),
      );

      navigateTo("/dashboard/candidates");
    },
  });

  useEffect(() => {
    if (state) {
      dispatch(
        getCandidateProfile({
          id: state.selectedJob.id,
          candidateId: state.candidate.id,
        }),
      );
    } else {
      navigateTo("/dashboard/candidates");
    }

    return () => {
      dispatch(setCandidateProfile(null));
    };
  }, [state]);

  return (
    <>
      <Header>
        <HeaderLeft>
          <Breadcrumb
            path="Pages / Candidates"
            currentPage="Edit Candidate CV"
          />
        </HeaderLeft>
        <HeaderRight>
          <DefaultHeaderRightCommon />
        </HeaderRight>
      </Header>
      <PageWrapper name="Candidate CV">
        <Subheader>
          <SubheaderLeft>
            <Link to="/dashboard/candidates">
              <Button rounded="rounded-full" icon="HeroArrowLeft">
                Back To Candidates
              </Button>
            </Link>
          </SubheaderLeft>
        </Subheader>
        <PageLoader loading={pageLoading} data={cadnidateProfile} error={error}>
          <Container className="grid grid-cols-12 gap-4 relative">
            <EditCVFormPartial formik={formik} />
            <EditCVRightPartial formik={formik} />
          </Container>
        </PageLoader>
      </PageWrapper>
    </>
  );
};

export default CandidateCVEditPage;
