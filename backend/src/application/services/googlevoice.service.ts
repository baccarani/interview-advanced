const googleVoiceService = (service: any) => {
  const textToSpeech = async (input: string) =>
    await service.textToSpeech(input)

  const speechToText = async (token: string, audioChannelCount: number) =>
    await service.speechToText(token, audioChannelCount)

  return { textToSpeech, speechToText }
}

export default googleVoiceService
