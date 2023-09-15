
const Taskform = ({createTask, name, addMember, startDate,endDate,projectClassification,points,description, handleInputChange, isEditing, updateTask}) => {
  return (
    <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
        <input 
        type="text"
        placeholder="Project Name"
        name="name"
        value={name}
        onChange={handleInputChange}
        />
        <input 
        type="text"
        placeholder="Add member"
        name="addMember"
        value={addMember}
        onChange={handleInputChange}
        />
        <input 
        type="text"
        placeholder="startDate"
        name="startDate"
        value={startDate}
        onChange={handleInputChange}
        />
        <input 
        type="text"
        placeholder="endDate"
        name="endDate"
        value={endDate}
        onChange={handleInputChange}
        />
        <input 
        type="text"
        placeholder="projectClassification"
        name="projectClassification"
        value={projectClassification}
        onChange={handleInputChange}
        />
      <input 
        type="text"
        placeholder="add points"
        name="points"
        value={points}
        onChange={handleInputChange}
        />
        <input 
        type="text"
        placeholder="add Description "
        name="description"
        value={description}
        onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}

export default Taskform