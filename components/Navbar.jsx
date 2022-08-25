import React from 'react'

export default function navbar({nombres,Actual,HandleClick}) {
  return (
    <section className='main-nav'>
        <ul className='main-nav-list'>
         
          {nombres.map((nombre, index) => {return(
          
          <li  className={`main-nav-item ${ Actual==nombre?'active':'' }`}  key={index}> <a onClick={HandleClick} >{nombre}</a> </li>
          
          )})}
        </ul>
      </section>
  )
}
