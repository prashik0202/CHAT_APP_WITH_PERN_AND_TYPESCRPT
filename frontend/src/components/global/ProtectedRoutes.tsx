import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { authUser, isLoading } = useAuthContext()
  const location = useLocation()

  if (isLoading) {
    // Optionally render a loading spinner
    return <div>Loading...</div>
  }

  if (!authUser) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Render the protected children if authenticated
  return (
    <div className="w-full flex flex-col items-center bg-yellow-50">
      {children}
    </div>
  )
}

export default ProtectedRoutes
