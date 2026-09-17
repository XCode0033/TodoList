import {View, Text, TextInput, Pressable} from 'react-native'
import { Todo } from '../../../types/todo';
import { useState, useEffect } from 'react';
import { API_URL } from '@/constants/Api';

interface CreatedProps {
  todo: Todo;

}
const CreateTab = () => {

  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [priority, setPriority] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  // const [due_date, set_due_date] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')


  async function handleCreate() {
    try{
      const res = await fetch(`${API_URL}/createTodo`, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          todo_title: title,
          todo_category: category,
          todo_priority: priority,
          todo_description: description
        })
      })
      if(!res.ok){
        throw new Error('Server returned an error when posting.')
      }
  
      const data = await res.json()
      console.log(data)
      setStatus('success')
    }catch(err) {
      console.log(err)
      setStatus('error')
    }

    setTitle('')
    setCategory('')
    setPriority('')
    setDescription('')
  }

  useEffect(() => {
    if(status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 3000)
    return () => clearTimeout((timer))
  }, [status])
  return ( 
    <View>
      
      <TextInput className='dmtb '
      value={title}
      placeholder='Title'
      placeholderTextColor="#a3a3a3"
      onChangeText={setTitle} />
      <TextInput className='dmtb '
      value={category}
      placeholder='Category'
      placeholderTextColor="#a3a3a3"
      onChangeText={setCategory} />
      <TextInput className='dmtb '
      value={priority}
      placeholder='Priority'
      placeholderTextColor="#a3a3a3"
      onChangeText={setPriority} />
      <TextInput className='dmtb '
      value={description}
      placeholder='Description'
      placeholderTextColor="#a3a3a3"
      onChangeText={setDescription} />

      <Pressable onPress={handleCreate} >
        <Text className='text-white border border-gray-300 mt-5 p-3 mx-3 font-bold text-center'>Create Todo</Text>
      </Pressable>

      {status === 'success' && (
        <Text className='text-emerald-500 mx-3 mt-2'>Todo created!</Text>
      )}
      {status === 'error' && (
        <Text className='text-rose-500 mx-3 mt-2'>Something went wrong. Please try again.</Text>
      )}
      
    </View>
   );
}
 
export default CreateTab;