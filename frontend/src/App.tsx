import { Routes, Route } from "react-router"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
   </Routes>
  )
}


// Rubik Content
// Satoshi, Logo
// Ubuntu Headings
export default App
