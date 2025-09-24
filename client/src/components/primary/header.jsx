import { useLocation, useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import { UserIcon } from "lucide-react";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        // logout context will be called here
    }
    return (
        <header className=" bg-white flex items-center h-20 border-b-1 border-neutral-300 w-[100%] fixed top-0 left-0 justify-around">
            <h2 className="font-bold text-2xl ">Polling App</h2>
            <ul className="flex items-center gap-8">
                <li><a className="cursor-pointer transition duration-300 hover:text-neutral-600">Home</a></li>
                <li><a className="cursor-pointer transition duration-300 hover:text-neutral-600">About</a></li>
                <li><a className="cursor-pointer transition duration-300 hover:text-neutral-600">Features</a></li>
            </ul>
            <div className="flex items-center gap-3">
                <Button text="Login" onClick={() => { navigate("/login") }} />
                <Button text="Register" secondary onClick={() => navigate('/register')} />
                {/* For ternary operation in the future */}

                {/*
                //     location.pathname.includes('/dashboard') ?
                //         <div className="flex items-center px-6 py-3 rounded-md bg-neutral-100 gap-2" >
                //             <UserIcon size={20} />
                //             <span className="text-neutral-800 text-sm">Aditya Raj</span>
                //         </div> : null
                // 
                // <Button text={"Logout"} secondary onClick={handleLogout} />
*/}
            </div>
        </header >
    );
}

export default Header;