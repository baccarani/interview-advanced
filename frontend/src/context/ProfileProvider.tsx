import { createContext, useContext, useState } from 'react'

type Profile = {
  name: string
  email: string
  picture: string
  sub: string
  isNewUser: boolean
}

type ProfileProviderState = {
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

type ProfileProviderProps = {
  children: React.ReactNode
}

const initialState: ProfileProviderState = {
  profile: null,
  setProfile: () => null,
}

const ProfileContextProvider = createContext<ProfileProviderState>(initialState)

const ProfileProvider = ({ children, ...props }: ProfileProviderProps) => {
  const [profile, _setProfile] = useState<Profile | null>(null)

  const setProfile = (profile: Profile | null): void => {
    _setProfile(profile)
  }

  return (
    <ProfileContextProvider.Provider {...props} value={{ profile, setProfile }}>
      {children}
    </ProfileContextProvider.Provider>
  )
}

export const useProfile = () => {
  return useContext(ProfileContextProvider)
}

export default ProfileProvider
