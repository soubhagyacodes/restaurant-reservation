import CustomerNav from "@/components/CustomerNav"
import Footer from "@/components/Footer"
import { Outlet } from "react-router"

export default function CustomerLayout() {
    return (
        <>
        <CustomerNav />
        <Outlet />
        <Footer />
        </>
    )
}
