import { OpenaiModelTypes } from '@/services/OpenaiModelTypes'

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

export const feedbackFormatter = (input: Array<string>) => {
  let messages = [
    {
      role: 'system',
      content: `You are an AI trained to provide feedback on interview responses. Your feedback and score should be based on the STAR method and also be in a specific JSON format with no period at the end of the JSON. The format is as follows: ${JSON.stringify(
        rubricResponseTemplate
      )}. Do not give any 0 values for the score. The score must be 1-5 and whole number scores.`,
    },
    {
      role: 'user',
      content: `Provide feedback to this answer "${
        input[1]
      }" for this question "${
        input[0]
      }" and your response must follow this JSON structure: ${JSON.stringify(
        rubricResponseTemplate
      )}`,
    },
  ]

  return { messages, model: OpenaiModelTypes.GPT_4o }
}
