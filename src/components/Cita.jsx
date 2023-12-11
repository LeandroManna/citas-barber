const Cita = ({ cita, setCita, citas, setCitas }) => {
    const { id, name, lastName, date, timeDate, email, phone } = cita

    const handleEdit = () => {

        setCita(cita)
    }
    const handleDelete = () => {
        const sure = confirm('Seguro deseas eliminar esta cita')

        if (sure) {
            const citasFiltradas = citas.filter(c => {
                if (c.id !== id) {
                    return c
                }
            })

            setCitas(citasFiltradas)
            localStorage.setItem('citas', JSON.stringify(citasFiltradas))

        }
    }

    return (

        <details className='w-full bg-slate-100 p-5 rounded shadow even:bg-slate-200'>
            <summary className='text-2xl font-semibold flex justify-between items-center select-none cursor-pointer'>{`Cita Horario: ${new Date(date + 'T' + timeDate).toLocaleDateString('es-Es', {
                hour: 'numeric',
                minute: 'numeric',
            })}hrs`}
                <div className='flex gap-2'>
                    <button onClick={handleEdit}>
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                    <button onClick={handleDelete}>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </summary>
            <div className='p-5'>
                <p className='text-xl font-bold text-slate-800'>Cliente: <span>{name}, {lastName}</span></p>
                <p>Telefono: {phone}</p>
                <p>Correo: {email}</p>
            </div>
        </details>

    )
}


export default Cita