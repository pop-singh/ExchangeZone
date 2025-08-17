import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002f34', // OLX dark green
      light: '#23e5db', // OLX light cyan
      dark: '#001d21',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffce32', // OLX yellow
      light: '#ffdf6b',
      dark: '#c79e00',
      contrastText: '#000000',
    },
    tertiary: {
      main: '#3a77ff', // OLX blue
      light: '#6b9aff',
      dark: '#0050cc',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#002f34',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#002f34',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#002f34',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#002f34',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#002f34',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#002f34',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#002f34',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
        },
        containedPrimary: {
          backgroundColor: '#002f34',
          '&:hover': {
            backgroundColor: '#001d21',
          },
        },
        containedSecondary: {
          backgroundColor: '#ffce32',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#c79e00',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&.Mui-focused fieldset': {
              borderColor: '#23e5db',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8f9fa',
          color: '#002f34',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
  spacing: 8,
});

export default theme;