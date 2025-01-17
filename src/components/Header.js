import { onAuthStateChanged, signOut } from "firebase/auth";
import { LOGO_URL, USER_DUMMY_URL } from "../utils/constants";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store=>store.user);
    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid,email,displayName,photoURL}));
            navigate('/browse')
          } else {
            dispatch(removeUser());
            navigate('/')

          }
        });
        return () => unsubscribe()
  },[])
    return(
        <div className="flex justify-between absolute top-0 left-0 w-full bg-gradient-to-b bg-black bg-opacity-50">
            <div className="">
                <img className="w-44" src={LOGO_URL} alt="logo"/>
            </div>
            {userData && <ul className="flex gap-3 items-center mr-4 text-white">
                <li>Home</li>
                <li><img className="w-[20px]" src={userData?.photoURL|| USER_DUMMY_URL} alt="user"/></li>
                <li>{userData?.displayName}</li>
                <li onClick={handleSignOut} className="cursor-pointer">Sign Out</li>
            </ul>}
            </div>
    )
}
export default Header;