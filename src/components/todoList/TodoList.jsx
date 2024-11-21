import { useEffect, useState } from "react";
import TodoListItem from "./item/TodoListItem";
import AddTodo from "../addTodo/AddTodo";
import FilterTask from "../filterTask/FilterTask";
import { addTodoApi, deleteTodoApi, updateTodoApi } from "../../apis/api";
import './TodoList.css';

const TodoList = () => {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filterValue, setFilterValue] = useState("all");

  useEffect(() => {
    const storedList = getStoredList();
    if (storedList.length > 0) {
      setList(storedList);
    } else {
      (async () => {
        const response1 = await fetch("https://dummyjson.com/todos?limit=10");
        const response = await response1.json();
        if (Array.isArray(response?.todos)) {
          setList(response?.todos);
          localStorage.setItem("todoList", JSON.stringify(response.todos));
        }
      })();
    }
  }, []);

  const setLocalStorage = (value) => {
    if (!localStorage.getItem("todoList")) {
      localStorage.setItem("todoList", JSON.stringify(value));
    } else {
      localStorage.removeItem("todoList");
      localStorage.setItem("todoList", JSON.stringify(value));
    }
  };

  const getStoredList = () => {
    const getList = localStorage.getItem("todoList");
    return getList && getList !== "undefined" ? JSON.parse(getList) : [];
  };

  const handleFilterValue = (value) => {
    setFilterValue(value);

    switch (value) {
      case "all":
        setList(getStoredList());
        break;
      case "completed":
        const getList = getStoredList();
        const filteredList = getList.filter((item) => item.completed);
        setList(filteredList);
        break;
      case "pending":
        const getPendingList = getStoredList();
        const filteredPendingList = getPendingList.filter(
          (item) => !item.completed
        );
        setList(filteredPendingList);
        break;
      default:
        return null;
    }
  };

  const addTodo = async () => {
    const payload = {
      todo: newTodo,
      completed: false,
      userId: list[0].userId,
    };

    const items = [...list];

    items.push({ id: list[list.length - 1].id + 1, ...payload });
    setLocalStorage(items);
    setList(items);
    setNewTodo('');

    // update data
    await addTodoApi(payload);
  };

  const updateTodo = async (item, index) => {
    const items = [...list];

    items[index] = {
      ...item,
      completed: !item.completed,
    };
    setList(items);
    setLocalStorage(items);

    // Updating todos data with api
    await updateTodoApi(item?.id, { completed: !item.completed });
  };

  const deleteTodo = async (item, index) => {
    const text =
      "Are you sure you want to remove this todo item ?, this action is irreversible";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(text) === true) {
      const items = [...list];
      items.splice(index, 1);

      setLocalStorage(items);
      setList(items);

      // Updating todos data with api
      await deleteTodoApi(item?.id);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <FilterTask
        filterValue={filterValue}
        setFilterValue={handleFilterValue}
      />
      {list.length > 0 ? (
        <div className="listWrapper">
          {list.map((item, index) => (
            <TodoListItem
              key={item.id}
              item={item}
              updateTodo={() => updateTodo(item, index)}
              deleteTodo={() => deleteTodo(item, index)}
            />
          ))}
        </div>
      ) : (
        <div>No Task in todo</div>
      )}
    </div>
  );
};

export default TodoList;
