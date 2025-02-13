import React, { useState } from "react";


export const TodoForm = ({onAddTodo}) => {
       const [inputValue, setInputValue] = useState({});
       const handleInputChange = (value) => {
        setInputValue({id:value, content:value, checked:false});
    }

    const handleFormProceed = (event) => {
        event.preventDefault(); /*used to prevent default behaviour of form */
        onAddTodo(inputValue);
        setInputValue({id:"", content:"", checked: false}); /*set the input value to empty */
    }

return(
    <section className="form">
    <form onSubmit={(event) => handleFormProceed(event)}>
        <div>
            <input type="text" className="todo-input" autoComplete="off" value={inputValue.content} onChange={(event) => handleInputChange(event.target.value)} />
        </div>
        <div>
            <button type="submit" className="todo-btn">Add Task</button>
        </div>
    </form>
</section>
);
}