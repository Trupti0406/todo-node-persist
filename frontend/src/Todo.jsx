import React from "react";

const Todo = () => {
  return (
    <div className="">
      <h1 className="text-center mt-3">TODO List App</h1>
      <div div className="container p-5">
        {/* Input */}
        <div className="mb-3">
          <div className="input__group">
            <span className="bg-info p-3 fw-semibold" id="basic-addon3">
              Enter The Task:
            </span>

            <input
              type="text"
              className="form-control p-3 fw-semibold"
              id="title"
              aria-describedby="basic-addon3 basic-addon4"
              placeholder="Go to the library"
            />
            <span>
              <button className="btn btn-success p-3 ms-2 rounded fw-semibold">
                Add Task
              </button>
            </span>
          </div>
        </div>
        {/* output */}
        <ul className="output-list list-group mt-5">
          <li className="list-group-item mb-3 p-2 rounded">
            Pick up cat food from store
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Todo;
