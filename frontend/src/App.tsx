import { Routes, Route } from "react-router"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import OwnerHome from "./pages/OwnerHome"
import CustomerProtected from "./components/CustomerProtected"
import OwnerProtected from "./components/OwnerProtected"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<CustomerProtected><Dashboard /></CustomerProtected>} />
      <Route path="/ownerhome" element={<OwnerProtected><OwnerHome /></OwnerProtected>} />
      <Route path="*" element={<NotFound />} />
   </Routes>
  )
}


// Rubik Content
// Satoshi, Logo
// Ubuntu Headings
export default App
