import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ITask } from '../interfaces/Task'
import api from '../services/api'

type Props = {
    btnText: string,
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>,
    taskList: ITask[],
    task?: ITask | null,
    handleUpdate?(id: number, title: string, description: string): void
}

const TaskForm = ({btnText, setTaskList, taskList, task, handleUpdate}: Props) => {
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.name === 'title') {
            setTitle(e.target.value)
        }else{
            setDescription(e.target.value)
        }
    }

    const addTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      
        if (handleUpdate) {
          handleUpdate(id, title, description)
        } else {
          const newTask: Omit<ITask, 'id'> = { title, description }
      
          try {
            const response = await api.post("/todo", newTask)
            const createdTask = response.data
            setTaskList!([...taskList, createdTask])
            setTitle('')
            setDescription('')
          } catch (err) {
            console.error("Erro ao criar tarefa:", err)
          }
        }
      }

    useEffect(() => {
        if(task){
            setId(task.id)
            setTitle(task.title)
            setDescription(task.description)
        }
    }, [task])

  return (
    <form onSubmit={addTaskHandler} className='flex flex-col gap-4 w-90 mx-auto mt-10 bg-gray-100 rounded-2xl p-4'>
        <div className='flex flex-col m-1'>
            <label className='text-lg' htmlFor='title'>Título: </label>
            <input onChange={handleChange} className="border p-2 rounded-xl border-gray-600" id='title' name='title' type='text' value={title}/>
        </div>
        <div className='flex flex-col m-1'>
            <label className='text-lg' htmlFor='description'>Descrição: </label>
            <input onChange={handleChange} className="border p-2 rounded-xl border-gray-600" id='description' name='description' type='text' value={description}/>
        </div>
        <input type='submit' className="bg-gray-500 cursor-pointer rounded-3xl hover:bg-gray-700  text-white py-2" value={btnText}/>
    </form>
  )
}

export default TaskForm