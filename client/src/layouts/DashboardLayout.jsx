import { Outlet } from "react-router-dom";
import Header from "../components/primary/header";
import DashboardHome from "../components/dashboard/DashboardHome";

function DashboardLayout(){
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    );
}

export default DashboardLayout;