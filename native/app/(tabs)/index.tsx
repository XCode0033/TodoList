import { Text, View } from 'react-native'
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
    <View className="flex-1 items-center justify-start bg-white dark:bg-black">
      <View id='content' className='mt-3 ml-3'>
      <Text>Test</Text>
     

      </View>
      
    </View>
  )
}
