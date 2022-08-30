import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);



export default function Chart({labels,dataF}) {
    const data = {
        labels,
        datasets: [
          {
            label: '# of Votes',
            data: dataF,
            backgroundColor: [
              '#222881',
              '#DDDDDD',
              '#30475E',
              '#F05454',

            ],
            borderColor: [
                '#222881',
                '#DDDDDD',
                '#30475E',
                '#F05454',
            ]
            ,
            
            borderWidth: 1,
          },
        ],
      };
  return (
    <Pie data={data} />
  )
}
