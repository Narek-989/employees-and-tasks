import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { downloadTasksData } from '../../../redux/tasksDataSlice/tasksDataSlice';
import DeleteTask from '../DeleteTask/DeleteTask';
import UpdateTask from '../UpdateTask/UpdateTask';

const TasksData = () => {
    const dispatch = useDispatch();
    const TaskData = useSelector(state => state.tasksData)

    useEffect(() => {
        if (TaskData.length < 1) {
            dispatch(downloadTasksData())
        }
    }, []);

    return (
        <ul className="task-list">
            {TaskData.tasksData?.map((task) => {
                try {
                    if (task.name && task.description && task.startDate && task.endDate) {
                        return (
                            <li key={Number(task.id)} className="task-item">
                                <div className="task-info">
                                    <h3>{task.name}</h3>
                                    <p>{task.description}</p>
                                    <p>Start: {task.startDate}</p>
                                    <p>End: {task.endDate}</p>
                                </div>
                                <div className="task-actions">
                                    <UpdateTask task={task}/>
                                    <DeleteTask task={task}/>
                                </div>
                            </li>
                        )
                    } else {
                        return ''
                    }
                } catch (e) {
                    return ""
                }
            })}
        </ul>
    )
}

export default TasksData