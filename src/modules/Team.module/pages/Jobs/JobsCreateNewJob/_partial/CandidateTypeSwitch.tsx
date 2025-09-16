import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../../components/ui/Button";
import { AppDispatch, RootState } from "../../../../../../store";
import Card, { CardHeaderChild } from "../../../../../../components/ui/Card";
import { setCandidateSource } from "../../../../../../store/slices/Candiates.slice";

export const CandidateTypeSwitch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { candidateSource, pageLoading } = useSelector(
    (state: RootState) => state.candidates,
  );
  return (
    <Card className="w-full ">
      <CardHeaderChild>
        <Button
          isDisable={pageLoading}
          onClick={() => dispatch(setCandidateSource("linkedin"))}
          variant={candidateSource === "linkedin" ? "solid" : "outline"}
          icon="HeroLinkedIn"
          rounded="rounded-full"
        >
          LinkedIn
        </Button>

        <Button
          isDisable={pageLoading}
          onClick={() => dispatch(setCandidateSource("custom"))}
          variant={candidateSource === "custom" ? "solid" : "outline"}
          icon="HeroDocumentText"
          rounded="rounded-full"
        >
          Custom
        </Button>
      </CardHeaderChild>
    </Card>
  );
};
