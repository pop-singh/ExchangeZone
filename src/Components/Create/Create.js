import React, { Fragment, useState, useContext } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  Alert,
  Backdrop,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PhotoCamera as PhotoCameraIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import Header from "../Header/Header";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";

const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Cars",
    "Cameras & Lenses",
    "Computers & Laptops",
    "Mobile Phones",
    "Motorcycles",
    "Tablets"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !category || !price || !description || !image) {
      setError("Please fill in all fields and select an image");
      return;
    }

    setLoading(true);
    setError("");
    const date = new Date().toDateString();
    
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price: parseInt(price),
              description,
              url,
              userId: user.uid,
              createdAt: date,
            })
            .then(() => {
              history.push("/");
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setError("");
    }
  };

  return (
    <Fragment>
      <Header />
      
      <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="primary" />
      </Backdrop>

      <Container maxWidth="md" sx={{ py: 4, mt: 2 }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}
          >
            Create New Listing
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Product Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Product Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required sx={{ backgroundColor: 'white' }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Price"
                  type="number"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Product Image
                  </Typography>
                  
                  {image && (
                    <Card sx={{ maxWidth: 300, mx: 'auto', mb: 2 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={URL.createObjectURL(image)}
                        alt="Product preview"
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  )}

                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCameraIcon />}
                    sx={{ mb: 2 }}
                  >
                    {image ? 'Change Image' : 'Select Image'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CloudUploadIcon />}
                  disabled={loading}
                  sx={{
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    mt: 2
                  }}
                >
                  {loading ? 'Uploading...' : 'Upload and Submit'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Create;
