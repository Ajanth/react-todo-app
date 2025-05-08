import { TextField, Button, Box, Card, Typography } from "@mui/material";
import { Todo } from "../../../types/todo";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface EditTodoFormProps {
    todo: Todo;
    editTodo : (todo: Todo) => void;
    setIsDialogOpen: (isOpen: boolean) => void;
}

const EditTodoForm = ( { todo, editTodo, setIsDialogOpen }: EditTodoFormProps) => {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || "");
    const [deadline, setDeadline] = useState<Date | null>(new Date(todo.deadline));
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        if (!deadline || deadline.getTime() < Date.now()) {
            setError("Please select a valid future date.");
            return;
        }        const updatedTodo: Todo = {
            ...todo,
            title: title.trim(),
            description: description.trim() || undefined,
            deadline,
            createdAt: todo.createdAt // Preserve the original creation date
        };

        editTodo(updatedTodo);
        setIsDialogOpen(false);
    };

    return (
        <Card sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Edit Task
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
                    Save Changes
                </Button>
            </Box>
        </Card>
    );
};

export default EditTodoForm;