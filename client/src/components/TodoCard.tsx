


import {type Todo} from '../../../types/todo';

interface TodoProps {
    todo:Todo,
    // toggle complete
    // on delete
}
const TodoCard = ({todo}:TodoProps) => {
    return (
        <div className='bg-neutral-500 my-5 mx-5 pl-3 py-1  rounded-lg  text-gray-100 flex flex-row  justify-between'>
            <div id='icon-and-date' className='flex flex-row gap-2'>
            <div id='icon'>
                <p>Icon</p>
            </div>

            <div id='data-side'>
            <p className='title-text'><strong>{todo.todo_title}</strong></p>
            <p>{todo.todo_category}</p>
            <p>{todo.todo_description}</p>
            <p>{todo.todo_priority}</p>
            </div>
            </div>

            <div id='delete' className='pr-1'>
                <p>D</p>
            </div>
           
        </div>
     );
}

export default TodoCard;