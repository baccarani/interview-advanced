import { createContext, Dispatch, useContext, useReducer } from 'react'

type AuthProviderState = {
  auth: boolean
  token: string | null
}

type AuthProviderProps = {
  children: React.ReactNode
}

type Action =
  | { type: 'update_auth'; payload: boolean }
  | { type: 'update_token'; payload: string | null }
  | { type: 'reset_auth'; payload: null }

const initialState: AuthProviderState = {
  auth: false,
  token: null,
}

const reducer = (
  state: AuthProviderState,
  action: Action
): AuthProviderState => {
  switch (action.type) {
    case 'update_auth':
      return { ...state, auth: action.payload }
    case 'update_token':
      return { ...state, token: action.payload }
    case 'reset_auth':
      return initialState
    default:
      return state
  }
}

const AuthContext = createContext<{
  state: AuthProviderState
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider
      {...props}
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
