import axios from 'axios'
import config from '../../config/config'
import { postRequest } from '../../utils/axios'

const googleVoiceService = () => {
  // Google Text to Speech Service
  const textToSpeech = async (input: string) => {
    const payload = {
      audioConfig: {
        audioEncoding: 'MP3',
        effectsProfileId: ['small-bluetooth-speaker-class-device'],
        pitch: 0,
        speakingRate: 1,
      },
      input: {
        text: input,
      },
      voice: {
        languageCode: 'en-US',
        name: 'en-US-Studio-O',
      },
    }
    const resp = await postRequest(
      axios,
      `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${config.google.aiAPIKey}`,
      payload
    )
    return resp.data.audioContent
  }
  const speechToText = async (data: string, audioChannelCount: number) => {
    const payload = {
      config: {
        audioChannelCount,
        languageCode: 'en-US',
      },
      audio: {
        content: data,
      },
    }
    try {
      const resp = await postRequest(
        axios,
        `https://speech.googleapis.com/v1/speech:recognize?key=${config.google.aiAPIKey}`,
        payload
      )
      return resp.data
    } catch (e: any) {
      //Make OpenAI call here for TTS
      console.error(e.response.data)
      if (e instanceof Error) throw e
    }
  }
  return { textToSpeech, speechToText }
}
export default googleVoiceService
