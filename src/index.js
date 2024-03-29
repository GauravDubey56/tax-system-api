//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config({});
const colors = require('colors');
const session = require('express-session')
const connectDB = require('./config/db');
// const connectDB = require('./config/dbConn');
const passport = require('passport')

require('./auth/auth');
//routers
const routes = require('./routes')
const router = express.Router()
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(passport.initialize())
app.use(session({
  secret: 'testSecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.session());
connectDB();
app.use(cors())


const path = '/api/v1'
app.use('/', routes.check);
app.use(path+'/auth',routes.auth);
//below routes are private
app.use(path+'/tax', passport.authenticate('jwt', { session: false }),routes.newTax);
app.use(path+'/payer', passport.authenticate('jwt', { session: false }),routes.payTax);
app.use(path+'/info', passport.authenticate('jwt', { session: false }), routes.info)
app.use(path+'/filter', passport.authenticate('jwt', { session: false }), routes.query)


const port = process.env.PORT
if (process.env.NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}


module.exports = app;