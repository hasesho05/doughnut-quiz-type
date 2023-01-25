import Styles from './QuizScreen.module.scss'
import { useState } from 'react'
import QuizResult from '../QuizResult/QuizResult' 
import Question from '../Question/Question' 
import { auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { questions } from '../../data/question1'

var now = new Date()
var Datetime = now.getDate()

const quizSet = () => {
  if(Datetime < 23) {
    return Datetime
  } else {
    var min = 0
    var max = 22
    var a = Math.floor( Math.random() * (max + 1 - min) ) + min
    return a
  }
}

type Props = {
  retry: () => void
}

function QuizScreen(props: Props) {
  const { retry } = props
  const QuestionList = questions[quizSet()]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [markedAnswers, setMarkedAnswers] = useState(new Array(QuestionList.length))
  const isQuestionEnd = currentQuestionIndex === QuestionList.length
  const countCorrect: string[] = []
  const [user] = useAuthState(auth)


  function calculateResult(){
    let correct = 0
    QuestionList.forEach((question, index)=>{
      if(question.correctOptionIndex == markedAnswers[index]){
        correct++
        countCorrect.push('○')
      } else {
        countCorrect.push('×')
      }
    })
    return {
      total: QuestionList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
      countCorrect: countCorrect
    }
  }



  

  return (
    <div className={Styles.quizScreen}>
      {
        isQuestionEnd ? (
          <QuizResult
            result={calculateResult()}
            retry={retry}
            questions={QuestionList}
          />
        ) : (
          <Question
            question={QuestionList[currentQuestionIndex]}
            totalQuestions={QuestionList.length}
            currentQuestionIndex={currentQuestionIndex+1}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setAnswer={(index: any)=>{
              setMarkedAnswers((arr)=>{
                let newArr = [...arr]
                newArr[currentQuestionIndex] = index
                return newArr
              })
              setCurrentQuestionIndex(currentQuestionIndex+1)
            }}
          />
        )
      }
    </div>
  )
}

export default QuizScreen