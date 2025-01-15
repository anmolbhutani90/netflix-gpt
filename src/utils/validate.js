const validate = (email,pass) =>{
    const  emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/; 
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(!email.match(emailRegex)){
        return 'Email address not valid'
    } else if(!pass.match(passRegex)){
        return 'Password is invalid'
    }
    else{
        return null
    }

}
export default validate;

