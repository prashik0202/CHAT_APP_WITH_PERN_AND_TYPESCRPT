import { useGetConversation } from "../../../hooks/useGetConversation"
import { Loader2 } from "lucide-react"
import Conversation from "./Conversation"

const Conversations = () => {
  const { loading, conversations } = useGetConversation()

  return (
    <div className="flex flex-col  items-center overflow-y-auto gap-1 mt-5">
      {conversations &&
        conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      {loading && <Loader2 className="h-10 w-10 animate-spin" />}
    </div>
  )
}

export default Conversations
