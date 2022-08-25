import React,{useState} from 'react'
import axios from 'axios'
export default function Tabla({data,Actual,setData}) {
    const [num, setNum] = useState(0)
    const Data_Table = data.filter(item => item.nombre == Actual)[0].registro

    const HandleChange = (e) => {
        setNum(e.target.value)
    }

    const HandleClick = (e) => {
        axios.post('/api/modify', {Actual,num})
        .then(res => {
            alert('Dato Modificado con Exito 👌')
            const temp = data.map(item => {
                if(item.nombre == Actual){
                    const re = item.total-num;
                    item.total = re < 0 ? 0 : re
                    return item
                }else{
                    return item
                }
            })
            setData(temp)
        })
        .catch(err => {alert('uy algo salio mal 😱😢')})
    }
  return (
    <div className='summary'>

        <h2>{`${Actual} tiene ${data[0].total} de horas libres`}</h2>

        <section className='restar'>
            <input type='number' value={num} onChange={HandleChange} placeholder='horas a restar' />
            <button onClick={HandleClick}>Restar</button>
        </section>

        <table>
            <thead>
                <tr>
                    <th>Hora Inicial</th>
                    <th>Hora Final</th>
                    <th>Concepto</th>
                    <th>Total Horas</th>
                </tr>
            </thead>
            <tbody>
                {Data_Table.map((item, index) => {return(<tr key={index}>
                    <td>{item.fechaInicial}</td>
                    <td>{item.fechaFinal}</td>
                    <td>{item.concepto}</td>
                    <td>{item.horas}</td>
                </tr>)})}
            </tbody>
        </table>
        

    </div>
  )
}
