export const createConstant = (row, column) => {
  const label = `${row.name} - ${column.name}`
  const cell = {
    constant: 0,
    label,
    display: {
      order: 1,
      visible: true,
      readOnly: true,
      carryover: false
    },
    subschedule: ''
  }

  return cell
}
