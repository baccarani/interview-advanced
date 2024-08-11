import { ChatResponse } from '@/services/OpenaiService'
import ChatBubble from './chat-bubble/ChatBubble'
import ChatBubbleLoading from './chat-bubble/chat-bubble-loading/ChatBubbleLoading'

type Props = {
  messages: ChatResponse[]
  loading: boolean
}

const Chat = ({ messages, loading }: Props) => {
  return (
    <ul className='flex flex-col gap-5 mt-4'>
      {messages.map((message, index) => (
        <li key={index}>
          <ChatBubble
            role={message.role}
            text={message.content}
            className={`${
              message.role === 'assistant' ? 'mr-auto' : 'mr-auto'
            } border-none`}
          />
        </li>
      ))}
      {loading && (
        <li>
          <ChatBubbleLoading />
        </li>
      )}
    </ul>
  )
}

export default Chat
