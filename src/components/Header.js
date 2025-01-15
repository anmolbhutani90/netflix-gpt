import { LOGO_URL } from "../utils/constants";

const Header = () =>{
    return(
        <div className="flex justify-between absolute top-0 left-0 w-full bg-gradient-to-b bg-black bg-opacity-50">
            <img className="w-44" src={LOGO_URL} alt="logo"/>
        </div>
    )
}
export default Header;