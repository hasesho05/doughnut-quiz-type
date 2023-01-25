import React, { RefAttributes, SyntheticEvent } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar' 
import MuiAlert from '@mui/material/Alert' 

const Alert = React.forwardRef(function Alert(props, ref) {  
  return <MuiAlert elevation={6}  variant="filled" {...props} />
})

type Props = {
  message: string
}

function FlashMessage( props: Props ) {
  const { message } = props
  const [open, setOpen] = React.useState(true)

  const handleClose = (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }


  return (
    <div>
      <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' ,backgroundColor:'white'}} variant='outlined'>
            {message}
          </Alert>
      </Snackbar>
    </div>
  )
}

export default FlashMessage