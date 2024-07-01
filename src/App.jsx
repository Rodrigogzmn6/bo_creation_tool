import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Toaster, toast } from 'sonner'
import './App.css'
import { AddIcon } from './constants/icons'
import { createAdd } from './services/createAdd'
import { createArgument } from './services/createArgument'
import { createConstant } from './services/createConstant'
import { createEquals } from './services/createEquals'
import { createSwitch } from './services/createSwitch'
import { useTaxTableStore } from './stores/taxTableStore'

function App () {
  const [isRateConstant, setIsRateConstant] = useState(true)

  const rows = useTaxTableStore(state => state.rows)
  const setRows = useTaxTableStore(state => state.setRows)
  const [newRowName, setNewRowName] = useState('')

  const columns = useTaxTableStore(state => state.columns)
  const setColumns = useTaxTableStore(state => state.setColumns)
  const [newColumnName, setNewColumnName] = useState('')

  const columnTypes = useTaxTableStore(state => state.columnTypes)
  const setColumnTypes = useTaxTableStore(state => state.setColumnTypes)

  const [columnType, setColumnType] = useState('')
  const [generating, setGenerating] = useState(false)
  const [metadata, setMetadata] = useState('')
  const [mapping, setMapping] = useState('')

  const handleNewRowOnChange = (event) => {
    setNewRowName(event.target.value)
  }

  const handleAddRow = (event) => {
    event.preventDefault()
    setRows({ name: newRowName })
    setNewRowName('')
  }

  const handleNewColumnTextOnChange = (event) => {
    setNewColumnName(event.target.value)
  }

  const handleNewColumnTypeOnChange = (event) => {
    setColumnType(event.target.value)
  }

  const handleAddColumn = (event) => {
    event.preventDefault()
    if (columnType !== '') {
      setColumns({
        name: newColumnName,
        type: columnType
      })
      setNewColumnName('')
      setColumnTypes(columnType)
      setColumnType('')
    }
  }

  const handleGenerateOnClik = () => {
    let newMetadata = {}
    let newMapping = {}
    if (rows.length > 0 && columns.length > 0) {
      setGenerating(true)
      rows.forEach((row, index) => {
        const rowIndex = index
        columns.forEach((column, index) => {
          const columnIndex = index
          switch (column.type) {
            case 'Rate':
              newMetadata = isRateConstant ? { ...newMetadata, [`${row.name} - ${column.name}`]: createConstant(row, column) } : { ...newMetadata, [`${row.name} - ${column.name}`]: createArgument(row, column) }
              break
            case 'Taxable':
              newMetadata = { ...newMetadata, [`${row.name} - ${column.name}`]: createSwitch(row, column, columns) }
              break
            case 'Gross':
              const deductionColumn = columns.find(column => column.type === 'Deduction')
              newMetadata = deductionColumn ? { ...newMetadata, [`${row.name} - ${column.name}`]: createAdd(row, column, columns) } : { ...newMetadata, [`${row.name} - ${column.name}`]: createEquals(row, column, columns) }
              break
            default:
              newMetadata = { ...newMetadata, [`${row.name} - ${column.name}`]: createArgument(row, column) }
              break
          }
          if (!isRateConstant) {
            newMapping = {
              ...newMapping,
              [`${row.name} - ${column.name}`]: {
                pdfFile: [
                  'change_pdf_name.pdf'
                ],
                type: 'number',
                field_name: `line${rowIndex + 1}_column${columnIndex + 1}`
              }
            }
          } else if (column.type !== 'Rate') {
            newMapping = {
              ...newMapping,
              [`${row.name} - ${column.name}`]: {
                pdfFile: [
                  'change_pdf_name.pdf'
                ],
                type: 'number',
                field_name: `line${rowIndex + 1}_col${columnIndex + 1}`
              }
            }
          }
        })
      })
    }
    setMetadata(JSON.stringify(newMetadata, null, 2).slice(1, -1).trim())
    setMapping(JSON.stringify(newMapping, null, 2).slice(1, -1).trim())
  }

  const handleCopyButton = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard')
      })
      .catch(e => {
        toast.error('Ups. Something wen\'t wrong')
      })
  }

  return (
    <main className='flex flex-col items-center min-h-screen min-w-full'>
      <Toaster />
      <h1 className='text-3xl font-bold py-4'>B&O Creation Tool</h1>
      {
        !generating
          ? <div className='flex items-start gap-8'>
              <div className='flex gap-5'>
                <h2>Rows:</h2>
                <div>
                  {rows.map((row, index) => (
                    <p key={index}>{index + 1}. {row.name}</p>
                  ))}
                  <form className='flex gap-2 mt-4' onSubmit={handleAddRow}>
                    <input className='px-4 py-2' type='text' value={newRowName} onChange={handleNewRowOnChange}/>
                    <button type='submit'>
                      <AddIcon />
                    </button>
                  </form>
                </div>
              </div>
              <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-4'>
                  <h2>Is rate constant?</h2>
                  <input type='checkbox' checked={isRateConstant} onChange={() => setIsRateConstant(!isRateConstant)}/>
                </div>
                <button className='p-4' onClick={handleGenerateOnClik}>GENERATE</button>
              </div>
              <div className='flex gap-5'>
                <h2>Columns:</h2>
                <div>
                  {columns.map((column, index) => (
                    <p key={index}>{index + 1}. {column.name}</p>
                  ))}
                  <form className='flex gap-2 mt-4' onSubmit={handleAddColumn}>
                    <div className='flex flex-col gap-1 max-h-screen'>
                      <input className='px-4 py-2' type='text' value={newColumnName} onChange={handleNewColumnTextOnChange}/>
                      <select className='px-4 py-2' value={columnType} onChange={handleNewColumnTypeOnChange}>
                        <option value=''>Select one option</option>
                        {columnTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type='submit'>
                      <AddIcon />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          : <div className='flex items-stretch grow gap-8 px-10 py-5'>
              <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-3xl'>METADATA</h1>
                <div className='flex flex-col'>
                  <SyntaxHighlighter language='json' style={dracula} wrapLongLines={true}>
                    {metadata}
                  </SyntaxHighlighter>
                </div>
                <button className='px-4 py-2' onClick={() => handleCopyButton(metadata)}>Copy</button>
              </div>
              <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-3xl'>MAPPING</h1>
                <div className='flex flex-col'>
                  <SyntaxHighlighter language='json' style={dracula} wrapLongLines={true}>
                    {mapping}
                  </SyntaxHighlighter>
                </div>
                <button className='px-4 py-2' onClick={() => handleCopyButton(mapping)}>Copy</button>
              </div>
            </div>
      }
    </main>
  )
}

export default App
