import { create } from 'zustand'

export const useTaxTableStore = create((set, get) => {
  return {
    rows: [],
    setRows: (newRow) => {
      set(state => ({
        rows: [...state.rows, newRow]
      }))
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
