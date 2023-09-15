
import {FaCheckDouble, FaEdit, FaRegTrashAlt} from "react-icons/fa"

const Task = ({task, index, deleteTask, getSingleTask, setToComplete}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
            <b>{index + 1}. </b>
               {task.name} 
             <p>{task.addMember}</p>
             <p>{task.startDate}</p>
             <p>{task.endDate}</p>
             <p>{task.projectClassification}</p>
             <p>{task.points}</p>
             <p>{task.description}</p>
        </p>
        <div className="task-icons">
            <FaCheckDouble color="green" onClick={() => 
            setToComplete(task)} />
            <FaEdit color="purple" onClick={() => 
            getSingleTask(task)}/>
            <FaRegTrashAlt color="red" onClick={() => 
            deleteTask(task._id)}/>
        </div>
    </div>
    
  )
}

export default Task