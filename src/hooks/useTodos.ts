import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/todo';

export const useTodos = () => {
  // Initialize from localStorage, but only once on component mount
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error parsing todos from localStorage:', error);
      return [];
    }
  });

  // Persist to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  // Add a todo to the list of todos
  const addTodo = useCallback((todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  }, []);

  // Edit a todo in the list of todos
  const editTodo = useCallback((updated: Todo) => {
    setTodos(prev => prev.map(todo => (todo.id === updated.id ? updated : todo)));
  }, []);

  // Delete a todo from the list of todos
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Toggle the completed status of a todo
  const toggleComplete = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return { todos, addTodo, editTodo, deleteTodo, toggleComplete };
};

export default useTodos; 