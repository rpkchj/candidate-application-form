import React from "react";
import "./filterfields.css";
import SelectDropdown, {
  GroupedSelectDropDown,
} from "../common/SelectDropdown/SelectDropdown";
import InputTextField from "../common/InputTextField/InputTextField";
import { jobType, numOfEmployees, roles, techStack } from "../../dataFile";
import { useDispatch } from "react-redux";
import { updateJobFilters } from "../../slice/jobSlice";

const FilterFields = () => {
  let timeoutVariable;
  const dispatch = useDispatch();
  const experience = [];
  const minBasePay = [];

  //using these two for loops to populate the data in the array
  for (let i = 1; i <= 10; i++) {
    experience.push(i);
  }

  for (let i = 0; i <= 7; i++) {
    minBasePay.push(`${i * 10}L`);
  }


  const getGroupRoleFromDropdown = (e, newVal, key) => {
    //seperate function for roles dropdown due to different data structure
    dispatch(updateJobFilters({data: newVal.map(val => val.option.toUpperCase()), key: key}));
  }

  const getFilterFromDropdown = (_, newVal, key) => {
    const valToBePassed = typeof newVal === "object" ? newVal && newVal.map(val => val.option.toUpperCase()) : parseInt(newVal)
    dispatch(updateJobFilters({data: valToBePassed ?? "", key:key}));
  };

  const getCompanyName = (e, key) => {
    // making sure to add the filter string only when there is a gap of 500ms between character input
    clearTimeout(timeoutVariable);
    timeoutVariable = setTimeout(() => {
      dispatch(updateJobFilters({data:e.target.value.toUpperCase(), key:key}));
    }, 500);
  };

  return (
    <div className="fieldset__container">
      <div className="fieldset">
        <GroupedSelectDropDown
          className={"filter__fields"}
          dataset={roles}
          label={"Roles"}
          onChange={(_, newVal) => getGroupRoleFromDropdown(_, newVal, "jobRole")}
        />
        <SelectDropdown
          className={"filter__fields"}
          dataset={techStack}
          label={"Tech Stack"}
          onChange={(_, newVal) => getFilterFromDropdown(_, newVal, "techStack")}
        />
        <SelectDropdown
          className={"filter__fields"}
          dataset={numOfEmployees}
          label={"Number of Employees"}
          onChange={(_, newVal) => getFilterFromDropdown(_, newVal, "numOfEmployees")}
        />
        <SelectDropdown
          className={"filter__fields"}
          dataset={jobType}
          label={"Remote"}
          onChange={(_, newVal) => getFilterFromDropdown(_, newVal, "location")}
        />
        <SelectDropdown
          className={"filter__fields"}
          dataset={experience}
          label={"Minimum Experience"}
          multiple={false}
          onChange={(_, newVal) => getFilterFromDropdown(_, newVal, "minExp")}
        />
        <SelectDropdown
          className={"filter__fields"}
          dataset={minBasePay}
          label={"Minimum Base Salary"}
          multiple={false}
          onChange={(_, newVal) => getFilterFromDropdown(_, newVal, "minJdSalary")}
        />
        <InputTextField
          className={"filter__fields input__field"}
          label={"Search Company Name"}
          onChange={(e) => getCompanyName(e, "companyName")}
        />
      </div>
    </div>
  );
};

export default FilterFields;
