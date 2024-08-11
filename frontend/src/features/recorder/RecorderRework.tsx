import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, Square } from 'lucide-react'
import { SpinnerCircular } from 'spinners-react'
import { Button, buttonVariants } from '../../components/ui/button'
import './Recorder.css'

type Props = {
  recorderLoading: boolean
  maxTime: number
  setData: React.Dispatch<React.SetStateAction<Blob | null>>
}

const RecorderRework = ({ setData, recorderLoading, maxTime }: Props) => {
  // Navigate Function
  const navigate = useNavigate()
  // Recording State 🎙️
  const [isRecording, setIsRecording] = useState(false)
  // Retry State 🔁
  const [retry, setRetry] = useState(false)
  // Timer State ⌚
  const [time, setTime] = useState<number>(0)
  // Error State ❌
  const [error, setError] = useState<string | undefined>(undefined)
  // Recorder useRef Function 🎙️
  const recorder = useRef<MediaRecorder | null>(null)
  // Audio Chunks useRef 🔉
  const chunks = useRef<Blob[]>([])

  const errorMessageHandler = (message: string) => {
    switch (message) {
      case 'The object can not be found here.':
        return 'Microphone not Detected! Please Connect and retry.'
      case 'The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission':
        setRetry(true)
        return 'Mic Access Denied! Please Allow access and retry.'
      case 'The request is not allowed by the user agent or the platform in the current context.':
        setRetry(true)
        return 'Mic Access Denied! Please Allow access and retry.'
      case 'Permission denied':
        setRetry(true)
        return 'Mic Access Blocked! Please Allow access and retry.'
      case 'Permission dismissed':
        setRetry(true)
        return 'Mic Accesss request was denied! Please Retry'
      default:
        return 'Unknown Error! Please Restart the Interview'
    }
  }

  // Initialize Recorder when user clicks on Recorder Btn for the first time
  const initializeRecorder = async () => {
    try {
      // Capture gUM stream for Media Recorder
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Enumerate Devices Connected to Client
      const currentDevices = await navigator.mediaDevices.enumerateDevices()

      // Event Listener to check changes in devices that are connected to host
      navigator.mediaDevices.ondevicechange = () => {
        navigator.mediaDevices.enumerateDevices().then((newDevices) => {
          if (currentDevices.length === newDevices.length) {
            setError(undefined)
          } else {
            recorder.current = null
            setError('Mic Disconnected! Please reconnect and try again') // Set Error when
          }
        })
      }

      // Initialize Media Recorder
      recorder.current = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') // Toggle mimeType based on Supported Types
          ? 'audio/webm;codecs=opus' // 'audio/webm; codecs=opus' widely used
          : 'audio/mp4', // 'audio/mp4' used by Safari and Chrome running on iOS
      })

      // Event Handler for Errors in Media Recorder
      recorder.current.onerror = () => {
        setTime(0)
        setIsRecording(false)
      }

      // Recorder Event Handler for "start" event
      recorder.current.onstart = () => {
        setIsRecording(true)
      }

      // Recorder Event When Data is available for every 1sec
      recorder.current.ondataavailable = (ev: BlobEvent) => {
        if (ev.data.size > 0) {
          chunks.current.push(ev.data)
        }
      }

      // Recorder Event when Recorder is stopped
      recorder.current.onstop = () => {
        const newBlob = new Blob(chunks.current, {
          type: recorder.current?.mimeType,
        })
        chunks.current.length = 0
        setIsRecording(false)
        setData(newBlob)
        setTime(0)
      }
    } catch (e: unknown) {
      console.log(e)
      if (e instanceof Error) {
        setError(errorMessageHandler(e.message))
      }
    }
  }

  // Function to format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const remainingSeconds = time % 60
    return `${String(minutes).padStart(1, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  // Trigger Retry
  const retryFunctionality = () => {
    setRetry(false)
    setError(undefined)
    recorder.current = null
  }

  // Toggle Recording State
  const toggleRecording = async () => {
    if (!recorder.current || recorder.current.state === 'inactive') {
      await initializeRecorder()
    }
    if (!recorder.current) {
      return
    }
    try {
      if (isRecording) {
        recorder.current?.stop()
      } else {
        recorder.current?.start(1000)
      }
    } catch (e: unknown) {
      recorder.current = null
    }
  }

  // UseEffect to Handle Timer
  useEffect(() => {
    let timerID: NodeJS.Timeout
    if (isRecording && time < maxTime) {
      timerID = setInterval(() => setTime((prev) => prev + 1), 1000)
    }

    if (time === maxTime) {
      toggleRecording()
      setTime(0)
    }

    return () => clearInterval(timerID)
  }, [time, isRecording])

  // UseEffect for Recorder Clean up
  useEffect(() => {
    return () => {
      recorder.current?.stream.getAudioTracks().forEach((track) => track.stop())
      recorder.current = null
    }
  }, [])

  return (
    <div className='h-[150px] w-[200px] flex flex-col justify-center m-auto text-center'>
      {error ? (
        <div>
          <p>{error}</p>
          <Button variant={'outline'} onClick={() => navigate('/')}>
            Return
          </Button>

          {retry && (
            <Button variant={'tertiary'} onClick={retryFunctionality}>
              Retry
            </Button>
          )}
        </div>
      ) : (
        <>
          <h2 className='text-2xl'>{formatTime(time) + ` / 3:00`}</h2>
          <Button
            onClick={toggleRecording}
            className={`${buttonVariants({
              variant: isRecording ? 'destructive' : 'ghost',
            })} rounded-full p-2 mt-5 custom-block glow w-14 h-14  ${
              isRecording ? 'glow-red' : ''
            } self-center`}
            disabled={recorderLoading}
          >
            {recorderLoading && <SpinnerCircular color='white' />}

            {isRecording ? (
              <Square className='icon w-6 h-6' />
            ) : (
              <Mic className='icon w-7 h-7' />
            )}
          </Button>
        </>
      )}
    </div>
  )
}

export default RecorderRework
