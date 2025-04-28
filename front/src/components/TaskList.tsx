import { ITask } from '../interfaces/Task'

type Props = {
    taskList: ITask[],
    handleDelete(id: number): void,
    handleEdit(task: ITask): void,
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
    {taskList.length > 0 ? (
        taskList.map((task) => (
            <div key={task.id} className='bg-gray-100 md:w-2/5 w-90 text-center p-4 rounded-2xl'>
                <h3 className='text-xl font-semibold'>{task.title}</h3>
                <p className='text-sm'>{task.description}</p>
                <div className='flex justify-around'>
                <button onClick={() => handleEdit(task)} className='cursor-pointer rounded-3xl bg-amber-400 w-28 h-8 hover:bg-amber-500'>Editar</button>
                <button onClick={() => handleDelete(task.id)} className='cursor-pointer rounded-3xl bg-red-500 w-28 h-8 hover:bg-red-700'>Apagar</button>
                </div>
            </div>
        ))
    ) : (
        <p>Não há tarefas cadastradas</p>
    )}
    </>
  )
}

export default TaskList