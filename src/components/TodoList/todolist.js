import React from 'react';
import styles from './todolist.module.css'


class TodoList extends React.Component{
    constructor(props){
        super(props);
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.state = {
            task: '',
            tasks: savedTasks,
            editingTask: null,
            completedTasks: [],
            filter: 'All',
        };
    }
    componentDidUpdate() {
        // Save tasks to localStorage whenever the state changes
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        localStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
      }

    handleInputChange = (e) => {
        this.setState({task: e.target.value});
    };

    handleAddTask = () => {
        const {task, tasks} = this.state;
        if (task.trim() !== ''){
            this.setState({
                tasks:[...tasks, { text: task, completed: false }],
                task: '',
            });
        }
    };
    handleEditChange = (e) => {
        const {value} = e.target;
        const {editingTask, tasks} = this.state;
        // Update the editing task's text in the state
        this.setState({
            tasks: tasks.map((task,index) =>
            index ===editingTask ? { ...task, text: value }:task ),
        });
    };
  handleEditTask = (index) => {
    this.setState({editingTask:index});
  }
  saveEditedTask = () => {
    // Clear the editing task from the state
    this.setState({ editingTask: null });
};
    
    handleDeleteTask = (index) => {
        const {tasks} = this.state;
        const updatedTasks = tasks.filter((_,i) => i !== index);
        this.setState({tasks:updatedTasks});
    };
    handleCompleteTask = (index) => {
        const {tasks, completedTasks} = this.state;
        const updatedTasks = tasks.map((task, i) =>
        i === index ? {...task, completed: !task.completed}:task);


        const updatedCompletedTasks = updatedTasks[index].completed 
        ? [...completedTasks, updatedTasks[index].text] 
        : completedTasks.filter((completedTask) => completedTask !== updatedTasks[index].text);

        this.setState({
            tasks: updatedTasks,
            completedTasks: updatedCompletedTasks,
        });
    };
    render()
        {
            const {task, tasks, editingTask, filter} = this.state;

            const filteredTasks = 
            filter === 'Completed'
            ? tasks.filter((taskItem) => taskItem.completed)
            : filter === 'Uncompleted'
            ? tasks.filter((taskItem) => !taskItem.completed)
            : tasks;
    return(
            <div className={styles["todo-list"]}>
                <div className={styles["todo-list-task-add"]}>
                <input placeholder='Enter new task' type='text' value={task} onChange={this.handleInputChange} />
                <button onClick={this.handleAddTask}>Add Task</button>

                
                </div>
                <div className={styles["todo-list-task-option"]}>
                <select onChange={(e) => this.setState({filter: e.target.value})}>
                    <option value="All" >All</option>
                    <option value="Completed">Completed</option>
                    <option value="Uncompleted">Uncompleted</option>
                </select>
                </div>
                
               <div className={styles["todo-list-tasks"]}> <ul>
                    {filteredTasks.map((taskItem,index) => (
                        <li key={index}>
                            {editingTask === index ? (
    <div className={styles["space-between"]}>
        <input
            type="text"
            value={taskItem.text}
            onChange={this.handleEditChange}
            className={styles["todo-edit"]}
        />
        <button className={styles["todo-save"]} onClick={this.saveEditedTask}><i class="fa fa-check-square green" aria-hidden="true"></i></button>
    </div>
                        ) : (
    <div>
      

      <div className={`${styles["custom-checkbox-wrapper"]} ${styles["space-between"]}`}>
       
<div className={styles.flex}>

<input
    type="checkbox"
    id={`checkbox-${index}`}
    checked={taskItem.completed}
    onChange={() => this.handleCompleteTask(index)}
  />
  <label htmlFor={`checkbox-${index}`} className={styles["custom-checkbox"]}></label>

<em className={taskItem.completed ? styles["completed-task"] : ''}>{taskItem.text}</em>
  
</div>
        

<div className={styles["task-button"]}>

       
        <button onClick={() => this.handleEditTask(index)}><i class="fa fa-pencil-square-o green" aria-hidden="true"></i></button>
        <button onClick={() => this.handleDeleteTask(index)}><i className="fa fa-trash red" aria-hidden="true"></i></button>
</div>
        


 



        
         </div>
    </div>
)}
 </li>
                    ))}
                </ul>
                </div>
            </div>
        )}
    ;
}

export default TodoList;

