import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const FaqAccordion = () => {
  const faqData = [
    {
      question: 'How does Interview Advanced work?',
      answer:
        'Enter a job description, and our AI generates tailored interview questions.\n\n' +
        'When you record your answers, they are evaluated using Google AI and Gemini. ' +
        'It then scores your response against our scoring rubric. ' +
        'The scores are used to provide you with detailed feedback, charts, metrics, and data visualizations.',
    },
    {
      question: 'Can I use this app to practice for any job role?',
      answer:
        "Yes, it's suitable for a wide range of job roles, including, internships, early-career roles, career transitions, experienced working professionals, and all other job categories.",
    },
    {
      question: 'How is this different from using Gemini, ChatGPT, or other conversational AI models?',
      answer:
        'Interview Advanced, tailored for interview prep, stands out with its intuitive UI that makes navigation and usage easy. ' +
        'It offers comprehensive charts and data visualizations, transforming your preparation into a data-driven experience. These visual tools highlight your strengths and areas for improvement, enabling you to improve your interview skills with insightful metrics and insights.',
    },
    {
      question:
        'How precise are the AI-generated interview questions and feedback?',
      answer:
        'The more detailed the job description, the better the AI customizes questions. Feedback is generally accurate, useful, but may hallucinate sometimes from the AI model.',
    },
    {
      question: 'What languages are supported?',
      answer:
        "Currently, we support English.",
    },
    {
      question: 'Do you retain my data and audio files?',
      answer:
        "We track anonymous usage events for all users. Logged-in users' interview data is saved for review. Audio files are deleted after transcription.",
    },
    {
      question: 'Why should a user allow the usage of the microphone?',
      answer:
        'Allowing microphone usage enhances the user experience by enabling audio input. This allows you to answer interview questions verbally, mimicking a real interview scenario. The audio is then transcribed and evaluated, providing you with detailed feedback.',
    },
  ]

  return (
    <>
      <Accordion type='multiple' collapsible="true" className='w-full mb-0'>
        {faqData.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className='text-left text-md'>
              <span>
                <div className='mb-2'></div>
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className='text-md mb-4'>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
