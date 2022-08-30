import React from 'react'
import axios from 'axios'
import { RecalculteTime,sentencia,Validar,GetTime,ConfigJson } from '../controllers/Aside.controller'


export default function Aside({nombres,data,setData,setForm,Form,Index, setIndex}) {



    const handleSubmit = (e) => {
      e.preventDefault()

      const ValidateData = Validar(Form)

      if(ValidateData){
        const Data_To_Send = ConfigJson(Form,Index,setIndex,setData);
      }
      }


    const handleChange = (e) => {
      e.target.name=="festivo"?setForm({...Form,[e.target.name]:e.target.checked}) : setForm({...Form,[e.target.name]:e.target.value})
      
    }
  return (
    <form className='main-aside' onSubmit={handleSubmit}  >

          <select className='selector' value={Form["persona"]}  onChange={ handleChange} name="persona">
            {nombres.map((nombre, index) => {return(<option value={nombre} key={index}>{nombre}</option>)})}
          </select>

          <article className='fechas'>
            <h4 className='titulo'>Fecha: </h4>
            <section className='campo-data'>

              <input className='fecha_item' autoComplete="off" name='dia' value={Form["dia"]} onChange={ handleChange} />
              <p className='item-div'>/</p>
              <input className='fecha_item' name='mes' autoComplete="off" value={Form["mes"]} onChange={ handleChange} />
              <p className='item-div'>/</p>
              <input className='fecha_item l' name='year' autoComplete="off" value={Form["year"]} onChange={ handleChange} />
              

            </section>
            
          </article>

          <article className='fechas'>
            <h4 className='titulo' >Horas[24H]</h4>

             <section className='campo-data'>

              <input className='fecha_item' name='Hi' placeholder='00' autoComplete="off" value={Form["Hi"]} onChange={ handleChange} />
              <p className='item-div'>:</p>
              <input className='fecha_item' name='Mi' placeholder='00' value={Form["Mi"]} autoComplete="off" onChange={ handleChange} />
              <p className='item-div'>-</p>
              <input className='fecha_item' name='Hf' placeholder='00' value={Form["Hf"]} autoComplete="off" onChange={ handleChange} />
              <p className='item-div'>:</p>
              <input className='fecha_item' name='Mf' placeholder='00' value={Form["Mf"]} autoComplete="off" onChange={ handleChange} />
              

            </section>

            
          </article>

          <article className='fechas'  >
              <label className='festivo'  >
                <input type="checkbox" name="festivo" checked={Form["festivo"]} onChange={ handleChange} /> Es un festivo
              </label>
          </article>


          <article className='fechas'>
            <h4 className='titulo' >Concepto: </h4>
            <textarea placeholder='mi jefito me hizo tabajar mas...' className='concepto' name="concepto" cols="20" rows="10" value={Form["concepto"]} onChange={ handleChange}></textarea>
          </article>

          <button  className='send' type='submit'>Agregar Extras</button>

        </form>
  )
}
