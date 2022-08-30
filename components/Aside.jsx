import React from 'react'
import axios from 'axios'

const RecalculteTime = (fecha,H) => {

  const fechaI = new Date(
    parseInt(fecha.year),
    parseInt(fecha.mes)-1,
    parseInt(fecha.dia),
  )

  const H1 = parseInt(H)
  const d1 = fechaI.getDay()

  let tf = "";

  console.log(!fecha.festivo)

  if(d1 > 0 && !fecha.festivo){
    tf = H1 >= 21 || H1 < 6 ? "H.E.N" : "H.E.D";
  }
  else{
    tf = H1 >= 21 || H1 < 6 ? "H.E.N.F" : "H.E.D.F";
  }

  return tf

}

const sentencia = (Range=[],isNum=false,val,campo)=>{

  if(isNum){
    const temp = parseInt(val);
    if(temp >= Range[0] && temp <= Range[1]){
      return 1;
    }
    else{
      alert(`El valor del ${campo} debe estar entre ${Range[0]}-${Range[1]}`)
      return 0;
    }
  }
  else{
    if(val.length > 15){
      return 1;
    }
    else{
      alert("El Concepto, debe tener por lo menos 15 carcteres")
    }
  }

}

const Validar = (data) => {
  let temp = 0;
  let tempD = new Date();
  temp += sentencia([1,31],true,data.dia,"dia")
  temp += sentencia([1,12],true,data.mes,"mes")
  temp += sentencia([2020,tempD.getFullYear()],true,data.year,"año")
  temp += sentencia([0,24],true,data.Hi,"Hora Inicial")
  temp += sentencia([0,60],true,data.Mi,"Minutos Iniciales")
  temp += sentencia([0,24],true,data.Hf,"Hora Final")
  temp += sentencia([0,60],true,data.Mf,"Minutos Finales")
  temp += sentencia([0,24],false,data.concepto,"Hora Inicial")


  if(temp == 8){
    return true
  }
  
  return

}

const GetTime = (data) => {
  const t1 = Math.round( parseInt(data.Hi) + parseInt(data.Mi)/60 )
  const t2 = Math.round( parseInt(data.Hf) + parseInt(data.Mf)/60 )

  return Math.abs(t2 - t1)
}

const ConfigJson = (data,Index,setIndex,setData) =>{
  const Data = {}
  Data.nombre = data.persona
  Data.fecha = data.dia + "/" + data.mes + "/" + data.year
  Data.Hora_Inicial = data.Hi + ":" + data.Mf
  Data.Hora_Final = data.Hf + ":" + data.Mf
  Data.Tipo_Hora =  RecalculteTime( data , data.Hi )
  Data.concepto = data.concepto
  Data.total = GetTime(data)
  
  axios.post("/api/save",{Data,Index})
  .then((res)=>{alert("Hora extra guardada exitosamente 😁")
                console.log(res.data)
                setData(res.data.query)

})
  .catch( (err)=> {alert("Ha ocurrido un error alfanumerico ☠️");console.log(err)})
  
  setIndex(-1)

}

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

              <input className='fecha_item' name='dia' value={Form["dia"]} onChange={ handleChange} />
              <p className='item-div'>/</p>
              <input className='fecha_item' name='mes' value={Form["mes"]} onChange={ handleChange} />
              <p className='item-div'>/</p>
              <input className='fecha_item l' name='year' value={Form["year"]} onChange={ handleChange} />
              

            </section>
            
          </article>

          <article className='fechas'>
            <h4 className='titulo' >Horas[24H]</h4>

             <section className='campo-data'>

              <input className='fecha_item' name='Hi' placeholder='00' value={Form["Hi"]} onChange={ handleChange} />
              <p className='item-div'>:</p>
              <input className='fecha_item' name='Mi' placeholder='00' value={Form["Mi"]} onChange={ handleChange} />
              <p className='item-div'>-</p>
              <input className='fecha_item' name='Hf' placeholder='00' value={Form["Hf"]} onChange={ handleChange} />
              <p className='item-div'>:</p>
              <input className='fecha_item' name='Mf' placeholder='00' value={Form["Mf"]} onChange={ handleChange} />
              

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
