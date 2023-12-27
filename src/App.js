import logo from './logo.svg';
import styles from './App.module.css';
import Background from './components/Background/skyline';
import TodoList from './components/TodoList/todolist';


const CurrentDateComponent = () => {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);


  return (
    <div>
     {formattedDate}
    </div>
  );
};


function App() {
  return (
       <div className="" > 
        
        <div className={styles["todo"]}>
        <img src={logo} className={`${styles["App-logo"]} ${styles.img}` } alt="logo" />
          <h1> Make your ToDo List</h1>

        
        
        <div className={styles["todo-bg-day"]}>

      

        <div className={styles["todo-bg-day-text"]}><h2>My Day</h2> <CurrentDateComponent /></div>
        </div>  
        <div className={styles["todo-bg"]}>   
        <TodoList /> 
        <span className={styles["copyright"]}>&copy; stunneagle &middot; Nottingham</span>
      </div>

        </div>
      
        

        
        <Background />
        
        </div>
    
  );
}

export default App;
