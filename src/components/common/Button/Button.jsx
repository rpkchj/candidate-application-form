import React from 'react'
import "./button.css"
import { Button } from '@mui/material'

const ButtonCommon = ({variant, text, className, onAction}) => {
  return (
    <div>
      <Button className={className} onClick={onAction} variant={variant}>{text}</Button>
    </div>
  )
}

export default ButtonCommon