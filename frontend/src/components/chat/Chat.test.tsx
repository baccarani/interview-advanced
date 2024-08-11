import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Chat from './Chat'
import { ChatResponse } from '@/services/OpenaiService'

describe('Chat', () => {
  test('Should display the messages', () => {
    const messages: ChatResponse[] = [
      {
        role: 'assistant',
        content: 'This is a test message',
      },
    ]

    render(<Chat messages={messages} loading={false} />)

    expect(screen.getByText(messages[0].content)).toBeDefined()
  })

  window.HTMLElement.prototype.scrollIntoView = function () {}

  describe('Chat', () => {
    test('Should display the messages', () => {
      const messages: ChatResponse[] = [
        {
          role: 'assistant',
          content: 'This is a test message',
        },
      ]

      render(<Chat messages={messages} loading={false} />)

      expect(screen.getByText(messages[0].content)).toBeDefined()
    })
  })

  // test("Should display the role", () => {
  //   const messages: ChatResponse[] = [
  //     {
  //       role: "assistant",
  //       content: "This is a test message",
  //     },
  //   ];

  //   render(<Chat messages={messages} isLoading={false} isProcessingAudio={false} />);

  //   expect(screen.getByText(messages[0].role)).toBeDefined();
  // });
})
