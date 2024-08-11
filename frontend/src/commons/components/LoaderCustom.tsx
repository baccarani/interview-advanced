import { Skeleton } from '@/components/ui/skeleton'

const LoaderCustom = () => {
  return (
    <div className='w-full h-[400px]'>
      <Skeleton className='w-full h-full' />
    </div>
  )
}

export default LoaderCustom
