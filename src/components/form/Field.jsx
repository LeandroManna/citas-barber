import { useState, useEffect } from 'react'

const Field = ({
  type = 'text',
  value,
  name,
  onChange,
  placeholder = '',
  min = "",
  max = '',
  step = ''
}) => {
  const [icon, setIcon] = useState('draw')
  useEffect(() => {
    if (type === 'number') {
      setIcon('call')
    } else if (type === 'email') {
      setIcon('mail')
    } else if (type === 'datetime-local') {
      setIcon('schedule')
    }
  })

  /**
   *
   * props = {
   *  children,
   *
   * }
   *
   *
   */

  /**
   * Eventos de ReactJs
   *
   * onChange = cuando cambia algo
   * onBlur = cuando se sale del componente
   * onSubmit = para los formularios cuando se envian
   * onClick = Cuando se hace click sobre el componente
   */

  //** SIN TYPE SUBMIT o RADIO */
  return (
    <div className='flex flex-col w-full gap-1'>
      <label className='font-medium text-slate-600' htmlFor={name}>
        {name}
      </label>
      <div className='flex items-center bg-slate-100 rounded gap-2 shadow border-[1px] border-slate-300'>
        <span className='material-symbols-outlined border-r-[1px] p-2 border-r-slate-300'>
          {icon}
        </span>
        <input
          className='bg-inherit flex-1 h-full outline-none p-2 rounded'
          type={`${type}`}
          value={value}
          name={`${name}`}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          min={`${min}`}
          max={`${max}`}
          step={step}
        />
      </div>
    </div>
  )
}

export default Field
