import { useAuthContext } from "../context/AuthContext"

const ProfilePage = () => {
  const { authUser } = useAuthContext()

  return (
    <div className="h-dvh p-10 md:p-20 lg:p-32">
      <div className="bg-neutral-100/50 w-full p-10 md:w-[500px] rounded-md shadow-xl  flex flex-col items-center gap-5 border-2 border-black">
        <h1 className="text-xl md:text-2xl lg:text-3xl">Profile Settings</h1>
        <img
          src={authUser?.profilePic}
          alt={authUser?.id}
          className="w-32 h-32 border-4 border-emerald-400 rounded-full "
        />
        <form className="flex flex-col w-full gap-3">
          <input
            type="text"
            value={authUser?.fullName}
            className="p-2 bg-neutral-100 rounded-md border-2 border-neutral-900 outline-none text-neutral-700"
          />
          <input
            type="text"
            value={authUser?.userName}
            className="p-2 bg-neutral-100 rounded-md border-2 border-neutral-900 outline-none text-neutral-700"
          />
          <div className="flex items-center gap-3 w-full mt-5">
            <button className="w-full px-3 py-2 bg-emerald-400 shadow-xl rounded-md">
              Save Changes
            </button>
            <button className="w-full px-3 py-2 bg-rose-400 shadow-xl rounded-md">
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
