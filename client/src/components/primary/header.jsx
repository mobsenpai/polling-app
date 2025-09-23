import Button from "../elements/Button";

function Header(){
    return(
        <header className="flex items-center h-20 border-b-1 border-black w-[100%] fixed top-0 left-0 justify-around">
            <h2 className="font-bold text-2xl ">Polling App</h2>
            <ul className="flex items-center gap-8">
                <li><a className="cursor-pointer transition duration-300 hover:text-gray-600">Home</a></li>
                <li><a className="cursor-pointer transition duration-300 hover:text-gray-600">About</a></li>
                <li><a className="cursor-pointer transition duration-300 hover:text-gray-600">Features</a></li>
            </ul>
            <div className="flex items-center gap-3">
                <Button text="Login" />
                <Button text="Register" secondary/>
                <Button text="HIii"/>
            </div>
        </header>
    );
}

export default Header;