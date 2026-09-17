import { Text, View, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { API_URL } from '@/constants/Api'
import {Todo} from '../../../types/todo'
import TodoCard from '@/components/TodoCard'
export default function TabOneScreen() {
  
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
   fetch(`${API_URL}/todos`)
   .then((res) => res.json())
   .then((setTodos))
   .catch((console.error))
  }, [])
  return (
    <ScrollView >
      <View className="flex-1 items-center justify-start bg-black">
      <View id='content' className='mt-3 ml-3'>
      {todos.map((todo) => (
        <TodoCard 
        key={todo.todo_id}
        todo={todo}
        onToggleComplete={(id) => console.log('Toggle', id)}
        />
      ))}
     

      </View>

      </View>
      
    </ScrollView>
  )
}
