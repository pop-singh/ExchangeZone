import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import { PostContext } from "../../contextStore/PostContext";

function PostCards({ product, index }) {
  const { setPostContent } = useContext(PostContext);
  const history = useHistory();

  const handleCardClick = () => {
    setPostContent(product);
    history.push("/view");
  };

  return (
    <Card 
      sx={{
        maxWidth: 300,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        position: 'relative',
      }}
      onClick={handleCardClick}
    >
      {/* Favorite Button */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          // Add favorite functionality here
        }}
      >
        <FavoriteBorder sx={{ color: 'primary.main' }} />
      </IconButton>

      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={product.url}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
        }}
      />

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Price */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1
          }}
        >
          ₹ {product.price?.toLocaleString()}
        </Typography>

        {/* Category */}
        <Chip
          label={product.category}
          size="small"
          sx={{
            backgroundColor: 'secondary.main',
            color: 'black',
            fontWeight: 'bold',
            mb: 1,
          }}
        />

        {/* Product Name */}
        <Typography 
          variant="body1" 
          component="div"
          sx={{
            fontWeight: 500,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.5em',
          }}
        >
          {product.name}
        </Typography>
      </CardContent>

      {/* Date */}
      <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontSize: '0.75rem' }}
        >
          {product.createdAt}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default PostCards;
