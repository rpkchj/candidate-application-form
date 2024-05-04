import React from 'react'
import "./card.css"
import { Card, CardContent, CardActions } from '@mui/material'

const CardCommon = ({cardContent, cardActionsButtons, className}) => {
  return (
    <div>
      <Card className={className}>
      <CardContent>
       {cardContent}
      </CardContent>
      <CardActions>
        {cardActionsButtons}
      </CardActions>
    </Card>
    </div>
  )
}

export default CardCommon