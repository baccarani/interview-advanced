import { AxiosInstance, GenericAbortSignal } from 'axios'

export const aiAPI = {
  speechToText: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    data: any
  ): Promise<any | Error> => {
    try {
      const resp = await api.request({
        url: '/ai/stt',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data; boundary=XXX' },
        signal: cancel,
      })
      return resp
    } catch (e) {
      return e
    }
  },
  textToSpeech: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    data: { input: string }
  ): Promise<any | Error> => {
    try {
      const resp = await api.request({
        url: '/ai/tts',
        method: 'post',
        data,
        signal: cancel,
      })
      return resp.data.data
    } catch (e) {
      return e
    }
  },
  generateQuestions: async (
    api: AxiosInstance,
    cancel: GenericAbortSignal,
    data: {
      roleInformation: any
      interviewInformation: any
    }
  ): Promise<any | Error> => {
    try {
      const resp = await api.request({
        url: '/ai/completions/questions',
        signal: cancel,
        method: 'POST',
        data,
      })
      return resp
    } catch (e) {
      return e
    }
  },
}
