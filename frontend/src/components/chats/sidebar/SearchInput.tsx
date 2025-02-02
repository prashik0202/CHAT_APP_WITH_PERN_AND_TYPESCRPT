import { SearchIcon } from "lucide-react"
import { FormEvent, useState } from "react"
import useConversation from "../../../zustand/useConversation"
import { useGetConversation } from "../../../hooks/useGetConversation"
import toast from "react-hot-toast"

const SearchInput = () => {
  const [search, setSearch] = useState<string>("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error("Please provide more data")
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    )

    if (conversation) {
      console.log(conversation)
      setSelectedConversation(conversation)
      setSearch("")
    } else {
      toast.error("No such user found")
    }
  }

  return (
    <form
      className="flex justify-between items-center gap-2 shadow-xl py-2 px-3 rounded-md border-2 border-neutral-800"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full bg-transparent outline-none"
        placeholder="Search People..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <SearchIcon className="w-4 h-4" />
      </button>
    </form>
  )
}

export default SearchInput
