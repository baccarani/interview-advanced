import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '../ui/button'
import { Trash } from 'lucide-react'

type Props = {
  _id: string
  handleClick: (_id: string) => Promise<void>
}

export const PastInterviewDeletePopup = ({ _id, handleClick }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={
          buttonVariants({ variant: 'outline' }) +
          ' hover:bg-red-700 hover:text-white'
        }
      >
        <Trash size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='text-left'>
          <DialogTitle className='text-left'>
            Are you sure you want to delete this interview?
          </DialogTitle>
          <DialogDescription className='text-left'>
            This action cannot be undone. This will permanently delete this
            interview and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-end space-x-4'>
          <DialogClose>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button
            variant={'destructive'}
            className='bg-red-700'
            onClick={() => handleClick(_id)}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
