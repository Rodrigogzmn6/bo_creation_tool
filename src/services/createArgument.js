export const createArgument = (row, column, order) => {
  const label = `${row.name} - ${column.name}`
  const cell = {
    argument: {
      type: 'number',
      optional: false,
      default: 0
    },
    label,
    display: {
      order,
      visible: true,
      readOnly: false,
      carryover: false
    },
    subschedule: ''
  }

  return cell
}
