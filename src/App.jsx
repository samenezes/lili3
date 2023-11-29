import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "23 graus",
      categoria: "Morna",
    },
    {
      id: 2,
      text: "12 graus",
      categoria: "fria",
    },
    {
      id: 3,
      text: "43 graus",
      categoria: "quente",
    },
  ]);

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Asc")

  
  const addTodo =(text, categoria) => {
    const newTodos = [...todos, {
      id: Math.floor(Math.random() * 10000),
      text,
      categoria,
    }
  ] 
  
  setTodos(newTodos) 

  }

  
  const removeTodo = (id) => {
    const newTodos = [...todos]
    
    const filterTodos = newTodos.filter(todo => 
      todo.id !== id ? todo : null
    )
    setTodos(filterTodos)
  }

  return (
    <>
      <div className="app">
        <h1>Temperaturas</h1>
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        <div className="todo-list">
          {todos
          .filter((todo) => filter === "All" 
          ? true 
          : filter === "Completed" 
          ? todo.isCompleted 
          : !todo.isCompleted 
          ) 
          .filter((todo) => 
            todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) => sort === "Asc" 
          ? a.text.localeCompare(b.text) 
          : b.text.localeCompare(a.text)) 
          .map((todo) => (
            <Todo key={todo.id} todo={todo} removeTodo={removeTodo} completeTodo={completeTodo} /> 
          ))}
        </div>
        <TodoForm addTodo={addTodo} />
      </div>
    </>
  );
}

export default App
