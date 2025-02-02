import useConversation, { MessageType } from "../../../zustand/useConversation"
import { useAuthContext } from "../../../context/AuthContext"

interface MessageProps {
  message: MessageType
}

const Message = ({ message }: MessageProps) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()

  const fromMe = message.senderId === authUser?.id
  const img = fromMe ? authUser.profilePic : selectedConversation?.profilePic

  return (
    <div
      className={`flex flex-col ${fromMe ? "items-end" : "items-start"} w-full`}
    >
      <div className="flex items-center justify-start gap-2 mb-1">
        <img src={img} alt="profile" className="h-4 w-4" />
        <h1 className="text-sm">
          {message.senderId === authUser?.id
            ? "you"
            : selectedConversation?.fullName}
        </h1>
      </div>
      <div
        className={`text-white font-medium text-lg shadow-xl p-2 w-fit max-w-[600px] text-wrap ${fromMe ? "rounded-l-xl rounded-br-xl bg-emerald-600" : "rounded-r-xl rounded-bl-xl bg-sky-600"}`}
      >
        {message.body}
      </div>
    </div>
  )
}

export default Message
