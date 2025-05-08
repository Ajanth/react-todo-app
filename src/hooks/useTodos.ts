import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo } from '../types/todo';

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'deadline' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export const useTodos = () => {
  // Initialize from localStorage, but only once on component mount
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved, (key, value) => {
        // Convert date strings back to Date objects
        if (key === 'deadline' || key === 'createdAt') {
          return new Date(value);
        }
        return value;
      }) : [];
    } catch (error) {
      console.error('Error parsing todos from localStorage:', error);
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('deadline');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Persist to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  // Filter and sort todos based on current filter and sort settings
  const filteredTodos = useMemo(() => {
    let result = [...todos];

    // Apply filter
    switch (filter) {
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = sortBy === 'deadline' ? a.deadline : a.createdAt;
      const dateB = sortBy === 'deadline' ? b.deadline : b.createdAt;
      
      return sortOrder === 'asc' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    return result;
  }, [todos, filter, sortBy, sortOrder]);

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

  return { 
    todos: filteredTodos, 
    allTodos: todos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addTodo, 
    editTodo, 
    deleteTodo, 
    toggleComplete 
  };
};

export default useTodos;