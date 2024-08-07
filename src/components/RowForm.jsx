import { useState } from 'react'
import { useTaxTableStore } from '../stores/taxTableStore'

export const RowForm = ({ children, index, isEditing, closeEditing }) => {
  const rows = useTaxTableStore(state => state.rows)
  const setRows = useTaxTableStore(state => state.setRows)
  const editRow = useTaxTableStore(state => state.editRow)
  const [name, setName] = useState(index >= 0 ? rows[index].name : '')

  const handleNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    isEditing ? editRow(index, name) : setRows({ name })
    setName('')
    isEditing && closeEditing()
  }

  return (
    <form className='flex gap-2 mt-4' onSubmit={handleSubmit}>
      <input className='px-4 py-2' type='text' value={name} onChange={handleNameChange}/>
      <button type='submit'>
        {children}
      </button>
    </form>
  )
}
