export const createSwitch = (row, column, columns, order) => {
  const label = `${row.name} - ${column.name}`
  const taxColumn = columns.find(column => column.type === 'Tax')
  const rateColumn = columns.find(column => column.type === 'Rate')

  const cell = {
    formula: {
      switch: {
        [`${row.name} - ${rateColumn.name}`]: {
          case: [
            {
              when: {
                gt: 0
              },
              then: {
                divide: [
                  `${row.name} - ${taxColumn.name}`,
                  `${row.name} - ${rateColumn.name}`
                ]
              }
            }
          ],
          default: 0
        }
      }
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
