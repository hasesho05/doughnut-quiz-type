import { useState } from 'react'
import Styles from '../styles/Home.module.scss'
import HeadInfo from '../components/Head/Head'
import Navbar from '../components/Navbar/Navbar'
import QuizScreen from '../components/QuizScreen/QuizScreen'
import JoinScreen from '../components/JoinScreen/JoinScreen'
import { Box } from '@mui/material'


export default function Home() {
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  return (
    <>
      <HeadInfo />
      <Navbar />
      <Box className={Styles.quizContainer}>
        {
          isQuizStarted ? (
            <QuizScreen retry={()=>setIsQuizStarted(false)}/>
          ) : (
            <JoinScreen start={()=>setIsQuizStarted(true)}/>
          )
        }
      </Box>
    </>
  )
}
