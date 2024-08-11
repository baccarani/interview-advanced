export const formatDataForApi = (
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
  } role ${addFirstQuestion} there is no numbering, no bullets, no quotes, no spaces, and the ${questionCount} questions MUST be separated by semicolons and have proper spaces. Each question MUST have a "?" at the end.`

  if (roleInformation.roleDescription) {
    promptContent += ` The role description is as follows: ${roleInformation.roleDescription}.`
  }

  return {
    content: promptContent,
    role: 'system',
  }
}

export const formatDataReceivedFromAPI = (
  data: Array<string>
): Array<{ role: string; content: string }> => {
  return data.map((node) => {
    return { role: 'assistant', content: node }
  })
}

export default formatDataForApi
