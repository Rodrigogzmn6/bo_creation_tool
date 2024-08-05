import { useState } from 'react'

export const useConfig = () => {
  const [isRateConstant, setIsRateConstant] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [metadata, setMetadata] = useState('')
  const [mapping, setMapping] = useState('')

  return { isRateConstant, setIsRateConstant, generating, setGenerating, metadata, setMetadata, mapping, setMapping }
}
