import React, { useContext } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { AllPostContext } from "../../contextStore/AllPostContext";
import PostCards from '../PostCards/PostCards';
import { Link } from "react-router-dom";

function DynamicPosts({ category }) {
  const { allPost } = useContext(AllPostContext);
  
  const filteredPosts = allPost.filter((item) => item.category === category);
  
  if (!category || category === "null" || filteredPosts.length === 0) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3 
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main' 
            }}
          >
            {category}
          </Typography>
          <Button
            component={Link}
            to="/viewmore"
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            View more
          </Button>
        </Box>

        <Grid container spacing={3}>
          {filteredPosts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
              <PostCards product={product} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default DynamicPosts;
