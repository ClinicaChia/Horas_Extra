import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect,useRef } from 'react'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import Null from '../components/Null'
import Tabla from '../components/Tabla'


export default function Home({nombres,data}) {

  const [Actual, setActual] = useState('')
  const [Data_Table, setData_Table] = useState(data)
  const [Form,setForm] = useState({
    persona: nombres[0],
    dia:"",
    mes:"",
    year:"",
    Hi:"",
    Hf:"",
    Mi:"",
    Mf:"",
    festivo:false,
    concepto: ""

  })
  const [Index, setIndex] = useState(-1);
  const ref = useRef(null);


  const prueba =(e) =>{
    console.log(Form)
  }
  const HandleClick = (e) => {
    setActual(e.target.innerText)
  }

  return (
    <div className='main-container'>
      
      <h1 className='main-header titulo'>Horas Extra Area Sistemas</h1>

      
      <Navbar nombres={nombres}   Actual={Actual} HandleClick={HandleClick}/>

      <Aside nombres={nombres} Index={Index} setIndex={setIndex} Form={Form} setForm={setForm}  data={Data_Table} setData={setData_Table} />

      
      <section className='main-main'>

       {Actual ==''? <Null /> : <Tabla data={Data_Table} Actual={Actual} Index={Index} setIndex={setIndex}  setData={setData_Table} dataForm={Form} setForm={setForm} />}

      </section>

     
      
      
    </div>
  )
}

export async function getServerSideProps() {
  

  const url = process.env.HOST+'/api/load'
  const res = await axios.get(url)
  const { nombres, data } = res.data
  return {props:{nombres, data}}
}
