import react from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import HomeGuest from "./pages/HomeGuest"
import Memories from "./pages/Memories"
import CreateMemory from "./pages/CreateMemory"
import Learn from "./pages/Learn"
import ProtectedRoute from "./components/ProtectedRoute"

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }/>
      <Route path="/homeguest" element={<HomeGuest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAndLogout />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/create-memo" element={<CreateMemory />} />
      <Route path="/memories" element={<Memories />} />
      <Route path="/learnMore" element={<Learn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
