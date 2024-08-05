import { useTaxTableStore } from '../stores/taxTableStore'

export const useColumn = () => {
  const columns = useTaxTableStore(state => state.columns)
  const setColumns = useTaxTableStore(state => state.setColumns)
  const columnTypes = useTaxTableStore(state => state.columnTypes)

  return { columns, setColumns, columnTypes }
}
