import { useState, useEffect } from "react"
import TodoCard from "./components/TodoCard"
import type { Todo } from "../../types/todo"
const API_URL = import.meta.env.VITE_API_URL


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  // const [title, setTitle] = useState<string>('')
  // const [category, setCategory] = useState<string>('')
  // const [priority, setPriority] = useState<string>('')
  // const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  


  
  useEffect(() => {
    async function loadTodo(){
      try{
       const res = await fetch(`${API_URL}/todos`)
       if(!res.ok) throw new Error(`HTTP error: ${res.status}`)

        const data = await res.json()
        setTodos(data)
      }catch(err){
        console.error('Failed to load todos', err)
        setStatus("error")
      }finally {
        setIsLoading(false)
      }
    }
    loadTodo()
  }, [])
  return (
    <>
    {isLoading && <p>Loading...</p>}
{status === 'error' && <p>Could not load todos.</p>}
    <div id="todos">
      {todos.map((todo) => (
        <TodoCard
        key={todo.todo_id}
        todo={todo}
        />
      ))}
    </div>
    </>
  )
}

export default App
