import Footer from "@/components/Footer";
import OwnerNav from "@/components/OwnerNav";
import { Outlet } from "react-router";

export default function OwnerLayout() {
  return (
    <>
      <OwnerNav />
      <Outlet />
      <Footer />
    </>
  )
}
