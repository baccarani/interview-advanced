import { Button } from '@/components/ui/button'
import { Card } from '../ui/card'
import { useState } from 'react'
import RoleSelectorOptions from './role-selector-options/RoleSelectorOptions'
import { Roles } from './Roles'
import { useInterview } from '@/context/InterviewFlowProvider'
import { useNavigate } from 'react-router-dom'
import InterviewQuota from '../interview-quota/InterviewQuota'
import { SpinnerCircularFixed } from 'spinners-react'

// Toggle Back - Quota

// import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
// import { useAuth } from '@/context/AuthProvider'
// import { quotaAPI } from '@/api/quota.api'
// import { toast } from '../ui/use-toast'

type Props = {
  availableInterviews: number
}

const RoleSelector = ({ availableInterviews }: Props) => {
  const [isCurrentRoleCustom, setIsCurrentRoleCustom] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const { state } = useInterview()
  const navigate = useNavigate()
  // const [loading, setLoading] = useState<boolean>(false)
  // const { auth } = useAuth()
  // const api = useAxiosPrivate()

  const handlePrepareClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!state.roleInformation.roleName && isCurrentRoleCustom) {
      event.preventDefault()
      return setError('Please enter a job title.')
    }
    // if (auth) {
    //   await validateUserInterviewQuota()
    // }
    navigate('/interview/prepare')
  }

  // const validateUserInterviewQuota = async () => {
  //   try {
  //     setLoading(true)
  //     const controller = new AbortController()
  //     const resp = await quotaAPI.validateInterviewQuota(api, controller.signal)
  //     if (resp instanceof Error) throw Error
  //     if (!resp) throw Error('Invalid Session')
  //   } catch (e: Error | any) {
  //     toast({
  //       title: 'Error',
  //       description: e.message,
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <Card className={`p-5 mb-10 flex flex-col gap-5 border-none`}>
      <div>
        <h3 className='text-xl font-semibold mb-3'>
          What job are you interviewing for?
        </h3>
        <RoleSelectorOptions
          roles={Object.values(Roles)}
          isCurrentRoleCustom={isCurrentRoleCustom}
          setIsCurrentRoleCustom={setIsCurrentRoleCustom}
          setError={setError}
        />
      </div>
      <div>
        {availableInterviews === null ? <SpinnerCircularFixed /> : null}

        {availableInterviews > 0 ? (
          <Button
            onClick={handlePrepareClick}
            className='flex justify-center'
            // disabled={loading}
          >
            {/* {loading ? (
              <>
                <SpinnerCircularFixed size={25} />
                <span className='ml-2'>Loading...</span>
              </>
            ) : (
              `Prepare for Interview${
                auth ? ` (${availableInterviews} Left)` : ''
              }`
            )} */}
            Prepare for Interview
          </Button>
        ) : (
          <InterviewQuota availableInterviews={availableInterviews} />
        )}

        {error ? <p className='text-red-500 mt-4'>{error}</p> : null}
      </div>
    </Card>
  )
}

export default RoleSelector
