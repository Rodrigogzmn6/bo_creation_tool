export const createConstant = (row, column, order) => {
  const label = `${row.name} - ${column.name}`
  const cell = {
    constant: 0,
    label,
    display: {
      order,
      visible: true,
      readOnly: true,
      carryover: false
    },
    subschedule: ''
  }

  return cell
}
