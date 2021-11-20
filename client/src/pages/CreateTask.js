import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "../styles/form.css"
import { config } from "../utils/header-config";

const CreateTask = ({task}) => {

    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState("")
    const history = useHistory()

    const handleFormInputChange = (e) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value})
    }

    const createTask = async(e) => {
        e.preventDefault()
        if(!formData.title || !formData.description){
            setFormError("Please provide all fields")
            setTimeout(() => {
                setFormError("")
            }, 3000)
            return
        }
        await axios.post(`/api/todos`, formData, config).then(({data}) => {
            history.push("/")
        }).catch((error) => {
            return setFormError(error.message)
        })
    }

    return (
        <React.Fragment>
            <div className="form-wrapper">
            <form>
                <h1>New Task</h1>
                <div className="form-group">
                    {formError && (
                        <span className="error">{formError}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="title" name="title" onChange={handleFormInputChange} placeholder="title..." ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" onChange={handleFormInputChange} placeholder="description..." />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-create" onClick={createTask}>Create Task</button>
                </div>
            </form>
            </div>
        </React.Fragment>
    )
}

export default CreateTask