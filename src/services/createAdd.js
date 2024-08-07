export const createAdd = (row, column, columns, order) => {
  const label = `${row.name} - ${column.name}`
  const taxableColumn = columns.find(column => column.type === 'Taxable')
  const deductionColumn = columns.find(column => column.type === 'Deduction')
  const cell = {
    formula: {
      add: [
        `${row.name} - ${deductionColumn.name}`,
        `${row.name} - ${taxableColumn.name}`
      ]
    },
    label,
    subschedule: '',
    display: {
      order,
      visible: true,
      readOnly: true,
      carryover: false
    }
  }

  return cell
}
