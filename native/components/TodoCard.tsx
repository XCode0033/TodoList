import {Text, View} from 'react-native'
import { Todo } from '../../types/todo';

interface TodoProps {
    todo:Todo[];
    onToggleComplete: (id: number) => void;
    // on delete
    
}
const TodoCard = () => {
    return ( 
        <View className='w-full'>
            <View id='todo' className='w-full bg-red-300 p-3 flex flex-row'>
                <Text id='leftsidecheckmark///removelater'>CheckMark</Text>
                <View id='mainContent' className='flex-1 ml-2'>
                    <Text id='title' className='font-bold text-lg'>Finish Spanish Practice</Text>
                    <Text id='description' className=''>5 minutes writing, 10 minutes reading, 15 minutes speaking with Perplexity</Text>
                    <View id='bottomLayer' className='flex flex-row justify-between mt-1'>
                        <View id='bubbles' className='flex flex-row gap-2'>
                            <Text id='priority' className=' badge badge-medium'>Medium</Text>
                            <Text id='category' className='badge badge-category'>Spanish</Text>
                        </View>
                        <Text id='dueDate' className='text-gray-200'>Due Sep 20</Text>

                    </View>
                </View>
                <Text id='deleteIcon'>Delete</Text>
            </View>
        </View>
     );
}
 
export default TodoCard;