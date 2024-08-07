import { CloseIcon, ConfirmIcon } from '../constants/icons'
import { ColumnForm } from './ColumnForm'
import { RowForm } from './RowForm'

export const Modal = ({ setModal, index, editing }) => {
  const handleCloseModal = () => {
    setModal(false)
  }

  return (
    <div className='fixed flex flex-col object-left-top h-full w-full bg-gray-700 bg-opacity-60'>
      <button className='self-end' onClick={handleCloseModal}>
        <CloseIcon/>
      </button>
      <div className='flex flex-col grow justify-center items-center'>
        {editing === 'rows'
          ? <RowForm index={index} isEditing={true} closeEditing={handleCloseModal}>
              <ConfirmIcon />
            </RowForm>
          : <ColumnForm index={index} isEditing={true} closeEditing={handleCloseModal}>
              <ConfirmIcon/>
            </ColumnForm>
        }
      </div>
    </div>
  )
}
