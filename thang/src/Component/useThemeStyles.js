import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const useThemeStyles = () => {
  const { theme } = useContext(ThemeContext);

  const themeStyles = {
    container: {
      backgroundColor: theme === 'light' ? 'white' : 'black',
      color: theme === 'light' ? 'black' : 'white',
      minHeight: '100vh',
      padding: '20px',
    },
    todoItem: {
      backgroundColor: theme === 'light' ? '#f9f9f9' : '#333',
      color: theme === 'light' ? 'black' : 'white',
      padding: '10px',
      marginBottom: '8px',
      borderRadius: '3px',
      border: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  return themeStyles;
};

export default useThemeStyles;
