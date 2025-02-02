import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return
    setLoading(true)
    try {
      const response = await fetch(
        `/api/v1/messages/send/${selectedConversation.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      )
      const data = await response.json()
      setMessages([...messages, data])
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return { sendMessage, loading }
}

export default useSendMessage
