import { Loader2, SendIcon } from "lucide-react"
import { useState } from "react"
import useSendMessage from "../../../hooks/useSendMessage"

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage()
  const [message, setMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form
      className="w-full p-5 flex flex-row gap-2 justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full p-2 outline-none border-2 border-black rounded-md"
        placeholder="👋 Send message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="bg-black p-3 rounded-md">
        {loading ? (
          <Loader2 className="text-white h-7 w-7 animate-spin" />
        ) : (
          <SendIcon className="text-white" />
        )}
      </button>
    </form>
  )
}

export default MessageInput
