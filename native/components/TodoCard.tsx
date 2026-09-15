import {Text, View} from 'react-native'
import { Todo } from '../../types/todo';
import { Ionicons } from '@expo/vector-icons'
interface TodoProps {
    todo:Todo;
    onToggleComplete: (id: number) => void;
    // on delete
    
}
const TodoCard = ({todo, onToggleComplete}: TodoProps) => {
    return ( 
        <View className='w-full'>
            <View id='todo' className='w-full bg-neutral-900 rounded-2xl p-3 flex flex-row mt-3'>
                <Ionicons name="checkmark-circle" size={22} color="#e5e5e5" />
                <View id='mainContent' className='flex-1 ml-2'>
                    <Text id='title' className='font-bold text-lg text-white'>{todo.todo_title}</Text>
                    <Text id='description' className='text-neutral-400'>{todo.todo_description}</Text>
                    <View id='bottomLayer' className='flex flex-row justify-between mt-1'>
                        <View id='bubbles' className='flex flex-row gap-2'>
                            <Text id='priority' className=' badge badge-medium'>{todo.todo_priority}</Text>
                            <Text id='category' className='badge badge-category'>{todo.todo_category}</Text>
                        </View>
                        <Text id='dueDate' className='text-neutral-500'>
                            {todo.todo_due_date &&
                                new Date(todo.todo_due_date).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                        </Text>

                    </View>
                </View>
                <Ionicons name='trash-outline' size={18} color="#a3a3a3" />
            </View>
        </View>
     );
}
 
export default TodoCard;