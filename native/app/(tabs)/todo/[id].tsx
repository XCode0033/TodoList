import { API_URL } from '@/constants/Api'
import { useLocalSearchParams } from 'expo-router'
import {useState, useEffect} from 'react'
import {View, Text, TextInput} from 'react-native'
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
    </View>
  );
}

export default TodoDetail
