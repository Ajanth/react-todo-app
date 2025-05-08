import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FilterType } from '../../../hooks/useTodos';

interface FilterTodosProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  allTodos: number;
  activeTodos: number;
  completedTodos: number;
}

const FilterTodos = ({ filter, setFilter, allTodos, activeTodos, completedTodos }: FilterTodosProps) => {
  const handleChange = (event: SelectChangeEvent<FilterType>) => {
    setFilter(event.target.value as FilterType);
  };

  return (
    <FormControl 
      size="small"
      sx={{ 
        mb: 2,
        minWidth: 200,
        display: 'flex',
        alignItems: 'center',
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        }
      }}
    >
      <Select
        value={filter}
        onChange={handleChange}
      >
        <MenuItem value="all">All ({allTodos})</MenuItem>
        <MenuItem value="active">Active ({activeTodos})</MenuItem>
        <MenuItem value="completed">Completed ({completedTodos})</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterTodos;
