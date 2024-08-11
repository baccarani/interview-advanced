import { Button } from '@/components/ui/button'
import { useProfile } from '@/context/ProfileProvider'
import { capitalize } from '@/utils/capitalize'
import defaultImg from '@/assets/7915522.png'
import hiringManagerIconImageDark from '@/assets/hiringManagerIconImageDark.png'
import hiringManagerIconImageLight from '@/assets/hiringManagerIconImageLight.png'
import { useTheme } from '@/context/ThemeProvider'
import { useEffect, useRef, useState } from 'react'
import { Pause, Volume2 } from 'lucide-react'
import { SpinnerCircular } from 'spinners-react'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
import { aiAPI } from '@/api/ai.api'

type Props = {
  role: string
  text: string
  className?: string
  width?: string
}

const ChatBubble = ({ role, text, width = 'w-fit max-w-[100%]' }: Props) => {
  const { profile } = useProfile()
  const { theme } = useTheme()
  const [imageSrc, setImageSrc] = useState<string>(defaultImg)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [audioString, setAudioString] = useState<string>('')
  const displayRole =
    role === 'assistant'
      ? 'Hiring Manager'
      : role === 'user' && profile
      ? capitalize(profile.name)
      : 'Interviewee'
  const api = useAxiosPrivate()

  // Toggle User Image based on Themes
  useEffect(() => {
    if (role === 'user' && profile) {
      setImageSrc(profile.picture)
    } else if (role === 'user' && !profile) {
      setImageSrc(defaultImg)
    } else if (role === 'assistant') {
      setImageSrc(
        theme === 'dark'
          ? hiringManagerIconImageDark
          : hiringManagerIconImageLight
      )
    }
  }, [theme, profile])

  // Setup Event Handlers for AudioRef
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadeddata = async () => {
        await audioRef.current?.play()
      }

      audioRef.current.onended = () => {
        setIsPlaying(false)
      }

      audioRef.current.onplay = () => {
        setIsPlaying(true)
      }

      audioRef.current.onpause = () => {
        setIsPlaying(false)
      }
    }
  }, [])

  const toggleAudioState = async (input: string) => {
    if (audioString === '') {
      setLoading(true)
      try {
        const controller = new AbortController()
        const base64String = await aiAPI.textToSpeech(api, controller.signal, {
          input,
        })
        const decodedAudio = atob(base64String)
        const audioBlob = new Blob(
          [
            new Uint8Array(
              decodedAudio.split('').map((char) => char.charCodeAt(0))
            ),
          ],
          {
            type: MediaRecorder.isTypeSupported('audio/webm')
              ? 'audio/webm'
              : 'audio/mp3',
          }
        )
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioString(audioUrl)
      } catch (e: unknown) {
        // Need to Add Toast here to display error if any
        if (e instanceof Error) console.log(e.message)
      } finally {
        setLoading(false)
      }
    }
    if (isPlaying && audioString !== '') {
      audioRef.current?.pause()
    } else if (!isPlaying && audioString !== '') {
      await audioRef.current?.play()
    }
  }

  return (
    <div className={`flex flex-col gap-3 ${width}`}>
      <div className='flex'>
        <div className='w-8'>
          <img
            src={imageSrc}
            alt='Profile'
            className='rounded-full h-8 w-8 object-cover mt-4'
            referrerPolicy='no-referrer'
          />
        </div>
        <h5 className='mx-3 mt-4 text-lg font-semibold self-center'>
          {displayRole}
        </h5>
        <div>
          {role === 'assistant' && (
            <>
              <audio src={audioString} ref={audioRef}></audio>
              <Button
                onClick={() => toggleAudioState(text)}
                variant={'outline'}
                className={`w-full sm:w-auto p-2 rounded-full border-none mt-4`}
              >
                {loading ? (
                  <SpinnerCircular size='20px' />
                ) : isPlaying ? (
                  <Pause size='20px' />
                ) : (
                  <Volume2 size='20px' />
                )}
              </Button>
            </>
          )}
        </div>
      </div>
      <p>{text}</p>
    </div>
  )
}

export default ChatBubble
