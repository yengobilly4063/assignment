import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { isLoggedIn } from "../utils/auth";
import { config } from "../utils/header-config";
import "../styles/task-list.css"
import TaskItem from "../components/TaskItem";

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const history = useHistory()


    useEffect(() => {
        if(!isLoggedIn()){
            history.push("login")
        }else{
            getTasks()
        }
    }, [isLoggedIn(), history])

    const getTasks = async() => {
        const {data} = await axios.get("/api/todos/", config)
        if(data){
            setTasks(data)
        }
    }

    const handleTaskDelete = async(id) => {
        await axios.delete(`/api/todos/${id}`, config).then(() => {
            getTasks()
        })
    }

    return (
        <React.Fragment>
            {tasks.length === 0 && (
                <div className="no-tasks">
                    <h1>No tasks found to display</h1>
                </div>
            )}
            {tasks.length > 0 && (
                 <ul className="task-list">
                 {tasks.map(task => (
                     <li className="task-item" key={task._id}>
                         <TaskItem task={task} taskDelete={handleTaskDelete}/>
                     </li>
                 ))}
             </ul>
            )}
           
            
        </React.Fragment>
    )
}

export default TaskList