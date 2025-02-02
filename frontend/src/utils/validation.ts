import { LoginInInputs, SignUpInft } from "../types"

export function validateForm(values: SignUpInft) {
  let errors = {
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  }

  // Validate fullName
  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required."
  } else if (values.fullName.length < 3) {
    errors.fullName = "Full name must be at least 3 characters."
  }
  // Validate userName
  if (!values.userName.trim()) {
    errors.userName = "Username is required."
  } else if (values.userName.toLowerCase().includes("sex")) {
    errors.userName = "Please provide a decent username."
  } else if (values.userName.length < 5) {
    errors.userName = "Username must be at least 5 characters."
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password is required."
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters."
  }

  // Validate confirmPassword
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required."
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match."
  }

  // Validate gender
  if (!values.gender) {
    errors.gender = "Gender selection is required."
  }

  return errors
}

export function validateLogin(values: LoginInInputs) {
  let errors = {
    userName: "",
    password: "",
  }

  // Validate userName
  if (!values.userName.trim()) {
    errors.userName = "Username is required."
  } else if (values.userName.toLowerCase().includes("sex")) {
    errors.userName = "Please provide a decent username."
  } else if (values.userName.length < 5) {
    errors.userName = "Username must be at least 5 characters."
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password is required."
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters."
  }

  return errors
}
