import React from "react";
import Tasks from "./Tasks";
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import "./App.css";

class App extends Tasks {
  render() {
    const { tasks, currentTask } = this.state;

    return (
      <div className="app">
        <header className="app-header">
          <h1>My To-Do List</h1>
        </header>

        <div className="main-content">
          <Paper elevation={3} className="todo-container">

            {/* INPUT */}
            <form onSubmit={this.handleSubmit} className="task-form">
              <TextField
                variant="outlined"
                size="small"
                value={currentTask}
                onChange={this.handleChange}
                placeholder="Add New Task"
              />
              <Button type="submit" color="primary" variant="contained">
                Add Task
              </Button>
            </form>

            {/* LIST */}
            <div className="tasks-list">
              {tasks.map((task) => (
                <Paper key={task._id} className="task-item">
                  <Checkbox
                    checked={task.completed}
                    onClick={() => this.handleUpdate(task._id)}
                  />

                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.task}
                  </span>

                  <Button
                    onClick={() => this.handleDelete(task._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </Paper>
              ))}
            </div>

          </Paper>
        </div>
      </div>
    );
  }
}

export default App;
