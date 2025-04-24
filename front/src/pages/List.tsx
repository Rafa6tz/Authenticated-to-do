import { useState } from "react"
import { ITask } from "../interfaces/Task"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

function List() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => {
      return task.id !== id
    }))
  }

  const editTask = (task: ITask) => {
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, description: string) => {

    const updatedTask = {id, title, description}

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })
    setTaskList(updatedItems)
  }

  return (
    <>
      <TaskForm btnText="Adicionar" setTaskList={setTaskList} taskList={taskList}/>
      <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
      <TaskForm btnText="Editar" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>
    </>
  )
}

export default List
