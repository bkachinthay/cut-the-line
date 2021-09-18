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

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Cut the line API!',
  });
});

// console.log('buildVendor : ', path.join(__dirname, 'build'));
// app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/login', login);
app.use('/pusher', pusher);

app.use(verifyToken);

app.use('/vendors', vendors);
app.use('/vendor', vendor);
app.use('/usercurrentorders', userCurrentOrders);
app.use('/userpastorders', userPastOrders);
app.use('/vendorcompleted', vendorCompleted);
app.use('/vendorqueue', vendorQueue);
app.use('/placeorder', placeOrder);
app.use('/updatestatus', updateStatus);
app.use('/intl', intl);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
