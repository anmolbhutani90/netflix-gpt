import { useRef, useState } from "react";
import Header from "./Header";
import validate from "../utils/validate";
import { BANNER_IMG_URL, PROFILE_IMG_URL } from "../utils/constants";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";


const Login = () =>{
    const [isSignIn, setIsSignIn] = useState(false);
    const [message, setMessage] = useState(null)
    const emailRef= useRef(null);
    const passRef= useRef(null);
    const nameRef= useRef(null);
    const dispatch = useDispatch();
    const toggleSignIn = () =>{
        setIsSignIn(!isSignIn)
    }
  
 
    const handleLogin = (e) =>{
        e.preventDefault();
        const validateMessage = validate(emailRef.current.value, passRef.current.value);
        setMessage(validateMessage);
        if(validateMessage) return
        if(!isSignIn){
            //sign up logic
            
            createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passRef.current.value
              )
                .then((userCredential) => {
                  const user = userCredential.user;
              
                  // Update the user's profile
                   updateProfile(user, {
                    displayName: nameRef.current.value,
                    photoURL: PROFILE_IMG_URL,
                  })
                    .then(() => {
                      // Use the updated `user` object
                      const { uid, email, displayName, photoURL } = auth.currentUser;
              
                      // Dispatch user details to the store
                      dispatch(
                        addUser({
                          uid: uid,
                          email: email,
                          displayName: displayName,
                          photoURL: photoURL,
                        })
                      );
                    })
                    .catch((error) => {
                      // Handle errors from updateProfile
                      setMessage(error.message);
                    });
                })
                .catch((error) => {
                  // Handle errors from createUserWithEmailAndPassword
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setMessage(`${errorCode} - ${errorMessage}`);
                });
        }else{
            //sign in logic
            signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const { uid, email, displayName, photoURL } = auth.currentUser;
              
                // Dispatch user details to the store
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );

              
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                setMessage(error.message)
            });
        }
        
        
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