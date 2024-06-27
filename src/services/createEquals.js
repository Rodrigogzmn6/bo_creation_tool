export const createEquals = (row, column, columns) => {
  const label = `${row.name} - ${column.name}`
  const taxableColumn = columns.find(column => column.type === 'Taxable')
  const cell = {
    formula: `${row.name} - ${taxableColumn.name}`,
    label,
    subschedule: '',
    display: {
      order: 1,
      visible: true,
      readOnly: true,
      carryover: false
    }
  }

  return cell
}
