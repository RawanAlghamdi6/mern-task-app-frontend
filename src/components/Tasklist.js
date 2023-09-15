import axios from "axios"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "./Task";
import Taskform from "./Taskform";
import { URL } from "../App";
import loadingImg from "../assest/loader.gif"

// entiry point 
const Tasklist = () => {
   // Get data
  const [tasks, setTasks] = useState([]); 
  const [completedtasks, setCompletedTasks] = useState([]);
  const [isloading, setIsLoading] = useState(false)
  // update
  const [isEditing, setisEditing] = useState(false)
  const [taskID, setTaskID] = useState("")
 // create task
  const [formData, setformData] = useState({
    name: "", 
    addMember: "", 
    startDate:"",
    endDate:"",
    projectClassification:"",
    points:"",
    description:"",
  }); 

  const { name, addMember, startDate, endDate, projectClassification, points, description } = formData;

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setformData({ ...formData, [name]: value}) // set the name to the value that's add by manager

  }; 
 /////////Get Task from Database////////////
  const getTasks = async () => {
    setIsLoading(true) // req to database 
    try {
     const {data} = await axios.get(`${URL}/api/tasks`); // access the task in the database 
     setTasks(data);
     setIsLoading(false); 
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false); 
    }
  }; 

  useEffect ( () => {
         getTasks()
  }, [])

   /////////Save Task to Database////////////
  const createTask = async (e) => {
    e.preventDefault(); 
     if (name === "" || addMember === "" || endDate === "" || startDate === "" || projectClassification === "" || points === "" || description === "") {
      return toast.error("input field can't be empty"); 
     }
     try {
      await axios.post(`${URL}/api/tasks` , formData); 
      toast.success("Task added successfully");
      setformData({
      name: "",
      addMember: "", 
      startDate:"",
      endDate:"",
      projectClassification:"",
      points:"",
      description:""});
      getTasks();
     } catch (error) {
      toast.error(error.message)
     }
  }; 

     /////////Delete Task from Database//////////// 
     const deleteTask = async (id) => {
       try {
        await axios.delete(`${URL}/api/tasks/${id}`);
        getTasks();
       } catch (error) {
        toast.error(error.message)
       }
     };

     useEffect (() => {
      const CTask = tasks.filter((task) => {
        return task.completed === true 
      })
      setCompletedTasks(CTask)
     }, [tasks])

     /////////Update Task //////////// 
     const getSingleTask = async (task) => {
        setformData({
          name: task.name, // push the content to up 
          addMember: task.addMember, 
          startDate: task.startDate, 
          endDate: task.endDate, 
          projectClassification: task.projectClassification, 
          points: task.points, 
          description: task.description}) 

        setTaskID(task._id)
        setisEditing(true)
     };
     const updateTask = async (e) => {
       e.preventDefault();
       if (name === "" || addMember === "" || endDate === "" || startDate === "" || projectClassification === "" || points === "" || description === "") {
          return toast.error("Input feild can't be empty")
        }
        try {
          await axios.put(`${URL}/api/tasks/${taskID}` , formData)
          setformData({
            name: "",
            addMember: "", 
            startDate:"",
            endDate:"",
            projectClassification:"",
            points:"",
            description:""});
          setisEditing(false);
          getTasks();
        } catch (error) {
          toast.error(error.message)
        }
     }; 

      /////////completed Task //////////// 
      const setToComplete = async (task) => {
        const newFormData = {
          name: task.name,
          completed: true,
         }
         try {
          await axios.put(`${URL}/api/tasks/${task._id}` , newFormData)
          getTasks()
         } catch (error) {
          toast.error(error.message)
         }
      }
         
  return (
    <div>
        <h2>Task Manager</h2>
        <Taskform 
         name={name}
         handleInputChange={handleInputChange} 
         createTask={createTask}
         isEditing={isEditing}
         updateTask={updateTask} />

      {tasks.length > 0 && (
        <div className=" --flex-between --pb">
            <p>
                <b>Total Task:</b> {tasks.length}
            </p>
            <p>
                <b>Completed Task:</b> {completedtasks.length}
            </p>
        </div>
      )}

        <hr/>
          {
          isloading && (
            <div className=" --flex-center">
              <img src={loadingImg} alt="loading"/>
            </div>
          )}
          {
          isloading && tasks.length === 0 ? (
            <p className="--py">No Task Added. Please add a task</p>
          ) : (
            <>
            {tasks.map ((task, index) => {
              return (
                <Task 
                key={task._id} 
                task={task} 
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}/>
              )
            })}
            </>
          )
          }
       
    </div>
  )
}

export default Tasklist