// mongodb+srv://SapnaVishnoi:<password>@coinclash.cvqdg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://Padel:Test123456@cluster0.w7k6n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const errorHandler = require('_middleware/error-handler');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // allow cors requests from any origin and with credentials
// app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// // api routes
// app.use('/accounts', require('./accounts/accounts.controller'));

// // swagger docs route
// app.use('/api-docs', require('_helpers/swagger'));


// // start server
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// app.listen(port, () => {
//     console.log('Server listening on port ' + port);
// });


const express = require('express');
const mongoose  = require('mongoose');
// const morgan = require('morgan')
var cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



                                                                                                                                                                                                                                                                                                                                                                  
const PORT = 4000;
const hostname = '127.0.0.1';
// const hostname = '97.74.88.210';
const MONGODB_URI = "mongodb+srv://Padel:Test123456@cluster0.w7k6n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express(); 

app.use(cors())
 

// DB Connect
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

// Will handle text/plain requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// Routes
const routes = require('./routes/routes.js');

app.use('/api',routes);
app.use('/', (req, res) =>  res.json("Hello, Welcome to Padel kWT BACKEND API"));
  
// Server 
app.listen(PORT, hostname, function(){
    console.log("Server is running on Port: " + PORT);
});

module.exports = app;
