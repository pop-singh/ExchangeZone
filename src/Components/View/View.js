import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardMedia,
  Divider,
  Chip,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";

function View() {
  const { postContent } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!postContent || !postContent.userId) {
      history.push("/");
      return;
    }

    Firebase.firestore()
      .collection("users")
      .where("id", "==", postContent.userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [history, postContent]);

  if (!postContent) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card elevation={6} sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={postContent.url}
              alt={postContent.name}
              sx={{
                height: { xs: 300, md: 500 },
                objectFit: 'cover',
              }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Price and Basic Info */}
            <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MoneyIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main' 
                  }}
                >
                  ₹ {postContent.price?.toLocaleString()}
                </Typography>
              </Box>

              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                {postContent.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CategoryIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Chip
                  label={postContent.category}
                  color="secondary"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Posted on {postContent.createdAt}
                </Typography>
              </Box>
            </Paper>

            {/* Product Description */}
            <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 2, flexGrow: 1 }}>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  color: 'primary.main'
                }}
              >
                Product Description
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6,
                  color: 'text.primary'
                }}
              >
                {postContent.description}
              </Typography>
            </Paper>

            {/* Seller Details */}
            {loading ? (
              <Paper elevation={4} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Loading seller details...
                </Typography>
              </Paper>
            ) : userDetails ? (
              <Paper 
                elevation={4} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  Seller Details
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {userDetails.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {userDetails.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default View;
