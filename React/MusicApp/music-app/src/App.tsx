import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import { SideBarProvider } from "./hooks/useSideBar"
import AppRoutes from "./routes/AppRoutes"
import { PlayerProvider } from "./contexts/PlayerContext"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <SideBarProvider>
          <PlayerProvider>
            <AppRoutes />
          </PlayerProvider>
        </SideBarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
