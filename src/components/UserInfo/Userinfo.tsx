import { VerifiedUser } from '@mui/icons-material' // eslint-disable-line no-unused-vars
import { Avatar, Box, Typography } from '@mui/material' // eslint-disable-line no-unused-vars
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import Styles from './UserInfo.module.scss'

type Props = {
  displayName: string,
  avatar: string,
  score: number,
  index: number,
}

const UserInfo = (props: Props ) => {
    const { displayName, avatar, score, index } = props
    const [user] = useAuthState(auth)
    return (
      <Box>
      {user ? (
        <Box className={`${Styles.user} ${user.displayName === displayName ? Styles.active : ''}`} >
          <Box className={Styles.userAvatar}>
            <Avatar src={avatar}/>
          </Box>
          <Box className={Styles.userBody}>
            <Box className={Styles.userHeader}>
              <Box className={Styles.userHeaderText}>
                <Typography variant='h3'>{displayName}
                {avatar ? 
                  <Box className={Styles.userHeaderSpecial}>
                    <VerifiedUser className={Styles.userBadge} />
                  </Box> : <></>}
                </Typography>
              </Box>
              <Box className={Styles.userHeaderDescription}>
                <Typography variant='h4'>Score：{score} </Typography>
                <Typography fontWeight={2}>{index}位</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={Styles.user} >
          <Box className={Styles.userAvatar}>
            <Avatar src={avatar}/>
          </Box>
          <Box className={Styles.userBody}>
            <Box className={Styles.userHeader}>
              <Box className={Styles.userHeaderText}>
                <Typography variant='h3'>{displayName}
                {avatar ? 
                <Box className={Styles.userHeaderSpecial}>
                  <VerifiedUser className={Styles.userBadge} />
                </Box> : <></>}
                </Typography>
              </Box>
              <Box className={Styles.userHeaderDescription}>
                <Typography variant='h4'>Score：{score} </Typography>
                <Typography fontWeight={2}>{index}位</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      </Box>
    )
  }


export default UserInfo