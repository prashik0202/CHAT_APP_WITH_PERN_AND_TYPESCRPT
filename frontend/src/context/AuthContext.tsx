import {
  useContext,
  useEffect,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
} from "react"
import { AuthUserType } from "../types"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext<{
  authUser: AuthUserType | null
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
  isLoading: boolean
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
})

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within authContextProvider")
  }
  return context
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null)
  const [isLoading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/v1/auth/me")
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error)
        }
        const data = await res.json()
        setAuthUser(data)
        setLoading(false)
        // return navigate("/chat")
      } catch (error: any) {
        return navigate("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchAuthUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
