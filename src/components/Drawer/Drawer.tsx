import React, { useState } from 'react'
import Drawer from 'react-modern-drawer' // eslint-disable-line no-unused-vars
import 'react-modern-drawer/dist/index.css'
import CloseIcon from '@mui/icons-material/Close' // eslint-disable-line no-unused-vars
import PeopleIcon from '@mui/icons-material/People' // eslint-disable-line no-unused-vars
import MenuIcon from '@mui/icons-material/Menu' // eslint-disable-line no-unused-vars
import Styles from './Drawer.module.scss'
import ConstructionIcon from '@mui/icons-material/Construction' // eslint-disable-line no-unused-vars
import MailOutlineIcon from '@mui/icons-material/MailOutline' // eslint-disable-line no-unused-vars
import TextField from '@mui/material/TextField' // eslint-disable-line no-unused-vars
import Dialog from '@mui/material/Dialog' // eslint-disable-line no-unused-vars
import DialogActions from '@mui/material/DialogActions' // eslint-disable-line no-unused-vars
import DialogContent from '@mui/material/DialogContent' // eslint-disable-line no-unused-vars
import DialogContentText from '@mui/material/DialogContentText' // eslint-disable-line no-unused-vars
import DialogTitle from '@mui/material/DialogTitle' // eslint-disable-line no-unused-vars
import { Button } from '@mui/material' // eslint-disable-line no-unused-vars
import FlashMessage from '../FlashMessage/FlashMessage' // eslint-disable-line no-unused-vars
import { addDoc, collection } from '@firebase/firestore'
import { db } from '../../config/firebase'
import Link from 'next/link' // eslint-disable-line no-unused-vars





function DrawerSettings() {
  const [success, setSuccess] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [name, setName] = useState('nanashi')

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleClose = () => {
      setIsOpen((prevState) => !prevState)
      setOpen(true)
    }

    const [open, setOpen] = React.useState(false)
    const handleBoxClose = () => {
      setOpen(false)
    }
    
    const handleChange = (e:any) => {
      setText(() => e.target.value)
    }
    const handleNameChange = (e:any) => {
      setName(() => e.target.value)
    }

    const handleBoxSubmit = async () => {
    addDoc(collection(db, 'opinions'), {
      name: name,
      opinion: text
    })

    setText('')
    setOpen(false)
    setSuccess(true)
    }
  return (
    <div>
      <MenuIcon onClick={toggleDrawer} style={{color: 'white', cursor: 'pointer'}}/>
      <Drawer className={Styles.drawer} open={isOpen} onClose={toggleDrawer} direction='right'>
        <div className={Styles.menu}>
          <div className={Styles.topmenu}>
            <h1>Menu</h1>
            <CloseIcon className={Styles.closeicon} onClick={toggleDrawer}/>
          </div>
          <div className={Styles.sidebarOption} >
            <PeopleIcon sx={{color:'white'}}/>
            <Link href="https://twitter.com/i/communities/1510106087835332613">
              <a target="_blank" rel="noopener noreferrer" >??????????????????</a>
            </Link>
          </div>
          <div className={Styles.sidebarOption} onClick={handleClose}>
            <MailOutlineIcon sx={{color:'white'}}/>
            <h2>?????????BOX</h2>
          </div>
          <div className={Styles.sidebarOption}>
            <ConstructionIcon sx={{color:'white'}}/>
            <h2>?????????...</h2>
          </div>
        </div>
      </Drawer>
      

      <Dialog open={open} onClose={handleBoxClose}>
        <DialogTitle>?????????BOX</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ????????????Doughnut????????????????????????????????????????????????????????????
            <br/>
            ????????????????????????????????????????????????????????????????????????
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="?????????????????????"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="name"
            label="???????????????"
            fullWidth
            variant="standard"
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBoxClose}>???????????????</Button>
          <Button onClick={handleBoxSubmit}>??????</Button>
        </DialogActions>
      </Dialog>

      {
        success ? <FlashMessage message={'?????????????????????????????????????????????'}/> : ''
      }
    </div>
  )
}

export default DrawerSettings