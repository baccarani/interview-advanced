import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  Dispatch,
} from 'react'

type RoleState = {
  roleName: string | null
  roleDescription: string
}

type InterviewState = {
  interviewId: string | null
  interviewData: {
    state: string
    interviewResponses: { question: string; answer: string; category: string }[]
    interviewOptions: {
      questionCount: number
      questionType: string
      skipFirst: boolean
      questionDifficulty: string
    }
  } | null
}

type InterviewFlowReducerState = {
  roleInformation: RoleState
  interviewInformation: InterviewState
}

type Action =
  | { type: 'update_role_name'; payload: string | null }
  | { type: 'update_role_description'; payload: string }
  | { type: 'update_interview_id'; payload: string }
  | {
      type: 'update_interview_options'
      payload: {
        questionCount?: number
        questionType?: string
        skipFirst?: boolean
        questionDifficulty?: string
      }
    }
  | { type: 'reset_flow'; payload: null }

const initialState: InterviewFlowReducerState = {
  roleInformation: {
    roleName: null,
    roleDescription: '',
  },
  interviewInformation: {
    interviewId: null,
    interviewData: {
      state: '',
      interviewResponses: [],
      interviewOptions: {
        questionCount: 3,
        questionType: 'Mixed',
        skipFirst: false,
        questionDifficulty: 'Medium',
      },
    },
  },
}

const reducer = (
  state: InterviewFlowReducerState,
  action: Action
): InterviewFlowReducerState => {
  switch (action.type) {
    case 'update_role_name':
      return {
        ...state,
        roleInformation: {
          ...state.roleInformation,
          roleName: action.payload,
        },
      }
    case 'update_role_description':
      return {
        ...state,
        roleInformation: {
          ...state.roleInformation,
          roleDescription: action.payload,
        },
      }
    case 'update_interview_id':
      return {
        ...state,
        interviewInformation: {
          ...state.interviewInformation,
          interviewId: action.payload,
        },
      }
    case 'update_interview_options':
      return {
        ...state,
        interviewInformation: {
          ...state.interviewInformation,
          interviewData: state.interviewInformation?.interviewData
            ? {
                ...state.interviewInformation.interviewData,
                interviewOptions: {
                  ...state.interviewInformation.interviewData.interviewOptions,
                  ...action.payload,
                },
              }
            : null,
        },
      }
    case 'reset_flow':
      return initialState
    default:
      return state
  }
}

const InterviewContext = createContext<{
  state: InterviewFlowReducerState
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => null })

export const InterviewProvider = ({
  children,
  ...props
}: {
  children?: ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <InterviewContext.Provider
      value={{
        state,
        dispatch,
      }}
      {...props}
    >
      {children}
    </InterviewContext.Provider>
  )
}

export const useInterview = () => {
  const context = useContext(InterviewContext)

  if (context === undefined)
    throw new Error('useInterview must be used within the InterviewProvider')

  return context
}
