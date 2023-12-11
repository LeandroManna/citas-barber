const Form = ({ children, title, onSubmit, className }) => {


    // <Form> <p>Esto es un children</p> </Form>
    return (
        <div className={`bg-slate-50/75 backdrop-blur p-5 rounded shadow-xl ${className}`} >
            <h2 className="text-3xl font-bold">{title}</h2>
            <form
                className='p-5 flex flex-col w-full gap-5'
                onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

export default Form


// APP  - > Formulario - > Form