import React, { useState } from "react"
import {useHistory} from "react-router-dom"
import "../styles/form.css"
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState("")
    const history = useHistory()

    const handleFormInputChange = (e) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value})
    }

    const registerUser = async(e) => {
        e.preventDefault()
        if(!formData.name || !formData.email || !formData.password){
            console.log("form not valid")
            setFormError("Please provide all fields")
            setTimeout(() => {
                setFormError("")
            }, 3000)
            return
        }
        await axios.post(`api/auth/register`, formData).then(({data}) => {
            history.push("/login")
        }).catch((error) => {
            return setFormError(error.message)
        })
    }

    return (
        <React.Fragment>
            <div className="form-wrapper">
            <form>
                <h1>Register</h1>
                <div className="form-group">
                    {formError && (
                        <span className="error">{formError}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" onChange={handleFormInputChange} placeholder="name..." ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" required={true} name="email" onChange={handleFormInputChange} placeholder="email..." ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={handleFormInputChange} placeholder="password..." ></input>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={registerUser}>Register</button>
                </div>
            </form>
            </div>
        </React.Fragment>
    )
}

export default Register