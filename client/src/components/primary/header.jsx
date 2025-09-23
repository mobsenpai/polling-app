import Button from "../elements/Button";

function Header(){
    return(
        <header>
            <h2 className="">Polling App</h2>
            <ul className="flex items-center">
                <li><a>Home</a></li>
                <li><a>About</a></li>
                <li><a>Features</a></li>
            </ul>
            <div className="flex items-center">
                <Button text="Login"/>
                <Button text="Register"/>
            </div>
        </header>
    );
}

export default Header;