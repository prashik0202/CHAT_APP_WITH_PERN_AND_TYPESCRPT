import React from "react"
import { useAuthContext } from "../../context/AuthContext"
import { MessageCircle } from "lucide-react"

const WelcomeMessage = () => {
  const { authUser } = useAuthContext()

  return (
    <React.Fragment>
      <MessageCircle className="h-16 w-16 text-emerald-500 mb-5 animate-bounce" />
      <h1 className="text-xl md:text-3xl">
        Welcome <span className="text-sky-600">{authUser?.fullName}</span>!
      </h1>
      <p className="text-md md:text-xl mt-2">select chat to start messaging</p>
    </React.Fragment>
  )
}

export default WelcomeMessage
