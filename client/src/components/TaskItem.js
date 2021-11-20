import React from "react";
import { format } from "date-fns";
import "../styles/task-item.css"
import { Link } from "react-router-dom";

const TaskItem = ({task, taskDelete}) => {

    const formatedTaskDate = (task) => {
        const taskDate = new Date(task.created);
        const formatedDate = format(taskDate, "MMM do, yyyy H:mma")
        return formatedDate;
    }

    const deleteTask = (e) => {
        e.preventDefault()
        taskDelete(task._id)
    }

    return (
        <React.Fragment>
            <div className="task-item-wrapper">
                <div className="task-title"><Link to={`/task/${task._id}`}>{task.title}</Link></div>
                <div className="task-desc">{task.description}</div>
                <div className="task-created">{formatedTaskDate(task)}</div>
                <div className="task-action"><button className="btn-delete" onClick={deleteTask}>Delete</button></div>
            </div>
        </React.Fragment>
    )
}

export default TaskItem