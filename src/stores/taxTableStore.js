import { create } from 'zustand'

export const useTaxTableStore = create((set, get) => {
  return {
    rows: [],
    setRows: (newRow) => {
      set(state => ({
        rows: [...state.rows, newRow]
      }))
    },
    editRow: (index, newName) => {
      set(state => {
        const newRows = [...state.rows]
        newRows[index] = { name: newName }
        return { rows: newRows }
      })
    },
    columns: [],
    setColumns: (newColumn) => {
      set(state => ({
        columns: [...state.columns, newColumn]
      }))
    },
    columnTypes: [
      'Gross',
      'Deduction',
      'Taxable',
      'Rate',
      'Tax'
    ],
    setColumnTypes: (columnToDelete) => {
      set(state => {
        const filteredColumnTypes = state.columnTypes.filter(type => type !== columnToDelete)
        return ({ columnTypes: filteredColumnTypes })
      })
    }
  }
})
