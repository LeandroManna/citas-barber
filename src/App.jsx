import Formulario from './components/Formulario'
import Cita from "./components/Cita"
import { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify"
import { MagicMotion } from "react-magic-motion"
import 'react-toastify/dist/ReactToastify.css'
function App () {

  const [cita, setCita] = useState({}) // se va a utilizar para actualizar el objeto
  const [citas, setCitas] = useState([])

  useEffect(() => {
    const citasStorage = JSON.parse(localStorage.getItem('citas')) ?? []
    setCitas(citasStorage)
  }, [])

  return (
    <MagicMotion>
      <div>
        <h1 className="text-6xl font-bold text-center">The Barber One</h1>
        <p className='text-center font-bold text-slate-700'>Citas: <span>{citas.length}</span></p>
      </div>
      <main className="max-w-[95%] w-[80rem] mx-auto grid lg:grid-cols-2 gap-8 my-10 relative">
        <section className='w-full sticky'>
          <Formulario cita={cita} setCita={setCita} citas={citas} setCitas={setCitas} />
        </section>
        <section className="w-full flex flex-col gap-3">
          {citas.map(c => {
            return <Cita key={c.id} cita={c} setCita={setCita} citas={citas} setCitas={setCitas} />
          })}
        </section>
      </main>
      <ToastContainer hideProgressBar={true} closeButton={false} autoClose={1500} />
    </MagicMotion>
  )
}

export default App
