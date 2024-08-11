import { Skeleton } from "../../../ui/skeleton";

const ChatBubbleLoading = () => {
  return (
    <>
      <div className="mb-4"><Skeleton className="w-1/6 h-[25px]" /></div>
      <div><Skeleton className="w-full h-[50px]" /></div>
    </>
  );
};

export default ChatBubbleLoading;