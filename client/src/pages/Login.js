import React, { useEffect, useState } from "react"
import {useHistory} from "react-router-dom"
import "../styles/form.css"
import axios from "axios";
import { isLoggedIn } from "../utils/auth";

const Login = () => {

    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState("")
    const history = useHistory()

    const handleFormInputChange = (e) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value})
    }

    const loginUser = async (e) => {
        e.preventDefault()
        if(!formData.email || !formData.password){
            setFormError("Please provide all fields")
            setTimeout(() => {
                setFormError("")
            }, 3000)
            return
        }
        await axios.post(`api/auth/login`, formData).then(({data}) => {
            const {token} = data
            localStorage.setItem("accessToken", token)
            history.push("/")
        }).catch((error) => {
            return setFormError("Invalid credentials")
        })
    }

    useEffect(() => {
        if(isLoggedIn()){
            history.push("/")
        }
    }, [history, isLoggedIn()])


    return (
        <React.Fragment>
            <div className="form-wrapper">
            <form>
                <h1>Login</h1>
                <div className="form-group">
                    {formError && (
                        <span className="error">{formError}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" onChange={handleFormInputChange} placeholder="email..." ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={handleFormInputChange} placeholder="password..." ></input>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={loginUser}>Login</button>
                </div>
            </form>
            </div>
        </React.Fragment>
    )
}

export default Login