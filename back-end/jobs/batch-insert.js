const csv = require('csvtojson');
const path = require('path');
const mongoose = require('mongoose');

const Agent = require('../models/agent');

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(error));

const csvFilePath = path.resolve('../assets/realstates.csv');
// Insert data from csv to objects array
csv()
  .fromFile(csvFilePath)
  .then((agents) => {
    const realstateCollection = agents
      .map((agent) => {
        // create new array of agents objects with {licenseId, fullName, city}
        const licenseId = Object.values(agent)[0].trim();
        const fullName = Object.values(agent)[1].trim();
        const city = Object.values(agent)[2].trim();

        return {
          license_id: licenseId,
          full_name: fullName,
          city,
        };
      }) // Clear all objects with missing keys
      .filter((agent) => agent.city && agent.full_name && agent.license_id);

    Agent.insertMany(realstateCollection)
      .then(() => {
        console.log('Data inserted'); // Success
      })
      .catch((error) => {
        console.log(error); // Failure
      });
  });