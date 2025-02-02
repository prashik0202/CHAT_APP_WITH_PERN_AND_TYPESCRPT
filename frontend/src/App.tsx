import { Route, Routes } from "react-router-dom"
import Login from "./pages/Auth/Login"
import Signup from "./pages/Auth/Signup"
import AuthLayout from "./pages/Auth/AuthLayout"
import ChatRoom from "./pages/ChatRoom"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/global/ProtectedRoutes"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <ChatRoom />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
