import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { useLocation } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Line } from 'react-chartjs-2'
import { ChevronDown, ChevronUp } from 'lucide-react'

const InterviewMetrics = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  // Need to be discuessed
  const [showInsights] = useState(true)
  const [showMore, setShowMore] = useState(new Array(3).fill(false))
  const [array, setArray] = useState<any[]>([])
  // Need to bee discuussed
  const [chartData] = useState({
    labels: ['Q1', 'Q2', 'Q3'],
    datasets: [
      {
        label: 'Score',
        data: [1, 2, 5],
        fill: false,
        backgroundColor: 'rgb(59, 130, 246)',
        borderColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.2,
      },
    ],
  })
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Questions',
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.1)', // color of x-axis grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: 'Score',
          font: {
            size: 14,
          },
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(128, 128, 128, 0.1)', // color of x-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  }

  useEffect(() => {
    if (isHomePage) {
      setArray(mockData)
    }
  }, [isHomePage])

  const mockData = [
    {
      question:
        'Tell me about yourself? What qualifications do you bring to the Manager opening?',
      Feedback: {
        behavioural_skills: {
          communication:
            'Your response was concise but lacked detail. Use the STAR method to describe specific instances where your communication skills were critical. For example, detail a situation where you needed to communicate a complex project update, the task you were addressing, the actions you took to communicate effectively, and the result of your efforts.',
          teamwork:
            "You've mentioned teamwork but didn't elaborate on specific experiences. Provide examples using the STAR method where you led a team, describing the situation, the tasks you managed, the actions you took, and the results of your leadership. Highlight specific achievements or challenges faced as a team leader.",
          problem_solving:
            'You mentioned problem-solving but didn’t elaborate on your approach. Use the STAR method to provide examples where you faced complex problems, including the situation, the tasks involved, the actions you took to solve them, and the outcomes of your solutions.',
          leadership:
            'You did not mention any leadership experiences. To improve, use the STAR method to provide examples of situations where you successfully led a team, detailing the task, actions you took, and the results of your leadership efforts.',
          creativity:
            'There was no mention of creativity. Use the STAR method to highlight instances where you applied creative solutions to overcome challenges, including the situation, the creative actions you took, and the positive outcomes achieved.',
          adaptability:
            'You did not discuss adaptability. Share instances using the STAR method where you adapted to changes or new situations, describing the situation, the task, the actions you took, and the successful results of your adaptability.',
        },
        overall_impression:
          'Given the brief nature of your answer, it was challenging to fully evaluate your fit for the manager role. To improve, provide more detailed examples using the STAR method to showcase your skills and potential value to our team. Describe specific situations, tasks, actions, and results to better illustrate your qualifications.',
      },
      Score: {
        behavioural_skills: {
          communication: 1,
          teamwork: 2,
          problem_solving: 1,
          leadership: 1,
          creativity: 1,
          adaptability: 1,
        },
        overall_impression: 1,
      },
      answer:
        "I have a degree in Business Administration and some experience in management roles. I've worked in a few different industries, which has given me a broad perspective. I enjoy working with teams and solving problems. In my previous role, I supervised a small team and worked on improving our operational efficiency. I believe these experiences have prepared me well for a management position.",
    },
    {
      question:
        'Tell me about a time when you handled conflict within your team and successfully resolved it?',
      Feedback: {
        behavioural_skills: {
          communication:
            'Your response was good but could benefit from more detailed examples using the STAR method. Describe a situation where you had to communicate effectively to resolve a conflict, including the task, actions you took, and the result of your communication.',
          teamwork:
            "Your teamwork skills are evident. To enhance your response, use the STAR method to provide specific examples of how you contributed to resolving the conflict within the team, including the situation, your role, the actions taken, and the results achieved.",
          problem_solving:
            'Your problem-solving skills are clear. Use the STAR method to elaborate on your approach to conflict resolution, including the situation, tasks involved, actions taken to address the issue, and the successful outcome.',
          leadership:
            'You demonstrated leadership by facilitating an open dialogue. To strengthen your response, use the STAR method to provide additional examples of your leadership in similar situations, detailing the situation, tasks, actions, and results.',
          creativity:
            'There was no mention of creativity in resolving the conflict. Highlight any creative approaches or solutions you used, using the STAR method to describe the situation, task, creative actions, and successful outcome.',
          adaptability:
            'You showed adaptability in handling conflict. Use the STAR method to provide more examples of how you adapted to various challenges, including the situation, tasks, actions, and results of your adaptability.',
        },
        overall_impression:
          'Your answer demonstrates an understanding of conflict resolution and effective communication. To improve, provide more detailed examples using the STAR method to fully illustrate your skills and the impact of your actions.',
      },
      Score: {
        behavioural_skills: {
          communication: 2,
          teamwork: 2,
          problem_solving: 2,
          leadership: 2,
          creativity: 1,
          adaptability: 2,
        },
        overall_impression: 2,
      },
      answer:
        'In a previous role, I encountered a situation where two team members had a disagreement over the allocation of resources for a project. To address the issue, I organized a meeting where both individuals could express their viewpoints and concerns. By facilitating an open and respectful dialogue, we were able to identify a compromise that met the needs of both parties and aligned with our overall project goals. This resolution not only resolved the conflict but also enhanced team collaboration and morale. I believe that fostering open communication and understanding is key to resolving conflicts effectively.',
    },
    {
      question:
        'How do you measure the success of your team, and what metrics do you focus on?',
      Feedback: {
        behavioural_skills: {
          communication:
            'Excellent response! You effectively used the STAR method to describe how you measure team success. Continue using structured examples to showcase your communication skills and the impact of your communication on achieving results.',
          teamwork:
            'Excellent response! Your teamwork skills are well-demonstrated. Use the STAR method to highlight how your approach to measuring success involves teamwork and collaboration, providing specific examples of successful outcomes.',
          problem_solving:
            'Excellent response! You demonstrated strong problem-solving skills. Use the STAR method to describe specific instances where you tackled challenges related to team success measurement, including the situation, tasks, actions, and results.',
          leadership:
            'Excellent response! Your leadership skills are evident in how you measure team success. Continue using the STAR method to provide detailed examples of your leadership in driving successful outcomes and fostering team growth.',
          creativity:
            'Excellent response! You showed creativity in your approach to measuring success. Use the STAR method to further illustrate how your creative solutions contributed to improved team performance and success.',
          adaptability:
            'Excellent response! Your adaptability is evident in how you measure and respond to changes in team success metrics. Continue using the STAR method to describe how you adapt to evolving challenges and metrics, providing examples of successful outcomes.',
        },
        overall_impression:
          'Excellent response! Your use of the STAR method effectively demonstrates your skills in measuring team success. Continue seeking professional development and applying the STAR method to provide detailed and structured examples of your skills and achievements.',
      },
      Score: {
        behavioural_skills: {
          communication: 5,
          teamwork: 5,
          problem_solving: 4,
          leadership: 5,
          creativity: 4,
          adaptability: 4,
        },
        overall_impression: 5,
      },
      answer:
        'I measure the success of my team using several key metrics. These include project completion rates, quality of deliverables, and team satisfaction scores. Additionally, I track individual performance metrics to ensure that each team member is growing and contributing effectively. For instance, in my last role, I implemented a quarterly review process that significantly improved both team performance and morale. By focusing on these metrics, I ensure that the team remains productive, motivated, and aligned with our strategic goals. I believe in continuous improvement and regularly seek feedback to refine our processes and enhance team effectiveness.',
    },
  ]

  return (
    <>
      <Card className='p-5 bg-transparent mb-4'>
        <div className='mb-8 text-center font-semibold'>
          Manager Interview (Sample)
        </div>
        <div style={{ height: '300px' }}>
          <Line data={chartData} options={options} />
        </div>
      </Card>
      {showInsights && (
        <Accordion
          type='multiple'
          collapsible='true'
          className='w-full mb-4 text-md'
        >
          {array.map((feedbackScore, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className='text-left'>
                <span>
                  <strong>Sample Question {index + 1}:</strong>
                  <br />
                  <div className='mb-2'></div>
                  {feedbackScore.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Card className='p-4 mb-8 border-none'>
                  <h3 className='text-base font-bold mb-2 text-md'>
                    Your answer (sample):
                  </h3>
                  <p className='text-md'>{feedbackScore.answer}</p>
                </Card>
                <h4 className='text-base font-bold mb-2 text-md'>
                  Your feedback (sample):
                </h4>
                <div className=''>
                  <h4 className='font-bold mb-1 text-md'>
                    Overall Impression:
                  </h4>
                  <p className='text-md mb-4'>
                    <span className='font-bold text-md'>
                      (Score: {feedbackScore.Score.overall_impression}){' '}
                    </span>
                    {feedbackScore.Feedback.overall_impression}
                  </p>
                  {showMore[index] && (
                    <div className='mb-4 mt-4'>
                      <h4 className='text-md font-bold mb-1'>Communication:</h4>
                      <p className='text-md mb-4'>
                        <span className='font-bold'>
                          (Score:{' '}
                          {feedbackScore.Score.behavioural_skills.communication}
                          ){' '}
                        </span>
                        {
                          feedbackScore.Feedback.behavioural_skills
                            .communication
                        }
                      </p>
                      <h4 className='text-md font-bold mb-1'>Teamwork:</h4>
                      <p className='text-md mb-4'>
                        <span className='font-bold'>
                          (Score:{' '}
                          {feedbackScore.Score.behavioural_skills.teamwork}){' '}
                        </span>
                        {feedbackScore.Feedback.behavioural_skills.teamwork}
                      </p>
                      <h4 className='text-md font-bold mb-1'>
                        Problem-solving:
                      </h4>
                      <p className='text-md mb-4'>
                        <span className='font-bold'>
                          (Score:{' '}
                          {
                            feedbackScore.Score.behavioural_skills
                              .problem_solving
                          }
                          ){' '}
                        </span>
                        {
                          feedbackScore.Feedback.behavioural_skills
                            .problem_solving
                        }
                      </p>
                      <h4 className='text-md font-bold mb-1'>Leadership:</h4>
                      <p className='text-md mb-4'>
                        <span className='font-bold'>
                          (Score:{' '}
                          {feedbackScore.Score.behavioural_skills.leadership}){' '}
                        </span>
                        {feedbackScore.Feedback.behavioural_skills.leadership}
                      </p>
                      <h4 className='text-md font-bold mb-1'>Creativity:</h4>
                      <p className='text-md mb-4'>
                        <span className='font-bold'>
                          (Score:{' '}
                          {feedbackScore.Score.behavioural_skills.creativity}){' '}
                        </span>
                        {feedbackScore.Feedback.behavioural_skills.creativity}
                      </p>
                      <h4 className='text-md font-bold mb-1'>Adaptability:</h4>
                      <p className='text-md mb-4'>
                        <span className='font-bold'>
                          (Score:{' '}
                          {feedbackScore.Score.behavioural_skills.adaptability}){' '}
                        </span>
                        {feedbackScore.Feedback.behavioural_skills.adaptability}
                      </p>
                    </div>
                  )}
                  <button
                    className='text-blue-500 my-4 flex items-center hover:text-blue-400 hover:cursor-pointer'
                    onClick={() => {
                      const newShowMore = [...showMore]
                      newShowMore[index] = !newShowMore[index]
                      setShowMore(newShowMore)
                    }}
                  >
                    {showMore[index] ? 'Show Less' : 'Show More'}
                    {showMore[index] ? (
                      <ChevronUp size={16} className='ml-1' />
                    ) : (
                      <ChevronDown size={16} className='ml-1' />
                    )}
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  )
}

export default InterviewMetrics
