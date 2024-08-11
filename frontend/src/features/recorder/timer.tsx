import { useState, useEffect } from 'react'

interface TimeProps {
  isRecording: boolean
  onMaxSecondsReached: () => void
}

const Timer = ({ isRecording, onMaxSecondsReached }: TimeProps) => {
  const [seconds, setSeconds] = useState(0)
  const maxSeconds = 180

  useEffect(() => {
    let interval: any = null

    if (isRecording) {
      if (seconds < maxSeconds) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1)
        }, 1000)
      } else {
        onMaxSecondsReached()
      }
    } else {
      setSeconds(0)
    }

    return () => clearInterval(interval)
  }, [isRecording, seconds, maxSeconds,onMaxSecondsReached])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const remainingSeconds = time % 60
    return `${String(minutes).padStart(1, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  return (
    <h1 className='text-xl text-slate-500'>
      {formatTime(seconds)} / {formatTime(maxSeconds)}
    </h1>
  )
}

export default Timer
