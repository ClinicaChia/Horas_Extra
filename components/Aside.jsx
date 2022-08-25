import React from 'react'
import axios from 'axios'

const RecalculteTime = (time,fechaI) => {

  const H1 = fechaI.getHours()
  const d1 = fechaI.getDay()

  let tf = time

  if(d1 > 0){
    tf = H1 >= 21 || H1 < 6 ? tf*1.75 : tf*1.25;
  }
  else{
    tf = H1 >= 21 || H1 < 6 ? tf*2.5 : tf*2;
  }

  return tf

}

export default function Aside({nombres,data,setData}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        console.log(e.target.persona.value)
        
        const t1 = new Date(e.target.fechaInicial.value)
        const t2 = new Date(e.target.fechaFinal.value)
        console.log(e.target.fechaInicial.value)
        console.log(e.target.fechaFinal.value)
        let  tf = (t2.getTime() - t1.getTime()) / (1000 * 60 * 60)
        tf = RecalculteTime(tf,t1)
        const dataToSend = {
            nombre: e.target.persona.value,
            horas: Math.round(tf),
            fechaInicial: e.target.fechaInicial.value,
            fechaFinal: e.target.fechaFinal.value,
            concepto: e.target.concepto.value,
        }

        const url = '/api/save'

        axios.post(url, dataToSend)
        .then(res => {
          alert('Dato Guardado con Exito 👌')
          const temp = data.map(item => {
            if(item.nombre == dataToSend.nombre){
                item.total += dataToSend.horas
                item.registro.push(dataToSend)
                return item
            }else{
                return item
            }
          })
          setData(temp)
          
        })
        .catch(err => {
          alert('uy algo salio mal 😱😢')
        })

        console.log(dataToSend)
      }
  return (
    <form className='main-aside' onSubmit={handleSubmit} >

          <select className='selector' name="persona">
            {nombres.map((nombre, index) => {return(<option value={nombre} key={index}>{nombre}</option>)})}
          </select>

          <article className='fechas'>
            <h4 className='titulo'>Fecha Inicial: </h4>
            <input type='datetime-local' name='fechaInicial' />
          </article>

          <article className='fechas'>
            <h4 className='titulo' >Fecha Final: </h4>
            <input type='datetime-local' name='fechaFinal' />
          </article>


          <article className='fechas'>
            <h4 className='titulo' >Concepto: </h4>
            <textarea placeholder='mi jefito me hizo tabajar mas...' className='concepto' name="concepto" cols="20" rows="10"></textarea>
          </article>

          <button  className='send' type='submit'>Agregar Extras</button>

        </form>
  )
}
