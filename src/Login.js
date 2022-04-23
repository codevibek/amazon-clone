import React, {useState} from 'react'
import  './Login.css'
import {Link, useHistory} from 'react-router-dom'
import logo from './19.jpg'
import {auth} from './Firebase'


function Login() {
    const history = useHistory()
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const signIn = e=>{
            e.preventDefault();

            auth.signInWithEmailAndPassword(email, password)
                .then(auth=>{
                    history.push('/')
                })
                .catch(error=> alert(error.message))
           
    }
    const register = e=>{
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth)=>{
            if(auth){
                history.push('/')
            }
        })
        .catch(error =>alert(error.message))

}
    return (
        <div className="login">
            <Link to="/">
                <img src={logo}
                    alt="logo"
                    className="login__logo"/>
            </Link>

            <div className="login__formContainer">
                
               
                
                <form>
                <h5>Email</h5>
                <input type="subimit" value={email} onChange={e=>setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />

                <button className="login__signInButton" onClick={signIn}>Sign In</button>
                <p>By signing in I accept the terms and conditiopns</p>
                <button className="login__registerButton" onClick={register}>Create Account</button>

                </form>
            </div>
            
        </div>
    )
}

export default Login
