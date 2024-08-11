interface ResponseCollection {
  question: string
  answer: string
  catergory: string
}

const interviewTranscript = ({
  sub,
  uuid,
  responseCollection,
}: {
  sub: string
  uuid: string
  responseCollection: ResponseCollection
}) => {
  return {
    getSub: () => sub,
    getUUID: () => uuid,
    getResponseCollection: () => responseCollection,
  }
}

export default interviewTranscript
