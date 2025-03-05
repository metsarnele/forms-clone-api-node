import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function FormView() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/forms/${id}`);
        setForm(response.data);
        setAnswers(
          response.data.questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {})
        );
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/forms/${id}/submit`, { answers });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!form) {
    return (
      <Typography variant="h6" color="error" align="center">
        Form not found
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {form.title}
        </Typography>
        <Typography color="textSecondary" paragraph>
          {form.description}
        </Typography>
      </Paper>

      {form.questions.map((question) => (
        <Paper key={question.id} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {question.text}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={answers[question.id] || ''}
            onChange={(e) =>
              setAnswers({ ...answers, [question.id]: e.target.value })
            }
            placeholder="Your answer"
          />
        </Paper>
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        Submit
      </Button>
    </Box>
  );
}

export default FormView;
