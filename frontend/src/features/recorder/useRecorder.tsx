import { useEffect, useRef, useState } from 'react'

const useRecorder = (audioInput: MediaDeviceInfo | null) => {
  const rec = useRef<MediaRecorder | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([])
  const [bl, setBl] = useState<Blob | null>(null)
  const chunks = useRef<Array<Blob>>([])

  const initializeRecorder = async () => {
    console.log(audioInput)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      const devices = await navigator.mediaDevices.enumerateDevices()
      setDevices(devices)

      const recorderInstance = new MediaRecorder(stream, {
        mimeType: 'audio/mp4',
      })

      rec.current = recorderInstance

      // navigator.mediaDevices.ondevicechange = (ev: Event) => {
      //   console.log(ev)
      //   alert('Device Changes')
      // }

      // Push Data Chunks to chunks ref

      rec.current.ondataavailable = ({ data }) => {
        console.log(data.size)
        if (data.size > 0) {
          console.log(chunks.current)
          chunks.current.push(data)
        }
      }

      rec.current.onstop = async () => {
        console.log('stop was called-out')
        if (chunks.current.length > 0) {
          console.log('stop was called-in')
          setIsProcessing(true)
          setBl(
            new Blob(chunks.current, {
              type: recorderInstance.mimeType,
            })
          )
          setIsProcessing(false)
          chunks.current.length = 0
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message)
      } else {
        console.error(e)
      }
    }
  }

  const startRecording = () => {
    if (!rec.current) return
    rec.current.start(1000)
  }

  const stopRecording = () => {
    if (!rec.current) return
    rec.current.stop()
  }

  useEffect(() => {
    initializeRecorder()
  }, [])

  return {
    recorder: rec.current,
    bl,
    isProcessing,
    devices,
    startRecording,
    stopRecording,
  }
}

export default useRecorder

// import { useEffect, useRef, useState, useCallback } from 'react'

// const useRecorder = (audioInput: MediaDeviceInfo | null) => {
//   const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
//   const [isProcessing, setIsProcessing] = useState<boolean>(false)
//   const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([])
//   const [data, setData] = useState<Blob | null>(null)
//   const chunks = useRef<Array<Blob>>([])
//   const streamRef = useRef<MediaStream | null>(null)

//   const initializeRecorder = useCallback(async () => {
//     try {
//       console.log(audioInput)
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       })

//       streamRef.current = stream

//       const devices = await navigator.mediaDevices.enumerateDevices()
//       setDevices(devices)

//       const recorderInstance = new MediaRecorder(stream, {
//         mimeType: MediaRecorder.isTypeSupported('audio/webm')
//           ? 'audio/webm'
//           : 'audio/mp4',
//       })

//       setRecorder(recorderInstance)

//       navigator.mediaDevices.ondevicechange = (ev: Event) => {
//         console.log(ev)
//         alert('Device Changes')
//       }

//       recorderInstance.ondataavailable = ({ data }) => {
//         if (data.size > 0) {
//           chunks.current.push(data)
//         }
//       }

//       recorderInstance.onstop = () => {
//         console.log('here')
//         try {
//           if (chunks.current.length > 0) {
//             setIsProcessing(true)
//             const audioBlob = new Blob(chunks.current, {
//               type: recorderInstance.mimeType,
//             })
//             setData(audioBlob)
//             setIsProcessing(false)
//             chunks.current.length = 0
//           }
//         } catch (e) {
//           alert(e)
//         }
//       }
//     } catch (e) {
//       if (e instanceof Error) {
//         alert(e.message)
//       } else {
//         console.error(e)
//       }
//     }
//   }, [])

//   const startRecording = useCallback(() => {
//     if (!recorder) return
//     recorder.start(1000)
//   }, [recorder])

//   const stopRecording = useCallback(() => {
//     if (!recorder) return
//     recorder.stop()
//   }, [recorder])

//   useEffect(() => {
//     initializeRecorder()

//     return () => {
//       if (recorder && recorder.state !== 'inactive') {
//         recorder.stop()
//       }
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop())
//       }
//     }
//   }, [initializeRecorder])

//   return {
//     recorder,
//     data,
//     isProcessing,
//     devices,
//     startRecording,
//     stopRecording,
//   }
// }

// export default useRecorder
