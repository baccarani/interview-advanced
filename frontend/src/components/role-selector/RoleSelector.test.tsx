import { renderWithRouter } from '@/test/testUtils'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import RoleSelector from './RoleSelector'
import { Roles } from './Roles'

describe('RoleSelector', () => {
  test('Should render correctly', () => {
    renderWithRouter(<RoleSelector availableInterviews={3} />)
  })

  test('Should update the role and reflect it in the redirect', async () => {
    const user = userEvent.setup()

    renderWithRouter(<RoleSelector availableInterviews={3} />)

    const softwareEngineerOption = screen.getByText(Roles.SOFTWARE_ENGINEER)
    await user.click(softwareEngineerOption)

    const startInterviewButton = screen.getByRole('button', {
      name: 'Prepare for Interview',
    })

    let buttonClicked = false;
    startInterviewButton.onclick = () => buttonClicked = true;

    fireEvent.click(startInterviewButton)
    expect(buttonClicked).toBe(true)
  })
})
