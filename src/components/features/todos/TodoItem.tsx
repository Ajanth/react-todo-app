import { ListItem, Checkbox, Typography, Box, IconButton, Dialog, keyframes } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlarmIcon from '@mui/icons-material/Alarm';
import { Todo } from "../../../types/todo";
import EditTodoForm from "./EditTodoForm";
import { useState } from "react";

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
}

const TodoItem = ( prop: TodoItemProps  ) => {
    const { todo, toggleComplete, deleteTodo, editTodo } = prop;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isOverdue = !todo.completed && todo.deadline < new Date();

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
              backgroundColor: isOverdue ? 'error.main' : 'transparent',
              animation: isOverdue ? `${pulseAnimation} 2s ease-in-out infinite` : 'none',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: isOverdue ? 'error.dark' : 'action.hover',
              },
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
                color: isOverdue ? 'common.white' : todo.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {todo.title}
              </Typography>
              {todo.description && (
                <Typography
                  variant="body2"
                  sx={{
                      color: isOverdue ? 'common.white' : todo.completed ? 'text.disabled' : 'text.secondary',
                  }}
                >
                  {todo.description}
                </Typography>
              )}
              <Typography 
                variant="caption" 
                sx={{
                  color: isOverdue ? 'common.white' : 'text.secondary',
                }}
              >
                Deadline: {todo.deadline.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isOverdue && (
              <AlarmIcon
                sx={{
                  color: 'common.white',
                  mr: 1,
                  animation: `${pulseAnimation} 2s ease-in-out infinite`,
                }}
              />
            )}
            <IconButton 
              aria-label="Edit todo" 
              onClick={handleEdit}
              sx={{ color: isOverdue ? 'common.white' : 'default' }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              aria-label="Delete todo" 
              onClick={handleDelete}
              sx={{ color: isOverdue ? 'common.white' : 'error.main' }}
            >
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
