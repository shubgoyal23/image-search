import { Outlet } from "react-router-dom";
import {Header, Footer} from "./Components/index"

export default function Layout(){
    return(
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}