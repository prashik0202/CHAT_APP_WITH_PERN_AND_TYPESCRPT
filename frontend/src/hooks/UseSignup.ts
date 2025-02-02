import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { SigninInputs } from "../types"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const { setAuthUser } = useAuthContext()

  const signup = async (inputs: SigninInputs) => {
    try {
      setLoading(true)
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error)
      }

      setAuthUser(data)
      toast("User created")
      return navigate("/chat")
    } catch (error: any) {
      console.error(error.message)
      toast.error(error.message)
      return navigate("/login")
    } finally {
      setLoading(false)
    }
  }
  return { loading, signup }
}
