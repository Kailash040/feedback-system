import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup
} from '@mui/material';
import axios from 'axios';

export default function FeedbackDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const params = {};
        if (category) params.category = category;
        if (sort) params.sort = sort;
        
        const response = await axios.get('http://localhost:5000/api/feedback', { params });
        setFeedback(response.data);
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };

    fetchFeedback();
  }, [category, sort]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Feedback Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="general">General</MenuItem>
            <MenuItem value="bug">Bug Report</MenuItem>
            <MenuItem value="feature">Feature Request</MenuItem>
            <MenuItem value="suggestion">Suggestion</MenuItem>
          </Select>
        </FormControl>
        
        <ButtonGroup variant="contained">
          <Button 
            onClick={() => setSort('newest')} 
            disabled={sort === 'newest'}
          >
            Newest First
          </Button>
          <Button 
            onClick={() => setSort('oldest')} 
            disabled={sort === 'oldest'}
          >
            Oldest First
          </Button>
        </ButtonGroup>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Box 
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: 
                        item.category === 'bug' ? 'error.light' :
                        item.category === 'feature' ? 'info.light' :
                        item.category === 'suggestion' ? 'success.light' :
                        'grey.200',
                      display: 'inline-block'
                    }}
                  >
                    {item.category}
                  </Box>
                </TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}