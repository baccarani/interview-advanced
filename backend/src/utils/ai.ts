export const dataFormatterQuestions = (
  roleInformation: any,
  interviewInformation: any
) => {
  const questionCount =
    interviewInformation.interviewData?.interviewOptions.questionCount ?? 3
  const questionType =
    interviewInformation.interviewData?.interviewOptions.questionType ?? 'Mixed'
  const questionDifficulty =
    interviewInformation.interviewData?.interviewOptions.questionDifficulty ??
    'Medium'
  const skipFirst =
    interviewInformation.interviewData?.interviewOptions.skipFirst ?? false

  const addFirstQuestion = skipFirst
    ? `where you never ask introductory "Tell me about yourself? What qualifications do you bring to the opening?" or anything like that.`
    : `where the first question is "Tell me about yourself? What qualifications do you bring to the ${roleInformation.roleName} opening?"`

  let promptContent = `You must give me ${questionCount} ${
    questionType === 'Mixed' ? 'Mix of behavioral and technical' : questionType
  } and ${
    questionDifficulty === 'Advanced' ? 'Extremely Hard' : questionDifficulty
  } interview questions separated by semicolons, for the ${
    roleInformation.roleName
  } role ${addFirstQuestion} there is no numbering, no bullets, no quotes, and the ${questionCount} questions MUST be separated by semicolons and have proper spaces. Each question MUST have a "?" at the end. There MUST ONLY be semicolons to separate the questions. There MUST NOT be any semicolons inside the questions. There MUST BE zero semicolons inside the questions. The questions needs to be a single sentence what ends with a ?;. Remember, there MUST NOT BE ANY semicolons inside the questions, only at the end of the question.`

  if (roleInformation.roleDescription) {
    promptContent += ` The role description is as follows: ${roleInformation.roleDescription}.`
  }

  return {
    content: promptContent,
    role: 'system',
  }
}
