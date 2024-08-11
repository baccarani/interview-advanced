// import LoaderCustom from '@/commons/components/LoaderCustom'
// import useGetInterviewQuota from '@/components/interview-quota/hooks/useGetInterviewQuota'
import RoleSelector from '@/components/role-selector/RoleSelector'

const InterviewSetup = () => {
  // const { data, loading, error } = useGetInterviewQuota()
  // if (loading) return <LoaderCustom />
  // if (error) return <p>{error.message}</p>
  return <RoleSelector availableInterviews={1} />
}

export default InterviewSetup
