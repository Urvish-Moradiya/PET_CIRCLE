const express = require("express") //express....
const mongoose = require("mongoose")
//express object..
const cors = require('cors');
const authRoutes = require('./src/routes/UserRoutes');
const app = express()

app.use(express.json())//for accept data in json format
app.use(cors());

mongoose.connect('mongodb://localhost:27017/petcircle', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
  
  // Routes
  app.use('/api/auth', authRoutes);
  
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));