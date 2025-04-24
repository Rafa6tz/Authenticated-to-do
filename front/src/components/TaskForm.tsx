import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ITask } from '../interfaces/Task'

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

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(handleUpdate){
            handleUpdate(id, title, description)
            setTitle('')
            setDescription('')
        } else{
        const id = Math.floor(Math.random() * 1000)

        const newTask: ITask = {id, title, description}

        setTaskList!([...taskList, newTask])
        setTitle('')
        setDescription('')
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
    <form onSubmit={addTaskHandler}>
        <div>
            <label htmlFor='title'>Título: </label>
            <input onChange={handleChange} id='title' name='title' type='text' value={title}/>
        </div>
        <div>
            <label htmlFor='description'>Descrição: </label>
            <input onChange={handleChange} id='description' name='description' type='text' value={description}/>
        </div>
        <input type='submit' value={btnText}/>
    </form>
  )
}

export default TaskForm