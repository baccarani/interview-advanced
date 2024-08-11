import { Button } from '@/components/ui/button'
import { LoginBtn } from '@/features/auth/login'
import { useEffect, useRef, useState } from 'react'

type Props = {
  isAuth: boolean
  handleClick: () => Promise<void>
}

export const InterviewCompletion = ({ isAuth, handleClick }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Scroll to the button when it is displayed
    buttonRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [isAuth])

  const handleSeeResultsButtonClick = async () => {
    setIsLoading(true)
    try {
      await handleClick()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center pt-5 pb-10'>
      {isAuth ? (
        <p className='pt-10 pb-5 text-center font-semibold text-lg'>
          See the results from your interview
        </p>
      ) : (
        <>
          <p className='pt-10 text-center font-bold text-lg'>
            Don't lose your progress. Sign in to view your results.
          </p>
          <p className='pt-5 text-center text-sm pb-10 lg:w-1/2 lg:mx-auto italic'>
            Gain access to your interview charts, feedback, scores, and insights
            to help improve your performance.
          </p>
        </>
      )}
      {isAuth ? (
        <Button variant={'default'} onClick={handleSeeResultsButtonClick} ref={buttonRef} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'See Results'}
        </Button>
      ) : (
        <span ref={buttonRef}>
          <LoginBtn showText={true} />
        </span>
      )}
    </div>
  )
}
