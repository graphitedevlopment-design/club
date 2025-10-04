import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
  Container,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Visibility as ViewIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Search as SearchIcon,
  Groups as GroupsIcon,
  Work as WorkIcon
} from '@mui/icons-material';

// Dummy users data with club information
const dummyUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/static/images/avatar/1.jpg',
    status: 'active',
    joinDate: '2023-01-15',
    membershipId: 'MEM001',
    clubs: [
      { name: 'Tennis Club', position: 'Member' },
      { name: 'Swimming Club', position: 'Vice President' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    avatar: '/static/images/avatar/2.jpg',
    status: 'active',
    joinDate: '2023-03-22',
    membershipId: 'MEM002',
    clubs: [
      { name: 'Book Club', position: 'President' },
      { name: 'Chess Club', position: 'Member' }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    avatar: '/static/images/avatar/3.jpg',
    status: 'banned',
    joinDate: '2023-05-10',
    membershipId: 'MEM003',
    clubs: [
      { name: 'Basketball Club', position: 'Captain' }
    ]
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 234-5678',
    avatar: '/static/images/avatar/4.jpg',
    status: 'active',
    joinDate: '2023-07-18',
    membershipId: 'MEM004',
    clubs: [
      { name: 'Music Club', position: 'Treasurer' },
      { name: 'Drama Club', position: 'Secretary' }
    ]
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 345-6789',
    avatar: '/static/images/avatar/5.jpg',
    status: 'inactive',
    joinDate: '2023-09-05',
    membershipId: 'MEM005',
    clubs: [
      { name: 'Photography Club', position: 'Member' }
    ]
  }
];

const UserList = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [filteredUsers, setFilteredUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [actionType, setActionType] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Search functionality
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.membershipId.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedUser(null);
  };

  const handleAction = (type) => {
    setActionType(type);
    setOpenConfirm(true);
  };

  const handleConfirmAction = () => {
    if (selectedUser && actionType) {
      if (actionType === 'delete') {
        const updatedUsers = users.filter(user => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.membershipId.toLowerCase().includes(searchTerm)
        ));
      } else if (actionType === 'ban') {
        const updatedUsers = users.map(user => 
          user.id === selectedUser.id 
            ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
            : user
        );
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.membershipId.toLowerCase().includes(searchTerm)
        ));
      }
      setOpenConfirm(false);
      setOpenDetails(false);
      setActionType('');
      setSelectedUser(null);
    }
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setActionType('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'banned': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'banned': return 'Banned';
      default: return status;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              py: 3,
              px: 4
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              User Management
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Manage your users with ease
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name, membership ID, or email..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: 'white'
                }
              }}
            />
          </Box>

          <CardContent sx={{ p: 0 }}>
            <Grid container spacing={2} sx={{ p: 3 }}>
              {filteredUsers.map((user) => (
                <Grid key={user.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: 3, 
                      flexGrow: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      '&:last-child': {
                        pb: 3
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar
                          src={user.avatar}
                          sx={{
                            width: 60,
                            height: 60,
                            mr: 2,
                            border: '3px solid',
                            borderColor: 'primary.main',
                            flexShrink: 0
                          }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography variant="h6" fontWeight="bold" noWrap>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {user.membershipId}
                          </Typography>
                          <Chip
                            label={getStatusText(user.status)}
                            color={getStatusColor(user.status)}
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{ flexGrow: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <EmailIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary', flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {user.email}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <GroupsIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary', flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {user.clubs.length} Club(s)
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary', flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            Joined: {new Date(user.joinDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ViewIcon />}
                        onClick={() => handleViewDetails(user)}
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                          },
                          mt: 'auto'
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filteredUsers.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No users found matching your search criteria
                </Typography>
              </Box>
            )}
          </CardContent>
        </Paper>

        {/* User Details Dialog */}
        <Dialog
          open={openDetails}
          onClose={handleCloseDetails}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3
            }
          }}
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1 }} />
              User Details
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            {selectedUser && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={selectedUser.avatar}
                    sx={{
                      width: 80,
                      height: 80,
                      mr: 3,
                      border: '4px solid',
                      borderColor: 'primary.light'
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {selectedUser.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {selectedUser.membershipId}
                    </Typography>
                    <Chip
                      label={getStatusText(selectedUser.status)}
                      color={getStatusColor(selectedUser.status)}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="body1">{selectedUser.email}</Typography>
                    </Box>
                  </Grid>
                  
                  <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="body1">{selectedUser.phone}</Typography>
                    </Box>
                  </Grid>
                  
                  <Grid size={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorkIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="body1">
                        Joined: {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Clubs Section */}
                  <Grid size={12}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <GroupsIcon sx={{ mr: 1 }} />
                      Club Memberships
                    </Typography>
                    {selectedUser.clubs.map((club, index) => (
                      <Card key={index} variant="outlined" sx={{ mb: 1, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="medium">
                            {club.name}
                          </Typography>
                          <Chip 
                            label={club.position} 
                            color="primary" 
                            size="small" 
                            variant="outlined"
                          />
                        </Box>
                      </Card>
                    ))}
                    {selectedUser.clubs.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Not a member of any clubs
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<BlockIcon />}
              onClick={() => handleAction('ban')}
              color="warning"
            >
              {selectedUser?.status === 'banned' ? 'Unban User' : 'Ban User'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => handleAction('delete')}
              color="error"
            >
              Delete User
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseDetails}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                }
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          PaperProps={{
            sx: {
              borderRadius: 3
            }
          }}
        >
          <DialogTitle sx={{ 
            background: actionType === 'delete' ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {actionType === 'delete' ? <DeleteIcon /> : <BlockIcon />}
              <Typography variant="h6" sx={{ ml: 1 }}>
                {actionType === 'delete' ? 'Delete User' : selectedUser?.status === 'banned' ? 'Unban User' : 'Ban User'}
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <Typography>
              {actionType === 'delete' 
                ? `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`
                : `Are you sure you want to ${selectedUser?.status === 'banned' ? 'unban' : 'ban'} ${selectedUser?.name}?`
              }
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseConfirm} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              variant="contained"
              color={actionType === 'delete' ? 'error' : 'warning'}
              sx={{
                background: actionType === 'delete' 
                  ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                  : 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
                '&:hover': {
                  background: actionType === 'delete'
                    ? 'linear-gradient(135deg, #e55039 0%, #b71540 100%)'
                    : 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)'
                }
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default UserList;