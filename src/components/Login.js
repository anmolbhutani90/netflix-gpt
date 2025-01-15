import { useRef, useState } from "react";
import Header from "./Header";
import validate from "../utils/validate";
import { BANNER_IMG_URL } from "../utils/constants";

const Login = () =>{
    const [isSignIn, setIsSignIn] = useState(false);
    const [message, setMessage] = useState(null)
    const emailRef= useRef(null);
    const passRef= useRef(null);
    const nameRef= useRef(null);
    const toggleSignIn = () =>{
        setIsSignIn(!isSignIn)
    }
    const handleLogin = (e) =>{
        e.preventDefault();
        const validateMessage = validate(emailRef.current.value, passRef.current.value);
        console.log(validateMessage, 'validateMessage')
        setMessage(validateMessage)
    }
    return(
        <div className="relative w-full h-screen">
            <Header/>
            <img className="absolute w-full h-screen -z-10" alt="banner" src={BANNER_IMG_URL}/>
            <div className="h-screen flex w-3/12 mx-auto justify-center items-center">
                
                <form className="bg-black opacity-90 p-8 w-full" onSubmit={handleLogin}>
                    <h3 className="text-3xl text-white">{isSignIn? "Sign In": "Sign Up"}</h3>
                    {!isSignIn && <div className="my-2 flex flex-col">
                        <label htmlFor="name" className="text-white text-lg my-1 w-full">Name</label>
                        <input ref={nameRef} id="name" type="text" placeholder="Enter Full Name" className="px-4 py-2 border border-gray-700 focus:border-blue-700 "/>
                    </div>}
                    <div className="my-2 flex flex-col">
                        <label htmlFor="email" className="text-white text-lg my-1 w-full">Email</label>
                        <input ref={emailRef} id="email" type="text" placeholder="Enter Email id" className="px-4 py-2 border border-gray-700 focus:border-blue-700 "/>
                    </div>
                    <div className="my-2 flex flex-col">
                        <label htmlFor="password" className="text-white text-lg my-1 w-full">Password</label>
                        <input ref={passRef} id="password" type="password" placeholder="Enter Password" className="px-4 py-2 border border-gray-700 focus:border-blue-700 "/>
                    </div>
                    <button className="p-2 mt-8 w-full bg-red-700 text-white text-2xl rounded-lg shadow-lg">Submit</button>
                    <p className="text-lg text-red-700 font-bold my-3">{message}</p>

                    <p className="text-white text-lg my-8">{isSignIn? "New User?": "Already a registered user?"}  <span className="cursor-pointer text-blue-600 font-bold" onClick={toggleSignIn}>{isSignIn? "Sign Up": "Sign In"}</span></p>
                </form>
                
            </div>
        </div>
    )
}
export default Login;