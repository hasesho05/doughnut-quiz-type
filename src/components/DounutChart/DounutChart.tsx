import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2' 


ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  result: {
    total: number,
    correct: number,
  }
}

function DounutChart( props: Props ) {
  const { result } = props
  const incorrect = result.total - result.correct
  const correct = result.correct

  const data = {
    datasets: [{
      data: [correct,incorrect],
      backgroundColor: [
        '#d0f0d0',
        'rgba(0,0,0,0)',

      ],
      borderColor: [
        'limegreen',
        'limegreen',
      ],
      borderWidth: 1,
      responsive: false,
    }]
  }

 

  return (
    <div style={{ width: '200px', margin: '0 auto' }}>
      <Doughnut data={data} />
    </div>
  )
}

export default DounutChart