import  { useState } from 'react'
import Styles from './JoinScreen.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles' 
import { Button } from '@mui/material' 
import Twitter from '@mui/icons-material/Twitter' 
import FlashMessage from '../FlashMessage/FlashMessage' 
import { getAuth, signInWithPopup, TwitterAuthProvider } from '@firebase/auth'
import Timer from '../Timer/Timer' 
import { useAuthState } from 'react-firebase-hooks/auth'
import { app, auth, provider, twitterProvider } from '../../config/firebase'
import SignUp from '../MailLogin/MailLogin'

type Props = {
  start: () => void
}

export default function JoinScreen(props: Props) {
  const { start } = props;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
        contrastText: '#fff',
      },
    },
  })

  const [user] = useAuthState(auth)
  const [success, setSuccess] = useState(false)
  const [quizStart, setQuizStart] = useState(false)


  const TwitterLogin = () => {
    const auth = getAuth(app)
    signInWithPopup(auth, twitterProvider).then( async (result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken  
      const secret = credential?.secret 
      const user = result.user 
      setSuccess(true)
    }).catch((error) => {
      const errorCode = error.code 
      const errorMessage = error.message 
      const email = error.email 
      const credential = TwitterAuthProvider.credentialFromError(error) 
    })
    
  }
  return (
    <div className={Styles.joinScreen}>
        <>
          <div className={Styles.timer}>
          <Timer/>
          </div>
          <p className={Styles.description}>8時に問題リセットされます。</p>

          {!user ? 
            <div className={Styles.loginbutton}>
              <Button color="primary" variant="contained" startIcon={<Twitter />}  onClick={TwitterLogin} >
                Twitterで認証
              </Button>
              <SignUp />
              <ThemeProvider theme={theme}>
                <div className={Styles.quizstart}>
                  <Button color="primary" variant="outlined" onClick={start} style={{marginRight:"5px"}}>
                  デイリークイズ
                  </Button>
                  <p>※ログインしないとランキングに登録できません</p>
                </div>
              </ThemeProvider>
            </div> 
            : 
            <div className={Styles.loginedbutton}>
              <ThemeProvider theme={theme}>
                <Button color="primary" variant="outlined" onClick={start}>
                  デイリークイズ
                </Button>
              </ThemeProvider>
            </div>
          }
          {
            success && <FlashMessage message={'ログインに成功しました！'}/>
          }   
        </>      
    </div>
  )
}
