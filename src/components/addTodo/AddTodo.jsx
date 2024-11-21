import './AddTodo.css'

const AddTodo = ({ newTodo, setNewTodo, addTodo }) => {
  return (
    <div>
      <input className="txtBox" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button className='addBtn' type='button' onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
