export const createEquals = (row, column, columns, order) => {
  const label = `${row.name} - ${column.name}`
  const taxableColumn = columns.find(column => column.type === 'Taxable')
  const cell = {
    formula: `${row.name} - ${taxableColumn.name}`,
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
