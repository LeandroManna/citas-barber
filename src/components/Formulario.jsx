import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Form from './form/Form'
import Field from './form/Field'
const Formulario = ({ cita, setCita, citas, setCitas }) => {
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [date, setDate] = useState('')
    const [timeDate, setTimeDate] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0])

    useEffect(() => {
        if (Object.keys(cita).length > 0) {
            setId(cita.id)
            setName(cita.name)
            setLastName(cita.lastName)
            setDate(cita.date)
            setTimeDate(cita.timeDate)
            setEmail(cita.email)
            setPhone(cita.phone)
        }
    }, [cita])

    const clean = () => {
        setName('')
        setLastName('')
        setDate('')
        setTimeDate('')
        setPhone('')
        setEmail('')
    }
    const handleCreate = (e) => {


        if ([name, lastName, date, email, phone].includes("")) {
            toast.error('Todos los campos son obligatorios',/* {
                hideProgressBar: true,
                autoClose: 1500,
                closeButton: false

            }*/)
            return
        }

        if (phone.length !== 10) {
            toast.error('El Telefono no es válido')
            return
        }

        const pattern = /([a-zA-Z0-9\_\.\-\$]){3,20}@([a-zA-Z]){3,20}\.[a-zA-Z]+(\.[a-z])*?/s

        if (!email.match(pattern)) {
            toast.error('El Email no es válido!')
            return
        }



        const fechaCita = new Date(date)

        // console.log(fechaCita)
        const actual = new Date() // Fecha Actual


        // Año de la fecha
        // console.log(fechaCita.getMonth())   // Mes
        // console.log(fechaCita.getDay())      // Día
        // console.log(fechaCita.getHours())       // Horas
        // console.log(fechaCita.getMinutes())     // Minutos


        // if (fechaCita.getFullYear() < yearActual) {
        //     toast.warning('El año de la cita no es válido')
        //     return

        // }

        // if (fechaCita.getMonth() < mesActual) {
        //     toast.warning('El mes no puede ser anterior al actual')
        //     return
        // }

        // if ((fechaCita.getDay() >= diaActual) || fechaCita.getDay === 0) {
        //     toast.warning('El día no es válido')

        //     return
        // }

        if (fechaCita < actual) {
            toast.warning('La fecha no es válida')
            return
        }

        const [hora] = timeDate.split(":")

        if (hora > 16 || hora < 8) {
            toast.warning('En ese horario no esta abierto')
            return
        }


        const randomId = (Math.random() + Date.now()).toString(36)
        // randomId

        const nuevaCita = {
            id: randomId,
            name,
            lastName,
            date,
            timeDate,
            email,
            phone
        }
        clean()
        const citasUpdated = [...citas, nuevaCita]
        citasUpdated.sort((a, b) => {
            const ca = new Date(a.date)
            const cb = new Date(b.date)
            if (ca > cb) return 1
            else if (ca < cb) return -1
            else return 0
        })
        setCitas(citasUpdated)
        localStorage.setItem('citas', JSON.stringify(citasUpdated))
        toast.success('Cita Creada')
        // sessionStorage cuando se cierra el navegador los datos se borran
    }

    const handleUpdate = (e) => {
        console.log('actualizando')

        const citasUpdated = citas.map(c => {
            if (c.id === id) {
                return {
                    ...c,
                    name,
                    lastName,
                    date,
                    timeDate,
                    email,
                    phone

                }
            } else {
                return c
            }

        })
        clean()
        setCitas(citasUpdated)
        setId('')
        localStorage.setItem('citas', JSON.stringify(citasUpdated))
        toast.success("Cita Actualizada")

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!id) {
            handleCreate()
        } else {
            handleUpdate()
        }

    }

    const handleCancel = (e) => {
        e.preventDefault()

        setCita({})

        clean()
        setId('')
        // console.log('cancelando')
    }
    return (
        <Form title={id ? "Actualizar Cita" : 'Nueva Cita'} onSubmit={handleSubmit} className="sticky top-10">
            <Field name='Nombre' type='text' value={name} onChange={e => setName(e.target.value)} placeholder="Nombre del cliente" />
            <Field name="Apellido" type='text' value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Apellido del cliente" />
            <Field name="Fecha" type="date" value={date} onChange={e => setDate(e.target.value)} min={`${minDate}`} />
            <Field name="Hora" type="time" value={timeDate} onChange={e => setTimeDate(e.target.value)} min="08:00:00" max={`17:00:00`} step={30 * 60} />
            <Field name='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email del cliente" />
            <Field name='Telefono' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} min='0' placeholder='Telefono del cliente' />
            <input type='submit' value={id ? "Actualizar" : "Agregar"} className='cursor-pointer p-2 text-center bg-slate-900 font-bold uppercase text-white rounded shadow' />
            {id && <button onClick={handleCancel}>Cancel</button>}
        </Form>
    )

}


export default Formulario 