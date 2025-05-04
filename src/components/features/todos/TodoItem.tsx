import { ListItem, Checkbox, Typography, Box, IconButton, Dialog } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Todo } from "../../../types/todo";
import EditTodoForm from "./EditTodoForm";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
}


const TodoItem = ( prop: TodoItemProps  ) => {
    const { todo, toggleComplete, deleteTodo, editTodo } = prop;
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleToggle = () => {
        toggleComplete(todo.id);
    };

    const handleDelete = () => {
        deleteTodo(todo.id);
    };

    const handleEdit = () => {
        setIsDialogOpen(true);
    }
        
    return (
      <>
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
            <IconButton aria-label="Edit todo" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete todo" color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
        <Dialog 
          open={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start',
              paddingTop: '10vh'
            }
          }}
          PaperProps={{
            sx: {
              position: 'relative',
              overflow: 'visible',
              '& .MuiPopover-root': {
                zIndex: 9999
              }
            }
          }}
        >
          <EditTodoForm todo={todo} editTodo={editTodo} setIsDialogOpen={setIsDialogOpen} />
        </Dialog>
      </>
 );
};

export default TodoItem;
