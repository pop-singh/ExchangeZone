import React, { useState, useContext } from 'react';
import {
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { AllPostContext } from "..//../contextStore/AllPostContext";
import { PostContext } from '../../contextStore/PostContext';
import { useHistory } from 'react-router';

function Search() {
  const { allPost, setAllPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const history = useHistory();
  
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase()) || 
             value.category.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSelectedSearch = (item) => {
    setPostContent(item);
    history.push("/view");
    clearInput();
  };

  const handleSearchClick = () => {
    if (filteredData.length === 0) {
      alert("No items found.., please search by product category or product name");
    } else {
      setAllPost(filteredData);
      history.push("/viewmore");
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        placeholder="Find Cars, Mobile, Motorcycles and more..."
        value={wordEntered}
        onChange={handleFilter}
        variant="outlined"
        size="small"
        sx={{ 
          backgroundColor: 'white', 
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'primary.light',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.light',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleSearchClick}
                sx={{ 
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  mr: -1.5
                }}
              >
                <SearchIcon />
              </IconButton>
              {filteredData.length !== 0 && (
                <IconButton 
                  onClick={clearInput}
                  size="small"
                  sx={{ ml: 0.5 }}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      
      {filteredData.length !== 0 && (
        <Paper 
          sx={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            maxHeight: 300, 
            overflow: 'auto',
            mt: 1,
            boxShadow: 3
          }}
        >
          <List dense>
            {filteredData.slice(0, 15).map((value, key) => (
              <ListItem 
                key={key} 
                button 
                onClick={() => handleSelectedSearch(value)}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'primary.light',
                    color: 'white'
                  },
                  borderBottom: key < Math.min(filteredData.length - 1, 14) ? '1px solid #eee' : 'none'
                }}
              >
                <ListItemText 
                  primary={value.name}
                  secondary={value.category}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default Search;
