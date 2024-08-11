import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import RoleSelectorOptions from './RoleSelectorOptions'
import { Roles } from '../Roles'

describe('RoleSelectorOptions', () => {
  const mockSetIsCurrentRoleCustom = vi.fn()
  const roles = Object.values(Roles)
  const mockErrorState = vi.fn()

  test('Should render role selector options component', () => {
    render(
      <RoleSelectorOptions
        roles={roles}
        isCurrentRoleCustom={false}
        setIsCurrentRoleCustom={mockSetIsCurrentRoleCustom}
        setError={mockErrorState}
      />
    )
  })

  test('Should render correctly with given roles', () => {
    render(
      <RoleSelectorOptions
        roles={roles}
        isCurrentRoleCustom={false}
        setIsCurrentRoleCustom={mockSetIsCurrentRoleCustom}
        setError={mockErrorState}
      />
    )

    roles.forEach((role) => {
      expect(screen.getByText(role)).toBeDefined()
    })
  })
})
