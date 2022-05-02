//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');

//routers
const routes = require('./routes')
const router = express.Router()
// defining apps
const app = express();
dotenv.config({ path: './src/config/config.env' });
//middlewares
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
connectDB();

const path = '/api/v1'
app.use('/', routes.check)


const port = process.env.PORT
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});