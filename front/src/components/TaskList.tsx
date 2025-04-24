import { ITask } from '../interfaces/Task'

type Props = {
    taskList: ITask[],
    handleDelete(id: number): void,
    handleEdit(task: ITask): void
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
    {taskList.length > 0 ? (
        taskList.map((task) => (
            <div key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => handleDelete(task.id)}>Apagar</button>
            </div>
        ))
    ) : (
        <p>Não há tarefas cadastradas</p>
    )}
    </>
  )
}

export default TaskList