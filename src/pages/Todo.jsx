import React, { useState, useEffect, useCallback } from "react";
import { addTodo, updateTodo, getTodo, deleteTodo } from "../APIs/Todo";
import useSWR, { mutate } from "swr";
import toast, { Toaster } from "react-hot-toast";
import "./assets/Todo.css";

function Todo() {
  const {
    isLoading,
    error,
    data: todos,
  } = useSWR(process.env.REACT_APP_API_URL, getTodo, {
    revalidateOnFocus: false,
  });

  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
    userId: 1,
  });

  const handleAdd = async () => {
    try {
      await mutate(process.env.REACT_APP_API_URL, addTodo(newTodo), {
        optimisticData: (todos) =>
          [...todos, newTodo].sort(
            (a, b) => parseInt(b.id, 16) - parseInt(a.id, 16)
          ),
        rollbackOnError: true,
        populateCache: (added, todos) =>
          [...todos, added].sort(
            (a, b) => parseInt(b.id, 16) - parseInt(a.id, 16)
          ),
        revalidate: false,
      });
      toast.success("Success! Added new item.", {
        duration: 1000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
      });
    }
    setNewTodo({
      title: "",
      completed: false,
      userId: 1,
    });
  };

  const handleDelete = async (id) => {
    try {
      await mutate(process.env.REACT_APP_API_URL, deleteTodo(id), {
        optimisticData: (todos) =>
          todos
            .filter((t) => t.id != id)
            .sort((a, b) => parseInt(b.id, 16) - parseInt(a.id, 16)),
        rollbackOnError: true,
        populateCache: (res, todos) =>
          todos
            .filter((t) => t.id != id)
            .sort((a, b) => parseInt(b.id, 16) - parseInt(a.id, 16)),
        revalidate: false,
      });
      toast.success("Success! Deleted item.", {
        duration: 1000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
      });
    }
  };

  const handleUpdate = async (todo) => {
    try {
      const newTodo = {
        ...todo,
        completed: !todo.completed,
      };
      await mutate(process.env.REACT_APP_API_URL, updateTodo(newTodo), {
        optimisticData: (todos) => {
          let restTodos = todos.filter((t) => t.id != todo.id);
          let updatedTodos = [...restTodos, newTodo].sort(
            (a, b) => parseInt(b.id, 16) - parseInt(a.id, 16)
          );
          return updatedTodos;
        },
        rollbackOnError: true,
        populateCache: (res, todos) => {
          let restTodos = todos.filter((t) => t.id != todo.id);
          let updatedTodos = [...restTodos, newTodo].sort(
            (a, b) => parseInt(b.id, 16) - parseInt(a.id, 16)
          );
          return updatedTodos;
        },
        revalidate: false,
      });
      toast.success("Success! Updated item.", {
        duration: 1000,
        icon: "🎉",
      });
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
      });
    }
  };

  const handleInputChange = useCallback((e) => {
    setNewTodo((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }, []);

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>...Error</div>;

  return (
    <div className="todo-container">
      <Toaster toastOptions={{ position: "top-center" }} />
      <h1>Todos</h1>
      <div className="add-todo">
        <label>Title</label>
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => handleInputChange(e)}
        ></input>
        <button onClick={handleAdd}>Add Todo</button>
      </div>
      <div>
        {todos?.map((todo) => {
          return (
            <div key={todo.id} className="todo-item">
              <h3>{todo.title}</h3>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUpdate(todo)}
              ></input>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
