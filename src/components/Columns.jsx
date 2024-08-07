import { AddIcon, EditIcon } from '../constants/icons'
import { useTaxTableStore } from '../stores/taxTableStore'
import { ColumnForm } from './ColumnForm'

export const Columns = ({ handleEditing }) => {
  const columns = useTaxTableStore(state => state.columns)

  return (
    <div>
      {columns.map((column, index) => (
        <div key={index} className='flex items-center gap-5'>
          <p>{index + 1}.</p>
          <div className='grow'>
            <p>{column.name}</p>
            <p>{column.type}</p>
          </div>
          <button onClick={() => handleEditing(index, 'columns')}>
            <EditIcon/>
          </button>
        </div>
      ))}
      <ColumnForm>
        <AddIcon />
      </ColumnForm>
    </div>
  )
}
