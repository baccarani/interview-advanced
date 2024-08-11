import { useGetFeedbackAll } from './hooks/useGetFeedbackAll'

export const Feedback = () => {
  const { data, error, isLoading } = useGetFeedbackAll()

  if (isLoading) return <p>Loading</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <ul>{data ? <p>{JSON.stringify(data)}</p> : null}</ul>
    </div>
  )
}
