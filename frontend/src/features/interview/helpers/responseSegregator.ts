import { ChatResponse } from '@/services/OpenaiService'

export const segregator = (
  response: ChatResponse[]
): Array<{ question: string; answer: string; catergory: string }> => {
  const questions = response
    .filter((node) => {
      if (node.role === 'assistant') {
        return node.content
      }
    })
    .map((node, index) => {
      if (index === 0) {
        return node.content.split('. ').slice(1).join('')
      }
      return node.content
    })

  const answers = response
    .filter((node) => (node.role === 'user' ? node.content : ''))
    .map((node) => node.content)

  const output: Array<{ question: string; answer: string; catergory: string }> =
    []

  for (let index in answers) {
    output.push({
      question: questions[index] || '',
      answer: answers[index] || '',
      catergory: '',
    })
  }

  return output
}

export const testFormatter = (input: string[]) => {
  const updated = input.map((node) => {
    const jsonString = JSON.stringify(node);
    const temp = jsonString.split('```json')
    let value = ''
    if (temp.length === 2) {
      value = temp.slice(1).join('')
    } else {
      value = temp.slice(0).join('')
    }
    return value.split('```')[0]
  })
  return updated.map((node) => JSON.parse(node))
}
