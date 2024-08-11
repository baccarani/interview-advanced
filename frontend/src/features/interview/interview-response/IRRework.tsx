import RecorderRework from '@/features/recorder/RecorderRework'
import { useEffect, useState } from 'react'

type Props = {
  recorderLoading: boolean
  addMessage: (data: Blob) => void
}

const IRRework = ({ addMessage, recorderLoading }: Props) => {
  const [data, setData] = useState<Blob | null>(null)

  useEffect(() => {
    if (data) {
      addMessage(data)
    }
  }, [data])

  return (
    <div className='p-4 mt-5'>
      <RecorderRework
        setData={setData}
        maxTime={180}
        recorderLoading={recorderLoading}
      />
    </div>
  )
}

export default IRRework
