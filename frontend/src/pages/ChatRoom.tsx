import { lazy, Suspense } from "react"
import MessageContainer from "../components/chats/Message/MessageContainer"
import Sidebar from "../components/chats/sidebar/Sidebar"
import { Loader2 } from "lucide-react"

const HeaderLazyComponent = lazy(
  () => import("../components/chats/Header/Header")
)

const ChatRoom = () => {
  return (
    <div className="max-w-6xl h-dvh p-5 md:p-10  flex flex-col md:items-center gap-5 w-full">
      <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin" />}>
        <HeaderLazyComponent />
      </Suspense>
      <div className="w-full flex h-[850px] overflow-hidden rounded-xl shadow-xl bg-white/60 border-2 border-black">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default ChatRoom
