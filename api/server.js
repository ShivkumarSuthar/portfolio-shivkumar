const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/project');

const app = express();

// Middleware
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


// Default route
app.get('/', (req, res) => {
  res.send('Portfolio API running!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
