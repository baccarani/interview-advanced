export const speechToText = async (
  voiceService: any,
  input: string,
  userAgent: string
) => {
  let audioChannelCount = 2
  if (userAgent.toLowerCase().includes('chrome')) {
    audioChannelCount = 1
  } else if (userAgent.toLowerCase().includes('safari')) {
    audioChannelCount = 1
  } else if (userAgent.toLowerCase().includes('edge')) {
    audioChannelCount = 1
  }
  try {
    return await voiceService.speechToText(input, audioChannelCount)
  } catch (e) {
    return e
  }
}
