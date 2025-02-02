import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="h-dvh flex flex-row items-center justify-center bg-yellow-50">
      <Outlet />
    </div>
  )
}

export default AuthLayout
