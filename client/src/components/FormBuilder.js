import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function FormBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setFormData({
        ...formData,
        questions: [...formData.questions, { text: newQuestion.trim(), type: 'text' }],
      });
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/forms', formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Create New Form
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Form Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          margin="normal"
          multiline
          rows={2}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="Add Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddQuestion}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <List>
          {formData.questions.map((question, index) => (
            <ListItem key={index}>
              <ListItemText primary={question.text} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveQuestion(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        Create Form
      </Button>
    </Box>
  );
}

export default FormBuilder;
