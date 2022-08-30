import React,{useState} from 'react'
import axios from 'axios'
import Chart from '../components/Chart'

const Filtros = ['H.E.D','H.E.N','H.E.D.F','H.E.N.F']

export default function Tabla({data,Actual,setData,dataForm,setForm,Index, setIndex}) {
    const [Reponer, setReponer] = useState({
        horas: 0,
        tipo: Filtros[0],
        excusa: ""
    })
    const Data_Table = data.filter(item => item.nombre == Actual)[0].registro

    const dataFill = Filtros.map( (val,index) => {
        let acc = 0;
        let fill = Data_Table.filter( datos => datos.Tipo_Hora == val )
        if(fill.length > 0){
            fill.forEach(el => {
                acc += el.total 
            });
        }
        return acc
        
    } )


    const HandleChange = (e) => {
        setReponer({...Reponer,[e.target.name]:e.target.value})
    }
   
    const onDelete = (e) => {

        const index = parseInt(e.target.value);
        Data_Table = Data_Table.filter( (_,i) => i!=index );

        axios.put("/api/delete",{nombre:Actual,data:Data_Table})
        .then( (res) =>{
            setData(res.data.data)
        } )
        
    }

    const onEdit = (e) => {
        const index = parseInt(e.target.value);
        const temp = Data_Table[index]

        const fecha = temp.fecha.split("/")
        const HoraI = temp.Hora_Inicial.split(":")
        const HoraF = temp.Hora_Final.split(":")

        console.log(fecha)

        
        setForm({...dataForm,
            
                persona: Actual,
                dia: fecha[0],
                mes: fecha[1],
                year: fecha[2],
                Hi: HoraI[0],
                Mi: HoraI[1],
                Hf: HoraF[0],
                Mf: HoraF[1],
                concepto : temp.concepto
            
        })

        setIndex(index);
    }

    const HandleClick = (e) => {
        
        e.preventDefault()
        const Data = {}
        let temp = new Date()
        Data.nombre = Actual
        Data.fecha = String(temp.getDate())+ "/"+ String(temp.getMonth()+1) + "/" + String(temp.getFullYear())
        Data.Hora_Inicial = "0"
        Data.Hora_Final = String(Reponer["horas"])
        Data.Tipo_Hora = String(Reponer["tipo"])
        Data.concepto = String(Reponer["excusa"])
        Data.total = -parseInt(Reponer["horas"])


        axios.post("/api/save",{Data,Index})
        .then( (res) =>{alert("Se registro el cobro de las horas, para evitiar cargo de conciencia, debe gastar helado al area 🍦")})
        .catch( (err) =>{alert("Ocurrio un error, digale a alfanumerico que lo solucione 👨‍💻")} )

    }
  return (
    <div className='summary'>

       
       <section className='summary-chart'>
            
            <article className='chart-container'>
                <Chart labels={Filtros} dataF={dataFill} />
            </article>
            
            <article className='summary-words'>

                {Filtros.map( (val,index) => {
                    return <p className='label-summary'>{val}: <span className='span-summary'>{dataFill[index]}</span></p>
                } )}


            </article>

       </section>

       <section className='restar'>
            <input type='number' name='horas' value={Reponer["horas"]} onChange={HandleChange} placeholder='horas a restar' />
            <select value={Reponer["tipo"]}  name='tipo' onChange={HandleChange} className='selector xs'>
                {Filtros.map( (val,index)=>{
                    return <option key={index} value={val}>{val}</option>
                })}
            </select>
            <textarea  onChange={HandleChange} name="excusa"  value={Reponer["excusa"]} placeholder='me fui a mimir...' className='concepto c-xs'  cols="20" rows="3"></textarea>

            <button onClick={HandleClick}>Restar</button>
        </section>


        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora Inicial</th>
                    <th>Hora Final</th>
                    <th>Tipo de Hora</th>
                    <th>Concepto</th>
                    <th>Tiempo Total</th>
                    <th>Acciones</th>

                </tr>
            </thead>
            <tbody>
                {Data_Table.map((item, index) => {return(<tr key={index}>
                    <td>{item.fecha}</td>
                    <td>{item.Hora_Inicial}</td>
                    <td>{item.Hora_Final}</td>
                    <td>{item.Tipo_Hora}</td>
                    <td>{item.concepto}</td>
                    <td>{item.total}</td>
                    <td className='actions'>
                        <button value={index} onClick={onDelete} className='del'>Eliminar</button>
                        <button className='edit' value={index} onClick={onEdit} >Editar</button>
                    </td>
                </tr>)})}
            </tbody>
        </table>
        
        

    </div>
  )
}
