// // import axios, { CancelTokenSource } from 'axios'
// // import { useEffect, useRef } from 'react'
// // import { useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { ChatResponse, openaiService } from '@/services/OpenaiService'
// // import Chat from '@/components/chat/Chat'
// // import InterviewResponse from './interview-response/InterviewResponse'
// // import { OpenaiModelTypes } from '@/services/OpenaiModelTypes'
// // import { Skeleton } from '@/components/ui/skeleton'
// // import { Button, buttonVariants } from '@/components/ui/button'
// // import { LoginBtn } from '../auth/login'
// // import { useAuth } from '@/context/AuthProvider'
// // import { useNote } from '@/context/NoteProvider'
// // import { useInterview } from '@/context/InterviewFlowProvider'
// // import { segregator } from './helpers/responseSegregator'
// // import { interviewTranscriptAPI } from '@/api/interview_transcripts.api'
// // import { useAxiosPrivate } from '@/api/hooks_common/useAxiosPrivate'
// // import { useProfile } from '@/context/ProfileProvider'
// // import { interviewAPI } from '@/api/interview.api'

// // import { feedbackTranscriptAPI } from '@/api/feedback_transcript.api'
// // import { FeedbackTranscript } from '@/api/types/feedback_transcript.types'
// // import { capitalize } from '@/utils/capitalize'

// // type Props = {
// //   role: string
// //   isFinishLoading: boolean
// //   setIsFinishLoading: React.Dispatch<React.SetStateAction<boolean>>
// // }

// const Interview = ({ role, isFinishLoading, setIsFinishLoading }: Props) => {
//   const [messages, setMessages] = useState<ChatResponse[]>([])
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const [isProcessingAudio, setIsProcessingAudio] = useState(true)
//   const [isAudioPlaying, setIsAudioPlaying] = useState(true)
//   const [questionCount, setQuestionCount] = useState<number>(0)
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const isMountedRef = useRef(true)
//   const [quote, setQuote] = useState('')
//   const [isQuoteLoading, setIsQuoteLoading] = useState(true)
//   const [showFeedbackButton, setShowFeedbackButton] = useState<boolean>(false)
//   const micButtonRef = useRef<null | HTMLDivElement>(null)
//   const hasGeneratedQuote = useRef(false)
//   const { auth } = useAuth()
//   const { profile } = useProfile()
//   const { note } = useNote()
//   const { state, dispatch } = useInterview()
//   const { roleInformation, interviewInformation } = state
//   const navigate = useNavigate()
//   const privateAxios = useAxiosPrivate()
//   const [feedbackData, setFeedbackData] = useState<Array<FeedbackTranscript>>(
//     []
//   )

// //   // Handles See Results Button Click
// //   const handleOnClick = async () => {
// //     if (auth) {
// //       console.log(quote)
// //       const controller = new AbortController()
// //       if (
// //         profile &&
// //         interviewInformation.interviewId &&
// //         roleInformation.roleName
// //       ) {
// //         let newMessage = [...messages]
// //         newMessage[0].content = note.questions[0]
// //         const interviewTranscriptResponse =
// //           await interviewTranscriptAPI.createInterviewTranscript(
// //             privateAxios,
// //             controller.signal,
// //             { user_id: profile.sub },
// //             {
// //               uuid: interviewInformation.interviewId,
// //               responseCollection: segregator(messages),
// //             }
// //           )

// //         if (interviewTranscriptResponse instanceof Error)
// //           throw interviewTranscriptResponse

// //         const feedbackTranscriptResponse =
// //           await feedbackTranscriptAPI.createFeedbackTranscript(
// //             privateAxios,
// //             controller.signal,
// //             { user_id: profile.sub },
// //             {
// //               standardUsed: 'STAR',
// //               totalScoreAsPerStandardUsed: 5,
// //               feedbackEntries: feedbackData,
// //             }
// //           )

// //         if (feedbackTranscriptResponse instanceof Error)
// //           throw feedbackTranscriptResponse

