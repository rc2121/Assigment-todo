export const addTodoApi= async (data) => {
  try {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
  
    return result;
  } catch (error) {
    console.log('Error occurred while adding todo', error);
    return null;
  }
};

export const updateTodoApi = async (id, data) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
  
    return result;
  } catch (error) {
    console.log('Error occurred while updating todo', error);
    return null;
  }
};

export const deleteTodoApi = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
  
    return result;
  } catch (error) {
    console.log('Error occurred while deleting todo', error);
    return null;
  }
};
