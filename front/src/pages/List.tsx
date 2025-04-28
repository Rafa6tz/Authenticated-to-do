import { useEffect, useState } from "react"
import { ITask } from "../interfaces/Task"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function List() {
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    api.get("/todo")
      .then(res => setTaskList(res.data))
      .catch(err => console.error("Erro ao buscar tarefas:", err))
  }, [])

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/todo/${id}`)
      setTaskList(taskList.filter(task => task.id !== id))
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err)
    }
  }

  const editTask = (task: ITask) => {
    setModal(!modal)
    setTaskToUpdate(task)
  }

  const updateTask = async (id: number, title: string, description: string) => {
    const updatedTask = { id, title, description }

    try {
      await api.put(`/todo/${id}`, updatedTask)
      const updatedItems = taskList.map(task =>
        task.id === id ? updatedTask : task
      )
      setTaskList(updatedItems)
      setModal(!modal)
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err)
    }
  }

  return (
    <div className={`${modal ? "overflow-hidden" : "overflow-auto"} h-screen`}>
    {modal && (
      <div className="w-full h-full fixed inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-gray-800 inset-0 opacity-70 absolute z-10" onClick={toggleModal}></div>
        <div className="z-20 flex flex-col items-center">
        <TaskForm btnText="Editar" taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>
        <p className="rounded-full bg-gray-200 text-xl w-8 h-8 text-center m-2 cursor-pointer hover:bg-red-300" onClick={toggleModal}>x</p>
        </div>
      </div>
      )}
    <div className="h-screen w-full flex flex-col items-center gap-4 pt-30">
      <TaskForm btnText="Adicionar" setTaskList={setTaskList} taskList={taskList}/>
      <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
      
    </div>
    </div>
  )
}

export default List
