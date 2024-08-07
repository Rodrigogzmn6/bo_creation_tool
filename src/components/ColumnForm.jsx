import { useState } from 'react'
import { useTaxTableStore } from '../stores/taxTableStore'

export const ColumnForm = ({ children, index, isEditing, closeEditing }) => {
  const { columns, setColumns, columnTypes, editColumn } = useTaxTableStore()
  const [name, setName] = useState(index >= 0 ? columns[index].name : '')
  const [type, setType] = useState(index >= 0 ? columns[index].type : '')

  const handleNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleTypeChange = (e) => {
    e.preventDefault()
    setType(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isEditing) {
      if (type !== '') {
        editColumn(index, name, type)
      }
    } else {
      if (type !== '') {
        setColumns({
          name,
          type
        })
      }
      // setColumnTypes(type)
    }
    setName('')
    setType('')
    isEditing && closeEditing()
  }

  return (
    <form className='flex gap-2 mt-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-1 max-h-screen'>
        <input className='px-4 py-2' type='text' value={name} onChange={handleNameChange}/>
        <select className='px-4 py-2' value={type} onChange={handleTypeChange}>
          <option value=''>Select one option</option>
          {columnTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>
        {children}
      </button>
    </form>
  )
}
