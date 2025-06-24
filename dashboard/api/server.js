const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/project');
const workRoutes= require('./routes/workHistory')
const educationRoutes = require('./routes/education');
const skillsRoutes = require('./routes/skills');
const dashboardRoute= require('./routes/dashboard')
const profileRoute= require('./routes/profile')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
mongoose
.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB error:', err));


// Use routes
app.use('/api/project', projectRoutes);
app.use('/api/work',workRoutes )
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillsRoutes);        
app.use('/api/dashboard', dashboardRoute);        
app.use('/api/profile', profileRoute);        


// Default route
app.get('/', (req, res) => {
  res.send('Portfolio API running!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
