import { useState } from 'react'
import { CloseIcon, ConfirmIcon } from '../constants/icons'
import { useTaxTableStore } from '../stores/taxTableStore'

export const RowModal = ({ closeEditing, index }) => {
  const rows = useTaxTableStore(state => state.rows)
  const editRow = useTaxTableStore(state => state.editRow)
  const [newName, setNewName] = useState(rows[index].name)

  const handelNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    closeEditing(false)
    editRow(index, newName)
  }

  return (
    <div className='fixed flex flex-col object-left-top h-full w-full bg-gray-700 bg-opacity-60'>
      <button className='self-end' onClick={() => closeEditing(false)}>
        <CloseIcon/>
      </button>
      <div className='flex flex-col grow justify-center items-center'>
        <form className='flex gap-2 mt-4' onSubmit={handleSubmit}>
          <input className='px-4 py-2' type='text' value={newName} onChange={handelNameChange}/>
          <button type='submit'>
            <ConfirmIcon />
          </button>
        </form>
      </div>
    </div>
  )
}
