
// Do i need to import anything?

import {type Todo} from '../../../types/todo';

interface TodoProps {
    todo:Todo,
    // toggle complete
    // on delete
}
const TodoCard = ({todo}:TodoProps) => {
    return (
        <div className='bg-gray-300 my-5 mx-5 pl-3 py-1 border rounded-lg '>
            <p>{todo.todo_title}</p>
            <p>{todo.todo_category}</p>
            <p>{todo.todo_description}</p>
            <p>{todo.todo_priority}</p>
            <p>BRANCH Changed </p>
            <p>TTYLXOX</p>
        </div>
     );
}

export default TodoCard;