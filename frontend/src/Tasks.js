import React, { Component } from "react";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/taskServices";

class Tasks extends Component {
  state = { tasks: [], currentTask: "" };

  async componentDidMount() {
    try {
      const { data } = await getTasks();
      this.setState({ tasks: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.state.currentTask.trim()) return;

    try {
      const { data } = await addTask({ task: this.state.currentTask });

      this.setState({
        tasks: [...this.state.tasks, data],
        currentTask: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async (id) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((t) => t._id === id);

      tasks[index].completed = !tasks[index].completed;

      this.setState({ tasks });

      await updateTask(id, {
        completed: tasks[index].completed,
      });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  handleDelete = async (id) => {
    const originalTasks = this.state.tasks;

    try {
      const tasks = originalTasks.filter((t) => t._id !== id);

      this.setState({ tasks });

      await deleteTask(id);
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.currentTask}
            onChange={this.handleChange}
            placeholder="Add Task"
          />
          <button type="submit">Add</button>
        </form>

        <ul>
          {this.state.tasks.map((task) => (
            <li key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => this.handleUpdate(task._id)}
              />
              {task.task}
              <button onClick={() => this.handleDelete(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Tasks;
