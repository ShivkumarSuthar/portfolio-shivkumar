require('dotenv').config();
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
mongoose.connect(process.env.MONGO_URI, {
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
