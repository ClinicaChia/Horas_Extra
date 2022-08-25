import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Aside from '../components/Aside'
import Null from '../components/Null'
import Tabla from '../components/Tabla'


export default function Home({nombres,data}) {

  const [Actual, setActual] = useState('')
  const [Data_Table, setData_Table] = useState(data)


  const HandleClick = (e) => {
    setActual(e.target.innerText)
  }

  return (
    <div className='main-container'>
      
      <h1 className='main-header titulo'>Horas Extra Area Sistemas</h1>

      
      <Navbar nombres={nombres} Actual={Actual} HandleClick={HandleClick}/>

      <Aside nombres={nombres} data={Data_Table} setData={setData_Table} />

      
      <section className='main-main'>

       {Actual ==''? <Null /> : <Tabla data={Data_Table} Actual={Actual} setData={setData_Table} />}

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
