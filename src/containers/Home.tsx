import { useState } from "react";
import AddTodoForm from "../components/features/todos/AddTodoForm";
import TodoList from "../components/features/todos/TodoList";
import useTodos from "../hooks/useTodos";
import { Fab, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Todo } from "../types/todo";

function Home() {
  const { addTodo, todos, toggleComplete, deleteTodo, editTodo } = useTodos();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTodo = (todo: Todo) => {
    addTodo(todo);
    setIsDialogOpen(false);
  };
  
  return (
    <div style={{ padding: "20px", position: "relative", minHeight: "calc(100vh - 64px)" }}>
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
        editTodo={editTodo}
      />
      
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={() => setIsDialogOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>

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
        <AddTodoForm addTodo={handleAddTodo} />
      </Dialog>
    </div>
  );
}

export default Home;
