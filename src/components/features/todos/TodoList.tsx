import { List, Typography } from "@mui/material";
import TodoItem from "./TodoItem";
import { Todo } from "../../../types/todo";

interface TodoListProps {
    todos: Todo[];
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (todo: Todo) => void;
}

const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }: TodoListProps) => {
    if (!todos.length) {
        return (
            <Typography 
                variant="body1" 
                sx={{ color: 'text.secondary' }}
                textAlign="center"
            >
                No todos available.
            </Typography>
        );
    }

    return (
        <List>
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    todo={todo} 
                    toggleComplete={toggleComplete} 
                    deleteTodo={deleteTodo} 
                    editTodo={editTodo}
                />
            ))}
        </List>
    );
}

export default TodoList;
