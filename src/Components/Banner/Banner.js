import React, { useState } from "react";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import DynamicPosts from "../DynamicPosts/DynamicPosts";

function Banner() {
  const [category, setCategory] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categories = [
    "Cars",
    "Cameras & Lenses", 
    "Computers & Laptops",
    "Mobile Phones",
    "Motorcycles",
    "Tablets"
  ];

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', py: 2 }}>
      <Container maxWidth="xl">
        {/* Category Menu Bar */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Category Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CategoryIcon sx={{ color: 'primary.main' }} />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">
                    <em>ALL CATEGORIES</em>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {category && (
                <Chip
                  label={`Showing: ${category}`}
                  onDelete={() => setCategory("")}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>

            {/* Quick Category Options */}
            {!isMobile && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Quick Categories:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {categories.map((cat) => (
                    <Chip
                      key={cat}
                      label={cat}
                      onClick={() => handleCategoryClick(cat)}
                      variant={category === cat ? "filled" : "outlined"}
                      color={category === cat ? "primary" : "default"}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-1px)',
                          boxShadow: 2,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Banner Image */}
        <Paper 
          elevation={4}
          sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ textAlign: 'center', color: 'white', p: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome to ExchangeZone
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Find great deals on everything you need
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Dynamic Posts based on category */}
      {category && category !== "" && (
        <DynamicPosts category={category} />
      )}
    </Box>
  );
}

export default Banner;
