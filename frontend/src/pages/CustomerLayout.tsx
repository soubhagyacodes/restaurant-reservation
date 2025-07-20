import CustomerNav from "@/components/CustomerNav"
import Footer from "@/components/Footer"
import MobileNav from "@/components/MobileNav"
import { Outlet } from "react-router"

export default function CustomerLayout() {
    return (
        <>
        <CustomerNav />
        <Outlet />
        <Footer />
        <MobileNav />
        </>
    )
}