// //         const resp: any = await interviewAPI.createNewInterview(
// //           privateAxios,
// //           controller.signal,
// //           { user_id: profile.sub },
// //           {
// //             jobName: roleInformation.roleName,
// //             jobDescription: roleInformation.roleDescription,
// //             interviewState: 'completed',
// //             feedbackTranscript: feedbackTranscriptResponse.feedbackTranscript,
// //             interviewTranscript:
// //               interviewTranscriptResponse.interviewTranscript,
// //             averageScore: feedbackTranscriptResponse.overallSessionScore,
// //             numberOfQuestionsAsked:
// //               state.interviewInformation.interviewData?.interviewOptions
// //                 .questionCount || 3,
// //             typeOfQuestionsAsked:
// //               state.interviewInformation.interviewData?.interviewOptions
// //                 .questionType || 'mixed',
// //             difficultyOfQuestionsAsked:
// //               state.interviewInformation.interviewData?.interviewOptions
// //                 .questionDifficulty || 'medium',
// //           }
// //         )
// //         dispatch({ type: 'reset_flow', payload: null })
// //         navigate(`/interviews/${resp._id}/result`)
// //       } else {
// //         console.log('issue saving interview')
// //       }
// //     } else {
// //       const localInstance = JSON.parse(localStorage.getItem('data') ?? '')
// //       if (!localInstance) {
// //         localStorage.setItem('data', JSON.stringify([]))
// //       } else {
// //         localInstance.push('')
// //         localStorage.setItem('data', localInstance)
// //       }
// //     }
// //   }

// //   const generateQuote = async () => {
// //     setIsQuoteLoading(true)
// //     const generateQuotePrompt = {
// //       content: `Give me a short and concise interview tip for the ${role} role. One sentence max.`,
// //       role: 'system',
// //     }

// //     const noteQuestionsData = {
// //       messages: [generateQuotePrompt],
// //       model: OpenaiModelTypes.GPT_4o,
// //     }

// //     const noteQuestionsResponse = await postDataQuote(
// //       'https://api.openai.com/v1/chat/completions',
// //       noteQuestionsData
// //     )
// //     const questionsString =
// //       noteQuestionsResponse.data.choices[0].message.content
// //     setQuote(questionsString)
// //     setIsQuoteLoading(false)
// //   }

// //   // checks loading state of both the interview and the quote
// //   useEffect(() => {
// //     if (isLoading === false && isQuoteLoading === false) {
// //       setIsFinishLoading(false)
// //     }
// //   }, [isLoading, isQuoteLoading])

//   // scrolls the interview chat to the bottom when a new message is added
//   useEffect(() => {
//     if (messages.length > 0 && micButtonRef.current) {
//       setTimeout(() => {
//         micButtonRef.current?.scrollIntoView({ behavior: 'smooth' })
//       }, 0)
//     }
//   }, [messages])

// //   // useEffect for the first interview question
// //   useEffect(() => {
// //     if (note.questions.length === 0) {
// //       return
// //     }

// //     let ignore = false
// //     const source = axios.CancelToken.source()
// //     ;(async () => {
// //       setIsLoading(true)
// //       setIsFinishLoading(true)

// //       let interviewPromise
// //       // Creates first question for the interview. The startQuestions method can toggle "tell me about yourself" on and off based on the switch on the prepare page.
// //       interviewPromise = openaiService.startQuestions(note.questions)

// //       const [quote, initialInterview] = await Promise.all([
// //         generateQuote(),
// //         interviewPromise,
// //       ])

// //       console.log(quote)

// //       hasGeneratedQuote.current = true

// //       if (initialInterview && !ignore) {
// //         // testing without audio
// //         // setMessages(initialInterview)
// //         // setQuestionCount(questionCount + 1)
// //         // setIsLoading(false)
// //         // setIsFinishLoading(false)
// //         // setIsProcessingAudio(false)
// //         // setIsAudioPlaying(false)

//           // testing with audio
//           postData(
//             'https://api.openai.com/v1/audio/speech',
//             {
//               model: 'tts-1',
//               voice: 'onyx',
//               input:
//                 `Hello ${profile?.name ? profile.name + ',' : ''
//                 } thank you for taking the time to discuss your candidacy for the ` +
//                 role +
//                 ' role with us today. ' +
//                 initialInterview[0]['content'],
//             },
//             'blob',
//             source.token
//           )
//             .then((audioBlob) => {
//               const audio = new Audio(URL.createObjectURL(audioBlob.data))
//               audio.playbackRate = 1.05
//               audioRef.current = audio

