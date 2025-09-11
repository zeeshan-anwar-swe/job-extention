import Button from "../../../../components/ui/Button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalFooterChild,
  ModalHeader,
} from "../../../../components/ui/Modal";

import { cn } from "../../../../utils/cn";
import Validation from "../../../../components/form/Validation";
import { useFormik } from "formik";
import FieldWrap from "../../../../components/form/FieldWrap";
import Icon from "../../../../components/icon/Icon";
import Input from "../../../../components/form/Input";
import { useAppDispatch } from "../../../../hooks/useReduxStore";
import { CandidateJobStatus } from "../../../../types/enums/candidateJobStatus.enum";

type TValues = {
  meetingLink: string;
};

export const ChangeCandidatesStatusModalPartial = ({
  modal,
  setModal,
  candidateId,
  reFreshList,
  candidateName,
  changeStatusTo,
  action,
}: {
  action: any;
  setModal: any;
  modal: boolean;
  reFreshList?: any;
  candidateId: string;
  candidateName?: string;
  changeStatusTo: CandidateJobStatus;
}) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      meetingLink: "",
    },

    validate: (values: TValues) => {
      const errors: Partial<TValues> = {};

      if (!values.meetingLink) {
        errors.meetingLink = "Required";
      }
      if (values.meetingLink.length < 3) {
        errors.meetingLink = "Meeting link must be at least 3 characters long";
      }

      return errors;
    },
    onSubmit: async (values: TValues) => {
      await dispatch(
        action({
          candidateId,
          status: changeStatusTo,
          meetingLink: values.meetingLink,
        }),
      );
      setModal(false);
      reFreshList && dispatch(reFreshList);
    },
  });

  return (
    <Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
      <ModalHeader>
        Change status of Candidate: {candidateName ?? ""}
      </ModalHeader>

      <ModalBody className="py-2">
        <form onSubmit={formik.handleSubmit}>
          <Validation
            isValid={formik.isValid}
            isTouched={formik.touched.meetingLink}
            invalidFeedback={formik.errors.meetingLink}
            validFeedback=""
          >
            <FieldWrap firstSuffix={<Icon icon="HeroLink" className="mx-2" />}>
              <Input
                rounded="rounded-full"
                type="text"
                dimension="lg"
                id="meetingLink"
                autoComplete="meetingLink"
                name="meetingLink"
                placeholder="Enter Meeting Link"
                value={formik.values.meetingLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FieldWrap>
          </Validation>
        </form>
      </ModalBody>

      <ModalFooter className="!block">
        <ModalFooterChild className="w-full pt-4 max-md:!flex-col">
          <Button
            onClick={() => setModal(false)}
            className="w-full"
            variant="outline"
            color="zinc"
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            className="w-full"
            isLoading={formik.isSubmitting}
            onClick={() => formik.handleSubmit()}
          >
            Done
          </Button>
        </ModalFooterChild>
      </ModalFooter>
    </Modal>
  );
};
