import useConversation from "../../../zustand/useConversation"
import WelcomeMessage from "../../global/WelcomeMessage"
import MessageInput from "./MessageInput"
import Messages from "./Messages"

const MessageContainer = () => {
  // get selected conversatios from sidebar
  const { selectedConversation } = useConversation()

  if (!selectedConversation) {
    return (
      <div className="p-5 w-full flex flex-col items-center justify-center">
        <WelcomeMessage />
      </div>
    )
  } else {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-between">
        {/* header */}
        <div className="w-full p-2 flex flex-row item-start gap-3 items-center border-b-2 border-black">
          <img
            src={selectedConversation.profilePic}
            alt={selectedConversation.fullName}
            className="h-10 w-10"
          />
          <h1 className="text-lg">{selectedConversation.fullName}</h1>
        </div>
        {/* messages */}
        <Messages />
        {/* message input */}
        <MessageInput />
      </div>
    )
  }
}

export default MessageContainer
