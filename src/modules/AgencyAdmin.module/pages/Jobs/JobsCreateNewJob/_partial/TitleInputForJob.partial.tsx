import { ChangeEvent } from "react";
import Label from "../../../../../../components/form/Label";
import Input from "../../../../../../components/form/Input";
import FieldWrap from "../../../../../../components/form/FieldWrap";
import {
  getAllCandidatesList,
  getCustomProfiles,
  setCandidatesFilterOptions,
} from "../../../../../../store/slices/Candiates.slice";
import { AppDispatch, RootState } from "../../../../../../store";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { FormData } from "./CreateJobLeftSide.partial";

export const TitleInputForJobPartial = ({
  formData,
  setFormData,
}: {
  setFormData: any;
  formData: FormData;
}) => {
  const { filterOptions, candidateSource } = useSelector(
    (state: RootState) => state.candidates,
  );
  const dispatch: AppDispatch = useDispatch();

  const debouncedTitleSearch = useDebouncedCallback((value) => {
    if (value) {
      if (candidateSource === "linkedin") {
        dispatch(
          getAllCandidatesList({
            page: 1,
            limit: 10,
            filterOptions: { ...filterOptions, keywords: value },
          }),
        );
      } else {
        dispatch(
          getCustomProfiles({
            page: 1,
            limit: 10,
            filterOptions: { ...filterOptions, keywords: value },
          }),
        );
      }
    }
  }, 700);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(setCandidatesFilterOptions({ ...filterOptions, keywords: value }));
    debouncedTitleSearch(value);
  };
  return (
    <div className="w-full">
      <Label htmlFor="title" className="font-light">
        Title
      </Label>

      <FieldWrap>
        <Input
          id="title"
          name="title"
          dimension="lg"
          defaultValue={1}
          value={formData.title}
          onChange={handleChange}
          placeholder="React Developer etc..."
        />
      </FieldWrap>
    </div>
  );
};
