import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { LoginInInputs } from "../types"
import toast from "react-hot-toast"

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setAuthUser } = useAuthContext()

  const login = async (inputs: LoginInInputs) => {
    try {
      setLoading(true)
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      if (!res.ok) {
        const errorData = data.error
        toast.error(errorData)
        throw new Error(data.error)
      }
      console.log(data)
      setAuthUser(data)
      toast.success("Login Success")
      setLoading(false)
    } catch (error: any) {
      console.error(error.message)
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return { loading, login }
}

export default useLogin
