import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import axios from 'axios';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
        category: 'general'
      });
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  if (submitted) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Thank you for your feedback!
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setSubmitted(false)}
          sx={{ mt: 2 }}
        >
          Submit Another Feedback
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Submit Feedback
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value="general">General Feedback</MenuItem>
          <MenuItem value="bug">Bug Report</MenuItem>
          <MenuItem value="feature">Feature Request</MenuItem>
          <MenuItem value="suggestion">Suggestion</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Your Feedback"
        name="message"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button 
        type="submit" 
        variant="contained" 
        size="large" 
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}