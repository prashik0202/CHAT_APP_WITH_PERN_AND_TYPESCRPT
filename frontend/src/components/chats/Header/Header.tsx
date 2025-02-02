import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../../context/AuthContext"
import Logout from "../../global/Logout"

const Header = () => {
  const navigate = useNavigate()
  const { authUser, isLoading } = useAuthContext()

  return (
    <div className="flex items-center justify-between  gap-5 w-full">
      <div className="flex items-center gap-3">
        <img
          src={isLoading ? "Loading" : authUser?.profilePic}
          alt={authUser?.userName + "profile"}
          className="h-10 w-10 shadow-xl rounded-full hover:cursor-pointer"
          loading="lazy"
          onClick={() => navigate("/profile")}
        />
        <h1 className="text-lg">{authUser?.userName}</h1>
      </div>
      <Logout />
    </div>
  )
}

export default Header
