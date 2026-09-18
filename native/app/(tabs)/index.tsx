import { Text, View, ScrollView, Alert } from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import { API_URL } from '@/constants/Api'
import {Todo} from '../../../types/todo'
import { useFocusEffect } from 'expo-router'
import TodoCard from '@/components/TodoCard'
export default function TabOneScreen() {
  
  const [todos, setTodos] = useState<Todo[]>([])
  const loadTodos = useCallback(() => {
    fetch(`${API_URL}/todos`)
   .then((res) => res.json())
   .then((setTodos))
   .catch((console.error))
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTodos()
    }, [loadTodos])
  )

  async function handleDelete(id:number) {
      try{
        const res = await fetch(`${API_URL}/todos/${id}`, {
          method: "DELETE",
        })
        const data = res.json()
  
        if(!res.ok){
          Alert.alert('Could not delete that item.')
          return
        }
        setTodos((prev) => prev.filter((t) => t.todo_id !== id))
        console.log('Todo deleted from the front end succesfully.')
      }catch(err){
        console.log(err)
        Alert.alert('Something went wrong with deleting that item')
      }
    }


  async function handleToggleComplete(id: number) {
  const target = todos.find((t) => t.todo_id === id)
  if (!target) return

  // optimistic update — flip the UI instantly
  setTodos((prev) =>
    prev.map((t) => (t.todo_id === id ? { ...t, todo_completed: !t.todo_completed } : t))
  )

  try {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo_completed: !target.todo_completed }),
    })
    if (!res.ok) throw new Error('Failed to update')
  } catch (err) {
    // roll back if the server rejected it
    setTodos((prev) =>
      prev.map((t) => (t.todo_id === id ? { ...t, todo_completed: target.todo_completed } : t))
    )
  }
}

  return (
    <ScrollView >
      <View className="flex-1 items-center justify-start bg-black">
      <View id='content' className='mt-3 ml-3'>
      {todos.map((todo) => (
        <TodoCard 
        key={todo.todo_id}
        todo={todo}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        />
      ))}
     

      </View>

      </View>
      
    </ScrollView>
  )
}
