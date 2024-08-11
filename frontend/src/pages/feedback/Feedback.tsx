import Layout from '@/layout/Layout'
import Container from '@/layout/container/Container'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useGetInterviewById } from './hooks/useGetInterviewById'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Line } from 'react-chartjs-2'
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
} from 'chart.js'
import { useGetLineChartData } from './hooks/useGetLineChartData'
import Multistar from '../../assets/multistar.png'
import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler
)

export const Feedback = () => {
  const { id } = useParams()

  const [showInsights] = useState(true)

  const { data, error } = useGetInterviewById(id || '', true)
  const chartData = useGetLineChartData(id || '')
  const [indexDisplay, setIndexDisplay] = useState<Array<boolean>>(
    Array(5).fill(false)
  )
  const [enhancedAnswers, setEnhancedAnswers] = useState<Array<string>>(
    Array(5).fill('')
  )
  const api = useAxiosPrivate()
  const [loadingGenerateButtons, setLoadingGenerateButtons] = useState<
    boolean[]
  >(new Array(indexDisplay.length).fill(false))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(128, 128, 128, 0.1)',
        },
        title: {
          display: true,
          text: 'Questions',
          color: '#808080',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: '#808080',
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(128, 128, 128, 0.1)',
        },
        title: {
          display: true,
          text: 'Score',
          color: '#808080',
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: '#808080',
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#808080',
          font: {
            size: 14,
          },
        },
      },
    },
  }

  const viewEnhancedAnswer = async (index: number) => {
    // Set loading state
    setLoadingGenerateButtons(prev => {
      const newLoadingState = [...prev]
      newLoadingState[index] = true
      return newLoadingState
    })

    // Get question and answer
    const question = data.interviewTranscript.responseCollection[index].question;
    const answer = data.interviewTranscript.responseCollection[index].answer;

    // Use Axios to call Gemini API
    try {
      const response = await api.request({ url: "/ai/completions/feedback/enhanced", method: "post", data: { question, answer } });
      const responseString = response.data.data;
      setEnhancedAnswers(prev => {
        const newEnhancedAnswers = [...prev]
        newEnhancedAnswers[index] = responseString
        return newEnhancedAnswers
      })
    } catch (error) {
      console.error('Error generating response:', error);
    }

    // Reset loading state
    setLoadingGenerateButtons(prev => {
      const newLoadingState = [...prev]
      newLoadingState[index] = false
      return newLoadingState
    })
  };

  if (error) return <p>Error</p>

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-4 py-4'>
        <h1 className='text-5xl font-semibold leading-tight mt-4'>
          Interview Results
        </h1>
        <h2 className='text-3xl leading-tight font-thin'>
          View your results, scores and feedback from your interview.
        </h2>
        {!data ? (
          <>
            <div className='h-[375px] mt-16'>
              <Skeleton className='w-full h-full' />
            </div>
            <div className='h-[100px] mt-4'>
              <Skeleton className='w-full h-full' />
            </div>
            <div className='h-[100px] mt-4'>
              <Skeleton className='w-full h-full' />
            </div>
            <div className='h-[100px] mt-4'>
              <Skeleton className='w-full h-full' />
            </div>
          </>
        ) : (
          <>
            <div className='w-auto'>
              <div className='w-auto flex my-2'>
                <Link
                  to={'/dashboard'}
                  className='text-blue-500 flex items-center hover:text-blue-400 hover:cursor-pointer'
                >
                  <ArrowLeft size={20} className='mr-1' /> View Dashboard
                </Link>
              </div>
            </div>
            <Card className='p-5 bg-transparent mb-4'>
              <div className='mb-8 text-center font-semibold'>
                {data.jobName} Interview
              </div>
              <div style={{ height: '300px' }}>
                {!chartData.data ? (
                  <div className='h-full mt-16'>
                    <Skeleton className='w-full h-full' />
                  </div>
                ) : (
                  <Line data={chartData.data} options={chartOptions} />
                )}
              </div>
            </Card>
            {showInsights ? (
              <Accordion
                type='multiple'
                collapsible={'true'.toString()}
                className='w-full'
              >
                {data.interviewTranscript.responseCollection.map(
                  (node: any, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className='text-left'>
                        <span>
                          <strong>Question {index + 1}:</strong>
                          <br />
                          <div className='mb-2'></div>
                          {node.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Card className='p-4 mb-8 border-none bg-transparent'>
                          <h3 className='text-base font-bold mb-2'>
                            Your answer:
                          </h3>
                          <p className='text-sm'>{node.answer}</p>
                        </Card>
                        {enhancedAnswers[index] ? (
                          <Card className='p-4 mb-8 border-none'>
                            <h3 className='text-base font-bold mb-2'>
                              Enhanced answer:
                            </h3>
                            <p className='text-sm'>{enhancedAnswers[index]}</p>
                          </Card>
                        ) : null}
                        <Button
                          className={`${buttonVariants({
                            variant: 'tertiary',
                          })} mb-8`}
                          onClick={() => viewEnhancedAnswer(index)}
                          disabled={loadingGenerateButtons[index]}
                        >
                          <img
                            src={Multistar}
                            alt='Star'
                            className='flex-shrink-0 h-5 w-5 mr-2'
                          />
                          {loadingGenerateButtons[index]
                            ? 'Generating Enhanced Answer...'
                            : 'View Enhanced Answer'}
                        </Button>
                        <h4 className='text-base font-bold mb-2'>
                          Your feedback:
                        </h4>
                        <div className=''>
                          <h4 className='text-sm font-bold mb-1'>
                            Overall Impression:
                          </h4>
                          <p className='text-sm mb-1'>
                            <span className='font-bold'>
                              (Score:{' '}
                              {`${data.feedbackTranscript.feedbackEntries[index].overallScorePerResponse}) `}
                            </span>
                            {
                              data.feedbackTranscript.feedbackEntries[index]
                                .overallFeedbackPerResponse
                            }
                          </p>
                          {indexDisplay[index] === true ? (
                            <div className='mb-4 mt-4'>
                              <h4 className='text-sm font-bold mb-1'>
                                Communication:
                              </h4>
                              <p className='text-sm mb-1'>
                                <span className='font-bold'>
                                  (Score:{' '}
                                  {`${data.feedbackTranscript.feedbackEntries[index].skillsScore.communicationScore}) `}
                                </span>
                                {
                                  data.feedbackTranscript.feedbackEntries[index]
                                    .skillsFeedback.communicationFeedback
                                }
                              </p>
                              <h4 className='text-sm font-bold mb-1'>
                                Teamwork:
                              </h4>
                              <p className='text-sm mb-1'>
                                <span className='font-bold'>
                                  (Score:{' '}
                                  {`${data.feedbackTranscript.feedbackEntries[index].skillsScore.teamworkScore}) `}
                                </span>
                                {
                                  data.feedbackTranscript.feedbackEntries[index]
                                    .skillsFeedback.teamworkFeedback
                                }
                              </p>
                              <h4 className='text-sm font-bold mb-1'>
                                Problem-solving:
                              </h4>
                              <p className='text-sm mb-1'>
                                <span className='font-bold'>
                                  (Score:{' '}
                                  {`${data.feedbackTranscript.feedbackEntries[index].skillsScore.problemSolvingScore}) `}
                                </span>
                                {
                                  data.feedbackTranscript.feedbackEntries[index]
                                    .skillsFeedback.problemSolvingFeedback
                                }
                              </p>
                              <h4 className='text-sm font-bold mb-1'>
                                Adaptability:
                              </h4>
                              <p className='text-sm mb-1'>
                                <span className='font-bold'>
                                  (Score:{' '}
                                  {`${data.feedbackTranscript.feedbackEntries[index].skillsScore.adaptabilityScore}) `}
                                </span>
                                {
                                  data.feedbackTranscript.feedbackEntries[index]
                                    .skillsFeedback.adaptabilityFeedback
                                }
                              </p>

                              <h4 className='text-sm font-bold mb-1'>
                                Creativity:
                              </h4>
                              <p className='text-sm mb-1'>
                                <span className='font-bold'>
                                  (Score:{' '}
                                  {`${data.feedbackTranscript.feedbackEntries[index].skillsScore.creativityScore}) `}
                                </span>
                                {
                                  data.feedbackTranscript.feedbackEntries[index]
                                    .skillsFeedback.creativityFeedback
                                }
                              </p>

                              <h4 className='text-sm font-bold mb-1'>
                                Leadership:
                              </h4>
                              <p className='text-sm mb-1'>
                                <span className='font-bold'>
                                  (Score:{' '}
                                  {`${data.feedbackTranscript.feedbackEntries[index].skillsScore.leadershipScore}) `}
                                </span>
                                {
                                  data.feedbackTranscript.feedbackEntries[index]
                                    .skillsFeedback.leadershipFeedback
                                }
                              </p>
                            </div>
                          ) : null}
                          <button
                            className='text-blue-500 text-sm my-4 flex items-center hover:text-blue-400 hover:cursor-pointer'
                            onClick={() => {
                              setIndexDisplay((prev) => {
                                prev[index] = !prev[index]
                                return [...prev]
                              })
                            }}
                          >
                            {indexDisplay[index] ? 'Show Less' : 'Show More'}
                            {indexDisplay[index] ? (
                              <ChevronUp size={16} className='ml-1' />
                            ) : (
                              <ChevronDown size={16} className='ml-1' />
                            )}
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            ) : null}
            <div className='flex flex-wrap mt-4'>
              <Link
                to='/dashboard'
                className={`${buttonVariants({
                  variant: 'default',
                })} flex justify-center items-center mr-4 mb-4`}
              >
                View Dashboard
              </Link>
              <Link
                to='/'
                className={`${buttonVariants({
                  variant: 'outline',
                })} flex justify-center items-center mr-4 mb-4`}
              >
                Start New Interview
              </Link>
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}