//               initialInterview[0]['content'] =
//                 `Hello${profile ? ' ' + capitalize(profile.name) : ''
//                 }, thank you for taking the time to discuss your candidacy for the ` +
//                 role +
//                 ' with us today. ' +
//                 initialInterview[0]['content']
//               setMessages(initialInterview)
//               setQuestionCount(questionCount + 1)
//               setIsLoading(false)
//               setIsFinishLoading(false)
//               setIsProcessingAudio(false)
//               setTimeout(() => {
//                 audio.play()
//               }, 1000)
//               audio.onended = () => setIsAudioPlaying(false)
//             })
//             .catch((thrown) => {
//               if (axios.isCancel(thrown)) {
//                 console.log('Request canceled', thrown.message)
//                 alert(thrown.message);
//               } else {
//                 console.log('Error', thrown)
//                 alert(thrown);
//               }
//             })
//         }
//       })()
//     return () => {
//       ignore = true
//       source.cancel('Operation canceled by the user.')
//       if (audioRef.current) {
//         audioRef.current.pause()
//         audioRef.current.currentTime = 0
//         audioRef.current.src = ''
//         isMountedRef.current = false
//       }
//     }
//   }, [note.questions])

// //   // useEffect for the rest of the interview questions and checks for if the interview is done
// //   useEffect(() => {
// //     if (
// //       questionCount >=
// //       (state.interviewInformation.interviewData?.interviewOptions
// //         ?.questionCount ?? 3)
// //     ) {
// //       // setIsLoading(false);
// //       setIsProcessingAudio(false)
// //     }
// //   }, [messages, questionCount])

// //   // useEffect for the rest of the inerview questions, handles scoring, and adds the next messages from the "Hiring Manager"
// //   const addMessage = async (newMessage: ChatResponse) => {
// //     const source = axios.CancelToken.source()
// //     setIsLoading(true)
// //     setMessages((prevMessages) => [...prevMessages, newMessage])

//     // scoring the user's interview question response
//     let updatedNewMessage = newMessage.content

//     const rubricResponseTemplate = {
//       skillsFeedback: {
//         communicationFeedback:
//           'Your communication skills are exemplary. You effectively used the STAR method (Situation, Task, Action, Result) to describe specific instances where your communication was vital. Your detailed and structured response clearly demonstrated your ability to convey information and achieve results through effective communication. For example, describing a situation where you had to present a complex project update to stakeholders, the steps you took to prepare, how you communicated the key points, and the positive feedback or successful project outcome would further illustrate your skills.',
//         teamworkFeedback:
//           "You demonstrated good teamwork skills by using the STAR method to describe your contributions to team achievements and challenges. To achieve a perfect score, you could provide more detailed examples of your specific actions and the results that followed. For instance, describing a situation where your team faced a tight deadline, the collaborative efforts you initiated, your specific contributions, and the project's successful completion would highlight your teamwork abilities.",
//         problemSolvingFeedback:
//           'Your response showed a basic understanding of problem-solving. To improve your score, use the STAR method to elaborate on your approach, decision-making process, and the unique solutions you have developed in the past. Providing specific examples will help illustrate your problem-solving skills more effectively. For example, detailing a situation where you identified a critical issue, the analysis you conducted, the innovative solution you proposed, and the subsequent positive impact on the project would demonstrate your problem-solving capabilities.',
//         leadershipFeedback:
//           'Your response indicated some leadership experience, but it lacked specific examples. To improve your score, use the STAR method to describe situations where you led a team or project, the tasks you were responsible for, the actions you took, and the results of your leadership efforts. For instance, explaining a situation where you had to lead a cross-functional team, the strategies you employed to keep the team motivated, how you managed challenges, and the successful project outcome would illustrate your leadership skills.',
//         creativityFeedback:
//           'Your response did not sufficiently demonstrate your creativity. To improve your score, use the STAR method to include specific instances where you came up with innovative solutions or ideas. Describe the situation that required creativity, the task at hand, the creative actions you took, and the successful outcome of your creativity. For example, detailing a situation where you introduced a new process or tool to streamline operations, the implementation steps, and the resultant efficiency improvements would highlight your creativity.',
//         adaptabilityFeedback:
//           'Your response clearly demonstrated your adaptability, using the STAR method to provide detailed examples of how you have adapted to changes and overcome challenges. Your structured approach and clear results showcase your strong adaptability skills effectively. For example, describing a situation where you had to quickly adapt to a significant project scope change, the adjustments you made, how you communicated these changes to your team, and the successful project delivery would further demonstrate your adaptability.',
//       },

//       skillsScore: {
//         communicationScore: 5,
//         teamworkScore: 4,
//         problemSolvingScore: 3,
//         leadershipScore: 2,
//         creativityScore: 1,
//         adaptabilityScore: 5,
//       },

