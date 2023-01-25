import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close' 
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { db } from '../../config/firebase'
import Userinfo from '../UserInfo/Userinfo' 
import Styles from './Ranking.module.scss'
import AddchartIcon from '@mui/icons-material/Addchart' 
import { Button, Modal, Typography } from '@mui/material' 
import { Box } from '@mui/system' 

type User = {
  displayName: string,
  score: number,
  photoURL: string,
}

const style = {
  margin: 0,
  padding: 0,
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: 600,
  bgcolor: '#1a1a1a;',
  border: '1px solid #3a3a3c',
  boxShadow: 24,
  p: 2,
}

export default function Ranking() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [users, setUsers] = useState<any>()
  const [todayUsers, setTodayUsers] = useState<any>()
  const [toggleState, setToggleState] = useState(1);


  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  useEffect(() => {
    const todayData = collection(db, 'users')
    const userData = collection(db, 'togemaru')
    const t = query(todayData, orderBy('score', 'desc'))
    const u = query(userData, orderBy('score', 'desc'))

    onSnapshot(u, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => doc.data()))
  })
    onSnapshot(t, (querySnapshot) => {
    setTodayUsers(querySnapshot.docs.map((doc) => doc.data()))
  })
  }, [open])


  return (
    <Box className={Styles.ranking}>
      <AddchartIcon onClick={handleOpen} style={{cursor:'pointer', color:'white'}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box className={Styles.title}>
            <Typography>ユーザーランキング</Typography>
            <CloseIcon onClick={handleClose} className={Styles.icon}/>
          </Box>
    
      <Box className={Styles.blocTabs}>
        <Button
          className={`${Styles.tabs} ${toggleState === 1 ? Styles.activeTabs : ''}`}
          onClick={() => toggleTab(1)}
        >
          デイリー
        </Button>
        <Button
          className={`${Styles.tabs} ${toggleState === 2 ? Styles.activeTabs : ''}`}
          onClick={() => toggleTab(2)}
        >
          累計
        </Button>
      </Box>

      <Box className={Styles.contentTabs}>
        <Box
          className={`${Styles.content} ${toggleState === 1 ? Styles.activeContent : ''}`}
        >
            {todayUsers.map((user: User, index: number) => (
              <Userinfo
                key={user.photoURL}
                displayName={user.displayName}
                score={user.score}
                avatar={user.photoURL}
                index={index+1}
              />
            ))}
        </Box>

        <Box
          className={`${Styles.content} ${toggleState === 2 ? Styles.activeContent : ''}`}
        >
            {users.map((user: User, index: number) => (
              <Userinfo
                key={user.displayName}
                displayName={user.displayName}
                score={user.score}
                avatar={user.photoURL}
                index={index+1}
              />
            ))}
        </Box>
      </Box>
        </Box>
      </Modal>
    </Box>
  )
}

