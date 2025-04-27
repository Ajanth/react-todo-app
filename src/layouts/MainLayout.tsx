import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import theme from "../theme";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Todo App</Typography>
          </Toolbar>
        </AppBar>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MainLayout;