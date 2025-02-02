import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import { SignUpInft } from "../../types"
import { validateForm } from "../../utils/validation"
import GenderCheckBox from "../../components/GenderCheckBox"
import { useSignup } from "../../hooks/UseSignup"

const Signup = () => {
  // form state
  const [inputs, setInputs] = useState<SignUpInft>({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })

  // error state
  const [errors, setErrors] = useState<SignUpInft>()

  const { loading, signup } = useSignup()

  // handling onChange event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // extract name and value form event
    const { name, value } = e.target
    // setInput using prevValues
    setInputs((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value }
      // Run validation after updating state
      setErrors(validateForm(updatedValues))
      return updatedValues
    })
  }

  // handlechange for checkbox
  const handleCheckBoxChange = (gender: "male" | "female") => {
    setInputs({ ...inputs, gender })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(inputs)
    signup(inputs)
  }

  return (
    <div className="flex flex-col items-center gap-5 bg-neutral-100/50 w-full md:max-w-[400px] p-7 rounded-md shadow-2xl">
      <h1 className="text-3xl">SignUp</h1>
      <form
        action=""
        className="flex flex-col gap-5 items-start w-full"
        onSubmit={handleSubmit}
      >
        <input
          name="fullName"
          type="text"
          className="border-b border-black p-2 w-full focus:outline-none bg-transparent"
          placeholder="Enter your FullName"
          value={inputs.fullName}
          onChange={handleChange}
        />
        {errors?.fullName && (
          <p className="text-xs text-red-500">{errors?.fullName}</p>
        )}
        <input
          name="userName"
          type="text"
          className="border-b border-black p-2 w-full focus:outline-none bg-transparent"
          placeholder="Enter your username"
          value={inputs.userName}
          onChange={handleChange}
        />
        {errors?.userName && (
          <p className="text-xs text-red-500">{errors?.userName}</p>
        )}
        <input
          name="password"
          type="password"
          className="border-b border-black p-2 w-full focus:outline-none bg-transparent"
          placeholder="Enter your password"
          value={inputs.password}
          onChange={handleChange}
        />
        {errors?.password && (
          <p className="text-xs text-red-500">{errors?.password}</p>
        )}
        <input
          name="confirmPassword"
          type="password"
          className="border-b border-black p-2 w-full focus:outline-none bg-transparent"
          placeholder="Confirm your password"
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
        {errors?.confirmPassword && (
          <p className="text-xs text-red-500">{errors?.confirmPassword}</p>
        )}
        <GenderCheckBox
          onChangeCheckBox={handleCheckBoxChange}
          selectedGender={inputs.gender}
        />
        <button
          type="submit"
          className="bg-neutral-900 hover:bg-neutral-800 w-full p-3 rounded-md text-white"
          disabled={loading}
        >
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
      <p className="text-neutral-700">
        Already have account?{" "}
        <Link to="/login" className="text-black font-semibold">
          Login
        </Link>
      </p>
    </div>
  )
}

export default Signup
