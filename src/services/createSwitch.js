export const createSwitch = (row, column, columns) => {
  const label = `${row.name} - ${column.name}`
  const taxColumn = columns.find(column => column.type === 'Tax')
  const rateColumn = columns.find(column => column.type === 'Rate')

  console.log(label)
  console.log(taxColumn.entries)
  console.log(rateColumn.entries)
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
      order: 1,
      visible: true,
      readOnly: true,
      carryover: false
    }
  }

  return cell
}
