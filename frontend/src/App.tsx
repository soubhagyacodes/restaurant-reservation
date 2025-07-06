import { Routes, Route } from "react-router"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import SignUp from "./pages/SignUp"
import Restaurants from "./pages/Restaurants"
import Home from "./pages/Home"
import OwnerRestaurants from "./pages/OwnerRestaurants"
import CustomerProtected from "./components/CustomerProtected"
import OwnerProtected from "./components/OwnerProtected"
import MyReservations from "./pages/MyReservations"
import CustomerProfile from "./pages/CustomerProfile"
import CustomerLayout from "./pages/CustomerLayout"
import SingleRestaurant from "./pages/SingleRestaurant"
import Tables from "./pages/Tables"
import SingleTable from "./pages/SingleTable"
import OwnerLayout from "./pages/OwnerLayout"
import OwnerSingleRestaurant from "./pages/OwnerSingleRestaurant"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<CustomerLayout />}>
        <Route path="/restaurants" element={<CustomerProtected><Restaurants /></CustomerProtected>} />
        <Route path="/restaurants/:id" element={<CustomerProtected><SingleRestaurant /></CustomerProtected>} />
        <Route path="/restaurants/:restaurantId/tables" element={<CustomerProtected><Tables /></CustomerProtected>} />
        <Route path="/restaurants/:restaurantId/tables/:tableId" element={<CustomerProtected><SingleTable /></CustomerProtected>} />
        <Route path="/my-reservations" element={<CustomerProtected><MyReservations /></CustomerProtected>} />
        <Route path="/cust-profile" element={<CustomerProtected><CustomerProfile /></CustomerProtected>} />
      </Route>
        <Route path="*" element={<NotFound />} />

      <Route element={<OwnerLayout />}>
        <Route path="/ownerhome" element={<OwnerProtected><OwnerRestaurants /></OwnerProtected>} />
        <Route path="/ownerrestaurant/:id" element={<OwnerProtected><OwnerSingleRestaurant /></OwnerProtected>} />
      </Route>
   </Routes>
  )
}


// Rubik Content
// Satoshi, Logo
// Ubuntu Headings
export default App
