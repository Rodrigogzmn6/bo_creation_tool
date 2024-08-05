import { useRef } from 'react'
import { AddIcon } from '../constants/icons'
import { useColumn } from '../hooks/useColumn'

export const Columns = () => {
  const columnNameRef = useRef()
  const columnTypeRef = useRef()
  const { columns, setColumns, columnTypes } = useColumn()

  const handleAddColumn = (event) => {
    event.preventDefault()
    if (columnTypeRef.current.value !== '') {
      setColumns({
        name: columnNameRef.current.value,
        type: columnTypeRef.current.value
      })
      columnNameRef.current.value = ''
      columnTypeRef.current.value = ''
    }
  }
  return (
    <div>
      {columns.map((column, index) => (
        <p key={index}>{index + 1}. {column.name}</p>
      ))}
      <form className='flex gap-2 mt-4' onSubmit={handleAddColumn}>
        <div className='flex flex-col gap-1 max-h-screen'>
          <input className='px-4 py-2' type='text' ref={columnNameRef}/>
          <select className='px-4 py-2' ref={columnTypeRef}>
            <option value=''>Select one option</option>
            {columnTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>
          <AddIcon />
        </button>
      </form>
    </div>
  )
}