//       overallFeedbackPerResponse:
//         'Your response demonstrated a good understanding of the key skills required for the role. To achieve a higher score, consider providing more detailed examples using the STAR method (Situation, Task, Action, Result). By elaborating on specific situations, the tasks you undertook, the actions you implemented, and the results you achieved, you can more effectively showcase your skills and potential value to our team. For example, detailing a situation where you successfully managed a critical project, the tasks you handled, the actions you took to ensure project success, and the positive outcomes achieved would enhance your response.',
//       overallScorePerResponse: 4,
//     }


//     const chatFormDataForFeedback = {
//       messages: [
//         {
//           role: 'system',
//           content: `You are an AI trained to provide feedback on interview responses. Your feedback and score should be based on the STAR method and also be in a specific JSON format with no period at the end of the JSON. The format is as follows: ${JSON.stringify(
//             rubricResponseTemplate
//           )}. Do not give any 0 values for the score. The score must be 1-5 and whole number scores.`,
//         },
//         {
//           role: 'user',
//           content: `Provide feedback to this answer "${updatedNewMessage}" for this question "${messages[messages.length - 1].content
//             }" and your response must follow this JSON structure: ${rubricResponseTemplate}`,
//         },
//       ],
//       model: OpenaiModelTypes.GPT_4o,
//     }

//     let feedbackJson: any
//     do {
//       await postData(
//         'https://api.openai.com/v1/chat/completions',
//         chatFormDataForFeedback,
//         'json',
//         source.token
//       ).then((chatResponse) => {
//         try {
//           feedbackJson = JSON.parse(
//             chatResponse.data.choices[0].message.content
//           )
//         } catch (error) {
//           console.log('Error parsing JSON', error)
//         }
//       })
//     } while (!feedbackJson)

// //     if (feedbackJson) {
// //       setFeedbackData((prevFeedbackData) => [...prevFeedbackData, feedbackJson])
// //     }

// //     if (
// //       questionCount >=
// //       (state.interviewInformation.interviewData?.interviewOptions
// //         ?.questionCount ?? 3)
// //     ) {
// //       const feedbackPrompt = {
// //         content:
// //           "The interview is now over. Please provide feedback on the interviewee's responses and provide the feedback to the interviewee and give the feedback in markdown format. Thank the interviewee first. Give the feedback by scoring me out of 5, in the categories of first impressions, leadership, and problem-solving. Be very critical with the feedback and be a tough grader. Each grading section should be a separate paragraph with proper spacing and line breaks so that the feedback is more readable.",
// //         role: 'system',
// //       }

// //       const chatFormData = {
// //         messages: [...messages, feedbackPrompt],
// //         model: OpenaiModelTypes.GPT_4o,
// //       }

// // postData(
// //   'https://api.openai.com/v1/chat/completions',
// //   chatFormData,
// //   'json',
// //   source.token
// // ).then((chatResponse) => {
// //   setMessages((prevMessages) => [...prevMessages])
// //   setIsLoading(false)
// //   setShowFeedbackButton(true)
// // })

// //       return
// //     }

// //     const noteQuestionsArrayMessage = {
// //       content: note.questions[questionCount],
// //       role: 'assistant',
// //     }
// //     setQuestionCount(questionCount + 1)

// //     postData(
// //       'https://api.openai.com/v1/audio/speech',
// //       {
// //         model: 'tts-1',
// //         voice: 'onyx',
// //         input: noteQuestionsArrayMessage.content,
// //       },
// //       'blob',
// //       source.token
// //     )
// //       .then((a) => {
// //         console.log(a)
// //         if (isMountedRef.current) {
// //           // const audio = new Audio(URL.createObjectURL(audioBlob.data))
// //           // audio.playbackRate = 1.05
// //           // audioRef.current = audio
// //           setMessages((prevMessages) => [
// //             ...prevMessages,
// //             noteQuestionsArrayMessage,
// //           ])

// //           setIsLoading(false)
// //           setIsProcessingAudio(false)
// //           setIsProcessingAudio(false)
// //           setIsAudioPlaying(false)
// //           // audio.play()
// //           // audio.onended = () => {
// //           //   if (isMountedRef.current) {
// //           //   }
// //           // }
// //         }
// //       })
// //       .catch((thrown) => {
// //         if (axios.isCancel(thrown)) {
// //           console.log('Request canceled', thrown.message)
// //         } else {
// //           console.log('Error', thrown)
// //         }
// //       })
// //   }

// //   /*
// //    * Effect used to track when the interview is completed. Adds the closing message to the screen and thanks the user.
// //    */
// //   useEffect(() => {
// //     if (showFeedbackButton) {
// //       const source = axios.CancelToken.source()

