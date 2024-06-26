import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardPage from "./pages/DashboardPage"
import RootLayout from "./shared/layouts/RootLayout"
import { Toaster } from "./shared/components/ui/toaster"
import ProtectedRoute from "./shared/routes/ProtectedRoute"
import PostPage from "./pages/PostPage"

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout><PostPage /></RootLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<SignUpPage />} />
        <Route path="/dashboard" element={<RootLayout><ProtectedRoute><DashboardPage /></ProtectedRoute></RootLayout>} />

      </Routes>
    </BrowserRouter>
    <Toaster />
  </>
}

export default App
