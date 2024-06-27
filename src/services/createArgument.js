export const createArgument = (row, column) => {
  const label = `${row.name} - ${column.name}`
  const cell = {
    argument: {
      type: 'number',
      optional: false,
      default: 0
    },
    label,
    display: {
      order: 1,
      visible: true,
      readOnly: false,
      carryover: false
    },
    subschedule: ''
  }

  return cell
}
