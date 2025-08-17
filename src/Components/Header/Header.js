import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { 
  AppBar, 
  Toolbar, 
  TextField, 
  IconButton, 
  Button, 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Clear as ClearIcon, 
  Menu as MenuIcon,
  AccountCircle,
  Add as AddIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import OlxLogo from "../../assets/OlxLogo";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";

function Header() {
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
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

  const handleSelectedSearch = (value) => {
    setPostContent(value);
    history.push("/view");
    setFilteredData([]);
    setWordEntered("");
  };

  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
  };

  const { user } = useContext(AuthContext);
  
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileMenu = (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      sx={{ '& .MuiDrawer-paper': { width: 280, pt: 2 } }}
    >
      <Box sx={{ p: 2 }}>
        <OlxLogo />
      </Box>
      <Divider />
      <List>
        <ListItem>
          <TextField
            fullWidth
            placeholder="Search specific product..."
            value={wordEntered}
            onChange={handleFilter}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton onClick={filteredData.length === 0 ? handleEmptyClick : clearInput}>
                  {filteredData.length === 0 ? <SearchIcon /> : <ClearIcon />}
                </IconButton>
              ),
            }}
          />
        </ListItem>
        {filteredData.length !== 0 && (
          <Paper sx={{ maxHeight: 200, overflow: 'auto', mx: 2 }}>
            {filteredData.slice(0, 15).map((value, key) => (
              <ListItem 
                key={key} 
                button 
                onClick={() => handleSelectedSearch(value)}
                sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
              >
                <ListItemText primary={value.name} />
              </ListItem>
            ))}
          </Paper>
        )}
        <Divider sx={{ my: 2 }} />
        {user ? (
          <>
            <ListItem>
              <Typography variant="body1">Welcome, {user.displayName}</Typography>
            </ListItem>
            <ListItem button onClick={logoutHandler}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/create">
          <ListItemText primary="SELL" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar position="fixed" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton 
              edge="start" 
              color="inherit" 
              onClick={toggleMobileMenu}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OlxLogo />
          </Box>

          {/* Desktop Search */}
          {!isMobile && (
            <>
              {/* Quick Search */}
              <Box sx={{ position: 'relative', minWidth: 250, mx: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search specific product..."
                  value={wordEntered}
                  onChange={handleFilter}
                  variant="outlined"
                  size="small"
                  sx={{ backgroundColor: 'white', borderRadius: 1 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton 
                        onClick={filteredData.length === 0 ? handleEmptyClick : clearInput}
                        size="small"
                      >
                        {filteredData.length === 0 ? <SearchIcon /> : <ClearIcon />}
                      </IconButton>
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
                      maxHeight: 200, 
                      overflow: 'auto',
                      mt: 1
                    }}
                  >
                    {filteredData.slice(0, 15).map((value, key) => (
                      <ListItem 
                        key={key} 
                        button 
                        onClick={() => handleSelectedSearch(value)}
                        sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                      >
                        <ListItemText primary={value.name} />
                      </ListItem>
                    ))}
                  </Paper>
                )}
              </Box>

              {/* Main Search */}
              <Box sx={{ flex: 1, maxWidth: 400, mx: 2 }}>
                <Search />
              </Box>

              {/* Language Selector */}
              <Button
                color="inherit"
                endIcon={<ArrowDownIcon />}
                sx={{ minWidth: 'auto', fontWeight: 'bold' }}
              >
                ENGLISH
              </Button>
            </>
          )}

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <>
                {user ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={handleMenuOpen}
                      startIcon={<AccountCircle />}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {user.displayName}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Login
                  </Button>
                )}
              </>
            )}

            {/* Sell Button */}
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/create"
              startIcon={<AddIcon />}
              sx={{ 
                fontWeight: 'bold',
                borderRadius: 2,
                px: 2,
                py: 1,
                minWidth: isMobile ? 'auto' : 'unset'
              }}
            >
              {isMobile ? '' : 'SELL'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      {mobileMenu}
      
      {/* Spacer to account for fixed AppBar */}
      <Toolbar />
    </>
  );
}

export default Header;
