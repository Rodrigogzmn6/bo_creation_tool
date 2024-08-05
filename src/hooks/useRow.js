import { useTaxTableStore } from '../stores/taxTableStore'

export const useRow = () => {
  const rows = useTaxTableStore(state => state.rows)
  const setRows = useTaxTableStore(state => state.setRows)

  return { rows, setRows }
}
