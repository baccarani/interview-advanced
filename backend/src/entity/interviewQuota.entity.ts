interface InterviewQuota {
  sub?: string
  availableInterviews: number
  usedInterviews: number
}

const interviewQuota = ({
  availableInterviews,
  sub,
  usedInterviews,
}: InterviewQuota) => {
  return {
    getSub: () => sub,
    getAvailableInterviews: () => availableInterviews,
    getUsedInterviews: () => usedInterviews,
  }
}

export default interviewQuota
