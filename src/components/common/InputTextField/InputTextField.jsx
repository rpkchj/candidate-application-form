import { TextField } from '@mui/material'
import React from 'react'

const InputTextField = ({label, onChange, placeholder, className}) => {
  return (
    <TextField size='small' label={label} onChange={onChange} placeholder={placeholder} className={className} />
  )
}

export default InputTextField