import { API_URL } from '@/constants/Api'
import { useLocalSearchParams } from 'expo-router'
import {useState, useEffect} from 'react'
import {View, Text, TextInput, Pressable} from 'react-native'
import { router } from 'expo-router'
const TodoDetail = () => {
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [priority, setPriority] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  // const [due_date, set_due_date] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    async function loadTodo(){
      try{
        const res = await fetch(`${API_URL}/todos/${id}`)
        if(!res.ok){
          throw new Error('Could not find todo for edit.')
        }
        const data = await res.json()
        const { todo } = data;
        setTitle(todo.todo_title ?? "")
        setCategory(todo.todo_category ?? "")
        setPriority(todo.todo_priority ?? "")
        setDescription(todo.todo_description ?? "")
        
        
      }catch(err){
        console.log(err)
      }finally{
        setIsLoading(false)
      }
    }
    if(id){
      loadTodo()
    }
  }, [id])

  useEffect(() => {
    if(status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 3000)
    return () => clearTimeout((timer))
  }, [status])

  async function handleSave() {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo_title: title,
        todo_category: category,
        todo_priority: priority,
        todo_description: description,
      })
    })
    if (!res.ok) {
      throw new Error('Server returned an error when saving.')
    }

    const data = await res.json()
    console.log(data)

    setStatus('success')
    setTimeout(() => router.back(), 800)
  } catch (err) {
    console.log(err)
    setStatus('error')
  }
}
  return (
    <View>
      <TextInput className='dmtb'
      value={title}
      placeholder='Title'
      placeholderTextColor="#a3a3a3"
      onChangeText={setTitle}/>
      
      <TextInput className='dmtb'
      value={category}
      placeholder='Category'
      placeholderTextColor="#a3a3a3"
      onChangeText={setCategory}/>

      <TextInput className='dmtb'
      value={priority}
      placeholder='Priority'
      placeholderTextColor="#a3a3a3"
      onChangeText={setPriority}/>

      <TextInput className='dmtb'
      value={description}
      placeholder='Description'
      placeholderTextColor="#a3a3a3"
      onChangeText={setDescription}/>

      <Pressable className='border border-gray-300 rounded-lg p-3 mt-5 mx-3 items-center ' onPress={handleSave}>
        <Text className='text-white '>Edit Todo</Text>
      </Pressable>

      {status === 'success' && (
        <Text className='text-green-300 font-bold'>Todo Edited Successfully!</Text>
      )}
      {status === 'error' && (
        <Text className='text-rose-500 font-bold'>Error. Could not edit todo.</Text>
      )}
    </View>
  );
}

export default TodoDetail
