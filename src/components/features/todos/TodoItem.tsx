import { ListItem, Checkbox, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TodoItemProps } from "../../../types/TodoItemProps";


const TodoItem = ( prop: TodoItemProps  ) => {
    const { todo, toggleComplete, deleteTodo } = prop;

    const handleToggle = () => {
        toggleComplete(todo.id);
    };

    const handleDelete = () => {
        deleteTodo(todo.id);
    };

    return (
        <ListItem
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eee',
              py: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggle}
            
          />
            <Box sx={{ ml: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {todo.title}
              </Typography>
              {todo.description && (
                <Typography
                  variant="body2"
                  sx={{
                      color: todo.completed ? 'text.disabled' : 'text.secondary',
                  }}
                >
                  {todo.description}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary">
                Deadline: {todo.deadline.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box>
            <IconButton aria-label="Edit todo" onClick={() => { /* Edit action later */ }}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete todo" color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>

 );
};

export default TodoItem;
