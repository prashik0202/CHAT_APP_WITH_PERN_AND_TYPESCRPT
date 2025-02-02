import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return
      setLoading(true)
      setMessages([])
      try {
        const response = await fetch(
          `/api/v1/messages/${selectedConversation.id}`
        )
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || "An error occured")
        setMessages(data)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    getMessages()
  }, [selectedConversation, setMessages])

  return { loading, messages }
}

export default useGetMessages
