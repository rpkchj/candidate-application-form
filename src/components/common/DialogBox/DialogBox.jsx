import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const DialogBox = ({dialogTitle,dialogContent, closeDialogMethod, openDialog}) => {
  return (
    <Dialog onClose={closeDialogMethod} open={openDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent}
    </Dialog>
  )
}

export default DialogBox