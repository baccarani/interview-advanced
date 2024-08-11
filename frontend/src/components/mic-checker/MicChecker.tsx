import { useState, useEffect, ReactEventHandler, useRef, useMemo } from 'react'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { useWavesurfer } from '@wavesurfer/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Mic, Square } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type Props = {
  setMicStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const MicChecker = ({ setMicStatus }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    waveColor: 'rgb(128, 128, 128)',
    progressColor: 'rgb(100, 0, 100)',
    url: '',
    plugins: useMemo(
      () => [
        RecordPlugin.create({
          scrollingWaveform: false,
          renderRecordedAudio: false,
          mimeType: MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : 'audio/mp4',
        }),
      ],
      []
    ),
  })
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<RecordPlugin | undefined>(undefined)
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([])
  const [currentDevice, setCurrentDevice] = useState<MediaDeviceInfo | null>(
    null
  )
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const initializeRecorder = async () => {
    try {
      const plugins = wavesurfer?.getActivePlugins()
      plugins?.forEach((node) => {
        if (node instanceof RecordPlugin) {
          recorder.current = node
        }
      })
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const devices = await RecordPlugin.getAvailableAudioDevices()

      // Event Handler to check if Mic input has been disconnected
      navigator.mediaDevices.ondevicechange = async () => {
        const availableInputs = (
          await navigator.mediaDevices.enumerateDevices()
        ).filter((node) => node.kind === 'audioinput')
        if (recorder.current?.isRecording()) {
          recorder.current?.stopRecording()
        }
        setIsRecording(false)
        setDevices(availableInputs)
      }

      setDevices(devices)
      setMicStatus(true)
    } catch (e: any) {
      console.log(e)
      switch (e.message) {
        case 'The object can not be found here.':
          setErrorMessage('Nothing is Connected, please connect and refresh')
          break
        case 'Error accessing the microphone: The object can not be found here.':
          setErrorMessage('Nothing is Connected, please connect and refresh')
          break
      }
      setShowError(true)
    }
  }

  const toggleRecording: ReactEventHandler = async () => {
    try {
      if (!recorder.current) {
        return
      }
      if (!recorder.current.isRecording()) {
        await recorder.current.startRecording({
          deviceId: currentDevice?.deviceId,
        })
        setIsRecording(true)
      } else {
        recorder.current.stopRecording()
        setIsRecording(false)
      }
    } catch (e: any) {
      console.log(e)
      switch (e.message) {
        case 'The object can not be found here.':
          setErrorMessage('Nothing is Connected, please connect and refresh')
          break
        case 'Error accessing the microphone: The object can not be found here.':
          setErrorMessage('Nothing is Connected, please connect and refresh')
          break
      }
      setShowError(true)
    }
  }

  const updateInput = async (e: string) => {
    await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: e } },
    })
    const device = devices.filter((node) => node.deviceId === e)[0]
    setCurrentDevice(device)
  }

  useEffect(() => {
    initializeRecorder()
  }, [wavesurfer])

  return (
    <div>
      {!showError ? (
        <>
          <Select onValueChange={updateInput}>
            <SelectTrigger className='w-[250px]'>
              <SelectValue placeholder={'Select Input'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {devices.map((node) => (
                  <SelectItem value={node.deviceId}>{node.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className='relative flex items-center'>
            <Button
              onClick={toggleRecording}
              className={`${buttonVariants({
                variant: isRecording ? 'destructive' : 'default',
              })} rounded-full p-2 w-12 h-12 mr-5`}
            >
              {isRecording ? (
                <Square className='icon' />
              ) : (
                <Mic className='icon' />
              )}
            </Button>
            <div
              ref={containerRef}
              id='recordings'
              className='w-full border border-[#ddd] mt-4 rounded'
            ></div>
          </div>
        </>
      ) : (
        <p className='text-red-500'>{errorMessage}</p>
      )}
    </div>
  )
}

export default MicChecker
