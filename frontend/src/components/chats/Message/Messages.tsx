import useGetMessages from "../../../hooks/useGetMessages"
import useListenMessages from "../../../hooks/useListenMessages"
import { Loader2 } from "lucide-react"
import Message from "./Message"
import useChatScroll from "../../../hooks/useChatScroll"

const Messages = () => {
  const { loading, messages } = useGetMessages()
  useListenMessages()

  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;


  return (
    <div className="h-full overflow-y-auto p-4 flex flex-col w-full gap-2" ref={ref}>
      {loading && <Loader2 className="animate-spin h-10 w-10" />}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages
