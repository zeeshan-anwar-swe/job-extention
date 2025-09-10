import React, { ChangeEvent, FC, useState } from "react";
import Card, {
  CardBody,
  CardHeader,
  CardTitle,
} from "../../../../../../components/ui/Card";
import { AppDispatch, RootState } from "../../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocationForCandidates,
  setCandidatesFilterOptions,
  setLoactionLoading,
} from "../../../../../../store/slices/Candiates.slice";
import SelectReact from "../../../../../../components/form/SelectReact";
import { useDebouncedCallback } from "use-debounce";

interface TLocationOption {
  label: string;
  value: string;
}
export const JobsFilterDropdownLocation = () => {
  const [selectedLocationOption, setSelectedLocationOption] =
    useState<TLocationOption>({
      label: "",
      value: "",
    });
  const { loading, count, rows } = useSelector(
    (state: RootState) => state.candidates.location,
  );

  const dispatch: AppDispatch = useDispatch();

  const debounced = useDebouncedCallback((value) => {
    if (value) {
      dispatch(
        getLocationForCandidates({ page: 1, limit: 10, keywords: value }),
      );
    }
  }, 700);

  const handlelocationinputChange = (value: string) => {
    if (value) {
      dispatch(setLoactionLoading(true));
      debounced(value);
    }
  };

  const { filterOptions } = useSelector((state: RootState) => state.candidates);

  console.log({ location: rows });

  const handleLocationChange = (event: any) => {
    setSelectedLocationOption(event);
    dispatch(
      setCandidatesFilterOptions({
        ...filterOptions,
        location: [{ id: event.value, title: event.label }],
      }),
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="!text-lg !font-medium">Location</CardTitle>
      </CardHeader>
      <CardBody>
        <SelectReact
          name="location"
          isLoading={loading}
          placeholder="Search Location"
          // value={selectedLocationOption}
          value={
            filterOptions.location.length > 0
              ? {
                  label: filterOptions.location[0].title,
                  value: filterOptions.location[0].id,
                }
              : { label: "Search Location..", value: "id" }
          }
          options={
            rows?.length > 0
              ? rows.map((location) => ({
                  value: location.id ? location.id : location.locationId,
                  label: location.title,
                }))
              : []
          }
          onInputChange={(value: string) => handlelocationinputChange(value)}
          onChange={handleLocationChange}
        />
      </CardBody>
    </Card>
  );
};
