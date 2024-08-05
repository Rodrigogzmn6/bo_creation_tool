import { useRef } from 'react'
import { AddIcon } from '../constants/icons'
import { useRow } from '../hooks/useRow'

export const Rows = () => {
  const rowNameRef = useRef()
  const { rows, setRows } = useRow()

  const handleAddRow = (event) => {
    event.preventDefault()
    setRows({ name: rowNameRef.current.value })
    rowNameRef.current.value = ''
  }

  return (
    <div className='flex gap-5'>
      <h2>Rows:</h2>
      <div>
        {rows.map((row, index) => (
          <p key={index}>{index + 1}. {row.name}</p>
        ))}
        <form className='flex gap-2 mt-4' onSubmit={handleAddRow}>
          <input className='px-4 py-2' type='text' ref={rowNameRef}/>
          <button type='submit'>
            <AddIcon />
          </button>
        </form>
      </div>
    </div>
  )
}
