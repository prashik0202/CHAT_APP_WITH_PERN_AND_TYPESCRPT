import { LogOutIcon } from "lucide-react"
import useLogout from "../../hooks/useLogout"

const Logout = () => {
  const { loading, logout } = useLogout()
  return (
    <button
      onClick={logout}
      disabled={loading}
      className="py-2 bg-neutral-800 rounded-md px-3 hover:bg-neutral-900 text-white text-sm flex items-center gap-2"
    >
      logout
      <LogOutIcon className="h-4 w-4" />
    </button>
  )
}

export default Logout
