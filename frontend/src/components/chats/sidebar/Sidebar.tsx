import Conversations from "./Conversations"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className="w-[450px] p-5 border-r-2 border-black">
      {/* search input */}
      <SearchInput />
      {/* conversations */}
      <Conversations />
    </div>
  )
}

export default Sidebar
