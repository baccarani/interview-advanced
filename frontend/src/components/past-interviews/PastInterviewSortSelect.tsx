import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type Props = {
  selectHandler: (e: string) => void
}

export const PastInterviewSortSelect = ({ selectHandler }: Props) => {
  return (
    <Select onValueChange={selectHandler}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Recent' />
      </SelectTrigger>
      <SelectContent defaultValue={1}>
        <SelectItem value='recent'>Recent</SelectItem>
        <SelectItem value='oldest'>Oldest</SelectItem>
        <SelectItem value='in-progress'>In Progress</SelectItem>
        <SelectItem value='completed'>Completed</SelectItem>
      </SelectContent>
    </Select>
  )
}
