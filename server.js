const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const policyRoutes = require('./routes/policyRoutes');
const loctaions = require('./routes/locationRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(' Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));

app.use('/signups', signupRoutes);
app.use('/api', loginRoutes);
app.use('/policies', policyRoutes);
app.use('/locations', loctaions);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
