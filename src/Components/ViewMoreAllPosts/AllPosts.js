import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper
} from '@mui/material';
import { AllPostContext } from "../../contextStore/AllPostContext";
import Pagination from "../Pagination/Pagination";
import PostCards from "../PostCards/PostCards";

function AllPosts() {
  const { allPost } = useContext(AllPostContext);
  const history = useHistory();
  
  // If user refresh the whole page context will be empty so we want to redirect the user to the home page
  const length = allPost.length;
  
  // Pagination logic and implementation
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allPost.slice(indexOfFirstItem, indexOfLastItem);

  if (length === 0) {
    history.push("/");
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 2 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 3
          }}
        >
          All Products ({allPost.length} items)
        </Typography>
        
        <Grid container spacing={3}>
          {currentItems.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
              <PostCards product={product} index={index} />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination setCurrentPage={setCurrentPage} />
        </Box>
      </Paper>
    </Container>
  );
}

export default AllPosts;
