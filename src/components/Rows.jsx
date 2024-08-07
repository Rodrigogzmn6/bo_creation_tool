import { AddIcon, EditIcon } from '../constants/icons'
import { useTaxTableStore } from '../stores/taxTableStore'
import { RowForm } from './RowForm'

export const Rows = ({ handleEditing }) => {
  const rows = useTaxTableStore(state => state.rows)

  return (
    <div className='flex gap-5'>
      <h2>Rows:</h2>
      <div>
        {rows.map((row, index) => (
          <div key={index} className='flex justify-between gap-3'>
            <p>{index + 1}. {row.name}</p>
            <button onClick={() => handleEditing(index, 'rows')}>
              <EditIcon/>
            </button>
          </div>
        ))}
        <RowForm>
          <AddIcon/>
        </RowForm>
      </div>
    </div>
  )
}
