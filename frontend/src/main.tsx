import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.tsx"
import "./index.css"
import { AuthContextProvider } from "./context/AuthContext.tsx"
import SocketContextProvider from "./context/SocketContext.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
