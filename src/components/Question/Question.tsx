import { useEffect, useRef, useState } from 'react'
import {flushSync} from 'react-dom'
import Styles from './Question.module.scss'
import { createTheme, ThemeProvider } from '@mui/material/styles' // eslint-disable-line no-unused-vars
import Button from '@mui/material/Button' // eslint-disable-line no-unused-vars

type Props = {
  question: {
    title: string;
    options: string[];
    correctOptionIndex: string;
  },
  currentQuestionIndex: number,
  setCurrentQuestionIndex: (index: number) => void,
  totalQuestions: number,
  setAnswer: (answer: string | number) => void,
}

function Question(props: Props) {
  const { question, currentQuestionIndex, setCurrentQuestionIndex, totalQuestions, setAnswer } = props
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string | number>("")
  const timer = useRef<any>()
  const progressBar = useRef<any>()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
        contrastText: '#fff',
      },
    },
  })

  

  function gotoNextQuestion() {
    if(timer.current){
      clearTimeout(timer.current)
    }
    flushSync(() => {
      setAnswer(selectedOption)
    })
    setSelectedOption("")
    setIsClicked(false)
    
  }

  useEffect(()=> {
    if (progressBar.current) {
      progressBar.current.classList.remove(Styles.progressBarActive)
      setTimeout(()=> {
        progressBar.current.classList.add(Styles.progressBarActive)
      },0)
      timer.current = setTimeout(gotoNextQuestion, 10*1000)
    }
  },[question])

  const handleClick = (index: string | number) => {
    setIsClicked(true)
    setSelectedOption(index)
  }

  return (
    <div className={Styles.question}>
      <div className={Styles.progressBar} ref={progressBar} />
      <div className={Styles.questionCount}>
        <b> {currentQuestionIndex} </b>
        of
        <b> {totalQuestions} </b>
      </div>
      <div className={Styles.main}>
        <div className={Styles.title}>
          <span>Question:</span>
          <div className={Styles.container}>
            <p>{ question.title }</p>
            <ThemeProvider theme={theme}>
              <Button color="primary" variant="outlined" onClick={gotoNextQuestion}>
                SKIP
              </Button>
            </ThemeProvider>
          </div>
        </div>
        
        <div className={Styles.options}>
          {
            question.options.map((option, index) => {
              return (
                <div
                  className={`${Styles.option} ${String(index) === selectedOption ? Styles.active : ''}`}
                  key={index}
                  onClick={()=>handleClick(index)}
                >
                  {option}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={Styles.control}>
      <ThemeProvider theme={theme}>
        <Button 
          disabled={!isClicked}
          color="primary" 
          variant="outlined" 
          onClick={gotoNextQuestion}
          style={{width:'100%', padding:'10px',margin:'0px 20px'}}
        >
          Next(次のクイズへ)
        </Button>
      </ThemeProvider>
      </div>
    </div>
  )
}

export default Question