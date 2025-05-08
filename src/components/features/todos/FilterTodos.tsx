import { FormControl, Select, MenuItem, SelectChangeEvent, Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FilterType, SortType, SortOrder } from '../../../hooks/useTodos';

interface FilterTodosProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortBy: SortType;
  setSortBy: (sortBy: SortType) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
  allTodos: number;
  activeTodos: number;
  completedTodos: number;
}

const FilterTodos = ({ 
  filter, 
  setFilter, 
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  allTodos, 
  activeTodos, 
  completedTodos 
}: FilterTodosProps) => {
  const handleFilterChange = (event: SelectChangeEvent<FilterType>) => {
    setFilter(event.target.value as FilterType);
  };

  const handleSortChange = (event: SelectChangeEvent<SortType>) => {
    setSortBy(event.target.value as SortType);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 2,
      alignItems: 'center'
    }}>
      <FormControl 
        size="small"
        sx={{ 
          minWidth: 200,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      >
        <Select
          value={filter}
          onChange={handleFilterChange}
        >
          <MenuItem value="all">All ({allTodos})</MenuItem>
          <MenuItem value="active">Active ({activeTodos})</MenuItem>
          <MenuItem value="completed">Completed ({completedTodos})</MenuItem>
        </Select>
      </FormControl>

      <FormControl 
        size="small"
        sx={{ 
          minWidth: 150,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      >
        <Select
          value={sortBy}
          onChange={handleSortChange}
        >
          <MenuItem value="deadline">Sort by Deadline</MenuItem>
          <MenuItem value="createdAt">Sort by Created Date</MenuItem>
        </Select>
      </FormControl>

      <IconButton onClick={toggleSortOrder} size="small">
        {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </Box>
  );
};

export default FilterTodos;