// //       const closingMessage: ChatResponse = {
// //         role: 'assistant',
// //         content:
// //           'Thank you for taking the time to interview with us. We have finished assessing your interview responses. You may now see your results to learn more.',
// //       }
// //       // Maps the message list with a closingMessage of type ChatResponse
// //       setMessages((prevMessages) => [...prevMessages, closingMessage])

// //       // TODO: Make this reusable code in a function. Pass the messages to this as a function and use it better.
// //       postData(
// //         'https://api.openai.com/v1/audio/speech',
// //         {
// //           model: 'tts-1',
// //           voice: 'onyx',
// //           input: closingMessage.content,
// //         },
// //         'blob',
// //         source.token
// //       )
// //         .then((a) => {
// //           console.log(a)
// //           if (isMountedRef.current) {
// //             // const audio = new Audio(URL.createObjectURL(audioBlob.data))
// //             // audio.playbackRate = 1.05
// //             // audioRef.current = audio

// //             setIsLoading(false)
// //             setIsProcessingAudio(false)
// //             // audio.play()
// //             // audio.onended = () => {
// //             //   if (isMountedRef.current) {
// //             //     setIsProcessingAudio(false)
// //             //     setIsAudioPlaying(false)
// //             //   }
// //             // }
// //           }
// //         })
// //         .catch((thrown) => {
// //           if (axios.isCancel(thrown)) {
// //             console.log('Request canceled', thrown.message)
// //           } else {
// //             console.log('Error', thrown)
// //           }
// //         })
// //     }
// //   }, [showFeedbackButton])

// //   const axiosInstance = axios.create({
// //     headers: {
// //       Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
// //       'Content-Type': 'application/json',
// //     },
// //   })

// // Function that is used in other methods in this file to post data to the OpenAI API.
// // const postData = async (
// //   url: string,
// //   data: any,
// //   responseType: 'json' | 'blob' = 'json',
// //   cancelToken: CancelTokenSource['token']
// // ): Promise<any> => {
// //   try {
// //     alert(JSON.stringify({ url, data, responseType, cancelToken }))
// //     const resp = await axiosInstance.post(url, data, {
// //       responseType,
// //       cancelToken,
// //     })
// //     alert(JSON.stringify(resp.data))
// //     return resp
// //   } catch (error: any) {
// //     alert(JSON.stringify(error))
// //     alert(JSON.stringify(error.response.data))
// //     return error
// //   } finally {
// //     alert('API call has ended.')
// //   }
// // }

// //   const postDataQuote = async (url: string, data: any) => {
// //     return await axiosInstance.post(url, data)
// //   }

//   return (
//     <div>
//       <div>
//         {isFinishLoading ? (
//           <Skeleton className='w-full h-[50px] mt-3 mb-4 text-md font-normal italic' />
//         ) : (
//           <>
//             <span style={{ fontStyle: 'italic' }}>
//               {/* <strong>Interview Tip:</strong> {quote} */}
//             </span>
//           </>
//         )}
//         <Chat
//           messages={messages}
//           isLoading={isLoading}
//           isProcessingAudio={isProcessingAudio}
//         />
//       </div>

// //       {showFeedbackButton ? (
// //         !auth ? (
// //           <div className='flex flex-col justify-center items-center pt-10 pb-10'>
// //             <p className='pt-10 text-center font-bold text-lg'>
// //               Don't lose your progress, sign in to view your interview results
// //             </p>
// //             <p className='pt-5 text-center text-sm pb-10 lg:w-1/2 lg:mx-auto italic'>
// //               Log in securely with your Google account to access your interview
// //               charts, feedback, scores, and insights to help improve your
// //               performance.
// //             </p>
// //             <LoginBtn showText={true} />
// //           </div>
// //         ) : (
// //           <div className='flex flex-col justify-center items-center pt-5 pb-10'>
// //             <p className='pb-10 text-center font-semibold text-lg'>
// //               See the results from your interview
// //             </p>
// //             <Button
// //               className={buttonVariants({ variant: 'default' })}
// //               onClick={handleOnClick}
// //             >
// //               See Results
// //             </Button>
// //           </div>
// //         )
// //       ) : (
// //         <div className='pb-5 flex justify-center' ref={micButtonRef}>
// //           <InterviewResponse
// //             addMessage={addMessage}
// //             isProcessingAudio={isProcessingAudio}
// //             setIsProcessingAudio={setIsProcessingAudio}
// //             isAudioPlaying={isAudioPlaying}
// //             setIsAudioPlaying={setIsAudioPlaying}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Interview
