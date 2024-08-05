import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Toaster, toast } from 'sonner'
import './App.css'
import { Columns } from './components/Columns'
import { Rows } from './components/Rows'
import { useConfig } from './hooks/useConfig'
import { createAdd } from './services/createAdd'
import { createArgument } from './services/createArgument'
import { createConstant } from './services/createConstant'
import { createEquals } from './services/createEquals'
import { createSwitch } from './services/createSwitch'
import { useTaxTableStore } from './stores/taxTableStore'

function App () {
  const rows = useTaxTableStore(state => state.rows)
  const columns = useTaxTableStore(state => state.columns)

  const { generating, metadata, mapping, isRateConstant, setIsRateConstant, setGenerating, setMetadata, setMapping } = useConfig()

  const handleCopyButton = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard')
      })
      .catch(e => {
        toast.error('Ups. Something wen\'t wrong')
      })
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
                field_name: `line${rowIndex + 1}_col${columnIndex + 1}`
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

  return (
    <main className='flex flex-col items-center min-h-screen min-w-full'>
      <Toaster />
      <h1 className='text-3xl font-bold py-4'>B&O Creation Tool</h1>
      {
        !generating
          ? <div className='flex items-start gap-8'>
              <Rows />
              <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-4'>
                  <h2>Is rate constant?</h2>
                  <input type='checkbox' checked={isRateConstant} onChange={() => setIsRateConstant(!isRateConstant)}/>
                </div>
                <button className='p-4' onClick={handleGenerateOnClik}>GENERATE</button>
              </div>
              <Columns />
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
