import { TextField, Box, Button, Card, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import { Todo } from '../../../types/todo';

interface AddTodoFormProps {
  addTodo: (todo: Todo) => void;
}

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!deadline || deadline.getTime() < Date.now()) {
      setError('Please select a valid future date.');
      return;
    }

   const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim() || undefined,
    deadline,
    completed: false,
  };

    addTodo(newTodo);

    setTitle('');
    setDescription('');
    setDeadline(null);
  };

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          margin="normal"
        />
        <DateTimePicker
          label="Deadline"
          value={deadline}
          onChange={(newValue) => setDeadline(newValue)}
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
              required: true
            },
            popper: {
              sx: {
                zIndex: 99999
              },
              placement: "bottom-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 8]
                  }
                }
              ]
            }
          }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>
    </Card>
  );
};

export default AddTodoForm;


