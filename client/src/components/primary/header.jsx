import { useLocation, useNavigate } from "react-router-dom";
import Button from "../elements/Button";
import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { showNotification } = useNotification();
    const handleLogout = () => {
        // logout context will be called here
        logout();
        navigate('/login');
        showNotification("success", "Logout successfully!")
    }


    return (
        <header className=" bg-white flex items-center h-20 border-b-1 border-neutral-300 w-[100%] fixed top-0 left-0 justify-around">
            <h2 onClick={() => navigate('/')} className="font-bold cursor-pointer text-2xl ">Polling App</h2>
            <ul className="flex items-center gap-8">
                <li><Link to='/' className="cursor-pointer transition duration-300 hover:text-neutral-600">Home</Link></li>
                <li><Link to='/about' className="cursor-pointer transition duration-300 hover:text-neutral-600">About</Link></li>
                <li><Link to='/features' className="cursor-pointer transition duration-300 hover:text-neutral-600">Features</Link></li>
            </ul>
            <div className="flex items-center gap-3">

                {/* For ternary operation in the future */}


                {user ?
                    <>
                        <div className="flex items-center px-6 py-3 rounded-md bg-neutral-100 gap-2" >
                            <UserIcon size={20} />
                            <span className="text-neutral-800 text-sm">Aditya Raj</span>
                        </div>
                        <Button text={"Logout"} secondary onClick={handleLogout} />
                    </> :
                    <>
                        <Button text="Login" onClick={() => { navigate("/login") }} />
                        <Button text="Register" secondary onClick={() => navigate('/register')} />
                    </>

                }
            </div>
        </header >
    );
}

export default Header;