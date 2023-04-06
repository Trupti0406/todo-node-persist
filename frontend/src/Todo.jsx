import React, { useEffect, useState } from "react";

const defaultField = { todo: "" };
const Todo = () => {
  const [todoInput, setTodoInput] = useState(defaultField);
  const [toDoList, setTodoList] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const { todo } = todoInput;
    try {
      fetch("http://localhost:8000/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo }),
      }).then((response) => {
        response.json();
      });

      // Resetting Task Input after submit
      setTodoInput(defaultField);

      // Get request to fetch the updated data from node-persist storage
      fetch("http://localhost:8000/getTodo")
        .then((response) => response.json())
        .then((data) => {
          setTodoList(data.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Deleteing node persist storage when app restarts
  const deleteHandler = () => {
    fetch("http://localhost:8000/getTodo", {
      method: "DELETE",
    })
      .then(() => {
        setTodoList([]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  // This useEffect() hook will call the deleteHandler everytime the page reloads
  useEffect(() => {
    deleteHandler();
  }, []);

  return (
    <div className="">
      <h1 className="text-center mt-3 mt-md-5">TODO List App</h1>
      <form onSubmit={submitHandler} className="p-5">
        {/* Input */}
        <div className="mb-3">
          <div className="input__group input-group">
            <span className="bg-info p-3 fw-semibold" id="basic-addon3">
              Enter The Task:
            </span>
            <input
              type="text"
              className="form-control p-3 fw-semibold"
              id="title"
              aria-describedby="basic-addon3 basic-addon4"
              placeholder="Go to the library"
              required
              value={todoInput.todo}
              onChange={(e) =>
                setTodoInput({ ...todoInput, todo: e.target.value })
              }
            />
            <span>
              <button
                type="submit"
                className="btn btn-success p-3 ms-2 rounded fw-semibold"
              >
                Add Task
              </button>
            </span>
          </div>
        </div>

        {/* output */}
        <ul className="output-list list-group mt-5 w-md-75">
          {toDoList &&
            toDoList.map((storage) => (
              <li
                key={storage.id}
                className="list-group-item mb-3 py-3 rounded text-center fw-bold bg-light"
              >
                {/* {console.log(storage.todo)} */}
                {storage.todo}
              </li>
            ))}
        </ul>
      </form>
    </div>
  );
};

export default Todo;
