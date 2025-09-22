import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { FC, useEffect, useState } from "react";
import Icon from "../../../../components/icon/Icon";
import Input from "../../../../components/form/Input";
import Button from "../../../../components/ui/Button";
import FieldWrap from "../../../../components/form/FieldWrap";
import { FilterOptionsType } from "../../../../types/slices.type/candidate.slice.type";
import Validation from "../../../../components/form/Validation";
import { useFormik } from "formik";

interface SearchComponentProps {
  filterOptions: FilterOptionsType;
  placeholder?: string;
  searchLimit?: number;
  searchListAction: any;
  setFilterOptions: (payload: FilterOptionsType) => void;
}

interface SearchFormikValues {
  search: string;
}
const SearchPartial: FC<SearchComponentProps> = ({
  filterOptions,
  searchListAction,
  searchLimit = 10,
  placeholder = "Search...",
  setFilterOptions,
}) => {
  const emptyFilterOptions: FilterOptionsType = {
    skills: [],
    keywords: "",
    location: [],
    tenure: { min: 0, max: 0 },
    spokenLanguages: [],
  };

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik<SearchFormikValues>({
    initialValues: {
      search: "",
    },

	
    onSubmit: (values) => {
		if(!values.search){
			formik.setFieldError("search", "Write something to search");
			return;
		}

      if (values.search && values.search.trim() !== "") {
        dispatch(
          searchListAction({
            page: 1,
            limit: searchLimit,
            filterOptions: { ...filterOptions, keywords: values.search },
          }),
        );
      }
    },
  });


  const clearSearch = async () => {
    formik.setFieldValue("search", "");
    dispatch(setFilterOptions(emptyFilterOptions));
    dispatch(searchListAction({ limit: searchLimit, page: 1 }));
  };

  const handleChange = (data: string) => {
    formik.setFieldValue("search", data);
    dispatch(setFilterOptions({ ...filterOptions, keywords: data }));
  };

  useEffect(() => {
    return () => dispatch(setFilterOptions(emptyFilterOptions));
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} className="flex items-start gap-2">
      <div className="w-full">
        <Validation
          isValid={formik.isValid}
          isTouched={formik.touched.search}
          invalidFeedback={formik.errors.search}
          validFeedback=""
        >
          <FieldWrap
            lastSuffix={
              formik.values.search !== "" && (
                <Icon
                  color="red"
                  icon="HeroXMark"
                  className="mx-2 cursor-pointer"
                  onClick={() => clearSearch()}
                />
              )
            }
          >
            <Input
              id="search"
              name="search"
              className="pl-4"
              variant="outilned"
              rounded="rounded-full"
              placeholder={placeholder}
              value={formik.values.search}
              onChange={(e: any) => handleChange(e.target.value as string)}
            />
          </FieldWrap>
        </Validation>
      </div>
      <Button type="submit" color="blue" rounded="rounded-full" variant="solid">
        Search
      </Button>
    </form>
  );
};

export default SearchPartial;
