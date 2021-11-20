import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { config } from "../utils/header-config";

const TaskViewEdit = () => {
    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState("")
    const [task, setTask] = useState(null)
    const history = useHistory()

    const params = useParams()
    const {id} = params

    useEffect(() => {
        getTask(id)
    }, [history])

    const getTask = async(id) => {
        const {data} = await axios.get(`/api/todos/${id}`, config)
        if(data){
            setTask(data)
        }
    }

    const handleFormInputChange = (e) => {
        const {name, value} = e.currentTarget;
        setFormData({...formData, [name]: value})
    }

    const editTask = async(e) => {
        e.preventDefault()
        if(!task.title || !task.description){
            setFormError("Please provide all fields")
            setTimeout(() => {
                setFormError("")
            }, 3000)
            return
        }
        await axios.patch(`/api/todos/${id}`, formData, config).then(({data}) => {
            history.push("/")
        }).catch((error) => {
            return setFormError("Please verify task details")
        })
    }

    const goHome = () => {
        history.push("/")
    }

    const formatedTaskDate = (d) => {
        if(d){
            const taskDate = new Date(d);
            const formatedDate = format(taskDate, "MMM do, yyyy H:mma")
            return formatedDate;
        }
    }

    return (
        <React.Fragment>
            {task && (
                <div className="form-wrapper">
                    <form>
                        <h1>{task?.title}</h1>
                        <div className="form-group">
                            {formError && (
                                <span className="error">{formError}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="title" defaultValue={task?.title}  name="title" onChange={handleFormInputChange} placeholder="title..." ></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" defaultValue={task?.description} onChange={handleFormInputChange} placeholder="description..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="created">Created:</label>
                            <input disabled type="created" defaultValue={formatedTaskDate(task?.created)} name="created" placeholder="created..." ></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn-create" onClick={editTask}>Edit Task</button>
                                <br/>
                            <button type="submit" className="btn-back" onClick={goHome}>Back</button>
                        </div>
                    </form>
                </div>
            )}
        </React.Fragment>
    )
}

export default TaskViewEdit