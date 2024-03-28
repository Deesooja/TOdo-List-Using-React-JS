import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [NewTitle, setNewTitle] = useState("");
  const [NewDescription, setNewDescription] = useState("");
  const [allTodos, setTodos] = useState([]);
  const [allCompletedTodos, setallCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: NewTitle,
      description: NewDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem("todolist"));
    let saveCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (saveTodo) {
      setTodos(saveTodo);
    }

    if (saveCompletedTodo) {
      setallCompletedTodos(saveCompletedTodo)
    }
  }, []);

  // FOR TODO LIST
  const HandleDeleteBtn = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo = reducedTodo.filter((todo, i) => i !== index);
    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  };

  // FOR COMPLETED TODO LIST
  const HandleCompletedDeleteBtn = (index)=>{
    let all_completed_todo_list = [...allCompletedTodos]
    let new_all_completed_todo_list = all_completed_todo_list.filter((item,i)=> i !== index)
    setallCompletedTodos(new_all_completed_todo_list)
    localStorage.setItem('completedTodos', JSON.stringify(new_all_completed_todo_list))
  }


  // HANDLE COMPLETE BUTTON
  const handleComplete = (index)=>{
    let all_todo_list = [... allTodos]
    let completed_todo = all_todo_list[index]
    let new_todo_list = all_todo_list.filter((item, i)=> i!==index)

    // TODO SECTION
    setTodos(new_todo_list)
    localStorage.setItem('todolist', JSON.stringify(new_todo_list))

    // COMPLETED SECTION
    completed_todo["CompletedOn"] = DatetimeNow()
    let all_completed_todo_list = [...allCompletedTodos]
    all_completed_todo_list.push(completed_todo)
    setallCompletedTodos(all_completed_todo_list)
    localStorage.setItem('completedTodos', JSON.stringify(all_completed_todo_list))
  }

  const DatetimeNow = () => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
      return completedOn
  };

  const TodoScreen = () => {
    return allTodos.map((item, index) => {
      return (
        <div className="todo-list-item" key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
          <div className="btn_div">
            <button
              className="utility_btn delete"
              onClick={() => HandleDeleteBtn(index)}
            >
              Delete
            </button>
            <button className="utility_btn complete" onClick={()=> handleComplete(index)}>Completed</button>
          </div>
        </div>
      );
    });
  };

  const CompletedScreen = () => {
    return allCompletedTodos.map((item, index) => {
      return (
        <div className="todo-list-item" key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>Completed on: {item.CompletedOn}</small></p>
          </div>
          <div className="btn_div">
            <button
              className="utility_btn delete"
              onClick={() => HandleCompletedDeleteBtn(index)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="App">
      <h1>My Todo</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={NewTitle}
              placeholder="What is title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={NewDescription}
              placeholder="What is Description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={
              isCompleteScreen ? "secondaryBtn" : "secondaryBtn active"
            }
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={
              isCompleteScreen ? "secondaryBtn active" : "secondaryBtn"
            }
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {
            isCompleteScreen ? <CompletedScreen /> : <TodoScreen />

            // allTodos.map((item, index) => {
            //   return (
            //     <div className="todo-list-item" key={index}>
            //       <div>
            //         <h3>{item.title}</h3>
            //         <p>{item.description}</p>
            //       </div>
            //       <div className="btn_div">
            //         <button
            //           className="utility_btn delete"
            //           onClick={() => HandleDeleteBtn(index)}
            //         >
            //           Delete
            //         </button>
            //         <button className="utility_btn complete">Completed</button>
            //       </div>
            //     </div>
            //   );
            // })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
