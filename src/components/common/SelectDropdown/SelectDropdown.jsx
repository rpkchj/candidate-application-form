import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SelectDropdown = ({dataset, label}) => {
  return (
    <FormControl fullWidth size='small'>
        <InputLabel>{label}</InputLabel>
    <Select placeholder='Select an option' sx={{width: '8rem'}}>
        {dataset.map(data => {
            return <MenuItem value={data}>{data}</MenuItem>
        })}
    </Select>
    </FormControl>
  )
}

export default SelectDropdown