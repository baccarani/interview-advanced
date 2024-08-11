import { useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { PastInterviewCard } from './PastInterviewCard'
import { useGetInterviewsByUserId } from '../../api/hooks_common/useGetInterviewByUserId'
import { PastInterviewSortSelect } from './PastInterviewSortSelect'
import { CustomPagination } from '../pagination/Pagination'
import NoResults from '@/assets/no-results.png'
import { Link, useLocation } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  renderTrigger?: boolean
  setRenderTrigger?: React.Dispatch<React.SetStateAction<boolean>>
}

export const PastInterview = ({ renderTrigger, setRenderTrigger }: Props) => {
  const [page, setPage] = useState<number>(1)
  const [query, setQuery] = useState<string>('sort=_id&order=desc')
  const { toast } = useToast()
  const location = useLocation()

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (location.pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  const showToast = (type: 'success' | 'error', message: string) => {
    toast({
      title: type === 'success' ? 'Success' : 'Error',
      description: <>{message}</>,
      action: <ToastAction altText='Close'>Close</ToastAction>,
    })
  }

  const selectHandler = (e: string) => {
    switch (e) {
      case 'recent':
        setQuery('sort=_id&order=desc')
        break
      case 'oldest':
        setQuery('sort=_id&order=asc')
        break
      case 'in-progress':
        setQuery('interviewState=in-progress&sort=_id&order=desc')
        break
      case 'completed':
        setQuery('interviewState=completed&sort=_id&order=desc')
        break
      default:
        setQuery('sort=_id&order=desc')
        break
    }
    setPage(1)
  }

  const { data, error } = useGetInterviewsByUserId(page, query, renderTrigger)

  if (error) return <p>{error.messag}</p>

  return (
    <>
      <h2 className='text-3xl leading-tight mb-2'>
        <span className='font-semibold'>Past Interviews</span>
      </h2>
      <div className='flex items-center'>
        <PastInterviewSortSelect selectHandler={selectHandler} />
      </div>
      {!data ? (
        <div className='w-full h-[400px]'>
          <Skeleton className='w-full h-full' />
        </div>
      ) : (
        <>
          {data?.interviews.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-10'>
              <img
                src={NoResults}
                className='block mx-auto p-4'
                alt='No results'
              />
              <p className='text-center font-light text-xl'>No Data Found.</p>
              <Link
                to='/'
                onClick={handleClick}
                className={`${buttonVariants({
                  variant: 'default',
                })} flex justify-center items-center mt-12`}
              >
                Start New Interview
              </Link>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 mb-2'>
                {data?.interviews.map((interview) => {
                  return (
                    <PastInterviewCard
                      interview={interview}
                      key={interview._id}
                      setRenderTrigger={setRenderTrigger}
                      showToast={showToast}
                    />
                  )
                })}
              </div>
              <CustomPagination
                totalCount={data?.totalCount || 1}
                setCurrentPage={setPage}
                currentPage={page}
                perPageCount={4}
              />
            </>
          )}
        </>
      )}
    </>
  )
}
