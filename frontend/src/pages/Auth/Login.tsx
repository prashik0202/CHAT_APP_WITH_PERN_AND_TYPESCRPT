import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { validateLogin } from "../../utils/validation"
import { LoginInInputs } from "../../types"
import useLogin from "../../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"

const Login = () => {
  const { authUser } = useAuthContext()
  const naviagate = useNavigate()

  // states
  const [values, setValues] = useState({
    userName: "",
    password: "",
  })
  const [error, setError] = useState<LoginInInputs>()

  //hooks
  const { loading, login } = useLogin()

  useEffect(() => {
    if (authUser) {
      naviagate("/chat")
    }
  }, [authUser, naviagate])

  // handle Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // extract name and value from input elements
    const { name, value } = e.target

    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value }
      setError(validateLogin(updatedValues))
      return updatedValues
    })
  }
  // handle Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(values)
    login(values)
    naviagate("/chat")
  }
  return (
    <div className="flex flex-col items-center gap-5 bg-neutral-100/50 w-full md:max-w-[400px] p-7 rounded-md shadow-2xl">
      <h1 className="text-3xl">Login</h1>
      <form
        className="flex flex-col gap-5 items-start w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="userName"
          onChange={handleChange}
          className="border-b border-black p-2 w-full focus:outline-none bg-transparent"
          placeholder="Enter your username"
        />
        {error?.userName && (
          <p className="text-xs text-red-500">{error?.userName}</p>
        )}
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="border-b border-black p-2 w-full focus:outline-none bg-transparent"
          placeholder="Enter your password"
        />
        {error?.password && (
          <p className="text-xs text-red-500">{error?.password}</p>
        )}
        <button
          type="submit"
          className="bg-neutral-900 hover:bg-neutral-800 w-full p-3 rounded-md text-white"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
      <p className="text-neutral-700">
        Don't have account?{" "}
        <Link to="/signup" className=" text-black font-semibold">
          Signup
        </Link>
      </p>
    </div>
  )
}

export default Login
