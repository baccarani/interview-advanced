import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { FunctionDeclarationSchemaType } from '@google/generative-ai'
import { textToSpeech } from '../../application/use_cases/ai/textToSpeech'
import config from '../../config/config'
import { dataFormatterQuestions } from '../../utils/ai'
import { createReadStream, rm } from 'fs'
import { speechToText } from '../../application/use_cases/ai/speechToText'
import fs from "fs"
import OpenAI from "openai"

const googleAIController = (
  voiceServiceInterface: any,
  voiceSericeImpl: any
) => {
  const voiceSerivce = voiceServiceInterface(voiceSericeImpl())

  const handleGoogleTts = async (req: Request, res: Response) => {
    const { input } = req.body
    const data = await textToSpeech(voiceSerivce, input)
    return res.status(200).send({ success: true, data, error: null })
  }

  const handleGoogleStt = async (req: Request, res: Response) => {
    const openai = new OpenAI({
      apiKey: config.openai.apiKey,
    })
    let data = ''
    const path = req.file?.destination + '/' + req.file?.filename
    const readStream = createReadStream(path)
  
    for await (const chunks of readStream) {
      data += chunks.toString('base64')
    }
  
    try {
      const resp = await speechToText(
        voiceSerivce,
        data,
        req.headers['user-agent'] || 'missing_user_agent'
      )
      return res.status(200).send({ success: true, data: resp.results[0].alternatives[0].transcript, error: null })
    } catch (error) {
      //API call to OpenAI if Google API fails
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(path),
        model: "whisper-1",
      })
      return res.status(200).send({ success: true, data: transcription.text, error: null })
    } finally {
      rm(path, (err) => {
        if (err) return res.sendStatus(400)
      })
    }
  }

  const generateQuestions = async (req: Request, res: Response) => {
    const { roleInformation, interviewInformation } = req.body
    const prompt = dataFormatterQuestions(roleInformation, interviewInformation)
    try {
      const genAI = new GoogleGenerativeAI(config.google.aiAPIKey)
      const model = genAI.getGenerativeModel({
        model: config.google.aiModelName,
      })
      const result = await model.generateContent(prompt.content)
      const data = result.response.text()
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data, error: null })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFeedback = async (req: Request, res: Response) => {
    let question = req.body.question
    let answer = req.body.answer

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_AI_API_KEY ? process.env.GOOGLE_AI_API_KEY : ''
    )
    let model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      // Set the `responseMimeType` to output JSON
      // Pass the schema object to the `responseSchema` field
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            skillsFeedback: {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                communicationFeedback: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                teamworkFeedback: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                problemSolvingFeedback: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                leadershipFeedback: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                creativityFeedback: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
                adaptabilityFeedback: {
                  type: FunctionDeclarationSchemaType.STRING,
                },
              },
              required: [
                'communicationFeedback',
                'teamworkFeedback',
                'problemSolvingFeedback',
                'leadershipFeedback',
                'creativityFeedback',
                'adaptabilityFeedback',
              ],
            },
            skillsScore: {
              type: FunctionDeclarationSchemaType.OBJECT,
              properties: {
                communicationScore: {
                  type: FunctionDeclarationSchemaType.INTEGER,
                },
                teamworkScore: {
                  type: FunctionDeclarationSchemaType.INTEGER,
                },
                problemSolvingScore: {
                  type: FunctionDeclarationSchemaType.INTEGER,
                },
                leadershipScore: {
                  type: FunctionDeclarationSchemaType.INTEGER,
                },
                creativityScore: {
                  type: FunctionDeclarationSchemaType.INTEGER,
                },
                adaptabilityScore: {
                  type: FunctionDeclarationSchemaType.INTEGER,
                },
              },
              required: [
                'communicationScore',
                'teamworkScore',
                'problemSolvingScore',
                'leadershipScore',
                'creativityScore',
                'adaptabilityScore',
              ],
            },
            overallFeedbackPerResponse: {
              type: FunctionDeclarationSchemaType.STRING,
              properties: {},
            },
            overallScorePerResponse: {
              type: FunctionDeclarationSchemaType.INTEGER,
              properties: {},
            },
          },
          required: [
            'skillsFeedback',
            'skillsScore',
            'overallFeedbackPerResponse',
            'overallScorePerResponse',
          ],
        },
      },
    })

    const rubricResponseTemplate = {
      skillsFeedback: {
        communicationFeedback:
          'Your communication skills are exemplary. You effectively used the STAR method (Situation, Task, Action, Result) to describe specific instances where your communication was vital. Your detailed and structured response clearly demonstrated your ability to convey information and achieve results through effective communication. For example, describing a situation where you had to present a complex project update to stakeholders, the steps you took to prepare, how you communicated the key points, and the positive feedback or successful project outcome would further illustrate your skills.',
        teamworkFeedback:
          "You demonstrated good teamwork skills by using the STAR method to describe your contributions to team achievements and challenges. To achieve a perfect score, you could provide more detailed examples of your specific actions and the results that followed. For instance, describing a situation where your team faced a tight deadline, the collaborative efforts you initiated, your specific contributions, and the project's successful completion would highlight your teamwork abilities.",
        problemSolvingFeedback:
          'Your response showed a basic understanding of problem-solving. To improve your score, use the STAR method to elaborate on your approach, decision-making process, and the unique solutions you have developed in the past. Providing specific examples will help illustrate your problem-solving skills more effectively. For example, detailing a situation where you identified a critical issue, the analysis you conducted, the innovative solution you proposed, and the subsequent positive impact on the project would demonstrate your problem-solving capabilities.',
        leadershipFeedback:
          'Your response indicated some leadership experience, but it lacked specific examples. To improve your score, use the STAR method to describe situations where you led a team or project, the tasks you were responsible for, the actions you took, and the results of your leadership efforts. For instance, explaining a situation where you had to lead a cross-functional team, the strategies you employed to keep the team motivated, how you managed challenges, and the successful project outcome would illustrate your leadership skills.',
        creativityFeedback:
          'Your response did not sufficiently demonstrate your creativity. To improve your score, use the STAR method to include specific instances where you came up with innovative solutions or ideas. Describe the situation that required creativity, the task at hand, the creative actions you took, and the successful outcome of your creativity. For example, detailing a situation where you introduced a new process or tool to streamline operations, the implementation steps, and the resultant efficiency improvements would highlight your creativity.',
        adaptabilityFeedback:
          'Your response clearly demonstrated your adaptability, using the STAR method to provide detailed examples of how you have adapted to changes and overcome challenges. Your structured approach and clear results showcase your strong adaptability skills effectively. For example, describing a situation where you had to quickly adapt to a significant project scope change, the adjustments you made, how you communicated these changes to your team, and the successful project delivery would further demonstrate your adaptability.',
      },

      skillsScore: {
        communicationScore: 5,
        teamworkScore: 4,
        problemSolvingScore: 3,
        leadershipScore: 2,
        creativityScore: 1,
        adaptabilityScore: 5,
      },

      overallFeedbackPerResponse:
        'Your response demonstrated a good understanding of the key skills required for the role. To achieve a higher score, consider providing more detailed examples using the STAR method (Situation, Task, Action, Result). By elaborating on specific situations, the tasks you undertook, the actions you implemented, and the results you achieved, you can more effectively showcase your skills and potential value to our team. For example, detailing a situation where you successfully managed a critical project, the tasks you handled, the actions you took to ensure project success, and the positive outcomes achieved would enhance your response.',
      overallScorePerResponse: 4,
    }

    let prompt = `You are an AI trained to provide feedback on interview responses.  If the answer is bad or doesn't make sense, automatically give it a score of 1. Your feedback and score should be based on the STAR method and also be in a specific JSON format with no period at the end of the JSON. The format is as follows: ${JSON.stringify(
      rubricResponseTemplate
    )}. Do not give any 0 values for the score. The score must be 1-5 and whole number scores. Provide feedback to this answer "${answer}" for this question "${question}" and your response must follow this JSON structure: ${rubricResponseTemplate}`

    let attempts = 0;
    let success = false;
    let feedbackJson;
    let data;
    
    while (attempts < 3 && !success) {
      try {
        let result = await model.generateContent(prompt);
        feedbackJson = JSON.parse(result.response.text());
        data = feedbackJson;
        success = true;
      } catch (error) {
        console.log(error);
        attempts++;
      }
    }
    
    if (success) {
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data, error: null });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ success: false, data: null, error: 'Failed after 3 attempts' });
    }
  }

  const handleViewSampleAnswer = async (req: Request, res: Response) => {
    let question = req.body.question
    let role = req.body.role
    const rubricResponseTemplate = {
      skillsFeedback: {
        communicationFeedback:
          'Your communication skills are exemplary. You effectively used the STAR method (Situation, Task, Action, Result) to describe specific instances where your communication was vital. Your detailed and structured response clearly demonstrated your ability to convey information and achieve results through effective communication. For example, describing a situation where you had to present a complex project update to stakeholders, the steps you took to prepare, how you communicated the key points, and the positive feedback or successful project outcome would further illustrate your skills.',
        teamworkFeedback:
          "You demonstrated good teamwork skills by using the STAR method to describe your contributions to team achievements and challenges. To achieve a perfect score, you could provide more detailed examples of your specific actions and the results that followed. For instance, describing a situation where your team faced a tight deadline, the collaborative efforts you initiated, your specific contributions, and the project's successful completion would highlight your teamwork abilities.",
        problemSolvingFeedback:
          'Your response showed a basic understanding of problem-solving. To improve your score, use the STAR method to elaborate on your approach, decision-making process, and the unique solutions you have developed in the past. Providing specific examples will help illustrate your problem-solving skills more effectively. For example, detailing a situation where you identified a critical issue, the analysis you conducted, the innovative solution you proposed, and the subsequent positive impact on the project would demonstrate your problem-solving capabilities.',
        leadershipFeedback:
          'Your response indicated some leadership experience, but it lacked specific examples. To improve your score, use the STAR method to describe situations where you led a team or project, the tasks you were responsible for, the actions you took, and the results of your leadership efforts. For instance, explaining a situation where you had to lead a cross-functional team, the strategies you employed to keep the team motivated, how you managed challenges, and the successful project outcome would illustrate your leadership skills.',
        creativityFeedback:
          'Your response did not sufficiently demonstrate your creativity. To improve your score, use the STAR method to include specific instances where you came up with innovative solutions or ideas. Describe the situation that required creativity, the task at hand, the creative actions you took, and the successful outcome of your creativity. For example, detailing a situation where you introduced a new process or tool to streamline operations, the implementation steps, and the resultant efficiency improvements would highlight your creativity.',
        adaptabilityFeedback:
          'Your response clearly demonstrated your adaptability, using the STAR method to provide detailed examples of how you have adapted to changes and overcome challenges. Your structured approach and clear results showcase your strong adaptability skills effectively. For example, describing a situation where you had to quickly adapt to a significant project scope change, the adjustments you made, how you communicated these changes to your team, and the successful project delivery would further demonstrate your adaptability.',
      },

      skillsScore: {
        communicationScore: 5,
        teamworkScore: 4,
        problemSolvingScore: 3,
        leadershipScore: 2,
        creativityScore: 1,
        adaptabilityScore: 5,
      },

      overallFeedbackPerResponse:
        'Your response demonstrated a good understanding of the key skills required for the role. To achieve a higher score, consider providing more detailed examples using the STAR method (Situation, Task, Action, Result). By elaborating on specific situations, the tasks you undertook, the actions you implemented, and the results you achieved, you can more effectively showcase your skills and potential value to our team. For example, detailing a situation where you successfully managed a critical project, the tasks you handled, the actions you took to ensure project success, and the positive outcomes achieved would enhance your response.',
      overallScorePerResponse: 4,
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_AI_API_KEY ? process.env.GOOGLE_AI_API_KEY : ''
    )
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const generateResponsePrompt = `The question is "${question}". You must generate a 5/5 score response using this STAR framework, "${rubricResponseTemplate.toString()}", for the ${role} job role. Go straight to the answer in the Situation: Task: Action: Result: format with sufficient spaces between the 4 sections. Make sure the sample answer is a 5/5 score, and is the best answer possible.`
    try {
      const result = await model.generateContent(generateResponsePrompt)
      const response = result.response
      const responseString = response.text()
      const data: any = responseString
      if (data instanceof Error) throw data
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data, error: null })
    } catch (error) {
      console.log(error)
    }
  }

  const handleReviewAnswer = async (req: Request, res: Response) => {
    let question = req.body.question
    let answer = req.body.answer
    const rubricResponseTemplate = {
      skillsFeedback: {
        communicationFeedback:
          'Your communication skills are exemplary. You effectively used the STAR method (Situation, Task, Action, Result) to describe specific instances where your communication was vital. Your detailed and structured response clearly demonstrated your ability to convey information and achieve results through effective communication. For example, describing a situation where you had to present a complex project update to stakeholders, the steps you took to prepare, how you communicated the key points, and the positive feedback or successful project outcome would further illustrate your skills.',
        teamworkFeedback:
          "You demonstrated good teamwork skills by using the STAR method to describe your contributions to team achievements and challenges. To achieve a perfect score, you could provide more detailed examples of your specific actions and the results that followed. For instance, describing a situation where your team faced a tight deadline, the collaborative efforts you initiated, your specific contributions, and the project's successful completion would highlight your teamwork abilities.",
        problemSolvingFeedback:
          'Your response showed a basic understanding of problem-solving. To improve your score, use the STAR method to elaborate on your approach, decision-making process, and the unique solutions you have developed in the past. Providing specific examples will help illustrate your problem-solving skills more effectively. For example, detailing a situation where you identified a critical issue, the analysis you conducted, the innovative solution you proposed, and the subsequent positive impact on the project would demonstrate your problem-solving capabilities.',
        leadershipFeedback:
          'Your response indicated some leadership experience, but it lacked specific examples. To improve your score, use the STAR method to describe situations where you led a team or project, the tasks you were responsible for, the actions you took, and the results of your leadership efforts. For instance, explaining a situation where you had to lead a cross-functional team, the strategies you employed to keep the team motivated, how you managed challenges, and the successful project outcome would illustrate your leadership skills.',
        creativityFeedback:
          'Your response did not sufficiently demonstrate your creativity. To improve your score, use the STAR method to include specific instances where you came up with innovative solutions or ideas. Describe the situation that required creativity, the task at hand, the creative actions you took, and the successful outcome of your creativity. For example, detailing a situation where you introduced a new process or tool to streamline operations, the implementation steps, and the resultant efficiency improvements would highlight your creativity.',
        adaptabilityFeedback:
          'Your response clearly demonstrated your adaptability, using the STAR method to provide detailed examples of how you have adapted to changes and overcome challenges. Your structured approach and clear results showcase your strong adaptability skills effectively. For example, describing a situation where you had to quickly adapt to a significant project scope change, the adjustments you made, how you communicated these changes to your team, and the successful project delivery would further demonstrate your adaptability.',
      },

      skillsScore: {
        communicationScore: 5,
        teamworkScore: 4,
        problemSolvingScore: 3,
        leadershipScore: 2,
        creativityScore: 1,
        adaptabilityScore: 5,
      },

      overallFeedbackPerResponse:
        'Your response demonstrated a good understanding of the key skills required for the role. To achieve a higher score, consider providing more detailed examples using the STAR method (Situation, Task, Action, Result). By elaborating on specific situations, the tasks you undertook, the actions you implemented, and the results you achieved, you can more effectively showcase your skills and potential value to our team. For example, detailing a situation where you successfully managed a critical project, the tasks you handled, the actions you took to ensure project success, and the positive outcomes achieved would enhance your response.',
      overallScorePerResponse: 4,
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_AI_API_KEY ? process.env.GOOGLE_AI_API_KEY : ''
    )
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const generateFeedbackPrompt = `The question is "${question}" and the answer is "${answer}". Provide feedback using this STAR framework "${rubricResponseTemplate}", you must give feedback in 1-2 short sentence, and you must give a rating out of 5 at the end. If the question is null or doesn't make sense, you must give a rating of 0/5. You must provide helpful tips for improving the answer. If the question is blank, null or doesn't make sense, then the response must tell the user to input a proper question. Always put the score at the end of the feedback where it says "**Rating: #/5**".`

    try {
      const result = await model.generateContent(generateFeedbackPrompt)
      const response = result.response
      const responseString = response.text()
      const data: any = responseString
      if (data instanceof Error) throw data // where should this line go? What is the purpose of this?
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data, error: null })
    } catch (error) {
      console.log(error)
    }
  }

  const handleViewEnhancedAnswer = async (req: Request, res: Response) => {
    let question = req.body.question
    let answer = req.body.answer

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_AI_API_KEY ? process.env.GOOGLE_AI_API_KEY : ''
    )
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const rubricResponseTemplate = {
      skillsFeedback: {
        communicationFeedback:
          'Your communication skills are exemplary. You effectively used the STAR method (Situation, Task, Action, Result) to describe specific instances where your communication was vital. Your detailed and structured response clearly demonstrated your ability to convey information and achieve results through effective communication. For example, describing a situation where you had to present a complex project update to stakeholders, the steps you took to prepare, how you communicated the key points, and the positive feedback or successful project outcome would further illustrate your skills.',
        teamworkFeedback:
          "You demonstrated good teamwork skills by using the STAR method to describe your contributions to team achievements and challenges. To achieve a perfect score, you could provide more detailed examples of your specific actions and the results that followed. For instance, describing a situation where your team faced a tight deadline, the collaborative efforts you initiated, your specific contributions, and the project's successful completion would highlight your teamwork abilities.",
        problemSolvingFeedback:
          'Your response showed a basic understanding of problem-solving. To improve your score, use the STAR method to elaborate on your approach, decision-making process, and the unique solutions you have developed in the past. Providing specific examples will help illustrate your problem-solving skills more effectively. For example, detailing a situation where you identified a critical issue, the analysis you conducted, the innovative solution you proposed, and the subsequent positive impact on the project would demonstrate your problem-solving capabilities.',
        leadershipFeedback:
          'Your response indicated some leadership experience, but it lacked specific examples. To improve your score, use the STAR method to describe situations where you led a team or project, the tasks you were responsible for, the actions you took, and the results of your leadership efforts. For instance, explaining a situation where you had to lead a cross-functional team, the strategies you employed to keep the team motivated, how you managed challenges, and the successful project outcome would illustrate your leadership skills.',
        creativityFeedback:
          'Your response did not sufficiently demonstrate your creativity. To improve your score, use the STAR method to include specific instances where you came up with innovative solutions or ideas. Describe the situation that required creativity, the task at hand, the creative actions you took, and the successful outcome of your creativity. For example, detailing a situation where you introduced a new process or tool to streamline operations, the implementation steps, and the resultant efficiency improvements would highlight your creativity.',
        adaptabilityFeedback:
          'Your response clearly demonstrated your adaptability, using the STAR method to provide detailed examples of how you have adapted to changes and overcome challenges. Your structured approach and clear results showcase your strong adaptability skills effectively. For example, describing a situation where you had to quickly adapt to a significant project scope change, the adjustments you made, how you communicated these changes to your team, and the successful project delivery would further demonstrate your adaptability.',
      },

      skillsScore: {
        communicationScore: 5,
        teamworkScore: 4,
        problemSolvingScore: 3,
        leadershipScore: 2,
        creativityScore: 1,
        adaptabilityScore: 5,
      },

      overallFeedbackPerResponse:
        'Your response demonstrated a good understanding of the key skills required for the role. To achieve a higher score, consider providing more detailed examples using the STAR method (Situation, Task, Action, Result). By elaborating on specific situations, the tasks you undertook, the actions you implemented, and the results you achieved, you can more effectively showcase your skills and potential value to our team. For example, detailing a situation where you successfully managed a critical project, the tasks you handled, the actions you took to ensure project success, and the positive outcomes achieved would enhance your response.',
      overallScorePerResponse: 4,
    }
    const generateFeedbackPrompt = `Given this interview question "${question}", and this answer from the user "${answer}". Please enhance the answer so that it would be a 5/5 based on the STAR interview framework and this framework "${rubricResponseTemplate}". Only give me the enhanced answer string, and nothing more. Keep your enhanced answer short and concise.`

    try {
      const result = await model.generateContent(generateFeedbackPrompt)
      const response = result.response
      const responseString = response.text()
      const data: any = responseString
      if (data instanceof Error) throw data
      return res
        .status(StatusCodes.OK)
        .send({ success: true, data, error: null })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleGoogleTts,
    handleGoogleStt,
    generateQuestions,
    handleFeedback,
    handleViewSampleAnswer,
    handleReviewAnswer,
    handleViewEnhancedAnswer,
  }
}

export default googleAIController
