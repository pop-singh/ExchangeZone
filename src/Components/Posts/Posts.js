import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Skeleton,
  Paper
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { Firebase } from "../../firebase/config";
import PostCards from "../PostCards/PostCards";
import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  const [posts, setPosts] = useState([]); // for showing all posts in Ascending order of date
  const [posts2, setPosts2] = useState([]); // for showing all posts in Descending order of date
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoading2(true);

    // Retrieving all posts from firebase in descending order
    Firebase.firestore()
      .collection("products")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const allPostsDescendingOrder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPosts2(allPostsDescendingOrder);
        setAllPost(allPostsDescendingOrder);
        setLoading(false);
      });

    // Retrieving all posts from firebase in ascending order of date
    Firebase.firestore()
      .collection("products")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        const allPostsAscendingOrder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPosts(allPostsAscendingOrder);
        setLoading2(false);
      });
  }, [setAllPost]);

  // Loading skeleton component
  const LoadingSkeleton = ({ count = 4 }) => (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="60%" />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Quick Menu Section */}
      <Box sx={{ mb: 6 }}>
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
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Quick Menu
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

        {loading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <Grid container spacing={3}>
            {posts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
                <PostCards product={product} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Fresh Recommendations Section */}
      <Box>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main', 
            mb: 3 
          }}
        >
          Fresh Recommendations
        </Typography>

        {loading2 ? (
          <LoadingSkeleton count={4} />
        ) : (
          <Grid container spacing={3}>
            {posts2.slice(0, 4).map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
                <PostCards product={product} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Posts;
