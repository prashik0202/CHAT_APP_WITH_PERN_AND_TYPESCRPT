import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate("/chat")
  }
  return (
    <div className="h-dvh bg-yellow-50 flex flex-col items-center justify-center gap-5">
      <h1 className="text-center text-5xl md:text-7xl lg:text-8xl">
        Prash_CHAT
      </h1>
      <p>chat_with_your_friends_with_ease</p>
      <button
        className="bg-neutral-900 text-white rounded-md py-2 px-3 flex flex-row gap-3"
        onClick={handleStart}
      >
        Get Started
      </button>
    </div>
  )
}

export default HomePage
