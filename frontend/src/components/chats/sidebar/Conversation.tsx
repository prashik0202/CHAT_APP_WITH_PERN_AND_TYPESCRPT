import { useSocketContext } from "../../../context/SocketContext"
import useConversation from "../../../zustand/useConversation"

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?.id === conversation.id

  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(conversation.id)

  return (
    <>
      <div
        className={`w-full flex gap-2 items-center hover:shadow-xl rounded p-2
				 py-1 cursor-pointer border-l-8  ${isSelected ? "border-emerald-500" : "border-black"}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="w-12 h-12 rounded-full">
          <img
            src={conversation.profilePic}
            alt="user avatar"
            className={
              isOnline ? "rounded-full border-emerald-500 border-4" : ""
            }
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black text-sm md:text-md">
              {conversation.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  )
}

export default Conversation
