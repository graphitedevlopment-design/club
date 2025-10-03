import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Chip 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const dummyClubs = [
  {
    id: 1,
    name: 'Book Lovers Club',
    description: 'A community for avid readers and literature enthusiasts',
    members: 45,
    category: 'Literature',
    meetingSchedule: 'Every Wednesday, 6:00 PM',
    location: 'Library Conference Room',
    rules: [
      'Read at least one book per month',
      'Respect diverse opinions during discussions',
      'No spoilers for ongoing reads',
      'Active participation encouraged',
      'Be punctual for meetings'
    ],
    color: '#2196f3'
  },
  {
    id: 2,
    name: 'Tech Innovators',
    description: 'Exploring cutting-edge technology and innovation',
    members: 89,
    category: 'Technology',
    meetingSchedule: 'Every Friday, 5:30 PM',
    location: 'Tech Lab 101',
    rules: [
      'Share knowledge and help others',
      'Respect intellectual property',
      'No discrimination based on skill level',
      'Collaborate on projects',
      'Stay updated with latest trends'
    ],
    color: '#ff9800'
  },
  {
    id: 3,
    name: 'Fitness Warriors',
    description: 'Stay fit and healthy together',
    members: 120,
    category: 'Health & Fitness',
    meetingSchedule: 'Monday, Wednesday, Friday 7:00 AM',
    location: 'University Gym',
    rules: [
      'Proper gym attire required',
      'Respect equipment and others',
      'No phones during workouts',
      'Encourage fellow members',
      'Maintain cleanliness'
    ],
    color: '#4caf50'
  },
  {
    id: 4,
    name: 'Art & Creativity',
    description: 'Express yourself through various art forms',
    members: 32,
    category: 'Arts',
    meetingSchedule: 'Every Saturday, 2:00 PM',
    location: 'Art Studio B',
    rules: [
      'Respect all art forms',
      'Constructive criticism only',
      'Share materials when possible',
      'No judgment zone',
      'Experiment and have fun'
    ],
    color: '#9c27b0'
  },
  {
    id: 5,
    name: 'Environmental Guardians',
    description: 'Protecting our planet through sustainable practices',
    members: 67,
    category: 'Environment',
    meetingSchedule: 'Every Thursday, 4:00 PM',
    location: 'Green Campus Center',
    rules: [
      'Practice what you preach',
      'No single-use plastics',
      'Participate in cleanup events',
      'Educate others about sustainability',
      'Respect nature during activities'
    ],
    color: '#009688'
  },
  {
    id: 6,
    name: 'Music Masters',
    description: 'For musicians and music enthusiasts of all levels',
    members: 54,
    category: 'Music',
    meetingSchedule: 'Tuesday & Thursday, 7:00 PM',
    location: 'Music Hall Room 3',
    rules: [
      'All skill levels welcome',
      'Respect practice schedules',
      'Share equipment responsibly',
      'Support fellow musicians',
      'Keep the space acoustically friendly'
    ],
    color: '#f44336'
  }
];

const StyledCard = styled(Card)(({ theme, color }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${color}`,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 24px ${color}33`,
  },
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const StyledButton = styled(Button)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.getContrastText(color),
  '&:hover': {
    backgroundColor: `${color}cc`,
  },
}));

const Clubs = () => {
  const [openRules, setOpenRules] = useState(null);
  const [memberships, setMemberships] = useState({});

  const handleJoinClick = (clubId) => {
    setMemberships(prev => ({
      ...prev,
      [clubId]: !prev[clubId]
    }));
  };

  const handleRulesClick = (clubId) => {
    setOpenRules(clubId);
  };

  const handleCloseRules = () => {
    setOpenRules(null);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Our Clubs
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {dummyClubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <StyledCard color={club.color}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ color: club.color, fontWeight: 'bold' }}>
                  {club.name}
                </Typography>
                <Chip 
                  label={club.category} 
                  size="small" 
                  sx={{ mb: 2, bgcolor: `${club.color}33`, color: club.color }}
                />
                <Typography variant="body2" color="text.secondary" paragraph>
                  {club.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Members:</strong> {club.members}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Schedule:</strong> {club.meetingSchedule}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {club.location}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <StyledButton 
                  size="small" 
                  color={club.color}
                  onClick={() => handleJoinClick(club.id)}
                >
                  {memberships[club.id] ? 'Leave Club' : 'Join Club'}
                </StyledButton>
                <StyledButton 
                  size="small" 
                  color={club.color}
                  onClick={() => handleRulesClick(club.id)}
                >
                  View Rules
                </StyledButton>
              </CardActions>
            </StyledCard>
            <Dialog open={openRules === club.id} onClose={handleCloseRules}>
              <DialogTitle sx={{ bgcolor: club.color, color: 'white' }}>
                {club.name} Rules
              </DialogTitle>
              <DialogContent>
                <List>
                  {club.rules.map((rule, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={rule} />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
            </Dialog>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Clubs;