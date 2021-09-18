const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// const path = require('path');

require('dotenv').config();
const { notFound, errorHandler, verifyToken } = require('./middlewares');

// import apis
const vendors = require('./api/vendors');
const vendor = require('./api/vendor');
const login = require('./api/login');
const userCurrentOrders = require('./api/userCurrentOrders');
const userPastOrders = require('./api/userPastOrders');
const vendorCompleted = require('./api/vendorCompleted');
const vendorQueue = require('./api/vendorQueue');
const placeOrder = require('./api/placeOrder');
const updateStatus = require('./api/updateStatus');
const intl = require('./api/intl');
const pusher = require('./api/pusher');

const allowedOrigins = process.env.CORS_ORIGIN.split(' ');
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf('*') !== -1 || origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'Cut the line API!',
  });
});

// console.log('buildVendor : ', path.join(__dirname, 'build'));
// app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/api/login', login);
app.use('/api/pusher', pusher);

app.use(verifyToken);

app.use('/api/vendors', vendors);
app.use('/api/vendor', vendor);
app.use('/api/usercurrentorders', userCurrentOrders);
app.use('/api/userpastorders', userPastOrders);
app.use('/api/vendorcompleted', vendorCompleted);
app.use('/api/vendorqueue', vendorQueue);
app.use('/api/placeorder', placeOrder);
app.use('/api/updatestatus', updateStatus);
app.use('/api/intl', intl);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
