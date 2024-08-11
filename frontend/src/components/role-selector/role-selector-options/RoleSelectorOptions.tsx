import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button, buttonVariants } from '@/components/ui/button'
import { Roles } from '../Roles'
import { Dispatch, SetStateAction, useState } from 'react'
import { useProfile } from '@/context/ProfileProvider'
import { useInterview } from '@/context/InterviewFlowProvider'

type Props = {
  roles: Roles[]
  isCurrentRoleCustom: boolean
  setIsCurrentRoleCustom: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string>>
}

const RoleSelectorOptions = ({
  roles,
  isCurrentRoleCustom,
  setIsCurrentRoleCustom,
  setError,
}: Props) => {
  const { profile } = useProfile()
  const { dispatch } = useInterview()
  const [customRoleName, setCustomRoleName] = useState<string>('')
  const [customRoleDescription, setCustomRoleDescription] = useState<string>('')

  const [isActive, setActive] = useState<string>('Custom Job')

  const resetSection = () => {
    setCustomRoleName('')
    setCustomRoleDescription('')
    setError('')
    setIsCurrentRoleCustom(false)
  }

  const changeRole = (role: Roles) => {
    localStorage.setItem('currentRole', role);
    if (role === 'Custom Job') {
      setIsCurrentRoleCustom(true)
      dispatch({ type: 'update_role_name', payload: null })
    } else {
      dispatch({ type: 'update_role_description', payload: '' })
      dispatch({ type: 'update_role_name', payload: role })
      resetSection()
    }
    setActive(role)
  }

  const handleCustomRoleInput = (e: any) => {
    localStorage.setItem('currentRole', e.target.value);
    if (isCurrentRoleCustom) {
      dispatch({ type: 'update_role_name', payload: e.target.value })
    }
    setCustomRoleName(e.target.value)
  }

  const handleCustomDescriptionInput = (e: any) => {
    if (isCurrentRoleCustom && profile) {
      dispatch({ type: 'update_role_description', payload: e.target.value })
    }
    setCustomRoleDescription(e.target.value)
  }

  return (
    <ul className='flex items-center gap-5 flex-wrap'>
      {roles.map((role) => (
        <li key={role}>
          <Button
            onClick={() => changeRole(role)}
            className={`${buttonVariants({
              variant: isActive === role ? 'secondary' : 'outline',
            })} `}
          >
            {role}
          </Button>
        </li>
      ))}
      {isCurrentRoleCustom && (
        <div className='flex w-full'>
          <div className='flex flex-wrap w-full'>
            <Input
              onChange={handleCustomRoleInput}
              value={customRoleName}
              placeholder='Job title (Required)'
              type='text'
            />
            {profile ? (
              <Textarea
                className='h-40 mt-4'
                onChange={handleCustomDescriptionInput}
                value={customRoleDescription}
                placeholder='Job description (Optional) - Get tailored interview questions by providing a job description.'
              />
            ) : null}
          </div>
        </div>
      )}
    </ul>
  )
}

export default RoleSelectorOptions
