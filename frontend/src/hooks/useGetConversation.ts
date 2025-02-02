import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const useGetConversation = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState<ConversationType[]>([])

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/v1/messages/conversation")
        const data = await res.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setConversations(data)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getConversations()
  }, [])

  return { loading, conversations }
}
