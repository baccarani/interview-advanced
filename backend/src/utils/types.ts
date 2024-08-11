export const uploadPaths = ['audio', 'resume'] as const
export type UploadPathTypes = (typeof uploadPaths)[number]

export const fileTypes = {
  audio: ['mp3', 'wav'],
  resume: ['pdf'],
} as const
export type AudioFileTypes = (typeof fileTypes.audio)[number]
export type ResumeFileTypes = (typeof fileTypes.resume)[number]
