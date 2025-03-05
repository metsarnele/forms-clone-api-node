import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  IconButton,
  CardActions
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

function FormsList() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>
      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid item xs={12} sm={6} md={4} key={form.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{form.title}</Typography>
                <Typography color="textSecondary">
                  {form.description || 'No description'}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton 
                  component={RouterLink} 
                  to={`/form/${form.id}`}
                  aria-label="view form"
                >
                  <VisibilityIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FormsList;
