import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const SelectDropdown = ({dataset, label, className, onChange , multiple}) => {
  return (
    <Autocomplete
      size='small'
      className={className}
      multiple={multiple ?? true}
      limitTags={1}
      options={dataset}
      onChange={onChange}
      getOptionLabel={dataset => dataset}
      renderInput={(params) => (
        <TextField {...params} label={label} />
      )}
    
    />
  )
}

export default SelectDropdown


export const GroupedSelectDropDown = ({dataset, className, onChange, label}) => {
  //this is to ensure that we get the proper list of roles for each defined category role.
  const groupedRoles = Object.keys(dataset).flatMap(group => dataset[group].map(option => ({ group, option })));
  return (
    <Autocomplete
    multiple
    limitTags={1}
    onChange={onChange}
    size='small'
    className={className}
    options={groupedRoles}
    groupBy={(option) => option.group.toUpperCase()}
    getOptionLabel={(option) => option.option}
    renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
  />
  )
}