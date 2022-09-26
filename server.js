const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
//force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

//Create default Roles
db.sequelize.sync().then(() => {
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to music store application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/instrument.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "ROLE_ADMIN"
  });
 
  Role.create({
    id: 2,
    name: "ROLE_ARTIST"
  });
 
  Role.create({
    id: 3,
    name: "ROLE_USER"
  });
}
console.log(`YourDB_HOST is ----------------------${process.env.DB_HOST}`);