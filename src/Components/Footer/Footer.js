import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  Paper
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Info as InfoIcon,
  Help as HelpIcon
} from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Popular Locations */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                POPULAR LOCATIONS
              </Typography>
            </Box>
            <List dense>
              {['Delhi', 'Agra', 'Mathura', 'Kanpur'].map((location) => (
                <ListItem key={location} disablePadding>
                  <Link
                    component="button"
                    variant="body2"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {location}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* About Us */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                ABOUT US
              </Typography>
            </Box>
            <List dense>
              {[
                'About ExchangeZone Group',
                'Careers',
                'Contact Us',
                'ExchangeZone'
              ].map((item) => (
                <ListItem key={item} disablePadding>
                  <Link
                    component="button"
                    variant="body2"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* ExchangeZone Help */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HelpIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                EXCHANGEZONE
              </Typography>
            </Box>
            <List dense>
              {[
                'Help',
                'Sitemap',
                'Legal & Privacy information'
              ].map((item) => (
                <ListItem key={item} disablePadding>
                  <Link
                    component="button"
                    variant="body2"
                    sx={{
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.8,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Footer Bottom */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
            Other Countries: UAE - USA - Bhutan
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Free Classifieds in India. ©2022-2024 ExchangeZone
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
