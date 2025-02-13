import React, { useState } from "react";
import "./Todo.css";
import { TodoList } from "./TodoList.jsx";
import { TodoForm } from "./TodoForm.jsx";
import { TodoDate } from "./TodoDate.jsx";


const todoKey = "reactTodo";

export const Todo = () => {
 
    const [task, setTask] = useState(()=>{
        const rawTodos = localStorage.getItem(todoKey);
        if(!rawTodos) return [];
        return JSON.parse(rawTodos)
    });
    
   
    const handleFormSubmit = (inputValue) => {
       const {id,content,checked} = inputValue
        if (!content) return; /*if input value is empty then return, means dont store the data in array */
        /* setTask((prev) => console.timeLog(prev)) set the task array with previous value and add new value, here first value will be ignored of usestate */
       /* if (task.includes(inputValue)) {
            return;
        }; if the task array already contains the input value then return, means dont store the data in array */

        const ifTodoContentMatched = task.find((curTask)=>curTask.content===content);
        if(ifTodoContentMatched) return;
        setTask((prevTask) => [...prevTask, {id:id, content, checked:checked}]); /*spread operator is used to copy the previous value of task array and add new value */
       
    }

    localStorage.setItem(todoKey, JSON.stringify(task));
 
  
    const handleDeleteTodo = (value) =>{
        const newTask = task.filter((curTask) => curTask.content !== value);
        setTask(newTask)
    }

    const handleDeleteTodoData = () => {
        setTask([]);
    }

    const handleCheckedTodo = (content)=>{
        const updateTask = task.map((curTask)=>{
            if(curTask.content ===content){
                return {...curTask, checked: !curTask.checked}
            }else{
                return curTask;
            }
        })
       setTask(updateTask);
    }
    
  
    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate />
            </header>
            <TodoForm onAddTodo={handleFormSubmit}/>
            <section className="myUnorderedList">
                <ul>
                    {
                        task.map((curTask) => {
                            return (
                                <TodoList key={curTask.id} data={curTask.content} checked={curTask.checked} onhandleDeleteTodo={handleDeleteTodo} onHandleCheckedTodo = {handleCheckedTodo}/>
                            )
                        })
                    }
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleDeleteTodoData}>Clear All</button>
            </section>
        </section>
    );
}