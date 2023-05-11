import React, { useState, useRef } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");

    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    if (name.trim() !== "") {
      const newTasks = [...tasks, { name, done: false }];
      setTasks(newTasks);
    }
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };
  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4" style={{ textAlign: "center" }}>
      <h1>Lista de Tareas</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2 btn-container" key={i}>
              <h2
                style={{
                  textDecoration: t.done ? "line-through" : "",
                  width: "100%",
                  padding: "1px",
                }}
              >
                {t.name}
              </h2>
              <button
                className="btn btn-secondary btn-lg w-30"
                onClick={() => toggleDoneTask(i)}
              >
                {t.done ? "✓" : "✗"}
              </button>
              <button
                className="btn btn-danger btn-lg"
                onClick={() => removeTask(i)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
